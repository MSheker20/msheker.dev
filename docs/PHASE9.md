# Faz 9 · Uygulama planı (yeni sohbet buradan devam eder)

Kaynak: kullanıcı isteği, 2026-11-20. Durum ve kutular: [ROADMAP.md](ROADMAP.md) Faz 9.
Kurallar CLAUDE.md'deki gibi: görsel işten önce `design-taste-frontend`, animasyonda `animate` + `emil-design-eng`; token'lar yalnızca [DESIGN.md](DESIGN.md)'den; her iş biriminden sonra build/tsc/lint, commit ve push (kullanıcı tercihi). **Kullanıcı az token ve az test istiyor:** her iş için tek bir hedefli doğrulama yeter.

Sıra: **1) Yüzen navbar → 2) Teknoloji ve marka logoları.** Diğer Faz 9 maddeleri bunlardan sonra.

---

## 1. Yüzen navbar

### İstenen davranış (kullanıcının sözleri esas)
- Sayfanın en üstünde **mevcut ızgara navbar** (`src/components/site-header.tsx`) olduğu gibi durur.
- Kaydırınca **daralıp yüzen, kompakt bir navbara** dönüşür; kompakt hâlde **başlık görünür**.
- **Masaüstü:** kompakt navbarın üzerine gelince **orijinal (tam) hâline açılır**, fare ayrılınca tekrar daralır.
- **Mobil:** navbar **hep kompakt** kalır; **dokununca menü gibi açılır**.

### Açık sorular (yeni sohbetin başında kullanıcıya sor, tek soru kartında)
1. "Başlık" ne olsun? **Önerilen:** solda küçük piksel `msheker` + o an ekrandaki bölümün etiketi (`01 / Work`, `02 / About`…; alt sayfalarda sayfa başlığı). Alternatif: yalnızca `msheker`.
2. Mobilde en üstteki büyük `msheker` satırı kalsın mı? **Önerilen:** kalkar; mobilde sayfa en baştan kompakt çubukla açılır ("hep dar kalsın"). Hero ilk ekranı bu yüzden büyür.

### Tasarım
- **Kompakt çubuk:** ekranın üstünde ortalanmış, `position: fixed`, üstten 12 px (`max(12px, env(safe-area-inset-top))`), genişlik içeriğe göre (masaüstü en fazla ~560 px; mobilde `wrap` kenarları). `--surface` zemin, `--line` kenarlık, köşe işaretleri (`.crop` dili) ya da 1 px kenarlık; yüzen ayarlar butonuyla aynı gölge ailesi (`globals.css` → `.settings-trigger`).
- **İçerik (masaüstü, dar):** `msheker` (küçük piksel, ~64 px) · başlık · sağda `[1]–[4]` kısayol ipucu ya da `≡`.
- **Açılmış (masaüstü, hover / focus-within):** aynı çubuk aşağı doğru büyüyüp tam ızgaranın içeriğini gösterir: Index (1, 2), Docs (3, 4), Status + `[p]`. Kopya bir ızgara değil, aynı bileşen; iki boyut arasında `grid-template-rows` / `clip-path` ile geçiş.
- **Mobil:** çubukta `msheker` + başlık + `Menü` butonu (`aria-expanded`). Açılınca çubuğun altında tam genişlik panel: 4 bağlantı (44 px satırlar), durum satırı. Escape, dışarı dokunma ve bağlantıya dokunma kapatır; odak butona döner.

### Uygulama adımları
1. **Kısayolları tekilleştir.** `NavLinks` (`src/components/nav-links.tsx`) her render'da `keydown` dinleyicisi kuruyor; navbar iki yerde render edilirse `1–4` tuşları iki kez `router.push` yapar. Dinleyiciyi tek bir `useNavShortcuts()` hook'una ya da layout'ta bir kez mount edilen küçük bir bileşene taşı; `NavLinks` sadece link çizsin.
2. **Görünürlük sinyali:** scroll dinleyicisi yerine tam header'ın altına konan bir sentinel'i `IntersectionObserver` ile izle → `compact = !headerVisible`. Mobilde (`max-width: 767.98px`, `matchMedia`) her zaman `compact = true`.
3. **Başlık:** `#work`, `#about`, `#cv`, `#contact` bölümlerini `IntersectionObserver` ile izleyip en üstte görüneni seç (`rootMargin: "-40% 0px -55% 0px"`); etiketler sözlükte zaten var (`dict.pages.*.label`). Alt sayfalarda sayfanın `label`'ı.
4. **Yeni istemci bileşeni** `src/components/floating-nav.tsx`: kompakt çubuk + açılan panel. `SiteHeader` server bileşen olarak kalır; `FloatingNav` layout'ta `SiteHeader`'ın yanında render edilir (sözlük ve locale prop olarak).
5. **Masaüstü aç/kapa:** `pointerenter` → aç; `pointerleave` → 150 ms gecikmeyle kapa (titremesin); `focus-within` da açık tutar (klavye). Dokunmatik cihazda hover yok: `(hover: hover)` medya sorgusuyla ayır.
6. **Erişilebilirlik:** tam header görünürken kompakt çubuk `inert` + görünmez; ikisi aynı anda odaklanabilir olmasın. Kompakt `nav`'ın `aria-label`'ı farklı olsun. Menü butonu `aria-expanded`/`aria-controls`. Atlama bağlantısı ilk Tab'da kalsın.
7. **Hareket:** giriş/çıkış `opacity` + `transform` (≤200 ms, `--ease-out-soft`); `prefers-reduced-motion`'da geçişsiz. Kaydırmayla bağlı animasyon yok, sadece durum değişimi.
8. **`--header-h`:** mobilde büyük wordmark kalkarsa `globals.css`'teki mobil `--header-h` formülü (satır ~24) kompakt çubuğun yüksekliğine göre güncellenir; hero `min-h` hesabı buna bağlı (`src/app/[lang]/page.tsx:30`).
9. **Baskı:** yeni çubuk ve panel `data-site-chrome` taşısın (PDF/print'te gizlenir).

### Doğrulama (tek tur, az token)
- Production build + `web-prod` (port 3002). 375 ve 1440 px'te: en üstte tam navbar / kaydırınca kompakt / hover'da açılma / mobil menü açılıp kapanma. `1–4` tuşları tek kez gidiyor. Bir kez Lighthouse a11y (100 kalmalı), CLS 0.

---

## 2. Teknoloji ve marka logoları

### Karar
- **Renk: tek renk, üzerine gelince markanın kendi rengi** (kullanıcı kararı, 2026-11-20). Varsayılan `currentColor` (`--muted`), hover/focus-visible'da `--brand`.
- Logolar gerçek ve resmi olacak; çizilmiş benzer yok.

### Kaynak
- **Simple Icons** (CC0). Seçenek A: `simple-icons` paketini dev bağımlılığı olarak ekle, yalnızca kullanılan ikonları server bileşende import et (`import { siGo } from "simple-icons"` → `path` + `hex`); HTML'e sadece o path'ler girer. Seçenek B: kullanılan path'leri `src/content/brand-icons.ts`'e kopyala (bağımlılık yok, lisans notuyla). **Önerilen: B** (az ikon, sıfır bağımlılık).
- **Dikkat:** Simple Icons bazı markaları marka sahibinin isteğiyle kaldırdı (LinkedIn ve Microsoft/Azure buna dahil olabilir). Önce kontrol et; yoksa markanın kendi basın kitindeki resmi SVG'yi kullan (kaynağı yorumda yaz) ya da o etikette logosuz metin bırak. Uydurma logo çizme.

### Bileşen
- `src/components/brand-icon.tsx`: `<BrandIcon name="go" />` → 14–16 px inline SVG, `aria-hidden="true"`, `fill="currentColor"`, kapsayıcıda `style={{ "--brand": hex }}`.
- Hover/focus rengi: `.group:hover .brand-icon { color: var(--brand) }`. **Kontrast kuralı:** koyu markalar (GitHub `#181717` gibi) koyu temada, açık markalar açık temada görünmez olur; karşıtlık zayıfsa o temada `--brand` yerine `--ink` kullan (tema başına küçük bir eşleme yeterli).
- Metin etiketi her zaman kalır; ikon süs, bilgi metinde.

### Nereye
- **Yığın etiketleri:** ana sayfa `ProjectCard` (`src/app/[lang]/page.tsx`), `/work` listesi (`src/app/[lang]/work/page.tsx`), vaka sayfası yığın satırı (`src/app/[lang]/work/[slug]/page.tsx`). Veri: `src/content/projects.ts` `stack` ve `src/content/cases.ts` `stack`. İsim → ikon eşlemesi tek yerde (`brand-icons.ts`), eşlemesi olmayan etiket ikonsuz kalır.
- **CV yetkinlikleri (web):** `src/components/sections.tsx` → `CvSection` skills bloğu. **PDF CV'ye ikon girmez** (ATS, D-013).
- **İletişim:** GitHub ve LinkedIn butonları (`ContactSection`).

### Doğrulama
- Bir ekran görüntüsü (açık + koyu), bir hover kontrolü, `npm run cv:check` hâlâ geçiyor (PDF kaynağına dokunulmadı), Lighthouse a11y 100.

---

## Sonra (Faz 9 devamı, sırayla)
CovertGift mimari diyagramı → Anti-Spoiler canlı demosu (üye ↔ hediye alınan kişi, 200/403) → gerçek kod parçası (403 middleware) → GitHub ısı haritası + canlı repo verisi → güvenlik başlıkları + Dependabot. Ayrıntılar ROADMAP Faz 9'da.

## Notlar
- `graphify-out/` repoda izlenmiyor ve `.gitignore`'da değil; kullanıcıya sorulmadan commit'lenmesin.
- Proje iCloud'lu klasörde; `.next` içinde `* 2.ts` kopyaları olursa `tsconfig` zaten yok sayıyor, `find .next -name "* 2.*" -delete` ile temizlenebilir.
- Başka bir oturumun dev sunucusu 3000'de çalışıyor olabilir; doğrulamayı `web-prod` (3002) ile yap.
