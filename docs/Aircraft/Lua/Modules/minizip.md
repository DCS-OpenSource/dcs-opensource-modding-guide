# minizip Module

Miz archive helpers. Use with `require("minizip")`.

## Functions

---

### `unzClose` {: .unverified-section }

Closes a miz file.

```lua
minizip.unzClose()
```

---

### `unzGetCurrentFileName` {: .unverified-section }

Returns the current file name while iterating a miz file.

```lua
filename = minizip.unzGetCurrentFileName()
```

---

### `unzGoToFirstFile` {: .unverified-section }

Sets the iterator to the first file in the miz.

```lua
minizip.unzGoToFirstFile()
```

---

### `unzGoToNextFile` {: .unverified-section }

Sets the iterator to the next file in the miz.

```lua
found = minizip.unzGoToNextFile()
```

| Return | Type | Description |
|--------|------|-------------|
| `found` | `boolean` | `false` when there are no more files. |

---

### `unzLocateFile` {: .unverified-section }

Locates a file in the miz and sets the iterator to it.

```lua
found = minizip.unzLocateFile(filename)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `string` | Yes | File to locate inside the miz. |

| Return | Type | Description |
|--------|------|-------------|
| `found` | `boolean` | `false` if not found. |

---

### `unzOpen` {: .unverified-section }

Opens a miz.

```lua
archive = minizip.unzOpen(filename, mode)
```

!!! note
    Mode `"rb"` is known. It is unclear whether `"w"` works.

---

### `unzReadAllCurrentFile` {: .unverified-section }

Returns the content of the current file.

```lua
content = minizip.unzReadAllCurrentFile()
```

---

### `unzUnpackCurrentFile` {: .unverified-section }

Unpacks the current file to a path.

```lua
ok = minizip.unzUnpackCurrentFile(path)
```

| Return | Type | Description |
|--------|------|-------------|
| `ok` | `boolean` | `true` on success. |

---

### `zipAddFile` {: .unverified-section }

Adds a file from disk to the miz.

```lua
ok = minizip.zipAddFile(fileInMiz, path)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileInMiz` | `string` | Yes | Destination path inside the miz. |
| `path` | `string` | Yes | Source path on disk. |

| Return | Type | Description |
|--------|------|-------------|
| `ok` | `boolean` | `true` on success. |

---

### `zipAppend` {: .unverified-section }

Unknown.

```lua
minizip.zipAppend(...)
```

---

### `zipClose` {: .unverified-section }

Closes a miz file.

```lua
minizip.zipClose()
```

---

### `zipCreate` {: .unverified-section }

Creates a miz.

```lua
archive = minizip.zipCreate(filename)
```

| Return | Type | Description |
|--------|------|-------------|
| `archive` | `minizip` | Created miz archive handle. |
