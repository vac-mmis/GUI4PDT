<template>
  <div>
    <v-container>
      <v-label>
        <h1 slot="default">Open</h1>
      </v-label>
      <v-card max-width="300">
        <v-list density="compact" :key="update">
          <v-list-item v-for="(item, index) in PDTList" :key="index" :value="item" @click="onOpen(item)" to="/"
            color="primary">{{ item }}</v-list-item>
        </v-list>

      </v-card>

    </v-container>
  </div>
</template>   
  
<script setup lang="ts">



import axios from "axios";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { PDTStore } from "@/store/pdt.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";
import { worldStore } from "@/store/world.store";
import { onBeforeMount } from "vue";
import { onBeforeUnmount } from "vue";



const pdt = PDTStore();
const models = modelStore();
const materials = materialStore();

const world = worldStore();


const PDTList = ref<string[]>();

const update = ref(0);

const onOpen = (selected: string) => {
  pdt.fetch(selected)
    .catch((err: string) => {
      console.error(err);
    });

}


onBeforeMount(async () => {
  await pdt.list()
    .then((pdtList: string[]) => {
      PDTList.value = pdtList;
    })
    .catch((err: string) => {
      console.error(err);
    });
});

</script>