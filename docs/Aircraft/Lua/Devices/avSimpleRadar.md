# avSimpleRadar

avSimpleRadar provides a basic radar system that includes Range While Scan (RWS) and Single Target Track (STT). Track While Scan (TWS) is not available with this device.

RWS means that you can see multiple contacts, but not tracking any. Once a desired target is locked, the radar changes to STT. In STT you will lose all other contact data and the radar will update the locked target at a faster rate and provides data for weapon systems.

!!! Note
    All of the standard functions from [avLuaDevice](avLuaDevice.md) are available in avSimpleRadar such as update() or SetCommand()

---



## Loading the Device

The device should be configured in `device_init.lua` as normal, but with `"avSimpleRadar"` instead of `"avLuaDevice"`

```lua

creators[devices.RADAR_SYSTEM]   = {"avSimpleRadar"    ,LockOn_Options.script_path.."Systems/radar_system.lua"}

```



!!! Warning
    To use any of the functions listed below, you must add `local dev = GetSelf()`  to the top of your file, this allows you to access the internal functions from avSimpleRadar

!!! Warning
    avSimpleRadar requires than an avSimpleElectricSystem device is also being used, and the associated AC generators and DC battery are powered in said device. This is an internal DCS requirement.

---

## Radar Performance Initialization

This section is not put inside a function, and is called on init to define the performance of the radar.

``` lua
perfomance = 
{
  roll_compensation_limits = {math.rad(-180.0), math.rad(180.0)}, -- limits for RADAR_BANK_STABILIZATION
  pitch_compensation_limits = {math.rad(-60.0), math.rad(60.0)}, -- limits for RADAR_PITCH_STABILIZATION (when pitch is outside these values the scan zone will stop staying level with horizon)
  tracking_azimuth   = {-math.rad(60),math.rad(60)}, -- once locked, max azimuth to track
  tracking_elevation = {-math.rad(10),math.rad(10)}, -- once locked, max elevation to track
  scan_volume_azimuth = math.rad(120), --is left+right so 120 deg is +-60 deg left/right
  scan_volume_elevation = math.rad(5), --limits search angle of radar +-5 up/down
  scan_beam = math.rad(5), -- height of scan beam, max should be scan_volume_elevation (if less then it will do passes at different elevations)
  max_available_distance = 200000,-- max distance (in Meters) for object with large (>100m^2) radar cross section, for smaller RCS such as Su-27 the actual detection distance will be much less

  scan_speed = math.rad(2*60), -- unknown (doesn't affect debug scan beam)
  dead_zone = 1.0, -- unknown. doesn't seem to be distance between targets or distance from radar to target

  ground_clutter =
  {-- spot RCS = A + B * random + C * random 
    sea       = {0, 0, 0},
    land       = {0, 0, 0},
    artificial    = {0, 0, 0},
    rays_density   = 0.01,
    max_distance   = 1*NM_to_meter,
  }
}
```

---

## API Reference

Below are the available functions for `avSimpleRadar`:  

---

### set_power(value)

Used to turn on the radar. Set `value` to TRUE for on and FALSE for off.
```lua
dev:set_power(true)
```
Recommend to use this with the aircraft radar power switch, this provides the ability to stop transmitting and therefore avoid detection by enemy RWR.

---

## Important bits

The avSimpleRadar uses the following iCommands to lock the target with the TDC:  
```lua
iCommandPlane_LockOn_start = 509
iCommandPlane_LockOn_finish = 510
```
You can use these directly in the input keybinds, or within the device using (don't forget to define the command in the device):
```lua
iCommandPlane_LockOn_start = 509

dispatch_action(nil, iCommandPlane_LockOn_start)
```

---

## Params

The following param handles are used to read and write to control the radar.


| Read Params | Write Params | Unknown Params |
|---|---|---|
| [RADAR_MODE](#radar_mode) | [IFF_INTERROGATOR_STATUS](#iff_interrogator_status) | RADAR_BIT |
| [RADAR_STT_AZIMUTH](#radar_stt_azimuth) | [RADAR_PITCH_STABILIZATION](#radar_pitch_stabilization) | ACQUSITION_ZONE_VOLUME_AZIMUTH |
| [RADAR_STT_ELEVATION](#radar_stt_elevation) | [RADAR_ROLL_STABILIZATION](#radar_roll_stabilization) | SCAN_VOLUME_CUT_OFF_DISTANCE_MIN |
| [RADAR_STT_RANGE](#radar_stt_range) | [RADAR_PITCH_BANK_STABILIZATION](#radar_pitch_bank_stabilization) | CLOSEST_RANGE_RESPONSE |
| [RADAR_STT_FRIENDLY](#radar_stt_friendly) | [SCAN_ZONE_ORIGIN_AZIMUTH](#scan_zone_origin_azimuth) | |
| [RADAR_CONTACT_XX_ELEVATION](#radar_contact_xx_) | [SCAN_ZONE_ORIGIN_ELEVATION](#scan_zone_origin_elevation) | |
| [RADAR_CONTACT_XX_AZIMUTH](#radar_contact_xx_) | [SCAN_ZONE_VOLUME_AZIMUTH](#scan_zone_volume_azimuth) | |
| [RADAR_CONTACT_XX_RANGE](#radar_contact_xx_) | [SCAN_ZONE_VOLUME_ELEVATION](#scan_zone_volume_elevation) | |
| [RADAR_CONTACT_XX_TIME](#radar_contact_xx_) | [RADAR_TDC_AZIMUTH](#radar_tdc_azimuth) | |
| [RADAR_CONTACT_XX_FRIENDLY](#radar_contact_xx_) | [RADAR_TDC_RANGE](#radar_tdc_range) | |
| [RADAR_CONTACT_XX_RCS](#radar_contact_xx_) | [RADAR_TDC_RANGE_CARRET_SIZE](#radar_tdc_range_carret_size) | |
| [RADAR_CONTACT_XX_VX](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_VY](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_VZ](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_NOISE](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_RCS_COEFF](#radar_contact_xx_) | | |
| [RADAR_CONTACT_XX_NCTR](#radar_contact_xx_) | | |



**Use in the following format:**

``` mode = get_param_handle("RADAR_MODE")```

for more info on interacting with params, see [Param Handles](../BasicPrinciples.md/#param-handles)

---


### “RADAR_MODE”

Read param that gives the current mode of the radar.

1: Searching

2: Attempting lock

3: STT lock

---

### "RADAR_CONTACT_XX_..."

Read params, only available in radar mode 1 (basically RWS). 
The "XX" is the unique contact number, however a single aircraft will generate multiple contacts, because a contact is a single instance of a radar return.

...ELEVATION, ...AZIMUTH, ...RANGE provide the contact location.

...TIME provides the seconds since the radar return was found.

...FRIENDLY will return 1 if IFF is on and the contact is friendly.

...VX,...VY,...VZ provide the contact velocity.

...RCS_COEFF gives the RCS of the contact.

...NCTR (Non-Cooperative Target Recognition) provides the aircraft type (i.e Su-27).

...NOISE unknown.


---

### "RADAR_STT_AZIMUTH"

Read param that provides azimuth (horizontal angle) of locked target, **normalized with roll** (this makes it very easy to use in a HUD). Only available in STT mode.

---

### "RADAR_STT_ELEVATION"

Read param that provides elevation (vertical angle in radians) of locked target, **normalized with roll** (this makes it very easy to use in a HUD). Only available in STT mode.

---

### "RADAR_STT_RANGE"

Read param that provides range (in Meters) of locked target. Only available in STT mode.

---


### "RADAR_STT_FRIENDLY"

Read param that provides IFF status of locked target. Only available in STT mode.

-1: IFF off

0: target hostile or unknown

1: target friendly


---

### "IFF_INTERROGATOR_STATUS"

Write param that controls IFF. Set to 1 to turn on IFF

---

### "RADAR_PITCH_STABILIZATION"

Write param, when set to 1 turns on pitch stabilization. When on, keeps radar pointed at horizon as aircraft pitches (within pitch values of pitch_compensation_limits).

---

### "RADAR_ROLL_STABILIZATION"

Write param, when set to 1 turns on roll stabilization. When on, keeps radar pointed at horizon as aircraft rolls (within roll values of roll_compensation_limits).

---

### "RADAR_PITCH_BANK_STABILIZATION"

Write param, when set to 1 turns on combined stabilization.

---

### "SCAN_ZONE_ORIGIN_ELEVATION"

Write param, controls elevation origin of radar antenna.

---

### "SCAN_ZONE_ORIGIN_AZIMUTH"

Write param, controls azimuth origin of radar antenna.

---

### "SCAN_ZONE_VOLUME_AZIMUTH"

Write param, controls total scan width (scan widths are changable, i.e. 120deg, 80deg, 60deg).

---

### "SCAN_ZONE_VOLUME_ELEVATION"

Write param, controls total scan elevation. Setting this to a higher value than `scan_beam` will require the scan beam to make multiple sweeps to complete the desired scan area.

---

### "RADAR_TDC_AZIMUTH"

Write param, controls TDC position in the azimuth.

---

### "RADAR_TDC_RANGE"

Write param, controls TDC range.

---

### "RADAR_TDC_RANGE_CARRET_SIZE"

Write param, essentially the sensitivity of the TDC. Larger value means easier to lock target nearby. Default value 6000.

---

### Unknown Params {: .unverified-section }

These params exist but their function is not fully known.

"RADAR_BIT"

"ACQUSITION_ZONE_VOLUME_AZIMUTH"

"SCAN_VOLUME_CUT_OFF_DISTANCE_MIN"

"CLOSEST_RANGE_RESPONSE"

