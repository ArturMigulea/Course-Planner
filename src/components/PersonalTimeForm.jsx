// src/components/PersonalTimeForm.jsx
import React, { useState } from "react";
import { DAYS, toMinutes } from "../utils/scheduleUtils.js";

let personalBlockCounter = 1;

function PersonalTimeForm({ onAdd }) {
  const [label, setLabel] = useState("Work");
  const [day, setDay] = useState("Mon");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("12:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    if (toMinutes(start) >= toMinutes(end)) return;

    onAdd({
      id: `PB${personalBlockCounter++}`,
      label: label.trim(),
      day,
      start,
      end,
      type: "personal",
    });
  };

  return (
    <form
      className="card personal-block-form"
      onSubmit={handleSubmit}
    >
      <h3>Add personal time</h3>
			<p className="hint">
				Add personal time blocks. <br /> 
				Conflicts are detected automatically.
			</p>
      <div className="field-group">
        <label className="field">
          <span>Label</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Work / Sports / Commute"
          />
        </label>
        <label className="field">
          <span>Day</span>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="field-group">
        <label className="field">
          <span>Start</span>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className="field">
          <span>End</span>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>
      <button className="btn btn-primary btn-sm">
        Add block
      </button>
    </form>
  );
}

export default PersonalTimeForm;
