import { FC, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icons, { IconIndex } from "../Icons";
export const Header: FC<{ technologies: string[] }> = ({ technologies }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between border-b border-color space-x-10">
      <div className="opacity-70 text-black flex items-center space-x-[10px]">
        <button onClick={() => navigate(-1)} className="active:scale-95">
          <svg
            className="w-[16px] h-[16px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <p>
          <Link to="/" className="hover-link">
            codelab
          </Link>{" "}
          {location.pathname.replace("/", "/ ")}
        </p>
      </div>

      <div className="flex space-x-[20px] items-center">
        {technologies.map((t, i) => (
          <Fragment key={i}>{Icons[t as IconIndex]}</Fragment>
        ))}
      </div>
    </header>
  );
};
