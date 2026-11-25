// One Line, No Deadline Met — make.fun entry
// Writes the excuse line to /output/entry.txt (gate: 1-200 chars, UTF-8).

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE =
  "Technically it's not late, I'm just working on Hawaii time for the moment.";

// Gate guard: the sealed scorer requires /output/entry.txt to be
// UTF-8 text of 1-200 characters, so fail loudly if the line ever drifts.
function checkGate(line: string): void {
  const len = [...line].length;
  if (len < 1 || len > 200) {
    throw new Error(`Line is ${len} chars, outside the 1-200 gate.`);
  }
}

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

function verifyEntry(line: string): void {
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== line) {
    throw new Error("Read-back mismatch: entry.txt does not match the line.");
  }
}

checkGate(LINE);
writeEntry(LINE);
verifyEntry(LINE);
console.log(`Wrote ${LINE.length} chars to /output/entry.txt (verified)`);
