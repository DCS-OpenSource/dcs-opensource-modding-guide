# Cockpit Sounds

see DCSWorld/Sounds/sdef/_example.sdef

!!! Note
    This is for custom internal sounds like opening doors, alarms, warnings, music etc.  
    Sounders and external/engine sounds will be covered elsewhere later (TODO)

## Checklist

* Sound Files
* SDEFs
* post_initialize loading
* Play functions

---

## Setup

### Sound files

Place your `.wav` (maybe .ogg TODO check) files in `Sounds/Effects/Aircrafts/{PLANENAME}/Cockpit/`

---

### SDEFs

You will need to make an SDEF file for each sound. SDEFs are located in `Sounds/sdef/Aircrafts/{PLANENAME}/Cockpit/`

**Example .sdef file**

Here is a demo file: `CockpitAshtrayClose.sdef` used to test this for the guide.
```
wave = "Effects/Aircrafts/AH1G/Cockpit/Cockpit_ashtray_close_03"
inner_radius = 10
outer_radius = 100
gain = 1
```
Where `wave` must match the path (starting from the sounds folder) to the desired sound.

---

### Sound Initializing

Sounds are loaded in the `post_initialize()` function in your lua devices. At minimum you need one host per device, then you add sounds to that host as below.

```lua
function post_initialize()
    sndhost         = create_sound_host("COCKPIT_ARMS","HEADPHONES",0,0,0) -- Name, type ("2D", "3D", "HEADPHONES"), position x, y, z
    AshtrayCloseSND = sndhost:create_sound("Aircrafts/AH1G/Cockpit/CockpitAshtrayClose") -- Path to SDEF file, relative to Sounds/sdef/
    AshtrayOpenSND  = sndhost:create_sound("Aircrafts/AH1G/Cockpit/CockpitAshtrayOpen")
end
```

---

### Sound Triggering

```lua
-- In SetCommand() or update()
-- detect trigger then
AshtrayOpenSND:play_once() -- will play the .wav file start to finish once
```

There are more available functions, but I have not tested them (feel free to expand this with examples)
```lua
soundObject:stop()          -- stops playing sound
soundObject:play_continue() -- plays/continues to play sound
soundObject:update(pitch, volume, ???)        -- unsure what third param is
soundObject:is_playing()    -- returns true if sound playing
```

---

## Clickable Sounds

TODO

Note sounds.lua, sounds_init.lua etc

