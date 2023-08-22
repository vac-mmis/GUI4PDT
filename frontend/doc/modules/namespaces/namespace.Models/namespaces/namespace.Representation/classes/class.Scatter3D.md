# Class: Scatter3D

Implementation of scatter3D representation.

## Extends

-   `Points`

## Implements

-   [`Representation`](../interfaces/interface.Representation.md)

## Constructors

### new Scatter3D

> **new Scatter3D**(`dataPoints`): [`Scatter3D`](class.Scatter3D.md)

Implementation of scatter3D representation.

#### Parameters

| Parameter    | Type       | Description                                               |
| :----------- | :--------- | :-------------------------------------------------------- |
| `dataPoints` | `number`[] | Points with probabilities to plot : `[x1,y1,z1,p1, ...]`. |

#### Returns

[`Scatter3D`](class.Scatter3D.md)

#### Overrides

Points.constructor

#### Defined In

models/Representations/Scatter3D.ts:34

## Properties

### repName

> `static` **repName**: `string` = `"scatter3D"`

Representation name

#### Defined In

models/Representations/Scatter3D.ts:23

---

### minColor

> `static` `private` **minColor**: `Color`

Minimum color for probability/distance scale

#### Defined In

models/Representations/Scatter3D.ts:25

---

### maxColor

> `static` `private` **maxColor**: `Color`

Maximum color for probability/distance scale

#### Defined In

models/Representations/Scatter3D.ts:27

## Methods

### getColors

> `static` `private` **getColors**(`probabilities`): `Float32Array`

Compute colors from color scale with given probabilities.

#### Parameters

| Parameter       | Type       | Description              |
| :-------------- | :--------- | :----------------------- |
| `probabilities` | `number`[] | : List of probabilities. |

#### Returns

`Float32Array`

Color map corresponding to given probabilities.

#### Defined In

models/Representations/Scatter3D.ts:67

---

### update

> **update**(`dataPoints`): `void`

Set new positions and/or probability points.

#### Parameters

| Parameter    | Type       | Description                                           |
| :----------- | :--------- | :---------------------------------------------------- |
| `dataPoints` | `number`[] | New points with probabilities : `[x1,y1,z1,p1, ...]`. |

#### Returns

`void`

#### Implementation of

[`Representation`](../interfaces/interface.Representation.md).[`update`](../interfaces/interface.Representation.md#update)

#### Defined In

models/Representations/Scatter3D.ts:84

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
