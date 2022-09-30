import { FC } from "react";
import { Link } from "react-router-dom";
const Item: FC<{ to: string; children: string }> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="w-full min-h-[120px] rounded-[10px] font-medium text-[30px] uppercase flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100"
    >
      {children}
    </Link>
  );
};

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      <Item to="/calendar">Calendar</Item>
    </div>
  );
};

export default Home;
