import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StatusBadge from "../components/StatusBadge.jsx";
import TaskCard from "../components/TaskCard.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const STORAGE_KEY = "study-planner-data-v1";

export default function DayPage({ theme, toggleTheme }) {
  const { date } = useParams();
  const [days, setDays] = useState({});
  const [day, setDay] = useState({
    date,
    note: "",
    studyTime: "",
    tasks: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    subject: "",
    program: "",
    goal: "",
  });

  const [studyDraft, setStudyDraft] = useState("");
  const [editingStudy, setEditingStudy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const currentDay = parsed[date] || {
        date,
        note: "",
        studyTime: "",
        tasks: [],
      };
      setDays(parsed);
      setDay(currentDay);
      setStudyDraft(currentDay.studyTime || "");
    }
  }, [date]);

  useEffect(() => {
    setDays((prev) => ({ ...prev, [date]: day }));
  }, [day, date]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  }, [days]);

  const submitTask = () => {
    if (!newTask.subject.trim() && !newTask.program.trim()) return;

    const task = {
      id: Date.now().toString(),
      subject: newTask.subject,
      program: newTask.program,
      goal: newTask.goal,
      done: false,
    };

    setDay({ ...day, tasks: [...day.tasks, task] });
    setNewTask({ subject: "", program: "", goal: "" });
    setShowForm(false);
  };

  const saveStudyTime = () => {
    setDay({ ...day, studyTime: studyDraft });
    setEditingStudy(false);
  };

  const clearStudyTime = () => {
    setDay({ ...day, studyTime: "" });
    setStudyDraft("");
    setEditingStudy(false);
  };

  return (
    <div className="page-root">
      <div className="page-shell">
        <header className="top-bar">
          <div className="top-left">
            <Link to="/" className="back-link">
              ⬅ بازگشت
            </Link>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        <main className="content">
          <section className="panel">
            <h2 className="day-title">برنامه روز {date}</h2>

            <StatusBadge day={day} />

            {/* ساعت مطالعه کل روز */}
            <div className="study-time-box">
              <label>⏳ ساعت مطالعه امروز:</label>

              {day.studyTime && !editingStudy ? (
                <div className="study-time-row">
                  <span className="study-time-value">{day.studyTime}</span>
                  <div className="study-time-actions">
                    <button
                      className="pill-btn pill-edit"
                      onClick={() => setEditingStudy(true)}
                    >
                      تغییر
                    </button>
                    <button
                      className="pill-btn pill-delete"
                      onClick={clearStudyTime}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ) : (
                <div className="study-time-edit">
                  <input
                    type="number"
                    className="study-time-input"
                    placeholder="مثلاً ۴ ساعت"
                    value={studyDraft}
                    onChange={(e) => setStudyDraft(e.target.value)}
                  />
                  <button className="pill-btn pill-save" onClick={saveStudyTime}>
                    ثبت
                  </button>
                </div>
              )}
            </div>

            <textarea
              className="note"
              placeholder="یادداشت روز..."
              value={day.note}
              onChange={(e) => setDay({ ...day, note: e.target.value })}
            />

            {!showForm && (
              <button className="add-btn" onClick={() => setShowForm(true)}>
                + افزودن برنامه
              </button>
            )}

            {showForm && (
              <div className="add-form">
                <input
                  className="task-input"
                  placeholder="نام درس"
                  value={newTask.subject}
                  onChange={(e) =>
                    setNewTask({ ...newTask, subject: e.target.value })
                  }
                />

                <input
                  className="task-input"
                  placeholder="برنامه"
                  value={newTask.program}
                  onChange={(e) =>
                    setNewTask({ ...newTask, program: e.target.value })
                  }
                />

                <input
                  className="task-input"
                  placeholder="هدف"
                  value={newTask.goal}
                  onChange={(e) =>
                    setNewTask({ ...newTask, goal: e.target.value })
                  }
                />

                <button className="add-btn" onClick={submitTask}>
                  ثبت برنامه
                </button>
              </div>
            )}

            <div className="tasks-list">
              {day.tasks.map((task) => (
                <TaskCard key={task.id} task={task} day={day} setDay={setDay} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
