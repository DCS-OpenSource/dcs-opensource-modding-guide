# Temel Lua ilkeleri

Bu bölüm, DCS Lua betikleri yazmak için gereken bazı temel kavramları özetler.

---

## Param Handle'lar

Param handle'lar; cihazlar arasında, cihazlardan göstergelere veya cihazlardan EFM'ye bilgi aktarma yönteminizdir.
Bunlar "global değişkenler" gibi davranır ve aşağıda anlatılan getter/setter fonksiyonlarıyla erişilebilir.

Parametreler sayı veya string olabilir.

!!! Note
    Bu rehber parametrelerin yalnızca Lua tarafına değinir. EFM içinde parametre değerlerini alma örnekleri template EFM'lerde bulunabilir.

### Param handle oluşturma

Bir param nesnesi şu şekilde oluşturulur:
```lua
local dcPower = get_param_handle("DC_POWER_ON")
```

Başka bir cihaz içinde `get_param_handle("DC_POWER_ON")` çağırmak, aynı parametre değerine oradan da erişmenizi sağlar.
`get_param_handle()` fonksiyonu, [:get()](#param-handle-okuma) ve [:set()](#param-handle-yazma) fonksiyonlarını içeren bir tablo döndürür.

---

### Param handle okuma

Bir param handle'ın değeri `param:get()` çağrısıyla okunabilir.
```lua
local dcPower = get_param_handle("DC_POWER_ON")

local value == dcPower:get()
```

---

### Param handle yazma

Bir param handle'ın değeri `param:set(value)` çağrısıyla ayarlanabilir.
```lua
local dcPower = get_param_handle("DC_POWER_ON")

-- pseudo power switch on
dcPower:set(1)
dcPower:set("true")  -- String based example

-- pseudo power switch off
dcPower:set(0)
dcPower:set("false") -- String based example
```

---

### Param handle debug etme

Oyun çalışırken tüm parametreleri listeleyen bir debug penceresine erişebilirsiniz.

Bkz. [show_param_handles_list()](Stubs/DeviceStubs.md/#show_param_handles_listenable)

---

### Parametrelerde kaçınılması gerekenler

!!! Warning
    Bir parametreye string atarsanız ve string yalnızca sayılardan oluşuyorsa (ör. `"1234"`), parametre tekrar sayıya döner.
    Bunun bir bug mı yoksa özellik mi olduğundan emin değilim; dikkatli olmazsanız oyunun çökmesine yol açabilecek durumlar oluşabilir.
    Aşağıdaki örneğe bakın:

```lua
-- Param Type reset example
local param = get_param_handle("TEST")

local testString = "1234"

print_message_to_user(tostring(type(testString))) -- "string" ("1234")
param:set(testString) -- all number string is converted back to int.
print_message_to_user(tostring(type(param:get()))) -- "int" (1234)
```

---
