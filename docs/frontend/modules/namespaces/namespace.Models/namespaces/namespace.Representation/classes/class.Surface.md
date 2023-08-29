# Class: Surface

Implementation of surface representation.

## Extends

-   `Mesh`

## Implements

-   [`Representation`](../interfaces/interface.Representation.md)

## Constructors

### new Surface

> **new Surface**(`data`, `material` = `...`): [`Surface`](class.Surface.md)

Implementation of surface representation.

#### Parameters

| Parameter  | Type                                       | Description                                                 |
| :--------- | :----------------------------------------- | :---------------------------------------------------------- |
| `data`     | [`number`, `number`, `number`, `number`][] | -                                                           |
| `material` | `Material`                                 | Desired surface material (default : blue semi-transparent). |

#### Returns

[`Surface`](class.Surface.md)

#### Overrides

Mesh.constructor

#### Defined In

models/Representations/Surface.ts:32

## Properties

### repName

> `static` **repName**: `string` = `"surface"`

Representation name

#### Defined In

models/Representations/Surface.ts:24

## Methods

### update

> **update**(`data`): `void`

Update surface grid;

#### Parameters

| Parameter | Type                                       |
| :-------- | :----------------------------------------- |
| `data`    | [`number`, `number`, `number`, `number`][] |

#### Returns

`void`

#### Implementation of

[`Representation`](../interfaces/interface.Representation.md).[`update`](../interfaces/interface.Representation.md#update)

#### Defined In

models/Representations/Surface.ts:70

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
