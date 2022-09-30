import { FC } from "react";
export const Code: FC<{ code: string }> = ({ code }) => {
  return (
    <div className="flex flex-col mt-[40px] relative pt-[70px] md:pt-[20px] bg-black text-white text-opacity-80 rounded-md p-[20px] max-w-full overflow-auto">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          alert("Code copied!!!");
        }}
        className="absolute right-[20px] w-[50px] h-[50px] rounded-full bg-blue active:scale-95 bg-opacity-30 flex items-center justify-center top-[20px]"
      >
        <svg
          width={20}
          className="fill-blue"
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" />
        </svg>
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
