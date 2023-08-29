# Class: Box

Implementation of box representation.

## Extends

-   `Mesh`

## Implements

-   [`Representation`](../interfaces/interface.Representation.md)

## Constructors

### new Box

> **new Box**(`dim`): [`Box`](class.Box.md)

Creates new box representation.

#### Parameters

| Parameter | Type                           | Description               |
| :-------- | :----------------------------- | :------------------------ |
| `dim`     | [`number`, `number`, `number`] | Box dimensions : [x,y,z]. |

#### Returns

[`Box`](class.Box.md)

#### Overrides

Mesh.constructor

#### Defined In

models/Representations/Box.ts:29

## Properties

### repName

> `static` **repName**: `string` = `"box"`

Representation name

#### Defined In

models/Representations/Box.ts:20

---

### currentDim

> `private` **currentDim**: [`number`, `number`, `number`]

Current dimensions, used for updates

#### Defined In

models/Representations/Box.ts:22

## Methods

### nonZero

> `static` `private` **nonZero**(`dim`): [`number`, `number`, `number`]

Corrects dimensions to have no zero coordinates (changed to `epsilon = 0.001`).

#### Parameters

| Parameter | Type                           | Description                      |
| :-------- | :----------------------------- | :------------------------------- |
| `dim`     | [`number`, `number`, `number`] | Dimensions to correct : [x,y,z]. |

#### Returns

[`number`, `number`, `number`]

Corrected dimensions.

#### Defined In

models/Representations/Box.ts:49

---

### update

> **update**(`dim`): `void`

Set new dimensions to box.

#### Parameters

| Parameter | Type                           | Description         |
| :-------- | :----------------------------- | :------------------ |
| `dim`     | [`number`, `number`, `number`] | Desired dimensions. |

#### Returns

`void`

#### Implementation of

[`Representation`](../interfaces/interface.Representation.md).[`update`](../interfaces/interface.Representation.md#update)

#### Defined In

models/Representations/Box.ts:61

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
