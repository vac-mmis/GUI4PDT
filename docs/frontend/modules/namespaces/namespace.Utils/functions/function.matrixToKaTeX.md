# Function: matrixToKaTeX

> **matrixToKaTeX**(`matrix`, `precision` = `4`): `string`

Write number matrix as KaTeX matrix.

## Parameters

| Parameter   | Type         | Default value | Description                          |
| :---------- | :----------- | :------------ | :----------------------------------- |
| `matrix`    | `number`[][] | `undefined`   | Matrix to write in KaTeX.            |
| `precision` | `number`     | `4`           | Number of decimal places to be kept. |

## Returns

`string`

KaTeX matrix.

## See

[Number.prototype.toPrecision()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision)

## Defined In

utils/katex.ts:34

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
