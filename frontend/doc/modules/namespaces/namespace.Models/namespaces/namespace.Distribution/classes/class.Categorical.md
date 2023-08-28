# Class: Categorical

Implementation of categorical distribution.

## See

[Categorical distribution on Wikipedia](https://en.wikipedia.org/wiki/Categorical_distribution)

## Implements

-   [`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md)

## Constructors

### new Categorical

> **new Categorical**(`dist`?): [`Categorical`](class.Categorical.md)

Creates new categorical distribution from given distribution data.

#### Parameters

| Parameter | Type                                                                                                                        |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `dist`?   | `string` \| [`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md) |

#### Returns

[`Categorical`](class.Categorical.md)

#### Defined In

models/Distributions/Categorical.ts:26

## Properties

### distName

> `static` **distName**: `"categorical"`

Distribution class name

#### Defined In

models/Distributions/Categorical.ts:15

---

### type

> `readonly` **type**: `"categorical"` = `Categorical.distName`

#### Defined In

models/Distributions/Categorical.ts:17

#### Implementation of

[`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md#type)

---

### mass

> `readonly` **mass**: `Record`\< `string`, `number` \>

Values and their probabilities.

#### Defined In

models/Distributions/Categorical.ts:18

#### Implementation of

[`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md).[`mass`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md#mass)

---

### mode

> `private` **mode**: [`string`, `number`]

#### Defined In

models/Distributions/Categorical.ts:19

## Methods

### random

> **random**(): [`string`, `number`]

#### Returns

[`string`, `number`]

#### Defined In

models/Distributions/Categorical.ts:35

---

### getMode

> **getMode**(): [`string`, `number`]

#### Returns

[`string`, `number`]

#### Defined In

models/Distributions/Categorical.ts:39

---

### representation

> **representation**(): (`string` \| `number`)[]

#### Returns

(`string` \| `number`)[]

Categorical representation as [string, number,...] array.

#### Defined In

models/Distributions/Categorical.ts:44

---

### toString

> **toString**(): `string`

Catagorical distribution description

#### Returns

`string`

#### Defined In

models/Distributions/Categorical.ts:51

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
