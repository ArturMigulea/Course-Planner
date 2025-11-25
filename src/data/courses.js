// src/data/courses.js

export const RAW_COURSE_TEXT = `
ADM 1300 | ADM1300 | TBD | Karen Whitfield |
ADM 1301 | ADM1301 | TBD | Daniel Morais |
ADM 1340 | ADM1340 | TBD | Lila Chen | ADM1300 |
ADM 1370 | ADM1370 | TBD | Marcus Delaney | ADM1300 |
ECO 1102 | ECO1102 | TBD | Sofia Marquez |
ECO 1104 | ECO1104 | TBD | Julian Becker |
PHO 1101 | PHO1101 | TBD | Helen Singh |
PHI 1301 | PHI1301 | TBD | Omar Leclerc |
MAT 1302 | MAT1302 | TBD | Rebecca Langford |
MAT 1300 | MAT1300 | TBD | Tarek Milos |
ENG 1131 | ENG1131 | TBD | Samuel Rivers |
ITI 1121 | ITI1121 | TBD | Naomi Calder |
POL 1101 | POL1101 | TBD | Étienne Lavoie |
CRM 1300 | CRM1300 | TBD | Hannah McBride |
CRM 1301 | CRM1301 | TBD | Patrick Monroe |

CRM 2302 | CRM2302 | TBD | Valerie Osman | CRM1301 |
CRM 2303 | CRM2303 | TBD | Adrian Frost | CRM1301 |
CRM 2305 | CRM2305 | TBD | Elise Cormier | CRM1300 |
CRM 2300 | CRM2300 | TBD | Rowan Hale | CRM1300 |
POL 2107 | POL2107 | TBD | Miriam Thorne | POL1101 |
POL 2104 | POL2104 | TBD | Lucas Sheridan | POL1101 |
CSI 2110 | CSI2110 | TBD | Victor Tran | ITI1121 |
CSI 2120 | CSI2120 | TBD | Amelia Costa | CSI2110 |
CSI 2132 | CSI2132 | TBD | Derek Zhang | CSI2110 |
PHI 2397 | PHI2397 | TBD | Isabelle Fournier |
ADM 2302 | ADM2302 | TBD | Caleb Morgan | MAT1302, ADM1370 |
ADM 2372 | ADM2372 | TBD | Priya Mandal | ADM1370 |
ADM 2320 | ADM2320 | TBD | Lionel Hart | ADM1300 |
ADM 2336 | ADM2336 | TBD | Evelyn Sumner | ADM1300 |
ADM 2337 | ADM2337 | TBD | Gabriel Shore | ADM2336 |
ADM 2341 | ADM2341 | TBD | Noelle Park | ADM1340 |
ADM 2350 | ADM2350 | TBD | Adrian Rousseau | ADM1340, ADM2303 |
ADM 2303 | ADM2303 | TBD | Henry Caldwell | MAT1300 |
ADM 2304 | ADM2304 | TBD | Jenna Moretti | ADM2303 |
ADM 2381 | ADM2381 | TBD | Felix Brandt | MAT1300, ENG1131 |

CRM 3334 | CRM3334 | TBD | Nadia Laurent | CRM2303 |
CRM 3335 | CRM3335 | TBD | Jonah Vickers | CRM2303 |

ADM 3317 | ADM3317 | TBD | Olivia Serrano | ADM1300 |
ADM 3301 | ADM3301 | TBD | Raymond Pierce | ADM2302, ADM2304 |
ADM 3302 | ADM3302 | TBD | Emilia Novak | ADM3301 |
ADM 3318 | ADM3318 | TBD | Tobias Green | ADM2320 |
ADM 3316 | ADM3316 | TBD | Claire Jenson | ADM1300 |

ADM 4358 | ADM4358 | TBD | Vincent Armand | ADM4358 |
ADM 4312 | ADM4312 | TBD | Helena Dubois | ADM2381 |
ADM 4316 | ADM4316 | TBD | Malik Fernando | ADM2381 |
ADM 4317 | ADM4317 | TBD | Sylvie Kerr | ADM2381 |
ADM 4319 | ADM4319 | TBD | Anton Reyes | ADM2381 |

ADM 4303 | ADM4303 | TBD | Nadia Petrova | TBD |
ADM 4311 | ADM4311 | TBD | Colin Mercer | TBD |
`;

// Turn the txt into actual JS objects.
function parseCourses(raw) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      // Splits: [display, code, courseName, ?, prereqRaw, ?]
      const parts = line.split("|").map((p) => p.trim());
      const [display, code, courseName, profRaw, prereqRaw] = parts;

      const department = code.slice(0, 3);
      const yearDigit = parseInt(code[3], 10);
      const year = Number.isNaN(yearDigit) ? 1 : yearDigit;
      const credits = 3;

      const prereqs =
        prereqRaw && prereqRaw !== "TBD"
          ? prereqRaw
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean)
          : [];

      const title = courseName && courseName !== "TBD" ? courseName : `${display}`;

      const prof = profRaw && profRaw !== "TBD" ? profRaw : `${profRaw}`;

      return {
        code,
        title,
        department,
        year,
        credits,
        prereqs,
        prof
      };
    });
}

export const COURSES = parseCourses(RAW_COURSE_TEXT);

// For filter dropdowns
export const DEPARTMENTS = [...new Set(COURSES.map((c) => c.department))].sort();
export const YEARS = [1, 2, 3, 4];
