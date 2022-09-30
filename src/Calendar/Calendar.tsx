import { CodePage } from "../components/CodePage";
import { MONTHS, WEEK_DAYS } from "./data";
import useCalendar from "./useCalendar";

export const Calendar = () => {
  const { dates, selected, today, view, setView, setSelected } = useCalendar();

  return (
    <CodePage
      code={`

// useCalendar.ts

import { useRef, useState, useCallback, useEffect } from "react";

const useCalendar = () => {
    const today = useRef(new Date());

    const [selected, setSelected] = useState<Date>(today.current);
    const [view, setView] = useState<{ year: number; month: number }>({
        year: today.current.getFullYear(),
        month: today.current.getMonth(),
    });

    const [dates, setDates] = useState<(null | Date)[]>([]);

    const setupDates = useCallback(() => {
        const startDay = new Date(view.year, view.month, 1);
        const endDay = new Date(view.year, view.month + 1, 0);

        const monthDaysCount = endDay.getDate() - (startDay.getDate() - 1);

        const startEmptyDates = startDay.getDay();

        const dates: (null | Date)[] = [];

        for (let i = 0; i < startEmptyDates; i++) {
            dates.push(null);
        }

        for (let i = 0; i < monthDaysCount; i++) {
            dates.push(new Date(view.year, view.month, i + 1));
        }

        setDates(dates);
    }, [view]);

    useEffect(() => {
        setupDates();
    }, [setupDates]);

    return { dates, selected, today, view, setView, setSelected };
};

export default useCalendar;


// Usage

const { dates, selected, today, view, setView, setSelected } = useCalendar();
       `}
      githubLink="https://github.com/Theshawa/code-lab/tree/main/src/Calendar"
      technologies={["React", "TypeScript"]}
      title="React Calendar Component"
    >
      <div className="flex flex-col rounded-[10px] border border-color w-[calc(60px*7)] max-w-full">
        <div className="flex items-center justify-between p-[20px] border-b border-color">
          <p className="">
            Year:{" "}
            <select
              value={view.year}
              className="font-medium cursor-pointer"
              onChange={(e) => {
                setView({ ...view, year: parseInt(e.target.value) });
              }}
              name="year"
            >
              {Array.from(Array(201)).map((_, i) => (
                <option key={i} value={selected.getFullYear() - 100 + i}>
                  {selected.getFullYear() - 100 + i}
                </option>
              ))}
            </select>
          </p>
          <p>
            Month:{" "}
            <select
              value={view.month}
              className="font-medium cursor-pointer"
              onChange={(e) => {
                setView({ ...view, month: parseInt(e.target.value) });
              }}
              name="month"
            >
              {MONTHS.map((month, i) => (
                <option key={month} value={i}>
                  {month}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div className="grid grid-cols-7 py-[10px] grid-rows-6 max-w-full w-[calc(60px*7)]">
          {WEEK_DAYS.map((day, i) => (
            <span
              key={day}
              className={`text-center flex text-blue items-center justify-center`}
            >
              {day.slice(0, 2)}
            </span>
          ))}
          {dates.map((date, i) =>
            date ? (
              <button
                key={i}
                onClick={() => {
                  setSelected(date);
                }}
                disabled={selected.toDateString() === date.toDateString()}
                className={`rounded-[4px] transition-all duration-300 flex-shrink-0 w-[60px] h-[50px] disabled:border-opacity-100 border-2 border-blue border-opacity-0 ${
                  date.toDateString() === today.current.toDateString()
                    ? "bg-blue bg-opacity-25"
                    : ""
                }`}
              >
                {date.getDate()}
              </button>
            ) : (
              <span key={i}></span>
            )
          )}
        </div>
        <div className="p-[20px] border-t border-color">
          Selected: {selected.toDateString()}
        </div>
      </div>
    </CodePage>
  );
};
