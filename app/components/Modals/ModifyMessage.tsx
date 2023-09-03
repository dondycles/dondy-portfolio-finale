import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/util/firebase";
import { useChatStore } from "@/store";
import { useSearchParams } from "next/navigation";
export default function ModifyMessage({
  messageId,
  closeModal,
  selectedChatId,
}: {
  messageId: string;
  closeModal: () => void;
  selectedChatId: string | null;
}) {
  const [isModifying, setIsModifying] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const searchParams = useSearchParams();
  const chat = useChatStore();

  const deleteMessage = async (id: string) => {
    if (searchParams.get("admin") === "true") {
      await deleteDoc(
        doc(firestore, "chatIds", String(selectedChatId), "messages", id)
      );
    } else
      await deleteDoc(
        doc(firestore, "chatIds", String(chat.chatSession_Id), "messages", id)
      );
  };
  const updateMessage = async (id: string) => {
    if (searchParams.get("admin") === "true") {
      await updateDoc(
        doc(firestore, "chatIds", String(selectedChatId), "messages", id),
        {
          message: editedMessage,
          isEdited: true,
        }
      );
    } else
      await updateDoc(
        doc(firestore, "chatIds", String(chat.chatSession_Id), "messages", id),
        {
          message: editedMessage,
          isEdited: true,
        }
      );

    setEditedMessage("");
  };

  const deleteAllMessages = async () => {
    onSnapshot(
      collection(firestore, "chatIds", String(chat.chatSession_Id), "messages"),
      (chats) => {
        chats.docs.map((c) => {
          deleteDoc(
            doc(
              firestore,
              "chatIds",
              String(chat.chatSession_Id),
              "messages",
              c.id
            )
          );
        });
      }
    );
  };

  return (
    <motion.div
      key={messageId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal pointer-events-auto"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="modal-box "
      >
        <motion.h3 layout className="text-lg font-bold">
          Modify
        </motion.h3>
        <motion.p layout className="py-4">
          How would you want to modify this message with an id of {messageId}
        </motion.p>
        {confirmEdit && (
          <motion.textarea
            layout
            onChange={(e) => setEditedMessage(e.target.value)}
            value={editedMessage}
            className="textarea textarea-accent w-full"
          />
        )}
        <motion.div layout className=" mt-6 w-full flex flex-row gap-6">
          <AnimatePresence>
            {isModifying ? (
              <>
                {confirmDelete && !confirmEdit && (
                  <>
                    <motion.button
                      layout
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          deleteMessage(messageId);
                          setConfirmDelete((prev) => !prev);
                          setConfirmEdit(false);
                          setIsModifying(false);
                        }, 500);
                      }}
                      className="btn btn-error flex-1"
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      layout
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          setConfirmDelete(false);
                          setConfirmEdit(false);
                          setIsModifying(false);
                        }, 500);
                      }}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </motion.button>
                  </>
                )}
                {!confirmDelete && confirmEdit && (
                  <>
                    <motion.button
                      layout
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          updateMessage(messageId);
                          setConfirmEdit((prev) => !prev);
                          setConfirmDelete(false);
                          setIsModifying(false);
                        }, 500);
                      }}
                      className="btn btn-warning flex-1"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      layout
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          setConfirmDelete(false);
                          setConfirmEdit(false);
                          setIsModifying(false);
                        }, 500);
                      }}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </motion.button>
                  </>
                )}
              </>
            ) : (
              <>
                <motion.button
                  layout
                  onClick={() => {
                    setIsModifying(true);
                    setConfirmDelete(true);
                    setConfirmEdit(false);
                  }}
                  className="btn btn-error flex-1"
                >
                  Delete
                </motion.button>
                <motion.button
                  layout
                  onClick={() => {
                    setIsModifying(true);
                    setConfirmDelete(false);
                    setConfirmEdit(true);
                  }}
                  className="btn btn-warning flex-1"
                >
                  Edit
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
