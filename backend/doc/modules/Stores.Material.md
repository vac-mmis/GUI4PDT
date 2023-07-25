[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Stores](Stores.md) / Material

# Namespace: Material

[Stores](Stores.md).Material

This store is used to load, store and provide materials

## Table of contents

### Functions

-   [load](Stores.Material.md#load)
-   [get](Stores.Material.md#get)
-   [find](Stores.Material.md#find)

## Functions

### load

▸ **load**(): `Promise`<`void`\>

Loads all available materials for API providing

#### Returns

`Promise`<`void`\>

#### Defined in

src/store/material.store.ts:40

---

### get

▸ **get**(): [`MaterialFile`](Types.Files.md#materialfile)[]

Get loaded materials

#### Returns

[`MaterialFile`](Types.Files.md#materialfile)[]

Array of all loaded materials

#### Defined in

src/store/material.store.ts:61

---

### find

▸ **find**(`name`): `undefined` \| [`MaterialFile`](Types.Files.md#materialfile)

Find loaded material by its name

#### Parameters

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| `name` | `string` | Name of the targeted material |

#### Returns

`undefined` \| [`MaterialFile`](Types.Files.md#materialfile)

Targeted material if exists, else undefined

#### Defined in

src/store/material.store.ts:71
