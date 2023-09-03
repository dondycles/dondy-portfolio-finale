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
} from "firebase/firestore";
import { FormEvent, useState } from "react";

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
  const [message, setMessage] = useState<String>("");
  const [senderName, setSenderName] = useState<String | null>(null);
  const [selectedChatSession_Id, setSelectedChatSession_Id] = useState("");
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

      await setDoc(doc(firestore, "chatIds", String(chat.chatSession_Id)), {
        senderName: chat.senderName === null ? senderName : chat.senderName,
        id: chat.chatSession_Id,
      });
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
    if (message === "") return console.log("Your Message Is Empty!");
    try {
      if (senderName != null && chat.senderName === null)
        chat.setSenderName(senderName as string);

      await setDoc(doc(firestore, "chatIds", String(selectedChatSession_Id)), {
        senderName: chat.senderName === null ? senderName : chat.senderName,
        id: selectedChatSession_Id,
      });
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

  const [chatIds, setChatIds] = useState<DocumentData>([]);

  const fetchChatIds = async () => {
    const { docs } = await getDocs(collection(firestore, "chatIds"));
    setChatIds(docs.map((id) => id.id));
  };

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
          {isAdmin === "true" ? (
            <div
              onClick={() => fetchChatIds()}
              className="dropdown dropdown-top "
            >
              <span tabIndex={0} className="btn text-xs w-full">
                Selected ID: {selectedChatSession_Id}
              </span>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-0 shadow  w-full flex justify-end gap-6 mb-6 max-h-[500px] h-screen overflow-y-auto"
              >
                {chatIds &&
                  chatIds.map((id: string) => {
                    return (
                      <li
                        onClick={() => {
                          selectChatSession_Id(id);
                          setSelectedChatSession_Id(id);
                        }}
                        className=" btn btn-outline text-xs"
                        key={id}
                      >
                        {id}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <p className="label-text text-xs cursor-pointer">
              ID: {chat.chatSession_Id}
            </p>
          )}

          {isAdmin != "true" && chat.senderName === null && (
            <input
              onChange={(e) => {
                setSenderName(e.target.value);
              }}
              value={senderName === null ? "" : String(senderName)}
              placeholder="Your name here... (Optional)"
              type="text"
              className="input input-bordered w-full text-xs mt-6"
            />
          )}

          <div className="flex flex-rol items-center gap-6 justify-center mt-6">
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
              Send
            </button>
          </div>
        </form>
      </div>

      <button onClick={() => closeChat()} className="btn btn-accent  text-xs">
        Cancel
      </button>
    </div>
  );
}
