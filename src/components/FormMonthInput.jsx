import { useState, useEffect } from "react";
import { format, parse } from "date-fns";

export default function FormMonthInput({ value, handleChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentRole, setIsCurrentRole] = useState(false);

  function formatDateToValue(dateStr) {
    const [year, month] = dateStr.split("-");
    const date = new Date(year, month - 1);

    return format(date, "MMMM, yyyy");
  }

  function formatValueToDate(value) {
    const date = parse(value, "MMMM, yyyy", new Date());

    return format(date, "yyyy-MM");
  }

  function handleCurrentChange(e) {
    setIsCurrentRole(e.target.checked);
    setEndDate("");
  }

  useEffect(() => {
    if (!((startDate && endDate) || (startDate && isCurrentRole))) return;

    handleChange(
      `${formatDateToValue(startDate)} - ${isCurrentRole ? "Present" : formatDateToValue(endDate)}`,
    );
  }, [startDate, endDate, isCurrentRole]);

  useEffect(() => {
    if (value) {
      const [start, end] = value.split(" - ");

      setStartDate(formatValueToDate(start));
      if (end !== "Present") {
        setEndDate(formatValueToDate(end));
      } else {
        setIsCurrentRole(true);
      }
    }
  }, []);

  return (
    <>
      <label
        className="flex items-center gap-x-2 text-xl font-medium"
        htmlFor="current"
      >
        <input
          className="size-6 cursor-pointer"
          type="checkbox"
          name="current"
          id="current"
          checked={isCurrentRole}
          onChange={handleCurrentChange}
        />
        Current Role
      </label>
      <div className="flex w-full gap-x-4">
        <MonthInput
          field="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <MonthInput
          field="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={isCurrentRole}
        />
      </div>
    </>
  );
}

function MonthInput({ field, value, onChange, disabled = false }) {
  const formatted = field.toLowerCase().replace(" ", "-");

  return (
    <div className={`flex w-full flex-col gap-y-2 overflow-y-hidden`}>
      <label className="text-2xl font-medium" htmlFor={formatted}>
        {field}
      </label>
      <input
        className="form-control cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-75"
        type="month"
        name={formatted}
        id={formatted}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onClick={(e) => e.target.showPicker()}
      />
    </div>
  );
}
