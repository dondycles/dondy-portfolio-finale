import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
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
          <p className=" font-bold text-lg">John Rod Dondoyano</p>
          <p className="text-sm">Rizal Technological University</p>
          <p className="text-sm">BS Computer Engineering</p>
        </div>
      </div>
      <div className="flex-1 self-stretch rounded-box bg-base-200 p-4 text-base-content text-sm">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint iusto
          debitis quaerat voluptatem, suscipit fugit, necessitatibus mollitia
          doloribus praesentium ex sit. Distinctio, earum! Consectetur ratione
          officia eos modi recusandae quo.
        </p>
      </div>
    </>
  );
}
