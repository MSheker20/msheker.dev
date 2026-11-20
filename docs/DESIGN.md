# Tasarım Sistemi · Token'lar

Kaynak: `design/hero/v4.html` + `design/hero/shared.css` (D-009 "Terminal editoryal", D-010 V4 Mix). Faz 3'te bu değerler Tailwind 4 `@theme` bloğuna birebir taşınır; sitede burada olmayan renk, ölçü ya da süre kullanılmaz.

Kontrol: 2026-11-20. WCAG oranları hesaplandı, dokunma hedefleri tarayıcıda ölçüldü.

---

## 1. Renk

Tema sistem tercihine uyar (`prefers-color-scheme`); kullanıcı elle `data-theme="light|dark"` ile değiştirebilir.

| Token | Açık | Koyu | Kullanım | Kontrast |
|---|---|---|---|---|
| `--bg` | `#f7f7f4` | `#0b0b0c` | sayfa zemini | — |
| `--surface` | `#efefea` | `#141416` | ikincil zemin | — |
| `--ink` | `#18181a` | `#ecece8` | metin | 16.5 · 16.6 |
| `--muted` | `#66666a` | `#8e8e89` | ikincil metin, etiketler | 5.3 · 6.0 |
| `--line` | `#dcdcd5` | `#242427` | çizgiler | — |
| `--accent` | `#2f5bff` | `#6f8bff` | buton zemini, şerit ayracı | — |
| `--accent-ink` | `#2f5bff` | `#8aa0ff` | vurgulu metin (wip, hover) | 4.8 · 8.0 |
| `--on-accent` | `#ffffff` | `#0b0b0c` | buton yazısı | 5.2 · 6.4 |

**Terminal (her iki temada da koyu)**

| Token | Değer | Kullanım | Kontrast |
|---|---|---|---|
| `--term-bg` | `#0e0e10` | pencere zemini | — |
| `--term-ink` | `#e9e9e4` | çıktı | 15.8 |
| `--term-muted` | `#8b8b86` | yol, yorum, başlık çubuğu | 5.6 |
| `--term-line` | `#26262a` | kenarlık, ayırıcı | — |
| `--term-accent` | `#6f8bff` | `$` prompt (temadan bağımsız) | 6.3 |
| `--term-art` | `#d9d9d2` | ASCII portre | — |
| `--ok` | `#3fb950` | 2xx, durum noktası | 7.6 |
| `--err` | `#ff6b5b` | 4xx | 6.9 |

Kurallar:
- Tek vurgu rengi. Mor ve lavanta yok (taste-skill kuralı).
- Kobalt CovertGift'in mavisi; projeler arası marka bağı.
- ⚠️ Açık temadaki kobalt koyu terminal zemininde yalnızca 3.7 veriyor. Terminal içinde her zaman `--term-accent` kullanılır.

## 2. Tipografi

- **Tek aile:** Geist Mono 400 ve 500 (Google Fonts → Faz 3'te `next/font` ile yerel). Yedek: `ui-monospace, SFMono-Regular, Menlo, monospace`.
- Hiyerarşi boyut ve renkle kurulur; kalın yalnızca 500. Ligatürler kapalı (`calt 0, liga 0`).
- "Backend-leaning" ve "full-stack" satır sonunda bölünmez (`white-space: nowrap`).

| Rol | Boyut | Satır | Harf aralığı | Ağırlık |
|---|---|---|---|---|
| İsim şeridi | `clamp(56px, 11vw, 176px)` | 1.14 | -0.045em | 500 |
| Hero cümlesi (h1) | `clamp(22px, 2.5vw, 38px)` | 1.25 | -0.015em | 400 |
| Bölüm başlığı (h2) | `clamp(26px, 3vw, 44px)` | 1.1 | -0.02em | 400 |
| Kart başlığı (h3) | 15px | 1.55 | 0 | 500 |
| Gövde | 15px | 1.55 | 0 | 400 |
| Kart metni | 13.5px | 1.55 | 0 | 400 |
| Etiket, menü, chip | 12–12.5px | 1.55 | 0 | 400 |
| Terminal | 13.5px (log 12.5px, mobil 10px) | 1.6 | 0 | 400 |
| ASCII portre | `clamp(5px, .7vw, 10.5px)` | 1.12 | 0 | 400 |

## 3. Boşluk ve ızgara

| Token | Değer |
|---|---|
| `--max` | 1440px içerik genişliği |
| `--pad` | `clamp(16px, 4vw, 56px)` yan boşluk; her blok bu çizgide başlar ve biter |
| Boşluk adımları | 4 · 6 · 10 · 16 · 20 · 24 · 28 · 36 · 48 px |
| Bölüm | en az `100svh`; Work: `12vh` üst, `10vh` alt |
| Kırılma noktaları | 980px (tek sütun), 640px (telefon) |

- Navigasyon: 4 eşit sütun (980 altında 2, 640 altında `auto 1fr 1fr`, Status gizlenir).
- Hero orta: `1fr | 520px`, 48px aralık. Work kartları: `2fr | 1fr`, 20px aralık.

## 4. Şekil

| Öğe | Değer |
|---|---|
| Terminal penceresi | radius 6px, 1px `--term-line` |
| Buton, chip | radius 0 (keskin; geliştirici aracı hissi) |
| Durum noktası | 7px daire |
| Köşe işareti | 9×9px, 1px `--muted`, hücre köşesinden 4px dışarıda |
| Etiket karesi | 7×7px `--ink` |
| Piksel logo | 5×7 bitmap, hücre 4px, aralık 1px (mobil 82px genişlik) |

## 5. Hareket

| Token | Değer |
|---|---|
| `--ease` | `cubic-bezier(.2, .8, .2, 1)` |
| Hero girişi | 0.7s, öğeler arası 0.08s gecikme, yalnızca bir kez |
| Kart kalkışı | hover'da `translateY(-2px)`, 0.25s |
| Buton | hover'da -2px (0.18s), basınca `scale(.98)` |
| Alt çizgi | soldan çizilir, 0.35s |
| Ok | hover'da +3px |
| İsim şeridi | 70px/sn; kaydırma yönüne döner, hızı en fazla 7×, her karede ×0.92 söner |
| API logu | 1.5 sn'de bir satır, en fazla 13 satır; hover/focus'ta durur |
| Terminal yazımı | karakter başına 38 ms + 0–30 ms rastgele; satır arası 380 ms; döngü arası 2.6 sn |
| ASCII portre | satır başına 22 ms, 350 ms gecikmeyle başlar |
| İmleç | 1.1 sn, kesik yanıp söner |

Kurallar:
- 5 sn'den uzun süren her hareket `[p] Pause motion` düğmesine bağlıdır (`motion.paused`).
- `prefers-reduced-motion`: her şey son haliyle durur, hiçbir şey gizli kalmaz.
- Kaydırmayla açılıp kapanan bölüm yok, paralaks yok.
- Preloader yok.

## 6. Erişilebilirlik

- Odak halkası: 2px `--accent`, 3px boşluk; atlama bağlantısı ilk Tab'da görünür.
- Dokunma hedefi en az 44px (menü, durdurma düğmesi, butonlar).
- Kısayollar: `1–4` menü, `p` hareketi durdur; yazı alanlarında devre dışı.
- ASCII portre `role="img"` ve açıklayıcı `aria-label` taşır; API logu dekoratiftir (`aria-hidden`), kartın bağlantı etiketi anlamı verir.

## 7. Bileşenler (Faz 3'te React'e taşınacak)

| Bileşen | Kaynak |
|---|---|
| `NavGrid` (köşe işaretli 4 hücre + Status + Pause) | v4 `.grid4` |
| `PixelWordmark` | `shared.js` `pixelWord()` |
| `TerminalWindow` (bar + body) | `shared.css` `.term` |
| `TypedTerminal` | `shared.js` `typeTerminal()` |
| `ApiLog` | v4 log betiği |
| `AsciiPortrait` | v4 portre + `design/tools/ascii.py` |
| `NameMarquee` | `shared.js` `marquee()` |
| `ProjectCard` | v4 `.project` |
| `Button` (solid / ghost) | `shared.css` `.btn` |

## 8. PDF CV belgesi (D-013)

Site token'larının dışında kalan tek yüzey; ATS standardı için bilinçli olarak sade.

| Öğe | Değer |
|---|---|
| Sayfa | A4, kenar boşluğu 12 mm × 15 mm |
| Yazı tipi | Arial, Helvetica, sans-serif |
| Gövde | 10 pt, satır aralığı 1.38, `#111111` zemin `#ffffff` |
| İsim | 20 pt kalın |
| Bölüm başlığı | 10.5 pt kalın, büyük harf, altında 1 px çizgi |
| İletişim satırı | 9 pt, `#333333`, ayraç ` | ` |
