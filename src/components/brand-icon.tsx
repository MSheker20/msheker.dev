import { brandIconFor, type BrandIconData } from "@/content/brand-icons";

/** Relative luminance (WCAG) of a #rrggbb colour. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Very dark brand colours vanish on the dark theme, very light ones on the light theme: those fall back to ink there. */
function tone(hex: string) {
  const l = luminance(hex);
  return l < 0.05 ? "dark" : l > 0.4 ? "light" : undefined;
}

/** A real brand logo (Simple Icons), one colour at rest, the brand's own colour on hover. Decorative: the label carries the meaning. */
export function BrandIcon({ icon, className = "" }: { icon: BrandIconData; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      data-tone={tone(icon.hex)}
      style={{ "--brand": icon.hex } as React.CSSProperties}
      className={`brand-icon size-3.5 shrink-0 ${className}`}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** A technology name with its logo in front when one exists ("Go 1.27" → Go logo + text). */
export function BrandLabel({ label, className = "" }: { label: string; className?: string }) {
  const icon = brandIconFor(label);
  return (
    <span className={`brand inline-flex items-center gap-1.5 ${className}`}>
      {icon && <BrandIcon icon={icon} />}
      {label}
    </span>
  );
}

/** A row of labels, each with its logo. */
export function BrandList({ labels, className = "" }: { labels: string[]; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-3.5 gap-y-1 ${className}`}>
      {labels.map((l) => (
        <BrandLabel key={l} label={l} />
      ))}
    </span>
  );
}
