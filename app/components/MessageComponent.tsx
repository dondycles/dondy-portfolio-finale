import { motion } from "framer-motion";
import Messages from "./Messages";

import MessageForm from "./MessageForm";

export default function Message({ closeChat }: { closeChat: () => void }) {
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
        <MessageForm closeChat={() => closeChat()} />
      </div>
    </motion.div>
  );
}
