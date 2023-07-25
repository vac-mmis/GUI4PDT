[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Types](Types.md) / Distributions

# Namespace: Distributions

[Types](Types.md).Distributions

This file contains the distributions types handled by backend.
PDTs JSON files must follows this representation to be loaded

New distribution type must be added here and should contains the `type` attributes to distinct it from the others

## Table of contents

### Type Aliases

-   [MultivariateNormal](Types.Distributions.md#multivariatenormal)
-   [UniformContinuous](Types.Distributions.md#uniformcontinuous)
-   [VonMises](Types.Distributions.md#vonmises)
-   [Categorical](Types.Distributions.md#categorical)

## Type Aliases

### MultivariateNormal

Ƭ **MultivariateNormal**: `Object`

Represents multivariate normal distribution JSON format

**`See`**

[Multivariate normal distribution on Wikipedia](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)

#### Type declaration

| Name   | Type                    |
| :----- | :---------------------- |
| `type` | `"multivariate-normal"` |
| `mean` | `number`[]              |
| `cov`  | `number`[][]            |

#### Defined in

src/types/dist.types.ts:15

---

### UniformContinuous

Ƭ **UniformContinuous**: `Object`

Represents multivariate continuous uniform distribution JSON format

**`See`**

[Continuous uniform distribution on Wikipedia](https://en.wikipedia.org/wiki/Continuous_uniform_distribution)

#### Type declaration

| Name     | Type                   |
| :------- | :--------------------- |
| `type`   | `"uniform-continuous"` |
| `params` | `number`[][]           |

#### Defined in

src/types/dist.types.ts:26

---

### VonMises

Ƭ **VonMises**: `Object`

Represents Von-Mises distributions JSON format

**`See`**

[Von-Mises distribution on Wikipedia](https://en.wikipedia.org/wiki/Von_Mises_distribution)

#### Type declaration

| Name    | Type          |
| :------ | :------------ |
| `type`  | `"von-mises"` |
| `mean`  | `number`[]    |
| `kappa` | `number`[]    |

#### Defined in

src/types/dist.types.ts:36

---

### Categorical

Ƭ **Categorical**: `Object`

Represents categorical distributions JSON format

**`See`**

[Categorical distribution on Wikipedia](https://en.wikipedia.org/wiki/Categorical_distribution)

#### Type declaration

| Name   | Type                          |
| :----- | :---------------------------- |
| `type` | `"categorical"`               |
| `mass` | `Record`<`string`, `number`\> |

#### Defined in

src/types/dist.types.ts:47
