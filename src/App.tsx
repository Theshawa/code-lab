import { Link, Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/react-calendar-component" element={<Calendar />} />
    </Routes>
  );
}

export default App;
