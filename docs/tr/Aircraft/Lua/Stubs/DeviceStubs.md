# Device Stub'ları

---

## Stub'lar

### dispatch_action(device_id, command, value)

**Açıklama**
Bir cihaz üzerinde komut tetikler. `avDevice:performClickableAction()` fonksiyonuna benzer, ancak switch'i hareket ettirmez.
Sahibi olmadığınız bir cihazı kontrol ediyorsanız `device_id` belirtilmelidir.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `device_id` | `number\|nil` | Hedef device ID veya `nil` |
| `command` | `number` | Komut numarası |
| `value` | `number` | Uygulanacak değer |

**Dönüş**
`nil`

---

### do_mission_file(file)

**Açıklama**
`"mission"` string'i verildiğinde mission dosyasını `mission` değişkenine tablo olarak yükler.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `file` | `string` | `"mission"` |

**Dönüş**
`nil`

**Kullanım**
```lua
do_mission_file("mission")
print_message_to_user(mission.theatre) -- prints map name
```

---

### find_viewport(name) {: .unverified-section }

**Açıklama**
Viewport nesnesini adına göre bulur ve döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `name` | `string` | Viewport adı |

**Dönüş**
`table` - Viewport verisi

---

### geo_to_lo_coords(lat, lon)

**Açıklama**
Enlem ve boylamı lokal DCS koordinatlarına dönüştürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `lat` | `number` | Derece cinsinden enlem |
| `lon` | `number` | Derece cinsinden boylam |

**Dönüş**
`vec3` - Lokal koordinatlar

---

### get_absolute_model_time()

**Açıklama**
Kesirli saniyeler dahil günün saniye cinsinden zamanını döndürür.

**Dönüş**
`number` - Saniye cinsinden zaman

---

### get_aircraft_draw_argument_value(arg)

**Açıklama**
Bir aircraft draw argument'ın mevcut değerini döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `arg` | `number` | Argument indeksi |

**Dönüş**
`number` - Argument değeri

---

### get_aircraft_mission_data(key)

**Açıklama**
Mevcut uçak için göreve özel verileri döndürür.

!!! Note
    Yalnızca `"Radio"` verildiğinde çalışıyor gibi görünüyor.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `key` | `string` | Veri anahtarı, ör. `"Radio"` |

**Dönüş**
`table` - Mission verisi

---

### get_aircraft_property(name) {: .unverified-section }

**Açıklama**
Uçaktan bir property değeri döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `name` | `string` | Property adı |

**Dönüş**
`any`

---

### get_aircraft_property_or_nil(name) {: .unverified-section }

**Açıklama**
Aircraft property değerini döndürür; yoksa `nil` döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `name` | `string` | Property adı |

**Dönüş**
`any`

---

### get_aircraft_type()

**Açıklama**
Mevcut uçağın tipini döndürür.

**Dönüş**
`string`

---

### get_base_data()

**Açıklama**
Uçağın temel sensör verilerini döndürür.

!!! Warning
    TODO base data'yı yararlı bir yere ekle.

**Dönüş**
`BaseData`

---

### get_clickable_element_reference(point_name)

**Açıklama**
Clickable element için referans tablo döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `point_name` | `string` | Clickable element point adı |

**Dönüş**
`table` - Fonksiyonlar: `set_hint`, `update`, `hide`

---

### get_cockpit_draw_argument_value(arg)

**Açıklama**
Cockpit draw argument değerini döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `arg` | `number` | Argument indeksi |

**Dönüş**
`number`

---

### get_dcs_plugin_path(name)

**Açıklama**
Bir DCS plugin'inin tam yolunu döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `name` | `string` | Plugin adı |

**Dönüş**
`string` - Dosya yolu

---

### get_input_devices() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### get_mission_route()

**Açıklama**
Mission editor içinde uçak için programlanan flight plan'i döndürür.

**Dönüş**
`table` - Waypoint tablosu olarak rota

---

### get_model_time()

**Açıklama**
Görev başladığından beri geçen zamanı saniye cinsinden döndürür.

**Dönüş**
`number` - Saniye cinsinden zaman

---

### get_multimonitor_preset_name() {: .unverified-section }

**Açıklama**
Aktif multi-monitor preset adını döndürür.

**Dönüş**
`string` - Preset adı

---

### get_non_sim_random_evenly() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### get_option_value(option, env) {: .unverified-section }

**Açıklama**
Belirli bir DCS option değerini döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `option` | `string` | Option adı (örn. `difficulty.hideStick`) |
| `env` | `string` | Ortam (örn. `local`) |

**Dönüş**
`any`

---

### get_param_handle(param)

**Açıklama**
Parametre handle'ı döndürür. Animasyonlar, göstergeler ve EFM Lua binding'leri gibi sistemler arasında paylaşılan durumu ayarlamak veya okumak için yararlıdır.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `param` | `string` | Parametre adı |

**Dönüş**
`ParamHandle`

---

### get_player_crew_index()

**Açıklama**
Oyuncunun oturduğu koltuğu almak için yöntem.

**Dönüş**
`int` - Oyuncu koltuğunun indeksi

---

### get_plugin_option() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### get_plugin_option_value(plugin, option, env) {: .unverified-section }

**Açıklama**
Plugin'e özel option değerini döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `plugin` | `string` | Plugin adı |
| `option` | `string` | Option adı |
| `env` | `string` | Ortam (örn. `local`) |

**Dönüş**
`any`

---

### get_random_evenly() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### get_random_orderly() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### get_terrain_related_data(file)

**Açıklama**
Beacon'lar, chart'lar veya airfield'lar gibi terrain ile ilgili verileri döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `file` | `string` | Terrain veri dosyasının adı (örn. `beacons`, `Airdromes`) |

**Dönüş**
`table` - `display_name`, `radio` vb. içeren terrain verisi

---

### get_UIMainView() {: .unverified-section }

**Açıklama**
Ana UI view'u tanımlayan parametreleri döndürür.

**Dönüş**
`number, number, number, number, number` - `start_x`, `start_y`, `main_w`, `main_h`, `gui_scale`

---

### get_Viewports() {: .unverified-section }

**Açıklama**
Mevcut tüm viewport'ları döndürür.

**Dönüş**
`table` - Viewport tanımları

---

### list_cockpit_params() {: .unverified-section }

**Açıklama**
Mevcut tüm kokpit parametrelerinin tablosunu döndürür.

**Dönüş**
`table` - Cockpit parametre handle'ları

---

### list_indication(indicator_id) {: .unverified-section }

**Açıklama**
Belirtilen kokpit elemanının mevcut indication string'ini döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `indicator_id` | `number` | Indicator ID'si |

**Dönüş**
`string` - Indication metni

---

### lo_to_geo_coords(pos)

**Açıklama**
Lokal position vector'ünü coğrafi enlem ve boylama dönüştürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `pos` | `vec3` | Lokal koordinatlar |

**Dönüş**
`number, number` - Enlem, Boylam

---

### load_mission_file(file) {: .unverified-section }

**Açıklama**
Bir Lua mission dosyasını yükler ve çalıştırılabilir function chunk olarak döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `file` | `string` | Dosya yolu |

**Dönüş**
`function` - Derlenmiş chunk

---

### MakeFont(font_data, rgba)

TODO vfs mount dahil örnek ekle.

**Açıklama**
Render için DX-compatible font nesnesi oluşturur.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `font_data` | `table` | Font tanımlayıcısı (örn. `font_dejavu_lgc_sans_22`) |
| `rgba` | `table` | RGBA renk (örn. `{0, 255, 0, 255}`) |

**Dönüş**
`table` - Font nesnesi

---

### MakeMaterial(texture_path, rgba)

**Açıklama**
Belirtilen texture ve renk ile materyal oluşturur.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `texture_path` | `string` | Texture yolu (örn. `.dds`) |
| `rgba` | `table` | RGBA renk |

**Dönüş**
`table` - Materyal nesnesi

---

### mount_vfs_model_path(path)

**Açıklama**
Bir model klasörü yolunu virtual file system'e mount eder.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `path` | `string` | Mount edilecek yol |

**Dönüş**
`nil`

---

### mount_vfs_path_to_mount_point(mount_point, path) {: .unverified-section }

**Açıklama**
Bir yolu VFS içinde belirtilen mount point'e mount eder.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `mount_point` | `string` | Hedef VFS mount point yolu |
| `path` | `string` | Gerçek dosya sistemi yolu |

**Dönüş**
`nil`

---

### mount_vfs_texture_archives(path)

**Açıklama**
Bir texture archive klasörünü VFS içine mount eder.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `path` | `string` | Archive klasörü yolu |

**Dönüş**
`nil`

---

### mount_vfs_texture_path(path)

**Açıklama**
Bir texture yolunu VFS içine mount eder.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `path` | `string` | Texture klasörü yolu |

**Dönüş**
`nil`

---

### print_message_to_user(text)

**Açıklama**
Oyuncuya ekranda mesaj gösterir.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `text` | `string` | Gösterilecek metin |

**Dönüş**
`nil`

---

### save_to_mission(file, content) {: .unverified-section }

**Açıklama**
String içeriği bir mission dosya yoluna yazar.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `file` | `string` | Mission dosya yolu |
| `content` | `string` | Yazılacak içerik |

**Dönüş**
`nil`

---

### set_aircraft_draw_argument_value(argument, value)

**Açıklama**
Animasyonlar için bir aircraft draw argument değerini ayarlar (External Model).

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `argument` | `number` | Argument indeksi |
| `value` | `number` | Ayarlanacak değer |

**Dönüş**
`nil`

---

### set_crew_member_seat_adjustment() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### show_param_handles_list(enable)

**Açıklama**
Param handle listesinin gösterimini açar veya kapatır.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `enable` | `boolean` | Göstermek için `true`, gizlemek için `false` |

**Dönüş**
`nil`

---

### switch_labels_off() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### track_is_reading() {: .unverified-section }

**Açıklama**
Bir replay track'in şu anda oynatılıp oynatılmadığını kontrol eder.

**Dönüş**
`boolean`

---

### track_is_writing() {: .unverified-section }

**Açıklama**
Bir replay track'in şu anda kaydedilip kaydedilmediğini kontrol eder.

**Dönüş**
`boolean`

---

### UTF8_strlen() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

### UTF8_substring() {: .unverified-section }

**Açıklama**
???

**Dönüş**
`???`

---

## BaseData

**Açıklama**
`get_base_data()` tarafından döndürülen device base data yapısıdır. Bu nesne çeşitli uçak durum parametrelerine erişim sağlar.
Dönen tüm değerler metrik standart birimlerdedir.

!!! Note
    Fonksiyon listesi tamamdır; ancak hepsinin dokümantasyonu yok. Yine de ne yaptıkları çoğunlukla kolayca anlaşılabilir.

---

### Metotlar

| Metot | Dönüş | Açıklama |
|-------|-------|----------|
| `getAngleOfAttack()` | `number` | Mevcut angle of attack değerini alır. |
| `getAngleOfSlide()` | `number` | Mevcut angle of slide değerini alır. |
| `getBarometricAltitude()` | `number` | Barometrik irtifa (metre). |
| `getCanopyPos()` | `unknown` | ??? |
| `getCanopyState()` | `unknown` | ??? |
| `getEngineLeftFuelConsumption()` | `unknown` | ??? |
| `getEngineLeftRPM()` | `number` | Sol motor RPM yüzdesi. |
| `getEngineLeftTemperatureBeforeTurbine()` | `number` | Sol motor türbin öncesi sıcaklık. |
| `getEngineRightFuelConsumption()` | `unknown` | ??? |
| `getEngineRightRPM()` | `number` | Sağ motor RPM yüzdesi. |
| `getEngineRightTemperatureBeforeTurbine()` | `number` | Sağ motor türbin öncesi sıcaklık. |
| `getFlapsPos()` | `unknown` | ??? |
| `getFlapsRetracted()` | `unknown` | ??? |
| `getHeading()` | `number` | Radyan cinsinden heading. |
| `getHelicopterCollective()` | `unknown` | ??? |
| `getHelicopterCorrection()` | `unknown` | ??? |
| `getHorizontalAcceleration()` | `unknown` | ??? |
| `getIndicatedAirSpeed()` | `number` | Indicated airspeed (m/s). |
| `getLandingGearHandlePos()` | `unknown` | ??? |
| `getLateralAcceleration()` | `unknown` | ??? |
| `getLeftMainLandingGearDown()` | `unknown` | ??? |
| `getLeftMainLandingGearUp()` | `unknown` | ??? |
| `getMachNumber()` | `number` | Mevcut Mach number. |
| `getMagneticHeading()` | `number` | Radyan cinsinden magnetic heading. |
| `getNoseLandingGearDown()` | `unknown` | ??? |
| `getNoseLandingGearUp()` | `unknown` | ??? |
| `getPitch()` | `number` | Radyan cinsinden pitch. |
| `getRadarAltitude()` | `number` | Radar altitude (metre). |
| `getRateOfPitch()` | `unknown` | ??? |
| `getRateOfRoll()` | `unknown` | ??? |
| `getRateOfYaw()` | `unknown` | ??? |
| `getRightMainLandingGearDown()` | `unknown` | ??? |
| `getRightMainLandingGearUp()` | `unknown` | ??? |
| `getRoll()` | `number` | Radyan cinsinden roll. |
| `getRudderPosition()` | `unknown` | ??? |
| `getSelfAirspeed()` | `unknown` | ??? |
| `getSelfCoordinates()` | `unknown` | `{x, y, z}` döndürür. |
| `getSelfVelocity()` | `unknown` | ??? |
| `getSpeedBrakePos()` | `unknown` | ??? |
| `getStickPitchPosition()` | `unknown` | ??? |
| `getStickRollPosition()` | `unknown` | ??? |
| `getThrottleLeftPosition()` | `unknown` | ??? |
| `getThrottleRightPosition()` | `unknown` | ??? |
| `getTotalFuelWeight()` | `unknown` | ??? |
| `getTrueAirSpeed()` | `unknown` | ??? |
| `getVerticalAcceleration()` | `unknown` | ??? |
| `getVerticalVelocity()` | `unknown` | ??? |
| `getWOW_LeftMainLandingGear()` | `unknown` | ??? |
| `getWOW_NoseLandingGear()` | `unknown` | ??? |
| `getWOW_RightMainLandingGear()` | `unknown` | ??? |

---

### Notlar

- `unknown`, dönüş tipinin açıkça dokümante edilmediği veya daha fazla inceleme gerektirebileceği anlamına gelir.
