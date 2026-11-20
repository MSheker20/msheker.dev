export function SectionHead({ label, title, as: Tag = "h1" }: { label: string; title: string; as?: "h1" | "h2" }) {
  // "01 / Work" → a large outlined "01" behind the heading (decoration; the label says it in words)
  const num = label.match(/^\d+/)?.[0];
  return (
    <div className="relative mb-9">
      {num && (
        <span aria-hidden="true" className="section-num">
          {num}
        </span>
      )}
      <div className="relative mb-3 flex items-center gap-2 text-label text-muted">
        <i aria-hidden="true" className="inline-block size-[7px] bg-ink" />
        {label}
      </div>
      <Tag className="relative m-0 max-w-[28ch] text-section font-normal">{title}</Tag>
    </div>
  );
}
