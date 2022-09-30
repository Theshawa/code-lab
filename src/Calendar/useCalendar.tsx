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
