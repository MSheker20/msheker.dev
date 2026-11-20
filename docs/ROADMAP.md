# Program / Yol Haritası

Her faz bir **çıktı** ve **çıkış kriteri** ile biter. Bir faz bitmeden sonrakine geçilmez. Kullanılacak skill'ler için bkz. [SKILLS.md](SKILLS.md).

## Faz 0 · Kurulum ✅ (2026-11-20)
- [x] Mevcut skill'lerin envanteri; taste-skill v2 → 2.5.1, ECC yeniden kuruldu (328 skill)
- [x] Proje skill'leri eklendi (Emil, Vercel, Addy Osmani)
- [x] PLAN, ROADMAP, SKILLS, CONTENT, DECISIONS, CLAUDE.md yazıldı
- [x] `git init` + ilk commit; GitHub: MSheker20/msheker.dev (özel, 2026-11-20)

## Faz 1 · İçerik ve konumlandırma ✅ (2026-11-20)
Çıktı: doldurulmuş [CONTENT.md](CONTENT.md) ve [COPY.md](COPY.md) (konumlandırma, hero, biyografi, vaka çalışmaları)
- [x] CONTENT.md: GitHub, CovertGift reposu ve kullanıcıyla soru-cevap ile dolduruldu
- [x] Öne çıkan projeler: CovertGift (ekran görüntüleri hazır) + AlterF1 (devam ediyor)
- [x] Profil fotoğrafı: kullanıcının gönderdiği fotoğraf, hero'da yarı foto yarı kod portre olarak (2026-11-20)
- [x] Konumlandırma ve ses tonu: "backend-leaning full-stack · just coding" (COPY.md §1–4)
- [x] Kararlar: dil TR+EN, Next.js, Vercel, Vercel Analytics, görsel yön (D-003…D-009)

Çıkış kriteri: hero cümlesi + vaka çalışmalarının ham metni hazır. ✅ (2 öne çıkan proje; üçüncüsü gerekmedi)

Faz 1'den taşınanlar: ~~PauSiber'in tam adı~~ kısa ad kalıyor · ~~AlterF1 ekran görüntüsü~~ terminal kartı · ~~gerçek profil fotoğrafı~~ ✅ · ~~`hello@msheker.dev` yönlendirmesi~~ ✅ kuruldu (D-008)

## Faz 2 · Sanat yönetimi ✅ (2026-11-20)
Çıktı: seçilmiş görsel yön + token'lar (renk, tip ölçeği, boşluk, hareket)
- [x] [INSPIRATION.md](INSPIRATION.md) işaretlendi: Ravi + Dennis + opencode.ai → D-009
- [x] 3 hero varyasyonu: `design/hero/` (V1 Console · V2 Portrait · V3 Blueprint), önizleme: `design-hero` sunucusu
- [x] Yön seçimi: V4 Mix (D-010)
- [x] Font ve vurgu rengi: Geist Mono + kobalt (D-010)
- [x] Token'lar [DESIGN.md](DESIGN.md) dosyasına yazıldı (kontrast ve dokunma hedefleri doğrulandı)

Çıkış kriteri: seçilen yönün hero'su tarayıcıda onaylandı. ✅

## Faz 3 · İskelet ✅ (2026-11-20)
- [x] Next.js 16.4 + React 19.3 + TS strict + Tailwind 4.3 + ESLint (Prettier eklenmedi; gerekirse Faz 4)
- [x] `@theme` token'ları (DESIGN.md), Geist Mono (`next/font`, latin-ext), açık/koyu/sistem tema, saklanan seçim
- [x] Layout: köşe işaretli nav ızgarası, piksel logo, 1–4 kısayolları, footer, skip-link, 404
- [x] EN/TR yerleşik i18n (`[lang]` + `next/root-params` + `proxy.ts`, D-011), içerik katmanı (`src/content/`)
- [→] Vercel dağıtımı Faz 7'ye taşındı (kullanıcı kararı, 2026-11-20)

Çıkış kriteri: boş ama temalı sayfalar önizlemede açılıyor.

## Faz 4 · Sayfalar
- [x] Ana sayfa: V4 birebir (hero + ASCII portre + kayan isim; Work ekranı + canlı API logu + AlterF1 terminali), `[p]` durdurma
- [x] `/work` + `/work/[slug]`: CovertGift ve AlterF1 vaka sayfaları (TS veri, D-012); EN metin onayı bekliyor
- [x] `/cv` sayfası + PDF indirme: ATS tek sayfa, EN/TR (`npm run cv:pdf`, D-013)
- [x] `/about`, `/contact`, `404`

Çıkış kriteri: tüm içerik yerinde, mobil ve masaüstünde düzgün.

## Faz 5 · Hareket ve cila ✅ (2026-11-20)
- [x] Hero girişi (ana sayfa + vaka sayfaları), imza anlar: API logu, yazılan terminal, kaydırmaya tepki veren isim şeridi
- [x] Hover, focus ve geçiş mikro etkileşimleri (kart kalkışı, ok kayması, görsel zoom, `:focus-visible` halkası)
- [x] `prefers-reduced-motion` desteği (CSS + `useReducedMotion`, `[p]` ile durdurma)
- [x] Hareket incelemesi (satır içi, DESIGN.md §5'e göre): API logu odakta da duruyor; taste-skill gate betikleri çalıştırılmadı

## Faz 6 · Kalite
- [x] `web-design-guidelines` denetimi: [t] kısayolu bağlandı, başlık dengesi, touch-action, translate="no" (2026-11-20)
- [x] `accessibility`: Lighthouse a11y 100 (ana sayfa + vaka sayfası, mobil); erişilebilir ad uyuşmazlıkları düzeltildi (2026-11-20)
- [x] `core-web-vitals` + Lighthouse: Slow 4G + 4× CPU mobilde LCP 702 ms, CLS 0; Best Practices ve SEO 100 (2026-11-20)
- [x] `seo`: canonical + hreflang, Person JSON-LD, sitemap, robots, dil başına OG görseli
- [x] Kod incelemesi (satır içi): hareket bileşenleri, kısayollar, tema; isim şeridi ekran dışında duruyor (2026-11-20)

Çıkış kriteri: PLAN.md'deki başarı ölçütleri karşılandı.

## Faz 7 · Yayın ✅ (2026-11-20)
- [x] Vercel'e bağlama ve ilk dağıtım: proje `msheker-dev` (Hobby), https://msheker-dev.vercel.app, `main`'e her push otomatik dağıtılır (2026-11-20)
- [x] msheker.dev alan adı → Vercel, HTTPS (Let's Encrypt); `www` → 308 → kök; Cloudflare'de iki CNAME, proxy kapalı (2026-11-20)
- [x] Analitik: Vercel Web Analytics (Hobby, çerezsiz, D-006), `<Analytics />` layout'ta (2026-11-20)
- [x] Son mobil ve tarayıcı testi (canlı msheker.dev): 320/375/1440 px, EN+TR; 320 px taşmaları (proje ızgarası, TR menü) düzeltildi (2026-11-20)
- [x] Yayın 🚀 https://msheker.dev (2026-11-20)

## Faz 9 · Görsel geliştirmeler (2026-11-20, kullanıcı isteği)
Uygulama planı: [PHASE9.md](PHASE9.md). Öncelikli (sırayla ilk ikisi):
- [x] **Yüzen navbar.** (2026-11-20: başlık = msheker + o anki bölüm; mobilde büyük wordmark satırı kalktı) En üstte mevcut ızgara navbar. Kaydırınca daralıp yüzen kompakt bir navbara dönüşür; kompakt hâlde başlık görünür.
  - Masaüstü: kompakt navbarın üzerine gelince orijinal (tam) hâline açılır.
  - Mobil: hep kompakt kalır; dokununca menü gibi açılır.
- [x] **Teknoloji ve marka logoları.** (2026-11-20: Azure, Java ve LinkedIn eski Simple Icons sürümlerinden, D-015) Gerçek logolar (Simple Icons): CovertGift yığın etiketleri (Go, PostgreSQL, React, Docker, Azure…), CV yetkinlikleri, İletişim'de GitHub/LinkedIn. ✅ Renk: tek renk, üzerine gelince marka rengi (2026-11-20).

Sonra:
- [x] CovertGift mimari diyagramı (2026-11-20, CovertGift reposundan çıkarıldı: nginx.conf.template, docs/AZURE.md) (tarayıcı → nginx → Go/Gin → PostgreSQL, SSE, Gemini, Azure), vaka sayfasında
- [x] Anti-Spoiler canlı demosu (2026-11-20: gerçek yanıtların tekrarı; kaynak group_access.go, response.go, seed): üye ↔ hediye alınan kişi anahtarı, 200 / 403
- [ ] CovertGift'ten gerçek kod parçası (403 middleware), vaka sayfasında
- [ ] GitHub aktivite ısı haritası + canlı repo verisi (elle yazılı commit/test sayılarının yerine)
- [ ] Güvenlik başlıkları (HSTS, CSP…) ve Dependabot

## Faz 8 · Bakım (sürekli)
- Yeni proje: `src/content/projects.ts` + `src/content/cases.ts`'e kayıt, görseller `public/work/<slug>/`
- CV güncelleme: `src/content/cv.ts` düzenle, `npm run cv:pdf` çalıştır, PDF'leri commit'le (unutulursa CI `cv:check` ile kırmızı yanar)
- Ayrıntılı bakım rehberi: [README.md](../README.md)
- Skill güncellemeleri: üç ayda bir `npx skills check` (bkz. SKILLS.md)
