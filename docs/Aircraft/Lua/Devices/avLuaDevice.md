# avLuaDevice

## Introduction

avLuaDevices are created in the device_init.lua, with the script path pointing to the lua file for the device. These devices make up the aircraft avionics and systems. Each lua device is a self contained lua_State, this means that any global variables or functions are not shared between them.

To pass information between lua devices [param handles](../Stubs/DeviceStubs.md#param-handles) can be used. However it is recommended for more advanced data-structures instead you pass and store information using [C Lua Modules](https://www.lua.org/pil/26.2.html), which can be written in C or C++ giving your devices a shared memory space through which to pass or store information.

---

## post_initialize()

Called once when you load into your plane, very useful for setting hot/cold start variables.
!!! Note
    Any hot/cold start setup should be put in here. See [LockOn_Options.init_conditions](../../LockOnOptions#init_conditions) for more details.

### Usage
```lua
function post_initalize()
    print_message_to_user("Welcome to your plane")
end
```

---
## update()

### Usage
The update function runs once every `update_time_step` seconds.

```lua
local update_time_step = 0.05
make_default_activity(update_time_step) -- sets the device to run every 0.05 seconds

local timer = 0

function update()
    print_message_to_user("Timer: " .. timer .. " seconds")
    timer = timer + update_time_step
end
```
---

## SetCommand()

TODO

---

## CockpitEvent()

### Usage
The CockpitEvent function can be used to detect certain events happening in game, such as rearming and refueling, wheel chocks and more.  
Example usage can be seen below

```lua
local dev = GetSelf()
dev:listen_event("WheelChocksOn")

function CockpitEvent(event, val)
    if event == "WheelChocksOn" then
        print_message_to_user("Wheel Chocks Equipped")
    end
end
```

!!! Warning
    You must use `dev:listen_event(eventName)` to listen for your event 

### Event List
```lua
-- Sourced from a mixture of modding hub and the A-29B

-- Rearm/Refuel events
dev:listen_event("WeaponRearmComplete")
dev:listen_event("WeaponRearmFirstStep")
dev:listen_event("WeaponRearmSingleStepComplete")
dev:listen_event("ReloadDone")
dev:listen_event("RefuelDone")
dev:listen_event("repair")
dev:listen_event("refuel")
dev:listen_event("refuelcomplete")
dev:listen_event("refueldone")
dev:listen_event("UnlimitedWeaponStationRestore")
dev:listen_event("initChaffFlarePayload")

-- Ground Power
dev:listen_event("GroundPowerOn")
dev:listen_event("GroundPowerOff")

-- Ground Air
dev:listen_event("GroundAirOff")
dev:listen_event("GroundAirOn")
dev:listen_event("GroundAirFailure")
dev:listen_event("GroundAirApplyOn")
dev:listen_event("GroundAirApplyOff")
dev:listen_event("GroundAirApplyFailure")

-- Wheel Chocks
dev:listen_event("WheelChocksOn")
dev:listen_event("WheelChocksOff")

-- Misc Ground Crew
dev:listen_event("CanopyOpen")
dev:listen_event("CanopyClose")
dev:listen_event("setup_HMS")
dev:listen_event("setup_NVG")

-- Works the same as release() function as shown in the example device
dev:listen_event("cockpit_release")

-- Unknown
dev:listen_event("DisableTurboGear")
dev:listen_event("EnableTurboGear")
dev:listen_event("switch_datalink")
dev:listen_event("LinkNOPtoNet")
dev:listen_event("UnlinkNOPfromNet")
dev:listen_event("EGI_TurnOff")
dev:listen_event("EGI_TurnOn")
dev:listen_event("RestoreEGIoperation")
dev:listen_event("TISLmodeChange")
dev:listen_event("OnNewNetPlane")
```

---

## release()

The release() function is useful if you need to clean something up that isnt reset by reloading.  
It is called by DCS when you:

* Die
* Reload
* Return to Menu
* Change slots

!!! Note
    There isn't really a use for this other than some niche cases, but its available if needed.  
    99% of the time simply reseting/reloading will be more than enough

### Usage
```lua
function release()
    print_message_to_user("Cleanup")
end
```

---

## Example Device
The below example is a bare bones lua device. This will serve as your primary method of creating systems in lua

```lua
local update_time_step = 0.05
make_default_activity(update_time_step) -- sets the device to run every 0.05 seconds

local dev = GetSelf()                   -- Get the current device object


function post_initialize()              -- Called once by DCS when you load into the cockpit
    print_message_to_user("Hello from basic device")
end

function release()                      -- Called once by DCS when you die, unload or close the mission
    
end

function update()                       -- Called by DCS one every update_time_step seconds
    
end


function SetCommand(command, value)     -- Listens for commands from Keybinds or clickables

end


function CockpitEvent(event,val)        -- function called by DCS when event happens

end



need_to_be_closed = false               -- close lua state after initialization
```

!!! Warning
    You are not able to parse data between different devices as they are seperate global contexts