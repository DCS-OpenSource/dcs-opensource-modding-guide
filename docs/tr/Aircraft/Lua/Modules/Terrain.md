# Terrain Modülü

Aşağıdaki bölüm, haritalarla çeşitli şekillerde etkileşim kurmak için kullanılan DCS Terrain modülünü özetler.

!!! Warning
    DCS içinde `x` Kuzey, `y` İrtifa, `z` Doğu anlamına gelir ve birim *metredir*.

!!! Note
    Roadnet, [get_terrain_related_data("Airdromes")](../Stubs/DeviceStubs.md/#get_terrain_related_datafile) içinde dönen tablo üzerinden iterasyon yapıp `airport.roadnet` alınarak bulunabilir. Bu değer dosya yolu olarak string olmalıdır; doğrudan fonksiyona parse edin.

---

## Modülü Yükleme

```lua
local Terrain = require("terrain")
```

## Fonksiyonlar

---

### Create {: .unverified-section }

**İmza:**
???

**Açıklama:**
???

**Örnek:**
???

---

### FindNearestPoint {: .unverified-section }

**İmza:**
```lua
px, pz = Terrain.FindNearestPoint(x, z, range)
```

**Parametreler:**
- `x, z` (number): Aramaya başlanacak dünya koordinatları.
- `range` (number): Metre cinsinden maksimum arama yarıçapı.

**Dönüş:**
- `px, pz` (number): En yakın geçerli noktanın koordinatları (örn. yol üzerinde).

**Açıklama:**
`range` metreye kadar dışa doğru arar ve belirtilen network üzerindeki en yakın noktayı döndürür. Unit'leri yollara veya path'lere snap etmek için yararlıdır.

**Örnek:**
???

---

### FindOptimalPath {: .unverified-section }

**İmza:**
```lua
pathTable = Terrain.FindOptimalPath(x1, z1, x2, z2)
```

**Parametreler:**
- `x1, z1` (number): Başlangıç koordinatları.
- `x2, z2` (number): Bitiş koordinatları.

**Dönüş:**
???

**Açıklama:**
???

**Örnek:**
???

---

### GetHeight

**İmza:**
```lua
h = Terrain.GetHeight(x, z)
```

**Parametreler:**
- `x, z` (number): Sorgu koordinatları.

**Dönüş:**
- `h` (number): Terrain elevation (deniz seviyesinden metre).

**Açıklama:**
Terrain elevation değerini hızlıca örnekler.

**Örnek:**
```lua
local elev = Terrain.GetHeight(45000, 82000)
print("Elevation is", elev, "m")
```

---

### GetMGRScoordinates

**İmza:**
```lua
mgrs = Terrain.GetMGRScoordinates(x, z)
```

**Parametreler:**
- `x, z` (number): Dünya koordinatları.

**Dönüş:**
- `mgrs` (string): MGRS grid referansı (örn. `"34TDF1234567890"`).

**Açıklama:**
Simülasyon alanındaki metre değerlerini insan tarafından okunabilir MGRS koordinatına dönüştürür.

**Örnek:**
```lua
local gridRef = Terrain.GetMGRScoordinates(345000, 789000)
print("Grid:", gridRef)
```

---

### GetSeasons {: .unverified-section }

**İmza:**
```lua
seasons = Terrain.GetSeasons()
```

**Dönüş:**
- `seasons` (table): Mevcut sezon tanımlayıcılarının listesi (örn. `{ "winter", "summer", ... }`).

**Açıklama:**
Terrain texture'ları ve aydınlatmanın tanımlı olduğu sezon kümesini alır.

**Örnek:**
```lua
for _, season in ipairs(Terrain.GetSeasons()) do
  print("Available season:", season)
end
```

---

### GetSurfaceHeightWithSeabed {: .unverified-section }

**İmza:**
```lua
surfaceH, depth = Terrain.GetSurfaceHeightWithSeabed(x, z)
```

**Parametreler:**
- `x, z` (number): Su üzerindeki koordinatlar.

**Dönüş:**
- `surfaceH` (number): Su yüzeyinin elevation değeri.
- `depth` (number): Yüzeyden deniz tabanına derinlik (pozitif sayı).

**Açıklama:**
???

**Örnek:**
```lua
local surf, d = Terrain.GetSurfaceHeightWithSeabed(20000, 15000)
print("Water at", surf, "m, seabed", d, "m below")
```

---

### GetSurfaceType

**İmza:**
```lua
stype = Terrain.GetSurfaceType(x, z)
```

**Parametreler:**
- `x, z` (number): Sorgu konumu.

**Dönüş:**
- `stype` (string): Surface material. `"land"`, `"sea"`, `"lake"`, `"river"`

**Açıklama:**
Bir koordinatta hangi yüzey tipinin bulunduğunu algılar.

**Örnek:**
```lua
local mat = Terrain.GetSurfaceType(10200, 20500)
print("Surface is", mat)
```

---

### GetTerrainConfig {: .unverified-section }

**İmza:**
```lua
cfg = Terrain.GetTerrainConfig(type)
```

**Parametreler:**
- `type` (string): Örn. `"Airdromes"`.

**Dönüş:**
- `cfg` (table): İlgili terrain element'i için configuration block (bounds, default camera vb.).

**Açıklama:**
???

**Örnek:**
???

---

### Init {: .unverified-section }

**İmza:**
```lua
Terrain.Init(terrain_config, reason, date)
```

**Parametreler:**
- `terrain_config` (table)
- `reason` (any)
- `date` (table): `{ year=..., month=..., day=... }`.

**Açıklama:**
???

**Örnek:**
???

---

### InitLight {: .unverified-section }

**İmza:**
```lua
Terrain.InitLight(terrain_config, reason, date)
```

**Parametreler:**
- `terrain_config` (table)
- `reason` (any)
- `date` (table): `{ year=..., month=..., day=... }`.

**Açıklama:**
???

**Örnek:**
???

---

### Release {: .unverified-section }

**İmza:**
```lua
Terrain.Release()
```

**Açıklama:**
???

**Örnek:**
???

---

### convertLatLonToMeters

**İmza:**
```lua
x, z = Terrain.convertLatLonToMeters(lat, lon)
```

**Parametreler:**
- `lat, lon` (number): Derece cinsinden coğrafi koordinatlar.

**Dönüş:**
- `x, z` (number): Simülasyon metreleri.

**Açıklama:**
WGS84 lat/lon değerlerini simülatörün lokal düz koordinat sistemine projekte eder.

**Örnek:**
```lua
local mx, mz = Terrain.convertLatLonToMeters(34.0522, -118.2437)
```

---

### convertMGRStoMeters

**İmza:**
```lua
x, z = Terrain.convertMGRStoMeters(mgrs)
```

**Parametreler:**
- `mgrs` (string): MGRS referansı.

**Dönüş:**
- `x, z` (number): Simülasyon metreleri.

**Açıklama:**
`GetMGRScoordinates` fonksiyonunun tersidir.

**Örnek:**
```lua
local ux, uy = Terrain.convertMGRStoMeters("33TUN1234567890")
```

---

### convertMetersToLatLon

**İmza:**
```lua
lat, lon = Terrain.convertMetersToLatLon(x, z)
```

**Parametreler:**
- `x, z` (number): Simülasyon koordinatları.

**Dönüş:**
- `lat, lon` (number): Coğrafi derece değerleri.

**Açıklama:**
Harita projeksiyonunu tekrar WGS84'e çevirir.

**Örnek:**
```lua
local lat, lon = Terrain.convertMetersToLatLon(400000, 5000000)
```

---

### findPathOnRoads {: .unverified-section }

**İmza:**
```lua
pathTable = Terrain.findPathOnRoads(type, x1, y1, x2, y2)
```

**Parametreler:**
- `type` (string): `"roads"` veya `"railroads"`.
- `x1, y1`, `x2, y2` (number): Uç noktalar.

**Dönüş:**
- `pathTable` (table): Waypoint array'i.

**Açıklama:**
???

**Örnek:**
???

---

### getBeacons

**İmza:**
```lua
beacons = Terrain.getBeacons()
```

**Dönüş:**
- `beacons` (table): Her biri konum ve frekansa sahip beacon nesnelerinin listesi.

**Açıklama:**
Terrain içine yerleştirilmiş nav beacon'ları listeler.

**Örnek:**
```lua
for _, b in ipairs(Terrain.getBeacons()) do
  print("Beacon", b.id, "at", b.x, b.z, "freq", b.freq)
end
```

---

### getClosestPointOnRoads {: .unverified-section }

**İmza:**
```lua
px, pz = Terrain.getClosestPointOnRoads(type, x, z)
```

**Parametreler:**
- `type` (string): `"roads"` veya `"railroads"`.
- `x, z` (number): Sorgu noktası.

**Dönüş:**
- `px, py` (number): Network üzerindeki koordinatlar.

**Açıklama:**
???

**Örnek:**
???

---

### getClosestValidPoint {: .unverified-section }

**İmza:**
```lua
px, pz = Terrain.getClosestValidPoint(type, x, z)
```

**Parametreler:**
- `type` (string): Örn. `"land"`.
- `x, z` (number): Input koordinatları.

**Dönüş:**
- `px, pz` (number): Bu tipe ait en yakın geçerli konum.

**Açıklama:**
???

**Örnek:**
???

---

### getCrossParam {: .unverified-section }

**İmza:**
```lua
param = Terrain.getCrossParam()
```

**Dönüş:**
- `param` (any): Dokümante edilmemiş cross-parameter verisi.

**Açıklama:**
???

**Örnek:**
???

---

### getObjectPosition {: .unverified-section }

**İmza:**
```lua
ox, oz = Terrain.getObjectPosition(obj)
```

**Parametreler:**
- `obj` (Object): Engine object referansı.

**Dönüş:**
- `ox, oz` (number): Nesnenin harita konumu.

**Açıklama:**
???

**Örnek:**
???

---

### getObjectsAtMapPoint {: .unverified-section }

**İmza:**
```lua
list = Terrain.getObjectsAtMapPoint(mapX, mapZ)
```

**Parametreler:**
- `mapX, mapZ` (number): Sorgu konumu.

**Dönüş:**
- `list` (table): Bu noktayla örtüşen tüm nesneler.

**Açıklama:**
???

**Örnek:**
???

---

### getRadio

**İmza:**
```lua
radios = Terrain.getRadio(roadnet)
```

**Parametreler:**
- `roadnet` (string): Bu sayfanın başına bakın.

**Dönüş:**
- `radios` (table): İlgili airfield comms frekans ayarları.

**Açıklama:**
Tower/ground/approach frekanslarını alır.

**Örnek:**
```lua
local freqs = Terrain.getRadio(roadnet) 
print(freqs.tower, freqs.ground)
```

---

### getRunwayHeading

**İmza:**
```lua
hdg = Terrain.getRunwayHeading(roadnet)
```

**Parametreler:**
- `roadnet` (string): Bu sayfanın başına bakın.

**Dönüş:**
- `hdg` (number): Birincil runway'in magnetic heading değeri.

**Açıklama:**
HUD wind-correction ve runway-alignment cue'ları için yararlıdır.

**Örnek:**
```lua
local rHdg = Terrain.getRunwayHeading(roadnet)
print("Runway heading:", rHdg)
```

---

### getRunwayList

**İmza:**
```lua
runways = Terrain.getRunwayList(roadnet)
```

**Parametreler:**
- `roadnet` (string): Bu sayfanın başına bakın.

**Dönüş:**
- `runways` (table): Her entry şunları içerir:
  - `course` (number): Runway heading
  - `edge1name` (string), `edge1x`, `edge1y` (number): Bir ucun adı ve koordinatları
  - `edge2name` (string), `edge2x`, `edge2y` (number): Karşı ucun adı ve koordinatları

**Açıklama:**
Belirtilen airfield içindeki tüm runway'leri, uç noktalarını ve heading değerlerini döndürerek listeler.

**Örnek:**
```lua
for _, rw in ipairs(Terrain.getRunwayList(roadnet)) do -- 
  print("RW", rw.edge1name, "to", rw.edge2name, "heading", rw.course)
end
```

---

### getStandList {: .unverified-section }

**İmza:**
```lua
stands = Terrain.getStandList(roadnet)
```

**Parametreler:**
- `roadnet` (string): Bu dosyanın başına bakın.

**Dönüş:**
- `stands` (table): Koordinatlarıyla birlikte parking stand listesi.

**Açıklama:**
Gate ve parking spot konumlarını alır.

**Örnek:**
```lua
local gates = Terrain.getStandList(roadnet)
print("First stand at", gates[1].x, gates[1].z)
```

---

### getTechSkinByDate {: .unverified-section }

**İmza:**
```lua
skin = Terrain.getTechSkinByDate(day, month)
```

**Parametreler:**
- `day, month` (number): Takvim tarihi.

**Dönüş:**
- `skin` (any): O gün geçerli texture/skin tanımlayıcısı.

**Açıklama:**
???

**Örnek:**
???

---

### getTempratureRangeByDate {: .unverified-section }

**İmza:**
```lua
minT, maxT = Terrain.getTempratureRangeByDate(day, month)
```

**Parametreler:**
- `day, month` (number): Tarih.

**Dönüş:**
- `minT, maxT` (number): Beklenen günlük sıcaklık uç değerleri (°C).

**Açıklama:**
???

**Örnek:**
???

---

### getTerrainShpare {: .unverified-section }

**İmza:**
```lua
shape = Terrain.getTerrainShpare()
```

**Dönüş:**
- `shape` (any): Dahili terrain mesh verisi. ???

**Açıklama:**
???

**Örnek:**
???

!!! Note
    Shpare yazım hatası değildir, ama ne yaptığını bilmiyorum.

---

### isVisible

**İmza:**
```lua
visible = Terrain.isVisible(x1, y1, z1, x2, y2, z2)
```

**Parametreler:**
- `x1, y1, z1` (number): Başlangıç noktası ve altitude.
- `x2, y2, z2` (number): Bitiş noktası ve altitude.

**Dönüş:**
- `visible` (boolean): Line-of-sight engellenmemişse `true`.

**Açıklama:**
LOS kontrolü için terrain üzerinden raycast yapar.

**Örnek:**
```lua
if Terrain.isVisible(10000, 50, 20000, 15000, 100, 25000) then
  print("Target in sight!")
end
```
