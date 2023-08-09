[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Stores](Stores.md) / PDTStore

# Namespace: PDTStore

[Stores](Stores.md).PDTStore

This store is used to load, store and provide all available PDT

## Table of contents

### Functions

-   [load](Stores.PDTStore.md#load)
-   [get](Stores.PDTStore.md#get)
-   [list](Stores.PDTStore.md#list)
-   [find](Stores.PDTStore.md#find)

## Functions

### load

▸ **load**(): `Promise`<`void`\>

Loads all available PDT for API providing

#### Returns

`Promise`<`void`\>

#### Defined in

src/store/pdt.store.ts:19

---

### get

▸ **get**(): `Partial`<[`PDT`](../classes/Models.PDT.md)\>[]

Get loaded PDT

#### Returns

`Partial`<[`PDT`](../classes/Models.PDT.md)\>[]

Array of all loaded materials

#### Defined in

src/store/pdt.store.ts:40

---

### list

▸ **list**(): `string`[]

List all loaded PDT names

#### Returns

`string`[]

Array of loaded PDT names

#### Defined in

src/store/pdt.store.ts:49

---

### find

▸ **find**(`name`): [`PDT`](../classes/Models.PDT.md) \| `undefined`

Find loaded PDT by its name

#### Parameters

| Name   | Type     | Description              |
| :----- | :------- | :----------------------- |
| `name` | `string` | Name of the targeted PDT |

#### Returns

[`PDT`](../classes/Models.PDT.md) \| `undefined`

Targeted PDT if exists, else undefined

#### Defined in

src/store/pdt.store.ts:59
