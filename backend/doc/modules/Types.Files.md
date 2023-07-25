[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Types](Types.md) / Files

# Namespace: Files

[Types](Types.md).Files

This file contains types used to define file blobs for materials and models served by this API.

## Table of contents

### Type Aliases

-   [MaterialFile](Types.Files.md#materialfile)
-   [ModelFile](Types.Files.md#modelfile)

## Type Aliases

### MaterialFile

Ƭ **MaterialFile**: `Object`

Represents material blob format provided by the API

#### Type declaration

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `name`      | `string` | name        |
| `albedo`    | `string` | -           |
| `ao`        | `string` | -           |
| `metalness` | `string` | -           |
| `normal`    | `string` | -           |
| `roughness` | `string` | -           |

#### Defined in

src/types/file.types.ts:10

---

### ModelFile

Ƭ **ModelFile**: `Object`

Represents model blob format provided by the API

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `name`    | `string` |
| `content` | `string` |

#### Defined in

src/types/file.types.ts:23
