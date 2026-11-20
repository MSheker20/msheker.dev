import type { Activity } from "@/lib/github";
import { RevealOnce } from "./reveal-once";

/**
 * A year of commits as GitHub-style squares: one column a week, oldest left. On a narrow screen the
 * oldest weeks are cut off on the left, so the latest ones always show. Server-rendered, no JS.
 */
export function ActivityHeatmap({ activity, label }: { activity: Activity; label: string }) {
  const max = Math.max(...activity.weeks.flat());
  const level = (n: number) => (n === 0 ? 0 : Math.max(1, Math.ceil((4 * n) / max)));
  return (
    <figure className="m-0 grid min-w-0 gap-2">
      {/* fills in week by week, once, the first time it scrolls into view */}
      <RevealOnce className="flex justify-end overflow-hidden">
        <div role="img" aria-labelledby="activity-caption" className="heatmap">
          {activity.weeks.flatMap((week, w) =>
            week.map((n, d) => <i key={`${w}-${d}`} data-l={level(n)} style={{ "--w": w } as React.CSSProperties} />),
          )}
        </div>
      </RevealOnce>
      <figcaption id="activity-caption" className="text-label text-muted md:text-right">{label}</figcaption>
    </figure>
  );
}
