<template>
  <div>
    <v-container>
      <v-form @submit.prevent="submitFile" enctype="multipart/form-data">

        <v-label>
          <h1 slot="default">New</h1>
        </v-label>
        <v-spacer vertical></v-spacer>
        <v-text-field :rules="projectNameRules" v-model="projectName" label="Project Name"
          prepend-icon="fas fa-file-signature"></v-text-field>
      
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-btn color="primary" type="submit" :disabled="!formIsValid">Upload</v-btn>
      </v-form>
    </v-container>
  </div>
</template>   
  
<script setup lang="ts">


import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';



const projectName = ref();

const errorMessage = ref("");


const router = useRouter();



const projectNameRules = [(value: any) => {
  if (value) return true
  return 'You must give your project a name'
},];

const formIsValid = computed(() => {
  return projectNameRules.every(rule => rule(projectName.value) === true);
});

const submitFile = async () => {

  console.log(projectName.value)
  const data = {
    name: projectName.value,

  };

  await axios.post('/newfromempty', data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      errorMessage.value = "";
     
      
    })
    .catch((error) => {
      console.log(error)
      errorMessage.value = error.response?.data.message || "An error occured.";
    

    });
    router.push("/");

 
}

</script>