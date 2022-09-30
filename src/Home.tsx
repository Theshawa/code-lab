import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import Icons, { IconIndex } from "./Icons";
const Item: FC<{
  slug: string;
  name: string;
  image: string;
  technologies: string[];
}> = ({ slug, name, image, technologies }) => {
  return (
    <Link
      to={`/${slug}`}
      className="w-full border group border-color rounded-[10px] flex flex-col text-left"
    >
      <img
        src={image}
        alt={name}
        className="object-contain h-[300px] bg-blue bg-opacity-5 border-b border-color rounded-t-[10px]"
      />
      <div className="p-[20px]">
        <h2 className="text-[20px] underline decoration-[transparent] transition-colors duration-300 group-hover:decoration-blue">
          {name}
        </h2>
        <div className="flex space-x-[20px] items-center mt-[10px]">
          {technologies.map((t, i) => (
            <Fragment key={i}>{Icons[t as IconIndex]}</Fragment>
          ))}
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="px-[20px] py-[100px] flex flex-col items-center text-center">
      <h1>Code-lab of Theshawa Dasun</h1>
      <p className="font-thin max-w-xl mt-[20px]">
        👋 Hi, I am Theshawa Dasun. This is the place that includes the
        web-related experiments I did to showcase and improve my web-dev skills.
        I have put both code and live example, so you can get the correct idea
        of how it works. Visit{" "}
        <a
          href="https://theshawa-dev.web.app"
          className="text-blue hover:underline"
        >
          here
        </a>{" "}
        to know more about me.
      </p>
      <a
        href="https://theshawa-dev.web.app/"
        className="mt-[40px] bg-blue hover:translate-y-[-4px] transition-transform duration-300 active:scale-95 text-white text-[20px] rounded-full px-[20px] py-[10px] font-medium shadow-lg"
      >
        👉 Visit Theshawa Dasun 👈
      </a>
      <div className="grid grid-cols-1 mt-[100px] w-full md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        <Item
          image="/images/react-calendar-component.png"
          name="React Calendar Component"
          slug="react-calendar-component"
          technologies={["React", "TypeScript"]}
        ></Item>
        <Item
          image="/images/react-blur-panel.png"
          name="React Blur Panel"
          slug="react-blur-panel"
          technologies={["React", "TypeScript"]}
        ></Item>
      </div>
    </div>
  );
};

export default Home;
