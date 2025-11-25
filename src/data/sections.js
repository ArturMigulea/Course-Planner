// days: array of weekday strings used in the timetable
export const SECTIONS = [
// ----- 1000-level -----
  {
    id: "ADM1300-F-LEC1",
    courseCode: "ADM1300",
    instructor: "Karen Whitfield",
    meetings: [
      { day: "Mon", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Wed", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "ADM1300-F-LEC2",
    courseCode: "ADM1300",
    instructor: "Karen Whitfield",
    meetings: [
      { day: "Tue", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Thu", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },

  {
    id: "ADM1301-F-LEC1",
    courseCode: "ADM1301",
    instructor: "Daniel Morais",
    meetings: [
      { day: "Mon", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },
  {
    id: "ADM1301-F-LEC2",
    courseCode: "ADM1301",
    instructor: "Daniel Morais",
    meetings: [
      { day: "Wed", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  {
    id: "ADM1340-F-LEC1",
    courseCode: "ADM1340",
    instructor: "Lila Chen",
    meetings: [
      { day: "Tue", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Thu", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "ADM1340-F-LEC2",
    courseCode: "ADM1340",
    instructor: "Lila Chen",
    meetings: [
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Fri", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },
  {
    id: "ADM1340-F-LEC3",
    courseCode: "ADM1340",
    instructor: "Lila Chen",
    meetings: [
      { day: "Fri", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM1370-F-LEC1",
    courseCode: "ADM1370",
    instructor: "Marcus Delaney",
    meetings: [
      { day: "Mon", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Wed", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },
  {
    id: "ADM1370-F-LEC2",
    courseCode: "ADM1370",
    instructor: "Marcus Delaney",
    meetings: [
      { day: "Tue", start: "14:30", end: "16:00", type: "LEC" },
      { day: "Thu", start: "14:30", end: "16:00", type: "LEC" },
    ],
  },

  {
    id: "ECO1102-F-LEC1",
    courseCode: "ECO1102",
    instructor: "Sofia Marquez",
    meetings: [
      { day: "Mon", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Wed", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "ECO1102-F-LEC2",
    courseCode: "ECO1102",
    instructor: "Sofia Marquez",
    meetings: [
      { day: "Tue", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Thu", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ECO1104-F-LEC1",
    courseCode: "ECO1104",
    instructor: "Julian Becker",
    meetings: [
      { day: "Tue", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Thu", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "PHO1101-F-LEC1",
    courseCode: "PHO1101",
    instructor: "Helen Singh",
    meetings: [
      { day: "Wed", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },
  {
    id: "PHO1101-F-LEC2",
    courseCode: "PHO1101",
    instructor: "Helen Singh",
    meetings: [
      { day: "Fri", start: "08:30", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "PHI1301-F-LEC1",
    courseCode: "PHI1301",
    instructor: "Omar Leclerc",
    meetings: [
      { day: "Mon", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Wed", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },

  {
    id: "MAT1302-F-LEC1",
    courseCode: "MAT1302",
    instructor: "Rebecca Langford",
    meetings: [
      { day: "Tue", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Thu", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "MAT1302-F-LEC2",
    courseCode: "MAT1302",
    instructor: "Rebecca Langford",
    meetings: [
      { day: "Mon", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Wed", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "MAT1300-F-LEC1",
    courseCode: "MAT1300",
    instructor: "Tarek Milos",
    meetings: [
      { day: "Mon", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },
  {
    id: "MAT1300-F-LEC2",
    courseCode: "MAT1300",
    instructor: "Tarek Milos",
    meetings: [
      { day: "Tue", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Thu", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },
  {
    id: "MAT1300-F-LEC3",
    courseCode: "MAT1300",
    instructor: "Tarek Milos",
    meetings: [
      { day: "Fri", start: "11:30", end: "14:30", type: "LEC" },
    ],
  },

  {
    id: "ENG1131-F-LEC1",
    courseCode: "ENG1131",
    instructor: "Samuel Rivers",
    meetings: [
      { day: "Tue", start: "14:30", end: "16:00", type: "LEC" },
      { day: "Thu", start: "14:30", end: "16:00", type: "LEC" },
    ],
  },

  {
    id: "ITI1121-F-LEC1",
    courseCode: "ITI1121",
    instructor: "Naomi Calder",
    meetings: [
      { day: "Mon", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Wed", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "ITI1121-F-LEC2",
    courseCode: "ITI1121",
    instructor: "Naomi Calder",
    meetings: [
      { day: "Tue", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  {
    id: "POL1101-F-LEC1",
    courseCode: "POL1101",
    instructor: "Étienne Lavoie",
    meetings: [
      { day: "Tue", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Thu", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "CRM1300-F-LEC1",
    courseCode: "CRM1300",
    instructor: "Hannah McBride",
    meetings: [
      { day: "Mon", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Wed", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },
  {
    id: "CRM1301-F-LEC1",
    courseCode: "CRM1301",
    instructor: "Patrick Monroe",
    meetings: [
      { day: "Tue", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Thu", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },

  // ----- 2000-level CRM / POL / CSI / ADM -----
  {
    id: "CRM2302-F-LEC1",
    courseCode: "CRM2302",
    instructor: "Valerie Osman",
    meetings: [
      { day: "Mon", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Wed", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "CRM2303-F-LEC1",
    courseCode: "CRM2303",
    instructor: "Adrian Frost",
    meetings: [
      { day: "Tue", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Thu", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "CRM2303-F-LEC2",
    courseCode: "CRM2303",
    instructor: "Adrian Frost",
    meetings: [
      { day: "Fri", start: "13:00", end: "16:00", type: "LEC" },
    ],
  },

  {
    id: "CRM2305-F-LEC1",
    courseCode: "CRM2305",
    instructor: "Elise Cormier",
    meetings: [
      { day: "Mon", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "CRM2300-F-LEC1",
    courseCode: "CRM2300",
    instructor: "Rowan Hale",
    meetings: [
      { day: "Tue", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Thu", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },

  {
    id: "POL2107-F-LEC1",
    courseCode: "POL2107",
    instructor: "Miriam Thorne",
    meetings: [
      { day: "Mon", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  {
    id: "POL2104-F-LEC1",
    courseCode: "POL2104",
    instructor: "Lucas Sheridan",
    meetings: [
      { day: "Wed", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "CSI2110-F-LEC1",
    courseCode: "CSI2110",
    instructor: "Victor Tran",
    meetings: [
      { day: "Mon", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Wed", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },
  {
    id: "CSI2110-F-LEC2",
    courseCode: "CSI2110",
    instructor: "Victor Tran",
    meetings: [
      { day: "Tue", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Thu", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "CSI2120-F-LEC1",
    courseCode: "CSI2120",
    instructor: "Amelia Costa",
    meetings: [
      { day: "Tue", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Thu", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "CSI2132-F-LEC1",
    courseCode: "CSI2132",
    instructor: "Derek Zhang",
    meetings: [
      { day: "Mon", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Wed", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },
  {
    id: "CSI2132-F-LEC2",
    courseCode: "CSI2132",
    instructor: "Derek Zhang",
    meetings: [
      { day: "Fri", start: "08:30", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "PHI2397-F-LEC1",
    courseCode: "PHI2397",
    instructor: "Isabelle Fournier",
    meetings: [
      { day: "Tue", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2302-F-LEC1",
    courseCode: "ADM2302",
    instructor: "Caleb Morgan",
    meetings: [
      { day: "Tue", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Thu", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2372-F-LEC1",
    courseCode: "ADM2372",
    instructor: "Priya Mandal",
    meetings: [
      { day: "Mon", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Wed", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2320-F-LEC1",
    courseCode: "ADM2320",
    instructor: "Lionel Hart",
    meetings: [
      { day: "Tue", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Thu", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },

  {
    id: "ADM2336-F-LEC1",
    courseCode: "ADM2336",
    instructor: "Evelyn Sumner",
    meetings: [
      { day: "Mon", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "ADM2337-F-LEC1",
    courseCode: "ADM2337",
    instructor: "Gabriel Shore",
    meetings: [
      { day: "Tue", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Thu", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM2341-F-LEC1",
    courseCode: "ADM2341",
    instructor: "Noelle Park",
    meetings: [
      { day: "Mon", start: "14:30", end: "16:00", type: "LEC" },
      { day: "Wed", start: "14:30", end: "16:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2350-F-LEC1",
    courseCode: "ADM2350",
    instructor: "Adrian Rousseau",
    meetings: [
      { day: "Tue", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Thu", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2303-F-LEC1",
    courseCode: "ADM2303",
    instructor: "Henry Caldwell",
    meetings: [
      { day: "Mon", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Wed", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2304-F-LEC1",
    courseCode: "ADM2304",
    instructor: "Jenna Moretti",
    meetings: [
      { day: "Tue", start: "14:30", end: "16:00", type: "LEC" },
      { day: "Thu", start: "14:30", end: "16:00", type: "LEC" },
    ],
  },

  {
    id: "ADM2381-F-LEC1",
    courseCode: "ADM2381",
    instructor: "Felix Brandt",
    meetings: [
      { day: "Fri", start: "08:30", end: "11:30", type: "LEC" },
    ],
  },

  // ----- 3000-level CRM -----
  {
    id: "CRM3334-F-LEC1",
    courseCode: "CRM3334",
    instructor: "Nadia Laurent",
    meetings: [
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Fri", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "CRM3335-F-LEC1",
    courseCode: "CRM3335",
    instructor: "Jonah Vickers",
    meetings: [
      { day: "Tue", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  // ----- 3000-level ADM -----
  {
    id: "ADM3317-F-LEC1",
    courseCode: "ADM3317",
    instructor: "Olivia Serrano",
    meetings: [
      { day: "Mon", start: "13:00", end: "14:30", type: "LEC" },
      { day: "Wed", start: "13:00", end: "14:30", type: "LEC" },
    ],
  },

  {
    id: "ADM3301-F-LEC1",
    courseCode: "ADM3301",
    instructor: "Raymond Pierce",
    meetings: [
      { day: "Tue", start: "08:30", end: "10:00", type: "LEC" },
      { day: "Thu", start: "08:30", end: "10:00", type: "LEC" },
    ],
  },

  {
    id: "ADM3302-F-LEC1",
    courseCode: "ADM3302",
    instructor: "Emilia Novak",
    meetings: [
      { day: "Tue", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Thu", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "ADM3318-F-LEC1",
    courseCode: "ADM3318",
    instructor: "Tobias Green",
    meetings: [
      { day: "Wed", start: "16:00", end: "17:30", type: "LEC" },
      { day: "Fri", start: "16:00", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM3316-F-LEC1",
    courseCode: "ADM3316",
    instructor: "Claire Jenson",
    meetings: [
      { day: "Mon", start: "10:00", end: "11:30", type: "LEC" },
      { day: "Wed", start: "10:00", end: "11:30", type: "LEC" },
    ],
  },

  // ----- 4000-level ADM -----
  {
    id: "ADM4358-F-LEC1",
    courseCode: "ADM4358",
    instructor: "Vincent Armand",
    meetings: [
      { day: "Thu", start: "18:00", end: "21:00", type: "LEC" },
    ],
  },

  {
    id: "ADM4312-F-LEC1",
    courseCode: "ADM4312",
    instructor: "Helena Dubois",
    meetings: [
      { day: "Mon", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM4316-F-LEC1",
    courseCode: "ADM4316",
    instructor: "Malik Fernando",
    meetings: [
      { day: "Tue", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM4317-F-LEC1",
    courseCode: "ADM4317",
    instructor: "Sylvie Kerr",
    meetings: [
      { day: "Wed", start: "14:30", end: "17:30", type: "LEC" },
    ],
  },

  {
    id: "ADM4319-F-LEC1",
    courseCode: "ADM4319",
    instructor: "Anton Reyes",
    meetings: [
      { day: "Fri", start: "08:30", end: "11:30", type: "LEC" },
    ],
  },

  {
    id: "ADM4303-F-LEC1",
    courseCode: "ADM4303",
    instructor: "Nadia Petrova",
    meetings: [
      { day: "Tue", start: "11:30", end: "13:00", type: "LEC" },
      { day: "Thu", start: "11:30", end: "13:00", type: "LEC" },
    ],
  },

  {
    id: "ADM4311-F-LEC1",
    courseCode: "ADM4311",
    instructor: "Colin Mercer",
    meetings: [
      { day: "Thu", start: "08:30", end: "11:30", type: "LEC" },
    ],
  },
];
