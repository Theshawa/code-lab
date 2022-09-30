import { Code } from "../Code";
import { MONTHS, WEEK_DAYS } from "./data";
import useCalendar from "./useCalendar";

export const Calendar = () => {
  const { dates, selected, today, view, setView, setSelected } = useCalendar();

  return (
    <>
      <div className="flex space-y-[20px] lg:space-x-[20px] mb-[40px] bg-gray-100 w-max max-w-full lg:flex-row flex-col lg:space-y-0 p-[20px] rounded-md lg:items-center min-h-[84px]">
        <h1 className="font-black uppercase text-[24px] pr-[20px]">Calendar</h1>

        <p className="lg:pl-[20px] lg:border-l lg:border-gray-400">
          Year:{" "}
          <select
            value={view.year}
            className="font-medium"
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
            className="font-medium"
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

        <span className="text-gray-600 italic lg:pl-[20px] lg:border-l lg:border-gray-400">
          Selected: {selected.toDateString()}
        </span>

        {selected.toDateString() === today.current.toDateString() ? (
          ""
        ) : (
          <button
            className="bg-blue-600 rounded-md text-white px-[16px] py-[10px]"
            onClick={() => {
              setSelected(today.current);
              setView({
                year: today.current.getFullYear(),
                month: today.current.getMonth(),
              });
            }}
          >
            Select today
          </button>
        )}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 gap-[10px] max-w-full w-[calc(60px*7)] h-[calc(60px*7)]">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="font-medium text-center">
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
              className={`disabled:ring-opacity-100 ring-[2px] transition-all duration-300 ring-blue-400 ring-opacity-0 rounded-full flex-shrink-0 w-[50px] h-[50px] ${
                date.toDateString() === today.current.toDateString()
                  ? "bg-blue-100"
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

      <h2 className="mt-[100px] text-[30px]">Code</h2>
      <p className="text-gray-600 ">
        Technologies: <span className="">Typescript + React</span>
      </p>

      <Code
        code={`
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

`}
      />
    </>
  );
};
