"use client";
import { usePathname, useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import {
  BiSolidHomeAlt2,
  BiSolidCollection,
  BiSolidPhoneCall,
} from "react-icons/bi";
import Messages from "./Messages/Messages";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DocumentData, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "@/util/firebase";
export default function () {
  const path = usePathname();
  const route = useRouter();
  const [showChat, setShowChat] = useState(false);
  const [adminData, setAdminData] = useState<DocumentData>();
  const getAdminData = () => {
    onSnapshot(doc(firestore, "admin", "johnroddondoyano"), (admin) => {
      setAdminData(admin.data());
    });
  };
  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <nav className=" fixed top-auto bottom-[32px] left-[32px] right-[32px] sm:top-[32px] sm:bottom-auto sm:left-[32px] sm:right-[32px] flex items-center justify-center gap-[32px] z-20">
      <div
        onClick={() => setShowChat(true)}
        className={`avatar online h-[32px] w-[32px] fixed bottom-[32px] left-[32px] sm:left-auto sm:bottom-auto sm:relative cursor-pointer ${
          adminData && adminData.isActive ? " online " : " offline"
        }`}
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
        {showChat && <Messages closeChat={() => setShowChat(false)} />}
      </AnimatePresence>
    </nav>
  );
}
