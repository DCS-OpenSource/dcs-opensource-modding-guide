# LuaToolsPlugin

## Genel Bakış

Çeşitli işler için birkaç yararlı class ekleyen basit bir git submodule.

### Kurulum Rehberi

**Repository Linki**

[Buradan](https://github.com/DCS-OpenSource/LuaToolsPlugin){:target="blank"} bulunabilir.

#### Git SubModule
1. Terminalinizde `Cockpit/Scripts/` klasörüne gidin
2. `git submodule add https://github.com/DCS-OpenSource/LuaToolsPlugin.git` komutunu çalıştırın
3. Sınıflardan herhangi birini projenize örneğin `local HelperClass = dofile("path/to/file")` kullanarak yükleyin

#### Static Install
1. [Repo'ya](https://github.com/DCS-OpenSource/LuaToolsPlugin){:target="blank"} gidin
2. Mavi code düğmesine tıklayın
3. `.zip` olarak indirin
4. Arşivi çıkarın ve mod klasörünüzde `Cockpit/Scripts/` içine yerleştirin
5. Sınıflardan herhangi birini projenize örneğin `local HelperClass = dofile("path/to/file")` kullanarak yükleyin

---

### Dahil Sınıflar

- [KeybindtoDevice](#keybindtodevice-class)
- [Timer](#timer-class)

---

## KeyBuilder (class)

**DCS input row** tanımlamak için küçük bir helper'dır. Yapılandırılmış ve tekrarlanabilir bir yöntem sunar.
"Block"lar (button, 2-pos, 3-pos, N-pos) oluşturursunuz; builder da alttaki input row'larını hedef tablonuza ekler (örn. `res.keyCommands`).

---

### API

#### `new(targetTable) -> builder`

Bir hedef tabloya bağlı builder oluşturur.

- `targetTable` **table** - Zorunlu. Eklenen row'ları alır.

**Hatalar**: `targetTable` tablo değilse throw eder.

---

#### `addButton(btnCmd, baseName, categories)`

Klasik **momentary** push button ekler (press = `value_down=1`, release = `value_up=0`).

- `btnCmd` **number** - Device/keybind komutu.
- `baseName` **string** - Görünen ad (`nil` ise varsayılan `"Unnamed"`).
- `categories` **string | string[]** - Bir veya daha fazla kategori breadcrumb'ı.

**Üretilen row**: 1

---

#### `add2Pos(swCmd, baseName, categories, toggleCmd?, labels?)`

**2-position** switch block ekler.

- `swCmd` **number** - Device/keybind komutu (`0` / `1` değerleri bekler).
- `baseName` **string** - Görünen base name (`nil` ise varsayılan `"Unnamed"`).
- `categories` **string | string[]** - Kategori breadcrumb'ları.
- `toggleCmd` **number | nil** - İsteğe bağlı **toggle** command row (değersiz).
- `labels` **table | nil** - 1-indexed label'lar **`{ [1]=first, [2]=second }`**.
  Varsayılan `{"OFF","ON"}`.

**Üretilen row'lar (sırayla)**:
1. Momentary "second <> first" (down->1, up->0)
2. *(İsteğe bağlı)* Toggle ("TOGGLE")
3. Direct "second" (`value_down=1`)
4. Direct "first" (`value_down=0`)

---

#### `add3Pos(swCmd, baseName, categories, cycleCmd?, labels?, cycleName?)`

**3-position** switch block ekler (`-1`, `0`, `+1`).

- `swCmd` **number** - Device/keybind komutu.
- `baseName` **string** - Base name (`nil` ise varsayılan `"Unnamed"`).
- `categories` **string | string[]** - Breadcrumb'lar.
- `cycleCmd` **number | nil** - İsteğe bağlı **cycle** command row (değersiz).
- `labels` **table | nil** - 1-indexed label'lar **`{ [1]=left, [2]=center, [3]=right }`**.
  Varsayılan `{"LEFT","CENTER","RIGHT"}`.
- `cycleName` **string | nil** - Cycle row caption'ı (varsayılan `"CYCLE"`).

**Üretilen row'lar (sırayla)**:
1. "left <> center" (down->-1, up->0)
2. "right <> center" (down->+1, up->0)
3. *(İsteğe bağlı)* Cycle
4. Direct "left" (`value_down=-1`)
5. Direct "right" (`value_down=+1`)
6. Direct "center" (`value_down=0`)

---

#### `addMultiPos(swCmd, baseName, categories, incCmd?, decCmd?, cycleCmd?, labelsByValue)`

**Keyfi numerik position'lara** sahip **N-position** switch block ekler.

- `swCmd` **number** - Direct position'lar için base device/keybind komutu.
- `baseName` **string** - Base name (`nil` ise varsayılan `"Unnamed"`).
- `categories` **string | string[]** - Breadcrumb'lar.
- `incCmd` **number | nil** - İsteğe bağlı **increment** key row.
- `decCmd` **number | nil** - İsteğe bağlı **decrement** key row.
- `cycleCmd` **number | nil** - İsteğe bağlı **cycle** key row.
- `labelsByValue` **table (required)** - **`number -> string`** map'i.
  Örnek: `{ [-1]="LOW", [0]="OFF", [1]="HIGH" }`

**Davranış**:
- `labelsByValue` içindeki numerik key'ler toplanır ve kararlı çıktı sırası üretmek için artan şekilde sıralanır.
- Her **v** değeri için `value_down = v` ve `value_up = 0` olan direct row üretilir.

**Üretilen row'lar (sırayla)**:
1. *(İsteğe bağlı)* INC
2. *(İsteğe bağlı)* DEC
3. *(İsteğe bağlı)* CYCLE
4. ...) Sıralanmış her değer için bir **direct** row

**Hatalar**:
- `labelsByValue` tablo değilse veya string label'a sahip numerik key içermiyorsa throw eder.

---

#### `add(rows)`

**Keyfi row'ları** olduğu gibi ekler.

- `rows` **table[]** - DCS input table konvansiyonlarına uyan row array'i.

---

#### Örnek

Aşağıda plugin kurulumunu gösteren CT-4E `Keyboard/default.lua` dosyasından eksiksiz bir örnek vardır.

```lua
local cscripts = folder.."../../../Cockpit/Scripts/"
dofile(cscripts.."devices.lua")
dofile(cscripts.."command_defs.lua")

local res = external_profile("Config/Input/Aircrafts/common_keyboard_binding.lua")

local KeybindBlockBuilder = dofile(cscripts.."LuaToolsPlugin/KeybindBuilder.lua")
local kb = KeybindBlockBuilder:new(res.keyCommands)

-- lights
kb:add2Pos(Keys.BEACON_LIGHT_SW,    'Beacon Lights',    {'Electric System','Lights','Front Panel'}, Keys.BEACON_LIGHT_TOGGLE)
kb:add2Pos(Keys.NAV_LIGHT_SW,       'Nav Lights',       {'Electric System','Lights','Front Panel'}, Keys.NAV_LIGHT_TOGGLE)
kb:add2Pos(Keys.LNDG_LIGHT_SW,      'Landing Lights',   {'Electric System','Lights','Front Panel'}, Keys.LNDG_LIGHT_TOGGLE)
kb:add2Pos(Keys.STROBE_LIGHT_SW,    'Strobe Lights',    {'Electric System','Lights','Front Panel'}, Keys.STROBE_LIGHT_TOGGLE)

-- Unique Systems
kb:add({
  {combos = {{key = 'Space'}}, down = iCommandPlaneWingtipSmokeOnOff, value_down = 1, name = _('Smoke System - TOGGLE'),    category = _('Smoke')},
  
  {combos = {{key = '1'}},     down = iCommandViewCockpitChangeSeat,  value_down = 1, name = _('Occupy Pilot Seat'),        category = _('Multicrew')},
  {combos = {{key = '2'}},     down = iCommandViewCockpitChangeSeat,  value_down = 2, name = _('Occupy Copilot Seat'),      category = _('Multicrew')},
  {combos = {{key = 'J'}},     down = iCommandNetCrewRequestControl,                  name = _('Request Aircraft Control'), category = _('Multicrew')},
})

return res
```

---

## KeybindToDevice (class)

**Açıklama**
Keybind komutlarını kokpitteki device komutlarına bağlayan, isteğe bağlı olarak EFM'ye dispatch edebilen helper class.

---

### Metotlar

#### `KeybindToDevice:new()`

**Açıklama**
Yeni bir `KeybindToDevice` instance'ı oluşturur.

**Dönüş**
`KeybindToDevice` - Yeni keybind helper instance'ı.

---

#### `KeybindToDevice:registerKeybind(keyCommand, deviceCommand, device, toEFM)`

**Açıklama**
Basıldığında bir device command tetikleyen key command kaydeder.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `keyCommand` | `number` | Dinlenecek keybind komutu (`listen_command` üzerinden). |
| `deviceCommand` | `number` | Çalıştırılacak device command. |
| `device` | `number` | `GetDevice(device)` için device ID. |
| `toEFM` | `boolean` | Komutun `dispatch_action` ile EFM'ye dispatch edilip edilmeyeceği. |

**Dönüş**
`nil`

---

#### `KeybindToDevice:sendCommand(keyCommand, value)`

**Açıklama**
Keybind'e bağlı device command'ı gönderir. `toEFM` ayarlıysa ayrıca `dispatch_action` tetiklenir.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `keyCommand` | `number` | Tetiklenen keybind komutu. |
| `value` | `any` | Komutla gönderilecek değer. |

**Dönüş**
`boolean` - Komut gönderildiyse `true`, aksi halde `false`.

---

### Dahili Alanlar

| Alan | Tip | Açıklama |
|------|-----|----------|
| `self.device` | `userdata` | `GetSelf()` tarafından döndürülen device instance'ı |
| `self.keybinds` | `table` | Mapping'leri saklar: `[keyCommand] = {deviceCommand, device, toEFM}` |

---

## Timer (class)

**Açıklama**
Belirtilen süre boyunca çalışan ve tamamlandığında callback çalıştıran basit timer utility.
DCS Lua içinde `update()` gibi bir update loop ile kullanılabilir.

---

### Metotlar

#### `Timer:new(duration, updateRate, callback)`

**Açıklama**
Yeni bir timer instance'ı oluşturur.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `duration` | `number` | Timer'ın çalışacağı toplam süre (saniye). Varsayılan 1. |
| `updateRate` | `number` | Update başına zaman artışı (genelde update rate ile eşleşir). Varsayılan 0.05. |
| `callback` | `function \| nil` | Timer tamamlandığında çağrılacak fonksiyon. İsteğe bağlı. |

**Dönüş**
`Timer` - Yeni timer nesnesi.

---

#### `Timer:startTimer()`

**Açıklama**
Timer'ı sıfırdan başlatır veya yeniden başlatır.

**Dönüş**
`nil`

---

#### `Timer:stopTimer()`

**Açıklama**
Timer tamamlanmadan önce durdurur.

**Dönüş**
`nil`

---

#### `Timer:updateTimer()`

**Açıklama**
Timer'ı `updateRate` kadar ilerletir. Süreye ulaşıldığında callback varsa çağırır ve timer'ı durdurur.

**Dönüş**
`nil`

---

#### `Timer:isDone()`

**Açıklama**
Timer'ın tamamlanıp tamamlanmadığını kontrol eder.

**Dönüş**
`boolean` - Timer tamamlandıysa `true`, aksi halde `false`.

---

#### `Timer:setCallback(fn)`

**Açıklama**
Timer tamamlandığında çağrılacak callback fonksiyonunu ayarlar veya değiştirir.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `fn` | `function` | Atanacak callback fonksiyonu |

**Dönüş**
`nil`

---

### Dahili Alanlar

| Alan | Tip | Açıklama |
|------|-----|----------|
| `duration` | `number` | Saniye cinsinden toplam timer süresi |
| `updateRate` | `number` | Update başına zaman artışı |
| `callback` | `function \| nil` | Tamamlanınca çağrılacak fonksiyon |
| `running` | `boolean` | Timer'ın şu anda çalışıp çalışmadığı |
| `elapsed` | `number` | Başlangıçtan beri biriken zaman |
| `completed` | `boolean` | Timer'ın çalışmasını tamamlayıp tamamlamadığı |

---
