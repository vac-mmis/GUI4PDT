# Class: Distribution

Interface representing a distribution object.

## Remark

Each new distribution implementation must implement this interface.

## Remark

Each new one must have a `static distName` equal to `type`, it is used to distinct classes in `distributions` variable.

## Implements

-   [`DistJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.DistJSON.md)

## Constructors

### new Distribution

> **new Distribution**(): [`Distribution`](class.Distribution.md)

#### Returns

[`Distribution`](class.Distribution.md)

## Properties

### type

> **type**: `string`

Name of the implemented distribution share by all distributions data.

#### Remark

Must be equal to `distName`. Please define this attribute with `type = <DistClassName>.distName`.

#### Defined In

models/Distributions/index.ts:55

#### Implementation of

[`DistJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.DistJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.DistJSON.md#type)

## Methods

### getType

> `abstract` **getType**(): `string`

Gives distribution type name.

#### Returns

`string`

Distribution type name.

#### Defined In

models/Distributions/index.ts:62

---

### getMean

> `abstract` **getMean**(): `any`

If exists, gives distribution mean.

#### Returns

`any`

Distribution mean.

#### Defined In

models/Distributions/index.ts:69

---

### setMean

> `abstract` **setMean**(`newMean`): `void`

If relevant, changes distribution mean with `newMean`.

#### Parameters

| Parameter | Type       | Description      |
| :-------- | :--------- | :--------------- |
| `newMean` | `number`[] | New mean to set. |

#### Returns

`void`

#### Defined In

models/Distributions/index.ts:76

---

### random

> `abstract` **random**(`relative`?): `any`

Gives random draw of the distribution.

#### Parameters

| Parameter   | Type      | Description                         |
| :---------- | :-------- | :---------------------------------- |
| `relative`? | `boolean` | If `true`, draw with centered mean. |

#### Returns

`any`

Distribution random draw.

#### Defined In

models/Distributions/index.ts:85

---

### representation

> `abstract` **representation**(`relative`?): `any`

Gives data representation of the distribution.

#### Parameters

| Parameter   | Type      | Description                         |
| :---------- | :-------- | :---------------------------------- |
| `relative`? | `boolean` | If `true`, draw with centered mean. |

#### Returns

`any`

Distribution data for representation.

#### Defined In

models/Distributions/index.ts:94

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
