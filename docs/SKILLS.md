# Skill Haritası

Bu projede hangi skill'in **ne zaman** kullanılacağı. Proje skill'leri `.claude/skills/` altında (kaynakları `skills-lock.json`'da kayıtlı); global olanlar `~/.claude/skills/` ve ECC plugin'inden gelir.

Son kontrol: 2026-11-20

## Kurulu skill'ler

### Global (tüm projelerde)
| Skill | Kaynak | Sürüm | Not |
|---|---|---|---|
| `design-taste-frontend` | Leonxlnx/taste-skill | **2.5.1** (v2'den güncellendi) | **Ana tasarım yönetmeni.** Yön önerir, house-style kurallarını uygular, tarayıcıda kontrol ve finish gate yapar |
| ECC plugin (`ecc:*`) | affaan-m/everything-claude-code | 2.2.3 @ `4adeee6` (2026-11-19) | Yeniden kuruldu: 311 → 328 skill |
| `graphify` | yerel | — | Kod tabanı bilgi grafiği (site büyüyünce) |

### Proje (`.claude/skills/`)
| Skill | Kaynak | Ne için |
|---|---|---|
| `emil-design-eng` | emilkowalski/skills | Arayüz zanaatı: detay, his, mikro etkileşim felsefesi |
| `animate` | emilkowalski/skills | Animasyon yazma (easing, süre, spring) |
| `review-animations` | emilkowalski/skills | Mevcut animasyonların incelemesi |
| `vercel-react-best-practices` | vercel-labs/agent-skills | React/Next.js performans kalıpları |
| `web-design-guidelines` | vercel-labs/agent-skills | Web Interface Guidelines'a göre UI denetimi (`dosya:satır` çıktısı) |
| `web-quality-audit` | addyosmani/web-quality-skills | Genel kalite denetimi (perf + a11y + SEO + best practices) |
| `core-web-vitals` | addyosmani/web-quality-skills | LCP / INP / CLS optimizasyonu |
| `seo` | addyosmani/web-quality-skills | Meta, yapısal veri, sitemap, AI crawler'ları |
| `accessibility` | addyosmani/web-quality-skills | WCAG 2.2 |

## Faza göre kullanım

| Faz | Birincil | Destekleyici |
|---|---|---|
| 1 · İçerik ve konumlandırma | `ecc:brand-discovery`, `ecc:brand-voice` | `design:ux-copy`, `ecc:article-writing` |
| 2 · Sanat yönetimi | **`design-taste-frontend`** | `emil-design-eng`, `ecc:design-system` |
| 3 · İskelet | `ecc:nextjs-turbopack`, `vercel-react-best-practices` | `ecc:frontend-patterns`, `ecc:i18n-sync` |
| 4 · Sayfalar | `design-taste-frontend` | `ecc:react-patterns`, ajan: `ecc:react-reviewer` |
| 5 · Hareket ve cila | `animate`, `emil-design-eng` | `review-animations`, `ecc:motion-patterns`, `ecc:make-interfaces-feel-better` |
| 6 · Kalite | `web-quality-audit`, `web-design-guidelines` | `accessibility`, `core-web-vitals`, `seo`, ajanlar: `ecc:a11y-architect`, `ecc:seo-specialist`, chrome-devtools MCP (Lighthouse) |
| 7 · Yayın | `ecc:deployment-patterns` | `ecc:browser-qa`, `ecc:canary-watch` |

## Çakışma kuralı

Görsel karar (layout, tipografi, renk, kompozisyon) çatışırsa **`design-taste-frontend` kazanır**. Emil skill'leri hareket ve etkileşim konusunda, Vercel ve Addy skill'leri doğruluk, performans ve erişilebilirlik konusunda söz sahibidir. Anthropic'in `frontend-design` plugin'i taste-skill ile aynı işi yapıp çelişen talimatlar verebileceği için **bilinçli olarak kurulmadı**.

## Güncelleme

```bash
npx skills check
```

```bash
npx skills update
```

```bash
claude plugin marketplace update ecc
```

ECC sürüm numarasını değiştirmeden yayınlıyor; bu yüzden `claude plugin update` "zaten güncel" diyebilir. Kurulu commit'i `~/.claude/plugins/installed_plugins.json` dosyasındaki `gitCommitSha` ile karşılaştır; gerideyse plugin'i kaldırıp yeniden kur.

## Değerlendirilip alınmayanlar
- `paramchoudhary/resumeskills@portfolio-case-study-writer`: küçük ve bağımsız bir kaynak; içerik fazında gerekirse önce incelenip eklenebilir.
- `vercel-labs/agent-skills@react-view-transitions`: sayfa geçişleri kapsamına girersek eklenir.
- `typescript-lsp` (resmi plugin): iskelet kurulduktan sonra açılabilir.
