# msheker.dev

Kişisel portfolyo + CV sitesi. Hedef: şık, modern, hızlı ve "şablon" görünmeyen bir site.

## Önce oku
- [docs/PLAN.md](docs/PLAN.md): amaç, site haritası, içerik modeli, yığın, tasarım ilkeleri
- [docs/ROADMAP.md](docs/ROADMAP.md): fazlar ve şu anki durum; işe başlamadan **aktif fazı** kontrol et
- [docs/SKILLS.md](docs/SKILLS.md): hangi fazda hangi skill
- [docs/DECISIONS.md](docs/DECISIONS.md): alınmış ve açık kararlar
- [docs/CONTENT.md](docs/CONTENT.md): kullanıcının verdiği ham içerik (tek doğru kaynak)
- [docs/COPY.md](docs/COPY.md): sitede görünecek onaylı metin (EN + TR), hero ve vaka çalışmaları
- [docs/INSPIRATION.md](docs/INSPIRATION.md): seçilen referans siteler; görsel yön DECISIONS D-009
- [docs/DESIGN.md](docs/DESIGN.md): token'lar (renk, tip, boşluk, hareket); sitede burada olmayan değer kullanılmaz
- `design/hero/v4.html`: onaylı hero prototipi (önizleme: `.claude/launch.json` → `design-hero`)

## Çalışma kuralları
- Görsel ve UI işinden önce `design-taste-frontend` skill'ini yükle; görsel çatışmada o kazanır.
- Animasyon işinde `animate` ve `emil-design-eng`, sonrasında `review-animations`.
- Her faz sonunda ROADMAP.md'deki kutuları güncelle; yeni kararı DECISIONS.md'ye yaz.
- İçerik (metin, tarih, rakam) uydurma: CONTENT.md'de yoksa kullanıcıya sor, yer tutucuyu açıkça `TODO:` ile işaretle.
- `prefers-reduced-motion`, klavye erişimi ve kontrast pazarlık konusu değil.
- Kullanıcıyla Türkçe konuş; kod, commit mesajları ve tanımlayıcılar İngilizce.

## Yığın (Faz 3'ten itibaren)
Next.js 16 App Router (SSG) · React 19 · TypeScript strict · Tailwind 4 · Motion · MDX · next-intl · Vercel · npm · Node 26

## Komutlar
Faz 3'te iskelet kurulunca eklenecek (`npm run dev`, `build`, `lint`).
