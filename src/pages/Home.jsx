import { useEffect, useState } from "react";
import CalendarView from "../components/CalendarView.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import moment from "jalali-moment";

const STORAGE_KEY = "study-planner-data-v1";

export default function Home({ theme, toggleTheme }) {
  const [clock, setClock] = useState("");
  const [todayReport, setTodayReport] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setClock(`${h}:${m}:${s}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const data = JSON.parse(saved);
    const todayKey = moment().format("jYYYY-jMM-jDD");
    if (data[todayKey]) setTodayReport(data[todayKey]);
  }, []);

  // ساخت لینک اختصاصی گزارش روز
  const handleShare = () => {
    if (!todayReport) return;

    const reportData = {
      date: todayReport.date,
      studyTime: todayReport.studyTime,
      tasks: todayReport.tasks,
    };

    const encoded = encodeURIComponent(JSON.stringify(reportData));
    const shareLink = `${window.location.origin}/report?data=${encoded}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
      alert("لینک گزارش کپی شد ✅");
    } else {
      prompt("کپی کن:", shareLink);
    }
  };

  return (
    <div className="page-root">
      <div className="page-shell">
        <header className="top-bar">
          <h1 className="title">برنامه‌ریز درسی شمسی</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        <div className="clock-box">{clock}</div>

        <main className="content">
          <section className="panel calendar-panel">
            <CalendarView />
          </section>

          <section className="panel report-panel">
            <h2 className="report-title">گزارش کار امروز</h2>
            {todayReport ? (
              <>
                <p className="report-line">
                  <span>📅 تاریخ: </span>
                  <strong>{todayReport.date}</strong>
                </p>
                <p className="report-line">
                  <span>⏳ ساعت مطالعه: </span>
                  <strong>{todayReport.studyTime || "ثبت نشده"}</strong>
                </p>

                <div className="report-subsection">
                  <h3>✔ کارهای انجام شده</h3>
                  {todayReport.tasks.filter((t) => t.done).length === 0 ? (
                    <p className="report-empty">هیچ کاری انجام نشده.</p>
                  ) : (
                    <ul className="report-list">
                      {todayReport.tasks
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
                  {todayReport.tasks.filter((t) => !t.done).length === 0 ? (
                    <p className="report-empty">همه کارها انجام شده 🎉</p>
                  ) : (
                    <ul className="report-list">
                      {todayReport.tasks
                        .filter((t) => !t.done)
                        .map((t) => (
                          <li key={t.id}>
                            {t.subject || "بدون درس"} — {t.program || "بدون برنامه"} — {t.goal || "بدون هدف"}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                <button className="share-btn" onClick={handleShare}>
                  🔗 اشتراک‌گذاری گزارش
                </button>
              </>
            ) : (
              <p className="report-empty">
                هنوز گزارشی برای امروز ثبت نشده. از روی تقویم روز رو انتخاب کن و برنامه بساز.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
