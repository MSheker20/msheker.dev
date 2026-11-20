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
`hello@msheker.dev` adresine gelen postalar mustafa652seker@gmail.com'a yönlendirilecek (ör. Cloudflare Email Routing). Kurulana kadar sitede Gmail adresi görünecek.

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
