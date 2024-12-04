// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const file = await getInputFile();

  const lines = file.split("\n");

  const leftNumbers = lines.map((line) => parseInt(line.split("   ")[0]));
  const rightNumbers = lines.map((line) => parseInt(line.split("   ")[1]));

  const groupedNumbers = groupNumbers(leftNumbers, rightNumbers);
  const allDistances = getAllDistances(groupedNumbers);

  console.log(allDistances);
}

export async function getInputFile(): Promise<string> {
  const file = await Deno.open("input.txt");
  const buf = new Uint8Array(1000000);
  await file.read(buf);
  file.close();

  return new TextDecoder().decode(buf);
}

export function groupNumbers(
  leftNumbers: number[],
  rightNumbers: number[],
): {
  leftNumber: number;
  rightNumbers: number[];
  distance: number;
}[] {
  const result = [];

  // Store the smallest number in the left array and the smallest number in the right array
  for (let i = 0; i < leftNumbers.length; i++) {
    const equalRightNumbers = rightNumbers.filter(
      (number: number) => number === leftNumbers[i],
    );

    result.push({
      leftNumber: leftNumbers[i],
      rightNumbers: equalRightNumbers,
      distance: leftNumbers[i] * equalRightNumbers.length,
    });
  }

  // Remove any object that has NaN as a distance
  return result.filter(({ distance }) => !isNaN(distance));
}

export function getAllDistances(
  groupedNumbers: {
    leftNumber: number;
    rightNumbers: number[];
    distance: number;
  }[],
): number {
  return groupedNumbers.reduce((acc, { distance }) => acc + distance, 0);
}
