# Terrain Module

The following outlines DCS's Terrain module, used for interaction with maps in various ways.

!!! Warning
	In DCS, `x` is North, `y` is Elevation, `z` is East *in meters*

!!! Note
	Roadnet can be found in [get_terrain_related_data("Airdromes")](../../Stubs/DeviceStubs/#get_terrain_related_datafile) by iterating through the returned table, and taking `airport.roadnet` it should be a string as a filepath, just parse it straight to the function


---

## Loading the module
```lua
local Terrain = require("terrain")
```

## Functions

---
### Create {: .unverified-section }

**Signature:**  
???

**Description:**  
???

**Example:**  
???

---

### FindNearestPoint {: .unverified-section }
**Signature:**
```lua
px, pz = Terrain.FindNearestPoint(x, z, range)
```
**Parameters:**  
- `x, z` (number): world coordinates from which to search.  
- `range` (number): maximum search radius in meters.  

**Returns:**  
- `px, pz` (number): coordinates of the nearest valid point (e.g. on a road).  

**Description:**  
Searches outward up to `range` meters and returns the closest point on the specified network. Useful for snapping units to roads or paths.  
**Example:**
???

---

### FindOptimalPath {: .unverified-section }
**Signature:**
```lua
pathTable = Terrain.FindOptimalPath(x1, z1, x2, z2)
```

**Parameters:**  
- `x1, z1` (number): start coordinates.  
- `x2, z2` (number): end coordinates.  

**Returns:**  
??? 

**Description:**  
??? 

**Example:**  
???

---

### GetHeight
**Signature:**
```lua
h = Terrain.GetHeight(x, z)
```

**Parameters:**  
- `x, z` (number): query coordinates.  

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

### GetMGRScoordinates
**Signature:**
```lua
mgrs = Terrain.GetMGRScoordinates(x, z)
```

**Parameters:**  
- `x, z` (number): world coordinates. 

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

### GetSeasons {: .unverified-section }
**Signature:**
```lua
seasons = Terrain.GetSeasons()
```
**Returns:**  
- `seasons` (table): list of available season identifiers (e.g. { "winter", "summer", ... }).  

**Description:**  
Fetch the set of seasons for which terrain textures and lighting are defined.  

**Example:**
```lua
for _, season in ipairs(Terrain.GetSeasons()) do
  print("Available season:", season)
end
```

---

### GetSurfaceHeightWithSeabed {: .unverified-section }
**Signature:**
```lua
surfaceH, depth = Terrain.GetSurfaceHeightWithSeabed(x, z)
```

**Parameters:**  
- `x, z` (number): coordinates over water.  

**Returns:**  
- `surfaceH` (number): elevation of the water surface.  
- `depth` (number): depth from surface to seabed (positive number).  

**Description:**  
???

**Example:**
```lua
local surf, d = Terrain.GetSurfaceHeightWithSeabed(20000, 15000)
print("Water at", surf, "m, seabed", d, "m below")
```

---

### GetSurfaceType
**Signature:**
```lua
stype = Terrain.GetSurfaceType(x, z)
```

**Parameters:**  
- `x, z` (number): query location.

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

### GetTerrainConfig {: .unverified-section }
**Signature:**
```lua
cfg = Terrain.GetTerrainConfig(type)
```
**Parameters:**  
- `type` (string): e.g. "Airdromes".  

**Returns:**  
- `cfg` (table): configuration block for that terrain element (bounds, default camera, etc.).  

**Description:**  
???

**Example:**
???

---

### Init {: .unverified-section }
**Signature:**
```lua
Terrain.Init(terrain_config, reason, date)
```

**Parameters:**  
- `terrain_config` (table)  
- `reason` (any)  
- `date` (table): { year=…, month=…, day=… }.  

**Description:**  
???

**Example:**
???

---

### InitLight {: .unverified-section }
**Signature:**
```lua
Terrain.InitLight(terrain_config, reason, date)
```

**Parameters:**  
- `terrain_config` (table)  
- `reason` (any)  
- `date` (table): { year=…, month=…, day=… }.  

**Description:**  
???

**Example:**
???

---

### Release {: .unverified-section }

**Signature:**
```lua
Terrain.Release()
```

**Description:**  
???

**Example:**
???

---

### convertLatLonToMeters
**Signature:**
```lua
x, z = Terrain.convertLatLonToMeters(lat, lon)
```
**Parameters:**  
- `lat, lon` (number): geographic coordinates in degrees. 

**Returns:**  
- `x, z` (number): simulation meters.  

**Description:**  
Project WGS84 lat/lon into the simulator’s local flat coordinate system.  

**Example:**
```lua
local mx, mz = Terrain.convertLatLonToMeters(34.0522, -118.2437)
```

---

### convertMGRStoMeters
**Signature:**
```lua
x, z = Terrain.convertMGRStoMeters(mgrs)
```
**Parameters:**  
- `mgrs` (string): MGRS reference.

**Returns:**  
- `x, z` (number): simulation meters.  

**Description:**  
Inverse of GetMGRScoordinates. 

**Example:**
```lua
local ux, uy = Terrain.convertMGRStoMeters("33TUN1234567890")
```

---

### convertMetersToLatLon
**Signature:**
```lua
lat, lon = Terrain.convertMetersToLatLon(x, z)
```
**Parameters:**  
- `x, z` (number): simulation coordinates.  

**Returns:**  
- `lat, lon` (number): geographic degrees.  

**Description:**  
Inverse map projection back to WGS84.  

**Example:**
```lua
local lat, lon = Terrain.convertMetersToLatLon(400000, 5000000)
```

---

### findPathOnRoads {: .unverified-section }
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
???

**Example:**  
???

---

### getBeacons
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
  print("Beacon", b.id, "at", b.x, b.z, "freq", b.freq)
end
```

---

### getClosestPointOnRoads {: .unverified-section }
**Signature:**
```lua
px, pz = Terrain.getClosestPointOnRoads(type, x, z)
```

**Parameters:**  
- `type` (string): "roads" or "railroads".  
- `x, z` (number): query point. 

**Returns:**  
- `px, py` (number): on-network coordinates.  

**Description:**  
???

**Example:**  
???

---

### getClosestValidPoint {: .unverified-section }
**Signature:**
```lua
px, pz = Terrain.getClosestValidPoint(type, x, z)
```
**Parameters:**  
- `type` (string): e.g. "land".  
- `x, z` (number): input coords.  

**Returns:**  
- `px, pz` (number): nearest valid location of that type.  

**Description:**  
???

**Example:**  
???

---

### getCrossParam {: .unverified-section }
**Signature:**
```lua
param = Terrain.getCrossParam()
```
**Returns:**  
- `param` (any): undocumented cross-parameter data.  

**Description:**  
??? 

**Example:**  
??? 

---

### getObjectPosition {: .unverified-section }
**Signature:**
```lua
ox, oz = Terrain.getObjectPosition(obj)
```
**Parameters:**  
- `obj` (Object): engine object reference.  
**Returns:**  
- `ox, oz` (number): its map position.  

**Description:**  
???

**Example:**  
???

---

### getObjectsAtMapPoint {: .unverified-section }
**Signature:**
```lua
list = Terrain.getObjectsAtMapPoint(mapX, mapZ)
```
**Parameters:**  
- `mapX, mapZ` (number): query location.  

**Returns:**  
- `list` (table): all objects overlapping that point.  

**Description:**  
???

**Example:**
???

---

### getRadio
**Signature:**
```lua
radios = Terrain.getRadio(roadnet)
```
**Parameters:**  
- `roadnet` (string): see top of this page.  

**Returns:**  
- `radios` (table): frequency settings for that airfield’s comms.  

**Description:**  
Obtain tower/ground/approach frequencies.  

**Example:**
```lua
local freqs = Terrain.getRadio(roadnet) 
print(freqs.tower, freqs.ground)
```

---

### getRunwayHeading
**Signature:**
```lua
hdg = Terrain.getRunwayHeading(roadnet)
```

**Parameters:**  
- `roadnet` (string): see top of this page.  

**Returns:**  
- `hdg` (number): magnetic heading of the primary runway.

**Description:**  
Useful for HUD wind-correction and runway-alignment cues.  

**Example:**
```lua
local rHdg = Terrain.getRunwayHeading(roadnet)
print("Runway heading:", rHdg)
```

---

### getRunwayList
**Signature:**
```lua
runways = Terrain.getRunwayList(roadnet)
```
**Parameters:**  
- `roadnet` (string): see top of this page.  

**Returns:**  
- `runways` (table): each entry contains:
  - `course` (number): runway heading  
  - `edge1name` (string), `edge1x`, `edge1y` (number): name and coordinates of one end  
  - `edge2name` (string), `edge2x`, `edge2y` (number): name and coordinates of the opposite end  

**Description:**  
Enumerate all runways at the specified airfield, returning their endpoints and headings.  

**Example:**
```lua
for _, rw in ipairs(Terrain.getRunwayList(roadnet)) do -- 
  print("RW", rw.edge1name, "to", rw.edge2name, "heading", rw.course)
end
```

---

### getStandList {: .unverified-section }
**Signature:**
```lua
stands = Terrain.getStandList(roadnet)
```
**Parameters:**  
- `roadnet` (string): see top of this file

**Returns:**  
- `stands` (table): list of parking stands with coordinates.  

**Description:**  
Get gate and parking-spot positions.  

**Example:**
```lua
local gates = Terrain.getStandList(roadnet)
print("First stand at", gates[1].x, gates[1].z)
```

---

### getTechSkinByDate {: .unverified-section }
**Signature:**
```lua
skin = Terrain.getTechSkinByDate(day, month)
```
**Parameters:**  
- `day, month` (number): calendar date.  

**Returns:**  
- `skin` (any): texture/skin identifier valid on that day.  

**Description:**  
???

**Example:**
???

---

### getTempratureRangeByDate {: .unverified-section }
**Signature:**
```lua
minT, maxT = Terrain.getTempratureRangeByDate(day, month)
```
**Parameters:**  
- `day, month` (number): date.  

**Returns:**  
- `minT, maxT` (number): expected daily temperature extremes (°C).  

**Description:**  
???

**Example:**
???

---

### getTerrainShpare {: .unverified-section }
**Signature:**
```lua
shape = Terrain.getTerrainShpare()
```
**Returns:**  
- `shape` (any): internal terrain mesh data.  ???

**Description:**  
???

**Example:**  
???

!!! Note
	Shpare is not a typo, but I have no clue what this does

---

### isVisible
**Signature:**
```lua
visible = Terrain.isVisible(x1, y1, z1, x2, y2, z2)
```
**Parameters:**  
- `x1, y1, z1` (number): start point and altitude.  
- `x2, y2, z2` (number): end point and altitude.  

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

