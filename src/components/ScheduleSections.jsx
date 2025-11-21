function ScheduleSections({
  courseCode,
  sectionsForTerm,
  selectedSectionIds,
  onAddSection,
  onRemoveSection,
}) {
  const relevantSections = sectionsForTerm.filter(
    (s) => s.courseCode === courseCode
  );

  return (
    <div className="schedule-sections">
      {relevantSections.length === 0 ? (
        <p className="empty-state small">
          No sections for <strong>{courseCode}</strong> in this term.
        </p>
      ) : (
        <ul className="section-list">
          {relevantSections.map((sec) => {
            const selected = selectedSectionIds.includes(sec.id);
            return (
              <li key={sec.id} className="section-item">
                <div style={{ width: "100%" }}>
                  <div className="section-title-row">
                    <span className="section-course-code">
                      {sec.courseCode}
                    </span>
                    <span className="section-id">{sec.id}</span>
                  </div>
                  <div className="section-meta">
                    <span>
                      {sec.days.join(", ")} {sec.start}–{sec.end}
                    </span>
                    <span>{sec.instructor}</span>
                  </div>
                </div>

                <button
                  className={`btn btn-xs ${
                    selected ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={() =>
                    selected ? onRemoveSection(sec.id) : onAddSection(sec.id)
                  }
                >
                  {selected ? "Hide" : "Show"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ScheduleSections;