# Class: Rotation

Implements representation of object rotation.

## Remark

Object rotation is the distribution of how it is self-orientated. This distribution is represented through variations of orientation through time.

## Remark

Rotation vectors are sometimes represented in `Vector3` and not `Euler` vectors to allow basic operations (sub, add...).

## Extends

-   `Group`

## Constructors

### new Rotation

> **new Rotation**(`parent`, `rotJSON`): [`Rotation`](class.Rotation.md)

Creates object rotation representation.

#### Parameters

| Parameter | Type                                                                                                                         | Description                          |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `parent`  | [`PDTObject`](../../../classes/class.PDTObject.md)                                                                           | : Object which has this rotation.    |
| `rotJSON` | [`RotationJSON`](../../../../namespace.Interfaces/namespaces/namespace.Properties/type-aliases/type-alias.RotationJSON.md)[] | : Object rotation data through time. |

#### Returns

[`Rotation`](class.Rotation.md)

#### Overrides

Group.constructor

#### Defined In

models/Properties/Rotation.ts:52

## Properties

### parent

> **parent**: [`PDTObject`](../../../classes/class.PDTObject.md)

Object which has this rotation.

#### Defined In

models/Properties/Rotation.ts:28

#### Overrides

Group.parent

---

### dist

> `private` **dist**: ([`Distribution`](../../namespace.Distribution/classes/class.Distribution.md) \| [`number`, `number`, `number`])[] = `[]`

Rotation distribution through time.

#### Defined In

models/Properties/Rotation.ts:31

---

### beginRotation

> `private` **beginRotation**: `Vector3`

Begin rotation of current direction

#### Defined In

models/Properties/Rotation.ts:34

---

### endRotation

> `private` **endRotation**: `Vector3`

End rotation of current direction

#### Defined In

models/Properties/Rotation.ts:36

---

### rotationDelta

> `private` **rotationDelta**: `Vector3`

Current rotation delta of object

#### Defined In

models/Properties/Rotation.ts:38

---

### delta

> `private` **delta**: `number` = `1`

Proportion of rotation direction to follow

#### Defined In

models/Properties/Rotation.ts:40

---

### visibility

> `private` **visibility**: `"move"`[] = `[]`

`true` if location is shows as probabilistic

#### Defined In

models/Properties/Rotation.ts:43

---

### controller

> `private` **controller**: [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"move"` \>

Location controller module

#### Defined In

models/Properties/Rotation.ts:45

## Methods

### getVisibility

> `private` **getVisibility**(): `"move"`[]

Get actual location visibility

#### Returns

`"move"`[]

Location visibility

#### Defined In

models/Properties/Rotation.ts:90

---

### setVisibility

> `private` **setVisibility**(`visibility`): `void`

Set location visibility

#### Parameters

| Parameter    | Type       | Description                 |
| :----------- | :--------- | :-------------------------- |
| `visibility` | `"move"`[] | Desired location visibility |

#### Returns

`void`

#### Defined In

models/Properties/Rotation.ts:97

---

### getController

> **getController**(): [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"move"` \>

Give location controller to toggle its visibility

#### Returns

[`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"move"` \>

Location controller

#### Defined In

models/Properties/Rotation.ts:106

---

### getRotation

> `private` **getRotation**(`t`, `relative` = `false`): `Vector3`

Give a possible object rotation at desired time.

#### Parameters

| Parameter  | Type      | Default value | Description                                                          |
| :--------- | :-------- | :------------ | :------------------------------------------------------------------- |
| `t`        | `number`  | `undefined`   | Time of desired rotation                                             |
| `relative` | `boolean` | `false`       | If `true`, give rotation relatively to the mean (default : `false`). |

#### Returns

`Vector3`

Possible object rotation at given time.

#### Defined In

models/Properties/Rotation.ts:116

---

### updateDirection

> `private` **updateDirection**(`time`): `void`

Update object rotation delta between `trunc(time)` and `trunc(time)+1`.

#### Parameters

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `time`    | `number` | Time to update rotation delta. |

#### Returns

`void`

#### Defined In

models/Properties/Rotation.ts:133

---

### tick

> `private` **tick**(): `void`

Changes object rotation with a `delta` rotation.

#### Returns

`void`

#### Defined In

models/Properties/Rotation.ts:150

---

### update

> **update**(`time`?): `void`

Update object rotation to one of the possible rotation at desired time.

#### Parameters

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `time`?   | `number` | Time to update rotation. |

#### Returns

`void`

#### Defined In

models/Properties/Rotation.ts:165

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
