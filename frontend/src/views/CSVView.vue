<template>
    <div>
        <v-container>
            <v-form @submit.prevent="submitFile" enctype="multipart/form-data">
                <v-label>
                    <template v-slot:default>
                        <h1>Add CSV for ({{ pdtName }})</h1>
                    </template>
                </v-label>
                <v-spacer vertical></v-spacer>

                <v-file-input
                    :rules="fileRules"
                    v-model="file"
                    label="Choose your file"
                    accept=".csv"
                    prepend-icon="fas fa-file-import"
                ></v-file-input>
                <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
                <v-btn color="primary" type="submit" :disabled="!formIsValid">Create</v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { PDTStore } from "@/store/pdt.store";
import { storeToRefs } from "pinia";

const router = useRouter();

const { getPDT } = storeToRefs(PDTStore());

const pdtName = ref(getPDT.value.name ?? "");

const file = ref<File>();

const fileRules = [
    (value: any) => {
        if (value !== undefined) return true;
        return "You must choose 1 file";
    },
];

const errorMessage = ref("");
const formIsValid = computed(() => {
    return fileRules.every((rule) => rule(file.value) === true);
});

const submitFile = async () => {
    const projectName = getPDT.value.name;

    if (!file.value || !projectName) {
        errorMessage.value = "You first need to open a PDT.";
        return;
    }

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("csvFile", file.value);

    await axios
        .post("/uploadcsv", formData)
        .then(() => {
            errorMessage.value = "";
            router.push("/plot");
        })
        .catch((error) => {
            console.log(error);
            errorMessage.value = error.response?.data.message || "An error occured.";
        });
};
</script>
