import Image from "next/image";

export default function Projects() {
  let projects = [
    {
      name: "Sveltered",
      description:
        "E-Commerce Website I created with the help of developedbyed's course.",
      img: "/sveltered.jpg",
      href: "https://next-commerce-kousei.vercel.app/",
      badges: [
        "NextJS",
        "Stripe",
        "Prisma",
        "Next-Auth",
        "Zustand",
        "PostgreSQL",
        "Tailwind",
        "Daisy UI",
        "TypeScript",
      ],
    },
    {
      name: "Studio CXGNUS",
      description: "Anime inspired website for showcasing an NFT Project.",
      img: "/cxgnus.jpg",
      href: "https://studiocxgnus-alpha.vercel.app/",
      badges: ["HTML", "CSS", "Vanilla JavaScript"],
    },
    {
      name: "Piano Website",
      description: "A light website to showcase my music career.",
      img: "/pianowebsite.jpg",
      href: "https://johnrodxpianist.site",
      badges: ["SvelteKit", "Tailwind", "TypeScript", "Firebase", "EmailJS"],
    },
    {
      name: "Moneyger",
      description:
        "Web application you can use for managing and keeping track of your personal money.",
      img: "/moneyger.jpg",
      href: "https://moneyger-v2.vercel.app/",
      badges: ["NextJS", "Tailwind", "Firebase", "TypeScript"],
    },
    {
      name: "Wheel Of Pearl",
      description: "Web application you can use to help you decide in life.",
      img: "/wheelofpearl.jpg",
      href: "https://wheel-of-pearl.vercel.app/",
      badges: ["NextJS", "Tailwind", "TypeScript"],
    },
  ];
  return (
    <div className="  h-full overflow-y-auto  scrollbar-thin scrollbar-thumb-accent/25">
      <div className="flex flex-wrap flex-row items-start justify-center lg:justify-start gap-[32px]">
        {projects.map((project) => {
          return (
            <article className="card w-full lg:max-w-[400px] bg-base-100 shadow">
              <figure>
                <img
                  src={project.img}
                  alt={project.name}
                  className=" max-h-[244px] w-full h-screen object-cover object-top"
                />
              </figure>
              <section className="card-body">
                <h2 className="card-title">{project.name}</h2>
                <p className=" flex flex-wrap gap-1">
                  {project.badges.map((badge) => {
                    return (
                      <span className="badge badge-outline text-xs text-warning">
                        {badge}
                      </span>
                    );
                  })}
                </p>
                <p className="mt-[32px]">{project.description}</p>

                <footer className="mt-[32px]">
                  <a
                    href={project.href}
                    target="_blank"
                    className="btn btn-accent w-full"
                  >
                    Visit
                  </a>
                </footer>
              </section>
            </article>
          );
        })}
      </div>
    </div>
  );
}
