[API](../../../API.md) > [Models](../index.md) > PDTTimestampsToPDTJSON

# Function: PDTTimestampsToPDTJSON

> **PDTTimestampsToPDTJSON**(`timestampsFiles`): `Promise`\< \{ > `name`: `string`;
> `objects`: [`ObjectJSON`](../../namespace.Types/namespaces/namespace.Objects/type-aliases/type-alias.ObjectJSON.md)[];
> } \>

Transforms timestamps PDT files into object attributes.

## Parameters

| Parameter         | Type       | Description                        |
| :---------------- | :--------- | :--------------------------------- |
| `timestampsFiles` | `string`[] | Array of all PDT timestamps files. |

## Returns

`Promise`\< \{
`name`: `string`;
`objects`: [`ObjectJSON`](../../namespace.Types/namespaces/namespace.Objects/type-aliases/type-alias.ObjectJSON.md)[];
} \>

JSON PDT content with time representation inside object attributes.

## Source

src/models/pdt.model.ts:25

## Throws

`JSON Data undefined` if JSON files parsing failed.
