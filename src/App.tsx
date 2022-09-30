import { Link, Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import Home from "./Home";

function App() {
  return (
    <>
      <header className="mb-[20px] flex items-center justify-between">
        <Link to="/">Code Lab</Link>
        <span className="text-gray-600">
          By{" "}
          <a href="https://theshawa-dev.web.app" className="underline">
            Theshawa Dasun
          </a>
        </span>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
