# Class: PDT

Implements PDT representation, including objects and global data.

## Extends

-   `Group`

## Implements

-   [`WorldContent`](../../namespace.World/interfaces/interface.WorldContent.md)

## Constructors

### new PDT

> **new PDT**(`pdt`): [`PDT`](class.PDT.md)

Creates a PDT object from JSON data.

#### Parameters

| Parameter | Type                                                                                             | Description                 |
| :-------- | :----------------------------------------------------------------------------------------------- | :-------------------------- |
| `pdt`     | [`PDTJSON`](../../namespace.Interfaces/namespaces/namespace.PDT/interfaces/interface.PDTJSON.md) | PDT data, from backend API. |

#### Returns

[`PDT`](class.PDT.md)

#### Overrides

Group.constructor

#### Defined In

models/pdt.model.ts:40

## Properties

### name

> **name**: `string`

PDT name

#### Defined In

models/pdt.model.ts:21

#### Implementation of

WorldContent.name

#### Overrides

Group.name

---

### time

> `private` **time**: `number` = `0`

Current time index to show.

#### Defined In

models/pdt.model.ts:24

---

### timeLength

> `private` **timeLength**: `number`

Number of timestamps of the object.

#### Defined In

models/pdt.model.ts:26

---

### objects

> `readonly` **objects**: [`PDTObject`](class.PDTObject.md)[]

Objects inside PDT.

#### Defined In

models/pdt.model.ts:29

---

### elevationMap

> `private` `optional` **elevationMap**: [`Map`](class.Map.md)

Elevation map of the sea in PDT.

#### Defined In

models/pdt.model.ts:31

---

### selectedObject

> `optional` **selectedObject**: [`PDTObject`](class.PDTObject.md)

Selected object

#### Defined In

models/pdt.model.ts:34

## Methods

### getHoverables

> **getHoverables**(): `undefined` \| `Object3D`\< `Event` \>[]

Returns PDT objects or global representation which action on hover is desired.

#### Returns

`undefined` \| `Object3D`\< `Event` \>[]

Hoverable objects if defined.

#### Implementation of

[`WorldContent`](../../namespace.World/interfaces/interface.WorldContent.md).[`getHoverables`](../../namespace.World/interfaces/interface.WorldContent.md#gethoverables)

#### Defined In

models/pdt.model.ts:69

---

### getClickables

> **getClickables**(): `undefined` \| `Object3D`\< `Event` \>[]

Returns PDT objects or global representation which action on click is desired.

#### Returns

`undefined` \| `Object3D`\< `Event` \>[]

Clickable objects if defined.

#### Implementation of

[`WorldContent`](../../namespace.World/interfaces/interface.WorldContent.md).[`getClickables`](../../namespace.World/interfaces/interface.WorldContent.md#getclickables)

#### Defined In

models/pdt.model.ts:76

---

### getTimeIndex

> **getTimeIndex**(): `number`

Returns PDT current time index.

#### Returns

`number`

PDT time index.

#### Defined In

models/pdt.model.ts:83

---

### getObjects

> **getObjects**(): [`PDTObject`](class.PDTObject.md)[]

#### Returns

[`PDTObject`](class.PDTObject.md)[]

PDT objects.

#### Defined In

models/pdt.model.ts:88

---

### getElevationMap

> **getElevationMap**(): `undefined` \| [`Map`](class.Map.md)

#### Returns

`undefined` \| [`Map`](class.Map.md)

PDT Elevation map.

#### Defined In

models/pdt.model.ts:93

---

### getTimeLength

> **getTimeLength**(): `number`

#### Returns

`number`

Number of timestamps.

#### Defined In

models/pdt.model.ts:98

---

### updateObjects

> `private` **updateObjects**(`fun`): `void`

Apply given function on all PDT objects

#### Parameters

| Parameter | Type       | Description                              |
| :-------- | :--------- | :--------------------------------------- |
| `fun`     | `Function` | Function to apply on all objects in PDT. |

#### Returns

`void`

#### Defined In

models/pdt.model.ts:105

---

### onHover

> **onHover**(`intersect`): `undefined` \| [`PDTObject`](class.PDTObject.md)

Get object intersected by Three.JS raycaster on hover.

#### Parameters

| Parameter   | Type                                        | Description                             |
| :---------- | :------------------------------------------ | :-------------------------------------- |
| `intersect` | `Intersection`\< `Object3D`\< `Event` \> \> | Intersection result from World Pointer. |

#### Returns

`undefined` \| [`PDTObject`](class.PDTObject.md)

Intersected object.

#### Implementation of

[`WorldContent`](../../namespace.World/interfaces/interface.WorldContent.md).[`onHover`](../../namespace.World/interfaces/interface.WorldContent.md#onhover)

#### Defined In

models/pdt.model.ts:116

---

### onClick

> **onClick**(`intersect`): `undefined` \| `Object3D`\< `Event` \>

Get object intersected by Three.JS raycaster on click.

#### Parameters

| Parameter   | Type                                        | Description                             |
| :---------- | :------------------------------------------ | :-------------------------------------- |
| `intersect` | `Intersection`\< `Object3D`\< `Event` \> \> | Intersection result from World Pointer. |

#### Returns

`undefined` \| `Object3D`\< `Event` \>

Intersected object.

#### Implementation of

[`WorldContent`](../../namespace.World/interfaces/interface.WorldContent.md).[`onClick`](../../namespace.World/interfaces/interface.WorldContent.md#onclick)

#### Defined In

models/pdt.model.ts:130

---

### tick

> **tick**(`time`?): `void`

Update PDT to desired timestamp.

#### Parameters

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `time`?   | `number` | Desired timestamp. |

#### Returns

`void`

#### Defined In

models/pdt.model.ts:147

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
