[API](../../../../../API.md) > [Controllers](../../../index.md) > [PDT](../index.md) > getPDTList

# Function: getPDTList

> **getPDTList**(`req`, `res`): `void`

Get available PDT names

## Parameters

| Parameter | Type                                                                                       | Description                                                                              |
| :-------- | :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `req`     | `Request`\< `ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\< `string`, `any` \> \> | Unused here                                                                              |
| `res`     | `Response`\< `any`, `Record`\< `string`, `any` \> \>                                       | HTTP Response :<br />- 200 confirmation + PDT names sorted by alphabetic ascending order |

## Returns

`void`

## Source

src/controllers/pdt.controller.ts:18
