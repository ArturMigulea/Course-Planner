import React, { useMemo, useState, useEffect } from "react";

import SelectedCourses from "./components/SelectedCourses.jsx";
import Timetable from "./components/Timetable.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import AddPersonalTimeToast from "./components/AddPersonalTimeToast.jsx";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { conflictBetweenSectionAndItems, conflictBetweenBlockAndItems, } from "./utils/scheduleUtils.js";

// Get Course Information
import { COURSES, DEPARTMENTS, YEARS } from "./data/courses.js";
import { SECTIONS } from "./data/sections.js";

const toggleTheme = () => {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
};

function App() {
  // course search / filters
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [year, setYear] = useState("ALL");
  const [eligibleOnly, setEligibleOnly] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(true);

  // Auto set window to dark mode
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const root = document.documentElement;

    if (saved === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (saved === "light") {
      root.removeAttribute("data-theme");
    } else {
      // Default if no saved preference
      root.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    // no position change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder the basket (array of course codes)
    setBasket((prev) => {
      const items = Array.from(prev); // e.g. ["ADM1300", "MAT1300", ...]
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      return items;
    });
  };

  // Already Completed Courses
  const [completedInput, setCompletedInput] = useState(
    "ADM1300, MAT1300, ITI1121"
  );

  const completedSet = useMemo(() => {
    return new Set(
      completedInput
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean)
    );
  }, [completedInput]);

  // basket & schedule state
  const [basket, setBasket] = useState([]); // array of course codes
  const [selectedTerm, setSelectedTerm] = useState("F"); // "F" | "W" | "S"
  const [selectedSectionIds, setSelectedSectionIds] = useState([]);
  const [personalBlocks, setPersonalBlocks] = useState([]);
  const [message, setMessage] = useState("");

  const sectionsForTerm = useMemo(
    () => SECTIONS.filter((s) => !s.term || s.term === selectedTerm),
    [selectedTerm]
  );

  const chosenSections = useMemo(
    () =>
      sectionsForTerm.filter((s) => selectedSectionIds.includes(s.id)),
    [sectionsForTerm, selectedSectionIds]
  );

  const scheduledItems = useMemo(
    () => [...chosenSections, ...personalBlocks],
    [chosenSections, personalBlocks]
  );

  const isEligible = (course) =>
    course.prereqs.every((p) => completedSet.has(p));

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      if (department !== "ALL" && course.department !== department) {
        return false;
      }

      if (year !== "ALL" && course.year !== Number(year)) {
        return false;
      }

      if (eligibleOnly && !isEligible(course)) {
        return false;
      }

      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        course.code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q)
      );
    });
  }, [query, department, year, eligibleOnly, completedSet]);

  // --- handlers --- //

  const toggleBasket = (courseCode) => {
    setMessage("");

    setBasket((prev) => {
      // If course is already in basket → remove it
      if (prev.includes(courseCode)) {
        // Also remove its sections from the schedule
        setSelectedSectionIds((prevIds) =>
          prevIds.filter((id) => {
            const sec = sectionsForTerm.find((s) => s.id === id);
            // keep this section if we can't find it
            // or if it belongs to a different course
            return !sec || sec.courseCode !== courseCode;
          })
        );

        return prev.filter((c) => c !== courseCode);
      }

      // Adding a course
      if (prev.length >= 10) {
        setMessage(
          "Basket limit reached (10 courses). Remove one to add another."
        );
        return prev;
      }

      return [...prev, courseCode];
    });
  };

  // Adding a course to the basket
  const handleAddSection = (sectionId) => {
    // Clear the error message
    setMessage("");

    // Find the course in the basket array
    const section = sectionsForTerm.find((s) => s.id === sectionId);

    // If it has not been found, do not do anything
    if (!section) return;

    // Check for conflicts in the term
    const conflictItem = conflictBetweenSectionAndItems(
      section,
      scheduledItems,
      selectedTerm
    );

    // If there were term conflicts, then display an error
    if (conflictItem) {
      setMessage(
        `Time conflict: ${section.id} overlaps with ${
          conflictItem.id || conflictItem.label
        }.`
      );
      return;
    }

    // Add the section ID to the basket array
    setSelectedSectionIds((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
  };

  // Removing a course from the basket
  const handleRemoveSection = (sectionId) => {
    // Loop through every ID and remove the one ID being removed
    setSelectedSectionIds((prev) => prev.filter((id) => id !== sectionId));
  };

  const handleAddPersonalBlock = (block) => {
    setMessage("");

    const conflictItem = conflictBetweenBlockAndItems(
      block,
      scheduledItems,
      selectedTerm
    );

    if (conflictItem) {
      setMessage(
        `Personal block conflicts with ${
          conflictItem.id || conflictItem.label
        }.`
      );
      return;
    }

    setPersonalBlocks((prev) => [...prev, { ...block, term: selectedTerm }]);
  };

  const handleRemovePersonalBlock = (id) => {
    setPersonalBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleCourseSchedule = (courseCode, checked) => {
    setMessage("");

    if (checked) {
      const section = sectionsForTerm.find(
        (s) => s.courseCode === courseCode
      );

      if (!section) {
        setMessage(
          `No sections defined for ${courseCode} in this term.`
        );
        return;
      }

      const conflictItem = conflictBetweenSectionAndItems(
        section,
        scheduledItems,
        selectedTerm
      );
      if (conflictItem) {
        setMessage(
          `Time conflict: ${courseCode} overlaps with ${
            conflictItem.courseCode || conflictItem.label
          }.`
        );
        return;
      }

      setSelectedSectionIds((prev) =>
        prev.includes(section.id) ? prev : [...prev, section.id]
      );
    } else {
      const sectionIdsToRemove = sectionsForTerm
        .filter((s) => s.courseCode === courseCode)
        .map((s) => s.id);

      setSelectedSectionIds((prev) =>
        prev.filter((id) => !sectionIdsToRemove.includes(id))
      );
    }
  };

  const basketCourses = useMemo(
    () =>
      basket
        .map((code) => COURSES.find((c) => c.code === code))
        .filter(Boolean),
    [basket]
  );

  return (
    <div className="app-root">
      <header className="app-header">
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <h1>uOttawa Smart Planner</h1>
          <ThemeToggle toggleTheme={toggleTheme} />
        </div>
        <p className="app-subtitle">
          Smarter course search and interactive schedule builder.
        </p>
      </header>

      <main className="app-layout">
        {/* LEFT: search */}
          <section
            className="panel left-panel"
            style={{
              width: isSearchOpen ? "35%" : "0",
              minWidth: isSearchOpen ? "260px" : "0",
              padding: isSearchOpen ? "0 14px" : "0",
              overflow: "hidden",
              transition: "width 0.25s ease, min-width 0.25s ease, padding 0.25s ease",
            }}
          >
          {/* Conditionally rendered SEARCH PANEL */}
          {isSearchOpen && (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center", // center looks nicer than baseline
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h2>Course Search</h2>
                <button
                  className="btn btn-primary btn-xs"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  aria-label={isSearchOpen ? "Hide search panel" : "Show search panel"}
                >
                  {isSearchOpen ? "Hide Search" : "Open Search"}
                </button>
              </div>

              <div className="card">
                <label className="field">
                  <span>Completed courses (for eligibility)</span>
                  <input
                    type="text"
                    value={completedInput}
                    onChange={(e) => setCompletedInput(e.target.value)}
                    placeholder="e.g. ADM1300, MAT1300, ITI1121"
                  />
                  <small>
                    Used to determine which courses you are eligible to take based on
                    prerequisites.
                  </small>
                </label>
              </div>

              <div className="card">
                <div className="filters-card">
                  <div className="filters-row">
                    <label className="field">
                      <span>Search</span>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Code or title (e.g. ADM1300)"
                      />
                    </label>

                    <label className="field">
                      <span>Department</span>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="ALL">All</option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field">
                      <span>Year level</span>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option value="ALL">All</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="checkbox-field">
                    <input
                      type="checkbox"
                      checked={eligibleOnly}
                      onChange={(e) => setEligibleOnly(e.target.checked)}
                    />
                    <span>Show only courses I&apos;m eligible for</span>
                  </label>
                </div>

                <div className="course-list-card">
                  <div className="course-list-header">
                    <h3>
                      Results <span className="badge">{filteredCourses.length}</span>
                    </h3>
                  </div>

                  <div className="course-list">
                    {filteredCourses.map((course) => {
                      const inBasket = basket.includes(course.code);
                      const eligible = isEligible(course);
                      const missingPrereqs = course.prereqs.filter(
                        (p) => !completedSet.has(p)
                      );

                      const hasSectionInTerm = sectionsForTerm.some(
                        (s) =>
                          s.courseCode === course.code &&
                          selectedSectionIds.includes(s.id)
                      );

                      return (
                        <div key={course.code} className="course-item">
                          <div className="course-main">
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
                            <div className="course-prereqs">
                              {course.prereqs.length === 0 ? (
                                <span className="pill pill-ok">
                                  No prerequisites
                                </span>
                              ) : eligible ? (
                                <span className="pill pill-ok">
                                  Eligible ✓ (prereqs met)
                                </span>
                              ) : (
                                <span className="pill pill-warn">
                                  Missing: {missingPrereqs.join(", ")}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <button
                              className={`btn btn-xs ${
                                inBasket ? "btn-secondary" : "btn-primary"
                              }`}
                              onClick={() => toggleBasket(course.code)}
                            >
                              {inBasket ? "Remove" : "Add To Basket"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {filteredCourses.length === 0 && (
                      <p className="empty-state">
                        No courses match your filters.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* RIGHT: schedule builder */}
        <section className="right-panel">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              className="btn btn-primary btn-xs"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label={isSearchOpen ? "Hide search panel" : "Show search panel"}
              style={{
                visibility: isSearchOpen ? "hidden" : "visible",
              }}
            >
              {isSearchOpen ? "Hide Search" : "Open Search"}
            </button>

            <div className="schedule-column">
              <AddPersonalTimeToast onAdd={handleAddPersonalBlock} />
            </div>
          </div>

          {message && <div className="message-bar">{message}</div>}
          <div style={{ display: "flex", gap: "10px", height: "100%"}}>
            <div className="card basket-card">
              <div className="card-header-row">
                <h3>Course basket</h3>
                <span className="badge">{basket.length} / 10</span>
              </div>

              {basketCourses.length === 0 ? (
                <p className="empty-state">
                  Add up to 10 courses to compare and schedule.
                </p>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="basket-droppable">
                    {(provided) => (
                      <ul
                        className="basket-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {basketCourses.map((c, index) => (
                          <Draggable
                            key={c.code}
                            draggableId={c.code}
                            index={index}
                          >
                            {(providedDrag, snapshot) => (
                              <li
                                ref={providedDrag.innerRef}
                                {...providedDrag.draggableProps}
                                className={
                                  "basket-item" +
                                  (snapshot.isDragging ? " basket-item-dragging" : "")
                                }
                              >
                                <SelectedCourses
                                  basketIndex={index + 1}
                                  course={c}
                                  sectionsForTerm={sectionsForTerm}
                                  selectedSectionIds={selectedSectionIds}
                                  onAddSection={handleAddSection}
                                  onRemoveSection={handleRemoveSection}
                                  onRemoveCourse={() => toggleBasket(c.code)}
                                  dragHandleProps={providedDrag.dragHandleProps}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>

            <div className="card schedule-grid">
              <Timetable
                sections={chosenSections}
                personalSections={personalBlocks}
                basket={basket}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
