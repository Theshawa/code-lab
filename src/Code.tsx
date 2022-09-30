import { FC } from "react";
export const Code: FC<{ code: string }> = ({ code }) => {
  return (
    <div className="flex flex-col mt-[40px] relative bg-gray-50 pt-[20px]  rounded-md p-[20px] max-w-full overflow-auto">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          alert("Code copied!!!");
        }}
        className="absolute right-[20px] top-[20px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          fill="blue"
        >
          <path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" />
        </svg>
      </button>
      <pre className="font-medium">
        <code>{code}</code>
      </pre>
    </div>
  );
};
