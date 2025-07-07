# Example Device
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


need_to_be_closed = false               -- close lua state after initialization
```

!!! Warning
    You are not able to parse data between different devices as they are seperate global contexts