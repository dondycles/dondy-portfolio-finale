import { useChatStore } from "@/store";
import { firestore } from "@/util/firebase";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";

export default function MessageForm({ closeChat }: { closeChat: () => void }) {
  const chat = useChatStore();

  const [message, setMessage] = useState<String>("");
  const [senderName, setSenderName] = useState<String | null>(null);
  const sendMessage = async () => {
    if (message === "") return;
    try {
      if (senderName != null && chat.senderName === null)
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
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" flex flex-col gap-[32px] rounded-box  w-full "
    >
      <div className="flex flex-row items-end justify-center gap-[32px] w-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">
              ID: {chat.chatSession_Id}
            </span>
          </label>
          {chat.senderName === null && (
            <input
              onChange={(e) => {
                setSenderName(e.target.value);
              }}
              value={senderName === null ? "" : String(senderName)}
              placeholder="Your name here... (Optional)"
              type="text"
              className="input input-bordered w-full text-xs"
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
            <button onClick={sendMessage} className="btn btn-accent text-xs">
              Send
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => closeChat()} className="btn btn-accent  text-xs">
        Cancel
      </button>
    </div>
  );
}
