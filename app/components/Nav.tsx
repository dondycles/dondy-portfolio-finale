import { useThemeStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function () {
  const theme = useThemeStore();
  const path = usePathname();
  const route = useRouter();
  return (
    <nav className=" fixed top-4 left-4 right-4 sm:top-8 sm:left-16 sm:right-16 flex items-center justify-center gap-4">
      <div className="avatar h-6 w-6 fixed bottom-4 left-4 sm:left-auto sm:bottom-auto sm:relative ">
        <div className="w-24 rounded-full">
          <img src="/favicon.ico" />
        </div>
      </div>
      <ul className="flex flex-row justify-center rounded-full w-full sm:w-fit join ">
        <li
          onClick={() => route.push("/")}
          className={` join-item btn cursor-pointer text-xs flex-1 ${
            path === "/" && " btn-active pointer-events-none"
          }`}
        >
          Home
        </li>
        <li
          onClick={() => route.push("/projects")}
          className={`join-item btn   cursor-pointer text-xs flex-1 ${
            path === "/projects" && "btn-active  pointer-events-none"
          }`}
        >
          Projects
        </li>
        <li
          onClick={() => route.push("/contacts")}
          className={`join-item btn  cursor-pointer text-xs flex-1 ${
            path === "/contacts" && "btn-active  pointer-events-none"
          }`}
        >
          Contacts
        </li>
      </ul>
      <label className="swap swap-rotate text-2xl join-item group fixed bottom-4 right-4 sm:right-auto sm:bottom-auto sm:relative ">
        <input
          onClick={() => {
            if (theme.mode === "dark") return theme.toggleMode("light");
            theme.toggleMode("dark");
          }}
          type="checkbox"
        />
        <span className=" swap-off">
          <MdDarkMode />
        </span>
        <span className=" swap-on">
          <MdLightMode />
        </span>
      </label>
    </nav>
  );
}
