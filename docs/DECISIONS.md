# Karar Kaydı

Format: **durum** · karar · gerekçe. Durumlar: ✅ kabul · ⏳ açık · ❌ reddedildi

## D-001 ✅ Tasarım otoritesi: taste-skill
Görsel kararlarda `design-taste-frontend` (2.5.1) son sözü söyler. Anthropic'in `frontend-design` plugin'i çelişen talimatlar vereceği için kurulmadı.

## D-002 ✅ Skill'ler proje kapsamında
Siteye özgü skill'ler global yerine `.claude/skills/` altında duruyor, kaynakları `skills-lock.json` ile sabitlendi. Diğer projeleri kirletmiyor ve repo ile birlikte taşınıyor.

## D-003 ✅ Framework: Next.js 16 (2026-11-20)
- Next.js: skill ekosistemi (Vercel, ECC, Motion) React odaklı; MDX, OG ve i18n olgun.
- Astro: varsayılan olarak sıfır JS ve biraz daha iyi temel performans; ama animasyonlar için React adaları gerekir ve skill desteği daha zayıf.
- Karar: **Next.js**.

## D-004 ✅ Dil: TR + EN (2026-11-20)
Varsayılan dil İngilizce, Türkçe `/tr` altında. `next-intl` ile baştan kurulacak. CovertGift de iki dilli olduğu için tutarlı.

## D-005 ✅ Barındırma: Vercel (2026-11-20)
✅ Alan adı msheker.dev zaten kullanıcıda; DNS Cloudflare'de, `covertgift.msheker.dev` Azure'a gidiyor.
✅ Site Vercel'de; DNS Cloudflare'de kalır, `msheker.dev` kök alan adı Vercel'e yönlendirilir. Her değişiklikte önizleme linki.

## D-006 ✅ Analitik: Vercel Analytics (2026-11-20)
Barındırma ile aynı yerde, ücretsiz katman, çerez banner'ı gerektirmiyor. İhtiyaç olursa Plausible'a geçilebilir.

## D-007 ✅ İletişim formu v1'de yok
`mailto` + sosyal bağlantılar. Spam koruması ve backend gerektirmiyor.

## D-008 ⏳ Alan adına bağlı e-posta
`hello@msheker.dev` adresine gelen postalar mustafa652seker@gmail.com'a yönlendirilecek (ör. Cloudflare Email Routing). ✅ Kuruldu (2026-11-20). Sitede yalnızca `hello@msheker.dev` görünür; CV ve PDF'te Gmail adresi kullanılır, `hello@` CV'ye girmez (`site.cvEmail`).

## D-009 ✅ Görsel yön: "Terminal editoryal" (2026-11-20)
Referanslar: **opencode.ai** (ana), raviklaassens.com, dennissnellenberg.com. Kod yazan birinin sitesi gibi hissettirmeli, ama Awwwards kalitesinde.

opencode.ai'den:
- **Monospace sistem fontu** her yerde, tek aile, normal ağırlık; hiyerarşi boyut ve renkle kurulur
- Numaralı navigasyon: `[1] work  [2] about  [3] cv  [4] contact` ve klavye kısayolları (1–4 tuşları)
- Projeler **terminal pencereleri** olarak: gerçek komut ve çıktı. Örn. `$ curl covertgift.msheker.dev/api/groups/42` → `403 · surprise protected 🎁`
- Piksel veya ASCII "msheker" logosu
- Numaralı bölümler `01 / 02 / 03`

Ravi'den:
- Köşe işaretli ızgara ve hizalama çizgileri (teknik çizim hissi)
- Küçük, gruplanmış meta etiketleri

Dennis'ten:
- Büyük portre ve ekranı yatayda geçen dev isim şeridi (marquee); kaydırmaya tepki verir
- "Denizli, TR · remote" konum etiketi
- Akıcı sayfa geçişleri ve manyetik butonlar (ölçülü)

İmza anı: CovertGift'in Anti-Spoiler akışını gösteren **canlı terminal logu** (istek → yetki kontrolü → 403), kullanıcı kaydırdıkça satır satır akar.

Kurallar:
- Mono font sistemin kendisi olacak, süs olarak kullanılmayacak. taste-skill "her yere serpiştirilmiş monospace etiket" kalıbını şablon kokusu sayıyor; burada tek ve tutarlı sistem olduğu için bilinçli bir istisna. Faz 2'de skill'e bu not açıkça verilecek.
- Açık ve koyu tema sistem tercihine göre (D-004 ile birlikte). Terminal kartları her iki temada da koyu kalır (opencode gibi).
- Preloader yok ya da 600 ms altında; Ravi ve Dennis'teki uzun açılış ekranları LCP'yi bozar.
- Font adayları (Faz 2'de denenecek): Geist Mono, JetBrains Mono, Commit Mono, IBM Plex Mono. Hepsi açık lisanslı.

## D-010 ✅ Hero: V4 "Mix" (2026-11-20)
Kullanıcı üç varyasyondan parça seçti; sonuç `design/hero/v4.html`.
- Navigasyon: V3'ün köşe işaretli 4'lü ızgarası (Index · Docs · Status), sol köşede V1'in piksel "msheker" logosu
- Hero: başlık + iki buton solda, V2'nin ASCII portresi sağda (terminal penceresi, `cat` gibi satır satır), altta V2'nin kayan isim şeridi
- İkinci ekran (Work): V1'in proje terminal kartları; CovertGift kartında V3'ün canlı API logu (üye 200, hediye alınan kişi 403)
- ✅ Font **Geist Mono**, vurgu **kobalt** `#2f5bff` (koyu temada `#6f8bff`). Kullanıcı 6 font (Geist, JetBrains, IBM Plex, Martian, Fragment, DM) ve 5 rengi (kobalt, turuncu, asit yeşili, terminal yeşili, kehribar) karşılaştırdıktan sonra ilk hali seçti (2026-11-20)
- 5 sn'den uzun hareketler için `[p] Pause motion` düğmesi (Status hücresinde) + `prefers-reduced-motion`
- ASCII portre: `assets-inbox/1000010335.jpeg` → `design/tools/person-mask.swift` (Apple Vision, cihazda) → `design/tools/ascii.py --mask … --cols 72 --width 2.8 --height 2.6 --gamma 0.8`

## D-011 ✅ i18n: next-intl yerine Next'in yerleşik yöntemi (2026-11-20)
Next 16 rehberindeki kalıp: `app/[lang]` kök layout + `next/root-params` ile okunan JSON sözlükler + `proxy.ts`. Ek bağımlılık yok, `cacheComponents` ile doğrudan uyumlu, her iki dil build'de statik üretiliyor.
- EN önek olmadan (`/work`), TR `/tr` altında (`/tr/work`); `/en/...` adresleri kalıcı olarak (308) öneksiz adrese yönleniyor.
- Sözlük tipi `en.json`'dan çıkıyor; `tr.json`'da eksik anahtar TypeScript hatası verir.
- Bilinmeyen yollar `[lang]/[...rest]` ile yakalanıp dile uygun 404 gösteriliyor.

## D-012 ✅ Vaka çalışmaları MDX yerine TS veri dosyasında (2026-11-20)
`src/content/cases.ts`: her vaka EN/TR alanlarıyla tek dosyada. Ek bağımlılık yok, sözlükler gibi tip güvenli; iki proje için MDX'in getirisi yok. Proje sayısı artar ya da uzun anlatım gerekirse MDX'e geçilir.
- Rota: `/[lang]/work/[slug]`, `generateStaticParams` ile her iki dilde statik.
- Görseller `public/work/<slug>/` altında; CovertGift için 3 ekran görüntüsü (repo `docs/screenshots/`).
- EN metin COPY.md §6'daki TR taslaktan çevrildi; onay bekliyor.

## D-013 ✅ PDF CV: ATS uyumlu tek sayfa (2026-11-20)
**Kalıcı kural** (kullanıcı, 2026-11-20): CV her zaman ATS uyumlu kalır; bu karar yeniden açılmaz. Logo ve ikonlar yalnızca web CV'de.
Kullanıcı seçimi. Tek sütun, A4, seçilebilir metin; tablo, ikon, görsel ve fotoğraf yok. Standart başlıklar (EN: Summary, Education, Experience, Projects, Skills, Languages · TR: Özet, Eğitim, Deneyim, Projeler, Yetkinlikler, Diller). Yazı tipi Arial/Helvetica (ATS ve okunabilirlik için site fontu kullanılmıyor).
- Kaynak: `src/content/cv.ts` (`cvSummary`, `cvProjects` + ortak deneyim/eğitim/yetkinlik). Sayfa: `/[lang]/cv/document` (`noindex`, sitemap'te yok).
- Üretim: `npm run cv:pdf` → build + Chrome headless → `public/cv/mustafa-seker-cv-{en,tr}.pdf`. Vercel build'inde Chrome olmadığı için PDF'ler repoya commit'lenir; CV değişince komut yeniden çalıştırılır.
- İletişim: Gmail adresi (D-008), telefon yok.

## D-014 ✅ Yüzen navbar (2026-11-20)
Kullanıcı seçimi. Masaüstünde en üstte ızgara header; ekrandan çıkınca (IntersectionObserver, `#site-header`) ortada yüzen kompakt çubuk: küçük `msheker` + o anki bölümün etiketi (`01 / Work`…; alt sayfalarda sayfanın etiketi). Hover/odakta aynı çubuk tam nav'a açılır. Mobilde büyük wordmark satırı yok; çubuk ilk ekrandan itibaren hep kompakt, dokununca menü olarak açılır. `1–4` kısayolları tek yerde (`NavShortcuts`). Bileşen: `src/components/floating-nav.tsx`.

## D-015 ✅ Marka logoları (2026-11-20)
Simple Icons v16.38.0 (CC0) path'leri `src/content/brand-icons.ts`'e kopyalandı (bağımlılık yok). Tek renk, hover/odakta markanın rengi; çok koyu marka koyu temada, çok açık marka açık temada `--ink`'e düşer. Azure, Java ve LinkedIn Simple Icons'tan marka sahiplerinin isteğiyle kaldırılmış; kullanıcı kararıyla (2026-11-20) eski sürümlerin path'leri (Java v6.23.0, Azure ve LinkedIn v10.4.0) alındı ve marka kurallarına aykırı olarak tek renk gösteriliyor. Şikâyet gelirse `brand-icons.ts`'ten silinmeleri yeterli. PDF CV'ye ikon girmez (D-013).

## D-016 ✅ Canlı GitHub verisi (2026-11-20)
`src/lib/github.ts`, GitHub'ın açık REST API'sinden build sırasında çeker; `"use cache"` + `cacheLife("days")` ile canlıda günde bir yenilenir. Token gerekmez; Vercel'de kapsamsız bir `GITHUB_TOKEN` yalnızca istek sınırını yükseltir.
- Ana sayfa (Work): son 53 haftanın commit ısı haritası; açık, fork olmayan repolarda kullanıcının varsayılan dala commit'leri. Veri alınamazsa harita hiç görünmez (eksik bir yıl göstermek yerine).
- Vaka sayfası: `outcome` içindeki `{commits}` ve `{tests}` canlı (commit sayısı, `_test.go` dosyası sayısı); alınamazsa `cases.ts` → `stats` içindeki elle yazılı sayılar.
- PDF CV elle yazılı kalır (D-013: sabit dosya, `cv:check`).

## D-017 ✅ Güvenlik başlıkları ve Dependabot (2026-11-20)
`next.config.ts` → `headers()`, yalnızca production: CSP (her şey `'self'`; `frame-ancestors 'none'`, `object-src 'none'`), HSTS 2 yıl + `includeSubDomains` (preload listesine eklenmedi), `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; `X-Powered-By` kapalı.
- `script-src` ve `style-src` `'unsafe-inline'` içerir: statik (SSG) sayfalar Next'in satır içi script'lerini taşır ve istek başına nonce alamaz. Nonce için sayfaların dinamik olması gerekir; bu site için değmez.
- Siteye yeni bir dış kaynak (font, görsel, analitik, gömme) eklenirse CSP'ye o origin eklenmeli, yoksa tarayıcı engeller.
- `.github/dependabot.yml`: npm ve GitHub Actions haftalık (pazartesi); minor/patch tek PR'da gruplu, major'lar tek tek. Her PR'da CI çalışır.
