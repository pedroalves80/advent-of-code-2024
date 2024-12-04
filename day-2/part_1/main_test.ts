import { assertEquals } from "@std/assert";
import { checkSafeLines, getInputFile, groupLines } from "./main.ts";

Deno.test(async function addTest() {
  const file = await getInputFile();
  const lines = file.split("\n");

  const numbersByLines = groupLines(lines);

  const filteredLines = checkSafeLines(numbersByLines);

  assertEquals(filteredLines.unsafeLines.length, 452);
  assertEquals(filteredLines.safeLines.length, 549);
});
