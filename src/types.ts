// src/types.ts

export type Department =
  | "ADM"
  | "CSI"
  | "MAT"
  | "PHY"
  | "GEO"
  | "ECO"
  | "PHO"
  | "PHI"
  | "ENG"
  | "ITI"
  | "POL"
  | "CRM";

export type YearLevel = 1 | 2 | 3 | 4;

export interface Course {
  code: string; // "ADM1340"
  title: string; // "Introduction to Financial Accounting"
  department: Department;
  year: YearLevel;
  credits: number;
  description?: string;
  prerequisites?: string[]; // course codes like ["ADM1300", "MAT1300"]
}

// For schedule builder

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface MeetingTime {
  day: DayOfWeek;
  start: string; // "09:00"
  end: string; // "10:30"
  location?: string;
}

export interface Section {
  id: string; // unique id, e.g. "ADM1340-A-F"
  courseCode: string; // "ADM1340"
  sectionCode: string; // "A", "B", etc.
  instructor?: string;
  meetings: MeetingTime[];
}

export interface ScheduledItem extends Section {
  // Reserved for future fields like color, locked, etc.
}
