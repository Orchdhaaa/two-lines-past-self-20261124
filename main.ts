// Two Lines to Your Past Self — make.fun program/v1 entry.
// Writes exactly two lines to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Line one warns the writer's past self about one specific moment; line two
// says in one sentence why that moment mattered and what changed because of it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "Don't put off the biopsy the doctor orders on Tuesday; go that week, not in four months.";
const LINE_2 =
  "Waiting turned a twenty-minute surgery into a year of chemo, and that was the year your daughter learned to walk while you lay in a hospital bed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = `${LINE_1}\n${LINE_2}`;

// Gate mirror: the entry must be exactly two non-empty lines, 1-280 chars.
// Fail loudly instead of writing an invalid entry.
const lines = entry.split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
  console.error("entry must be exactly two non-empty lines");
  process.exit(1);
}
if (entry.length < 1 || entry.length > 280) {
  console.error(`entry is ${entry.length} characters; the gate allows 1-280`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
