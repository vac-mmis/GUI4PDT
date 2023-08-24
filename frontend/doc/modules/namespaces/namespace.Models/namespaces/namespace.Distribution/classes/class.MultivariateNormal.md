# Class: MultivariateNormal

Implementation of multivariate normal distribution.

## Remark

Could be use at any dimension.

## See

[Multivariate normal distribution on Wikipedia](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)

## Implements

-   [`MultiNormalJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md)

## Constructors

### new MultivariateNormal

> **new MultivariateNormal**(`dist`): [`MultivariateNormal`](class.MultivariateNormal.md)

Creates new multivariate normal distribution from given distribution data.

#### Parameters

| Parameter | Type                                                | Description                                                            |
| :-------- | :-------------------------------------------------- | :--------------------------------------------------------------------- |
| `dist`    | [`MultivariateNormal`](class.MultivariateNormal.md) | Multivariate normal distribution data with mean and covariance matrix. |

#### Returns

[`MultivariateNormal`](class.MultivariateNormal.md)

#### Defined In

models/Distributions/MultiNormal.ts:34

## Properties

### distName

> `static` **distName**: `"multivariate-normal"`

Distribution class name

#### Defined In

models/Distributions/MultiNormal.ts:20

---

### type

> `readonly` **type**: `"multivariate-normal"` = `MultivariateNormal.distName`

#### Defined In

models/Distributions/MultiNormal.ts:22

#### Implementation of

[`MultiNormalJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md#type)

---

### mean

> `readonly` **mean**: `number`[]

#### Defined In

models/Distributions/MultiNormal.ts:23

#### Implementation of

[`MultiNormalJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md).[`mean`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md#mean)

---

### cov

> `readonly` **cov**: `number`[][]

Covariance matrix.

#### Defined In

models/Distributions/MultiNormal.ts:24

#### Implementation of

[`MultiNormalJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md).[`cov`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.MultiNormalJSON.md#cov)

---

### invCov

> `private` **invCov**: `number`[][]

Inverted covariance matrix. Stored for computation efficiency.

#### Defined In

models/Distributions/MultiNormal.ts:27

## Methods

### randomGauss

> `static` **randomGauss**(): `number`

Draw random number from standard normal distribution using Box-Muller method.

#### Returns

`number`

Drawn normal distributed number.

#### See

[Box-Muller transform on Wikipedia](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)

#### Defined In

models/Distributions/MultiNormal.ts:47

---

### getMode

> **getMode**(): `number`[]

#### Returns

`number`[]

#### Defined In

models/Distributions/MultiNormal.ts:53

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

models/Distributions/MultiNormal.ts:55

---

### randomN

> `private` **randomN**(
> `N` = `1`,
> `relative` = `false`,
> `withDistance` = `true`): `number`[]

Give flatten `N` vectors from distribution.

#### Parameters

| Parameter      | Type      | Default value | Description                                               |
| :------------- | :-------- | :------------ | :-------------------------------------------------------- |
| `N`            | `number`  | `1`           | Number of vectors to draw.                                |
| `relative`     | `boolean` | `false`       | If true, draw with centered mean (null vector).           |
| `withDistance` | `boolean` | `true`        | If true, add relative distance to the mean of each object |

#### Returns

`number`[]

Array of N flatten vectors (with distance if `withDistance`)

#### Defined In

models/Distributions/MultiNormal.ts:72

---

### representation

> **representation**(`relative` = `false`): `number`[]

Build 1000 cloud points with relative distance to the mean.

Data format : `[x0,y0,z0,d0, x1,y1,z1,d1, ..., x1000,y1000,z1000,d1000]`

#### Parameters

| Parameter  | Type      | Default value | Description                                               |
| :--------- | :-------- | :------------ | :-------------------------------------------------------- |
| `relative` | `boolean` | `false`       | If `true`, create representation data with centered mean. |

#### Returns

`number`[]

multivariate normal representation as 1000 flatten cloud points with relative distance to the mean.

#### Defined In

models/Distributions/MultiNormal.ts:114

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
