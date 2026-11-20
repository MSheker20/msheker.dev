// Case studies for /work/[slug]. Source: docs/COPY.md §6 (TR is the draft, EN translated from it).
import type { Line } from "@/components/typed-terminal";
import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;

export type CaseStudy = {
  slug: string;
  role: L;
  period: L;
  problem: L;
  decisions: { title: L; body: L }[];
  outcome?: L;
  next?: L;
  stack: string[];
  shots?: { src: string; alt: L; width: number; height: number }[];
  /** Shown in place of screenshots: a terminal with the same honest wip script as the home card. */
  terminal?: { bar: string; script: Line[] };
  /** Fills {commits} and {tests} in outcome/next: live from this repo, else these written numbers. */
  stats?: { repo: string; commits: number; goTestFiles: number };
  /** An interactive demo drawn on the case page, after the approach. */
  demo?: "anti-spoiler";
  /** A verbatim excerpt of the case's own code (code-excerpt.tsx); segments skip the lines between them. */
  code?: CodeExcerptData;
  /** Request path drawn on the case page (architecture.tsx). */
  architecture?: Architecture;
};

export type CodeExcerptData = { file: string; lang: string; url: string; segments: { start: number; lines: string[] }[] };

export type ArchNode = { name: string; icon?: string; role: L; notes: L[] };
export type Architecture = {
  client: ArchNode;
  /** browser → hosting environment */
  edgeIn: L;
  env: { label: L; icon?: string; front: ArchNode; link: L; back: ArchNode };
  /** API → outside services */
  edgeOut: L;
  external: ArchNode[];
};

export const cases: CaseStudy[] = [
  {
    slug: "covertgift",
    role: { en: "Solo, from design to deployment", tr: "Tek geliştirici, tasarımdan dağıtıma" },
    period: { en: "Oct 2026 → ongoing", tr: "Ekim 2026 → devam ediyor" },
    problem: {
      en: "Group gifts get planned in WhatsApp groups. Links get lost, the budget stays vague, and worst of all, the surprise is easy to spoil.",
      tr: "Ortak hediye WhatsApp gruplarında planlanıyor. Linkler kayboluyor, bütçe belirsiz kalıyor ve en kötüsü sürpriz kolayca bozuluyor.",
    },
    decisions: [
      {
        title: { en: "Anti-Spoiler lives on the server", tr: "Anti-Spoiler sunucuda" },
        body: {
          en: "The recipient gets a 403 on every route that touches the group and its ideas, invite link included. Integration tests against the real router and PostgreSQL guard the rules.",
          tr: "Hedef kişi gruba ve fikirlere ait her uçta 403 alıyor; davet linki dahil. Kurallar gerçek router ve PostgreSQL ile çalışan entegrasyon testleriyle korunuyor.",
        },
      },
      {
        title: { en: "Link previews for stubborn links", tr: "İnatçı linkler için önizleme" },
        body: {
          en: "Trendyol's short link stopped on an Adjust tracking page instead of the product. I decode the redirect parameter and make a second request to the real page, with a JSON-LD fallback for the price. The server fetches URLs users hand it, so it has SSRF guards: a domain allowlist, private IP blocking, size and redirect limits.",
          tr: "Trendyol'un kısa linki ürün yerine bir Adjust takip sayfasında duruyordu. Yönlendirme parametresini çözüp gerçek sayfaya ikinci bir istek attım; fiyat için JSON-LD yedeği ekledim. Sunucu kullanıcının verdiği URL'ye gittiği için SSRF koruması kurdum: alan adı izin listesi, özel IP engeli, boyut ve yönlendirme sınırı.",
        },
      },
      {
        title: { en: "Live updates that don't leak", tr: "Sızdırmayan canlı güncellemeler" },
        body: {
          en: "An SSE event carries no data, it only says “changed”. The client refetches from the routes that are already protected, so being live never bends the access rules.",
          tr: "SSE olayı veri taşımaz, sadece “değişti” der. İstemci veriyi zaten korunan uçlardan yeniden çeker; böylece canlılık yetki kurallarını delmiyor.",
        },
      },
      {
        title: { en: "Cost-aware hosting", tr: "Maliyet bilinci" },
        body: {
          en: "Azure Container Apps. I shut the environment down when it's idle and added a “server is waking up” screen for cold starts.",
          tr: "Azure Container Apps. Kullanılmadığında ortamı kapatıyorum; soğuk başlangıç için “sunucu uyanıyor” ekranı ekledim.",
        },
      },
    ],
    outcome: {
      en: "Live · {commits} commits · {tests} Go test files · TR/EN · light and dark themes · mobile.",
      tr: "Canlıda · {commits} commit · {tests} Go test dosyası · TR/EN · açık ve koyu tema · mobil.",
    },
    // {commits} and {tests} above: live from GitHub (src/lib/github.ts), these when it can't be reached
    stats: { repo: "CovertGift", commits: 123, goTestFiles: 40 },
    demo: "anti-spoiler",
    // Verbatim from the CovertGift repo at the commit in the url; refresh both together.
    code: {
      file: "backend/internal/middleware/group_access.go",
      lang: "go",
      url: "https://github.com/MSheker20/CovertGift/blob/7a8d4f18e241fc48cb7bd7c83a6d365c8589ce0a/backend/internal/middleware/group_access.go#L13-L52",
      segments: [
        { start: 13, lines: ["// GroupAccess gruba erişim yetkisini ve Anti-Spoiler kuralını denetleyen middleware'dir", "func GroupAccess(groupRepo repository.GroupRepository) gin.HandlerFunc {", "\treturn func(c *gin.Context) {"] },
        { start: 46, lines: ["\t\t// 4. KRİTİK: Anti-Spoiler Kuralı!", "\t\t// Giriş yapmış kullanıcı bu grubun hedef kişisi ise ANINDA 403 Forbidden ile engelle!", "\t\tif group.TargetUserID != nil && *group.TargetUserID == userID {", "\t\t\tcontrollers.RespondErr(c, http.StatusForbidden, \"Erişim engellendi: Bu hediye grubu senin için oluşturulmuş bir sürprizdir.\")", "\t\t\tc.Abort()", "\t\t\treturn", "\t\t}"] },
      ],
    },
    // Source: the CovertGift repo (frontend/nginx.conf.template, backend/, docs/AZURE.md), 2026-11-20.
    architecture: {
      client: {
        name: "Browser",
        icon: "react",
        role: { en: "React 19 single-page app", tr: "React 19 tek sayfa uygulama" },
        notes: [{ en: "covertgift.msheker.dev", tr: "covertgift.msheker.dev" }],
      },
      edgeIn: { en: "HTTPS · SSE", tr: "HTTPS · SSE" },
      env: {
        label: { en: "Azure Container Apps · Poland Central", tr: "Azure Container Apps · Poland Central" },
        icon: "azure",
        front: {
          name: "covertgift-web",
          icon: "nginx",
          role: { en: "nginx · the only public door", tr: "nginx · dışa açık tek kapı" },
          notes: [
            { en: "Serves the built app, proxies /api", tr: "Derlenmiş uygulamayı sunar, /api'yi iletir" },
            { en: "Dev routes answer 403 here", tr: "Geliştirme uçları burada 403 döner" },
            { en: "Invite tokens kept out of the logs", tr: "Davet token'ları loga yazılmaz" },
          ],
        },
        link: { en: "/api · internal", tr: "/api · iç ağ" },
        back: {
          name: "covertgift-server",
          icon: "go",
          role: { en: "Go + Gin API · internal only", tr: "Go + Gin API · yalnızca iç ağ" },
          notes: [
            { en: "Anti-Spoiler: 403 for the recipient", tr: "Anti-Spoiler: hedef kişiye 403" },
            { en: "Live updates over SSE, one replica", tr: "SSE ile canlı güncelleme, tek kopya" },
            { en: "Hourly reminder job", tr: "Saatlik hatırlatma görevi" },
          ],
        },
      },
      edgeOut: { en: "SQL · HTTPS", tr: "SQL · HTTPS" },
      external: [
        {
          name: "PostgreSQL",
          icon: "postgresql",
          role: { en: "Azure managed server", tr: "Azure yönetilen sunucu" },
          notes: [{ en: "Schema migrated at start-up", tr: "Şema açılışta güncellenir" }],
        },
        {
          name: "Gemini API",
          icon: "gemini",
          role: { en: "Gift suggestions", tr: "Hediye önerileri" },
          notes: [{ en: "Falls back to a lighter model on 503", tr: "503'te daha hafif modele geçer" }],
        },
        {
          name: "Store pages",
          role: { en: "Link previews", tr: "Link önizlemeleri" },
          notes: [{ en: "Trendyol, Amazon TR, Hepsiburada", tr: "Trendyol, Amazon TR, Hepsiburada" }],
        },
      ],
    },
    stack: ["Go 1.27", "Gin", "GORM", "PostgreSQL 17", "React 19", "TypeScript", "TanStack Query", "Tailwind 4", "SSE", "Gemini", "Docker", "nginx", "Azure Container Apps"],
    shots: [
      { src: "/work/covertgift/home-dark.png", alt: { en: "CovertGift home screen with the user's gift groups", tr: "CovertGift ana ekranı, kullanıcının hediye grupları" }, width: 1600, height: 1000 },
      { src: "/work/covertgift/group-dark.png", alt: { en: "A gift group with budget, ideas and votes", tr: "Bütçe, fikirler ve oylarla bir hediye grubu" }, width: 1600, height: 1000 },
      { src: "/work/covertgift/mobile-dark.png", alt: { en: "CovertGift on a phone", tr: "CovertGift telefonda" }, width: 1600, height: 1000 },
    ],
  },
  {
    slug: "alterf1",
    role: { en: "Solo", tr: "Tek geliştirici" },
    period: { en: "2026 → in progress", tr: "2026 → devam ediyor" },
    problem: {
      en: "Points systems changed many times since 1950. Would the same driver still be champion if a season were scored under another era's rules?",
      tr: "Puanlama sistemi 1950'den bu yana defalarca değişti. Bir sezon başka bir dönemin kurallarıyla puanlansa şampiyon yine aynı pilot mu olurdu?",
    },
    decisions: [
      {
        title: { en: "Five historical points systems", tr: "Beş tarihi puanlama sistemi" },
        body: {
          en: "Applies five systems from 1950 to today to real race results and returns the alternative championships as JSON over a REST API.",
          tr: "Gerçek yarış sonuçlarına 1950'den bugüne beş farklı puanlama sistemini uyguluyor ve alternatif şampiyonaları REST API ile JSON olarak veriyor.",
        },
      },
      {
        title: { en: "One query per season", tr: "Sezon başına tek sorgu" },
        body: {
          en: "All of a season's results are fetched in a single query.",
          tr: "Bir sezonun tüm sonuçları tek sorguda çekiliyor.",
        },
      },
    ],
    next: {
      en: "Development is restarting. Next up: a small interactive table where you pick the points year and the standings reorder.",
      tr: "Geliştirmeye yeniden başlanıyor. Sırada: puanlama yılını seçince sıralamanın yeniden dizildiği küçük, etkileşimli bir tablo.",
    },
    stack: ["Java", "REST"],
    terminal: {
      bar: "alterf1",
      script: [
        { cmd: "alterf1 --season 2024 --points 1991" },
        { out: "loading points system 1991…", muted: true },
        { out: "[wip] standings coming back soon", muted: true },
      ],
    },
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
