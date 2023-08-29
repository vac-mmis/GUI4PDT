# Class: Map

Implements map from grid with surface and variations

## Extends

-   `Group`

## Constructors

### new Map

> **new Map**(`mapData`, `material` = `...`): [`Map`](class.Map.md)

Creates a map from data grid.

#### Parameters

| Parameter  | Type                                       | Description                                                                           |
| :--------- | :----------------------------------------- | :------------------------------------------------------------------------------------ |
| `mapData`  | [`number`, `number`, `number`, `number`][] | Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`. |
| `material` | `MeshStandardMaterial`                     | -                                                                                     |

#### Returns

[`Map`](class.Map.md)

#### Overrides

Group.constructor

#### Defined In

models/map.model.ts:35

## Properties

### mapData

> `private` **mapData**: [`number`, `number`, `number`, `number`][]

Map dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`.

#### Defined In

models/map.model.ts:19

---

### mapSurface

> `private` **mapSurface**: [`Representation`](../namespaces/namespace.Representation/interfaces/interface.Representation.md)

Elevation surface as [Surface](../namespaces/namespace.Representation/classes/class.Surface.md) representation.

#### Defined In

models/map.model.ts:21

---

### mapVariations

> `private` **mapVariations**: [`Representation`](../namespaces/namespace.Representation/interfaces/interface.Representation.md)

Representation of variations as vertical bars

#### Defined In

models/map.model.ts:23

---

### visibility

> `private` **visibility**: (`"visible"` \| `"plot"`)[]

`true` if location is shows as probabilistic

#### Defined In

models/map.model.ts:26

---

### controller

> `private` **controller**: [`Controller`](../namespaces/namespace.Controls/classes/class.Controller.md)\< `"visible"` \| `"plot"` \>

Map controller module

#### Defined In

models/map.model.ts:28

## Methods

### getVisibility

> `private` **getVisibility**(): (`"visible"` \| `"plot"`)[]

Get actual map visibility

#### Returns

(`"visible"` \| `"plot"`)[]

Location visibility

#### Defined In

models/map.model.ts:69

---

### setVisibility

> `private` **setVisibility**(`visibility`): `void`

Set map visibility

#### Parameters

| Parameter    | Type                        | Description                 |
| :----------- | :-------------------------- | :-------------------------- |
| `visibility` | (`"visible"` \| `"plot"`)[] | Desired location visibility |

#### Returns

`void`

#### Defined In

models/map.model.ts:76

---

### getController

> **getController**(): [`Controller`](../namespaces/namespace.Controls/classes/class.Controller.md)\< `"visible"` \| `"plot"` \>

Give map controller to toggle surface visibility

#### Returns

[`Controller`](../namespaces/namespace.Controls/classes/class.Controller.md)\< `"visible"` \| `"plot"` \>

Map surface controller

#### Defined In

models/map.model.ts:87

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
