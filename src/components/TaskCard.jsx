import { useState } from "react";

export default function TaskCard({ task, day, setDay }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    subject: task.subject,
    program: task.program,
    goal: task.goal,
  });

  const updateTask = (fields) => {
    const updatedTasks = day.tasks.map((t) =>
      t.id === task.id ? { ...t, ...fields } : t
    );
    setDay({ ...day, tasks: updatedTasks });
  };

  const toggleDone = () => updateTask({ done: !task.done });

  const remove = () => {
    setDay({
      ...day,
      tasks: day.tasks.filter((t) => t.id !== task.id),
    });
  };

  const saveEdit = () => {
    updateTask(draft);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="task-card editing">
        <input
          className="task-input"
          placeholder="نام درس"
          value={draft.subject}
          onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
        />

        <input
          className="task-input"
          placeholder="برنامه"
          value={draft.program}
          onChange={(e) => setDraft({ ...draft, program: e.target.value })}
        />

        <input
          className="task-input"
          placeholder="هدف"
          value={draft.goal}
          onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
        />

        <div className="task-footer">
          <button className="add-btn" onClick={saveEdit}>
            ذخیره
          </button>
          <button className="delete-btn" onClick={() => setIsEditing(false)}>
            انصراف
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={`task-card row ${task.done ? "task-done" : ""}`}>
      <div className="task-row">
        <div className="task-meta">
          <span className="chip chip-subject">
            {task.subject || "بدون درس"}
          </span>
          <span className="chip chip-program">
            {task.program || "بدون برنامه"}
          </span>
          <span className="chip chip-goal">
            {task.goal || "بدون هدف"}
          </span>
        </div>

        <div className="task-actions">
          <button
            className={`pill-btn ${task.done ? "pill-done" : ""}`}
            onClick={toggleDone}
          >
            {task.done ? "✔ انجام شد" : "انجام شد"}
          </button>

          <button
            className="pill-btn pill-edit"
            onClick={() => setIsEditing(true)}
          >
            ویرایش
          </button>

          <button className="pill-btn pill-delete" onClick={remove}>
            حذف
          </button>
        </div>
      </div>
    </article>
  );
}
