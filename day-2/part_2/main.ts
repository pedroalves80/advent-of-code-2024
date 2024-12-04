type TGroupedLine = {
  numbers: number[];
};

if (import.meta.main) {
  const file = await getInputFile();
  const lines = file.split("\n");

  const numbersByLines = groupLines(lines);

  const filteredLines = checkSafeLines(numbersByLines);

  console.log(`${filteredLines.safeLines.length} lines are safe!`);
  console.log(`${filteredLines.unsafeLines.length} lines are unsafe!`);
}

export async function getInputFile(): Promise<string> {
  const file = await Deno.open("input.txt");
  const buf = new Uint8Array(1000000);
  await file.read(buf);
  file.close();

  return new TextDecoder().decode(buf);
}

export function groupLines(lines: string[]): TGroupedLine[] {
  const result = lines.map((line) => {
    const numbers = line.split(" ").map((number) => Number(number));

    return {
      numbers: numbers,
    };
  });

  return result;
}

export function checkSafeLines(lines: TGroupedLine[]): {
  safeLines: TGroupedLine[];
  unsafeLines: TGroupedLine[];
} {
  const safeLines: TGroupedLine[] = [];
  const unsafeLines: TGroupedLine[] = [];

  for (const line of lines) {
    const numbers = line.numbers;

    if (numbers.length === 0 || numbers.some(isNaN)) {
      unsafeLines.push(line);
      continue;
    }

    let isSafe = true;
    let levelStatus: "increasing" | "decreasing" | null = null;
    let numberOfUnsafeNumbers = 0;

    for (let x = 1; x < numbers.length; x++) {
      const diff = numbers[x] - numbers[x - 1];

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        isSafe = false;
        numberOfUnsafeNumbers++;
        continue;
      }

      if (levelStatus === null) {
        levelStatus = diff > 0 ? "increasing" : "decreasing";
      } else if (
        (levelStatus === "increasing" && diff < 0) ||
        (levelStatus === "decreasing" && diff > 0)
      ) {
        isSafe = false;
        numberOfUnsafeNumbers++;
        continue;
      }
    }

    if (isSafe) {
      safeLines.push(line);
    } else {
      if (numberOfUnsafeNumbers > 1) {
        unsafeLines.push(line);
      } else {
        safeLines.push(line);
      }
    }
  }

  return {
    safeLines,
    unsafeLines,
  };
}
