[API](../../../../../API.md) > [Controllers](../../../index.md) > [PDT](../index.md) > findPDTByName

# Function: findPDTByName

> **findPDTByName**(`req`, `res`): `void`

Get PDT by name

## Parameters

| Parameter | Type                                                                                       | Description                                                                                           |
| :-------- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `req`     | `Request`\< `ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\< `string`, `any` \> \> | HTTP Request. Must have `name` attribute with the desired PDT                                         |
| `res`     | `Response`\< `any`, `Record`\< `string`, `any` \> \>                                       | HTTP Response :<br />- 200 confirmation + requested PDT<br />- 404 error if desired PDT doesn't exist |

## Returns

`void`

## Source

src/controllers/pdt.controller.ts:29
