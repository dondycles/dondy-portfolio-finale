import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
            <Image
              height={720}
              width={720}
              alt="John Rod"
              src="/me.jpg"
              quality={100}
            />
          </div>
        </div>
        <div>
          <p className=" font-bold">John Rod Dondoyano</p>
          <p className="text-xs">Rizal Technological University</p>
          <p className="text-xs">BS Computer Engineering</p>
        </div>
      </div>
      <div className="flex-1 self-stretch rounded-box bg-neutral"></div>
    </>
  );
}
