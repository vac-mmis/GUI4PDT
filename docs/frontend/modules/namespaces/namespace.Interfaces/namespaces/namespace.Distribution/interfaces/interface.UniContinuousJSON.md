# Interface: UniContinuousJSON

Multivariate continuous uniform distribution API interface

## Extends

-   [`DistJSON`](interface.DistJSON.md)

## Properties

### type

> **type**: `"uniform-continuous"`

#### Defined In

interfaces/distribution.ts:46

#### Overrides

[`DistJSON`](interface.DistJSON.md).[`type`](interface.DistJSON.md#type)

---

### mean

> **mean**: `number`[]

Geometric center point of the distribution

#### Defined In

interfaces/distribution.ts:48

---

### params

> **params**: `number`[][]

Distributions interval for each dimension : `[[xMin, xMax], [yMin, yMax], [zMin,zMax] ...]`

#### Defined In

interfaces/distribution.ts:50

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
