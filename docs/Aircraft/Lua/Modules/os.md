# os Module

DCS-exposed `os` helpers.

## Functions

---

### `clock` {: .unverified-section }

Returns the time in seconds.

```lua
seconds = os.clock()
```

---

### `date` {: .unverified-section }

Returns the current date.

```lua
date = os.date()
```

---

### `difftime` {: .unverified-section }

Returns the difference between two times.

```lua
delta = os.difftime(t2, t1)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `t2` | `number` | Yes | Later time. |
| `t1` | `number` | Yes | Earlier time. |

---

### `execute` {: .unverified-section }

Executes a command.

```lua
result = os.execute(command)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | Command to execute. |

---

### `getenv` {: .unverified-section }

Returns the value of an environment variable.

```lua
value = os.getenv(var)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `var` | `string` | Yes | Environment variable name. |

---

### `open_uri` {: .unverified-section }

Opens a URI.

```lua
os.open_uri(uri)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uri` | `string` | Yes | URI to open. |

---

### `remove` {: .unverified-section }

Removes a file.

```lua
os.remove(filename)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `string` | Yes | File to remove. |

---

### `time` {: .unverified-section }

Returns the current time.

```lua
time = os.time()
```
