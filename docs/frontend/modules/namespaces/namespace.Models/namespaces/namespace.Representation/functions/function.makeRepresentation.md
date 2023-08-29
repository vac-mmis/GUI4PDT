# Function: makeRepresentation

> **makeRepresentation**(`type`, ...`params`): [`Representation`](../interfaces/interface.Representation.md)

Factory method to create a representation from any data.

## Parameters

| Parameter   | Type                                                   | Description                                                                                                 |
| :---------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `type`      | `string`                                               | Name of the desired representation, used if given parameters could generate several type of representation. |
| ...`params` | [`RepParams`](../type-aliases/type-alias.RepParams.md) | Representation parameters, following desired representation constructor prototype                           |

## Returns

[`Representation`](../interfaces/interface.Representation.md)

Concrete representation instance.

## Defined In

models/Representations/index.ts:67

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
