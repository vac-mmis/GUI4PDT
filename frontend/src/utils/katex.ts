/**
 * Module used to convert data into KaTeX strings.
 *
 * @module Utils.katex
 */

/**
 * Write number vector as KaTeX matrix.
 *
 * @param array Vector to write in KaTeX.
 * @param precision Number of decimal places to be kept. @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision | Number.prototype.toPrecision()}
 * @param isVertical If `true`, writes a vertical vector instead of horizontal.
 * @returns KaTeX array.
 */
export function vectorToKaTeX(
    vector: number[],
    precision: number = 4,
    vertical: boolean = false
): string {
    const vectorString = vector
        .map((i) => i.toPrecision(precision))
        .join(vertical ? String.raw`\\` : "&");
    return String.raw`\begin{pmatrix} ${vectorString} \end{pmatrix}`;
}

/**
 * Write number matrix as KaTeX matrix.
 *
 * @param matrix Matrix to write in KaTeX.
 * @param precision Number of decimal places to be kept. @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision | Number.prototype.toPrecision()}
 *
 * @returns KaTeX matrix.
 */
export function matrixToKaTeX(matrix: number[][], precision: number = 4): string {
    const matrixString = matrix
        .map((line1) => line1.map((i) => i.toPrecision(precision)).join("&"))
        .join(String.raw`\\`);
    return String.raw`\begin{pmatrix} ${matrixString} \end{pmatrix}`;
}
