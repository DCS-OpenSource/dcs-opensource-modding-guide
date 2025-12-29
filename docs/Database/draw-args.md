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
| 26      | Bomb bay opening            |                                              | 
| 38      | Canopy & boarding equipment | 0: closed, 0.9: open, 0.85>0.9 ladder 1: invisible           |
| 39      | Pilot Head rotation         | TODO: verify                                 |
| 50      | Pilot #1 visibility         | TODO: verify                                 |
| 51      | Crewman #2 visibility       | 0: visible, 1: not visible                   |
| 52      | Crewman #3 visibility       | 0: visible, 1: not visible                   |
| 53      | Crewman #4 visibility       | 0: visible, 1: not visible                   |
| 54      | Crewman #5 visibility       | 0: visible, 1: not visible                   |
| 55      | Crewman #6 visibility       | 0: visible, 1: not visible                   |
| 56      | Crewman #7 visibility       | 0: visible, 1: not visible                   |
| 101     | Tail/Nose wheel rotation    | 0–1: increasing is forward                   |
| 102     | Right wheel rotation        | 0–1: increasing is forward                   |
| 103     | Left wheel rotation         | 0–1: increasing is forward                   |
| 114     | Canopy Visibility           | 0: visible, 1: invisible                     |
| 115     | Right Wheel Door            | 0: closed, 1: open                           |
| 116     | Left Wheel Door             | 0: closed, 1: open                           |
| 407     | Prop Rotation               | -1 to 1: two revolutions anti-clockwise      |
| 413     | Prop pitch                  | TODO: verify                                 |
| 475     | Prop blade visibility       | 0: visible, 0.1–1: invisible                 |
