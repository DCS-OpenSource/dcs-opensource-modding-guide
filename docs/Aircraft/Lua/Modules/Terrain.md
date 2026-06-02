# Terrain Module

The Terrain module provides access to DCS map, coordinate, road, runway, and terrain-query functions.

!!! warning
    In DCS, `x` is north, `y` is elevation, and `z` is east, all in meters.

!!! note
    `roadnet` can be found from `get_terrain_related_data("Airdromes")` by iterating through the returned table and reading `airport.roadnet`. It should be a filepath string that can be passed directly to the roadnet functions below.

## Loading the Module

```lua
local Terrain = require("terrain")
```

## Functions

---

### `Create` {: .unverified-section }

Unknown.

```lua
Terrain.Create(...)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `...` | `unknown` | Unknown | Unknown. |

| Return | Type | Description |
|--------|------|-------------|
| `unknown` | `unknown` | Unknown. |

---

### `FindNearestPoint` {: .unverified-section }

Searches outward up to `range` meters and returns the closest point on the specified network.

```lua
px, pz = Terrain.FindNearestPoint(x, z, range)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | World-space X coordinate to search from. |
| `z` | `number` | Yes | World-space Z coordinate to search from. |
| `range` | `number` | Yes | Maximum search radius in meters. |

| Return | Type | Description |
|--------|------|-------------|
| `px` | `number` | X coordinate of the nearest valid point. |
| `pz` | `number` | Z coordinate of the nearest valid point. |

---

### `FindOptimalPath` {: .unverified-section }

Unknown.

```lua
pathTable = Terrain.FindOptimalPath(x1, z1, x2, z2)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x1` | `number` | Yes | Start X coordinate. |
| `z1` | `number` | Yes | Start Z coordinate. |
| `x2` | `number` | Yes | End X coordinate. |
| `z2` | `number` | Yes | End Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `pathTable` | `table` | Unknown path data. |

---

### `GetHeight`

Samples terrain elevation at a world-space coordinate.

```lua
h = Terrain.GetHeight(x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | World-space X coordinate. |
| `z` | `number` | Yes | World-space Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `h` | `number` | Terrain elevation in meters above sea level. |

```lua
local elev = Terrain.GetHeight(45000, 82000)
print("Elevation is", elev, "m")
```

---

### `GetMGRScoordinates`

Converts from simulation-space meters to a human-readable MGRS coordinate.

```lua
mgrs = Terrain.GetMGRScoordinates(x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | World-space X coordinate. |
| `z` | `number` | Yes | World-space Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `mgrs` | `string` | MGRS grid reference, for example `"34TDF1234567890"`. |

```lua
local gridRef = Terrain.GetMGRScoordinates(345000, 789000)
print("Grid:", gridRef)
```

---

### `GetSeasons` {: .unverified-section }

Fetches the set of seasons for which terrain textures and lighting are defined.

```lua
seasons = Terrain.GetSeasons()
```

| Return | Type | Description |
|--------|------|-------------|
| `seasons` | `table` | List of available season identifiers, for example `{ "winter", "summer" }`. |

```lua
for _, season in ipairs(Terrain.GetSeasons()) do
  print("Available season:", season)
end
```

---

### `GetSurfaceHeightWithSeabed` {: .unverified-section }

Returns water-surface elevation and seabed depth for a coordinate.

```lua
surfaceH, depth = Terrain.GetSurfaceHeightWithSeabed(x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | World-space X coordinate over water. |
| `z` | `number` | Yes | World-space Z coordinate over water. |

| Return | Type | Description |
|--------|------|-------------|
| `surfaceH` | `number` | Elevation of the water surface. |
| `depth` | `number` | Depth from surface to seabed as a positive number. |

```lua
local surf, d = Terrain.GetSurfaceHeightWithSeabed(20000, 15000)
print("Water at", surf, "m, seabed", d, "m below")
```

---

### `GetSurfaceType`

Detects what kind of surface occupies a coordinate.

```lua
stype = Terrain.GetSurfaceType(x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | World-space X coordinate. |
| `z` | `number` | Yes | World-space Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `stype` | `string` | Surface material, such as `"land"`, `"sea"`, `"lake"`, or `"river"`. |

```lua
local mat = Terrain.GetSurfaceType(10200, 20500)
print("Surface is", mat)
```

---

### `GetTerrainConfig` {: .unverified-section }

Returns a terrain configuration block for a terrain element type.

```lua
cfg = Terrain.GetTerrainConfig(type)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Terrain element type, for example `"Airdromes"`. |

| Return | Type | Description |
|--------|------|-------------|
| `cfg` | `table` | Configuration block for that terrain element. |

---

### `Init` {: .unverified-section }

Unknown.

```lua
Terrain.Init(terrain_config, reason, date)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `terrain_config` | `table` | Yes | Terrain configuration. |
| `reason` | `any` | Yes | Unknown. |
| `date` | `table` | Yes | Date table, for example `{ year = 2026, month = 5, day = 27 }`. |

| Return | Type | Description |
|--------|------|-------------|
| `nil` | `nil` | This function does not appear to return a value. |

---

### `InitLight` {: .unverified-section }

Unknown.

```lua
Terrain.InitLight(terrain_config, reason, date)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `terrain_config` | `table` | Yes | Terrain configuration. |
| `reason` | `any` | Yes | Unknown. |
| `date` | `table` | Yes | Date table, for example `{ year = 2026, month = 5, day = 27 }`. |

| Return | Type | Description |
|--------|------|-------------|
| `nil` | `nil` | This function does not appear to return a value. |

---

### `Release` {: .unverified-section }

Unknown.

```lua
Terrain.Release()
```

| Return | Type | Description |
|--------|------|-------------|
| `nil` | `nil` | This function does not appear to return a value. |

---

### `convertLatLonToMeters`

Projects WGS84 latitude and longitude into the simulator's local flat coordinate system.

```lua
x, z = Terrain.convertLatLonToMeters(lat, lon)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Latitude in degrees. |
| `lon` | `number` | Yes | Longitude in degrees. |

| Return | Type | Description |
|--------|------|-------------|
| `x` | `number` | Simulation-space X coordinate in meters. |
| `z` | `number` | Simulation-space Z coordinate in meters. |

```lua
local mx, mz = Terrain.convertLatLonToMeters(34.0522, -118.2437)
```

---

### `convertMGRStoMeters`

Converts an MGRS grid reference into simulation-space meters.

```lua
x, z = Terrain.convertMGRStoMeters(mgrs)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mgrs` | `string` | Yes | MGRS grid reference. |

| Return | Type | Description |
|--------|------|-------------|
| `x` | `number` | Simulation-space X coordinate in meters. |
| `z` | `number` | Simulation-space Z coordinate in meters. |

```lua
local x, z = Terrain.convertMGRStoMeters("33TUN1234567890")
```

---

### `convertMetersToLatLon`

Projects simulation-space meters back to WGS84 latitude and longitude.

```lua
lat, lon = Terrain.convertMetersToLatLon(x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | Simulation-space X coordinate in meters. |
| `z` | `number` | Yes | Simulation-space Z coordinate in meters. |

| Return | Type | Description |
|--------|------|-------------|
| `lat` | `number` | Latitude in degrees. |
| `lon` | `number` | Longitude in degrees. |

```lua
local lat, lon = Terrain.convertMetersToLatLon(400000, 5000000)
```

---

### `findPathOnRoads` {: .unverified-section }

Unknown.

```lua
pathTable = Terrain.findPathOnRoads(type, x1, y1, x2, y2)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Road network type, such as `"roads"` or `"railroads"`. |
| `x1` | `number` | Yes | Start X coordinate. |
| `y1` | `number` | Yes | Start Y coordinate. |
| `x2` | `number` | Yes | End X coordinate. |
| `y2` | `number` | Yes | End Y coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `pathTable` | `table` | Waypoint array. |

---

### `getBeacons`

Enumerates navigation beacons placed in the terrain.

```lua
beacons = Terrain.getBeacons()
```

| Return | Type | Description |
|--------|------|-------------|
| `beacons` | `table` | List of beacon objects, each with position and frequency data. |

```lua
for _, b in ipairs(Terrain.getBeacons()) do
  print("Beacon", b.id, "at", b.x, b.z, "freq", b.freq)
end
```

---

### `getClosestPointOnRoads` {: .unverified-section }

Unknown.

```lua
px, pz = Terrain.getClosestPointOnRoads(type, x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Road network type, such as `"roads"` or `"railroads"`. |
| `x` | `number` | Yes | Query X coordinate. |
| `z` | `number` | Yes | Query Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `px` | `number` | X coordinate on the network. |
| `pz` | `number` | Z coordinate on the network. |

---

### `getClosestValidPoint` {: .unverified-section }

Unknown.

```lua
px, pz = Terrain.getClosestValidPoint(type, x, z)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Valid location type, for example `"land"`. |
| `x` | `number` | Yes | Input X coordinate. |
| `z` | `number` | Yes | Input Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `px` | `number` | X coordinate of the nearest valid location. |
| `pz` | `number` | Z coordinate of the nearest valid location. |

---

### `getCrossParam` {: .unverified-section }

Unknown.

```lua
param = Terrain.getCrossParam()
```

| Return | Type | Description |
|--------|------|-------------|
| `param` | `any` | Undocumented cross-parameter data. |

---

### `getObjectPosition` {: .unverified-section }

Unknown.

```lua
ox, oz = Terrain.getObjectPosition(obj)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `Object` | Yes | Engine object reference. |

| Return | Type | Description |
|--------|------|-------------|
| `ox` | `number` | Object X map position. |
| `oz` | `number` | Object Z map position. |

---

### `getObjectsAtMapPoint` {: .unverified-section }

Unknown.

```lua
list = Terrain.getObjectsAtMapPoint(mapX, mapZ)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mapX` | `number` | Yes | Query X coordinate. |
| `mapZ` | `number` | Yes | Query Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `list` | `table` | Objects overlapping that map point. |

---

### `getRadio`

Obtains tower, ground, and approach frequencies for an airfield.

```lua
radios = Terrain.getRadio(roadnet)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `roadnet` | `string` | Yes | Roadnet filepath. See the note at the top of this page. |

| Return | Type | Description |
|--------|------|-------------|
| `radios` | `table` | Frequency settings for that airfield's communications. |

```lua
local freqs = Terrain.getRadio(roadnet)
print(freqs.tower, freqs.ground)
```

---

### `getRunwayHeading`

Returns the magnetic heading of the primary runway.

```lua
hdg = Terrain.getRunwayHeading(roadnet)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `roadnet` | `string` | Yes | Roadnet filepath. See the note at the top of this page. |

| Return | Type | Description |
|--------|------|-------------|
| `hdg` | `number` | Magnetic heading of the primary runway. |

```lua
local rHdg = Terrain.getRunwayHeading(roadnet)
print("Runway heading:", rHdg)
```

---

### `getRunwayList`

Enumerates all runways at the specified airfield.

```lua
runways = Terrain.getRunwayList(roadnet)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `roadnet` | `string` | Yes | Roadnet filepath. See the note at the top of this page. |

| Return | Type | Description |
|--------|------|-------------|
| `runways` | `table` | Runway entries with endpoint names, endpoint coordinates, and heading data. |

Each runway entry may include:

| Field | Type | Description |
|-------|------|-------------|
| `course` | `number` | Runway heading. |
| `edge1name` | `string` | Name of one end of the runway. |
| `edge1x` | `number` | X coordinate of one end of the runway. |
| `edge1y` | `number` | Y coordinate of one end of the runway. |
| `edge2name` | `string` | Name of the opposite end of the runway. |
| `edge2x` | `number` | X coordinate of the opposite end of the runway. |
| `edge2y` | `number` | Y coordinate of the opposite end of the runway. |

```lua
for _, rw in ipairs(Terrain.getRunwayList(roadnet)) do
  print("RW", rw.edge1name, "to", rw.edge2name, "heading", rw.course)
end
```

---

### `getStandList` {: .unverified-section }

Gets gate and parking-spot positions.

```lua
stands = Terrain.getStandList(roadnet)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `roadnet` | `string` | Yes | Roadnet filepath. See the note at the top of this page. |

| Return | Type | Description |
|--------|------|-------------|
| `stands` | `table` | List of parking stands with coordinates. |

```lua
local gates = Terrain.getStandList(roadnet)
print("First stand at", gates[1].x, gates[1].z)
```

---

### `getTechSkinByDate` {: .unverified-section }

Unknown.

```lua
skin = Terrain.getTechSkinByDate(day, month)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | `number` | Yes | Calendar day. |
| `month` | `number` | Yes | Calendar month. |

| Return | Type | Description |
|--------|------|-------------|
| `skin` | `any` | Texture or skin identifier valid on that day. |

---

### `getTempratureRangeByDate` {: .unverified-section }

Unknown.

```lua
minT, maxT = Terrain.getTempratureRangeByDate(day, month)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | `number` | Yes | Calendar day. |
| `month` | `number` | Yes | Calendar month. |

| Return | Type | Description |
|--------|------|-------------|
| `minT` | `number` | Expected minimum daily temperature in degrees Celsius. |
| `maxT` | `number` | Expected maximum daily temperature in degrees Celsius. |

---

### `getTerrainShpare` {: .unverified-section }

Unknown.

```lua
shape = Terrain.getTerrainShpare()
```

| Return | Type | Description |
|--------|------|-------------|
| `shape` | `any` | Internal terrain mesh data. |

!!! note
    `Shpare` is not a typo, but its purpose is currently unknown.

---

### `isVisible`

Performs a raycast through the terrain to check line of sight.

```lua
visible = Terrain.isVisible(x1, y1, z1, x2, y2, z2)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x1` | `number` | Yes | Start X coordinate. |
| `y1` | `number` | Yes | Start elevation. |
| `z1` | `number` | Yes | Start Z coordinate. |
| `x2` | `number` | Yes | End X coordinate. |
| `y2` | `number` | Yes | End elevation. |
| `z2` | `number` | Yes | End Z coordinate. |

| Return | Type | Description |
|--------|------|-------------|
| `visible` | `boolean` | `true` if line of sight is unobstructed. |

```lua
if Terrain.isVisible(10000, 50, 20000, 15000, 100, 25000) then
  print("Target in sight!")
end
```
