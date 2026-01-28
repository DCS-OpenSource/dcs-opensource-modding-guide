## CreateGauge(type)

**Description**  
Creates a gauge object to drive animation arguments.

**Parameters**  

| Name   | Type             | Description                                                        |
|--------|------------------|--------------------------------------------------------------------|
| `type` | `string | nil`  | Type of gauge: `nil`, `"parameter"`, `"cycled"`, or `"external_arg"` |

**Returns**  
`Gauge` - A new gauge object.

---

## Gauge (class)

**Description**  
Describes the configuration of a cockpit gauge animation.

| Field            | Type             | Description                                                                 |
|------------------|------------------|-----------------------------------------------------------------------------|
| `arg_number`     | `number`         | Argument number to be animated.                                             |
| `input`          | `table`          | Input range from controller or parameter (e.g. `{0, 1}`).                   |
| `output`         | `table`          | Output animation range for the argument (e.g. `{0, 1}`).                    |
| `controller`     | `userdata | nil` | Controller object (from `LoRegisterPanelControls`) for types `nil`/`cycled`.|
| `params`         | `table | nil`    | Parameters for the controller function.                                     |
| `parameter_name` | `string | nil`   | Parameter name (for type `"parameter"`).                                    |
| `cycle_value`    | `number | nil`   | Cycle value (for type `"cycled"`).                                          |
| `external_arg`   | `number | nil`   | External argument number (for type `"external_arg"`).                       |

---

### Example Gauge

#### Using a Controller
```lua
vsi = CreateGauge()
vsi.arg_number = 48
vsi.input = {-6000*ft_to_meter/60, 6000*ft_to_meter/60}
vsi.output = {-1, 1}
vsi.controller = controllers.base_gauge_VerticalVelocity
```

#### Using a Parameter
```lua
CurrTime_hours                     = CreateGauge("parameter")
CurrTime_hours.parameter_name      = "CURRTIME_HOURS"
CurrTime_hours.arg_number          = 440
CurrTime_hours.input               = {0.0, 12.0}
CurrTime_hours.output              = {1.0, -1.0}
```
---

## LoRegisterPanelControls()

**Description**  
Returns the list of main panel controllers registered for the aircraft.

**Returns**  
`MainPanelControls` - A userdata object representing all registered panel controls.

---

## MainPanelControls (class)

**Description**  
Returned from `LoRegisterPanelControls()`, this object exposes all available cockpit control animations and their linked gauges.

### Fields

| Field Name                                 | Type      | Description                               |
|-------------------------------------------|-----------|-------------------------------------------|
| `Panel_Rot_X`                              | `userdata`| Panel X-axis rotation                     |
| `Panel_Shake_Y`                            | `userdata`| Panel Y-axis shake                        |
| `Panel_Shake_Z`                            | `userdata`| Panel Z-axis shake                        |
| `base_gauge_AngleOfAttack`                 | `userdata`| Gauge: Angle of Attack                    |
| `base_gauge_AngleOfSlide`                 | `userdata`| Gauge: Angle of Slide                     |
| `base_gauge_BarometricAltitude`           | `userdata`| Gauge: Barometric Altitude                |
| `base_gauge_CanopyPos`                    | `userdata`| Gauge: Canopy Position                    |
| `base_gauge_CanopyState`                  | `userdata`| Gauge: Canopy State                       |
| `base_gauge_EngineLeftFuelConsumption`    | `userdata`| Gauge: Left Engine Fuel Consumption       |
| `base_gauge_EngineLeftRPM`               | `userdata`| Gauge: Left Engine RPM                    |
| `base_gauge_EngineLeftTemperatureBeforeTurbine` | `userdata`| Gauge: Left Engine Temp (pre-turbine) |
| `base_gauge_EngineRightFuelConsumption`   | `userdata`| Gauge: Right Engine Fuel Consumption      |
| `base_gauge_EngineRightRPM`              | `userdata`| Gauge: Right Engine RPM                   |
| `base_gauge_EngineRightTemperatureBeforeTurbine`| `userdata`| Gauge: Right Engine Temp (pre-turbine) |
| `base_gauge_FlapsPos`                     | `userdata`| Gauge: Flaps Position                     |
| `base_gauge_FlapsRetracted`               | `userdata`| Gauge: Flaps Retracted                    |
| `base_gauge_Heading`                      | `userdata`| Gauge: Heading                            |
| `base_gauge_HelicopterCollective`         | `userdata`| Gauge: Helicopter Collective              |
| `base_gauge_HelicopterCorrection`         | `userdata`| Gauge: Helicopter Correction              |
| `base_gauge_HorizontalAcceleration`       | `userdata`| Gauge: Horizontal Acceleration            |
| `base_gauge_IndicatedAirSpeed`            | `userdata`| Gauge: Indicated Airspeed                 |
| `base_gauge_LandingGearHandlePos`         | `userdata`| Gauge: Gear Handle Position               |
| `base_gauge_LateralAcceleration`          | `userdata`| Gauge: Lateral Acceleration               |
| `base_gauge_LeftMainLandingGearDown`      | `userdata`| Gauge: Left Main Gear Down                |
| `base_gauge_LeftMainLandingGearUp`        | `userdata`| Gauge: Left Main Gear Up                  |
| `base_gauge_MachNumber`                   | `userdata`| Gauge: Mach Number                        |
| `base_gauge_MagneticHeading`              | `userdata`| Gauge: Magnetic Heading                   |
| `base_gauge_NoseLandingGearDown`          | `userdata`| Gauge: Nose Gear Down                     |
| `base_gauge_NoseLandingGearUp`            | `userdata`| Gauge: Nose Gear Up                       |
| `base_gauge_Pitch`                        | `userdata`| Gauge: Pitch                              |
| `base_gauge_RadarAltitude`                | `userdata`| Gauge: Radar Altitude                     |
| `base_gauge_RateOfPitch`                  | `userdata`| Gauge: Rate of Pitch                      |
| `base_gauge_RateOfRoll`                   | `userdata`| Gauge: Rate of Roll                       |
| `base_gauge_RateOfYaw`                    | `userdata`| Gauge: Rate of Yaw                        |
| `base_gauge_RightMainLandingGearDown`     | `userdata`| Gauge: Right Main Gear Down               |
| `base_gauge_RightMainLandingGearUp`       | `userdata`| Gauge: Right Main Gear Up                 |
| `base_gauge_Roll`                         | `userdata`| Gauge: Roll                               |
| `base_gauge_RudderPosition`               | `userdata`| Gauge: Rudder Position                    |
| `base_gauge_SpeedBrakePos`                | `userdata`| Gauge: Speed Brake Position               |
| `base_gauge_StickPitchPosition`           | `userdata`| Gauge: Stick Pitch Position               |
| `base_gauge_StickRollPosition`            | `userdata`| Gauge: Stick Roll Position                |
| `base_gauge_ThrottleLeftPosition`         | `userdata`| Gauge: Left Throttle Position             |
| `base_gauge_ThrottleRightPosition`        | `userdata`| Gauge: Right Throttle Position            |
| `base_gauge_TotalFuelWeight`              | `userdata`| Gauge: Total Fuel Weight                  |
| `base_gauge_TrueAirSpeed`                 | `userdata`| Gauge: True Airspeed                      |
| `base_gauge_VerticalAcceleration`         | `userdata`| Gauge: Vertical Acceleration              |
| `base_gauge_VerticalVelocity`             | `userdata`| Gauge: Vertical Velocity                  |
| `base_gauge_WOW_LeftMainLandingGear`      | `userdata`| Gauge: Left Main Weight-On-Wheels         |
| `base_gauge_WOW_NoseLandingGear`          | `userdata`| Gauge: Nose Weight-On-Wheels              |
| `base_gauge_WOW_RightMainLandingGear`     | `userdata`| Gauge: Right Main Weight-On-Wheels        |
| `canopy`                                  | `userdata`| Canopy animation controller               |
| `day_night_texture_switcher`              | `userdata`| Night/day mode texture toggle             |
| `head_shift_X`                            | `userdata`| Head shift X controller                   |
| `head_shift_Y`                            | `userdata`| Head shift Y controller                   |
| `head_shift_Z`                            | `userdata`| Head shift Z controller                   |
| `mirrors_draw`                            | `userdata`| Mirror draw state                         |
| `pilot_draw`                              | `userdata`| Pilot visibility                          |


---
