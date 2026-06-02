# utils Module

Utility functions and constants exposed by DCS.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `COLOR` | `table` | Color table. |
| `PI` | `number` | Pi constant. |
| `units` | `table` | Units of measurement. |

## Functions

---

### `adv_round` {: .unverified-section }

Unknown.

```lua
value = utils.adv_round(value, maxAccuracy)
```

---

### `angleDegrees` {: .unverified-section }

Unknown.

```lua
value = utils.angleDegrees(dd, mm, ss)
```

---

### `bitor` {: .unverified-section }

Unknown.

```lua
value = utils.bitor(x, y)
```

---

### `copyTable` {: .unverified-section }

Unknown.

```lua
utils.copyTable(dest, src)
```

---

### `createTableCopy` {: .unverified-section }

Unknown.

```lua
copy = utils.createTableCopy(src)
```

---

### `dofileIn` {: .unverified-section }

Executes a file in a supplied environment.

```lua
result, errmsg = utils.dofileIn(filename, env)
```

---

### `dofileInEx` {: .unverified-section }

Executes a file in a supplied environment with a base table.

```lua
utils.dofileInEx(filename, env, base)
```

---

### `getTime` {: .unverified-section }

Returns hours, minutes, and seconds for a duration.

```lua
hours, minutes, seconds = utils.getTime(sec)
```

---

### `get_azimuth` {: .unverified-section }

Unknown.

```lua
azimuth = utils.get_azimuth(vec)
```

---

### `get_elevation` {: .unverified-section }

Unknown.

```lua
elevation = utils.get_elevation(vec)
```

---

### `get_lengthZX` {: .unverified-section }

Unknown.

```lua
length = utils.get_lengthZX(vec)
```

---

### `get_vec_length` {: .unverified-section }

Unknown.

```lua
length = utils.get_vec_length(vec)
```

---

### `hasbit` {: .unverified-section }

Unknown.

```lua
enabled = utils.hasbit(x, p)
```

---

### `invertColor` {: .unverified-section }

Unknown.

```lua
color = utils.invertColor(color)
```

---

### `loadfileIn` {: .unverified-section }

Loads a file into a compiled chunk with the given environment.

```lua
chunk, errmsg = utils.loadfileIn(filename, env)
```

!!! note
    Parameters passed when calling the chunk are accessible with `...` in the script.

---

### `makeColor` {: .unverified-section }

Unknown.

```lua
color = utils.makeColor(r, g, b)
```

---

### `parseCordinates` {: .unverified-section }

Returns latitude, longitude, and course parsed from a string.

```lua
latitude, longitude, course = utils.parseCordinates(str)
```

---

### `round` {: .unverified-section }

Unknown.

```lua
value = utils.round(value, accuracy)
```

---

### `round_qty` {: .unverified-section }

Unknown.

```lua
value = utils.round_qty(qty)
```

---

### `verifyChunk` {: .unverified-section }

Verifies a compiled chunk.

```lua
utils.verifyChunk(chunk, errmsg)
```

!!! note
    Performs a nil check and otherwise raises an error.
