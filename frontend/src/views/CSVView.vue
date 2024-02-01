<template>
  <div>
    <v-container>
      <v-form @submit.prevent="submitFile" enctype="multipart/form-data">

        <v-label>
          <h1 slot="default">Add CSV</h1>
        </v-label>
        <v-spacer vertical></v-spacer>

        <v-file-input :rules="fileRules" v-model="file" label="Choose your file" accept=".csv"
          prepend-icon="fas fa-file-import"></v-file-input>

        <v-btn color="primary" type="submit" :disabled="!formIsValid">Upload</v-btn>
      </v-form>
    </v-container>
  </div>
</template>   
  
<script setup lang="ts">


import axios from "axios";
import { ref, computed } from "vue";

import { PDTStore } from "@/store/pdt.store";
import { storeToRefs } from "pinia";


const { getPDT } = storeToRefs(PDTStore());



const file = ref<File[]>([]);




const fileRules = [(value: any) => {
  if (value.length > 0) return true
  return 'You must choose at least 1 file'
},];


const formIsValid = computed(() => {
  return fileRules.every(rule => rule(file.value) === true);
});

const submitFile = async () => {

  const projectName = getPDT.value.name;



  if (!file.value || !projectName) {
    return
  }
 

  const formData = new FormData();


  formData.append("projectName", projectName);
  formData.append("csvFile", file.value[0]);


  await axios.post('/uploadcsv', formData)
    .then((response) => {

    
    })
    .catch((error) => {
      console.log(error.response.data);

    });



}

</script>