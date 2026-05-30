## CreateGauge(type)

**Açıklama**
Animasyon argümanlarını sürmek için bir gauge nesnesi oluşturur.

**Parametreler**

| Ad | Tip | Açıklama |
|----|-----|----------|
| `type` | `string | nil` | Gauge tipi: `nil`, `"parameter"`, `"cycled"` veya `"external_arg"` |

**Dönüş**
`Gauge` - Yeni bir gauge nesnesi.

---

## Gauge (class)

**Açıklama**
Kokpit gauge animasyonunun yapılandırmasını açıklar.

| Alan | Tip | Açıklama |
|------|-----|----------|
| `arg_number` | `number` | Animasyonlandırılacak argument numarası. |
| `input` | `table` | Controller veya parametreden gelen input aralığı (örn. `{0, 1}`). |
| `output` | `table` | Argument için output animasyon aralığı (örn. `{0, 1}`). |
| `controller` | `userdata | nil` | `nil`/`cycled` tipleri için controller nesnesi (`LoRegisterPanelControls` üzerinden). |
| `params` | `table | nil` | Controller fonksiyonu için parametreler. |
| `parameter_name` | `string | nil` | `"parameter"` tipi için parametre adı. |
| `cycle_value` | `number | nil` | `"cycled"` tipi için cycle değeri. |
| `external_arg` | `number | nil` | `"external_arg"` tipi için harici argument numarası. |

---

### Gauge Örneği

#### Controller Kullanımı
```lua
vsi = CreateGauge()
vsi.arg_number = 48
vsi.input = {-6000*ft_to_meter/60, 6000*ft_to_meter/60}
vsi.output = {-1, 1}
vsi.controller = controllers.base_gauge_VerticalVelocity
```

#### Parametre Kullanımı
```lua
CurrTime_hours                     = CreateGauge("parameter")
CurrTime_hours.parameter_name      = "CURRTIME_HOURS"
CurrTime_hours.arg_number          = 440
CurrTime_hours.input               = {0.0, 12.0}
CurrTime_hours.output              = {1.0, -1.0}
```

---

## LoRegisterPanelControls()

**Açıklama**
Uçak için kayıtlı main panel controller listesini döndürür.

**Dönüş**
`MainPanelControls` - Tüm kayıtlı panel kontrollerini temsil eden userdata nesnesi.

---

## MainPanelControls (class)

**Açıklama**
`LoRegisterPanelControls()` tarafından döndürülür. Bu nesne mevcut tüm kokpit kontrol animasyonlarını ve bağlı gauge'lerini sunar.

### Alanlar

| Alan Adı | Tip | Açıklama |
|----------|-----|----------|
| `Panel_Rot_X` | `userdata` | Panel X ekseni dönüşü |
| `Panel_Shake_Y` | `userdata` | Panel Y ekseni sarsıntısı |
| `Panel_Shake_Z` | `userdata` | Panel Z ekseni sarsıntısı |
| `base_gauge_AngleOfAttack` | `userdata` | Gauge: Angle of Attack |
| `base_gauge_AngleOfSlide` | `userdata` | Gauge: Angle of Slide |
| `base_gauge_BarometricAltitude` | `userdata` | Gauge: Barometric Altitude |
| `base_gauge_CanopyPos` | `userdata` | Gauge: Canopy Position |
| `base_gauge_CanopyState` | `userdata` | Gauge: Canopy State |
| `base_gauge_EngineLeftFuelConsumption` | `userdata` | Gauge: Sol motor yakıt tüketimi |
| `base_gauge_EngineLeftRPM` | `userdata` | Gauge: Sol motor RPM |
| `base_gauge_EngineLeftTemperatureBeforeTurbine` | `userdata` | Gauge: Sol motor türbin öncesi sıcaklık |
| `base_gauge_EngineRightFuelConsumption` | `userdata` | Gauge: Sağ motor yakıt tüketimi |
| `base_gauge_EngineRightRPM` | `userdata` | Gauge: Sağ motor RPM |
| `base_gauge_EngineRightTemperatureBeforeTurbine` | `userdata` | Gauge: Sağ motor türbin öncesi sıcaklık |
| `base_gauge_FlapsPos` | `userdata` | Gauge: Flap pozisyonu |
| `base_gauge_FlapsRetracted` | `userdata` | Gauge: Flap toplu |
| `base_gauge_Heading` | `userdata` | Gauge: Heading |
| `base_gauge_HelicopterCollective` | `userdata` | Gauge: Helikopter collective |
| `base_gauge_HelicopterCorrection` | `userdata` | Gauge: Helikopter correction |
| `base_gauge_HorizontalAcceleration` | `userdata` | Gauge: Yatay ivme |
| `base_gauge_IndicatedAirSpeed` | `userdata` | Gauge: Indicated airspeed |
| `base_gauge_LandingGearHandlePos` | `userdata` | Gauge: İniş takımı kol pozisyonu |
| `base_gauge_LateralAcceleration` | `userdata` | Gauge: Lateral ivme |
| `base_gauge_LeftMainLandingGearDown` | `userdata` | Gauge: Sol ana iniş takımı aşağı |
| `base_gauge_LeftMainLandingGearUp` | `userdata` | Gauge: Sol ana iniş takımı yukarı |
| `base_gauge_MachNumber` | `userdata` | Gauge: Mach number |
| `base_gauge_MagneticHeading` | `userdata` | Gauge: Magnetic heading |
| `base_gauge_NoseLandingGearDown` | `userdata` | Gauge: Burun iniş takımı aşağı |
| `base_gauge_NoseLandingGearUp` | `userdata` | Gauge: Burun iniş takımı yukarı |
| `base_gauge_Pitch` | `userdata` | Gauge: Pitch |
| `base_gauge_RadarAltitude` | `userdata` | Gauge: Radar altitude |
| `base_gauge_RateOfPitch` | `userdata` | Gauge: Pitch rate |
| `base_gauge_RateOfRoll` | `userdata` | Gauge: Roll rate |
| `base_gauge_RateOfYaw` | `userdata` | Gauge: Yaw rate |
| `base_gauge_RightMainLandingGearDown` | `userdata` | Gauge: Sağ ana iniş takımı aşağı |
| `base_gauge_RightMainLandingGearUp` | `userdata` | Gauge: Sağ ana iniş takımı yukarı |
| `base_gauge_Roll` | `userdata` | Gauge: Roll |
| `base_gauge_RudderPosition` | `userdata` | Gauge: Rudder pozisyonu |
| `base_gauge_SpeedBrakePos` | `userdata` | Gauge: Speed brake pozisyonu |
| `base_gauge_StickPitchPosition` | `userdata` | Gauge: Stick pitch pozisyonu |
| `base_gauge_StickRollPosition` | `userdata` | Gauge: Stick roll pozisyonu |
| `base_gauge_ThrottleLeftPosition` | `userdata` | Gauge: Sol throttle pozisyonu |
| `base_gauge_ThrottleRightPosition` | `userdata` | Gauge: Sağ throttle pozisyonu |
| `base_gauge_TotalFuelWeight` | `userdata` | Gauge: Toplam yakıt ağırlığı |
| `base_gauge_TrueAirSpeed` | `userdata` | Gauge: True airspeed |
| `base_gauge_VerticalAcceleration` | `userdata` | Gauge: Dikey ivme |
| `base_gauge_VerticalVelocity` | `userdata` | Gauge: Dikey hız |
| `base_gauge_WOW_LeftMainLandingGear` | `userdata` | Gauge: Sol ana weight-on-wheels |
| `base_gauge_WOW_NoseLandingGear` | `userdata` | Gauge: Burun weight-on-wheels |
| `base_gauge_WOW_RightMainLandingGear` | `userdata` | Gauge: Sağ ana weight-on-wheels |
| `canopy` | `userdata` | Canopy animation controller |
| `day_night_texture_switcher` | `userdata` | Gece/gündüz texture toggle |
| `head_shift_X` | `userdata` | Head shift X controller |
| `head_shift_Y` | `userdata` | Head shift Y controller |
| `head_shift_Z` | `userdata` | Head shift Z controller |
| `mirrors_draw` | `userdata` | Mirror draw durumu |
| `pilot_draw` | `userdata` | Pilot görünürlüğü |

---
