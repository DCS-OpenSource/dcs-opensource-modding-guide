# DCS: OpenSource NavDataPlugin Wiki'ye hoş geldiniz!

## Giriş

Bu doküman, DCS'ten gelen ham verileri kullanarak güçlü bir navigasyon sisteminin backend'ini oluşturmak için kurulum yönergeleri ve dokümantasyon içerir.

**Bu neden var?**
DCS Lua içinde bunu kendiniz oluşturmak için gereken tüm fonksiyonlar açık olsa da dağınık ve dokümante edilmemiştir. Bu plugin veri toplama işini sizin için yapar ve her şeyi tek büyük tabloda birleştirerek süreci sadeleştirir.

---

## Özellikler

* Havalimanı verisi
* Beacon verisi
* Supplemental Data replacement (eksik DCS verisini tamamlamak veya mevcut veriyi ezmek için)
* Menzile göre sıralama gibi çeşitli yararlı işler için yardımcı fonksiyonlar

---

## İndirme ve Kurulum Rehberi

### .git submodule
1. Terminalinizde `Cockpit/Scripts/` klasörüne gidin
2. `git submodule add https://github.com/DCS-OpenSource/NavDataPlugin.git` komutunu çalıştırın
3. Submodule dosyasını repository'nize commit edin

### Manuel Kurulum
1. En son release'i indirin (`.zip`, source code değil)
2. Zip'i açın ve klasörü `Cockpit/Scripts/` içine yerleştirin
3. `Nav.lua` için göreli yolun `Cockpit/Scripts/NavDataPlugin/Nav.lua` olduğunu doğrulayın

---

## NavdataPlugin Yapılandırması

```lua
-- This allows the use of require statements. require uses . instead of / for folder sepparators.
-- Require only loads the lua once saving loading time.
package.path = package.path..";"..LockOn_Options.script_path.."?.lua"
package.path = package.path..";"..LockOn_Options.common_script_path.."?.lua"

require("NavDataPlugin.Nav")
```

## Fonksiyon Ayrıntıları

---

### get_ILS_beacons()

**Açıklama**
`beacons` dosyasındaki tüm ILS beacon'larını döndürür.

**ILS Beacon Tipleri**

| Beacon Tipi | Integer Değeri |
|-------------|:--------------:|
| `BEACON_TYPE_ILS_LOCALIZER` | 16640 |
| `BEACON_TYPE_ILS_GLIDESLOPE` | 16896 |
| `BEACON_TYPE_ILS_FAR_HOMER` | 16408 |
| `BEACON_TYPE_ILS_NEAR_HOMER` | 16424 |

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| _none_ | `nil` | |

**Dönüş**
`table: ILS_beacons` - Haritadaki ILS beacon'larının tablosu

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

**Açıklama**
`beacons` dosyasındaki tüm TCN beacon'larını döndürür.

**TCN Beacon Tipleri**

| Beacon Tipi | Integer Değeri |
|-------------|:--------------:|
| `BEACON_TYPE_TACAN` | 4 |
| `BEACON_TYPE_VORTAC` | 5 |

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| _none_ | `nil` | |

**Dönüş**
`table: TCN_beacons` - Haritadaki TCN beacon'larının tablosu

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

**Açıklama**
`beacons` dosyasındaki tüm VOR beacon'larını döndürür.

**VOR Beacon Tipleri**

| Beacon Tipi | Integer Değeri |
|-------------|:--------------:|
| `BEACON_TYPE_VOR` | 1 |
| `BEACON_TYPE_VOR_DME` | 2 |
| `BEACON_TYPE_VORTAC` | 5 |

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| _none_ | `nil` | |

**Dönüş**
`table: VOR_beacons` - Haritadaki VOR beacon'larının tablosu

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

**Açıklama**
Haritadaki tüm havalimanlarını ek filtrelenmiş verilerle döndürür.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| _none_ | `nil` | |

**Dönüş**
`table: Filtered Airport Data` - Havalimanı verisi tablosu

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

**Açıklama**
[`getAirports()`](#getairports) ile aynı veriyi döndürür, ancak oyuncuya veya tanımlı başka bir noktaya olan mesafeye göre sıralar.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `ownPos` | `table` | `{[1] = x, [2] = y}` kullanıcının mevcut konumu |

**Dönüş**
`table: Filtered Airport Data` - Havalimanı verisi tablosu

```lua
Nellis = {
    -- All the same as getAirports() with the addition of two new fields
    distanceToPlayerNM = 15.6 -- Distance from player to point in NM
    bearingToPlayer = 330 -- Bearing from player in degrees
  },
```

---

## Veri Tamamlama

DCS'in sağladığı veri özellikle bazı haritalardaki radyolar konusunda çoğu zaman kusursuz değildir. Nellis (NTTR) ve Caucasus beklendiği gibi çalışır; ancak ED görünüşe göre bu haritalardan sonra TDK'yı güncellediği için radyo gibi veriler bazen gizli/erişilemez olur.

Bunu aşmak için dinamik olarak alınan bilgileri düzenlemek üzere ek veri ekleme yöntemi ekledim.

### Veri tamamlama kurulumu

* `Cockpit/Scripts/` klasörünüzde `NavDataPluginExtra` adlı yeni bir klasör oluşturun.
* Her harita için alt klasör oluşturun; ad theatre adıyla eşleşmelidir.
    * Theatre adını şu şekilde alabilirsiniz:
    * NTTR için örnek yol `Cockpit/Scripts/NavDataPluginExtra/Nevada/` olur.

```lua
do_mission_file("mission") -- Load the mission file
local theatre = mission.theatre -- map name string
```

* Yeni klasörde `theatreName.lua` adlı bir dosya oluşturun (bu örnekte `Nevada.lua`).
* Aşağıdakileri dosyaya yapıştırın:

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

* Formatla eşleştiğiniz sürece her değeri düzenleyebilirsiniz.
    * Radio supplement örneği:

```lua
["Groom Lake"] = { -- Area 51
    name = "Homey Airport",
    radios = {
        uniform = 250.05,
        victor = 118.00,
    }
}
```

* Dosya varsa veri otomatik tamamlanır; ekstra fonksiyon çağrısı gerekmez.

---
