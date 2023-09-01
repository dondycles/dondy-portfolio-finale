import Image from "next/image";
import { useState } from "react";
import Avatar from "./components/Avatar";
export default function Home() {
  return (
    <article className=" w-full h-full flex flex-col items-center gap-4 sm:gap-8">
      <section className="flex items-center gap-4 sm:gap-8">
        <Avatar />
        <section>
          <h1 className=" font-bold ">John Rod Dondoyano</h1>
          <p className="text-xs">Rizal Technological University</p>
          <p className="text-xs">BS Computer Engineering</p>
        </section>
      </section>
      <section className="flex-1 self-stretch rounded-box bg-base-200  text-base-content text-justify  overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb scrollbar-thumb-accent/25 mockup-code p-4">
        <p className=" flex gap-4">
          <span className=" text-accent">$</span>
          <span>
            I am a self-taught web developer who pulls up an all-nighter and
            currently working with my degree of BS in Computer Engineering. I
            achieved millions of views with my piano covers on YouTube. I split
            my time between music and exploring the world of web development.
          </span>
        </p>

        <br />
        <p className=" flex gap-4">
          <span className="text-accent">$</span>
          <span>
            I really enjoy developing and designing websites! Learning web
            development is hard at first but later on I managed to enhance my
            knowledge about HTML, CSS, and JavaScript from YouTube tutorials and
            online lessons.
          </span>
        </p>
        <br />

        <section className=" flex gap-4">
          <span className="text-accent">$</span>
          <table className="table table-sm w-full sm:w-fit mx-auto">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HTML</td>
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
                <td>CSS</td>
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
                <td>Vanilla JavaScript</td>
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
                <td>React</td>
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
                <td>NextJS</td>
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
                <td>SvelteKit</td>
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
