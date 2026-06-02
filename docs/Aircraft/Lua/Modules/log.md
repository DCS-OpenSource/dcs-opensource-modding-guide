# log Module

Logging helpers. This module is also available in `autoexec.cfg`.

## Constants

| Constant | Type |
|----------|------|
| `ALERT` | `number` |
| `ALL` | `number` |
| `ASYNC` | `number` |
| `DEBUG` | `number` |
| `ERROR` | `number` |
| `FULL` | `number` |
| `IMMEDIATE` | `number` |
| `INFO` | `number` |
| `LEVEL` | `number` |
| `MESSAGE` | `number` |
| `MODULE` | `number` |
| `RELIABLE` | `number` |
| `THREAD` | `number` |
| `TIME` | `number` |
| `TIME_LOCAL` | `number` |
| `TIME_RELATIVE` | `number` |
| `TIME_UTC` | `number` |
| `TRACE` | `number` |
| `WARNING` | `number` |

## Functions

---

### `alert` {: .unverified-section }

Logs an alert message.

```lua
log.alert(message)
```

---

### `debug` {: .unverified-section }

Logs a debug message.

```lua
log.debug(message)
```

---

### `error` {: .unverified-section }

Logs an error message.

```lua
log.error(message)
```

---

### `info` {: .unverified-section }

Logs an info message.

```lua
log.info(message)
```

---

### `set_output` {: .unverified-section }

Configures logger output.

```lua
log.set_output(filename, subsystem, level_mask, output_mode)
```

!!! note
    `level_mask` is the sum of log levels. `output_mode` is the sum of output flags.

---

### `set_output_rules` {: .unverified-section }

Unknown.

```lua
log.set_output_rules(...)
```

---

### `warning` {: .unverified-section }

Logs a warning message.

```lua
log.warning(message)
```

---

### `write` {: .unverified-section }

Sends a formatted message to the logger.

```lua
log.write(subsystem, loglevel, message, ...)
```

!!! note
    If arguments are supplied after `message`, the actual string is formed as `string.format(message, ...)`.
