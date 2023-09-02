import { useChatStore } from "@/store";
import { firestore } from "@/util/firebase";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

export default function MessageForm({ closeChat }: { closeChat: () => void }) {
  const chat = useChatStore();

  const [message, setMessage] = useState<String>("");

  const sendMessage = async () => {
    try {
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
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" flex flex-col gap-[32px] rounded-box  w-full "
    >
      <div className="flex flex-row items-end justify-center gap-[32px] w-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">ID: {chat.chatSession_Id}</span>
          </label>
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={String(message)}
            placeholder="Enter your message here..."
            type="text"
            className="input input-bordered w-full"
          />
        </div>
        <button onClick={sendMessage} className="btn btn-accent">
          Send
        </button>
      </div>

      <button onClick={() => closeChat()} className="btn btn-accent">
        Cancel
      </button>
    </div>
  );
}
