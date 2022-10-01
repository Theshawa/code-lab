import { Routes, Route } from "react-router-dom";
import BlurPanel from "./BlurPanel";
import Calendar from "./Calendar";
import Home from "./Home";
import SmartPinField from "./SmartPinField";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/react-calendar-component" element={<Calendar />} />
        <Route path="/react-blur-panel" element={<BlurPanel />} />
        <Route
          path="/react-smart-pin-input-field"
          element={<SmartPinField />}
        />
      </Routes>
      <footer className="text-[15px] text-black text-opacity-60 pt-[60px]">
        &copy; All copyrights resereved.
        <br /> Code-lab of Theshawa Dasun (2022)
      </footer>
    </>
  );
}

export default App;
