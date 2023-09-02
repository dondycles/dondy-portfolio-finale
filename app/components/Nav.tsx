import { usePathname, useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import {
  BiSolidHomeAlt2,
  BiSolidCollection,
  BiSolidPhoneCall,
} from "react-icons/bi";
import Message from "./MessageComponent";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function () {
  const path = usePathname();
  const route = useRouter();
  const [showChat, setShowChat] = useState(false);
  return (
    <nav className=" fixed top-auto bottom-[32px] left-[32px] right-[32px] sm:top-[32px] sm:bottom-auto sm:left-[32px] sm:right-[32px] flex items-center justify-center gap-[32px] z-20">
      <div
        onClick={() => setShowChat(true)}
        className="avatar h-[32px] w-[32px] fixed bottom-[32px] left-[32px] sm:left-auto sm:bottom-auto sm:relative cursor-pointer"
      >
        <div className="rounded-full">
          <img src="/favicon.ico" />
        </div>
      </div>
      <ul className="flex flex-row justify-center  rounded-full w-[calc(100%-32px-32px-32px)] sm:w-fit join  ">
        <li
          onClick={() => route.push("/")}
          className={` join-item btn h-[32px] min-h-[32px]  cursor-pointer text-xs flex-1 ${
            path === "/" && " btn-accent pointer-events-none"
          }`}
        >
          <span className=" sm:block hidden">Home</span>
          <span className=" sm:hidden block ">
            <BiSolidHomeAlt2 />
          </span>
        </li>
        <li
          onClick={() => route.push("/projects")}
          className={`join-item btn h-[32px] min-h-[32px]  cursor-pointer text-xs flex-1 ${
            path === "/projects" && "btn-accent  pointer-events-none"
          }`}
        >
          <span className=" sm:block hidden ">Projects</span>
          <span className=" sm:hidden block ">
            <BiSolidCollection />
          </span>
        </li>
        <li
          onClick={() => route.push("/contacts")}
          className={`join-item btn h-[32px] min-h-[32px]    cursor-pointer text-xs flex-1 ${
            path === "/contacts" && "btn-accent  pointer-events-none"
          }`}
        >
          <span className=" sm:block hidden ">Contacts</span>
          <span className=" sm:hidden block ">
            <BiSolidPhoneCall />
          </span>
        </li>
      </ul>
      <ThemeButton />
      <AnimatePresence>
        {showChat && <Message closeChat={() => setShowChat(false)} />}
      </AnimatePresence>
    </nav>
  );
}
