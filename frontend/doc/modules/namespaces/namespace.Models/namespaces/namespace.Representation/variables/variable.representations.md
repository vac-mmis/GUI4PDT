# Variable: representations

> `const` **representations**: `Record`\< `string`, _typeof_ [`ObjectRepresentation`](../classes/class.ObjectRepresentation.md) \| _typeof_ [`Box`](../classes/class.Box.md) \| _typeof_ [`Scatter3D`](../classes/class.Scatter3D.md) \| _typeof_ [`Surface`](../classes/class.Surface.md) \| _typeof_ [`ZVariations`](../classes/class.ZVariations.md) \>

Dictionary which associates representation names to their constructors

## Remark

Please add `static repName` attribute to each new implementation, this is used here to build this dictionary.

## Defined In

models/Representations/index.ts:32

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
