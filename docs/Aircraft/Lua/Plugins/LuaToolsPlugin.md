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

