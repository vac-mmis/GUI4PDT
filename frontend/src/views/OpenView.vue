<template>
  <div>
    <v-container>
      <v-label>
        <h1 slot="default">Open</h1>
      </v-label>
      <v-card max-width="300">
        <v-list dense :key="update">

          <v-list-item v-for="(item, index) in PDTList" :key="index" :value="item" @click="onOpen(item)" color="primary">
            <v-row>
              <v-col cols="10">
                {{ item }}
              </v-col>
              
            </v-row>

          </v-list-item>
        </v-list>
        <v-row class="justify-space-between pa-3">
          <v-col cols="4">
            <v-btn block color="primary">Open</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block color="warning">Rename</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block color="error">Delete</v-btn>
          </v-col>
        </v-row>
      </v-card>


    </v-container>
  </div>
</template>   
  
<script setup lang="ts">




import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { PDTStore } from "@/store/pdt.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";
import { worldStore } from "@/store/world.store";
import { onBeforeMount } from "vue";






const pdt = PDTStore();
const models = modelStore();
const materials = materialStore();

const world = worldStore();

const router = useRouter();

const PDTList = ref<string[]>();

const update = ref(0);

const onOpen = (selected: string) => {
  pdt.fetch(selected)
    .catch((err: string) => {
      console.error(err);
    });


  router.push("/plot");

}

const onDelete = (item: string) => {
  console.log("TEST")
}



onBeforeMount(async () => {
  await pdt.list()
    .then((pdtList: string[]) => {
      PDTList.value = pdtList;
      console.log(pdtList);

    })
    .catch((err: string) => {
      console.error(err);
    });
});


</script>