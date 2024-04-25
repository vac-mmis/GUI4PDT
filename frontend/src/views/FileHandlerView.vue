<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div>
        <v-container>
            <v-form @submit.prevent="submitFile" enctype="multipart/form-data">
                <v-label>
                    <template v-slot:default>
                        <h1>Import</h1>
                    </template>
                </v-label>
                <v-spacer vertical></v-spacer>
                <v-text-field
                    :rules="projectNameRules"
                    v-model="projectName"
                    label="Project Name"
                    prepend-icon="fas fa-file-signature"
                ></v-text-field>
                <v-file-input
                    :rules="fileRules"
                    v-model="files"
                    label="Choose your file(s)"
                    multiple
                    accept=".json,.csv,.png,.zip,.bmp,.jpg,.jpeg,.glb"
                    prepend-icon="fas fa-file-import"
                ></v-file-input>

                <v-btn color="primary" type="submit" :disabled="!formIsValid">Upload</v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";

const files = ref<File[]>([]);
const projectName = ref();

const fileRules = [
    (value: any) => {
        if (value.length > 0) return true;
        return "You must choose at least 1 file";
    },
];

const projectNameRules = [
    (value: any) => {
        if (value) return true;
        return "You must give your project a name";
    },
];

const formIsValid = computed(() => {
    return (
        fileRules.every((rule) => rule(files.value) === true) &&
        projectNameRules.every((rule) => rule(projectName.value) === true)
    );
});

const submitFile = async () => {
    if (!files.value || !projectName.value) {
        return;
    }
    if (files.value.length === 0) {
        return;
    }

    const formData = new FormData();

    formData.append("projectName", projectName.value);
    formData.append("firstFileName", files.value[0].name);

    files.value.forEach((file) => {
        formData.append("files", file);
    });

    await axios
        .post("/upload", formData)
        .then(() => {})
        .catch((error) => {
            console.log(error.response.data);
        });
};
</script>
