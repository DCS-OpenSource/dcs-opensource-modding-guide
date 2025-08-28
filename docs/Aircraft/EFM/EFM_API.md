# DCS EFM API

## Introduction

The EFM API Template is the outline for the API your aircraft needs to provide into correctly work within the game.

It defines functions which DCS will call to query information about the state of your plane. DCS will also call functions to pass you important information about the current state of your aircraft and the atmosphere.

The rough outline of data flow is that DCS will first pass you information about your plane's state, then DCS will call your simulate function. Then DCS will ask you for information it requires like your engine RPM, or any forces or moments on the aircraft.

## API Overview

### DCS Reference Frames

DCS API defines two coordinate systems: global and local. Both of these are right handed coordinate systems defined as follows:

- +x -> forward
- +y -> up
- +z -> right

Since this is a right handed coordinate system the rotations are more easily defined in terms of the body (local) coordinates as if flying the aircraft:

- +rotation around x -> roll right
- +rotation around y -> yaw left
- +rotation around z -> pitch up

#### Local

This may also be known as body or aircraft body. This is the reference frame relative to the aircraft, as if you were flying along with the aircraft. The origin is defined from the centre of the model, note the centre of mass defined in the entry.lua is also defined from the origin of the model.

- +x -> forward torwards the nose
- +y -> up
- +z -> along out the right wing

the rotations are the same as those described just above.

#### Global

This refers to DCS's global or world coordinate system, this has no physical meaning this is just the underlying coordinate system used by the DCS engine, since DCS exists on a flat earth.

The closest analogue to real coordinates [local tangent plane coordinates](https://en.wikipedia.org/wiki/Local_tangent_plane_coordinates) for rotation (DCS is NUE). The DCS global frame is local tangent plane coordinates but also the position is absolute **not relative to the aircraft position.**

In DCS the coordinates have the following meanings:

- +x -> north
- +y -> up
- +z -> east

the rotations are the same as those described above, the only thing worth noting is the rotation around the y axis (yaw or heading) is positive to the left (west from north). This is the opposite of the normal convention of the compass starting at north and increasing eastward.

This must be taken into account when using yaw angle for heading.

### Function Overview

| Function | Purpose | Example |
|----------|---------|---------|
| ed_fm_add_local_force | Add **one** force in the [local](#local) frame. | Adding Lift/Drag Force |
| ed_fm_add_local_force_component | Add **many** forces in the [local](#local) frame. | Adding Lift and Drag forces for a multi-element method |
| ed_fm_add_global_force | Add **one** force in the [global](#global) frame. | Adding force from a hot airballoon. |
| ed_fm_add_global_force_component | Add **many** forces in the [global](#global) frame. | Adding forces from multiple attached helium balloons. |
| ed_fm_add_local_moment | Add **one** moment in the [local](#local) frame. | Adding stability derivative moments. |
| ed_fm_add_local_moment_component | Add **many** forces in the [local](#local) frame. |  |
| ed_fm_add_global_moment | Add **one** moment in the [global](#global) frame. |  |
| ed_fm_add_global_moment_component | Add **many** forces in the [global](#global) frame. |  |
| ed_fm_simulate | Update function called by DCS every frame to simulate your flight model | simulate and update: engine, flight model |
| ed_fm_set_atmosphere | DCS gives atmosphere state to your simulation at your aircraft's current position | Update your internal atmosphere state for flight model. |
| ed_fm_set_current_mass_state | DCS gives current aircraft mass state | Update mass state, for example centre of mass useful for calculating moments. |
| ed_fm_set_current_state | DCS gives current physics rigidbody state in [global or world coordinates](#global). | |
| ed_fm_set_current_state_body_axis | DCS gives current physics rigidbody state in [local or body coordinates](#local). | |
| ed_fm_on_damage | DCS calls whenever your aircraft takes damage supplying the element and it's new health | Updating your damage state. |
| ed_fm_set_command | DCS calls whenever a command is processed. | Setting input like flight stick and throttle position. |
| ed_fm_change_mass | DCS asks for any mass change requests | Update mass as fuel is burned from the aircraft, or update mass when fuel is added. |
| ed_fm_set_internal_fuel | DCS calls whenever fuel is set or added | Set your fuel system fuel level. |
| ed_fm_refueling_add_fuel | DCS calls whenever fuel is added, optional if not present DCS will call set_internal_fuel repeatedly to add fuel. | Add fuel during refueing. |
| ed_fm_get_internal_fuel | DCS asks for internal fuel remaining | To inform DCS of your fuel state. |
| ed_fm_get_external_fuel | DCS asks for external fuel remaining | To inform DCS of your external fuel state. |
| ed_fm_set_draw_args | DCS asks for changes to external draw args. | Set any external arguments. |
| ... internal args ... | | |
| ed_fm_configure | DCS calls upon simulation start. | Setup and data-structures before the simulation starts.
| ed_fm_get_param | DCS asks for information about certain parameters about your simulation. | Inform DCS of certain parameters like engine RPM. |
| ed_fm_set_surface | DCS gives information about the surface below the aircraft. | To calculate ground effect. |
| ed_fm_cold_start | DCS calls on cold start. | |
| ed_fm_hot_start | DCS calls on hot start. | |
| ed_fm_hot_start_in_air | DCS calls on air start. | |
| ed_fm_get_shake_amplitude | DCS asks for requested shake. | |
| ed_fm_repair | DCS calls upon repair. | Repair all your damage. |
| ed_fm_need_to_be_repaired | DCS asks if repair is required. | |

## Setup

The EFM API can be found under `C:\Program Files\Eagle Dynamics\DCS World\API` or wherever DCS is installed on your machine.

---

## ED_FM_TEMPLATE.cpp

This file can (and should) be renamed to the name of your plane. 

---


### `ed_fm_simulate`

#### **Description**
This function is called by DCS every frame. Use it to update your aircraft's state, perform physics calculations, and handle system logic. It is analogous to an `update()` function in Lua devices.

#### **Parameters**
| Parameter   | Type    | Description                                                      |
|-------------|---------|------------------------------------------------------------------|
| `dt`        | double  | Delta time in seconds since the last frame. *(Not yet verified)* |

#### **Returns**
- None

---

### `ed_fm_set_command`

#### **Description**
Called by DCS every time a command is detected., best case is to put a switch statement in here to do actions depending on user input


#### **Parameters**
| Parameter   | Type    | Description                                                      |
|-------------|---------|------------------------------------------------------------------|
| `command`   | int     | Command number from detected input |
| `value`     | float   | value of the command |

---

### `ed_fm_set_current_state`

#### **Description**
Called before simulation to set up your environment for the next step.

#### **Parameters**

| Parameter        | Type    | Description                                                        |
|------------------|---------|--------------------------------------------------------------------|
| `ax`             | double  | Linear acceleration (X) in world coordinates                       |
| `ay`             | double  | Linear acceleration (Y) in world coordinates                       |
| `az`             | double  | Linear acceleration (Z) in world coordinates                       |
| `vx`             | double  | Linear velocity (X) in world coordinates                           |
| `vy`             | double  | Linear velocity (Y) in world coordinates                           |
| `vz`             | double  | Linear velocity (Z) in world coordinates                           |
| `px`             | double  | Body center position (X) in world coordinates                      |
| `py`             | double  | Body center position (Y) in world coordinates                      |
| `pz`             | double  | Body center position (Z) in world coordinates                      |
| `omegadotx`      | double  | Angular acceleration (X) in world coordinates                      |
| `omegadoty`      | double  | Angular acceleration (Y) in world coordinates                      |
| `omegadotz`      | double  | Angular acceleration (Z) in world coordinates                      |
| `omegax`         | double  | Angular velocity (X) in world coordinates                          |
| `omegay`         | double  | Angular velocity (Y) in world coordinates                          |
| `omegaz`         | double  | Angular velocity (Z) in world coordinates                          |
| `quaternion_x`   | double  | Orientation quaternion (X) in world coordinates                    |
| `quaternion_y`   | double  | Orientation quaternion (Y) in world coordinates                    |
| `quaternion_z`   | double  | Orientation quaternion (Z) in world coordinates                    |
| `quaternion_w`   | double  | Orientation quaternion (W) in world coordinates                    |

#### **Returns**
- None

---

### `ed_fm_set_current_state_body_axis`

Sets the aircraft's current state using body axis coordinates.

#### **Parameters**

| Parameter                  | Type    | Description                                                      |
|----------------------------|---------|------------------------------------------------------------------|
| `ax`                       | double  | Linear acceleration (X) in body coordinates                      |
| `ay`                       | double  | Linear acceleration (Y) in body coordinates                      |
| `az`                       | double  | Linear acceleration (Z) in body coordinates                      |
| `vx`                       | double  | Linear velocity (X) in body coordinates                          |
| `vy`                       | double  | Linear velocity (Y) in body coordinates                          |
| `vz`                       | double  | Linear velocity (Z) in body coordinates                          |
| `wind_vx`                  | double  | Wind velocity (X) in body coordinates                            |
| `wind_vy`                  | double  | Wind velocity (Y) in body coordinates                            |
| `wind_vz`                  | double  | Wind velocity (Z) in body coordinates                            |
| `omegadotx`                | double  | Angular acceleration (X) in body coordinates                     |
| `omegadoty`                | double  | Angular acceleration (Y) in body coordinates                     |
| `omegadotz`                | double  | Angular acceleration (Z) in body coordinates                     |
| `omegax`                   | double  | Angular velocity (X) in body coordinates                         |
| `omegay`                   | double  | Angular velocity (Y) in body coordinates                         |
| `omegaz`                   | double  | Angular velocity (Z) in body coordinates                         |
| `yaw`                      | double  | Yaw angle in radians                                             |
| `pitch`                    | double  | Pitch angle in radians                                           |
| `roll`                     | double  | Roll angle in radians                                            |
| `common_angle_of_attack`   | double  | Angle of attack (AoA) in radians                                 |
| `common_angle_of_slide`    | double  | Angle of sideslip (AoS) in radians                               |

#### **Description**
Called before simulation to set up the aircraft's state in body axis coordinates, including wind and orientation angles.

#### **Returns**
- None

---




