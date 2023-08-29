[API](../../../API.md) > [Router](../index.md) > router

# Function: router

> **router**(
> `req`,
> `res`,
> `next`): `void`

Main route which assemble all others. Any new submodule route should be imported and added here

## Parameters

| Parameter | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `req`     | `Request`\< `ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\< `string`, `any` \> \> |
| `res`     | `Response`\< `any`, `Record`\< `string`, `any` \>, `number` \>                             |
| `next`    | `NextFunction`                                                                             |

## Returns

`void`

## Source

node_modules/@types/express-serve-static-core/index.d.ts:71
