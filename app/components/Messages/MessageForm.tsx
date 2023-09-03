import { useChatStore } from "@/store";
import { firestore } from "@/util/firebase";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDocs,
  DocumentData,
  onSnapshot,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function MessageForm({
  closeChat,
  isAdmin,
  selectChatSession_Id,
}: {
  closeChat: () => void;
  isAdmin: string;
  selectChatSession_Id: (id: string) => void;
}) {
  const chat = useChatStore();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<String>("");
  const [senderName, setSenderName] = useState<String | null>(null);
  const [selectedChatSession_Id, setSelectedChatSession_Id] = useState("");
  const [adminData, setAdminData] = useState<DocumentData>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatIds, setChatIds] = useState<DocumentData>([]);
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  TODO Create Toastify!

    if (isAdmin === "true")
      return console.log("Only Non-Admins Can Use This Function!");
    if (message === "") return console.log("Your Message Is Empty!");
    try {
      if (
        senderName != null &&
        senderName.trim() != "" &&
        chat.senderName === null
      )
        chat.setSenderName(senderName as string);
      if (!chat.initiated) {
        chat.setInitiated();
        await setDoc(doc(firestore, "chatIds", String(chat.chatSession_Id)), {
          senderName: chat.senderName === null ? senderName : chat.senderName,
          id: chat.chatSession_Id,
          isInitiated: true,
        });
      }
      const { id } = await addDoc(
        collection(
          firestore,
          "chatIds",
          String(chat.chatSession_Id),
          "messages"
        ),
        {
          message: message,
          created_at: serverTimestamp(),
          chatSession_Id: chat.chatSession_Id,
          isAdmin: false,
          isEdited: false,
        }
      );
      await updateDoc(
        doc(firestore, "chatIds", String(chat.chatSession_Id), "messages", id),
        {
          id: id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setMessage("");
    setSenderName(null);
    console.log("Sent From Client Side");
  };
  const sendMessageToTheSelectedId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  TODO Create Toastify!

    if (isAdmin != "true")
      return console.log("Only Admins Can Use This Function!");
    if (selectedChatSession_Id.trim() === "") return console.log("Empty ID!");
    if (message === "") return console.log("Your Message Is Empty!");
    try {
      const { id } = await addDoc(
        collection(
          firestore,
          "chatIds",
          String(selectedChatSession_Id),
          "messages"
        ),
        {
          message: message,
          created_at: serverTimestamp(),
          chatSession_Id: selectedChatSession_Id,
          isAdmin: true,
          isEdited: false,
        }
      );
      await updateDoc(
        doc(
          firestore,
          "chatIds",
          String(selectedChatSession_Id),
          "messages",
          id
        ),
        {
          id: id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setMessage("");
    setSenderName(null);
    console.log("Sent From Admin Side");
  };
  const fetchChatIds = async () => {
    const { docs } = await getDocs(collection(firestore, "chatIds"));
    setChatIds(docs.map((id) => id.data()));
  };
  const setActive = async () => {
    await updateDoc(doc(firestore, "admin", "johnroddondoyano"), {
      isActive: !adminData.isActive,
    });
  };
  // const deleteAllMessages = async () => {
  //   onSnapshot(
  //     collection(firestore, "chatIds", String(chat.chatSession_Id), "messages"),
  //     (chats) => {
  //       chats.docs.map((c) => {
  //         deleteDoc(
  //           doc(
  //             firestore,
  //             "chatIds",
  //             String(chat.chatSession_Id),
  //             "messages",
  //             c.id
  //           )
  //         );
  //       });
  //     }
  //   );
  // };

  useEffect(() => {
    if (searchParams.get("admin") != "true") return;
    onSnapshot(
      doc(firestore, "admin", "johnroddondoyano"),
      (admin: DocumentData) => {
        setAdminData(admin.data());
      }
    );
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" flex flex-col gap-[32px] rounded-box  w-full "
    >
      <div className="flex flex-row items-end justify-center gap-[32px] w-full">
        <form
          onSubmit={(e) => {
            if (isAdmin === "true") {
              sendMessageToTheSelectedId(e);
            } else sendMessage(e);
          }}
          className="form-control w-full"
        >
          {isAdmin != "true" && chat.senderName === null && (
            <input
              onChange={(e) => {
                setSenderName(e.target.value);
              }}
              value={senderName === null ? "" : String(senderName)}
              placeholder="Your name here... (Optional)"
              type="text"
              className="input input-bordered w-full text-xs my-6"
            />
          )}

          <div className="flex flex-rol items-center gap-6 justify-center ">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={String(message)}
              placeholder="Your message here..."
              type="text"
              className="input input-bordered w-full text-xs "
            />
            <button type="submit" className="btn btn-accent text-xs">
              Send!
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-row justify-end gap-6 relative">
        {/* <button
          onClick={() => {
            deleteAllMessages();
          }}
          className="btn btn-error  text-xs"
        >
          Reset
        </button> */}
        {isAdmin === "true" && (
          <>
            <button
              onClick={() => {
                fetchChatIds();
                setShowDropdown((prev) => !prev);
              }}
              className="btn text-xs flex-1 relative break-before-all"
            >
              {chatIds.map((c: DocumentData) => {
                if (c.id === selectedChatSession_Id)
                  return (
                    <span key={c.id}>
                      {c.senderName === undefined || chat.senderName === null
                        ? c.id.slice(0, 5)
                        : c.senderName}
                    </span>
                  );
              })}
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-20 right-0 shadow w-full flex flex-col gap-6 items-end justify-end max-h-[60dvh] h-screen overflow-y-auto p-6 rounded-lg bg-base-100/[95%]"
                >
                  {chatIds &&
                    chatIds.map((chat: DocumentData) => {
                      return (
                        <motion.li
                          onClick={() => {
                            selectChatSession_Id(chat.id);
                            setSelectedChatSession_Id(chat.id);
                            setShowDropdown(false);
                          }}
                          className={`btn w-full text-xs ${
                            chat.id === selectedChatSession_Id
                              ? "btn-warning"
                              : "btn-outline"
                          }`}
                          key={chat.id}
                        >
                          {chat.id.slice(0, 5)}
                        </motion.li>
                      );
                    })}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}
        <button onClick={() => closeChat()} className="btn btn-outline text-xs">
          Close
        </button>
      </div>
      {isAdmin === "true" ? (
        <button
          onClick={() => {
            setActive();
          }}
          className={`btn ${
            adminData.isActive ? "btn-accent " : "btn-neutral"
          }`}
        >
          {adminData.isActive ? "Online" : "Offline"}
        </button>
      ) : (
        <p className="label-text text-xs text-center">
          ID: {chat.chatSession_Id}
        </p>
      )}
    </div>
  );
}
