# lfs Module

Filesystem helpers exposed by DCS.

## Functions

---

### `add_location` {: .unverified-section }

Unknown.

```lua
lfs.add_location()
```

---

### `attributes` {: .unverified-section }

Returns a table of file attributes.

```lua
attrs = lfs.attributes(path, attribute)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File or directory path. |
| `attribute` | `string` | Yes | Attribute to query. |

| Return | Type | Description |
|--------|------|-------------|
| `attrs` | `table` | File attributes, such as `mode`, `modification`, and `size`. |

---

### `chdir` {: .unverified-section }

Changes the current directory.

```lua
lfs.chdir(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path. |

---

### `create_lockfile` {: .unverified-section }

Unknown.

```lua
lfs.create_lockfile()
```

---

### `currentdir` {: .unverified-section }

Returns the install directory.

```lua
path = lfs.currentdir()
```

| Return | Type | Description |
|--------|------|-------------|
| `path` | `string` | Install directory. |

---

### `del_location` {: .unverified-section }

Unknown.

```lua
lfs.del_location()
```

---

### `dir` {: .unverified-section }

Returns files and directories in the specified path.

```lua
entries = lfs.dir(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path. |

| Return | Type | Description |
|--------|------|-------------|
| `entries` | `table` | Files and directories in the path. |

---

### `locations` {: .unverified-section }

Returns available drives.

```lua
drives = lfs.locations()
```

| Return | Type | Description |
|--------|------|-------------|
| `drives` | `table` | Available drives. |

---

### `md5sum` {: .unverified-section }

Returns the MD5 hash of a file.

```lua
hash = lfs.md5sum(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File path. |

| Return | Type | Description |
|--------|------|-------------|
| `hash` | `string` | MD5 hash. |

---

### `mkdir` {: .unverified-section }

Creates a directory.

```lua
lfs.mkdir(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path. |

---

### `normpath` {: .unverified-section }

Returns the normalized path.

```lua
normalized = lfs.normpath(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to normalize. |

| Return | Type | Description |
|--------|------|-------------|
| `normalized` | `string` | Normalized path. |

---

### `realpath` {: .unverified-section }

Returns the absolute path of a file.

```lua
absolute = lfs.realpath(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File path. |

| Return | Type | Description |
|--------|------|-------------|
| `absolute` | `string` | Absolute path. |

---

### `rmdir` {: .unverified-section }

Removes a directory.

```lua
lfs.rmdir(path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path. |

---

### `tempdir` {: .unverified-section }

Returns the DCS temporary directory.

```lua
path = lfs.tempdir()
```

| Return | Type | Description |
|--------|------|-------------|
| `path` | `string` | Temporary directory, usually `AppData\Local\Temp\DCS`. |

---

### `writedir` {: .unverified-section }

Returns the Saved Games directory.

```lua
path = lfs.writedir()
```

| Return | Type | Description |
|--------|------|-------------|
| `path` | `string` | Saved Games directory path. |
