/**
 * TODO WRITE DOCUMENTATION

 */

import JSZip from 'jszip';

export function saveFile(blob:  Blob, fileName:string) {
   
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;

   
    document.body.appendChild(a);

    
    a.click();

   
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

export function splitDataAndZip(data: any, chunkSize: number, fileName:string): void {
    
    const files: { name: string; content: string }[] = [];

    // Splitting the data into chunks
    let chunks = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    // Writing each chunk to a separate JSON file
    chunks.forEach((chunk, index) => {
        const filePath = `${fileName}_${index}.json`;
        files.push({name:filePath,content:JSON.stringify(chunk)})
       
    });

    createZip(files);

}

async function createZip(files: { name: string; content: string }[]): Promise<void> {
    const zip = new JSZip();

    // Dateien zum Zip-Archiv hinzufügen
    files.forEach(file => {
        zip.file(file.name, file.content);
    });

    zip.generateAsync({ type: 'blob' }).then(blob => {
        // Save the ZIP archive using the saveFile function
        saveFile(blob, 'archive.zip');
    });
    
}

export function loadAndMerge(fileName:string){

    fetch(fileName)
    .then(async (res) => {
        const zipData = await res.arrayBuffer(); // Wait for the ArrayBuffer to be resolved

        const zip = await JSZip.loadAsync(zipData); // Wait for the ZIP file to be loaded

        const jsonContents = [];

        for (const [fileName, file] of Object.entries(zip.files)) {
            if (fileName.endsWith('.json')) {
                // Read the content of the JSON file
                const content = await file.async('text'); // Wait for the file content to be read
                // Parse JSON content and add to the list
                jsonContents.push(JSON.parse(content));
            }
        }
        const mergedList = jsonContents.reduce((acc, curr) => acc.concat(curr), []);
       
    })
    .catch((err) => {
        console.log(err);
    });
}
