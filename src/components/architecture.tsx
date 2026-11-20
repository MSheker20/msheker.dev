import type { ArchNode, Architecture } from "@/content/cases";
import { brandIcons } from "@/content/brand-icons";
import type { Locale } from "@/i18n/config";
import { BrandIcon } from "./brand-icon";

/**
 * A case's request path as a still diagram: client → hosting environment (front door → API) → outside services.
 * Plain HTML boxes, so it reflows: from lg the client sits beside the environment
 * and the outside services line up under it; below lg everything stacks.
 */
export function ArchitectureDiagram({ arch, locale }: { arch: Architecture; locale: Locale }) {
  const envIcon = arch.env.icon ? brandIcons[arch.env.icon] : undefined;
  return (
    <div className="arch text-card" translate="no">
      <Node node={arch.client} locale={locale} />
      <Edge label={arch.edgeIn[locale]} step={0} />
      <div className="arch-env">
        <p className="arch-env-label brand">
          {envIcon && <BrandIcon icon={envIcon} />}
          {arch.env.label[locale]}
        </p>
        <div className="arch-env-row">
          <Node node={arch.env.front} locale={locale} />
          <Edge label={arch.env.link[locale]} step={1} />
          <Node node={arch.env.back} locale={locale} />
        </div>
      </div>
      <Edge label={arch.edgeOut[locale]} step={2} down />
      <ul className="arch-ext">
        {arch.external.map((n) => (
          <li key={n.name} className="flex">
            <Node node={n} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Node({ node, locale }: { node: ArchNode; locale: Locale }) {
  const icon = node.icon ? brandIcons[node.icon] : undefined;
  return (
    <div className="brand arch-node">
      <p className="m-0 flex items-center gap-2 text-ink">
        {icon && <BrandIcon icon={icon} />}
        {node.name}
      </p>
      <p className="m-0 text-muted">{node.role[locale]}</p>
      {node.notes.length > 0 && (
        <ul className="mt-2 mb-0 grid list-none gap-0.5 p-0 text-label text-muted">
          {node.notes.map((n) => (
            <li key={n.en}>· {n[locale]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Arrow with its protocol: → beside (lg), ↓ below; a `down` edge points down at every width.
 * A request dot runs out along the arrows one after another, then the response dot runs back:
 * `step` is the arrow's place in that path (globals.css, "request pulse").
 */
function Edge({ label, down, step }: { label: string; down?: boolean; step: number }) {
  return (
    <div className={`arch-edge text-label text-muted ${down ? "arch-edge-down" : ""}`}>
      <span aria-hidden="true" className="arch-arrow" style={{ "--step": step } as React.CSSProperties}>
        <i className="arch-req" />
        <i className="arch-res" />
      </span>
      <span>{label}</span>
    </div>
  );
}
