// One Line of Earned Pride — make.fun bounty
// u-mang-one-line-of-earned-pride-a0138557
//
// Writes a single line of earned pride to /output/entry.txt.
// Gate: UTF-8 text, 1 to 240 characters, exactly one line,
// not whitespace only. Node 22 stdlib only, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The line: nine years of carrying water, and the morning the
// strength she built walks ahead of her in her daughter.
const LINE =
  "For nine years she carried the water up the hill each morning; " +
  "today her daughter carried it, and she walked beside her " +
  "empty-handed, watching her own strength walk ahead of her.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main() {
  const text = LINE.trim();

  if (text.length < 1 || text.length > 240) {
    fail(`line must be 1-240 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("line must be a single line");
  }
  if (text.trim().length === 0) {
    fail("line must not be whitespace only");
  }

  // The grader reads /output/entry.txt; fall back to a local
  // output/ folder when the absolute path is not writable.
  // One trailing newline keeps the file well-formed text; the
  // line itself is 178 characters, inside the 1-240 gate either way.
  const targets = ["/output/entry.txt", resolve("output", "entry.txt")];
  let written = null;
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text + "\n", "utf8");
      written = target;
      break;
    } catch {
      // try the next target
    }
  }
  if (!written) {
    fail("could not write entry.txt to any target");
  }

  console.log(`wrote ${text.length} characters to ${written}`);
}

main();
