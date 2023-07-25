[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / Router

# Namespace: Router

Provides all available routes

To add a new route to this API, please follows this instructions :

1. Choose a relevant route for serving your controller. You can follow [this guide](https://restfulapi.net/resource-naming/) to write them well.
2. Determine what request method do you need (GET, POST, PUT, DELETE...).
3. Create a new controller in [Controllers](Controllers.md) to handle your request and serve your desired response. If it concerns an model or a store which already exists, please just add it in the dedicated controller module. For example, a new route for PDT should have its controller in [Router](Router.md).
4. Add this route in the relevant route module. To keep the previous example, a new route for PDT should be in `src/routes/pdt.route.ts`. If this route needs a new route submodules, it should be added in the `router` const in this module.

**`See`**

[Express.JS Request](https://expressjs.com/en/4x/api.html#app)

## Table of contents

### Functions

-   [router](Router.md#router)

## Functions

### router

▸ **router**(`req`, `res`, `next`): `void`

Main route which assemble all others. Any new submodule route should be imported and added here

#### Parameters

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `req`  | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res`  | `Response`<`any`, `Record`<`string`, `any`\>, `number`\>                             |
| `next` | `NextFunction`                                                                       |

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:71
