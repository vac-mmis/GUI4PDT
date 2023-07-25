[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Types](Types.md) / Objects

# Namespace: Objects

[Types](Types.md).Objects

This file contains types used to define objects and their attributes
PDTs JSON files must follows these representations to be loaded

New object attributes must be added here. If it's a distributed property, it should have a `dist` sub-attribute which should contains one of the types available in Distribution like this :

```ts
export type NewPropertyJSON =
     | Type1
     | { dist : Dist1 | Dist2 ... }
     | ...
```

## Table of contents

### Type Aliases

-   [ClassJSON](Types.Objects.md#classjson)
-   [LocationJSON](Types.Objects.md#locationjson)
-   [RotationJSON](Types.Objects.md#rotationjson)
-   [MaterialJSON](Types.Objects.md#materialjson)
-   [ObjectTimestamp](Types.Objects.md#objecttimestamp)
-   [ObjectJSON](Types.Objects.md#objectjson)

## Type Aliases

### ClassJSON

Ƭ **ClassJSON**: `string` \| { `dist`: [`Categorical`](Types.Distributions.md#categorical) }

Represents possible types of an object (ex : 30% tetrapod, 70% reefcone)

**`Remark`**

Class names must be in lowercase and correspond to model folder and file names in `assets/models` folder.

#### Defined in

src/types/object.types.ts:27

---

### LocationJSON

Ƭ **LocationJSON**: { `dist`: [`MultivariateNormal`](Types.Distributions.md#multivariatenormal) \| [`UniformContinuous`](Types.Distributions.md#uniformcontinuous) } \| [`number`, `number`, `number`]

Represents a distribution of the object location

#### Defined in

src/types/object.types.ts:32

---

### RotationJSON

Ƭ **RotationJSON**: { `dist`: [`VonMises`](Types.Distributions.md#vonmises) } \| [`number`, `number`, `number`]

Represents a distribution of the object rotation

#### Defined in

src/types/object.types.ts:39

---

### MaterialJSON

Ƭ **MaterialJSON**: `string` \| { `dist`: [`Categorical`](Types.Distributions.md#categorical) }

Represents possible materials of an object

**`Remark`**

Material names must be in lowercase and correspond to material folder and file names in `assets/materials` folder.

#### Defined in

src/types/object.types.ts:46

---

### ObjectTimestamp

Ƭ **ObjectTimestamp**: `Object`

Represents object type in PDT JSON timestamps **before** the parsing executed in [PDT.init()](Models.md#timestampstopdtjson).

#### Type declaration

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `id`        | `number`                                        |
| `class`     | [`ClassJSON`](Types.Objects.md#classjson)       |
| `location`  | [`LocationJSON`](Types.Objects.md#locationjson) |
| `rotation?` | [`RotationJSON`](Types.Objects.md#rotationjson) |
| `material`  | [`MaterialJSON`](Types.Objects.md#materialjson) |
| `scale?`    | `number`                                        |
| `physics?`  | `boolean`                                       |

#### Defined in

src/types/object.types.ts:51

---

### ObjectJSON

Ƭ **ObjectJSON**: `Object`

Represents object type served to the API, therefore **after** [PDT.init()](Models.md#timestampstopdtjson).

#### Type declaration

| Name       | Type                                                               |
| :--------- | :----------------------------------------------------------------- |
| `id`       | `number`                                                           |
| `class`    | [`ClassJSON`](Types.Objects.md#classjson)[]                        |
| `location` | [`LocationJSON`](Types.Objects.md#locationjson)[]                  |
| `material` | [`MaterialJSON`](Types.Objects.md#materialjson)[]                  |
| `rotation` | ([`RotationJSON`](Types.Objects.md#rotationjson) \| `undefined`)[] |
| `scale`    | (`number` \| `undefined`)[]                                        |
| `physics`  | (`boolean` \| `undefined`)[]                                       |

#### Defined in

src/types/object.types.ts:64
