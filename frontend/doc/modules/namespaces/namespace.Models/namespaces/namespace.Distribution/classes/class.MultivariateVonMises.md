# Class: MultivariateVonMises

Implementation of multivariate Von Mises distribution.

## Remark

Could be use at any dimension.

## See

[Von Mises distribution on Wikipedia](https://en.wikipedia.org/wiki/Von_Mises_distribution)

## Implements

-   [`MultiVonMisesJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md)

## Constructors

### new MultivariateVonMises

> **new MultivariateVonMises**(`dist`, `units` = `"rad"`): [`MultivariateVonMises`](class.MultivariateVonMises.md)

Creates new multivariate Von Mises distribution from given distribution data.

#### Parameters

| Parameter | Type                                                    | Default value | Description                                                                |
| :-------- | :------------------------------------------------------ | :------------ | :------------------------------------------------------------------------- |
| `dist`    | [`MultivariateVonMises`](class.MultivariateVonMises.md) | `undefined`   | Multivariate Von Mises distribution data with mean and concentration.      |
| `units`   | `"rad"` \| `"deg"`                                      | `"rad"`       | Set `dist` angle units to enable conversion to radians (default :`"rad"`). |

#### Returns

[`MultivariateVonMises`](class.MultivariateVonMises.md)

#### Defined In

models/Distributions/MultiVonMises.ts:32

## Properties

### distName

> `static` **distName**: `"von-mises"`

Distribution class name

#### Defined In

models/Distributions/MultiVonMises.ts:20

---

### type

> `readonly` **type**: `"von-mises"` = `MultivariateVonMises.distName`

#### Defined In

models/Distributions/MultiVonMises.ts:22

#### Implementation of

[`MultiVonMisesJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md#type)

---

### mean

> `readonly` **mean**: `number`[]

#### Defined In

models/Distributions/MultiVonMises.ts:23

#### Implementation of

[`MultiVonMisesJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md).[`mean`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md#mean)

---

### kappa

> `readonly` **kappa**: `number`[]

Concentration

#### Defined In

models/Distributions/MultiVonMises.ts:24

#### Implementation of

[`MultiVonMisesJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md).[`kappa`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiVonMisesJSON.md#kappa)

## Methods

### getMode

> **getMode**(): `number`[]

#### Returns

`number`[]

#### Defined In

models/Distributions/MultiVonMises.ts:45

---

### randomVonMises

> `static` `private` **randomVonMises**(`mu`, `kappa`): `number`

Draw random number from Von Mises distribution.

#### Parameters

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `mu`      | `number` | Von Mises mean.                 |
| `kappa`   | `number` | Von Mises concentration values. |

#### Returns

`number`

#### Remark

Implementation comes from [NumPy Von Mises random generator](https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.vonmises.html).

#### See

[NumPy Von Mises generator implementation](https://github.com/numpy/numpy/blob/511f77d1202b5f23ca7e8988d9455e803d5303d6/numpy/random/src/distributions/distributions.c#L837)

#### Defined In

models/Distributions/MultiVonMises.ts:56

---

### random

> **random**(`relative` = `false`): `number`[]

#### Parameters

| Parameter  | Type      | Default value |
| :--------- | :-------- | :------------ |
| `relative` | `boolean` | `false`       |

#### Returns

`number`[]

#### Defined In

models/Distributions/MultiVonMises.ts:104

---

### randomN

> `private` **randomN**(`N` = `1`, `relative` = `false`): `number`[]

Give flatten `N` vectors from distribution.

#### Parameters

| Parameter  | Type      | Default value | Description                                     |
| :--------- | :-------- | :------------ | :---------------------------------------------- |
| `N`        | `number`  | `1`           | Number of vectors to draw.                      |
| `relative` | `boolean` | `false`       | If true, draw with centered mean (null vector). |

#### Returns

`number`[]

Array of N flatten vectors drawn from distribution

#### Defined In

models/Distributions/MultiVonMises.ts:118

---

### representation

> **representation**(`relative` = `false`): `number`[]

Build 1000 vectors drawn from distribution.

Data format : `[x0,y0,z0, x1,y1,z1, ..., x1000,y1000,z1000]`

#### Parameters

| Parameter  | Type      | Default value | Description                                               |
| :--------- | :-------- | :------------ | :-------------------------------------------------------- |
| `relative` | `boolean` | `false`       | If `true`, create representation data with centered mean. |

#### Returns

`number`[]

Von Mises representation as 1000 flatten vectors.

#### Defined In

models/Distributions/MultiVonMises.ts:131

---

### toString

> **toString**(): `string`

#### Returns

`string`

#### Defined In

models/Distributions/MultiVonMises.ts:135

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
