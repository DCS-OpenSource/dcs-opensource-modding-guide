# LockOn_Options

`LockOn_Options` tablosu çeşitli yararlı parametreler ve değerler sağlar.

---

## avionics_language

Aviyonik dilinin string gösterimi.

**Kullanım**
```lua
local lang = LockOn_Options.avionics_language
```

---

## cockpit

Kokpitle ilgili seçenekleri içeren tablo.

**Kullanım**
```lua
local cockpitOptions = LockOn_Options.cockpit
```

---

## cockpit_language

Kokpit dilinin string gösterimi.

**Kullanım**
```lua
local cockpitLang = LockOn_Options.cockpit_language
```

---

## common_ground_script_path

CA (Combined Arms) kokpit script'lerine giden string path.

**Kullanım**
```lua
local caPath = LockOn_Options.common_ground_script_path
```

---

## common_script_path

Ortak kokpit script'lerine giden string path.

**Kullanım**
```lua
local commonPath = LockOn_Options.common_script_path
```

---

## date

Geçerli tarihi (gün, ay, yıl) içeren tablo.

**Kullanım**
```lua
local date = LockOn_Options.date
-- date.day, date.month, date.year
```

---

## flight

Uçuşla ilgili seçenekleri içeren tablo.

**Kullanım**
```lua
local flightOptions = LockOn_Options.flight.unlimited_fuel
```

**Değerler**

| Seçenek | Tip | Açıklama |
|---------|-----|----------|
| unlimited_fuel | bool | Sınırsız yakıt |
| g_effects | bool | G-effects etkin |
| radio_assist | bool | Radio assist etkin |
| unlimited_weapons | bool | Sınırsız silah |
| external_view | bool | Harici görünüm etkin |
| easy_radar | bool | Easy radar mode |
| easy_flight | bool | Easy flight mode |
| external_labels | bool | External labels etkin |
| crash_recovery | bool | Crash recovery etkin |
| immortal | bool | Ölümsüzlük etkin |
| tool_tips_enabled | bool | Tool tips etkin |
| padlock | bool | Padlock view etkin |
| aircraft_switching | bool | Uçak değiştirme etkin |

---

## init_conditions

Spawn durumunu alır. Başlangıç durumuna göre uçağınızı yapılandırmak için yararlıdır.

`init_conditions` tablosu `"birth_place"` adlı bir entry içerir; bu spawn tiplerini ayırt etmenizi sağlar. Aşağıdaki spawn string literal'ları vardır:

* In Air Hot: `string | "AIR_HOT"`
* On Ground Hot: `string | "GROUND_HOT"`
* Cold Start: `Unknown` (kullanıma bakın)

**Kullanım**
```lua
local birth = LockOn_Options.init_conditions.birth_place

if birth == "GROUND_HOT" or birth == "AIR_HOT" then
    -- hot start init
else
    -- cold start init
end
```

---

## measurement_system

Kullanılan ölçüm sistemini belirten string.

**Kullanım**
```lua
local system = LockOn_Options.measurement_system
```

---

## mission

Görevle ilgili seçenekleri içeren tablo.

Bu yararlı bir şey döndürüyor gibi görünmüyor; mission dosyasını almak için [`do_mission_file("mission")`](DeviceStubs.md/#do_mission_filefile) kullanın.

**Kullanım**
```lua
local mission = LockOn_Options.mission
```

---

## screen

Ekran parametrelerini (aspect, height, width) içeren tablo.

**Kullanım**
```lua
local screen = LockOn_Options.screen
-- screen.aspect, screen.height, screen.width
```

---

## script_path

Kokpit script'lerine giden string path.

**Kullanım**
```lua
local scriptPath = LockOn_Options.script_path
```

---

## time

Geçerli zamanı (saat, dakika, saniye) içeren tablo.

**Kullanım**
```lua
local time = LockOn_Options.time
-- time.hours, time.minutes, time.seconds
```

---
