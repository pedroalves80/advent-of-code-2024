import { assertEquals } from "@std/assert";
import { getAllDistances, getInputFile, groupNumbers } from "./main.ts";

Deno.test(async function addTest() {
  const file = await getInputFile();

  const lines = file.split("\n");

  const leftNumbers = lines.map((line) => parseInt(line.split("   ")[0]));
  const rightNumbers = lines.map((line) => parseInt(line.split("   ")[1]));

  const groupedNumbers = groupNumbers(leftNumbers, rightNumbers);
  const allDistances = getAllDistances(groupedNumbers);

  assertEquals(allDistances, 25574739);
});
