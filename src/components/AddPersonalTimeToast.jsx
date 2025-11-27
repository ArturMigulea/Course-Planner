import React, { useState } from "react";
import PersonalTimeForm from "./PersonalTimeForm";

export default function AddPersonalTimeToast({ onAdd }) {
  const [open, setOpen] = useState(false);

  const handleAdd = (block) => {
    onAdd(block);
    setOpen(false);  // close toast on successful add
  };

  return (
    <>
      <button 
        className="btn btn-primary" 
        onClick={() => setOpen(true)} 
        style={{ whiteSpace: "nowrap", width: "auto" }}
      >
        + Add Personal Time
      </button>

      {open && (
        <div className="toast-overlay" onClick={() => setOpen(false)}>
          <div
            className="toast-panel"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
          >
            <button className="toast-close" onClick={() => setOpen(false)}>
              ×
            </button>
            <PersonalTimeForm onAdd={handleAdd} />
          </div>
        </div>
      )}
    </>
  );
}
