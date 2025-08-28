# WeaponSystem Lua Plugin — Documentation

A lightweight weapon-management layer for DCS Lua devices. It coordinates multiple pylons, supports selective arming, launching, rocket salvos (quantity + interval), and emergency jettison.

**This documentation is WIP, the plugin is unfinished, I will fix it long term**

---

## Installation

1. Place this file (e.g., `WeaponSystem.lua`) in your device scripts folder:
   ```
   .../Cockpit/Scripts/WeaponSystemPlugin/WeaponSystem.lua
   ```
2. Ensure `Pylon.lua` is in the same `WeaponSystemPlugin` directory.
---

## Quick start

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

## API reference

### Constructor

#### `WeaponSystem:new(device) -> self`
Create a weapon system bound to a DCS device.

- `device` (`table`): The result of `GetSelf()` for this device.

Initial fields:

- `self.pylons` (`table`) – empty list
- `self.rocketSalvoQuantity` (`number`) – default `1`
- `self.rocketSalvoInterval` (`number`) – default `0`
- `self.weaponTypes` (`table`) – maps `"ROCKETS" | "BOMBS" | "MISSILES" | "SHELL"` to `wsType_*` constants

---

### Pylon management

#### `WeaponSystem:addPylon(index, weaponType, armed)`
Add a pylon.

- `index` (`number`, 1-based)
- `weaponType` (`"ROCKETS" | "BOMBS" | "MISSILES" | "SHELL"`)
- `armed` (`boolean`)

---

### Arming

#### `WeaponSystem:armPylon(index, armed)`
Set armed state for a pylon.

- `index` (`number`, 1-based)
- `armed` (`boolean`)

---

### Firing / Salvos

#### `WeaponSystem:launch([index])`
Launch from a single pylon or all armed pylons.

- `index` (`number|nil`) – if omitted, calls `:launch()` on **all armed pylons**.

#### `WeaponSystem:fireRocketSalvo()`
Begin a salvo (if not already in progress). The salvo will:
- Fire `rocketSalvoQuantity` rockets.
- Space each rocket by `rocketSalvoInterval` seconds.
- Fire only from **armed pylons that**:
  - Report `getStationInfo().weapon.level3 == wsType_Rocket`
  - Have `getStationInfo().count > 0`

#### `WeaponSystem:setRocketSalvoQuantity(quantity)`
Set how many rockets are fired in a salvo.

- `quantity` (`number`)

#### `WeaponSystem:setRocketSalvoInterval(interval)`
Set the time (seconds) between each rocket during a salvo.

- `interval` (`number`, seconds)

---

### Update loop

#### `WeaponSystem:update()`
Advances internal salvo timers. **Must be called every frame** from your device’s `update()`.

Requires:
- A global or upvalue `update_rate` representing the frame’s delta time in seconds.

Behavior:
- When a salvo is active, accumulates time.
- Once `>= rocketSalvoInterval`, fires the next rocket from all qualifying, armed rocket pylons.
- Stops when `rocketsFiredThisSalvo >= rocketSalvoQuantity`.

---

### Jettison

#### `WeaponSystem:jettisonPylon(index)`
Jettison one pylon (1-based index).

#### `WeaponSystem:emergencyJettison()`
Jettison **all** pylons and clear `self.pylons`.

---

### Introspection

#### `WeaponSystem:getPylons() -> table`
Returns the array of `Pylon` objects managed by the system.

---

## Integration notes for DCS devices

- **Device binding**: Always pass your `GetSelf()` device to `WeaponSystem:new(GetSelf())`.
- **Update tick**: Call `WS:update()` **every frame** from the device’s `update()` function.
- **Time step**: Ensure `update_rate` reflects the device’s update period (e.g., set via `make_default_activity(update_rate)`).
---

## Weapon type constants

The plugin loads `Database/wsTypes.lua`, then uses:
```lua
self.weaponTypes = {
  ["ROCKETS"]  = wsType_Rocket,
  ["BOMBS"]    = wsType_Bomb,
  ["MISSILES"] = wsType_Missile,
  ["SHELL"]    = wsType_Shell,
}
```
Use these string keys when calling `addPylon`.

---

## Gotchas & TODOs

- **Mid-salvo arming switch**:  
  _Known issue_: If you change which pylons are armed **during** an active salvo, newly armed pylons may join mid-burst.  
---

## Examples

### 1) Typical rocket setup with salvo

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

### 2) Mixed loadout and selective fire

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