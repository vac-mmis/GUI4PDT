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
    vertical: boolean = false,
    spacing: string = "8pt"
): string {
    let precision_index = findMaxIndex(vector,precision)

    if (precision_index > precision)
        precision_index = precision
    const vectorString = vector
        .map((i) => i.toFixed(precision_index))
        .join(vertical ? String.raw`\\` : ` & \\hspace{${spacing}}`);
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
export function matrixToKaTeX(matrix: number[][], precision: number = 4, spacing: string = "8pt"): string {
    let precision_index = findMaxIndex(matrix, precision)
    if (precision_index > precision)
        precision_index = precision
    const matrixString = matrix
        .map((line1) => line1.map((i) => i.toFixed(precision_index)).join(` &\\hspace{${spacing}} `))
        .join(String.raw`\\`);
    return String.raw`\begin{pmatrix}${matrixString} \end{pmatrix}`;
}

function findMaxIndex(arr: number[] | number[][], precision: number): number {
    // Flatten the array
    let flattened: number[] = arr.flat(Infinity) as number[];
    // Find the maximum value and its index

    flattened = flattened.map((num) => {
        if ((num.toString().split('.')[1] || '').length > precision){
            return  roundToDecimals(num, precision);

        } else {
            return num;
        }
        
    })
    let maxDecimalLength = 0;
    flattened.forEach(number => {
        const numberString = number.toString();
        const decimalPart = numberString.split('.')[1] || ''; // Get the part after the comma
        maxDecimalLength = Math.max(maxDecimalLength, decimalPart.length);
    });

    return maxDecimalLength;
}

function roundToDecimals(number: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}