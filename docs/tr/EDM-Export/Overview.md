# Eagle Dynamics DCS Blender Export Plugin

## Giriş

Bu dokümantasyon, eklentiyle birlikte gelen resmi dokümanlar (`manual` klasöründe) güncel olmadığı, eksik kaldığı ve kötü biçimlendirildiği için derlenmiştir.
Bununla birlikte, sağlanan **template EDM dosyaları** hâlâ oldukça yararlıdır.

!!! note
    **Eklenti hâlâ geliştirme aşamasındadır ve bazı özellikler çalışmayabilir.**

!!! warning
    Bu rehber, **materyaller** ve **animasyon** dahil olmak üzere genel Blender bilgisine sahip olduğunuzu varsayar.

---

## Desteklenen Blender Sürümleri

- Herhangi bir **Blender `4.x.x LTS`** sürümünün kullanılması önerilir.
- Blender 3.x desteği **19/12/25** tarihinde kaldırıldı.
- Blender 5.0 kısmen destekleniyor; çalışma devam ediyor (yazım zamanı 20/12/25).

---

## Kurulum

Blender eklentisini buradan indirin:
[mods.eagle.ru/blender_plugin/files.html](https://mods.eagle.ru/blender_plugin/files.html){:target="_blank"}

1. Blender'ı açın -> `Edit > Preferences`
2. `.zip` dosyasını addon olarak kurun

---

## Örnek Dosyalar

Aşağıdaki örnek dosyalar indirilebilir:

| Örnek | Blender Dosyası | Ek Dosyalar |
|-------|-----------------|-------------|
| **Cube Example** | [cube.blend](../../EDM-Export/Blender%20Examples/Blend/cube.blend) | [Cube.png](../../EDM-Export/Blender%20Examples/EDM/Textures/Cube.png){:download="Cube"} |
| **Animation Test** | [animation.blend](../../EDM-Export/Blender%20Examples/Blend/animation.blend) | - |
| **Skin Animation** | [skin.blend](../../EDM-Export/Blender%20Examples/Blend/skin.blend) | - |

---

## Katkıda Bulunma

Ek ayrıntılar veya düzeltmeler keşfederseniz bir **pull request** oluşturup bulgularınızı paylaşabilirsiniz.

---

## Plugin Changelog

Release 19.12.2025
* Blender 3 desteği kaldırıldı.

Release 17.12.2025
* Blender 5.0 içindeki fcurves hatası düzeltildi.

Release 17.12.2025
* Blender 5.0 içindeki fcurves hatası düzeltildi.

Release 16.12.2025
* Materyal güncelleme artık Blender 5.0 için çalışıyor.

Release 24.11.2025
* EDM Fast Export için yol ayarlama olanağı eklendi.
* Blender Plugin Version kontrolü eklendi. 5.0 ve sonrası ise eklenti kullanılamaz.

Release 23.10.2025
* Materyal hash kontrolü geri getirildi.
* Referans `.blend` glass material düzeltildi (default sürüm 5 iken min = 6, max = 6, instance = 6 idi).

Release 03.10.2025
* Glass ve Default material içindeki Damage Visibility socket'lerinden yıldız işareti kaldırıldı.

Release 02.09.2025
* Dev mode içine `optimizeVertexCache` checkbox'ı eklendi.
* Action adı kontrolü eklendi; integer (argument) ile başlamalıdır.

Release 31.08.2025
* NLA editor üzerinden birden fazla bone animasyonu desteği eklendi.

Release 10.11.2024:
* RGBA damage mask desteği eklendi.

Release 26.11.2024:
* İngilizce olmayan locale'e sahip makinelerde uçak registration number export'unu engelleyen hata düzeltildi.
* Blender eklentisindeki hata düzeltildi: EDM materyalleri güncellendikten sonra drop-down listelerdeki değerler varsayılana dönüyordu.
* Blender uyarısı düzeltildi: 'WARN (bpy.rna): \intern\bpy_rna.cc:1366 pyrna_enum_to_py: current value '0' matches no enum in '.

20.02.2025
* Deck material için per vertex damage eklendi.
