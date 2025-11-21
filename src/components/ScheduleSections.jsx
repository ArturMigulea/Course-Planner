// src/components/ScheduleSections.jsx
import React from "react";

function ScheduleSections({
  term,
  sectionsForTerm,
  basket,
  selectedSectionIds,
  onAddSection,
  onRemoveSection,
}) {
  const relevantSections = sectionsForTerm.filter((s) =>
    basket.includes(s.courseCode)
  );

  return (
    <div className="schedule-sections">
      <h3>Available sections – {term} term</h3>
      {relevantSections.length === 0 ? (
			<p className="empty-state">
				Add courses to your basket to see their sections here.
			</p>
      ) : (
			<ul className="section-list">
				{relevantSections.map((sec) => {
					const selected = selectedSectionIds.includes(sec.id);
					return (
					<li key={sec.id} className="section-item">
						<div>
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
							{/* mode is optional now */}
							{sec.mode && <span>{sec.mode}</span>}
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
							{selected ? "Remove" : "Add"}
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
