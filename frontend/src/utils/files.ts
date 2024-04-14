/**
 * TODO WRITE DOCUMENTATION

 */

export function saveFile(data:any, fileName:string) {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Trigger a click event on the anchor element
    a.click();

    // Clean up
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}