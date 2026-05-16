import moment from "jalali-moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CalendarView() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(moment());

  const year = current.jYear();
  const month = current.jMonth() + 1;
  const daysInMonth = current.jDaysInMonth();

  const today = moment().format("jYYYY-jMM-jDD");
  const firstDayOfMonth = moment(`${year}/${month}/1`, "jYYYY/jM/jD").day();

  const weeks = [];
  let week = [];

  for (let i = 0; i < firstDayOfMonth; i++) week.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const goNext = () => setCurrent(current.clone().add(1, "jMonth"));
  const goPrev = () => setCurrent(current.clone().subtract(1, "jMonth"));

  return (
    <>
      <div className="calendar-header">
        <button className="nav-btn" onClick={goPrev}>
          ◀
        </button>
        <h3 className="calendar-title">{current.format("jMMMM jYYYY")}</h3>
        <button className="nav-btn" onClick={goNext}>
          ▶
        </button>
      </div>

      <div className="calendar-grid">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d) => (
          <div key={d} className="calendar-day-name">
            {d}
          </div>
        ))}

        {weeks.map((week, i) => (
          <div key={i} className="calendar-week">
            {week.map((day, j) => {
              const dateStr =
                day &&
                `${year}-${String(month).padStart(2, "0")}-${String(
                  day
                ).padStart(2, "0")}`;

              const isToday = dateStr === today;

              return (
                <button
                  key={j}
                  className={`calendar-day-btn ${
                    day ? "" : "empty-day"
                  } ${isToday ? "today" : ""}`}
                  disabled={!day}
                  onClick={() => day && navigate(`/day/${dateStr}`)}
                >
                  {day || ""}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
