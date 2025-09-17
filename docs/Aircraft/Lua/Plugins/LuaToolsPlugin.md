# LuaToolsPlugin
## Overview
A Simple git submodule to add several useful classes for various tasks

### Install Guide

**Repository Link**

Can be found [here](https://github.com/DCS-OpenSource/LuaToolsPlugin){:target="blank"}

#### Git SubModule
1. Navigate to `Cockpit/Scripts/` in your terminal
2. Run `git submodule add https://github.com/DCS-OpenSource/LuaToolsPlugin.git`
3. Load any of the classes into your project using, for example: `local HelperClass = dofile("path/to/file")`

#### Static Install
1. Go to the [repo](https://github.com/DCS-OpenSource/LuaToolsPlugin){:target="blank"}
2. click the blue code button
3. download as .zip
4. Extract and insert into your mod folder inside `Cockpit/Scripts/`
5. Load any of the classes into your project using, for example: `local HelperClass = dofile("path/to/file")`

---

### Included Classes

- [KeybindtoDevice](#keybindtodevice-class)
- [Timer](#timer-class)

---

## KeyBuilder (class)

A tiny helper for declaring **DCS input rows** in a structured, repeatable way.  
You build “blocks” (button, 2-pos, 3-pos, N-pos) and the builder appends the underlying input rows into your destination table (e.g., `res.keyCommands`).

---

### API

#### `new(targetTable) -> builder`
Create a builder bound to a destination table.

- `targetTable` **table** – Required. Receives appended rows.

**Errors**: Throws if `targetTable` is not a table.

---

#### `addButton(btnCmd, baseName, categories)`
Append a classic **momentary** push button (press = `value_down=1`, release = `value_up=0`).

- `btnCmd` **number** – Device/keybind command.
- `baseName` **string** – Display name (defaults to `"Unnamed"` if nil).
- `categories` **string | string[]** – One or more category breadcrumbs.

**Rows generated**: 1

---

#### `add2Pos(swCmd, baseName, categories, toggleCmd?, labels?)`
Append a **2-position** switch block.

- `swCmd` **number** – Device/keybind command (expects values `0` / `1`).
- `baseName` **string** – Display base name (defaults to `"Unnamed"`).
- `categories` **string | string[]** – Category breadcrumb(s).
- `toggleCmd` **number | nil** – Optional **toggle** command row (no value).
- `labels` **table | nil** – 1-indexed labels **`{ [1]=first, [2]=second }`**.  
  Defaults to `{"OFF","ON"}`.

**Rows generated (in order)**:
1) Momentary “second <> first” (down→1, up→0)  
2) *(Optional)* Toggle (“TOGGLE”)  
3) Direct “second” (value_down=1)  
4) Direct “first”  (value_down=0)

---

#### `add3Pos(swCmd, baseName, categories, cycleCmd?, labels?, cycleName?)`
Append a **3-position** switch block (`-1`, `0`, `+1`).

- `swCmd` **number** – Device/keybind command.
- `baseName` **string** – Base name (defaults to `"Unnamed"`).
- `categories` **string | string[]** – Breadcrumb(s).
- `cycleCmd` **number | nil** – Optional **cycle** command row (no value).
- `labels` **table | nil** – 1-indexed labels **`{ [1]=left, [2]=center, [3]=right }`**.  
  Defaults to `{"LEFT","CENTER","RIGHT"}`.
- `cycleName` **string | nil** – Caption for the cycle row (default `"CYCLE"`).

**Rows generated (in order)**:
1) “left <> center” (down→-1, up→0)  
2) “right <> center” (down→+1, up→0)  
3) *(Optional)* Cycle  
4) Direct “left” (value_down=-1)  
5) Direct “right” (value_down=+1)  
6) Direct “center” (value_down=0)

---

#### `addMultiPos(swCmd, baseName, categories, incCmd?, decCmd?, cycleCmd?, labelsByValue)`
Append an **N-position** switch block with **arbitrary numeric positions**.

- `swCmd` **number** – Base device/keybind command for direct positions.
- `baseName` **string** – Base name (defaults to `"Unnamed"`).
- `categories` **string | string[]** – Breadcrumb(s).
- `incCmd` **number | nil** – Optional **increment** key row.
- `decCmd` **number | nil** – Optional **decrement** key row.
- `cycleCmd` **number | nil** – Optional **cycle** key row.
- `labelsByValue` **table (required)** – Map **`number → string`**.  
  Example: `{ [-1]="LOW", [0]="OFF", [1]="HIGH" }`

**Behavior**:
- Numeric keys of `labelsByValue` are **collected and sorted ascending** to produce a stable output order.
- For each value **v**, a direct row is emitted with `value_down = v` and `value_up = 0`.

**Rows generated (in order)**:
1) *(Optional)* INC  
2) *(Optional)* DEC  
3) *(Optional)* CYCLE  
4…) One **direct** row per sorted value

**Errors**:
- Throws if `labelsByValue` is not a table or has no numeric keys with string labels.

---

#### `add(rows)`
Append **arbitrary rows** verbatim.

- `rows` **table[]** – Array of rows following DCS input table conventions.

---

#### Example
Below is a complete example of the `Keyboard/default.lua` from the CT-4E showing the setup of the plugin.

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

**Description**  
A helper class that links keybind commands to device commands in the cockpit, with optional dispatch to the EFM.

---

### Methods

#### `KeybindToDevice:new()`

**Description**  
Creates a new instance of `KeybindToDevice`.

**Returns**  
`KeybindToDevice` - A new instance of the keybind helper.

---

#### `KeybindToDevice:registerKeybind(keyCommand, deviceCommand, device, toEFM)`

**Description**  
Registers a key command that, when pressed, triggers a device command.

**Parameters**  

| Name             | Type      | Description                                                              |
|------------------|-----------|--------------------------------------------------------------------------|
| `keyCommand`     | `number`  | The keybind command to listen for (from `listen_command`).               |
| `deviceCommand`  | `number`  | The device command to perform.                                           |
| `device`         | `number`  | The device ID for `GetDevice(device)`.                                   |
| `toEFM`          | `boolean` | Whether to dispatch the command to the EFM via `dispatch_action`.        |

**Returns**  
`nil`

---

#### `KeybindToDevice:sendCommand(keyCommand, value)`

**Description**  
Sends the device command tied to a keybind. If `toEFM` was set, a `dispatch_action` is also triggered.

**Parameters**  

| Name           | Type  | Description                                               |
|----------------|-------|-----------------------------------------------------------|
| `keyCommand`   | `number` | The keybind command that was triggered.                 |
| `value`        | `any`    | The value to send with the command.                    |

**Returns**  
`boolean` - `true` if a command was sent, otherwise `false`.

---

### Internal Fields

| Field       | Type    | Description                                     |
|-------------|---------|-------------------------------------------------|
| `self.device` | `userdata` | The device instance returned from `GetSelf()` |
| `self.keybinds` | `table` | Stores mappings: `[keyCommand] = {deviceCommand, device, toEFM}` |

---

## Timer (class)

**Description**  
A simple timer utility that runs for a specified duration and executes a callback when complete.  
Can be used with an update loop such as `update()` in DCS Lua.

---

### Methods

#### `Timer:new(duration, updateRate, callback)`

**Description**  
Creates a new timer instance.

**Parameters**  

| Name          | Type      | Description                                                       |
|---------------|-----------|-------------------------------------------------------------------|
| `duration`    | `number`  | Total time the timer should run for (in seconds). Defaults to 1.   |
| `updateRate`  | `number`  | Time increment per update (typically matches update rate). Defaults to 0.05. |
| `callback`    | `function \| nil` | Function to be called when the timer completes. Optional. |

**Returns**  
`Timer` - A new timer object.

---

#### `Timer:startTimer()`

**Description**  
Starts or restarts the timer from zero.

**Returns**  
`nil`

---

#### `Timer:stopTimer()`

**Description**  
Stops the timer before it completes.

**Returns**  
`nil`

---

#### `Timer:updateTimer()`

**Description**  
Advances the timer by `updateRate`. If the duration is reached, calls the callback (if any) and stops the timer.

**Returns**  
`nil`

---

#### `Timer:isDone()`

**Description**  
Checks whether the timer has completed.

**Returns**  
`boolean` - `true` if the timer is complete, otherwise `false`.

---

#### `Timer:setCallback(fn)`

**Description**  
Sets or replaces the callback function to be called when the timer completes.

**Parameters**  

| Name   | Type      | Description                   |
|--------|-----------|-------------------------------|
| `fn`   | `function`| Callback function to assign   |

**Returns**  
`nil`

---

### Internal Fields

| Field       | Type       | Description                                     |
|-------------|------------|-------------------------------------------------|
| `duration`  | `number`   | Total timer duration in seconds                 |
| `updateRate`| `number`   | Time increment per update                       |
| `callback`  | `function \| nil` | Function to call when completed         |
| `running`   | `boolean`  | Whether the timer is currently running          |
| `elapsed`   | `number`   | Time accumulated since start                    |
| `completed` | `boolean`  | Whether the timer has finished running          |

---

