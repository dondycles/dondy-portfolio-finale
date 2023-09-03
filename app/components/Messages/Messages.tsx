import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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
import { useSearchParams } from "next/navigation";

export default function Messages({ closeChat }: { closeChat: () => void }) {
  const chat = useChatStore();
  const searchParams = useSearchParams();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<DocumentData>([]);
  const [messageIdToBeModified, setMessageIdToBeModified] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getMessages = async () => {
    if (searchParams.get("admin") === "true") return;
    onSnapshot(
      query(
        collection(
          firestore,
          "chatIds",
          String(chat.chatSession_Id),
          "messages"
        ),
        orderBy("created_at", "asc")
      ),
      (message) => {
        setMessages(message.docs.map((m) => m.data()));
      }
    );
  };

  const getMessagesBySelectedId = async (chatSession_Id: string) => {
    if (searchParams.get("admin") === "false") return;
    onSnapshot(
      query(
        collection(firestore, "chatIds", chatSession_Id, "messages"),
        orderBy("created_at", "asc")
      ),
      (message) => {
        setMessages(message.docs.map((m) => m.data()));
      }
    );
  };

  useEffect(() => {
    if (messages.length) {
      messagesContainer.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <motion.div
      onClick={() => setShowModal(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full max-h-[100dvh] items-center justify-end z-[2000] backdrop-blur-sm backdrop-brightness-50 flex flex-col p-[32px]"
    >
      <AnimatePresence>
        {showModal && (
          <ModifyMessage
            key={String(showModal)}
            closeModal={() => {
              setShowModal(false);
              setMessageIdToBeModified("");
            }}
            messageId={messageIdToBeModified || ""}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[500px] w-full flex flex-col items-end justify-end  gap-[32px]">
        <div
          className="w-full max-h-[60dvh] h-full  text-xs overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div ref={messagesContainer} className="flex flex-col items-end">
            <AnimatePresence>
              {messages.map((message: DocumentData, i: number) => {
                return (
                  <MessageBubble
                    isAdmin={searchParams.get("admin") as string}
                    key={i}
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
        </div>
        <MessageForm
          selectChatSession_Id={(chatSession_Id) => {
            getMessagesBySelectedId(chatSession_Id);
          }}
          isAdmin={searchParams.get("admin") as string}
          closeChat={() => closeChat()}
        />
      </div>
    </motion.div>
  );
}
