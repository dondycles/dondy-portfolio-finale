import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/util/firebase";
import { useChatStore } from "@/store";
import { motion } from "framer-motion";
export default function MessageBubble({
  message,
  openModal,
}: {
  message: DocumentData;
  openModal: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      transition={{ type: "spring" }}
      onClick={() => openModal(message.id)}
      className={`${
        message.isAdmin ? "chat-end" : "chat-start"
      } chat  ml-auto mr-0 cursor-pointer`}
    >
      <div
        className={`${
          message.isAdmin ? "chat-base-100" : "chat-bubble-accent"
        } chat-bubble break-all `}
      >
        {message.message}
      </div>
    </motion.div>
  );
}
