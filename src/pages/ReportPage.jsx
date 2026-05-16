import { useSearchParams } from "react-router-dom";

export default function ReportPage() {
  const [params] = useSearchParams();
  const encoded = params.get("data");

  if (!encoded) return <p>گزارش یافت نشد ❌</p>;

  const report = JSON.parse(decodeURIComponent(encoded));

  return (
    <div className="page-root">
      <div className="page-shell">
        <section className="panel">
          <h2 className="day-title">📄 گزارش کار روز {report.date}</h2>
          <p>⏳ ساعت مطالعه: {report.studyTime || "ثبت نشده"}</p>

          <div className="report-subsection">
            <h3>✔ کارهای انجام شده</h3>
            {report.tasks.filter((t) => t.done).length === 0 ? (
              <p>هیچ کاری انجام نشده.</p>
            ) : (
              <ul>
                {report.tasks
                  .filter((t) => t.done)
                  .map((t) => (
                    <li key={t.id}>
                      {t.subject || "بدون درس"} — {t.program || "بدون برنامه"} — {t.goal || "بدون هدف"}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="report-subsection">
            <h3>✖ کارهای انجام نشده</h3>
            {report.tasks.filter((t) => !t.done).length === 0 ? (
              <p>همه کارها انجام شده 🎉</p>
            ) : (
              <ul>
                {report.tasks
                  .filter((t) => !t.done)
                  .map((t) => (
                    <li key={t.id}>
                      {t.subject || "بدون درس"} — {t.program || "بدون برنامه"} — {t.goal || "بدون هدف"}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
