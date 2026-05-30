# avSimpleRadar

`avSimpleRadar`, Range While Scan (RWS) ve Single Target Track (STT) içeren temel bir radar sistemi sağlar. Track While Scan (TWS) bu cihazla kullanılamaz.

RWS, birden fazla kontağı görebildiğiniz ancak hiçbirini takip etmediğiniz moddur. İstenen hedef kilitlendiğinde radar STT'ye geçer. STT modunda diğer tüm kontak verilerini kaybedersiniz; radar kilitli hedefi daha hızlı günceller ve silah sistemlerine veri sağlar.

!!! Note
    [avLuaDevice](avLuaDevice.md) içindeki `update()` veya `SetCommand()` gibi tüm standart fonksiyonlar avSimpleRadar içinde de kullanılabilir.

---

## Cihazı Yükleme

Cihaz `device_init.lua` içinde normal şekilde yapılandırılmalıdır, ancak `"avLuaDevice"` yerine `"avSimpleRadar"` kullanılır.

```lua

creators[devices.RADAR_SYSTEM]   = {"avSimpleRadar"    ,LockOn_Options.script_path.."Systems/radar_system.lua"}

```

!!! Warning
    Aşağıda listelenen fonksiyonlardan herhangi birini kullanmak için dosyanızın başına `local dev = GetSelf()` eklemelisiniz. Bu, avSimpleRadar içindeki dahili fonksiyonlara erişmenizi sağlar.

!!! Warning
    avSimpleRadar, bir avSimpleElectricSystem cihazının da kullanılmasını ve ilgili AC generator'ların ve DC battery'nin bu cihaz içinde güç almasını gerektirir. Bu, DCS'in dahili bir gereksinimidir.

---

## Radar Performans Başlatma

Bu bölüm bir fonksiyonun içine konmaz; init sırasında çağrılır ve radarın performansını tanımlar.

``` lua
perfomance = 
{
  roll_compensation_limits = {math.rad(-180.0), math.rad(180.0)}, -- limits for RADAR_BANK_STABILIZATION
  pitch_compensation_limits = {math.rad(-60.0), math.rad(60.0)}, -- limits for RADAR_PITCH_STABILIZATION (when pitch is outside these values the scan zone will stop staying level with horizon)
  tracking_azimuth   = {-math.rad(60),math.rad(60)}, -- once locked, max azimuth to track
  tracking_elevation = {-math.rad(10),math.rad(10)}, -- once locked, max elevation to track
  scan_volume_azimuth = math.rad(120), --is left+right so 120 deg is +-60 deg left/right
  scan_volume_elevation = math.rad(5), --limits search angle of radar +-5 up/down
  scan_beam = math.rad(5), -- height of scan beam, max should be scan_volume_elevation (if less then it will do passes at different elevations)
  max_available_distance = 200000,-- max distance (in Meters) for object with large (>100m^2) radar cross section, for smaller RCS such as Su-27 the actual detection distance will be much less

  scan_speed = math.rad(2*60), -- unknown (doesn't affect debug scan beam)
  dead_zone = 1.0, -- unknown. doesn't seem to be distance between targets or distance from radar to target

  ground_clutter =
  {-- spot RCS = A + B * random + C * random 
    sea       = {0, 0, 0},
    land       = {0, 0, 0},
    artificial    = {0, 0, 0},
    rays_density   = 0.01,
    max_distance   = 1*NM_to_meter,
  }
}
```

---

## API Referansı

`avSimpleRadar` için kullanılabilir fonksiyonlar aşağıdadır:

---

### set_power(value)

Radarı açmak için kullanılır. Açık için `value` değerini TRUE, kapalı için FALSE yapın.

```lua
dev:set_power(true)
```

Bunu uçağın radar güç anahtarıyla kullanmanız önerilir; bu, yayın yapmayı durdurma ve düşman RWR tarafından tespit edilmekten kaçınma olanağı sağlar.

---

## Önemli Notlar

avSimpleRadar, TDC ile hedef kilitlemek için şu iCommands değerlerini kullanır:

```lua
iCommandPlane_LockOn_start = 509
iCommandPlane_LockOn_finish = 510
```

Bunları input keybind'lerinde doğrudan kullanabilir veya cihaz içinde şöyle çağırabilirsiniz (komutu cihazda tanımlamayı unutmayın):

```lua
iCommandPlane_LockOn_start = 509

dispatch_action(nil, iCommandPlane_LockOn_start)
```

---

## Parametreler

Radarı kontrol etmek için aşağıdaki param handle'lar okunur ve yazılır.

| Okunan Parametreler | Yazılan Parametreler | Bilinmeyen Parametreler |
|---|---|---|
| [RADAR_MODE](#radar_mode) | [IFF_INTERROGATOR_STATUS](#iff_interrogator_status) | RADAR_BIT |
| [RADAR_STT_AZIMUTH](#radar_stt_azimuth) | [RADAR_PITCH_STABILIZATION](#radar_pitch_stabilization) | ACQUSITION_ZONE_VOLUME_AZIMUTH |
| [RADAR_STT_ELEVATION](#radar_stt_elevation) | [RADAR_ROLL_STABILIZATION](#radar_roll_stabilization) | SCAN_VOLUME_CUT_OFF_DISTANCE_MIN |
| [RADAR_STT_RANGE](#radar_stt_range) | [RADAR_PITCH_BANK_STABILIZATION](#radar_pitch_bank_stabilization) | CLOSEST_RANGE_RESPONSE |
| [RADAR_STT_FRIENDLY](#radar_stt_friendly) | [SCAN_ZONE_ORIGIN_AZIMUTH](#scan_zone_origin_azimuth) | |
| [RADAR_CONTACT_XX_ELEVATION](#radar_contact_xx_) | [SCAN_ZONE_ORIGIN_ELEVATION](#scan_zone_origin_elevation) | |
| [RADAR_CONTACT_XX_AZIMUTH](#radar_contact_xx_) | [SCAN_ZONE_VOLUME_AZIMUTH](#scan_zone_volume_azimuth) | |
| [RADAR_CONTACT_XX_RANGE](#radar_contact_xx_) | [SCAN_ZONE_VOLUME_ELEVATION](#scan_zone_volume_elevation) | |
| [RADAR_CONTACT_XX_TIME](#radar_contact_xx_) | [RADAR_TDC_AZIMUTH](#radar_tdc_azimuth) | |
| [RADAR_CONTACT_XX_FRIENDLY](#radar_contact_xx_) | [RADAR_TDC_RANGE](#radar_tdc_range) | |
| [RADAR_CONTACT_XX_RCS](#radar_contact_xx_) | [RADAR_TDC_RANGE_CARRET_SIZE](#radar_tdc_range_carret_size) | |
| [RADAR_CONTACT_XX_VX](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_VY](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_VZ](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_NOISE](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_RCS_COEFF](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_NCTR](#radar_contact_xx_) | | |

**Şu formatta kullanın:**

``` mode = get_param_handle("RADAR_MODE")```

Parametrelerle etkileşim hakkında daha fazla bilgi için [Param Handle'lar](../BasicPrinciples.md/#param-handlelar) bölümüne bakın.

---

### “RADAR_MODE”

Radarın mevcut modunu veren okuma parametresi.

1: Arama

2: Kilit denemesi

3: STT kilidi

---

### "RADAR_CONTACT_XX_..."

Okuma parametreleridir; yalnızca radar mode 1 içinde kullanılabilir (temelde RWS).
`XX` benzersiz kontak numarasıdır; ancak tek bir uçak birden fazla kontak üretebilir, çünkü kontak bir radar dönüşünün tek örneğidir.

`...ELEVATION`, `...AZIMUTH`, `...RANGE` kontak konumunu verir.

`...TIME`, radar dönüşünün bulunmasından bu yana geçen saniyeyi verir.

`...FRIENDLY`, IFF açıksa ve kontak dostsa 1 döndürür.

`...VX`, `...VY`, `...VZ` kontak hızını verir.

`...RCS_COEFF` kontağın RCS değerini verir.

`...NCTR` (Non-Cooperative Target Recognition) uçak tipini sağlar (örn. Su-27).

`...NOISE` bilinmiyor.

---

### "RADAR_STT_AZIMUTH"

Kilitli hedefin azimuth (yatay açı) değerini **roll ile normalize edilmiş** şekilde veren okuma parametresi. Bu, HUD içinde kullanımı çok kolaylaştırır. Yalnızca STT modunda kullanılabilir.

---

### "RADAR_STT_ELEVATION"

Kilitli hedefin elevation (radyan cinsinden dikey açı) değerini **roll ile normalize edilmiş** şekilde veren okuma parametresi. Bu, HUD içinde kullanımı çok kolaylaştırır. Yalnızca STT modunda kullanılabilir.

---

### "RADAR_STT_RANGE"

Kilitli hedefin menzilini metre cinsinden veren okuma parametresi. Yalnızca STT modunda kullanılabilir.

---

### "RADAR_STT_FRIENDLY"

Kilitli hedefin IFF durumunu veren okuma parametresi. Yalnızca STT modunda kullanılabilir.

-1: IFF kapalı

0: hedef düşman veya bilinmiyor

1: hedef dost

---

### "IFF_INTERROGATOR_STATUS"

IFF'i kontrol eden yazma parametresi. IFF'i açmak için 1 yapın.

---

### "RADAR_PITCH_STABILIZATION"

Yazma parametresi; 1 yapıldığında pitch stabilization açılır. Açıkken uçak pitch yaptığında radarı ufka doğru tutar (`pitch_compensation_limits` değerleri içinde).

---

### "RADAR_ROLL_STABILIZATION"

Yazma parametresi; 1 yapıldığında roll stabilization açılır. Açıkken uçak roll yaptığında radarı ufka doğru tutar (`roll_compensation_limits` değerleri içinde).

---

### "RADAR_PITCH_BANK_STABILIZATION"

Yazma parametresi; 1 yapıldığında birleşik stabilizasyon açılır.

---

### "SCAN_ZONE_ORIGIN_ELEVATION"

Radar anteninin elevation origin değerini kontrol eden yazma parametresi.

---

### "SCAN_ZONE_ORIGIN_AZIMUTH"

Radar anteninin azimuth origin değerini kontrol eden yazma parametresi.

---

### "SCAN_ZONE_VOLUME_AZIMUTH"

Toplam scan genişliğini kontrol eden yazma parametresi (scan genişlikleri değiştirilebilir; ör. 120 derece, 80 derece, 60 derece).

---

### "SCAN_ZONE_VOLUME_ELEVATION"

Toplam scan elevation değerini kontrol eden yazma parametresi. Bunu `scan_beam` değerinden yüksek ayarlamak, istenen scan alanını tamamlamak için scan beam'in birden fazla sweep yapmasını gerektirir.

---

### "RADAR_TDC_AZIMUTH"

TDC konumunu azimuth üzerinde kontrol eden yazma parametresi.

---

### "RADAR_TDC_RANGE"

TDC menzilini kontrol eden yazma parametresi.

---

### "RADAR_TDC_RANGE_CARRET_SIZE"
