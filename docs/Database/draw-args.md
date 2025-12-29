# Reserved Draw Args

!!! Warning
    This is not complete, please let me know if you have more to add.  

    Sourced From TF-51, **doesn't** take into account FC3 specific args



| **Arg** | **Usage**                   | **Values**                                   |
|---------|-----------------------------|----------------------------------------------|
| 0       | Tail/Nose wheel retraction  | 0: wheel up, 1: wheel down                   |
| 1       | Tail/Nose wheel suspension  | 0: extended, 1: compressed                   |
| 2       | Tail/Nose wheel steering    | -1: left, 0: straight, 1: right (invert for tailwheel aircraft) |
| 3       | Port Landing Gear Deploy    | 0: wheel up, 1: wheel down                   |
| 4       | Port Landing Gear Suspension Compression |                                 |
| 5       | Starboard landing gear Deploy |                                            |    
| 6       | Starboard Landing Gear Suspension Compression                              |  
| 7       | N/A                         |                                              |
| 8       | N/A                         |                                              |
| 9       | N/A                         |                                              | 
| 10      | Flaps extension             |                                              |
| 11      | Starboard Aileron movement  |                                              |    
| 12      | Port Aileron movement       |                                              |
| 16      | Elevator movement           |                                              |
| 17      | Rudder Movement             |                                              |
| 26      | Bomb bay opening            | 0: closed: 1 open                            | 
| 38      | Canopy                      | 0: closed, 1: invisible                      |
| 39      | Pilot Head rotation         | -1: look left, 1 look right                  |
| 50      | Pilot visibility            | 0: visible, 1: not visible                   |
| 51      | Crewman #2 visibility       | 0: visible, 1: not visible                   |
| 52      | Crewman #3 visibility       | 0: visible, 1: not visible                   |
| 53      | Crewman #4 visibility       | 0: visible, 1: not visible                   |
| 54      | Crewman #5 visibility       | 0: visible, 1: not visible                   |
| 55      | Crewman #6 visibility       | 0: visible, 1: not visible                   |
| 56      | Crewman #7 visibility       | 0: visible, 1: not visible                   |
| 76      | Tail/Nose wheel steering    | -1: full turn left, 1: full turn right       |
| 101     | Tail/Nose wheel rotation    | 0–1: increasing is forward                   |
| 102     | Right wheel rotation        | 0–1: increasing is forward                   |
| 103     | Left wheel rotation         | 0–1: increasing is forward                   |
| 109     | Escape hatch / canopy dropped during bail out | 0.9 visible/closed, 1 hidden/open      |
| 114     | Canopy Visibility           | 0: visible, 1: invisible                     |
| 115     | Right Wheel Door            | 0: closed, 1: open                           |
| 116     | Left Wheel Door             | 0: closed, 1: open                           |
| 370     | Prop 1 Rotation (reserved)  | DO NOT ANIMATE, 370-374 IS RESERVED FOR "NEW PROP BLUR" |
| 371     | Prop 2 Rotation (reserved)  | DCS SETS THESE ARGS AUTOMATICALLY WHEN USING "NEW PROP BLUR" |
| 372     | Prop 3 Rotation (reserved)  | --                                           |
| 373     | Prop 4 Rotation (reserved)  | --                                           |
| 380	  | Propeller 1 Damage	        | Only visible at frame 100                    |
| 381	  | Propeller 2 Damage	        | Only visible at frame 100                    |
| 382	  | Propeller 3 Damage	        | Only visible at frame 100 |
| 383	  | Propeller 4 Damage	        | Only visible at frame 100 |
| 413     | Prop 1 Pitch                | 0 (fine) to 1 (feathered) |
| 414     | Prop 2 Pitch                | 0 (fine) to 1 (feathered) |
| 415     | Prop 3 Pitch                | 0 (fine) to 1 (feathered) |
| 416     | Prop 4 Pitch                | 0 (fine) to 1 (feathered) |
| 407     | Prop Rotation               | -1 to 1: two revolutions      |
| 408     | Prop Rotation               | -1 to 1: two revolutions      |
| 409     | Prop Rotation               | -1 to 1: two revolutions      |
| 410     | Prop Rotation               | -1 to 1: two revolutions      |
| 459     | Pilot Death                 | 0-1 (dead)                                   |
| 460     | Bombardier Death            | 0-1 (dead)                                   |
| 461     | Engineer Death              | 0-1 (dead)                                   |
| 462     | Navigator Death             | 0-1 (dead)                                   |
| 463     | Midupper Gunner Death       | 0-1 (dead)                                   |
| 464     | Tail Gunner Death           | 0-1 (dead)                                   |
| 443     | Dynamic side/bort numbers first digit  | on a ribbon of alphanumerics 0-9A-Z, -0.1: blank, 0: "0", 1.0: "A", 3.6(yes!): "Z".  Value set via mission editor        |
| 444     | Dynamic side/bort numbers second digit  | on a ribbon of alphanumerics 0-9A-Z, -0.1: blank, 0:"0", 1.0: "A", 3.6 (yes!): "Z". Value set via mission editor        |
| 445     | Dynamic side/bort numbers third digit  | on a ribbon of alphanumerics 0-9A-Z, -0.1: blank, 0:"0", 1.0: "A", 3.6 (yes!): "Z". Value set via mission editor        |
| 475     | Prop 1 Visibility           | 0 show, 1-100 hidden, replaced by "new prop blur" disc by DCS                         |
| 476     | Prop 2 Visibility           | 0 show, 1-100 hidden, replaced by "new prop blur" disc by DCS                         |
| 477     | Prop 3 Visibility           | 0 show, 1-100 hidden, replaced by "new prop blur" disc by DCS                         |
| 478     | Prop 4 Visibility           | 0 show, 1-100 hidden, replaced by "new prop blur" disc by DCS                         |
