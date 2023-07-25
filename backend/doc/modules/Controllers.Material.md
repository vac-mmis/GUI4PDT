[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Controllers](Controllers.md) / Material

# Namespace: Material

[Controllers](Controllers.md).Material

## Table of contents

### Functions

-   [getMaterials](Controllers.Material.md#getmaterials)
-   [findMaterialByName](Controllers.Material.md#findmaterialbyname)

## Functions

### getMaterials

▸ **getMaterials**(`req`, `res`): `void`

Get available materials

#### Parameters

| Name  | Type                                                                                 | Description                                              |
| :---- | :----------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | Unused here                                              |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\>                                       | HTTP Response : - 200 confirmation + available materials |

#### Returns

`void`

#### Defined in

src/controllers/material.controller.ts:17

---

### findMaterialByName

▸ **findMaterialByName**(`req`, `res`): `void`

Get material by name

#### Parameters

| Name  | Type                                                                                 | Description                                                                                           |
| :---- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | HTTP Request. Must have `name` attribute with the desired material                                    |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\>                                       | HTTP Response : - 200 confirmation + requested material - 404 error if desired material doesn't exist |

#### Returns

`void`

#### Defined in

src/controllers/material.controller.ts:28
