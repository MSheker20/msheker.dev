// 5x7 bitmap wordmark (design/hero v1). Server component: pure SVG, no JS shipped.
const FONT: Record<string, string[]> = {
  m: ["00000", "00000", "11010", "10101", "10101", "10101", "10101"],
  s: ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
  h: ["10000", "10000", "10110", "11001", "10001", "10001", "10001"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
  k: ["10000", "10000", "10010", "10100", "11000", "10100", "10010"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
};

export function PixelWordmark({ word = "msheker", cell = 4, gap = 1, className }: {
  word?: string;
  cell?: number;
  gap?: number;
  className?: string;
}) {
  const w = word.length * 6 - 1;
  const rects: React.ReactNode[] = [];
  [...word].forEach((ch, i) =>
    (FONT[ch] ?? []).forEach((row, y) =>
      [...row].forEach((bit, x) => {
        if (bit === "1")
          rects.push(<rect key={`${i}-${x}-${y}`} x={(i * 6 + x) * cell} y={y * cell} width={cell - gap} height={cell - gap} />);
      }),
    ),
  );
  return (
    <svg viewBox={`0 0 ${w * cell} ${7 * cell}`} width={w * cell} height={7 * cell} fill="currentColor" aria-hidden="true" className={className}>
      {rects}
    </svg>
  );
}
