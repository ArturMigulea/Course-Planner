import React, { useState } from "react";

function SelectedCourses({
  basketIndex,
  course,
  sectionsForTerm,
  selectedSectionIds,
  onAddSection,
  onRemoveSection,
  onRemoveCourse,
  dragHandleProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const relevantSections = sectionsForTerm.filter(
    (s) => s.courseCode === course.code
  );

  const formatMeetings = (sec) => {
    if (!sec.meetings || sec.meetings.length === 0) return "No meeting time";

    return sec.meetings.map((m, i) => (
      <span key={i}>
        {`${m.day} ${m.start}–${m.end} ${m.type || ""}`.trim()}
        <br />
      </span>
    ));
  };

  if (relevantSections.length === 0) {
    return (
      <p className="empty-state small schedule-sections-empty">
        No sections for <strong>{course.code}</strong> in this term.
      </p>
    );
  }

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleHeaderKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div className="schedule-sections">
      <div
        className="accordion-header accordion-header-course"
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={handleHeaderKeyDown}
        {...dragHandleProps} // make header the drag handle
      >
        <div style={{ display: "block" }}>
          <div
            className={`course-basket-rank-label course-basket-rank-${basketIndex}`}
            style={{ paddingBottom: "10px" }}
          >
            Ranking: {basketIndex}
          </div>

          <div className="accordion-content">
            <button
              type="button"
              className="btn btn-xs btn-ghost"
              onClick={(e) => {
                e.stopPropagation(); // don’t toggle accordion when removing
                onRemoveCourse();
              }}
            >
              Remove
            </button>

            <div className="course-main" style={{ paddingLeft: "3%" }}>
              <div className="course-title-row">
                <span className="course-code">{course.code}</span>
                <span className="course-title">{course.title}</span>
              </div>
              <div className="course-meta">
                <span>Dept: {course.department}</span>
                <span>Year: {course.year}</span>
                <span>Credits: {course.credits}</span>
                <span>Instructor: {course.prof}</span>
              </div>
            </div>

            <div className="accordion-header-right">
              <span className="accordion-icon">{isOpen ? "▴" : "▾"}</span>
            </div>
          </div>

          {/* Accordion body – section list with Show/Hide buttons */}
          {isOpen && (
            <ul className="section-list section-list-accordion">
              {relevantSections.map((sec) => {
                const selected = selectedSectionIds.includes(sec.id);
                return (
                  <li key={sec.id} className="section-item">
                    <div className="section-text">
                      <div className="section-title-row">
                        <span className="section-course-code">
                          {sec.courseCode}
                        </span>
                        <span className="section-id">{sec.id}</span>
                        <span className="section-prof">{sec.instructor}</span>
                      </div>
                      <div className="section-meta">
                        <span>{formatMeetings(sec)}</span>
                      </div>
                    </div>

                    <button
                      className={`btn btn-xs ${
                        selected ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // don’t toggle accordion when removing
                        selected ? onRemoveSection(sec.id) : onAddSection(sec.id)
                      }}
                    >
                      {selected ? "Hide" : "Show"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedCourses;
