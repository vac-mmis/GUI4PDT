# Class: UniformContinuous

Implementation of multivariate continuous uniform distribution.

## Remark

Could be use at any dimension.

## See

[Continuous uniform distribution on Wikipedia](https://en.wikipedia.org/wiki/Continuous_uniform_distribution)

## Implements

-   [`UniContinuousJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md)

## Constructors

### new UniformContinuous

> **new UniformContinuous**(`dist`): [`UniformContinuous`](class.UniformContinuous.md)

Creates new multivariate continuous uniform distribution from given distribution data.

#### Parameters

| Parameter | Type                                              | Description                                                                 |
| :-------- | :------------------------------------------------ | :-------------------------------------------------------------------------- |
| `dist`    | [`UniformContinuous`](class.UniformContinuous.md) | Multivariate continuous uniform distribution data with mean and parameters. |

#### Returns

[`UniformContinuous`](class.UniformContinuous.md)

#### Defined In

models/Distributions/UniContinuous.ts:32

## Properties

### distName

> `static` **distName**: `"uniform-continuous"`

Distribution class name

#### Defined In

models/Distributions/UniContinuous.ts:21

---

### type

> `readonly` **type**: `"uniform-continuous"` = `UniformContinuous.distName`

#### Defined In

models/Distributions/UniContinuous.ts:22

#### Implementation of

[`UniContinuousJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md).[`type`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md#type)

---

### mean

> `readonly` **mean**: `number`[]

Geometric center point of the distribution

#### Defined In

models/Distributions/UniContinuous.ts:24

#### Implementation of

[`UniContinuousJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md).[`mean`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md#mean)

---

### params

> `readonly` **params**: `number`[][]

Distributions interval for each dimension : `[[xMin, xMax], [yMin, yMax], [zMin,zMax] ...]`

#### Defined In

models/Distributions/UniContinuous.ts:25

#### Implementation of

[`UniContinuousJSON`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md).[`params`](../../../../namespace.Interfaces/namespaces/namespace.Distribution/interfaces/interface.UniContinuousJSON.md#params)

## Methods

### getMode

> **getMode**(): `number`[]

#### Returns

`number`[]

#### Defined In

models/Distributions/UniContinuous.ts:37

---

### random

> **random**(): `number`[]

#### Returns

`number`[]

#### Defined In

models/Distributions/UniContinuous.ts:39

---

### representation

> **representation**(): `number`[]

Give distance between each `params` range to build cube for representation.

Data format : `[xMax - xMin, yMax - yMin, zMax - zMin, ...]`

#### Returns

`number`[]

multivariate continuous uniform representation with array of distance between each dimension range.

#### Defined In

models/Distributions/UniContinuous.ts:50

---

### toString

> **toString**(): `string`

#### Returns

`string`

#### Defined In

models/Distributions/UniContinuous.ts:54

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
