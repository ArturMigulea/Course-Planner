// src/utils/scheduleUtils.js

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toMinutes(timeStr) {
  if (!timeStr) {
    // Defensive: if something is missing, just treat as 0
    // (but we try hard not to call this with undefined)
    return 0;
  }
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export function intervalsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Normalize any "schedule item" (section or block) into an array of
 * { day, start, end } meetings.
 *
 * - For sections with `meetings`: return those.
 * - For items with `day` / `days` + `start`/`end`: convert into meetings.
 */
function getItemMeetings(item) {
  // If it already has a meetings array, use that
  if (Array.isArray(item.meetings) && item.meetings.length > 0) {
    return item.meetings
      .filter((m) => m.day && m.start && m.end)
      .map((m) => ({
        day: m.day,
        start: m.start,
        end: m.end,
      }));
  }

  // Old-style: day/days + start/end directly on the object
  const days = item.days || (item.day ? [item.day] : []);
  if (!item.start || !item.end || days.length === 0) return [];

  return days.map((d) => ({
    day: d,
    start: item.start,
    end: item.end,
  }));
}

// term is optional: if an item has no .term, it belongs to all terms
export function conflictBetweenSectionAndItems(section, items, term) {
  const sectionMeetings = getItemMeetings(section);

  for (const secMeeting of sectionMeetings) {
    const secStart = toMinutes(secMeeting.start);
    const secEnd = toMinutes(secMeeting.end);

    for (const item of items) {
      if (item.term && item.term !== term) continue;

      const itemMeetings = getItemMeetings(item);

      for (const itMeeting of itemMeetings) {
        if (itMeeting.day !== secMeeting.day) continue;

        const otherStart = toMinutes(itMeeting.start);
        const otherEnd = toMinutes(itMeeting.end);

        if (intervalsOverlap(secStart, secEnd, otherStart, otherEnd)) {
          // Return the conflicting item (whole section or block)
          return item;
        }
      }
    }
  }

  return null;
}

export function conflictBetweenBlockAndItems(block, items, term) {
  const blockStart = toMinutes(block.start);
  const blockEnd = toMinutes(block.end);

  for (const item of items) {
    if (item.term && item.term !== term) continue;

    const itemMeetings = getItemMeetings(item);

    for (const itMeeting of itemMeetings) {
      if (itMeeting.day !== block.day) continue;

      const otherStart = toMinutes(itMeeting.start);
      const otherEnd = toMinutes(itMeeting.end);

      if (intervalsOverlap(blockStart, blockEnd, otherStart, otherEnd)) {
        return item;
      }
    }
  }

  return null;
}
