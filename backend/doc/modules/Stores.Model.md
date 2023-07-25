[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Stores](Stores.md) / Model

# Namespace: Model

[Stores](Stores.md).Model

This store is used to load, store and provide models

## Table of contents

### Functions

-   [load](Stores.Model.md#load)
-   [get](Stores.Model.md#get)
-   [find](Stores.Model.md#find)

## Functions

### load

▸ **load**(): `Promise`<`void`\>

Loads all available models for API providing

#### Returns

`Promise`<`void`\>

#### Defined in

src/store/model.store.ts:18

---

### get

▸ **get**(): [`ModelFile`](Types.Files.md#modelfile)[]

Get loaded models

#### Returns

[`ModelFile`](Types.Files.md#modelfile)[]

Array of all loaded models

#### Defined in

src/store/model.store.ts:45

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

src/store/model.store.ts:57
