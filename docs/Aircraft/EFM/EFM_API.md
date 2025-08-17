# DCS EFM API

## Setup
The EFM API can be found under `C:\Program Files\Eagle Dynamics\DCS World\API` or wherever DCS is installed on your machine.

---

## ED_FM_TEMPLATE.cpp

This file can (and should) be renamed to the name of your plane.

It contains functions to both send and recieve data from the game. It serves as the API layer between your simulation and the game.

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


