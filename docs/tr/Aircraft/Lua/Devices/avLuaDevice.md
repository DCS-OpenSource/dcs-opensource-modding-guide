# avLuaDevice

## Giriş

`avLuaDevice` cihazları `device_init.lua` içinde oluşturulur ve script path cihazın Lua dosyasını gösterir. Bu cihazlar uçak aviyoniklerini ve sistemlerini oluşturur. Her Lua cihazı kendi içinde bağımsız bir `lua_State`'tir; bu, global değişkenlerin veya fonksiyonların cihazlar arasında paylaşılmadığı anlamına gelir.

Lua cihazları arasında bilgi aktarmak için [param handle'lar](../BasicPrinciples.md/#param-handlelar) kullanılabilir. Ancak daha gelişmiş veri yapıları için bilgiyi [C Lua Modules](https://www.lua.org/pil/26.2.html) kullanarak aktarıp saklamanız önerilir. Bunlar C veya C++ ile yazılabilir ve cihazlarınıza ortak bir bellek alanı sağlar.

---

## post_initialize()

Uçağınıza yüklendiğinizde bir kez çağrılır; hot/cold start değişkenlerini ayarlamak için çok yararlıdır.

!!! Note
    Her türlü hot/cold start kurulumu buraya konmalıdır. Daha fazla ayrıntı için [LockOn_Options.init_conditions](../Stubs/LockOnOptions.md/#init_conditions) bölümüne bakın.

### Kullanım
```lua
function post_initalize()
    print_message_to_user("Welcome to your plane")
end
```

---

## update()

### Kullanım

`update` fonksiyonu her `update_time_step` saniyede bir çalışır.

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

### Kullanım

`CockpitEvent` fonksiyonu, oyunda rearming/refueling, wheel chocks ve benzeri belirli olayları algılamak için kullanılabilir.
Örnek kullanım aşağıdadır.

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
    Olayınızı dinlemek için `dev:listen_event(eventName)` kullanmanız gerekir.

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

`release()` fonksiyonu, reload ile sıfırlanmayan bir şeyi temizlemeniz gerekiyorsa yararlıdır.
DCS tarafından şu durumlarda çağrılır:

* Ölüm
* Reload
* Menüye dönme
* Slot değiştirme

!!! Note
    Bazı niş durumlar dışında bunun çok fazla kullanım alanı yoktur, ancak gerekirse kullanılabilir.
    Zamanın %99'unda basitçe reset/reload yapmak fazlasıyla yeterlidir.

### Kullanım
```lua
function release()
    print_message_to_user("Cleanup")
end
```

---

## Örnek Cihaz

Aşağıdaki örnek yalın bir Lua cihazıdır. Lua içinde sistem oluşturmak için ana yönteminiz bu olacaktır.

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
    Farklı cihazlar arasında doğrudan veri parse edemezsiniz; çünkü ayrı global context'lerdir.
