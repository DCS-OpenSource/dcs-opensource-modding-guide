# LockOn_Options
The `LockOn_Options` table provides several useful parameters and values.

---

## avionics_language
String representation of avionics language

**Usage**
```lua
local lang = LockOn_Options.avionics_language
```

---

## cockpit
Table containing cockpit-related options.

**Usage**
```lua
local cockpitOptions = LockOn_Options.cockpit
```

---

## cockpit_language
String representation of the cockpit language.

**Usage**
```lua
local cockpitLang = LockOn_Options.cockpit_language
```

---

## common_ground_script_path
String path to the CA (Combined Arms) cockpit scripts.

**Usage**
```lua
local caPath = LockOn_Options.common_ground_script_path
```

---

## common_script_path
String path to the common cockpit scripts.

**Usage**
```lua
local commonPath = LockOn_Options.common_script_path
```

---

## date
Table containing the current date (day, month, year).

**Usage**
```lua
local date = LockOn_Options.date
-- date.day, date.month, date.year
```

---

## flight
Table containing flight-related options.

**Usage**
```lua
local flightOptions = LockOn_Options.flight
```

---

## init_conditions
Get the state of the spawn. Useful for configuring your aircraft depending on the initial state.

The init_conditions table contains an entry "birth_place" which allows you to differentiate spawn types. The following are the spawn string literals:

* In Air Hot: `string | "AIR_HOT"`
* On Ground Hot: `string | "GROUND_HOT"`
* Cold Start: `Unknown` (see usage)

**Usage**
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
String indicating the measurement system in use.

**Usage**
```lua
local system = LockOn_Options.measurement_system
```

---

## mission
Table containing mission-related options.

**Usage**
```lua
local mission = LockOn_Options.mission
```

---

## screen
Table containing screen parameters (aspect, height, width).

**Usage**
```lua
local screen = LockOn_Options.screen
-- screen.aspect, screen.height, screen.width
```

---

## script_path
String path to the cockpit scripts.

**Usage**
```lua
local scriptPath = LockOn_Options.script_path
```

---

## time
Table containing the current time (hours, minutes, seconds).

**Usage**
```lua
local time = LockOn_Options.time
-- time.hours, time.minutes, time.seconds
```

---
