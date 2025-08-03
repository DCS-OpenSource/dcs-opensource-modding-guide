# Device Stubs

---

## Param Handles
Param handles serve as your method of parsing information between devices, devices to indicators, or devices to the EFM.  
They act as "global variables" and can be accessed with getters and setters as detailed below.

Params can be either numbers or strings.

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

See [show_param_handles_list()](#show_param_handles_listenable)

---

## Stubs

### dispatch_action(device_id, command, value)

**Description**  
Triggers a command on a device. Similar to `avDevice:performClickableAction()` but does not move the switch.  
If controlling a non-owned device, `device_id` must be specified.

**Parameters** 

| Name         | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| `device_id`  | `number\|nil`| Target device ID or `nil`            |
| `command`    | `number`     | Command number                       |
| `value`      | `number`     | Value to apply                       |

**Returns**  
`nil`

---

### do_mission_file(file)

**Description**  
Loads the mission file as a table to a variable `mission` when parsed the string `"mission"`

**Parameters**  

| Name    | Type     | Description       |
|---------|----------|-------------------|
| `file`  | `string` | "mission"         |

**Returns**  
`nil`

**Usage**
```lua
do_mission_file("mission")
print_message_to_user(mission.theatre) -- prints map name
```
---

### find_viewport(name)

**Description**  
Finds and returns the viewport object by name. ***[UNVERIFIED]***

**Parameters**  

| Name    | Type     | Description       |
|---------|----------|-------------------|
| `name`  | `string` | Name of viewport  |

**Returns**  
`table` - Viewport data

---

### geo_to_lo_coords(lat, lon)

**Description**  
Converts latitude and longitude to local DCS coordinates.

**Parameters** 

| Name   | Type     | Description         |
|--------|----------|---------------------|
| `lat`  | `number` | Latitude in degrees |
| `lon`  | `number` | Longitude in degrees|

**Returns**  
`vec3` - Local coordinates

---

### get_absolute_model_time()

**Description**  
Returns the time of day in seconds, including fractional seconds.

**Returns**  
`number` - Time in seconds

---

### get_aircraft_draw_argument_value(arg)

**Description**  
Returns the current value of an aircraft draw argument.

**Parameters** 

| Name   | Type     | Description        |
|--------|----------|--------------------|
| `arg`  | `number` | Argument index     |

**Returns**  
`number` - Argument value

---

### get_aircraft_mission_data(key)

**Description**  
Returns mission-specific data for the current aircraft. 

!!! Note
    Only seems to work when parsed `"Radio"`

**Parameters**  

| Name   | Type     | Description         |
|--------|----------|---------------------|
| `key`  | `string` | Data key, e.g. "Radio" |

**Returns**  
`table` - Mission data

---

### get_aircraft_property(name)

**Description**  
Returns a property value from the aircraft. ***[UNVERIFIED]***

**Parameters**  

| Name   | Type     | Description        |
|--------|----------|--------------------|
| `name` | `string` | Property name      |

**Returns**  
`any`

---

### get_aircraft_property_or_nil(name)

**Description**  
Returns an aircraft property or `nil` if it does not exist. ***[UNVERIFIED]***

**Parameters**  

| Name   | Type     | Description        |
|--------|----------|--------------------|
| `name` | `string` | Property name      |

**Returns**  
`any`

---

### get_aircraft_type()

**Description**  
Returns the type of the current aircraft.

**Returns**  
`string`

---

### get_base_data()

**Description**  
Returns the base sensor data of the aircraft.

**Returns**  
`BaseData`

---

### get_clickable_element_reference(point_name)

**Description**  
Returns a reference table to a clickable element.

**Parameters**  

| Name          | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `point_name`  | `string` | Name of the clickable element point  |

**Returns**  
`table` - Functions: `set_hint`, `update`, `hide`

---

### get_cockpit_draw_argument_value(arg)

**Description**  
Returns the cockpit draw argument value.

**Parameters**  

| Name  | Type     | Description      |
|-------|----------|------------------|
| `arg` | `number` | Argument index   |

**Returns**  
`number`

---

### get_dcs_plugin_path(name)

**Description**  
Returns the full path to a DCS plugin.

**Parameters**

| Name   | Type     | Description     |
|--------|----------|-----------------|
| `name` | `string` | Plugin name     |

**Returns**  
`string` - File path

---

### get_input_devices()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### get_mission_route()

**Description**  
Returns the flight plan programmed in the mission editor for aircraft.

**Returns**  
`table` - Route as a table of waypoints

---

### get_model_time()

**Description**  
Returns the time in seconds since the mission started.

**Returns**  
`number` - Time in seconds

---

### get_multimonitor_preset_name()

**Description**  
Returns the name of the active multi-monitor preset. ***[UNVERIFIED]***

**Returns**  
`string` - Preset name

---

### get_non_sim_random_evenly()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### get_option_value(option, env)

**Description**  
Returns the value of a specific DCS option. ***[UNVERIFIED]***

**Parameters**  

| Name     | Type     | Description               |
|----------|----------|---------------------------|
| `option` | `string` | Option name (e.g. `difficulty.hideStick`) |
| `env`    | `string` | Environment (e.g. `local`) |

**Returns**  
`any`

---

### get_param_handle(param)

**Description**  
Returns a parameter handle, useful for setting or reading shared state between systems like animations, indicators, and EFM Lua bindings.

**Parameters**  

| Name     | Type     | Description           |
|----------|----------|-----------------------|
| `param`  | `string` | Name of the parameter |

**Returns**  
`ParamHandle`

---

### get_player_crew_index()

**Description**  
Method to get the seat the player is sitting in.

**Returns**  
`int` - index of the players seat

---

### get_plugin_option()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### get_plugin_option_value(plugin, option, env)

**Description**  
Returns the value of a plugin-specific option. ***[UNVERIFIED]***

**Parameters**  

| Name      | Type     | Description         |
|-----------|----------|---------------------|
| `plugin`  | `string` | Plugin name         |
| `option`  | `string` | Option name         |
| `env`     | `string` | Environment (e.g. `local`) |

**Returns**  
`any`

---

### get_random_evenly()

**Description**  
??? ***[UNVERIFIED]***
 
**Returns**  
`???`

---

### get_random_orderly()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### get_terrain_related_data(file)

**Description**  
Returns terrain-related data such as beacons, charts, or airfields.

**Parameters**  

| Name   | Type     | Description                                     |
|--------|----------|-------------------------------------------------|
| `file` | `string` | Name of the terrain data file (e.g. `beacons`, `Airdromes`) |

**Returns**  
`table` - Terrain data including `display_name`, `radio`, etc.

---

### get_UIMainView()

**Description**  
Returns parameters describing the main UI view. ***[UNVERIFIED]***

**Returns**  
`number, number, number, number, number` - `start_x`, `start_y`, `main_w`, `main_h`, `gui_scale`

---

### get_Viewports()

**Description**  
Returns all available viewports. ***[UNVERIFIED]***

**Returns**  
`table` - Viewport definitions

---

### list_cockpit_params()

**Description**  
Returns a table of all cockpit parameters currently available. ***[UNVERIFIED]***

**Returns**  
`table` - Cockpit parameter handles

---

### list_indication(indicator_id)

**Description**  
Returns the current indication string of a specified cockpit element. ***[UNVERIFIED]***

**Parameters**  

| Name             | Type     | Description            |
|------------------|----------|------------------------|
| `indicator_id`   | `number` | ID of the indicator    |

**Returns**  
`string` - Indication text

---

### lo_to_geo_coords(pos)

**Description**  
Converts a local position vector to geographic latitude and longitude.

**Parameters**  

| Name  | Type   | Description     |
|-------|--------|-----------------|
| `pos` | `vec3` | Local coordinates |

**Returns**  
`number, number` - Latitude, Longitude

---

### load_mission_file(file) 

**Description**  
Loads a Lua mission file and returns it as an executable function chunk. ***[UNVERIFIED]***

**Parameters**  

| Name   | Type     | Description     |
|--------|----------|-----------------|
| `file` | `string` | File path       |

**Returns**  
`function` - Compiled chunk

---

### MakeFont(font_data, rgba)

TODO add example, including vfs mount

**Description**  
Creates a DX-compatible font object for rendering.

**Parameters**  

| Name         | Type   | Description                                   |
|--------------|--------|-----------------------------------------------|
| `font_data`  | `table`| Font descriptor (e.g. `font_dejavu_lgc_sans_22`) |
| `rgba`       | `table`| RGBA color (e.g. `{0, 255, 0, 255}`)          |

**Returns**  
`table` - Font object

---

### MakeMaterial(texture_path, rgba)

**Description**  
Creates a material using a specified texture and color.

**Parameters**  

| Name            | Type     | Description                        |
|-----------------|----------|------------------------------------|
| `texture_path`  | `string` | Path to the texture (e.g. `.dds`)  |
| `rgba`          | `table`  | RGBA color                         |

**Returns**  
`table` - Material object

---

### mount_vfs_model_path(path)

**Description**  
Mounts a model directory path to the virtual file system.

**Parameters**  

| Name   | Type     | Description        |
|--------|----------|--------------------|
| `path` | `string` | Path to mount      |

**Returns**  
`nil`

---

### mount_vfs_path_to_mount_point(mount_point, path)

**Description**  
Mounts a path into a specified mount point in the VFS. ***[UNVERIFIED]***

**Parameters**  

| Name           | Type     | Description                      |
|----------------|----------|----------------------------------|
| `mount_point`  | `string` | Target VFS mount point path      |
| `path`         | `string` | Real file system path            |

**Returns**  
`nil`

---

### mount_vfs_texture_archives(path)

**Description**  
Mounts a texture archive folder into the VFS.

**Parameters**  

| Name   | Type     | Description                 |
|--------|----------|-----------------------------|
| `path` | `string` | Path to archive directory   |

**Returns**  
`nil`

---

### mount_vfs_texture_path(path)

**Description**  
Mounts a texture path into the VFS.

**Parameters**  

| Name   | Type     | Description             |
|--------|----------|-------------------------|
| `path` | `string` | Path to texture folder  |

**Returns**  
`nil`

---

### print_message_to_user(text)

**Description**  
Displays a message to the player on screen.

**Parameters**  

| Name   | Type     | Description       |
|--------|----------|-------------------|
| `text` | `string` | Text to display   |

**Returns**  
`nil`

---

### save_to_mission(file, content)

**Description**  
Writes string content to a mission file path. ***[UNVERIFIED]***

**Parameters**  

| Name      | Type     | Description           |
|-----------|----------|-----------------------|
| `file`    | `string` | Mission file path     |
| `content` | `string` | Content to write      |

**Returns**  
`nil`

---

### set_aircraft_draw_argument_value(argument, value)

**Description**  
Sets the value of an aircraft draw argument for animations (External Model).

**Parameters**  

| Name       | Type     | Description         |
|------------|----------|---------------------|
| `argument` | `number` | Argument index      |
| `value`    | `number` | Value to set        |

**Returns**  
`nil`

---

### set_crew_member_seat_adjustment()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### show_param_handles_list(enable)

**Description**  
Enables or disables display of param handles list.

**Parameters**  

| Name     | Type      | Description               |
|----------|-----------|---------------------------|
| `enable` | `boolean` | `true` to show, `false` to hide |

**Returns**  
`nil`

---

### switch_labels_off()

**Description**  ***[UNVERIFIED]***
???

**Returns**  
`???`

---

### track_is_reading()

**Description**  
Checks if a replay track is currently being played. ***[UNVERIFIED]***

**Returns**  
`boolean`

---

### track_is_writing()

**Description**  
Checks if a replay track is currently being recorded. ***[UNVERIFIED]***

**Returns**  
`boolean`

---

### UTF8_strlen()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

### UTF8_substring()

**Description**  
??? ***[UNVERIFIED]***

**Returns**  
`???`

---

## BaseData

**Description**  
Device base data structure returned by `get_base_data()`. This object provides access to various aircraft state parameters.  
All returned values are in Metric standard units.

!!! Note
    The list of functions are complete, although I don't have documentation for all of them, they should be pretty easy to figure out though

---

### Methods

| Method                                    | Returns   | Description                                         |
|-------------------------------------------|-----------|-----------------------------------------------------|
| `getAngleOfAttack()`                      | `number`  | Gets the current angle of attack.                   |
| `getAngleOfSlide()`                       | `number`  | Gets the current angle of slide.                    |
| `getBarometricAltitude()`                 | `number`  | Gets the barometric altitude (meters).              |
| `getCanopyPos()`                          | `unknown` | ???                                                 |
| `getCanopyState()`                        | `unknown` | ???                                                 |
| `getEngineLeftFuelConsumption()`          | `unknown` | ???                                                 |
| `getEngineLeftRPM()`                      | `number`  | Left engine RPM in percent.                         |
| `getEngineLeftTemperatureBeforeTurbine()` | `number`  | Left engine temperature before turbine.             |
| `getEngineRightFuelConsumption()`         | `unknown` | ???                                                 |
| `getEngineRightRPM()`                     | `number`  | Right engine RPM in percent.                        |
| `getEngineRightTemperatureBeforeTurbine()`| `number`  | Right engine temperature before turbine.            |
| `getFlapsPos()`                           | `unknown` | ???                                                 |
| `getFlapsRetracted()`                     | `unknown` | ???                                                 |
| `getHeading()`                            | `number`  | Heading in radians                                  |
| `getHelicopterCollective()`               | `unknown` | ???                                                 |
| `getHelicopterCorrection()`               | `unknown` | ???                                                 |
| `getHorizontalAcceleration()`             | `unknown` | ???                                                 |
| `getIndicatedAirSpeed()`                  | `number`  | Indicated airspeed (m/s).                           |
| `getLandingGearHandlePos()`               | `unknown` | ???                                                 |
| `getLateralAcceleration()`                | `unknown` | ???                                                 |
| `getLeftMainLandingGearDown()`            | `unknown` | ???                                                 |
| `getLeftMainLandingGearUp()`              | `unknown` | ???                                                 |
| `getMachNumber()`                         | `number`  | Current Mach number.                                |
| `getMagneticHeading()`                    | `number`  | Magnetic heading in radians                         |
| `getNoseLandingGearDown()`                | `unknown` | ???                                                 |
| `getNoseLandingGearUp()`                  | `unknown` | ???                                                 |
| `getPitch()`                              | `number`  | Pitch in radians.                                   |
| `getRadarAltitude()`                      | `number`  | Radar altitude (meters).                            |
| `getRateOfPitch()`                        | `unknown` | ???                                                 |
| `getRateOfRoll()`                         | `unknown` | ???                                                 |
| `getRateOfYaw()`                          | `unknown` | ???                                                 |
| `getRightMainLandingGearDown()`           | `unknown` | ???                                                 |
| `getRightMainLandingGearUp()`             | `unknown` | ???                                                 |
| `getRoll()`                               | `number`  | Roll in radians.                                    |
| `getRudderPosition()`                     | `unknown` | ???                                                 |
| `getSelfAirspeed()`                       | `unknown` | ???                                                 |
| `getSelfCoordinates()`                    | `unknown` | Returns {x, y, z}                                   |
| `getSelfVelocity()`                       | `unknown` | ???                                                 |
| `getSpeedBrakePos()`                      | `unknown` | ???                                                 |
| `getStickPitchPosition()`                 | `unknown` | ???                                                 |
| `getStickRollPosition()`                  | `unknown` | ???                                                 |
| `getThrottleLeftPosition()`               | `unknown` | ???                                                 |
| `getThrottleRightPosition()`              | `unknown` | ???                                                 |
| `getTotalFuelWeight()`                    | `unknown` | ???                                                 |
| `getTrueAirSpeed()`                       | `unknown` | ???                                                 |
| `getVerticalAcceleration()`               | `unknown` | ???                                                 |
| `getVerticalVelocity()`                   | `unknown` | ???                                                 |
| `getWOW_LeftMainLandingGear()`            | `unknown` | ???                                                 |
| `getWOW_NoseLandingGear()`                | `unknown` | ???                                                 |
| `getWOW_RightMainLandingGear()`           | `unknown` | ???                                                 |

---

### Notes

- `unknown` means the return type is not clearly documented or may require further inspection.
