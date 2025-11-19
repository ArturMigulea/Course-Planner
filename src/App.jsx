import React, { useState, useEffect } from "react";

function parseCoursesFromText(text) {
  // Split into lines, trim, and ignore empty ones
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line, index) => {
    // Expected format:
    // name | code | professor | timeslots | prereqs
    const parts = line.split("|").map((p) => p.trim());

    const [name, code, professor, timeslotsRaw, prereqsRaw] = parts;

    const timeslots = timeslotsRaw
      ? timeslotsRaw
          .split(";")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const prerequisites = prereqsRaw
      ? prereqsRaw
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    return {
      id: index,
      name: name || "",
      code: code || "",
      professor: professor || "",
      timeslots,
      prerequisites,
    };
  });
}

const App = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await fetch("/classes.txt");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const text = await res.text();
        setRawText(text);
        const parsed = parseCoursesFromText(text);
        setCourses(parsed);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Could not load or parse classes.txt from the public folder.");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Class Viewer</h1>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Raw file: classes.txt</h2>
        {loading && <p>Loading classes.txt...</p>}
        {!loading && (
          <>
            {error && <div style={styles.error}>{error}</div>}
            <textarea
              style={styles.textarea}
              value={rawText}
              readOnly
              placeholder="classes.txt contents will appear here..."
              rows={6}
            />
          </>
        )}
      </section>

      <section style={styles.section}>
        <h2 style={styles.subheading}>Parsed classes</h2>

        {loading ? (
          <p>Parsing...</p>
        ) : courses.length === 0 ? (
          <p>No classes found in classes.txt.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Professor</th>
                  <th>Timeslots</th>
                  <th>Prerequisites</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.code}</td>
                    <td>{course.professor}</td>
                    <td>
                      {course.timeslots.length > 0
                        ? course.timeslots.join(", ")
                        : "—"}
                    </td>
                    <td>
                      {course.prerequisites.length > 0
                        ? course.prerequisites.join(", ")
                        : "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  app: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "1.5rem",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  section: {
    marginBottom: "2rem",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.5rem",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  error: {
    marginTop: "0.75rem",
    padding: "0.5rem 0.75rem",
    backgroundColor: "#ffe5e5",
    color: "#a40000",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
};

export default App;
