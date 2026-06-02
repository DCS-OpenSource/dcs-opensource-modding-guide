# net Module

Network and multiplayer helpers.

!!! note
    See also `DCS World\API\DCS_ControlAPI.md`.

## Constants

| Constant | Type |
|----------|------|
| `CHAT_ALL` | `number` |
| `CHAT_TEAM` | `number` |
| `ERR_BAD_CALLSIGN` | `number` |
| `ERR_BANNED` | `number` |
| `ERR_CONNECT_FAILED` | `number` |
| `ERR_DENIED_TRIAL_ONLY` | `number` |
| `ERR_INVALID_ADDRESS` | `number` |
| `ERR_INVALID_PASSWORD` | `number` |
| `ERR_KICKED` | `number` |
| `ERR_NOT_ALLOWED` | `number` |
| `ERR_PROTOCOL_ERROR` | `number` |
| `ERR_REFUSED` | `number` |
| `ERR_SERVER_FULL` | `number` |
| `ERR_TAINTED_CLIENT` | `number` |
| `ERR_THATS_OKAY` | `number` |
| `ERR_TIMEOUT` | `number` |
| `ERR_WRONG_VERSION` | `number` |
| `GAME_MODE_CONQUEST` | `number` |
| `GAME_MODE_LAST_MAN_STANDING` | `number` |
| `GAME_MODE_MISSION` | `number` |
| `GAME_MODE_TEAM_DEATH_MATCH` | `number` |
| `PS_CAR` | `number` |
| `PS_CRASH` | `number` |
| `PS_EJECT` | `number` |
| `PS_EXTRA_ALLY_AAA` | `number` |
| `PS_EXTRA_ALLY_FIGHTERS` | `number` |
| `PS_EXTRA_ALLY_SAM` | `number` |
| `PS_EXTRA_ALLY_TRANSPORTS` | `number` |
| `PS_EXTRA_ALLY_TROOPS` | `number` |
| `PS_EXTRA_ENEMY_AAA` | `number` |
| `PS_EXTRA_ENEMY_FIGHTERS` | `number` |
| `PS_EXTRA_ENEMY_SAM` | `number` |
| `PS_EXTRA_ENEMY_TRANSPORTS` | `number` |
| `PS_EXTRA_ENEMY_TROOPS` | `number` |
| `PS_LAND` | `number` |
| `PS_PING` | `number` |
| `PS_PLANE` | `number` |
| `PS_SCORE` | `number` |
| `PS_SHIP` | `number` |
| `RESUME_MANUAL` | `number` |
| `RESUME_ON_LOAD` | `number` |
| `RESUME_WITH_CLIENTS` | `number` |

## Functions

---

### `banlist_add` {: .unverified-section }

Unknown.

```lua
net.banlist_add(...)
```

---

### `banlist_add_by_ucid` {: .unverified-section }

Unknown.

```lua
net.banlist_add_by_ucid(...)
```

---

### `banlist_get` {: .unverified-section }

Unknown.

```lua
net.banlist_get(...)
```

---

### `banlist_remove` {: .unverified-section }

Unknown.

```lua
net.banlist_remove(...)
```

---

### `check_ic_requirements` {: .unverified-section }

Unknown.

```lua
net.check_ic_requirements(...)
```

---

### `check_password` {: .unverified-section }

Unknown.

```lua
net.check_password(...)
```

---

### `dostring_in` {: .unverified-section }

Executes a Lua string in a specified Lua environment within the game.

```lua
result = net.dostring_in(environment, code)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `environment` | `string` | Yes | Environment, such as `config`, `mission`, or `export`. |
| `code` | `string` | Yes | Lua code to execute. |

---

### `force_player_slot` {: .unverified-section }

Forces a player into a specified slot.

```lua
ok = net.force_player_slot(playerID, sideId, slotId)
```

---

### `get_chat_history` {: .unverified-section }

Unknown.

```lua
net.get_chat_history(...)
```

---

### `get_default_server_settings` {: .unverified-section }

Unknown.

```lua
net.get_default_server_settings(...)
```

---

### `get_my_player_id` {: .unverified-section }

Returns the local player ID. Returns `1` for the server.

```lua
playerID = net.get_my_player_id()
```

---

### `get_name` {: .unverified-section }

Returns the name of a player.

```lua
name = net.get_name(playerID)
```

---

### `get_player_info` {: .unverified-section }

Returns player attributes, or a specific attribute if provided.

```lua
info = net.get_player_info(playerID, attribute)
```

---

### `get_player_list` {: .unverified-section }

Returns a list of players currently connected to the server.

```lua
players = net.get_player_list()
```

---

### `get_server_host` {: .unverified-section }

Unknown.

```lua
net.get_server_host(...)
```

---

### `get_server_id` {: .unverified-section }

Returns the player ID of the server. Currently always `1`.

```lua
serverID = net.get_server_id()
```

---

### `get_server_settings` {: .unverified-section }

Unknown.

```lua
net.get_server_settings(...)
```

---

### `get_server_uptime` {: .unverified-section }

Unknown.

```lua
net.get_server_uptime(...)
```

---

### `get_session_history` {: .unverified-section }

Unknown.

```lua
net.get_session_history(...)
```

---

### `get_slot` {: .unverified-section }

Returns the side ID and slot ID of a player.

```lua
sideId, slotId = net.get_slot(playerID)
```

---

### `get_stat` {: .unverified-section }

Returns a specific statistic from a player.

```lua
stat = net.get_stat(playerID, statID)
```

---

### `hash_password` {: .unverified-section }

Unknown.

```lua
net.hash_password(...)
```

---

### `is_loopback_address` {: .unverified-section }

Unknown.

```lua
net.is_loopback_address(...)
```

---

### `is_private_address` {: .unverified-section }

Unknown.

```lua
net.is_private_address(...)
```

---

### `json2lua` {: .unverified-section }

Converts a JSON string to a Lua value.

```lua
value = net.json2lua(json)
```

---

### `kick` {: .unverified-section }

Kicks a player from the server with an optional message.

```lua
ok = net.kick(playerId, message)
```

---

### `load_mission` {: .unverified-section }

Unknown.

```lua
net.load_mission(...)
```

---

### `load_next_mission` {: .unverified-section }

Unknown.

```lua
net.load_next_mission(...)
```

---

### `log` {: .unverified-section }

Writes an `INFO` entry to the DCS log file.

```lua
net.log(message)
```

---

### `lua2json` {: .unverified-section }

Converts a Lua value to a JSON string.

```lua
json = net.lua2json(lua)
```

---

### `missionlist_append` {: .unverified-section }

Unknown.

```lua
net.missionlist_append(...)
```

---

### `missionlist_clear` {: .unverified-section }

Unknown.

```lua
net.missionlist_clear(...)
```

---

### `missionlist_delete` {: .unverified-section }

Unknown.

```lua
net.missionlist_delete(...)
```

---

### `missionlist_get` {: .unverified-section }

Unknown.

```lua
net.missionlist_get(...)
```

---

### `missionlist_get_installed_theatres` {: .unverified-section }

Unknown.

```lua
net.missionlist_get_installed_theatres(...)
```

---

### `missionlist_move` {: .unverified-section }

Unknown.

```lua
net.missionlist_move(...)
```

---

### `missionlist_run` {: .unverified-section }

Unknown.

```lua
net.missionlist_run(...)
```

---

### `missionlist_set_loop` {: .unverified-section }

Unknown.

```lua
net.missionlist_set_loop(...)
```

---

### `missionlist_set_shuffle` {: .unverified-section }

Unknown.

```lua
net.missionlist_set_shuffle(...)
```

---

### `recv_chat` {: .unverified-section }

Functionality unknown.

```lua
net.recv_chat(...)
```

---

### `restart` {: .unverified-section }

Unknown.

```lua
net.restart(...)
```

---

### `screenshot_del` {: .unverified-section }

Unknown.

```lua
net.screenshot_del(...)
```

---

### `screenshot_request` {: .unverified-section }

Unknown.

```lua
net.screenshot_request(...)
```

---

### `send_chat` {: .unverified-section }

Sends a chat message to all players if `all` is `true`, or to the team otherwise.

```lua
net.send_chat(message, all)
```

---

### `send_chat_to` {: .unverified-section }

Sends a chat message to a specific player, optionally appearing from another player.

```lua
net.send_chat_to(message, playerId, fromId)
```

---

### `send_rpc_error` {: .unverified-section }

Unknown.

```lua
net.send_rpc_error(...)
```

---

### `send_rpc_request` {: .unverified-section }

Unknown.

```lua
net.send_rpc_request(...)
```

---

### `send_rpc_result` {: .unverified-section }

Unknown.

```lua
net.send_rpc_result(...)
```

---

### `serverinfo_get` {: .unverified-section }

Unknown.

```lua
net.serverinfo_get(...)
```

---

### `serverinfo_request` {: .unverified-section }

Unknown.

```lua
net.serverinfo_request(...)
```

---

### `serverlist_get` {: .unverified-section }

Unknown.

```lua
net.serverlist_get(...)
```

---

### `serverlist_reset` {: .unverified-section }

Unknown.

```lua
net.serverlist_reset(...)
```

---

### `serverlist_search` {: .unverified-section }

Unknown.

```lua
net.serverlist_search(...)
```

---

### `set_name` {: .unverified-section }

Unknown.

```lua
net.set_name(...)
```

---

### `set_slot` {: .unverified-section }

Functionality unknown.

```lua
net.set_slot(...)
```

---

### `spawn_player` {: .unverified-section }

Unknown.

```lua
net.spawn_player(...)
```

---

### `start_client` {: .unverified-section }

Unknown.

```lua
net.start_client(...)
```

---

### `start_server` {: .unverified-section }

Unknown.

```lua
net.start_server(...)
```

---

### `stop_game` {: .unverified-section }

Unknown.

```lua
net.stop_game(...)
```

---

### `stop_network` {: .unverified-section }

Unknown.

```lua
net.stop_network(...)
```

---

### `trace` {: .unverified-section }

Functionality unknown.

```lua
net.trace(...)
```
