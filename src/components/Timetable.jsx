// src/components/Timetable.jsx
import React, { useMemo } from "react";
import { DAYS, toMinutes } from "../utils/scheduleUtils.js";

function Timetable({ term, sections, personalBlocks }) {
  const blocksByDay = useMemo(() => {
    const result = {};
    DAYS.forEach((d) => (result[d] = []));

    // sections (multi-day, using meetings[])
    sections.forEach((sec) => {
      if (sec.term && sec.term !== term) return;

      // Support new structure with meetings[]
      let meetings = [];
      if (Array.isArray(sec.meetings) && sec.meetings.length > 0) {
        meetings = sec.meetings;
      } else if (sec.days && sec.start && sec.end) {
        // Fallback if you still have any old-style sections
        meetings = sec.days.map((day) => ({
          day,
          start: sec.start,
          end: sec.end,
        }));
      }

      meetings.forEach((m) => {
        const day = m.day;
        if (!result[day]) result[day] = [];

        result[day].push({
          id: `${sec.id}:${day}:${m.start}`,
          label: sec.courseCode,
          start: m.start,
          end: m.end,
          type: "course",
        });
      });
    });

    // personal blocks (these already have day/start/end)
    personalBlocks.forEach((pb) => {
      if (pb.term && pb.term !== term) return;
      if (!result[pb.day]) result[pb.day] = [];
      result[pb.day].push({
        id: pb.id,
        label: pb.label,
        start: pb.start,
        end: pb.end,
        type: "personal",
      });
    });

    // sort by time
    for (const d of DAYS) {
      result[d].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    }

    return result;
  }, [term, sections, personalBlocks]);

  return (
    <div className="timetable">
      <div className="timetable-header">
        <h3>Weekly timetable</h3>
      </div>
      <div className="timetable-grid">
        {DAYS.map((day) => (
          <div key={day} className="timetable-day">
            <div className="timetable-day-header">{day}</div>
            <div className="timetable-day-body">
              {blocksByDay[day] &&
                blocksByDay[day].map((b) => (
                  <div
                    key={b.id}
                    className={`timetable-block ${
                      b.type === "course"
                        ? "block-course"
                        : "block-personal"
                    }`}
                  >
                    <div className="block-label">{b.label}</div>
                    <div className="block-time">
                      {b.start}–{b.end}
                    </div>
                  </div>
                ))}
              {(!blocksByDay[day] || blocksByDay[day].length === 0) && (
                <div className="timetable-empty">Free</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;
