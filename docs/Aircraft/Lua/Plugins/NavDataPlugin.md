# Welcome to the DCS: OpenSource NavDataPlugin Wiki!
## Introduction
This contains installation instructions, and documentation to create the backend of a powerful navigation system using raw data from DCS.

**Why does this exist?**
While all the functions to create this yourself are exposed in DCS Lua, they are chaotic and undocumented. This plugin streamlines the process, by doing the data collection for you, and collating it into one big table.

---

## Features
* Airport Data
* Beacon Data
* Supplemental Data replacement (to replace missing DCS Data or overwrite existing data)
* Helper functions for various useful tasks such as range sorting.

---
## Download and install guide

### .git submodule
1. Navigate to `Cockpit/Scripts/` in your terminal
2. Run `git submodule add https://github.com/DCS-OpenSource/NavDataPlugin.git`
3. commit the submodule file to your repo
### Manual Install
1. Download the latest release (the .zip, not source code)
2. unzip, and place the folder in `Cockpit/Scripts/`
3. verify the relative path to Nav.lua is `Cockpit/Scripts/NavDataPlugin/Nav.lua`

---

## Configure the NavdataPlugin:
```lua
-- This allows the use of require statements. require uses . instead of / for folder sepparators.
-- Require only loads the lua once saving loading time.
package.path = package.path..";"..LockOn_Options.script_path.."?.lua"
package.path = package.path..";"..LockOn_Options.common_script_path.."?.lua"

require("NavDataPlugin.Nav")
```

## Function Details
---
### get_ILS_beacons()

**Description**  
Returns all ILS beacons in the beacons file.

**ILS Beacon Types**

| Beacon Type                | Integer Value |
|----------------------------|:-------------:|
| `BEACON_TYPE_ILS_LOCALIZER`   | 16640        |
| `BEACON_TYPE_ILS_GLIDESLOPE`  | 16896        |
| `BEACON_TYPE_ILS_FAR_HOMER`   | 16408        |
| `BEACON_TYPE_ILS_NEAR_HOMER`  | 16424        |

**Parameters**  

| Name      | Type     | Description                     |
|-----------|----------|---------------------------------|
| _none_    | `nil`    |                                 |

**Returns**  
`table: ILS_beacons` - Table of ILS Beacons on the Map

```lua
-- Example of one entry in the returned table
  [1] = {
    type = 16896, -- matches beacon type table above
    beaconId = "airfield1_0",
    positionGeo = {
      longitude = -115.691917,
      latitude = 36.585008,
    },
    sceneObjects = {
      [1] = "t:85164032",
    },
    display_name = "Creech",
    channel = 24,
    direction = -88.617531,
    position = {
      [1] = -360394.21875,
      [2] = 952.944679,
      [3] = -76976.257813,
    },
    callsign = "ICRR",
    frequency = 108700000, -- 108.7
  },
```
---

### get_TCN_beacons()

**Description**  
Returns all TCN beacons in the beacons file.

**TCN Beacon Types**

| Beacon Type                | Integer Value |
|----------------------------|:-------------:|
| `BEACON_TYPE_TACAN`   | 4        |
| `BEACON_TYPE_VORTAC`  | 5        |

**Parameters**  

| Name      | Type     | Description                     |
|-----------|----------|---------------------------------|
| _none_    | `nil`    |                                 |

**Returns**  
`table: TCN_beacons` - Table of TCN Beacons on the Map

```lua
-- Example of one entry in the returned table
  [4] = {
    type = 4, -- BEACON_TYPE_TACAN
    beaconId = "airfield4_1",
    positionGeo = {
      longitude = -115.025113,
      latitude = 36.244644,
    },
    display_name = "Nellis",
    channel = 12,
    sceneObjects = {
      [1] = "t:41518947",
    },
    direction = -141.002194,
    position = {
      [1] = -397135.9375,
      [2] = 564.647598,
      [3] = -16545.675781,
    },
    callsign = "LSV",
  },
```
---

### get_VOR_beacons()

**Description**  
Returns all VOR beacons in the beacons file.

**VOR Beacon Types**

| Beacon Type                | Integer Value |
|----------------------------|:-------------:|
| `BEACON_TYPE_VOR`     |     1    |
| `BEACON_TYPE_VOR_DME` |  2 |
| `BEACON_TYPE_VORTAC`  | 5        |


**Parameters**  

| Name      | Type     | Description                     |
|-----------|----------|---------------------------------|
| _none_    | `nil`    |                                 |

**Returns**  
`table: VOR_beacons` - Table of ILS Beacons on the Map

```lua
-- Example of one entry in the returned table
  [1] = {
    type = 5, -- BEACON_TYPE_VORTAC
    beaconId = "airfield3_4",
    positionGeo = {
      longitude = -115.159816,
      latitude = 36.079576,
    },
    sceneObjects = {
      [1] = "t:69208390",
    },
    display_name = "McCarran-International",
    channel = 116,
    direction = -179.199384,
    position = {
      [1] = -415686.09375,
      [2] = 657.922167,
      [3] = -28303.363281,
    },
    callsign = "LAS",
    frequency = 116900000,
  },
```

---


### getAirports()

**Description**  
Returns all Airports on the map, with extra filtered data.

**Parameters**

| Name      | Type     | Description                     |
|-----------|----------|---------------------------------|
| _none_    | `nil`    |                                 |

**Returns**  
`table: Filtered Airport Data` - Table of Airport Data

```lua
Nellis = {
    radioid = {
      [1] = "airfield4_0",
    },
    radios = {
      radioId = "airfield4_0",
      uniform = 327,
      victor = 132.55,
    },
    runways = {
      [1] = {
        runwayLength = 9454.0715925188,
        runwayEnd1 = {
          y = -18395.984375,
          x = -399101.90625,
        },
        name = "03L-21R",
        runwayEnd2 = {
          y = -16538.4921875,
          x = -396898.875,
        },
      },
      [2] = {
        runwayLength = 9437.9092172239,
        runwayEnd1 = {
          y = -18160.181640625,
          x = -399295.1875,
        },
        name = "03R-21L",
        runwayEnd2 = {
          y = -16306.291992188,
          x = -397095.5625,
        },
      },
    },
    positionLatLon = {
      lon = -115.03300055101,
      lat = 36.235224110884,
    },
    name = "Nellis",
    position = {
      y = -17233.236816,
      x = -398195.375,
    },
    beacons = {
      [1] = {
        beaconId = "airfield4_1",
      },
      [2] = {
        runwayName = "03R-21L",
        runwayId = 2,
        runwaySide = "21L",
        beaconId = "airfield4_2",
      },
      [0] = {
        runwayName = "03R-21L",
        runwayId = 2,
        runwaySide = "21L",
        beaconId = "airfield4_0",
      },
    },
    isCivilian = false,
    ICAO = "KLSV",
  },
```

---

### sortAirportsByDistance({x, y})

**Description**  
Returns the same as [`getAirports()`](#getairports) but sorted by distance to the player or other defined point.

**Parameters**  

| Name      | Type     | Description                     |
|-----------|----------|---------------------------------|
| `ownPos`    | `table`    | `{[1] = x, [2] = y}` Users current position                                |

**Returns**  
`table: Filtered Airport Data` - Table of Airport Data

```lua
Nellis = {
    -- All the same as getAirports() with the addition of two new fields
    distanceToPlayerNM = 15.6 -- Distance from player to point in NM
    bearingToPlayer = 330 -- Bearing from player in degrees
  },
```

---



## Data Supplementation 
The Data DCS provides is often less than perfect, especially around radios on certain maps. Nellis (NTTR) and Caucasus work as expected, but ED seemingly updated the TDK after those maps, so data such as radios is hidden/inaccessable sometimes.

To circumvent this, I added a way to add additional data to edit the dynamically aquired information.

### How to setup data supplementation
* Make a new folder in your `Cockpit/Scripts/` folder called `NavDataPluginExtra`
* Make sub folders for each map, the name should match the theatre name.
    * You can get the theatre name using:
    * For NTTR this would look like `Cockpit/Scripts/NavDataPluginExtra/Nevada/`
```lua
do_mission_file("mission") -- Load the mission file
local theatre = mission.theatre -- map name string
```
    
* Make a file in the new folder called `theatreName.lua` (in this example `Nevada.lua`)
* Paste the following into the file:
```lua
-- This Lua file contains an array of data to supplement the existing data pulled from DCS
local Airports = {
    ["Nellis"] = { -- This needs to match the airport name on the F10 Map
        name = "Nellis Air Force Base",
        ICAO = "KLSV",
    }, 
}
return Airports -- Don't forget to include this at the bottom
```
* You can edit every value, providing you match the format
    * Radio supplement example:
```lua
["Groom Lake"] = { -- Area 51
    name = "Homey Airport",
    radios = {
        uniform = 250.05,
        victor = 118.00,
    }
}
```
* The data is automatically supplemented, if the file exists, so no extra function calls needed

---


