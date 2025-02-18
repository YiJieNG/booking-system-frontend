import React, { useState } from "react";

const daysOfWeek = {
  short: ["S", "M", "T", "W", "T", "F", "S"],
  medium: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthlyCalendar = ({
  onClick,
  selectedDate,
  slotsData,
  onMonthChange,
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const formatDateKey = (day, month, year) => {
    const paddedDay = day.toString().padStart(2, "0");
    const paddedMonth = (month + 1).toString().padStart(2, "0");
    return `${paddedDay}-${paddedMonth}-${year}`;
  };

  const getTotalSlots = (dateKey) => {
    if (!slotsData || !slotsData[dateKey]) return 0;
    return Object.values(slotsData[dateKey]).reduce(
      (sum, slots) => sum + slots,
      0
    );
  };

  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length; // Always show 6 weeks
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = currentDate.month === 0 ? 11 : currentDate.month - 1;
    const prevYear =
      currentDate.month === 0 ? currentDate.year - 1 : currentDate.year;

    if (
      prevYear > today.getFullYear() ||
      (prevYear === today.getFullYear() && prevMonth >= today.getMonth())
    ) {
      setCurrentDate({ month: prevMonth, year: prevYear });
      onMonthChange?.(prevMonth, prevYear);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = currentDate.month === 11 ? 0 : currentDate.month + 1;
    const nextYear =
      currentDate.month === 11 ? currentDate.year + 1 : currentDate.year;
    setCurrentDate({ month: nextMonth, year: nextYear });
    onMonthChange?.(nextMonth, nextYear);
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    if (
      currentDate.year > today.getFullYear() ||
      (currentDate.year === today.getFullYear() && newMonth >= today.getMonth())
    ) {
      setCurrentDate((prev) => ({
        ...prev,
        month: newMonth,
      }));
      onMonthChange?.(newMonth, currentDate.year);
    }
  };

  const handleTodayClick = () => {
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    setCurrentDate({
      month: todayMonth,
      year: todayYear,
    });
    onMonthChange?.(todayMonth, todayYear);
  };

  const isDateDisabled = (day, month, year, isCurrentMonth, totalSlots) => {
    const date = new Date(year, month, day);
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Disable if past OR not in current month OR has 0 slots
    return date < todayDate || !isCurrentMonth || totalSlots === 0;
  };

  const isDateSelected = (day, month, year) => {
    return (
      selectedDate &&
      selectedDate.day === day &&
      selectedDate.month === month &&
      selectedDate.year === year
    );
  };

  const monthDays = getDaysInMonth(currentDate.month, currentDate.year);

  const availableMonths = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
    disabled:
      currentDate.year === today.getFullYear() && index < today.getMonth(),
  }));

  return (
    <div className="rounded-2xl bg-[--pink] pb-6 text-[--text-dark] shadow-xl mx-auto relative overflow-hidden">
      <div className="w-full rounded-t-2xl bg-[--pink] px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-1">
          <button
            onClick={handleTodayClick}
            type="button"
            className="rounded-lg border border-[--rose] bg-[--peach] px-3 py-1.5 text-sm font-medium text-[--text-dark] hover:bg-[--green] lg:px-5 lg:py-2.5"
          >
            Today
          </button>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={handlePrevMonth}
              disabled={
                currentDate.year === today.getFullYear() &&
                currentDate.month === today.getMonth()
              }
              className={`rounded-full border border-[--rose] p-1 transition-colors sm:p-2 
                ${
                  currentDate.year === today.getFullYear() &&
                  currentDate.month === today.getMonth()
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[--green] bg-[--peach]"
                }`}
            >
              <svg
                className="size-5 text-[--text-dark]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <Select
              value={`${currentDate.month}`}
              options={availableMonths}
              onChange={handleMonthChange}
            />
            <button
              onClick={handleNextMonth}
              className="rounded-full border border-[--rose] bg-[--peach] p-1 transition-colors hover:bg-[--green] sm:p-2"
            >
              <svg
                className="size-5 text-[--text-dark]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">
            {currentDate.year}
          </h1>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-[--text-dark]">
          {daysOfWeek.short.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-[--rose] py-2 text-center text-sm font-semibold"
            >
              <span className="sm:hidden">{daysOfWeek.short[index]}</span>
              <span className="hidden sm:inline">
                {daysOfWeek.medium[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map(({ day, month, year, isCurrentMonth }, index) => {
            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            const dateKey = formatDateKey(day, month, year);
            const totalSlots = getTotalSlots(dateKey);
            const disabled = isDateDisabled(
              day,
              month,
              year,
              isCurrentMonth,
              totalSlots
            );
            const selected = isDateSelected(day, month, year);

            return (
              <div
                key={index}
                onClick={() => !disabled && onClick?.(day, month, year)}
                className={`relative group h-24 rounded-lg border border-[--rose] font-medium transition-all flex flex-col justify-between
                ${
                  selected
                    ? "bg-[--emerald] hover:bg-[--green]"
                    : "bg-[--peach]"
                }
                ${!isCurrentMonth ? "opacity-30" : ""}
                ${
                  disabled
                    ? "cursor-not-allowed opacity-30"
                    : "cursor-pointer hover:z-10 hover:border-[--text-hover] hover:bg-[--green]"
                }`}
              >
                <div className="flex justify-center items-center pt-4">
                  <span
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-lg sm:text-xl md:text-2xl
                    ${
                      isToday
                        ? "bg-[--green] font-semibold text-[--text-dark] border border-[--text-hover]"
                        : "text-[--text-dark]"
                    }
                    ${isCurrentMonth ? "font-semibold" : "font-normal"}`}
                  >
                    {day}
                  </span>
                </div>
                <div className="pb-2 px-1 text-center">
                  {totalSlots > 0 && !disabled && (
                    <span className="text-sm sm:text-base font-semibold text-[--text-hover] group-hover:text-[--text-dark] transition-colors">
                      {totalSlots}
                      <span className="hidden lg:inline"> slots</span>
                    </span>
                  )}
                  {totalSlots === 0 && isCurrentMonth && (
                    <span className="text-sm text-gray-400">
                      <span className="sm:hidden">0</span>
                      <span className="hidden sm:inline">No slots</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}) => (
  <div className={`relative ${className}`}>
    {label && (
      <label
        htmlFor={name}
        className="mb-2 block font-medium text-[--text-dark]"
      >
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-[--rose] bg-[--peach] py-1.5 pl-2 pr-6 text-sm font-medium text-[--text-dark] sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 text-[--text-dark]"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
