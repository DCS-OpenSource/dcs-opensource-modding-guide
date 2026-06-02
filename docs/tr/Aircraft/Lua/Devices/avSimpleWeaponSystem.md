# avSimpleWeaponSystem

`avSimpleWeaponSystem`, mod geliştiricinin silahlar, yeniden silahlandırma vb. ile etkileşim kurma yöntemidir.

!!! Note
    [avLuaDevice](avLuaDevice.md) içindeki `update()` veya `SetCommand()` gibi tüm standart fonksiyonlar avSimpleWeaponSystem içinde de kullanılabilir.

---

## Cihazı Yükleme

Cihaz `device_init.lua` içinde normal şekilde yapılandırılmalıdır, ancak `"avLuaDevice"` yerine `"avSimpleWeaponSystem"` kullanılır.

```lua
creators[devices.WEAPON_SYSTEM]   = {"avSimpleWeaponSystem"    ,LockOn_Options.script_path.."Systems/weapon_system.lua"}
```

!!! Warning
    Aşağıda listelenen fonksiyonlardan herhangi birini kullanmak için dosyanızın başına `local dev = GetSelf()` eklemelisiniz. Bu, avSimpleWeaponSystem içindeki silah fonksiyonlarına erişmenizi sağlar.

    Tüm fonksiyonlar Zero Indexed çalışır; yani Pylon 1 ile etkileşim `dev:get_station_info(0)` ile yapılır.

---

## Faydalı Notlar

### wsTypes

Core içinden [wsTypes.lua](../../../Database/wsTypes.md) dosyasını yüklemek, silahları tipe göre referanslamanızı sağlar.

```lua
dofile(LockOn_Options.common_script_path.."../../../Database/wsTypes.lua")
```

Bu, [get_station_info()](#get_station_info) içinde silah kategorisini belirlemek için yararlıdır.

---

## API Referansı

`avSimpleWeaponSystem` için kullanılabilir fonksiyonlar aşağıdadır.
*UNVERIFIED* işaretli fonksiyonlar test edilmemiştir; daha fazla ayrıntı eklemek için [katkıda bulunabilirsiniz](../../../contributing.md).

---

### SetDamage() {: .unverified-section }

---

### drop_chaff() {: .unverified-section }

Belirli bir dispenser'dan belirtilen sayıda chaff cartridge bırakır.
_Ayrıca bkz._: uçak tanımındaki `chaff_flare_dispenser`.

**Parametreler**
- `count` (number): Bırakılacak chaff cartridge sayısı.
- `dispenser` (number): Kullanılacak chaff dispenser indeksi.

---

### drop_flare() {: .unverified-section }

Belirli bir dispenser'dan belirtilen sayıda flare bırakır.
_Ayrıca bkz._: uçak tanımındaki `chaff_flare_dispenser`.

**Parametreler**
- `count` (number): Bırakılacak flare sayısı.
- `dispenser` (number): Kullanılacak flare dispenser indeksi.

---

### get_chaff_count()

Mevcut chaff cartridge sayısını döndürür.

---

### get_flare_count()

Mevcut flare sayısını döndürür.

---

### emergency_jettison()

Tüm store'ları veya bir pylon numarası verilirse belirli store'ları jettison eder.

**Parametreler**
- `index` (number, *optional*): Store'ların atılacağı zero-indexed pylon numarası. Verilmezse tüm store'lar atılır.

---

### emergency_jettison_rack() {: .unverified-section }

Acil durumda tüm weapon rack'i jettison eder.

---

### get_station_info()

İndekslenen pylon hakkında bilgi tablosu döndürür.
Yukarıdaki [wsTypes](#wstypes) bölümüne bakın.

**Parametreler**
- `index` (number): Zero indexed pylon numarası

**Dönüş**
```lua
-- Rocket pod example
-- resulting table
station_info = {
    wsType = {
        level1 = 4,     -- wsType_Weapon
        level2 = 7,     -- wsType_NURS
        level3 = 32,    -- wsType_Container
        level4 = 358,   -- ???
    },
    adapter = {
        level1 = 0,
        level2 = 0,
        level3 = 0,
        level4 = 0,
    },
    weapon = {
        level1 = 4,     -- wsType_Weapon
        level2 = 7,     -- wsType_NURS
        level3 = 33,    -- wsType_Rocket
        level4 = 276,   -- ???
    },
    CLSID = "{LAU68_FFAR_MK5HEAT}"
    count = 7           -- how many weapons are in the container
    container = true
}
```

**Kullanım**
```lua
local dev = GetSelf()

local pylon = dev:get_station_info(0) -- returns pylon1 info
```

---

### launch_station()

Belirtilen station'dan silahı fırlatır.

**Parametreler**
- `station` (number): Fırlatma yapılacak zero indexed station numarası.

**Kullanım**
```lua
local dev = GetSelf()

local pylon = dev:launch_station(0) -- launch pylon1
```

---

### select_station() {: .unverified-section }

Belirtilen weapon station'ı seçer; AIM-9 gibi seeker head'leri etkinleştirmek için gerekir.

**Parametreler**
- `station` (number): Seçilecek station numarası.

---

### set_ECM_status() {: .unverified-section }

ECM sisteminin durumunu ayarlar.

---

### get_ECM_status() {: .unverified-section }

Electronic Countermeasure (ECM) sisteminin mevcut durumunu döndürür.

---

### set_target_range() {: .unverified-section }

Weapon system için hedef menzilini ayarlar.

---

### set_target_span() {: .unverified-section }

Weapon system için hedef span değerini ayarlar.

---

### get_target_range() {: .unverified-section }

Weapon system içinde ayarlı mevcut hedef menzilini döndürür.

---

### get_target_span() {: .unverified-section }

Weapon system içinde ayarlı mevcut hedef span değerini döndürür.

---
