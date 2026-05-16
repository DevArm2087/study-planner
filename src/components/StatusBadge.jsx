export default function StatusBadge({ day }) {
  const status = getStatus(day);

  const map = {
    all: { text: "کامل", color: "#22c55e" },
    partial: { text: "نصفه", color: "#facc15" },
    none: { text: "هیچ", color: "#f97316" },
    empty: { text: "بدون برنامه", color: "#6b7280" },
  };

  return (
    <span className="status-badge" style={{ background: map[status].color }}>
      {map[status].text}
    </span>
  );
}

function getStatus(day) {
  if (!day || day.tasks.length === 0) return "empty";
  const done = day.tasks.filter((t) => t.done).length;
  if (done === 0) return "none";
  if (done === day.tasks.length) return "all";
  return "partial";
}
