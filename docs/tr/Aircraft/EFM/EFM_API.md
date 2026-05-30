# DCS EFM API

## Giriş

EFM API Template, uçağınızın oyun içinde doğru çalışabilmesi için sağlaması gereken API'nin ana hatlarını verir.

Oyun tarafından yüklenecek bir `.dll` dosyası oluşturursunuz (bu dosya `entry.lua` içinde belirtildiğinde yüklenir). Bu dosya, DCS'in uçağınızın durumu hakkında bilgi almak için çağıracağı fonksiyonları tanımlar. DCS ayrıca uçağınızın ve atmosferin mevcut durumu hakkında önemli bilgileri size aktarmak için de fonksiyonlar çağırır.

Veri akışının kaba özeti şudur: DCS önce uçağın durumu hakkında bilgi verir, ardından `simulate` fonksiyonunuzu çağırır. Sonra motor RPM'i veya uçağa etki eden kuvvet ve momentler gibi ihtiyaç duyduğu bilgileri sizden ister. DCS bu bilgileri kullanarak uçağın ivmesini, hızını ve konumunu, ayrıca bunların açısal karşılıklarını günceller.

## API Genel Bakış

### DCS Referans Çerçeveleri

DCS API iki koordinat sistemi tanımlar: global ve lokal. İkisi de aşağıdaki gibi tanımlanan sağ elli koordinat sistemleridir:

- +x -> ileri
- +y -> yukarı
- +z -> sağ

Bu sağ elli bir koordinat sistemi olduğundan, dönüşleri uçağı uçuruyormuş gibi gövde (lokal) koordinatları üzerinden düşünmek daha kolaydır:

- +x etrafında pozitif dönüş -> sağa roll
- +y etrafında pozitif dönüş -> sola yaw
- +z etrafında pozitif dönüş -> burnu yukarı pitch

#### Lokal

Bu çerçeve gövde veya uçak gövdesi olarak da adlandırılabilir. Uçağa göre tanımlanan referans çerçevesidir; uçağın içinde onunla birlikte uçuyormuşsunuz gibi düşünün. Orijin modelin merkezinden tanımlanır; `entry.lua` içinde tanımlanan kütle merkezi de model orijininden tanımlanır.

- +x -> buruna doğru ileri
- +y -> yukarı
- +z -> sağ kanat yönünde dışarı

Dönüşler yukarıda anlatılanlarla aynıdır.

#### Global

Bu, DCS'in global veya dünya koordinat sistemidir. Fiziksel bir anlamı yoktur; DCS düz dünya üzerinde çalıştığı için motorun kullandığı temel koordinat sistemidir.

Gerçek koordinatlara en yakın benzetme, dönüş için [local tangent plane coordinates](https://en.wikipedia.org/wiki/Local_tangent_plane_coordinates) sistemidir (DCS, NUE kullanır). DCS global çerçevesi local tangent plane koordinatlarına benzer; ancak konum uçağın konumuna göre relatif değil, **mutlaktır**.

DCS içinde koordinatlar şu anlamlara gelir:

- +x -> kuzey
- +y -> yukarı
- +z -> doğu

Dönüşler yukarıda anlatılanlarla aynıdır. Dikkat edilmesi gereken tek nokta, y ekseni etrafındaki dönüşün (yaw veya heading) sola doğru pozitif olmasıdır (kuzeyden batıya). Bu, pusulanın kuzeyden başlayıp doğuya doğru artması şeklindeki normal konvansiyonun tersidir.

Heading için yaw açısı kullanılırken bu hesaba katılmalıdır.

### Fonksiyon Genel Bakışı

| Fonksiyon | Veri Yönü | Amaç | Örnek |
|----------|-----------|------|-------|
| ed_fm_add_local_force | EFM->DCS | [Lokal](#lokal) çerçevede **tek** kuvvet ekler. | Lift/drag kuvveti ekleme |
| ed_fm_add_local_force_component | EFM->DCS | [Lokal](#lokal) çerçevede **çoklu** kuvvet ekler. | Çok elemanlı yöntem için lift ve drag kuvvetleri ekleme |
| ed_fm_add_global_force | EFM->DCS | [Global](#global) çerçevede **tek** kuvvet ekler. | Sıcak hava balonundan kuvvet ekleme |
| ed_fm_add_global_force_component | EFM->DCS | [Global](#global) çerçevede **çoklu** kuvvet ekler. | Birden fazla bağlı helyum balonundan kuvvet ekleme |
| ed_fm_add_local_moment | EFM->DCS | [Lokal](#lokal) çerçevede **tek** moment ekler. | Stabilite türevi momentleri ekleme |
| ed_fm_add_local_moment_component | EFM->DCS | [Lokal](#lokal) çerçevede **çoklu** kuvvet ekler. | |
| ed_fm_add_global_moment | EFM->DCS | [Global](#global) çerçevede **tek** moment ekler. | |
| ed_fm_add_global_moment_component | EFM->DCS | [Global](#global) çerçevede **çoklu** kuvvet ekler. | |
| ed_fm_simulate | N/A | Uçuş modelinizi simüle etmek için DCS tarafından her frame çağrılan update fonksiyonu | motoru ve uçuş modelini simüle edip güncelleme |
| ed_fm_set_atmosphere | DCS->EFM | DCS, uçağın mevcut konumundaki atmosfer durumunu simülasyonunuza verir | Uçuş modeli için dahili atmosfer durumunu güncelleme |
| ed_fm_set_current_mass_state | DCS->EFM | DCS mevcut uçak kütle durumunu verir | Kütle durumunu güncelleme; örneğin moment hesapları için kütle merkezi |
| ed_fm_set_current_state | DCS->EFM | DCS, [global veya dünya koordinatlarında](#global) mevcut fizik rigidbody durumunu verir | |
| ed_fm_set_current_state_body_axis | DCS->EFM | DCS, [lokal veya gövde koordinatlarında](#lokal) mevcut fizik rigidbody durumunu verir | |
| ed_fm_on_damage | DCS->EFM | Uçağınız hasar aldığında DCS elemanı ve yeni sağlık değerini vererek çağırır | Hasar durumunu güncelleme |
| ed_fm_set_command | DCS->EFM | Bir komut işlendiğinde DCS tarafından çağrılır | Uçuş kolu ve gaz kolu pozisyonu gibi girdileri ayarlama |
| ed_fm_change_mass | EFM->DCS | DCS, kütle değişikliği isteklerini sorar | Yakıt yandıkça veya yakıt eklendikçe kütleyi güncelleme |
| ed_fm_set_internal_fuel | DCS->EFM | Yakıt ayarlandığında veya eklendiğinde DCS tarafından çağrılır | Yakıt sisteminizin yakıt seviyesini ayarlama |
| ed_fm_refueling_add_fuel | DCS->EFM | Yakıt eklendiğinde DCS tarafından çağrılır; yoksa DCS yakıt eklemek için `set_internal_fuel` fonksiyonunu tekrar tekrar çağırır | İkmal sırasında yakıt ekleme |
| ed_fm_get_internal_fuel | EFM->DCS | DCS kalan dahili yakıtı sorar | Yakıt durumunu DCS'e bildirme |
| ed_fm_get_external_fuel | EFM->DCS | DCS kalan harici yakıtı sorar | Harici yakıt durumunu DCS'e bildirme |
| ed_fm_set_draw_args | EFM->DCS | DCS, harici draw arg değişikliklerini sorar | Harici argümanları ayarlama |
| ... internal args ... | | | |
| ed_fm_configure | N/A | Simülasyon başlangıcında DCS tarafından çağrılır | Simülasyon başlamadan önce kurulum ve veri yapıları |
| ed_fm_get_param | DCS->EFM | DCS simülasyonunuzdaki belirli parametreler hakkında bilgi ister | Motor RPM'i gibi parametreleri DCS'e bildirme |
| ed_fm_set_surface | DCS->EFM | DCS uçağın altındaki yüzey hakkında bilgi verir | Yer etkisi hesaplama |
| ed_fm_cold_start | DCS->EFM | Cold start sırasında DCS tarafından çağrılır | |
| ed_fm_hot_start | DCS->EFM | Hot start sırasında DCS tarafından çağrılır | |
| ed_fm_hot_start_in_air | DCS->EFM | Havada başlangıçta DCS tarafından çağrılır | |
| ed_fm_get_shake_amplitude | EFM->DCS | DCS istenen sarsıntıyı sorar | |
| ed_fm_repair | DCS->EFM | Onarım sırasında DCS tarafından çağrılır | Tüm hasarı onarma |
| ed_fm_need_to_be_repaired | EFM->DCS | DCS onarım gerekip gerekmediğini sorar | |

## Kurulum

EFM API, `C:\Program Files\Eagle Dynamics\DCS World\API` altında veya DCS makinenizde nereye kuruluysa orada bulunabilir.

---

## ED_FM_TEMPLATE.cpp

Bu dosya uçağınızın adıyla yeniden adlandırılabilir ve genellikle adlandırılmalıdır.

---

### `ed_fm_simulate`

#### **Açıklama**
Bu fonksiyon DCS tarafından her frame çağrılır. Uçağınızın durumunu güncellemek, fizik hesapları yapmak ve sistem mantığını çalıştırmak için kullanın. Lua cihazlarındaki `update()` fonksiyonuna benzer.

#### **Parametreler**
| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `dt` | double | Son frame'den beri geçen delta time, saniye cinsinden. *(Henüz doğrulanmadı)* |

#### **Dönüş**
- Yok

---

### `ed_fm_set_command`

#### **Açıklama**
DCS bir komut algıladığında çağrılır. En iyi kullanım genellikle burada bir switch statement kullanıp kullanıcı girdisine göre aksiyon almaktır.

#### **Parametreler**
| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `command` | int | Algılanan girdiden gelen komut numarası |
| `value` | float | Komutun değeri |

---

### `ed_fm_set_current_state`

#### **Açıklama**
Bir sonraki adım için ortamınızı hazırlamak üzere simülasyondan önce çağrılır.

#### **Parametreler**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `ax` | double | Dünya koordinatlarında lineer ivme (X) |
| `ay` | double | Dünya koordinatlarında lineer ivme (Y) |
| `az` | double | Dünya koordinatlarında lineer ivme (Z) |
| `vx` | double | Dünya koordinatlarında lineer hız (X) |
| `vy` | double | Dünya koordinatlarında lineer hız (Y) |
| `vz` | double | Dünya koordinatlarında lineer hız (Z) |
| `px` | double | Dünya koordinatlarında gövde merkezi konumu (X) |
| `py` | double | Dünya koordinatlarında gövde merkezi konumu (Y) |
| `pz` | double | Dünya koordinatlarında gövde merkezi konumu (Z) |
| `omegadotx` | double | Dünya koordinatlarında açısal ivme (X) |
| `omegadoty` | double | Dünya koordinatlarında açısal ivme (Y) |
| `omegadotz` | double | Dünya koordinatlarında açısal ivme (Z) |
| `omegax` | double | Dünya koordinatlarında açısal hız (X) |
| `omegay` | double | Dünya koordinatlarında açısal hız (Y) |
| `omegaz` | double | Dünya koordinatlarında açısal hız (Z) |
| `quaternion_x` | double | Dünya koordinatlarında yönelim quaternion'ı (X) |
| `quaternion_y` | double | Dünya koordinatlarında yönelim quaternion'ı (Y) |
| `quaternion_z` | double | Dünya koordinatlarında yönelim quaternion'ı (Z) |
| `quaternion_w` | double | Dünya koordinatlarında yönelim quaternion'ı (W) |

#### **Dönüş**
- Yok

---

### `ed_fm_set_current_state_body_axis`

Uçağın mevcut durumunu gövde ekseni koordinatlarıyla ayarlar.

#### **Parametreler**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `ax` | double | Gövde koordinatlarında lineer ivme (X) |
| `ay` | double | Gövde koordinatlarında lineer ivme (Y) |
| `az` | double | Gövde koordinatlarında lineer ivme (Z) |
| `vx` | double | Gövde koordinatlarında lineer hız (X) |
| `vy` | double | Gövde koordinatlarında lineer hız (Y) |
| `vz` | double | Gövde koordinatlarında lineer hız (Z) |
| `wind_vx` | double | Gövde koordinatlarında rüzgar hızı (X) |
| `wind_vy` | double | Gövde koordinatlarında rüzgar hızı (Y) |
| `wind_vz` | double | Gövde koordinatlarında rüzgar hızı (Z) |
| `omegadotx` | double | Gövde koordinatlarında açısal ivme (X) |
| `omegadoty` | double | Gövde koordinatlarında açısal ivme (Y) |
| `omegadotz` | double | Gövde koordinatlarında açısal ivme (Z) |
| `omegax` | double | Gövde koordinatlarında açısal hız (X) |
| `omegay` | double | Gövde koordinatlarında açısal hız (Y) |
| `omegaz` | double | Gövde koordinatlarında açısal hız (Z) |
| `yaw` | double | Radyan cinsinden yaw açısı |
| `pitch` | double | Radyan cinsinden pitch açısı |
| `roll` | double | Radyan cinsinden roll açısı |
| `common_angle_of_attack` | double | Radyan cinsinden angle of attack (AoA) |
| `common_angle_of_slide` | double | Radyan cinsinden sideslip açısı (AoS) |

#### **Açıklama**
Simülasyondan önce uçağın gövde ekseni koordinatlarındaki durumunu, rüzgarı ve yönelim açılarını ayarlamak için çağrılır.

#### **Dönüş**
- Yok

---
