# Program / Yol Haritası

Her faz bir **çıktı** ve **çıkış kriteri** ile biter. Bir faz bitmeden sonrakine geçilmez. Kullanılacak skill'ler için bkz. [SKILLS.md](SKILLS.md).

## Faz 0 · Kurulum ✅ (2026-11-20)
- [x] Mevcut skill'lerin envanteri; taste-skill v2 → 2.5.1, ECC yeniden kuruldu (328 skill)
- [x] Proje skill'leri eklendi (Emil, Vercel, Addy Osmani)
- [x] PLAN, ROADMAP, SKILLS, CONTENT, DECISIONS, CLAUDE.md yazıldı
- [x] `git init` + ilk commit (GitHub reposu henüz yok)

## Faz 1 · İçerik ve konumlandırma ✅ (2026-11-20)
Çıktı: doldurulmuş [CONTENT.md](CONTENT.md) ve [COPY.md](COPY.md) (konumlandırma, hero, biyografi, vaka çalışmaları)
- [x] CONTENT.md: GitHub, CovertGift reposu ve kullanıcıyla soru-cevap ile dolduruldu
- [x] Öne çıkan projeler: CovertGift (ekran görüntüleri hazır) + AlterF1 (devam ediyor)
- [~] Profil fotoğrafı: geçici Instagram görseli var; gerçek fotoğraf Faz 7'den önce şart
- [x] Konumlandırma ve ses tonu: "backend-leaning full-stack · just coding" (COPY.md §1–4)
- [x] Kararlar: dil TR+EN, Next.js, Vercel, Vercel Analytics, görsel yön (D-003…D-009)

Çıkış kriteri: hero cümlesi + vaka çalışmalarının ham metni hazır. ✅ (2 öne çıkan proje; üçüncüsü gerekmedi)

Faz 1'den taşınanlar: PauSiber'in tam adı (Faz 4) · AlterF1 ekran görüntüsü (Faz 4) · gerçek profil fotoğrafı (Faz 7) · `hello@msheker.dev` yönlendirmesi (D-008, Faz 7)

## Faz 2 · Sanat yönetimi ✅ (2026-11-20)
Çıktı: seçilmiş görsel yön + token'lar (renk, tip ölçeği, boşluk, hareket)
- [x] [INSPIRATION.md](INSPIRATION.md) işaretlendi: Ravi + Dennis + opencode.ai → D-009
- [x] 3 hero varyasyonu: `design/hero/` (V1 Console · V2 Portrait · V3 Blueprint), önizleme: `design-hero` sunucusu
- [x] Yön seçimi: V4 Mix (D-010)
- [x] Font ve vurgu rengi: Geist Mono + kobalt (D-010)
- [x] Token'lar [DESIGN.md](DESIGN.md) dosyasına yazıldı (kontrast ve dokunma hedefleri doğrulandı)

Çıkış kriteri: seçilen yönün hero'su tarayıcıda onaylandı. ✅

## Faz 3 · İskelet ✅ (2026-11-20, Vercel hariç)
- [x] Next.js 16.4 + React 19.3 + TS strict + Tailwind 4.3 + ESLint (Prettier eklenmedi; gerekirse Faz 4)
- [x] `@theme` token'ları (DESIGN.md), Geist Mono (`next/font`, latin-ext), açık/koyu/sistem tema, saklanan seçim
- [x] Layout: köşe işaretli nav ızgarası, piksel logo, 1–4 kısayolları, footer, skip-link, 404
- [x] EN/TR yerleşik i18n (`[lang]` + `next/root-params` + `proxy.ts`, D-011), içerik katmanı (`src/content/`)
- [ ] Vercel'e ilk önizleme dağıtımı (kullanıcının Vercel hesabı ve GitHub reposu gerekli)

Çıkış kriteri: boş ama temalı sayfalar önizlemede açılıyor.

## Faz 4 · Sayfalar
- [ ] Ana sayfa
- [ ] `/work` + `/work/[slug]` (MDX)
- [ ] `/cv` + yazdırma stili + PDF
- [ ] `/about`, `/contact`, `404`

Çıkış kriteri: tüm içerik yerinde, mobil ve masaüstünde düzgün.

## Faz 5 · Hareket ve cila
- [ ] Hero girişi, 1–2 imza an (`animate`, `emil-design-eng`)
- [ ] Hover, focus ve geçiş mikro etkileşimleri
- [ ] `prefers-reduced-motion` desteği
- [ ] `review-animations` + taste-skill finish gate

## Faz 6 · Kalite
- [ ] `web-design-guidelines` denetimi, bulguların kapatılması
- [ ] `accessibility`: klavye, kontrast, ekran okuyucu
- [ ] `core-web-vitals` + Lighthouse (chrome-devtools MCP) hedefleri
- [ ] `seo`: meta, JSON-LD, sitemap, OG görselleri
- [ ] Kod incelemesi (`ecc:react-reviewer`)

Çıkış kriteri: PLAN.md'deki başarı ölçütleri karşılandı.

## Faz 7 · Yayın
- [ ] msheker.dev alan adı → Vercel, HTTPS
- [ ] Analitik
- [ ] Son mobil ve tarayıcı testi (`ecc:browser-qa`)
- [ ] Yayın 🚀

## Faz 8 · Bakım (sürekli)
- Yeni proje: `content/projects/<slug>.mdx` ekle
- CV güncelleme: `content/cv.ts` düzenle; PDF otomatik yenilenir
- Skill güncellemeleri: üç ayda bir `npx skills check` (bkz. SKILLS.md)
