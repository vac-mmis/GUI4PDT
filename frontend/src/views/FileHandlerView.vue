<template>
    <v-container>
        <v-file-input accept=".json" label="File input" v-model="selectedFile" @change="handleFileChange"></v-file-input>
    </v-container>
    <v-container>
        <pre>
        {{ jsonData }}
    </pre>
    </v-container>
</template>
  
<script setup lang="ts">


import { ref } from "vue";
import { fileStore } from '@/store/file.store';


const jsonData = ref("No Data")

const fstore = fileStore()

const selectedFile = ref<File[]>()

const handleFileChange = async () => {
    if (selectedFile.value) {
        fstore.updateFiles(selectedFile.value)

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;
            try {
                const jsonObject = JSON.parse(fileContent); // Hier wird der Dateiinhalt in ein JSON-Objekt umgewandelt
                jsonData.value = jsonObject;
            } catch (error) {
                console.error('Fehler beim Parsen der JSON-Datei:', error);
            }
        };

        reader.readAsText(fstore.getSelectedFiles[0]); // Datei als Text lesen
    } else {
        console.log('Keine Datei ausgewählt');
    }
}

</script>