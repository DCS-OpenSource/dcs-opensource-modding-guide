#avSimpleWeaponSystem

avSimpleWeaponSystem serves as the modders method of interacting with weapons, rearming etc.

!!! Note
    All of the standard functions from [avLuaDevice](avLuaDevice.md) are available in avSimpleWeapon System such as update() or SetCommand()
---

## Loading the Device
The device should be configured in `device_init.lua` as normal, but with `"avSimpleWeaponSystem"` instead of `"avLuaDevice"`
```lua
creators[devices.WEAPON_SYSTEM]   = {"avSimpleWeaponSystem"    ,LockOn_Options.script_path.."Systems/weapon_system.lua"}
```

!!! Warning
    To use any of the functions listed below, you must add `local dev = GetSelf()`  to the top of your file, this allows you to access the weapon functions from avSimpleWeaponSystem

    All functions are Zero Indexed, so interacting with Pylon 1 would be done with `dev:get_station_info(0)`

---

## Useful bits

### wsTypes
Loading the [wsTypes.lua](../../../Database/wsTypes.md) file from the core allows you to reference weapons by type
```lua
dofile(LockOn_Options.common_script_path.."../../../Database/wsTypes.lua")
```
This is useful for determining weapon category in [get_station_info()](#get_station_info)

---

## API Reference

Below are the available functions for `avSimpleWeaponSystem`:  
Functions marked with *UNVERIFIED* are untested, feel free to [contribute](../../../contributing.md) more detail.

---

### SetDamage() {: .unverified-section }

---

### drop_chaff() {: .unverified-section }
Dispenses a specified number of chaff cartridges from a given dispenser.  
_See also_: `chaff_flare_dispenser` in the aircraft definition.


**Parameters**  
- `count` (number): Number of chaff cartridges to release.
- `dispenser` (number): Index of the chaff dispenser to use.

---

### drop_flare() {: .unverified-section }
Dispenses a specified number of flares from a given dispenser.  
_See also_: `chaff_flare_dispenser` in the aircraft definition.


**Parameters**  
- `count` (number): Number of flares to release.
- `dispenser` (number): Index of the flare dispenser to use.

---

### get_chaff_count()
Returns the current number of chaff cartridges available.

---

### get_flare_count()
Returns the current number of flares available.

---

### emergency_jettison()
Jettison either all stores, or specific stores if parsed a pylon number

**Parameters**  
- `index` (number, *optional*): Zero-indexed pylon number to jettison stores from. If omitted, all stores will be jettisoned.

---

### emergency_jettison_rack() {: .unverified-section }
Jettisons the entire weapon rack in an emergency.

---

### get_station_info()
Returns a table of information about the indexed pylon
See [wsTypes](#wstypes) above

**Parameters**  
- `index` (number): Zero indexed pylon number

**Returns**  
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
**Usage**  
```lua
local dev = GetSelf()

local pylon = dev:get_station_info(0) -- returns pylon1 info
```

---

### launch_station()
Launches the weapon from the specified station.

**Parameters**  
- `station` (number): Zero Indexed station number to launch from.

**Usage**  
```lua
local dev = GetSelf()

local pylon = dev:launch_station(0) -- launch pylon1
```

---

### select_station() {: .unverified-section }
Selects the specified weapon station, needed to activate seeker heads like AIM-9s etc.  

**Parameters**  
- `station` (number): The station number to select.

---

### set_ECM_status() {: .unverified-section }
Sets the status of the ECM system.

---

### get_ECM_status() {: .unverified-section }
Returns the current status of the Electronic Countermeasure (ECM) system.

---

### set_target_range() {: .unverified-section }
Sets the target range for the weapon system.

---

### set_target_span() {: .unverified-section }
Sets the target span for the weapon system.

---

### get_target_range() {: .unverified-section }
Returns the current target range set in the weapon system.

---

### get_target_span() {: .unverified-section }
Returns the current target span set in the weapon system.

---
