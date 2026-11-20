# Site Metni (Taslak)

Sitede görünecek metnin tek kaynağı. Ham veri [CONTENT.md](CONTENT.md)'de; burası onun cilalanmış hali. Varsayılan dil EN, karşılığı TR (D-004).

İşaretler: ✅ onaylandı · 🟡 taslak, onay bekliyor · 🅰 🅱 🅲 seçenekler

---

## 1. Ses tonu
- **Sakin, net, kısa.** Abartı, "passionate", "rockstar", "ninja" yok.
- **Göster, anlatma:** sıfat yerine komut, çıktı ve rakam.
- **Birinci tekil şahıs**, aktif cümle. "Geliştirildi" değil, "geliştirdim".
- **Terminal dili** yalnızca biçimde (komut ve çıktı satırları); cümleler insan gibi.
- "Just coding." imza cümlesi; sitede tek bir yerde, hero'da kullanılır, tekrarlanmaz.
- Öğrenci olmak saklanmaz ama başlık da yapılmaz: önce iş, sonra unvan.

## 2. Hero ✅ 🅲 Hibrit seçildi (2026-11-20)

🅰 **Terminal**
```
$ whoami
mustafa şeker — backend-leaning full-stack developer
computer engineering @ pamukkale university · denizli, tr · remote

$ echo $MOTTO
just coding.
```

🅱 **Editoryal**
> **Just coding.**
> I build backends in Go and the interfaces that sit on top of them, then ship both. Computer engineering student in Denizli, Türkiye.

> **Sadece kod.**
> Go ile backend, üstüne oturan arayüzü React ile yazıyor ve ikisini de canlıya alıyorum. Denizli'de Bilgisayar Mühendisliği öğrencisiyim.

🅲 **Hibrit ✅ SEÇİLDİ:** dev isim şeridi + kısa cümle (Dennis), altında 🅰'daki terminal bloğu (opencode). Kaydırınca terminal "yazılır".
> Mustafa Şeker — Mustafa Şeker — …  *(kayan şerit)*
> Backend-leaning full-stack developer. **Just coding.**

## 3. Kısa biyografi ✅
**EN:** I'm a third-year Computer Engineering student at Pamukkale University. I started with C and Java; today I write APIs in Go, build the frontend in React and TypeScript, and deploy what I build. Most of my time goes to the backend: data models, authorization, and the rules that keep a product honest. Outside of code: Formula 1, cars, and whatever shipped this week.

**TR:** Pamukkale Üniversitesi'nde Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. C ve Java ile başladım; bugün Go ile API yazıyor, arayüzü React ve TypeScript ile kuruyor ve yaptığımı canlıya alıyorum. Zamanımın çoğu backend'de geçiyor: veri modelleri, yetkilendirme ve bir ürünü dürüst tutan kurallar. Kod dışında: Formula 1, arabalar ve o hafta çıkan yeni teknolojiler.

## 4. Beni farklı kılan ✅
1. **Uçtan uca bitiririm.** Şartnameden veritabanına, API'den arayüze, Docker'dan Azure'a.
2. **Kuralı sunucuda kurarım.** Gizlilik ve yetki arayüzde saklanmaz, her uçta kontrol edilir ve testle korunur.
3. **Kararlarımı yazarım.** Her projede şartname, yol haritası ve geliştirme günlüğü tutarım (CovertGift'te 900 satırı aşan bir DEVLOG).

## 5. Deneyim
**PauSiber** · Board Member · 2024 → present 🟡
> EN: Take part in organizing and running the community's events.
> TR: Topluluğun etkinliklerinin yürütülmesinde ve düzenlenmesinde görev alıyorum.

## 6. Vaka çalışmaları (ham metin)

### 01 · CovertGift 🟡
**Tek satır:** Group gift planner that keeps the surprise safe: the recipient can't see a thing, enforced by the server.

**Rol:** Solo, tasarımdan dağıtıma. **Süre:** 2026-10-03 → devam ediyor. **Canlı:** covertgift.msheker.dev

**Problem.** Ortak hediye WhatsApp gruplarında planlanıyor. Linkler kayboluyor, bütçe belirsiz kalıyor, ve en kötüsü sürpriz kolayca bozuluyor.

**Yaklaşım: dört karar**
1. **Anti-Spoiler sunucuda.** Hedef kişi gruba ve fikirlere ait her uçta `403` alıyor; davet linki dahil. Kurallar gerçek router ve PostgreSQL ile çalışan entegrasyon testleriyle korunuyor. → *İmza anı: canlı terminal logu.*
2. **Link önizleme, inatçı linklere karşı.** Trendyol'un kısa linki ürün yerine bir Adjust takip sayfasında duruyordu. Yönlendirme parametresini çözüp gerçek sayfaya ikinci bir istek attım; fiyat için JSON-LD yedeği ekledim. Sunucu kullanıcının verdiği URL'ye gittiği için SSRF koruması kurdum: alan adı izin listesi, özel IP engeli, boyut ve yönlendirme sınırı.
3. **Canlı ama sızdırmayan güncellemeler.** SSE olayı veri taşımaz, sadece "değişti" der; istemci veriyi zaten korunan uçlardan yeniden çeker. Böylece canlılık, yetki kurallarını delmiyor.
4. **Maliyet bilinci.** Azure Container Apps; kullanılmadığında ortamı kapatıp açtım, soğuk başlangıç için "sunucu uyanıyor" ekranı ekledim.

**Sonuç (gerçek rakamlar):** canlıda · 123 commit · 40 Go test dosyası · TR/EN · açık ve koyu tema · mobil.
**Yığın:** Go 1.27 · Gin · GORM · PostgreSQL 17 · React 19 · TypeScript · TanStack Query · Tailwind 4 · SSE · Gemini · Docker · nginx · Azure Container Apps
**Görseller:** CovertGift reposundaki `docs/screenshots/` (5 adet)

### 02 · AlterF1 (devam ediyor) 🟡
**Tek satır:** What if 2024 had been scored like 1991? Re-runs real F1 seasons under five historical points systems.

**Durum:** Geliştirmeye yeniden başlanacak; sitede "in progress" rozetiyle.
**Ne yapıyor:** Gerçek yarış sonuçlarına 1950'den bugüne 5 farklı puanlama sistemini uyguluyor ve alternatif şampiyonaları REST API ile JSON olarak veriyor. Tüm sezon sonuçları tek sorguda çekiliyor.
**Yığın:** Java · REST
**Siteye fikir:** Küçük bir etkileşimli tablo. Ziyaretçi puanlama yılını seçer, sıralama yeniden dizilir. F1 ilgini ve veri tarafını aynı anda gösterir.


## 7. İletişim CTA 🟡
> EN: `$ mail mustafa652seker@gmail.com` — Have something to build? Write to me.
> TR: Birlikte bir şey mi yapalım? Yaz bana.
