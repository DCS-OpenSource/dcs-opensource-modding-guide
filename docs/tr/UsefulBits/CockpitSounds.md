# Kokpit Sesleri

Bkz. `DCSWorld/Sounds/sdef/_example.sdef`

!!! Note
    Bu bölüm kapı açma, alarm, uyarı, müzik vb. özel iç sesler içindir.
    Sounder'lar ve harici/motor sesleri daha sonra başka yerde ele alınacaktır (TODO).

## Kontrol Listesi

* Ses dosyaları
* SDEF'ler
* `post_initialize` ile yükleme
* Play fonksiyonları

---

## Kurulum

### Ses dosyaları

`.wav` (belki `.ogg`, TODO kontrol et) dosyalarınızı `Sounds/Effects/Aircrafts/{PLANENAME}/Cockpit/` içine yerleştirin.

---

### SDEF'ler

Her ses için bir SDEF dosyası oluşturmanız gerekir. SDEF'ler `Sounds/sdef/Aircrafts/{PLANENAME}/Cockpit/` içinde bulunur.

**Örnek .sdef dosyası**

Rehber için bunu test etmekte kullanılan demo dosya: `CockpitAshtrayClose.sdef`

```
wave = "Effects/Aircrafts/AH1G/Cockpit/Cockpit_ashtray_close_03"
inner_radius = 10
outer_radius = 100
gain = 1
```

Burada `wave`, istenen sese giden path ile eşleşmelidir (sounds klasöründen başlayarak).

---

### Ses Başlatma

Sesler Lua cihazlarınızdaki `post_initialize()` fonksiyonunda yüklenir. En azından cihaz başına bir host gerekir; ardından aşağıdaki gibi o host'a sesler eklersiniz.

```lua
function post_initialize()
    sndhost         = create_sound_host("COCKPIT_ARMS","HEADPHONES",0,0,0) -- Name, type ("2D", "3D", "HEADPHONES"), position x, y, z
    AshtrayCloseSND = sndhost:create_sound("Aircrafts/AH1G/Cockpit/CockpitAshtrayClose") -- Path to SDEF file, relative to Sounds/sdef/
    AshtrayOpenSND  = sndhost:create_sound("Aircrafts/AH1G/Cockpit/CockpitAshtrayOpen")
end
```

---

### Ses Tetikleme

```lua
-- In SetCommand() or update()
-- detect trigger then
AshtrayOpenSND:play_once() -- will play the .wav file start to finish once
```

Daha fazla fonksiyon mevcuttur, ancak bunları test etmedim. Örneklerle genişletmekten çekinmeyin.

```lua
soundObject:stop()          -- stops playing sound
soundObject:play_continue() -- plays/continues to play sound
soundObject:update(pitch, volume, ???)        -- unsure what third param is
soundObject:is_playing()    -- returns true if sound playing
```

---

## Clickable Sesler

TODO

`sounds.lua`, `sounds_init.lua` vb. dosyalara dikkat edin.
