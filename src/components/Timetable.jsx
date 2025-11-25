import React from "react";
import { DAYS, toMinutes } from "../utils/scheduleUtils";

// Config – adjust to your campus schedule
const DAY_LABELS = DAYS;           // or DAYS.slice(0, 5) for Mon–Fri only
const START_TIME = "08:00";        // first time shown on the grid
const END_TIME = "22:00";          // last time shown on the grid
const HOUR_STEP = 1;               // 1-hour labels on the left

const startMinutes = toMinutes(START_TIME);
const endMinutes = toMinutes(END_TIME);
const totalMinutes = endMinutes - startMinutes;

/**
 * Flatten sections into a list of meetings we can render.
 * Each meeting knows its course + instructor.
 */
function normalizeCourseMeetings(sections) {
  const items = [];

  sections.forEach((section) => {
    (section.meetings || []).forEach((m) => {
      items.push({
        id: `${section.id}`,
        courseCode: section.courseCode,
        instructor: section.instructor,
        type: m.type,
        day: m.day,
        start: m.start,
        end: m.end,
      });
    });
  });

  return items;
}

/**
 * Convert "HH:MM" to percentage from top of the day column.
 */
function getTopPercent(timeStr) {
  const minutes = toMinutes(timeStr);
  return ((minutes - startMinutes) / totalMinutes) * 100;
}

/**
 * Convert duration to height percentage.
 */
function getHeightPercent(startStr, endStr) {
  const start = toMinutes(startStr);
  const end = toMinutes(endStr);
  return ((end - start) / totalMinutes) * 100;
}

function TimeTable({ sections, personalSections, basket }) {
  const meetings = normalizeCourseMeetings(sections);

  // Group meetings by day
  const meetingsByDay = {};
  DAY_LABELS.forEach((d) => (meetingsByDay[d] = []));
  meetings.forEach((m) => {
    if (meetingsByDay[m.day]) meetingsByDay[m.day].push(m);
  });

  personalSections.forEach((p, i) => {
    if (meetingsByDay[p.day]) meetingsByDay[p.day].push({
        id: `personal-${p.day}-${p.start}-${p.label}-${i}`,
        courseCode: p.label,
        instructor: "",
        type: "PERSONAL",
        day: p.day,
        start: p.start,
        end: p.end,
      });;
  });

  // Get All Meetings
  const allMeetings = DAY_LABELS.flatMap((day) => meetingsByDay[day]);

  // Get unique course codes
  const uniqueCourseCodes = [
    ...new Set(
      allMeetings
        .filter((m) => m.type !== "PERSONAL")
        .map((m) => m.courseCode)
    ),
  ];

  // Map each courseCode to a colour index, every course in the basket has a fixed index (1–10) based on its position.
  const courseIndexMap = Object.fromEntries(
    basket.map((courseId, i) => [courseId, i + 1])
  );

  // Time labels on the left
  const timeLabels = [];
  for (let h = toMinutes(START_TIME); h <= toMinutes(END_TIME); h += 60 * HOUR_STEP) {
    const hour = Math.floor(h / 60);
    const label = `${hour.toString().padStart(2, "0")}:00`;
    timeLabels.push(label);
  }

  return (
    <div className="weekly-calendar">
      <div className="calendar-header">
        <div className="time-column-header" />
        {DAY_LABELS.map((day) => (
          <div key={day} className="day-column-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-body">
        {/* Time labels on the left */}
        <div className="time-column">
          {timeLabels.map((t) => (
            <div key={t} className="time-slot-label">
              {t}
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="day-columns">
          {DAY_LABELS.map((day) => (
            <div key={day} className="day-column">
              {/* background hour lines */}
              {timeLabels.map((t) => (
                <div key={t} className="hour-line" />
              ))}

              {/* meetings for that day */}
              {meetingsByDay[day].map((m) => {
                const rank = m.type !== "PERSONAL" ? courseIndexMap[m.courseCode] : null;


                const blockClass = m.type === "PERSONAL" ? "personal-block" : `course-rank-${rank}`;

                return (
                  <div
                    key={m.id}
                    className={`meeting-block ${blockClass}`}
                    style={{
                      top: `${getTopPercent(m.start)}%`,
                      height: `${getHeightPercent(m.start, m.end)}%`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "700",
                      }}
                    >
                      {m.type !== "PERSONAL" && (
                        <div className="meeting-type">{m.type}</div>
                      )}
                      <div>{m.courseCode}</div>
                    </div>
                    <div className="meeting-time">
                      {m.start} – {m.end}
                    </div>
                    <div className="meeting-instructor">{m.instructor}</div>
                    <div className="meeting-instructor">{m.id}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
