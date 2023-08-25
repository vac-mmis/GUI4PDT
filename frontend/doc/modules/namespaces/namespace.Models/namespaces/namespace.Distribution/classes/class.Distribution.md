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

> `readonly` **type**: `string`

Name of the implemented distribution share by all distributions data.

#### Remark

Must be equal to `type`. Please define this attribute with `type = <DistClassName>.type`.

#### Defined In

models/Distributions/index.ts:55

#### Implementation of

[`DistJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.DistJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.DistJSON.md#type)

## Methods

### getMode

> `abstract` **getMode**(): `any`

If exists, gives distribution mode.

#### Returns

`any`

Distribution mode.

#### Defined In

models/Distributions/index.ts:62

---

### random

> `abstract` **random**(`relative`?): `any`

Gives random draw of the distribution.

#### Parameters

| Parameter   | Type      | Description                         |
| :---------- | :-------- | :---------------------------------- |
| `relative`? | `boolean` | If `true`, draw with centered mode. |

#### Returns

`any`

Distribution random draw.

#### Defined In

models/Distributions/index.ts:71

---

### representation

> `abstract` **representation**(`relative`?): `any`

Gives data representation of the distribution.

#### Parameters

| Parameter   | Type      | Description                         |
| :---------- | :-------- | :---------------------------------- |
| `relative`? | `boolean` | If `true`, draw with centered mode. |

#### Returns

`any`

Distribution data for representation.

#### Defined In

models/Distributions/index.ts:80

---

### toString

> `abstract` **toString**(): `string`

Gives a description of the distribution.

#### Returns

`string`

Distribution description.

#### Defined In

models/Distributions/index.ts:87

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
