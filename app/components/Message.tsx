"use client";

import { useState } from "react";
import { supabaseAdmin } from "@/util/supabase";
import { useChatStore } from "@/store";
import { motion } from "framer-motion";
import Messages from "./Messages";

export default function Message({ closeChat }: { closeChat: () => void }) {
  const [message, setMessage] = useState<String>("");
  const chat = useChatStore();
  const initiateChat = async () => {
    if (chat.initiated) return true;
    chat.setInitiated();
    await supabaseAdmin.from("chatSessions").insert([
      {
        id: chat.chatSession_Id,
      },
    ]);
    await supabaseAdmin.from("chatIds").insert([{}]);

    return false;
  };
  const sendMessage = async () => {
    const isInitiated = await initiateChat();
    const { error } = await supabaseAdmin.from("messages").insert([
      {
        content: message,
        chatSession_Id: chat.chatSession_Id,
      },
    ]);
    setMessage("");
    if (error) {
      console.log(error.message);
    }
  };

  return (
    <motion.div
      onClick={() => closeChat()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen items-center justify-center z-[2000] backdrop-blur-sm flex flex-col p-[32px]"
    >
      <div className="max-w-[500px] w-full flex flex-col gap-[32px]">
        <Messages />
        <div
          onClick={(e) => e.stopPropagation()}
          className=" flex flex-col gap-[32px] rounded-box  w-full "
        >
          <div className="flex flex-row items-end justify-center gap-[32px] w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">What is your message?</span>
              </label>
              <input
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={String(message)}
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
      </div>
    </motion.div>
  );
}
