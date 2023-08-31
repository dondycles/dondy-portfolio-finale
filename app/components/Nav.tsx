import { usePathname, useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import {
  BiSolidHomeAlt2,
  BiSolidCollection,
  BiSolidPhoneCall,
} from "react-icons/bi";

export default function () {
  const path = usePathname();
  const route = useRouter();
  return (
    <nav className=" fixed top-auto bottom-4 left-4 right-4 sm:top-8 sm:bottom-auto sm:left-16 sm:right-16 flex items-center justify-center gap-4">
      <div className="avatar h-8 w-8 sm:h-6 sm:w-6 fixed bottom-4 left-4 sm:left-auto sm:bottom-auto sm:relative ">
        <div className="rounded-full">
          <img src="/favicon.ico" />
        </div>
      </div>
      <ul className="flex flex-row justify-center rounded-full w-[calc(100%-86px)] sm:w-fit join  ">
        <li
          onClick={() => route.push("/")}
          className={` join-item btn sm:min-h-12 h-8 min-h-8  cursor-pointer text-xs flex-1 ${
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
          className={`join-item btn sm:min-h-12 h-8 min-h-8  cursor-pointer text-xs flex-1 ${
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
          className={`join-item btn sm:min-h-12 h-8 min-h-8    cursor-pointer text-xs flex-1 ${
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
    </nav>
  );
}
