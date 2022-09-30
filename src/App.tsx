import { Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import Home from "./Home";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/react-calendar-component" element={<Calendar />} />
      </Routes>
      <footer className="text-[15px] text-black text-opacity-60 pt-[60px]">
        &copy; All copyrights resereved.
        <br /> Code-lab of Theshawa Dasun (2022)
      </footer>
    </>
  );
}

export default App;
