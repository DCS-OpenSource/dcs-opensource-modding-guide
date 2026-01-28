# Basic Lua principles

This section outlines certain fundamentals needed to write DCS Lua scripts

---

## Param Handles
Param handles serve as your method of parsing information between devices, devices to indicators, or devices to the EFM.  
They act as "global variables" and can be accessed with getters and setters as detailed below.

Params can be either numbers or strings.

!!! Note
    This guide only references the lua side of parameters. Retrieving param values in the EFM can be referenced from template EFMs.

### Creating a param handle
A param object is created like this:
```lua
local dcPower = get_param_handle("DC_POWER_ON")
```
Calling `get_param_handle("DC_POWER_ON")` in another device allows you to have access to the parameter value there as well.  
The `get_param_handle()` function returns a table containing a [:get()](#getting-a-param-handle) function and a [:set()](#setting-a-param-handle) function.
---

### Getting a param handle
The Value of a param handle can be retrived by calling `param:get()` 
```lua
local dcPower = get_param_handle("DC_POWER_ON")

local value == dcPower:get()
```

---

### Setting a param handle
The Value of a param handle can be set by calling `param:get(value)` 
```lua
local dcPower = get_param_handle("DC_POWER_ON")

-- pseudo power switch on
dcPower:set(1)
dcPower:set("true")  -- String based example

-- pseudo power switch off
dcPower:set(0)
dcPower:set("false") -- String based example
```

---

### Debugging a param handle

You can access a debug window that lists all params while the game is running.  

See [show_param_handles_list()](../Stubs/DeviceStubs/#show_param_handles_listenable)

---

### Things to avoid with params

!!! Warning
    If a you set a param to a string, and the string contains only numbers (eg. `"1234"`) the parameter will revert to a number.  
    I'm not sure if this is a bug or a feature, but if you're not careful you can get situations where you can crash your game.  
    See Below:
```lua
-- Param Type reset example
local param = get_param_handle("TEST")

local testString = "1234"

print_message_to_user(tostring(type(testString))) -- "string" ("1234")
param:set(testString) -- all number string is converted back to int.
print_message_to_user(tostring(type(param:get()))) -- "int" (1234)
```

---
