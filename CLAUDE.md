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
- PDF CV her zaman ATS kurallarına uyar (D-013, kalıcı): tek sütun, seçilebilir metin; logo, ikon, görsel, tablo yok. Görsel süsler yalnızca web CV'ye (`/cv`) girer.
- Kullanıcıyla Türkçe konuş; kod, commit mesajları ve tanımlayıcılar İngilizce.

## Yığın (Faz 3'ten itibaren)
Next.js 16 App Router (SSG, `cacheComponents`) · React 19 · TypeScript strict · Tailwind 4 · yerleşik i18n (D-011) · Vercel · npm · Node 26

**Next 16 eğitim verisinden farklı:** kod yazmadan önce `node_modules/next/dist/docs/` içindeki ilgili rehberi oku (bkz. [AGENTS.md](AGENTS.md)). Middleware'in adı artık `proxy.ts`.

Yapı: `src/app/[lang]/` sayfalar · `src/i18n/` diller ve sözlükler · `src/content/` site, CV ve proje verisi · `src/components/` bileşenler · token'lar `src/app/globals.css`

## Komutlar
```bash
npm run dev      # http://localhost:3000 (önizleme: .claude/launch.json → web)
npm run build    # statik üretim + tip kontrolü
npm run lint
npx tsc --noEmit
```
