# Terrain Module

## Loading the module
```lua
    local Terrain = require("terrain")
```

!!! Warning
    Non functional or untested functions will be tagged with  ***[UNVERIFIED]***  

    TODO: Test functions and verify descriptions

---

| Method                                 | Params                               | Description                                                                                         |
|----------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|
| **[Create](#create)**                  | —                                    | Instantiate or reset the terrain subsystem.                                                         |
| **[FindNearestPoint](#findnearestpoint)** | `x, y, range`                     | Find the nearest valid point (e.g. on a road) to `(x, y)` within `range`.                           |
| **[FindOptimalPath](#findoptimalpath)**   | `x1, y1, x2, y2`                  | Compute the optimal path (e.g. along roads) from `(x1, y1)` to `(x2, y2)`.                          |
| **[GetHeight](#getheight)**            | `x, y`                               | Return terrain elevation at `(x, y)`.                                                               |
| **[GetMGRScoordinates](#getmgrscoordinates)** | `x, y`                        | Return the MGRS grid coordinate for `(x, y)`.                                                       |
| **[GetSeasons](#getseasons)**          | —                                    | Return a table of season identifiers or data.                                                       |
| **[GetSurfaceHeightWithSeabed](#getsurfaceheightwithseabed)** | `x, y`        | Return both surface elevation and depth of sea bed at `(x, y)`.                                     |
| **[GetSurfaceType](#getsurfacetype)**  | `x, y`                               | Return the type of surface (e.g. “water”, “asphalt”) at `(x, y)`.                                   |
| **[GetTerrainConfig](#getterrainconfig)** | `type`                            | Obtain configuration data for terrain subtypes (e.g. “Airdromes”).                                  |
| **[Init](#init)**                      | `terrain_config, reason, date`       | Initialize terrain data with a config table, reason code, and date.                                 |
| **[InitLight](#initlight)**            | `terrain_config, reason, date`       | Initialize only the lighting component of the terrain system.                                       |
| **[Release](#release)**                | —                                    | Clean up or unload terrain resources.                                                               |
| **[convertLatLonToMeters](#convertlatlontometers)** | `lat, lon`              | Convert geographic coordinates (latitude, longitude) into simulation meters.                        |
| **[convertMGRStoMeters](#convertmgrstometers)** | `mgrs`                      | Convert an MGRS string into simulation meters.                                                      |
| **[convertMetersToLatLon](#convertmeterstolatlon)** | `x, y`                  | Convert simulation‐space meters back to geographic coordinates.                                     |
| **[findPathOnRoads](#findpathonroads)**   | `type, x1, y1, x2, y2`            | Find a path along “roads” or “railroads” between two points.                                        |
| **[getBeacons](#getbeacons)**          | —                                    | Retrieve a list of all beacon objects in the terrain.                                               |
| **[getClosestPointOnRoads](#getclosestpointonroads)** | `type, x, y`          | Find the nearest point on the specified network (“roads” or “railroads”) to `(x, y)`.               |
| **[getClosestValidPoint](#getclosestvalidpoint)** | `type, x, y`              | Find the nearest valid point of specified type (e.g. “land”) to `(x, y)`.                           |
| **[getCrossParam](#getcrossparam)**    | —                                    | Retrieve cross‐parameter data (undocumented use case).                                              |
| **[getObjectPosition](#getobjectposition)** | `o`                             | Return the map position of a given scene object.                                                    |
| **[getObjectsAtMapPoint](#getobjectsatmappoint)** | `mapX, mapY`              | List all objects whose footprint overlaps the map point.                                            |
| **[getRadio](#getradio)**              | `roadnet`                            | Get radio frequencies for an airport identified by its road-network string.                         |
| **[getRunwayHeading](#getrunwayheading)** | `roadnet`                         | Return the magnetic heading of the primary runway for the given airport.                            |
| **[getRunwayList](#getrunwaylist)**    | `roadnet`                            | Return runway metadata: course, edge names and coordinates.                                         |
| **[getStandList](#getstandlist)**      | `roadnet`                            | Return a list of aircraft stands with locations.                                                    |
| **[getTechSkinByDate](#gettechskinbydate)** | `day, month`                    | Retrieve terrain “tech skin” (appearance) valid on the specified date.                              |
| **[getTempratureRangeByDate](#gettempraturerangebydate)** | `day, month`      | Return expected temperature range for the given day/month.                                          |
| **[getTerrainShpare](#getterrainshpare)** | —                                 | (Undocumented—likely returns shape data for terrain meshes.)                                        |
| **[isVisible](#isvisible)**            | `x1, alt1, y1, x2, alt2, y2`         | Raycast LOS check between two points at specified altitudes; returns `true` if unobstructed.        |

---
## Create

**Signature:**
```lua
Terrain.Create()
```
**Description:**  
***[UNVERIFIED]*** Instantiate or reset the terrain subsystem. Call this if you need to clear any existing terrain data before re-initializing or running a new mission.  
**Example:**
```lua
-- Start with a fresh terrain state
Terrain.Create()
```

---

## FindNearestPoint
**Signature:**
```lua
px, py = Terrain.FindNearestPoint(x, y, range)
```
**Parameters:**  
- `x, y` (number): world coordinates from which to search.  
- `range` (number): maximum search radius in meters.  
**Returns:**  
- `px, py` (number): coordinates of the nearest valid point (e.g. on a road).  
**Description:**  
***[UNVERIFIED]*** Searches outward up to `range` meters and returns the closest point on the specified network. Useful for snapping units to roads or paths.  
**Example:**
```lua
local playerX, playerY = 50000, 75000
local roadX, roadY = Terrain.FindNearestPoint(playerX, playerY, 2000)
print("Snap to road at:", roadX, roadY)
```

---

## FindOptimalPath
**Signature:**
```lua
pathTable = Terrain.FindOptimalPath(x1, y1, x2, y2)
```
**Parameters:**  
- `x1, y1` (number): start coordinates.  
- `x2, y2` (number): end coordinates.  
**Returns:**  
- `pathTable` (table): an array of `{ x = ..., y = ... }` waypoints along the optimal route (e.g. following roads).  
**Description:**  
***[UNVERIFIED]*** Runs a graph search (A* or Dijkstra) over the terrain network to produce a drivable path.  
**Example:**
```lua
local route = Terrain.FindOptimalPath(10000, 20000, 30000, 40000)
for i, pt in ipairs(route) do
  print(i, pt.x, pt.y)
end
```

---

## GetHeight
**Signature:**
```lua
h = Terrain.GetHeight(x, y)
```
**Parameters:**  
- `x, y` (number): query coordinates.  
**Returns:**  
- `h` (number): terrain elevation (meters above sea level).  
**Description:**  
Quickly sample the terrain elevation.  
**Example:**
```lua
local elev = Terrain.GetHeight(45000, 82000)
print("Elevation is", elev, "m")
```

---

## GetMGRScoordinates
**Signature:**
```lua
mgrs = Terrain.GetMGRScoordinates(x, y)
```
**Parameters:**  
- `x, y` (number): world coordinates.  
**Returns:**  
- `mgrs` (string): MGRS grid reference (e.g. "34TDF1234567890").  
**Description:**  
Convert from simulation-space meters to a human-readable MGRS coordinate.  
**Example:**
```lua
local gridRef = Terrain.GetMGRScoordinates(345000, 789000)
print("Grid:", gridRef)
```

---

## GetSeasons
**Signature:**
```lua
seasons = Terrain.GetSeasons()
```
**Returns:**  
- `seasons` (table): list of available season identifiers (e.g. { "winter", "summer", ... }).  
**Description:**  
***[UNVERIFIED]*** Fetch the set of seasons for which terrain textures and lighting are defined.  
**Example:**
```lua
for _, season in ipairs(Terrain.GetSeasons()) do
  print("Available season:", season)
end
```

---

## GetSurfaceHeightWithSeabed
**Signature:**
```lua
surfaceH, depth = Terrain.GetSurfaceHeightWithSeabed(x, y)
```
**Parameters:**  
- `x, y` (number): coordinates over water.  
**Returns:**  
- `surfaceH` (number): elevation of the water surface.  
- `depth` (number): depth from surface to seabed (positive number).  
**Description:**  
***[UNVERIFIED]*** Useful for amphibious operations to know both water level and bottom depth.  
**Example:**
```lua
local surf, d = Terrain.GetSurfaceHeightWithSeabed(20000, 15000)
print("Water at", surf, "m, seabed", d, "m below")
```

---

## GetSurfaceType
**Signature:**
```lua
stype = Terrain.GetSurfaceType(x, y)
```
**Parameters:**  
- `x, y` (number): query location.  
**Returns:**  
- `stype` (string): surface material. `"land"`, `"sea"`, `"lake"`, `"river"`  
**Description:**  
Detect what kind of surface occupies a coordinate.
**Example:**
```lua
local mat = Terrain.GetSurfaceType(10200, 20500)
print("Surface is", mat)
```

---

## GetTerrainConfig
**Signature:**
```lua
cfg = Terrain.GetTerrainConfig(type)
```
**Parameters:**  
- `type` (string): e.g. "Airdromes".  
**Returns:**  
- `cfg` (table): configuration block for that terrain element (bounds, default camera, etc.).  
**Description:**  
***[UNVERIFIED]*** Inspect built-in metadata for things like airfield layout.  
**Example:**
```lua
local airCfg = Terrain.GetTerrainConfig("Airdromes")
print("Airfield NE bound:", airCfg.NE_bound.x, airCfg.NE_bound.y)
```

---

## Init
**Signature:**
```lua
Terrain.Init(terrain_config, reason, date)
```
**Parameters:**  
- `terrain_config` (table)  
- `reason` (any)  
- `date` (table): { year=…, month=…, day=… }.  
**Description:**  
***[UNVERIFIED]*** none.  
**Example:**
```lua
local cfg = Terrain.GetTerrainConfig("Airdromes")
Terrain.Init(cfg, "mission_start", { year=2025, month=7, day=7 })
```

---

## InitLight
**Signature:**
```lua
Terrain.InitLight(terrain_config, reason, date)
```
**Parameters:**  
- `terrain_config` (table)  
- `reason` (any)  
- `date` (table): { year=…, month=…, day=… }.    
**Description:**  
***[UNVERIFIED]*** none.
**Example:**
```lua
Terrain.InitLight(airCfg, "time_change", { year=2025, month=12, day=1 })
```

---

## Release
**Signature:**
```lua
Terrain.Release()
```
**Description:**  
***[UNVERIFIED]*** none.  
**Example:**
```lua
Terrain.Release()
```

---

## convertLatLonToMeters
**Signature:**
```lua
x, y = Terrain.convertLatLonToMeters(lat, lon)
```
**Parameters:**  
- `lat, lon` (number): geographic coordinates in degrees.  
**Returns:**  
- `x, y` (number): simulation meters.  
**Description:**  
Project WGS84 lat/lon into the simulator’s local flat coordinate system.  
**Example:**
```lua
local mx, my = Terrain.convertLatLonToMeters(34.0522, -118.2437)
```

---

## convertMGRStoMeters
**Signature:**
```lua
x, y = Terrain.convertMGRStoMeters(mgrs)
```
**Parameters:**  
- `mgrs` (string): MGRS reference.  
**Returns:**  
- `x, y` (number): simulation meters.  
**Description:**  
Inverse of GetMGRScoordinates.  
**Example:**
```lua
local ux, uy = Terrain.convertMGRStoMeters("33TUN1234567890")
```

---

## convertMetersToLatLon
**Signature:**
```lua
lat, lon = Terrain.convertMetersToLatLon(x, y)
```
**Parameters:**  
- `x, y` (number): simulation coordinates.  
**Returns:**  
- `lat, lon` (number): geographic degrees.  
**Description:**  
Inverse map projection back to WGS84.  
**Example:**
```lua
local φ, λ = Terrain.convertMetersToLatLon(400000, 5000000)
```

---

## findPathOnRoads
**Signature:**
```lua
pathTable = Terrain.findPathOnRoads(type, x1, y1, x2, y2)
```
**Parameters:**  
- `type` (string): "roads" or "railroads".  
- `x1, y1`, `x2, y2` (number): endpoints.  
**Returns:**  
- `pathTable` (table): waypoint array.  
**Description:**  
***[UNVERIFIED]*** none.
**Example:**
```lua
local trainRoute = Terrain.findPathOnRoads("railroads", 1000, 2000, 8000, 9000)
```

---

## getBeacons
**Signature:**
```lua
beacons = Terrain.getBeacons()
```
**Returns:**  
- `beacons` (table): list of beacon objects, each with position and frequency.  
**Description:**  
Enumerate nav-beacons placed in the terrain.  
**Example:**
```lua
for _, b in ipairs(Terrain.getBeacons()) do
  print("Beacon", b.id, "at", b.x, b.y, "freq", b.freq)
end
```

---

## getClosestPointOnRoads
**Signature:**
```lua
px, py = Terrain.getClosestPointOnRoads(type, x, y)
```
**Parameters:**  
- `type` (string): "roads" or "railroads".  
- `x, y` (number): query point.  
**Returns:**  
- `px, py` (number): on-network coordinates.  
**Description:**  
***[UNVERIFIED]*** none.
**Example:**
```lua
local rx, ry = Terrain.getClosestPointOnRoads("roads", 12345, 67890)
```

---

## getClosestValidPoint
**Signature:**
```lua
px, py = Terrain.getClosestValidPoint(type, x, y)
```
**Parameters:**  
- `type` (string): e.g. "land".  
- `x, y` (number): input coords.  
**Returns:**  
- `px, py` (number): nearest valid location of that type.  
**Description:**  
***[UNVERIFIED]*** none.  
**Example:**
```lua
local fx, fy = Terrain.getClosestValidPoint("land", helicopterX, helicopterY)
```

---

## getCrossParam
**Signature:**
```lua
param = Terrain.getCrossParam()
```
**Returns:**  
- `param` (any): undocumented cross-parameter data.  
**Description:**  
Only for advanced use—internal terrain tuning.  
**Example:**
```lua
local cp = Terrain.getCrossParam()
print("Cross param:", cp)
```

---

## getObjectPosition
**Signature:**
```lua
ox, oy = Terrain.getObjectPosition(obj)
```
**Parameters:**  
- `obj` (Object): engine object reference.  
**Returns:**  
- `ox, oy` (number): its map position.  
**Description:**  
***[UNVERIFIED]*** none.  
**Example:**
```lua
local x, y = Terrain.getObjectPosition(myVehicle)
```

---

## getObjectsAtMapPoint
**Signature:**
```lua
list = Terrain.getObjectsAtMapPoint(mapX, mapY)
```
**Parameters:**  
- `mapX, mapY` (number): query location.  
**Returns:**  
- `list` (table): all objects overlapping that point.  
**Description:**  
***[UNVERIFIED]*** none.  
**Example:**
```lua
local objs = Terrain.getObjectsAtMapPoint(5000, 6000)
print("Found", #objs, "objects")
```

---

## getRadio
**Signature:**
```lua
radios = Terrain.getRadio(roadnet)
```
**Parameters:**  
- `roadnet` (string): airport identifier.  
**Returns:**  
- `radios` (table): frequency settings for that airfield’s comms.  
**Description:**  
Obtain tower/ground/approach frequencies.  
**Example:**
```lua
local freqs = Terrain.getRadio("KSFO_roadnet")
print(freqs.tower, freqs.ground)
```

---

## getRunwayHeading
**Signature:**
```lua
hdg = Terrain.getRunwayHeading(roadnet)
```
**Parameters:**  
- `roadnet` (string): airport ID.  
**Returns:**  
- `hdg` (number): magnetic heading of the primary runway.  
**Description:**  
Useful for HUD wind-correction and runway-alignment cues.  
**Example:**
```lua
local rHdg = Terrain.getRunwayHeading("RJTT_roadnet")
print("Runway heading:", rHdg)
```

---

## getRunwayList
**Signature:**
```lua
runways = Terrain.getRunwayList(roadnet)
```
**Parameters:**
- `roadnet` (string): airport ID.  
**Returns:**
- `runways` (table): each entry contains:
  - `course` (number): runway heading  
  - `edge1name` (string), `edge1x`, `edge1y` (number): name and coordinates of one end  
  - `edge2name` (string), `edge2x`, `edge2y` (number): name and coordinates of the opposite end  
**Description:**
Enumerate all runways at the specified airfield, returning their endpoints and headings.  
**Example:**
```lua
for _, rw in ipairs(Terrain.getRunwayList("EGLL_roadnet")) do
  print("RW", rw.edge1name, "to", rw.edge2name, "heading", rw.course)
end
```


---

## getStandList
**Signature:**
```lua
stands = Terrain.getStandList(roadnet)
```
**Parameters:**
- `roadnet` (string): airport ID.  
**Returns:**
- `stands` (table): list of parking stands with coordinates.  
**Description:**
Get gate and parking-spot positions.  
**Example:**
```lua
local gates = Terrain.getStandList("KDEN_roadnet")
print("First stand at", gates[1].x, gates[1].y)
```

---

## getTechSkinByDate
**Signature:**
```lua
skin = Terrain.getTechSkinByDate(day, month)
```
**Parameters:**
- `day, month` (number): calendar date.  
**Returns:**
- `skin` (any): texture/skin identifier valid on that day.  
**Description:**
Swap in historical or seasonal terrain skins.  
**Example:**
```lua
local tex = Terrain.getTechSkinByDate(15, 8)  -- August 15
```

---

## getTempratureRangeByDate
**Signature:**
```lua
minT, maxT = Terrain.getTempratureRangeByDate(day, month)
```
**Parameters:**
- `day, month` (number): date.  
**Returns:**
- `minT, maxT` (number): expected daily temperature extremes (°C).  
**Description:**
Drive weather models or engine performance tables.  
**Example:**
```lua
local lo, hi = Terrain.getTempratureRangeByDate(1, 12)
print("Dec 1 temps:", lo, "to", hi)
```

---

## getTerrainShpare
**Signature:**
```lua
shape = Terrain.getTerrainShpare()
```
**Returns:**
- `shape` (any): internal terrain mesh data.  
**Description:**
Undocumented; likely used for low-level mesh queries.  
**Example:**
```lua
local mesh = Terrain.getTerrainShpare()
```

---

## isVisible
**Signature:**
```lua
visible = Terrain.isVisible(x1, alt1, y1, x2, alt2, y2)
```
**Parameters:**
- `x1, y1, alt1` (number): start point and altitude.  
- `x2, y2, alt2` (number): end point and altitude.  
**Returns:**
- `visible` (boolean): `true` if line-of-sight is unobstructed.  
**Description:**
Perform a raycast through the terrain to check LOS.  
**Example:**
```lua
if Terrain.isVisible(10000, 50, 20000, 15000, 100, 25000) then
  print("Target in sight!")
end
```

