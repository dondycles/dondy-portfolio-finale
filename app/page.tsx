import Image from "next/image";
import { useState } from "react";
import Avatar from "./components/Avatar";
import {
  SiSvelte,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
} from "react-icons/si";
export default function Home() {
  return (
    <article className=" w-full h-full flex flex-col items-center gap-[32px]">
      <section className="flex items-center gap-[32px]">
        <Avatar />
        <section>
          <h1 className=" font-bold ">John Rod Dondoyano</h1>
          <p className="text-xs">Rizal Technological University</p>
          <p className="text-xs">BS Computer Engineering</p>
        </section>
      </section>
      <section className="flex flex-col gap-8 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent/25">
        <p className=" flex gap-[32px]">
          <span className=" text-accent">$</span>
          <span>
            I am a self-taught web developer who pulls up an all-nighter and
            currently working with my degree of BS in Computer Engineering. I
            achieved millions of views with my piano covers on YouTube. I split
            my time between music and exploring the world of web development.
          </span>
        </p>
        <p className=" flex gap-[32px]">
          <span className="text-accent">$</span>
          <span>
            I really enjoy developing and designing websites! Learning web
            development is hard at first but later on I managed to enhance my
            knowledge about HTML, CSS, and JavaScript from YouTube tutorials and
            online lessons.
          </span>
        </p>
        <section className=" flex gap-[32px] w-full">
          <span className="text-accent">$</span>
          <table className="table table-zebra table-pin-rows table-sm w-full max-w-[400px] mx-auto">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex items-center gap-1">
                  <SiHtml5 /> HTML
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="75"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-1">
                  <SiCss3 /> CSS
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="75"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-1">
                  <SiJavascript /> JS
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="60"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-1">
                  <SiReact /> React
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="60"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-1">
                  <SiNextdotjs /> NextJS
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="60"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-1">
                  <SiSvelte /> SvelteKit
                </td>
                <td>
                  {" "}
                  <progress
                    className="progress progress-accent w-full min-w-[100px] max-w-[150px]"
                    value="50"
                    max="100"
                  ></progress>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </article>
  );
}
