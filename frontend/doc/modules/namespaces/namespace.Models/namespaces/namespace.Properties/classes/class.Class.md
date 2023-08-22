# Class: Class

Implements representation of object classes.

## Remark

Object class is the distribution of what kind of object it is. Here, this distribution is represented in the 3D scene objects melting with proportional opacity according to probability.

## Extends

-   `Group`

## Constructors

### new Class

> **new Class**(
> `parent`,
> `classJSON`,
> `material`,
> `scale`): [`Class`](class.Class.md)

Creates object class representation.

#### Parameters

| Parameter   | Type                                                                                                                   | Description                     |
| :---------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| `parent`    | [`PDTObject`](../../../classes/class.PDTObject.md)                                                                     | Object which has this class.    |
| `classJSON` | [`ClassJSON`](../../../../namespace.Interfaces/namespaces/namespace.Properties/type-aliases/type-alias.ClassJSON.md)[] | Object class data through time. |
| `material`  | `undefined` \| [`Material`](class.Material.md)                                                                         | Object material distribution.   |
| `scale`     | (`undefined` \| `number`)[]                                                                                            | Object scale through time.      |

#### Returns

[`Class`](class.Class.md)

#### Overrides

Group.constructor

#### Defined In

models/Properties/Class.ts:48

## Properties

### parent

> **parent**: [`PDTObject`](../../../classes/class.PDTObject.md)

Object which has this class.

#### Defined In

models/Properties/Class.ts:29

#### Overrides

Group.parent

---

### dist

> `private` **dist**: [`Categorical`](../../namespace.Distribution/classes/class.Categorical.md)[]

Class distribution through time.

#### Defined In

models/Properties/Class.ts:31

---

### scaleFactor

> `private` **scaleFactor**: (`undefined` \| `number`)[]

Object scale through time.

#### Defined In

models/Properties/Class.ts:33

---

### visibility

> `private` **visibility**: (`"visible"` \| `"alpha"`)[]

`true` if location is shows as probabilistic

#### Defined In

models/Properties/Class.ts:36

---

### controller

> `private` **controller**: [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"visible"` \| `"alpha"` \>

Location controller module

#### Defined In

models/Properties/Class.ts:38

## Methods

### getVisibility

> `private` **getVisibility**(): (`"visible"` \| `"alpha"`)[]

Get actual class visibility

#### Returns

(`"visible"` \| `"alpha"`)[]

Class visibility

#### Defined In

models/Properties/Class.ts:87

---

### setVisibility

> `private` **setVisibility**(`visibility`): `void`

Set class visibility

#### Parameters

| Parameter    | Type                         | Description              |
| :----------- | :--------------------------- | :----------------------- |
| `visibility` | (`"visible"` \| `"alpha"`)[] | Desired class visibility |

#### Returns

`void`

#### Defined In

models/Properties/Class.ts:94

---

### getController

> **getController**(): [`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"visible"` \| `"alpha"` \>

Give class controller to toggle object visibility

#### Returns

[`Controller`](../../namespace.Controller/classes/class.Controller.md)\< `"visible"` \| `"alpha"` \>

Class controller

#### Defined In

models/Properties/Class.ts:109

---

### updateClass

> `private` **updateClass**(`index`): `void`

Update object class at given index.

#### Parameters

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `index`   | `number` | Time index to update class. |

#### Returns

`void`

#### Defined In

models/Properties/Class.ts:116

---

### update

> **update**(`time`?): `void`

Update class representation at desired time.

#### Parameters

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `time`?   | `number` | Time to update class. |

#### Returns

`void`

#### Defined In

models/Properties/Class.ts:138

---

### setRotation

> **setRotation**(`e`): `void`

Change rotation of object representation.

#### Parameters

| Parameter | Type    | Description                                             |
| :-------- | :------ | :------------------------------------------------------ |
| `e`       | `Euler` | Euler vector representing angles to apply for rotation. |

#### Returns

`void`

#### Defined In

models/Properties/Class.ts:151

---

### representation

> **representation**(`t`): `Partial`\< `PlotData` \>

Get object class representation at desired time.

#### Parameters

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `t`       | `number` | Desired representation time index. |

#### Returns

`Partial`\< `PlotData` \>

Class distribution representation as Plotly.JS pie chart.

#### Defined In

models/Properties/Class.ts:164

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
