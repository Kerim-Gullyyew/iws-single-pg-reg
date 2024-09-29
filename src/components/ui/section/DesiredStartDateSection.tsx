import React, { useEffect, useState } from "react";
import PText from "../../text/PText";
import Dropdown2 from "../../form/Dropdown2";
import PRedText from "../../text/PRedText";
import { ValidationErrors } from "../../../utils/Interfaces";
import { DateObject } from "../../../utils/Interfaces";
import { getMonthName } from "../../../utils/getMonthName";

interface DesiredStartDateSectionProps {
  date: DateObject;
  setDate: React.Dispatch<React.SetStateAction<DateObject>>;
  validationErrors?: ValidationErrors;
}

const DesiredStartDateSection: React.FC<DesiredStartDateSectionProps> = ({
  date,
  setDate,
  validationErrors,
}) => {
  const today = new Date();
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const isLeapYear = (year: number): boolean =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const getDaysInMonth = (month: number, year: number): number => {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(month)) {
      return 30;
    }
    return 31;
  };

  useEffect(() => {
    const newDaysInMonth = getDaysInMonth(date.month, date.year);
    const days = Array.from({ length: newDaysInMonth }, (_, i) => i + 1);
    const validDays =
      date.year === today.getFullYear() && date.month === today.getMonth() + 1
        ? days.filter((day) => day >= today.getDate())
        : days;
    setDaysInMonth(validDays);
    if (!validDays.includes(date.day)) {
      setDate((currentDate) => ({ ...currentDate, day: validDays[0] }));
    }
  }, [date.month, date.year]);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 2 }, (_, i) => today.getFullYear() + i);
  const filteredMonths = months.filter(
    (month) => month !== 6 && month !== 7 && month !== 8
  );
  const handleDateSelection = (
    field: keyof DateObject,
    value: number | string
  ) => {
    const newDate = { ...date, [field]: value };

    if (
      newDate.year === today.getFullYear() &&
      newDate.month < today.getMonth() + 1
    ) {
      return;
    }
    if (
      newDate.year === today.getFullYear() &&
      newDate.month === today.getMonth() + 1 &&
      newDate.day < today.getDate()
    ) {
      return;
    }
    setDate((currentDate) => ({ ...currentDate, [field]: value }));
  };

  return (
    <div>
      <PText text="Start Date" required={true} />
      {validationErrors && validationErrors.date && (
        <PRedText text={validationErrors.date} />
      )}

      <div className="flex justify-between flex-wrap gap-3 items-center">
        <Dropdown2
          handle={(value) => handleDateSelection("day", value)}
          value={date.day}
          label="Day"
          items={daysInMonth.map((day) => ({
            label: day.toString(),
            value: day,
          }))}
        />
        <div className="flex-1">
          <Dropdown2
            handle={(value) => handleDateSelection("month", value)}
            value={getMonthName(date.month)}
            label="Month"
            items={filteredMonths
              .filter(
                (month) =>
                  date.year > today.getFullYear() ||
                  month >= today.getMonth() + 1
              )
              .map((month) => ({ label: getMonthName(month), value: month }))}
          />
        </div>
        <Dropdown2
          handle={(value) => handleDateSelection("year", value)}
          value={date.year}
          label="Year"
          items={years.map((year) => ({ label: year.toString(), value: year }))}
        />
      </div>
    </div>
  );
};

export default DesiredStartDateSection;
