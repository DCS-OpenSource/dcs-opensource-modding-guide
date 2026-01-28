# Device Stubs

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

### find_viewport(name) {: .unverified-section }

**Description**  
Finds and returns the viewport object by name.

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

### get_aircraft_property(name) {: .unverified-section }

**Description**  
Returns a property value from the aircraft.

**Parameters**  

| Name   | Type     | Description        |
|--------|----------|--------------------|
| `name` | `string` | Property name      |

**Returns**  
`any`

---

### get_aircraft_property_or_nil(name) {: .unverified-section }

**Description**  
Returns an aircraft property or `nil` if it does not exist.

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

!!! Warning
    TODO add base data somewhere useful

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

### get_input_devices() {: .unverified-section }

**Description**  
???

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

### get_multimonitor_preset_name() {: .unverified-section }

**Description**  
Returns the name of the active multi-monitor preset.

**Returns**  
`string` - Preset name

---

### get_non_sim_random_evenly() {: .unverified-section }

**Description**  
???

**Returns**  
`???`

---

### get_option_value(option, env) {: .unverified-section }

**Description**  
Returns the value of a specific DCS option.

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

### get_plugin_option() {: .unverified-section }

**Description**  
???

**Returns**  
`???`

---

### get_plugin_option_value(plugin, option, env) {: .unverified-section }

**Description**  
Returns the value of a plugin-specific option.

**Parameters**  

| Name      | Type     | Description         |
|-----------|----------|---------------------|
| `plugin`  | `string` | Plugin name         |
| `option`  | `string` | Option name         |
| `env`     | `string` | Environment (e.g. `local`) |

**Returns**  
`any`

---

### get_random_evenly() {: .unverified-section }

**Description**  
???
 
**Returns**  
`???`

---

### get_random_orderly() {: .unverified-section }

**Description**  
???

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

### get_UIMainView() {: .unverified-section }

**Description**  
Returns parameters describing the main UI view.

**Returns**  
`number, number, number, number, number` - `start_x`, `start_y`, `main_w`, `main_h`, `gui_scale`

---

### get_Viewports() {: .unverified-section }

**Description**  
Returns all available viewports.

**Returns**  
`table` - Viewport definitions

---

### list_cockpit_params() {: .unverified-section }

**Description**  
Returns a table of all cockpit parameters currently available.

**Returns**  
`table` - Cockpit parameter handles

---

### list_indication(indicator_id) {: .unverified-section }

**Description**  
Returns the current indication string of a specified cockpit element.

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

### load_mission_file(file) {: .unverified-section }

**Description**  
Loads a Lua mission file and returns it as an executable function chunk.

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

### mount_vfs_path_to_mount_point(mount_point, path) {: .unverified-section }

**Description**  
Mounts a path into a specified mount point in the VFS.

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

### save_to_mission(file, content) {: .unverified-section }

**Description**  
Writes string content to a mission file path.

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

### set_crew_member_seat_adjustment() {: .unverified-section }

**Description**  
??? 

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

### switch_labels_off() {: .unverified-section }

**Description**
???

**Returns**  
`???`

---

### track_is_reading() {: .unverified-section }

**Description**  
Checks if a replay track is currently being played.

**Returns**  
`boolean`

---

### track_is_writing() {: .unverified-section }

**Description**  
Checks if a replay track is currently being recorded.

**Returns**  
`boolean`

---

### UTF8_strlen() {: .unverified-section }

**Description**  
???

**Returns**  
`???`

---

### UTF8_substring() {: .unverified-section }

**Description**  
???

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
