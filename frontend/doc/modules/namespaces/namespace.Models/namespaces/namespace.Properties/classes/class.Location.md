# Class: Location

Implements representation of object position in PDT.

## Remark

Object location is the distribution of where the object could be. This distribution is represented as points cloud which color follows location distribution.

## Extends

-   `Group`

## Constructors

### new Location

> **new Location**(`parent`, `locJSON`): [`Location`](class.Location.md)

Creates object location representation.

#### Parameters

| Parameter | Type                                                                                                                         | Description                        |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `parent`  | [`PDTObject`](../../../classes/class.PDTObject.md)                                                                           | Object which has this class.       |
| `locJSON` | [`LocationJSON`](../../../../namespace.Interfaces/namespaces/namespace.Properties/type-aliases/type-alias.LocationJSON.md)[] | Object location data through time. |

#### Returns

[`Location`](class.Location.md)

#### Overrides

Group.constructor

#### Defined In

models/Properties/Location.ts:58

## Properties

### parent

> **parent**: [`PDTObject`](../../../classes/class.PDTObject.md)

Object which has this location.

#### Defined In

models/Properties/Location.ts:33

#### Overrides

Group.parent

---

### dist

> `private` **dist**: ([`Distribution`](../../namespace.Distribution/classes/class.Distribution.md) \| [`number`, `number`, `number`])[] = `[]`

Location distribution through time.

#### Defined In

models/Properties/Location.ts:36

---

### direction

> `private` **direction**: `Vector3`

Current direction of object

#### Defined In

models/Properties/Location.ts:39

---

### beginPosition

> `private` **beginPosition**: `Vector3`

Begin position of current direction

#### Defined In

models/Properties/Location.ts:41

---

### endPosition

> `private` **endPosition**: `Vector3`

End position of current direction

#### Defined In

models/Properties/Location.ts:43

---

### delta

> `private` **delta**: `number` = `1`

Proportion of direction to follow

#### Defined In

models/Properties/Location.ts:45

---

### visibility

> `private` **visibility**: (`"plot"` \| `"move"`)[] = `[]`

`true` if location is shows as probabilistic

#### Defined In

models/Properties/Location.ts:48

---

### controller

> `private` **controller**: [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"plot"` \| `"move"` \>

Location controller module

#### Defined In

models/Properties/Location.ts:50

## Methods

### getVisibility

> `private` **getVisibility**(): (`"plot"` \| `"move"`)[]

Get actual location visibility

#### Returns

(`"plot"` \| `"move"`)[]

Location visibility

#### Defined In

models/Properties/Location.ts:104

---

### setVisibility

> `private` **setVisibility**(`visibility`): `void`

Set location visibility

#### Parameters

| Parameter    | Type                     | Description                 |
| :----------- | :----------------------- | :-------------------------- |
| `visibility` | (`"plot"` \| `"move"`)[] | Desired location visibility |

#### Returns

`void`

#### Defined In

models/Properties/Location.ts:111

---

### getController

> **getController**(): [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"plot"` \| `"move"` \>

Give location controller to toggle its visibility

#### Returns

[`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"plot"` \| `"move"` \>

Location controller

#### Defined In

models/Properties/Location.ts:121

---

### getPosition

> `private` **getPosition**(`t`, `relative` = `false`): `Vector3`

Give a possible object position in PDT at desired time.

#### Parameters

| Parameter  | Type      | Default value | Description                                                          |
| :--------- | :-------- | :------------ | :------------------------------------------------------------------- |
| `t`        | `number`  | `undefined`   | Time of desired position.                                            |
| `relative` | `boolean` | `false`       | If `true`, give position relatively to the mean (default : `false`). |

#### Returns

`Vector3`

Possible object position at given time.

#### Defined In

models/Properties/Location.ts:131

---

### updateDirection

> `private` **updateDirection**(`time`): `void`

Update object direction between `trunc(time)` and `trunc(time)+1`.

#### Parameters

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `time`    | `number` | Time to update direction. |

#### Returns

`void`

#### Defined In

models/Properties/Location.ts:148

---

### tick

> `private` **tick**(): `void`

Changes object position with a `delta` position.

#### Returns

`void`

#### Defined In

models/Properties/Location.ts:157

---

### update

> **update**(`time`?): `void`

Update object location to one of the possible position at desired time.

#### Parameters

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `time`?   | `number` | Time to update position. |

#### Returns

`void`

#### Defined In

models/Properties/Location.ts:175

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
