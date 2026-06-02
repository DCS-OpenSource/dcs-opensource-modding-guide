# WeaponSystem Lua Plugin — Dokümantasyon

DCS Lua cihazları için hafif bir silah yönetim katmanıdır. Birden fazla pylon'u koordine eder; seçici arming, launch, rocket salvo (miktar + aralık) ve emergency jettison destekler.

**Bu dokümantasyon WIP durumundadır, plugin tamamlanmamıştır; uzun vadede düzelteceğim.**

---

## Kurulum

1. Bu dosyayı (örn. `WeaponSystem.lua`) device scripts klasörünüze yerleştirin:
   ```
   .../Cockpit/Scripts/WeaponSystemPlugin/WeaponSystem.lua
   ```
2. `Pylon.lua` dosyasının aynı `WeaponSystemPlugin` dizininde olduğundan emin olun.

---

## Hızlı Başlangıç

```lua
local dev = GetSelf()
local WeaponSystem = require("WeaponSystemPlugin.WeaponSystem") -- adjust path to your layout

local WS = WeaponSystem:new(dev)

-- Add pylons (indices are 1-based)
WS:addPylon(1, "ROCKETS", true)
WS:addPylon(2, "BOMBS",   false)

-- Configure rocket salvo behavior (optional)
WS:setRocketSalvoQuantity(4)     -- 4 rockets per button press
WS:setRocketSalvoInterval(0.10)  -- 0.10 s between each rocket

-- In your device update:
function update()
  WS:update()
end

-- Launch from a specific pylon:
WS:launch(1)

-- Or broadcast to all armed pylons:
WS:launch()

-- Fire a configured rocket salvo:
WS:fireRocketSalvo()

-- Jettison:
WS:jettisonPylon(2)
-- or
WS:emergencyJettison()
```

---

## API Referansı

### Constructor

#### `WeaponSystem:new(device) -> self`

DCS device'a bağlı bir weapon system oluşturur.

- `device` (`table`): Bu cihaz için `GetSelf()` sonucu.

Başlangıç alanları:

- `self.pylons` (`table`) - boş liste
- `self.rocketSalvoQuantity` (`number`) - varsayılan `1`
- `self.rocketSalvoInterval` (`number`) - varsayılan `0`
- `self.weaponTypes` (`table`) - `"ROCKETS" | "BOMBS" | "MISSILES" | "SHELL"` değerlerini `wsType_*` sabitlerine map eder

---

### Pylon Yönetimi

#### `WeaponSystem:addPylon(index, weaponType, armed)`

Bir pylon ekler.

- `index` (`number`, 1-based)
- `weaponType` (`"ROCKETS" | "BOMBS" | "MISSILES" | "SHELL"`)
- `armed` (`boolean`)

---

### Arming

#### `WeaponSystem:armPylon(index, armed)`

Bir pylon için armed durumunu ayarlar.

- `index` (`number`, 1-based)
- `armed` (`boolean`)

---

### Firing / Salvo

#### `WeaponSystem:launch([index])`

Tek bir pylon'dan veya tüm armed pylon'lardan launch yapar.

- `index` (`number|nil`) - verilmezse **tüm armed pylon'lar** üzerinde `:launch()` çağırır.

#### `WeaponSystem:fireRocketSalvo()`

Bir salvo başlatır (zaten devam etmiyorsa). Salvo şunları yapar:
- `rocketSalvoQuantity` kadar roket ateşler.
- Her roketi `rocketSalvoInterval` saniye arayla ateşler.
- Yalnızca şu koşulları sağlayan **armed pylon'lardan** ateşler:
  - `getStationInfo().weapon.level3 == wsType_Rocket` bildirir
  - `getStationInfo().count > 0` değerine sahiptir

#### `WeaponSystem:setRocketSalvoQuantity(quantity)`

Bir salvo içinde kaç roket ateşleneceğini ayarlar.

- `quantity` (`number`)

#### `WeaponSystem:setRocketSalvoInterval(interval)`

Salvo sırasında roketler arasındaki süreyi saniye cinsinden ayarlar.

- `interval` (`number`, seconds)

---

### Update Döngüsü

#### `WeaponSystem:update()`

Dahili salvo timer'larını ilerletir. Cihazınızın `update()` fonksiyonundan **her frame çağrılmalıdır**.

Gereksinim:
- Frame'in delta time değerini saniye cinsinden temsil eden global veya upvalue `update_rate`.

Davranış:
- Salvo aktifken zamanı biriktirir.
- `>= rocketSalvoInterval` olduğunda, tüm uygun armed rocket pylon'lardan sonraki roketi ateşler.
- `rocketsFiredThisSalvo >= rocketSalvoQuantity` olduğunda durur.

---

### Jettison

#### `WeaponSystem:jettisonPylon(index)`

Bir pylon'u jettison eder (1-based index).

#### `WeaponSystem:emergencyJettison()`

**Tüm** pylon'ları jettison eder ve `self.pylons` listesini temizler.

---

### Introspection

#### `WeaponSystem:getPylons() -> table`

Sistem tarafından yönetilen `Pylon` nesneleri array'ini döndürür.

---

## DCS Device Entegrasyon Notları

- **Device binding**: `WeaponSystem:new(GetSelf())` çağrısına her zaman `GetSelf()` device'ınızı verin.
- **Update tick**: Cihazın `update()` fonksiyonundan `WS:update()` çağrısını **her frame** yapın.
- **Time step**: `update_rate` değerinin device update period'unu yansıttığından emin olun (örn. `make_default_activity(update_rate)` ile ayarlanır).

---

## Weapon Type Sabitleri

Plugin `Database/wsTypes.lua` dosyasını yükler, ardından şunu kullanır:

```lua
self.weaponTypes = {
  ["ROCKETS"]  = wsType_Rocket,
  ["BOMBS"]    = wsType_Bomb,
  ["MISSILES"] = wsType_Missile,
  ["SHELL"]    = wsType_Shell,
}
```

`addPylon` çağırırken bu string key'leri kullanın.

---

## Dikkat Edilecekler ve TODO'lar

- **Salvo sırasında arming switch**:
  _Bilinen sorun_: Aktif bir salvo **sırasında** hangi pylon'ların armed olduğunu değiştirirseniz, yeni armed pylon'lar salvo'nun ortasında katılabilir.

---

## Örnekler

### 1) Salvo ile tipik roket kurulumu

```lua
local WS = WeaponSystem:new(GetSelf())

-- two rocket stations, both armed
WS:addPylon(1, "ROCKETS", true)
WS:addPylon(2, "ROCKETS", true)

WS:setRocketSalvoQuantity(6)     -- 6 rockets per trigger
WS:setRocketSalvoInterval(0.08)  -- 80 ms spacing

-- trigger press handler:
function on_trigger_pressed()
  WS:fireRocketSalvo()
end

function update()
  WS:update()
end
```

### 2) Karma loadout ve seçici fire

```lua
local WS = WeaponSystem:new(GetSelf())
WS:addPylon(1, "BOMBS",   false)
WS:addPylon(2, "ROCKETS", true)
WS:addPylon(3, "MISSILES", false)

-- Fire rockets only (pylon 2):
WS:launch(2)

-- Arm bombs then drop:
WS:armPylon(1, true)
WS:launch(1)
```

### 3) Emergency jettison

```lua
-- pilot pulls the panic handle:
WS:emergencyJettison()
```

---
