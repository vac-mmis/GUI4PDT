# Class: Timer

Implements timer tool to control PDT and world time.

## Constructors

### new Timer

> **new Timer**(
> `camera`,
> `scene`,
> `renderer`,
> `timerCallback`?): [`Timer`](class.Timer.md)

Creates a new timer for world time control.

#### Parameters

| Parameter        | Type            | Description                        |
| :--------------- | :-------------- | :--------------------------------- |
| `camera`         | `Camera`        | World camera.                      |
| `scene`          | `Scene`         | World scene.                       |
| `renderer`       | `WebGLRenderer` | World renderer.                    |
| `timerCallback`? | (`t`) => `void` | Callback called when time updates. |

#### Returns

[`Timer`](class.Timer.md)

#### Defined In

World/systems/Timer.ts:36

## Properties

### camera

> `private` **camera**: `Camera`

World camera/

#### Defined In

World/systems/Timer.ts:15

---

### scene

> `private` **scene**: `Scene`

World scene.

#### Defined In

World/systems/Timer.ts:17

---

### renderer

> `private` **renderer**: `WebGLRenderer`

World renderer.

#### Defined In

World/systems/Timer.ts:19

---

### time

> `private` **time**: `number`

Current time.

#### Defined In

World/systems/Timer.ts:22

---

### clock

> `private` **clock**: `Clock`

Internal timer clock.

#### Defined In

World/systems/Timer.ts:24

---

### timerCallback

> `private` **timerCallback**: (`t`) => `void`

Callback used when time updating.

#### Parameters

| Parameter | Type     |
| :-------- | :------- |
| `t`       | `number` |

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:26

## Methods

### getTime

> **getTime**(): `number`

#### Returns

`number`

Current time.

#### Defined In

World/systems/Timer.ts:65

---

### setTime

> **setTime**(`t`): `void`

Set new time to when update world.

#### Parameters

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `t`       | `number` | Desired time. |

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:71

---

### setTimerCallback

> **setTimerCallback**(`timerCallback`): `void`

Set new timer callback.

#### Parameters

| Parameter       | Type            | Description         |
| :-------------- | :-------------- | :------------------ |
| `timerCallback` | (`t`) => `void` | New timer callback. |

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:81

---

### start

> **start**(): `void`

Start world timer.

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:88

---

### stop

> **stop**(): `void`

Stop world timer.

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:95

---

### tick

> `private` **tick**(`update` = `false`): `void`

Tick world and its elements to current time + clock delta.

#### Parameters

| Parameter | Type      | Default value | Description                              |
| :-------- | :-------- | :------------ | :--------------------------------------- |
| `update`  | `boolean` | `false`       | Force object tick with actual timestamp. |

#### Returns

`void`

#### Defined In

World/systems/Timer.ts:104

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
