[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Controllers](Controllers.md) / PDT

# Namespace: PDT

[Controllers](Controllers.md).PDT

Express.JS controllers for PDTs

## Table of contents

### Functions

-   [getPDTList](Controllers.PDT.md#getpdtlist)
-   [findPDTByName](Controllers.PDT.md#findpdtbyname)

## Functions

### getPDTList

▸ **getPDTList**(`req`, `res`): `void`

Get available PDT names

#### Parameters

| Name  | Type                                                                                 | Description                                                                         |
| :---- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | Unused here                                                                         |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\>                                       | HTTP Response : - 200 confirmation + PDT names sorted by alphabetic ascending order |

#### Returns

`void`

#### Defined in

src/controllers/pdt.controller.ts:17

---

### findPDTByName

▸ **findPDTByName**(`req`, `res`): `void`

Get PDT by name

#### Parameters

| Name  | Type                                                                                 | Description                                                                                 |
| :---- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | HTTP Request. Must have `name` attribute with the desired PDT                               |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\>                                       | HTTP Response : - 200 confirmation + requested PDT - 404 error if desired PDT doesn't exist |

#### Returns

`void`

#### Defined in

src/controllers/pdt.controller.ts:28
