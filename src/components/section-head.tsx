export function SectionHead({ label, title, as: Tag = "h1" }: { label: string; title: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-9">
      <div className="mb-3 flex items-center gap-2 text-label text-muted">
        <i aria-hidden="true" className="inline-block size-[7px] bg-ink" />
        {label}
      </div>
      <Tag className="m-0 max-w-[28ch] text-section font-normal">{title}</Tag>
    </div>
  );
}
