# Class: ZVariations

Implementation of z variations representation.

## Extends

-   `InstancedMesh`

## Implements

-   [`Representation`](../interfaces/interface.Representation.md)

## Constructors

### new ZVariations

> **new ZVariations**(`mapData`): [`ZVariations`](class.ZVariations.md)

Implementation of surface representation.

#### Parameters

| Parameter | Type                                       | Description                                                                           |
| :-------- | :----------------------------------------- | :------------------------------------------------------------------------------------ |
| `mapData` | [`number`, `number`, `number`, `number`][] | Grid dataset with position and z-variations : `[[x0,y0,z0,dz0], [x1,y1,z1,dz1],...]`. |

#### Returns

[`ZVariations`](class.ZVariations.md)

#### Overrides

InstancedMesh.constructor

#### Defined In

models/Representations/ZVar.ts:23

## Properties

### repName

> `static` **repName**: `string` = `"z-var"`

Representation name

#### Defined In

models/Representations/ZVar.ts:16

## Methods

### update

> **update**(`mapData`): `void`

Update surface grid;

#### Parameters

| Parameter | Type                                       |
| :-------- | :----------------------------------------- |
| `mapData` | [`number`, `number`, `number`, `number`][] |

#### Returns

`void`

#### Implementation of

[`Representation`](../interfaces/interface.Representation.md).[`update`](../interfaces/interface.Representation.md#update)

#### Defined In

models/Representations/ZVar.ts:47

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
