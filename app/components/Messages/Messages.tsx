import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useChatStore } from "@/store";
import {
  DocumentData,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/util/firebase";
import MessageBubble from "./MessageBubble";
import MessageForm from "./MessageForm";
import ModifyMessage from "../Modals/ModifyMessage";
export default function Messages({ closeChat }: { closeChat: () => void }) {
  const chat = useChatStore();
  const [messages, setMessages] = useState<DocumentData>([]);
  const [messageIdToBeModified, setMessageIdToBeModified] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    onSnapshot(
      query(
        collection(
          firestore,
          "chatIds",
          String(chat.chatSession_Id),
          "messages"
        ),
        orderBy("created_at", "asc"),
        limitToLast(5)
      ),
      (message) => {
        setMessages(message.docs.map((m) => m.data()));
      }
    );
  }, []);

  return (
    <motion.div
      onClick={() => setShowModal(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen items-center justify-center z-[2000] backdrop-blur-sm backdrop-brightness-50 flex flex-col p-[32px]"
    >
      <AnimatePresence>
        {showModal && (
          <ModifyMessage
            closeModal={() => {
              setShowModal(false);
              setMessageIdToBeModified("");
            }}
            messageId={messageIdToBeModified || ""}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[500px] w-full flex flex-col items-end justify-end h-full gap-[32px]">
        <div
          className="flex flex-col w-full  text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence>
            {messages.map((message: DocumentData, i: number) => {
              return (
                <MessageBubble
                  key={message.id}
                  openModal={(id) => {
                    setMessageIdToBeModified(id);
                    setShowModal(true);
                  }}
                  message={message}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <MessageForm closeChat={() => closeChat()} />
      </div>
    </motion.div>
  );
}
