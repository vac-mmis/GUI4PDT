# Class: Material

Implements representation of object material.

## Remark

Object material is the distribution of what material the object is made of. For the moment, this distribution is not directly represented in the object, but only in details panel with a pie chart.

## Extends

-   `MeshStandardMaterial`

## Constructors

### new Material

> **new Material**(`materialJSON`): [`Material`](class.Material.md)

Creates object material representation.

#### Parameters

| Parameter      | Type                                                                                                                         | Description                        |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `materialJSON` | [`MaterialJSON`](../../../../namespace.Interfaces/namespaces/namespace.Properties/type-aliases/type-alias.MaterialJSON.md)[] | Object material data through time. |

#### Returns

[`Material`](class.Material.md)

#### Overrides

MeshStandardMaterial.constructor

#### Defined In

models/Properties/Material.ts:32

## Properties

### parent

> **parent**: [`PDTObject`](../../../classes/class.PDTObject.md)

Object which has this material.

#### Defined In

models/Properties/Material.ts:23

---

### dist

> `readonly` **dist**: [`Distribution`](../../namespace.Distribution/classes/class.Distribution.md)[]

Material distribution through time.

#### Defined In

models/Properties/Material.ts:25

## Methods

### update

> **update**(): `void`

TODO : Implement material update through time.
Update material representation at desired time.

#### Returns

`void`

#### Defined In

models/Properties/Material.ts:53

---

### getMaterial

> **getMaterial**(`opacity` = `1`): `MeshStandardMaterial`

Get copy of object material with desired opacity.

#### Parameters

| Parameter | Type     | Default value | Description                      |
| :-------- | :------- | :------------ | :------------------------------- |
| `opacity` | `number` | `1`           | Desired opacity (default : `1`). |

#### Returns

`MeshStandardMaterial`

Object `MeshStandardMaterial` Three.JS material.

#### Defined In

models/Properties/Material.ts:64

---

### representation

> **representation**(`t`): `Partial`\< `PlotData` \>

Get object material representation at desired time.

#### Parameters

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `t`       | `number` | Desired representation time index. |

#### Returns

`Partial`\< `PlotData` \>

Material distribution representation as Plotly.JS pie chart.

#### Defined In

models/Properties/Material.ts:81

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
