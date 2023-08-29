[API](../../../../../API.md) > [Controllers](../../../index.md) > [Material](../index.md) > findMaterialByName

# Function: findMaterialByName

> **findMaterialByName**(`req`, `res`): `void`

Get material by name

## Parameters

| Parameter | Type                                                                                       | Description                                                                                                     |
| :-------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `req`     | `Request`\< `ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\< `string`, `any` \> \> | HTTP Request. Must have `name` attribute with the desired material                                              |
| `res`     | `Response`\< `any`, `Record`\< `string`, `any` \> \>                                       | HTTP Response :<br />- 200 confirmation + requested material<br />- 404 error if desired material doesn't exist |

## Returns

`void`

## Source

src/controllers/material.controller.ts:29
