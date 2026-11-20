# msheker.dev · Ürün Planı

## Amaç
Kişisel **portfolyo + CV** sitesi. Ziyaretçi (işe alımcı, müşteri, meslektaş) **10 saniyede** kim olduğumu, ne yaptığımı ve neden iyi olduğumu anlamalı; **1 tıkla** CV'ye ve iletişime ulaşmalı.

Başarı ölçütleri:
- Lighthouse: Performance ≥ 95, Accessibility 100, SEO 100 (mobil)
- LCP < 1.8 sn, CLS < 0.05, INP < 150 ms
- "Şablon / AI yapımı" görünmemesi (taste-skill finish gate'ini geçmesi)
- Yeni proje veya CV satırı eklemek: tek bir içerik dosyası düzenlemek

## Kitle ve ton
- Birincil: işe alımcılar ve teknik yöneticiler. Hızlı tarar; CV, deneyim ve somut çıktılar ister.
- İkincil: potansiyel müşteriler ve topluluk. Projelere, yazılara ve iletişime bakar.
- Ton: sakin, özgüvenli, net. Abartı ve buzzword yok, rakamlarla anlatım.

## Site haritası (v1)
| Rota | İçerik |
|---|---|
| `/` | Hero (isim, rol, tek cümlelik konumlandırma) → seçili işler (3–4) → kısa hakkımda → deneyim özeti → yetkinlikler → iletişim CTA |
| `/work` | Tüm projeler (filtrelenebilir) |
| `/work/[slug]` | Vaka çalışması: problem → rol → yaklaşım → sonuç (rakamlar) → görseller |
| `/cv` | Web CV: yazdırmaya uygun stil + PDF indirme |
| `/about` | Uzun biyografi, fotoğraf, değerler, şu an ne yaptığım |
| `/contact` | E-posta, sosyal bağlantılar, uygunluk durumu (v1'de form yok) |
| `404` | Markaya uygun hata sayfası |

v2 adayları: `/writing` (MDX blog), `/uses`, `/now`, sayfa geçişleri, komut paleti (⌘K).

## İçerik modeli
Tüm içerik kodla birlikte repoda durur; CMS yok.
- `content/projects/*.mdx`: frontmatter: `title, slug, year, role, stack[], summary, cover, featured, order, links{}`
- `content/cv.ts`: tipli tek kaynak: deneyim, eğitim, yetkinlikler, diller, sertifikalar. `/cv`, ana sayfa ve PDF bu dosyadan beslenir.
- `content/site.ts`: isim, rol, sosyal bağlantılar, e-posta, uygunluk durumu
- Dil: TR + EN (karar bekliyor, bkz. DECISIONS.md)

## Teknik yığın (önerilen)
| Katman | Seçim | Sürüm (2026-11) |
|---|---|---|
| Framework | Next.js App Router, statik üretim (SSG) | 16.4 |
| UI | React | 19.3 |
| Dil | TypeScript (strict) | 7.0 |
| Stil | Tailwind CSS (CSS-first `@theme` token'ları) | 4.3 |
| Hareket | Motion (`motion/react`), gerekiyorsa Lenis | 14.14 / 1.3 |
| İçerik | MDX (`@next/mdx`) + tipli TS veri | 16.4 |
| i18n | Next yerleşik: `[lang]` + `next/root-params` + `proxy.ts` (D-011) | — |
| Görseller | `next/image` (AVIF/WebP), yerel fontlar (`next/font`) | — |
| OG görselleri | `next/og` ile sayfa başına dinamik | — |
| Barındırma | Vercel (msheker.dev; `.dev` HSTS gerektirir, HTTPS zaten zorunlu) | — |
| Analitik | Vercel Analytics veya Plausible (çerezsiz) | — |
| Paket yöneticisi | npm (pnpm kurulu değil) · Node 26 | — |

Neden Next.js, neden Astro değil: Astro statik bir portfolyo için de çok iyi. Ancak projedeki skill'lerin çoğu (Vercel React best practices, ECC Next.js ve React reviewer, motion skill'leri) React/Next odaklı, ve Motion'ın React entegrasyonu en olgun yol. Alternatif DECISIONS.md'de kayıtlı.

## Tasarım ilkeleri
Yön seçildi: **"Terminal editoryal"** (opencode.ai + Ravi Klaassens + Dennis Snellenberg); ayrıntılar DECISIONS.md D-009'da. Faz 2'de `design-taste-frontend` bu yön içinde 2–3 varyasyon çıkaracak. Sabit ilkeler:
- Tipografi önde: tek monospace aile (gerekirse uzun metin için ikinci bir sans), hiyerarşi boyut ve renkle
- Tek vurgu rengi; açık ve koyu tema (sistem tercihine uyumlu, elle değiştirilebilir)
- Her ekranda tek fikir. İkon kartı ızgarası, belirsiz gradient, "Hi, I'm…" klişesi yok
- Hareket amaçlı ve ölçülü: hero girişi + 1–2 imza an + mikro etkileşimler. `prefers-reduced-motion`'a tam saygı
- Gerçek görseller: proje ekran görüntüleri ve gerçek fotoğraf. Stok illüstrasyon yok
- Mobil öncelikli; 360 px'te kusursuz

## SEO ve paylaşım
- `Person` + `WebSite` JSON-LD, proje sayfalarında `CreativeWork`
- Sayfa başına title, description, canonical, hreflang (TR/EN)
- `sitemap.xml`, `robots.txt`, dinamik OG görselleri
- AI crawler politikası `seo` skill'ine göre belirlenecek

## Kapsam dışı (v1)
CMS, blog, iletişim formu (spam ve backend yükü), yorumlar, giriş/hesap sistemi.
