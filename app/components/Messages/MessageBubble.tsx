import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/util/firebase";
import { useChatStore } from "@/store";
import { motion } from "framer-motion";
export default function MessageBubble({
  message,
  openModal,
  isAdmin,
}: {
  message: DocumentData;
  isAdmin: string;
  openModal: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      transition={{ type: "spring" }}
      onClick={() => {
        if (message.isAdmin && isAdmin != "true") return;
        openModal(message.id);
      }}
      className={`${
        isAdmin === "true"
          ? message.isAdmin
            ? "chat-end ml-auto mr-0 cursor-pointer"
            : "chat-start ml-0 mr-auto cursor-pointer"
          : message.isAdmin
          ? "chat-end ml-0 mr-auto"
          : "chat-start ml-auto mr-0 cursor-pointer"
      } chat   `}
    >
      <div
        className={`${
          message.isAdmin
            ? message.isEdited
              ? "chat-bubble-warning"
              : "chat-bubble-primary"
            : message.isEdited
            ? "chat-bubble-warning"
            : "chat-bubble-accent"
        } chat-bubble max-w-[200px] w-full min-h-0 whitespace-normal break-words`}
      >
        {message.message}
      </div>
    </motion.div>
  );
}
