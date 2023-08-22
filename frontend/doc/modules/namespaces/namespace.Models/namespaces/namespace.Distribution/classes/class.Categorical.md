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

| Parameter | Type                                              |
| :-------- | :------------------------------------------------ |
| `dist`?   | `string` \| [`Categorical`](class.Categorical.md) |

#### Returns

[`Categorical`](class.Categorical.md)

#### Defined In

models/Distributions/Categorical.ts:25

## Properties

### distName

> `static` **distName**: `string` = `"categorical"`

Distribution class name

#### Defined In

models/Distributions/Categorical.ts:15

---

### type

> **type**: `string` = `Categorical.distName`

#### Defined In

models/Distributions/Categorical.ts:16

#### Implementation of

[`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md#type)

---

### mass

> **mass**: `Record`\< `string`, `number` \>

Values and their probabilities.

#### Defined In

models/Distributions/Categorical.ts:18

#### Implementation of

[`CatJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md).[`mass`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.CatJSON.md#mass)

## Methods

### getType

> **getType**(): `string`

#### Returns

`string`

#### Defined In

models/Distributions/Categorical.ts:33

---

### random

> **random**(): [`string`, `number`]

#### Returns

[`string`, `number`]

#### Defined In

models/Distributions/Categorical.ts:35

---

### getMass

> **getMass**(): `Record`\< `string`, `number` \>

#### Returns

`Record`\< `string`, `number` \>

#### Defined In

models/Distributions/Categorical.ts:39

---

### getMean

> **getMean**(): [`string`, `number`]

#### Returns

[`string`, `number`]

#### Defined In

models/Distributions/Categorical.ts:41

---

### setMean

> **setMean**(): `void`

#### Returns

`void`

#### Defined In

models/Distributions/Categorical.ts:43

---

### setMass

> **setMass**(`newMass`): `void`

#### Parameters

| Parameter | Type                             |
| :-------- | :------------------------------- |
| `newMass` | `Record`\< `string`, `number` \> |

#### Returns

`void`

#### Defined In

models/Distributions/Categorical.ts:47

---

### representation

> **representation**(): (`string` \| `number`)[]

#### Returns

(`string` \| `number`)[]

Categorical representation as [string, number,...] array.

#### Defined In

models/Distributions/Categorical.ts:54

---

### uniformCatagories

> `static` **uniformCatagories**(`categories`): [`Categorical`](class.Categorical.md)[]

Uniforms categorical array or string to have all available keys in each categorical item.

#### Parameters

| Parameter    | Type                                                              | Description                                     |
| :----------- | :---------------------------------------------------------------- | :---------------------------------------------- |
| `categories` | (`string` \| \{`dist`: [`Categorical`](class.Categorical.md);})[] | Array of string or categorical data to uniform. |

#### Returns

[`Categorical`](class.Categorical.md)[]

Uniformed categorical distribution array.

#### Defined In

models/Distributions/Categorical.ts:65

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
