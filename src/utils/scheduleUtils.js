// src/utils/scheduleUtils.js
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export function intervalsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// term is optional: if an item has no .term, it belongs to all terms
export function conflictBetweenSectionAndItems(section, items, term) {
  const secStart = toMinutes(section.start);
  const secEnd = toMinutes(section.end);

  for (const item of items) {
    if (item.term && item.term !== term) continue;

    const itemDays = item.days || (item.day ? [item.day] : []);
    const sharedDay = itemDays.some((d) => section.days.includes(d));
    if (!sharedDay) continue;

    const otherStart = toMinutes(item.start);
    const otherEnd = toMinutes(item.end);

    if (intervalsOverlap(secStart, secEnd, otherStart, otherEnd)) {
      return item;
    }
  }
  return null;
}

export function conflictBetweenBlockAndItems(block, items, term) {
  const blockStart = toMinutes(block.start);
  const blockEnd = toMinutes(block.end);

  for (const item of items) {
    if (item.term && item.term !== term) continue;

    const itemDays = item.days || (item.day ? [item.day] : []);
    if (!itemDays.includes(block.day)) continue;

    const otherStart = toMinutes(item.start);
    const otherEnd = toMinutes(item.end);

    if (intervalsOverlap(blockStart, blockEnd, otherStart, otherEnd)) {
      return item;
    }
  }
  return null;
}
