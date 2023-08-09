[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Stores](Stores.md) / ModelStore

# Namespace: ModelStore

[Stores](Stores.md).ModelStore

This store is used to load, store and provide models

## Table of contents

### Functions

-   [load](Stores.ModelStore.md#load)
-   [get](Stores.ModelStore.md#get)
-   [find](Stores.ModelStore.md#find)

## Functions

### load

▸ **load**(): `Promise`<`void`\>

Loads all available models for API providing

#### Returns

`Promise`<`void`\>

#### Defined in

src/store/model.store.ts:19

---

### get

▸ **get**(): [`ModelFile`](Types.Files.md#modelfile)[]

Get loaded models

#### Returns

[`ModelFile`](Types.Files.md#modelfile)[]

Array of all loaded models

#### Defined in

src/store/model.store.ts:46

---

### find

▸ **find**(`name`): `undefined` \| [`ModelFile`](Types.Files.md#modelfile)

Find loaded model by its name

#### Parameters

| Name   | Type     | Description                |
| :----- | :------- | :------------------------- |
| `name` | `string` | Name of the targeted model |

#### Returns

`undefined` \| [`ModelFile`](Types.Files.md#modelfile)

Targeted model if exists, else undefined

#### Defined in

src/store/model.store.ts:58
