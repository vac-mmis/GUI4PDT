<template>
    <v-overlay :model-value="getStatus.status === `loading PDT` || getStatus.status === `loading world`" contained
        class="align-center justify-center">
        <div class="d-flex flex-column align-center">
            <span class="text-h5 text-primary pa-4">{{ getStatus.message }}</span>
            <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
    </v-overlay>
</template>



<script setup lang="ts">




import { ref } from "vue";
import { useRouter } from "vue-router";
import { PDTStore } from "@/store/pdt.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";
import { worldStore } from "@/store/world.store";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";



const pdt = PDTStore();
const models = modelStore();
const materials = materialStore();


const { getStatus } = storeToRefs(worldStore());
const world = worldStore();

const router = useRouter();

const PDTList = ref<string[]>();




const onOpen = async (selected: string) => {
    const offlineMode = import.meta.env.VITE_OFFLINE_MODE === 'true';

    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });

    if (offlineMode) {
        await models.fetchLocally().catch((err: string) => {
            console.error(err);
        });
        await materials.fetchLocally().catch((err: string) => {
            console.error(err);
        });
        await pdt.fetchLocally(selected)
            .catch((err: string) => {
                console.error(err);
            });

    } else {
        await pdt.fetchRemotely(selected)
            .catch((err: string) => {
                console.error(err)
            });
    }

    router.push("/plot");

}



onBeforeMount(async () => {

    const defaultOpen = "demo_pdt"

    const offlineMode = import.meta.env.VITE_OFFLINE_MODE === 'true';

    if (offlineMode) {


        pdt.listLocally()
            .then((pdtList: string[]) => {
                PDTList.value = pdtList;
               if(pdtList.includes(defaultOpen)){
                onOpen(defaultOpen)
               } else{
                onOpen(pdtList[0])
               }
                

            }).catch((err: string) => {
                console.error(err)
            });

    } else {
        pdt.list()
            .then((pdtList: string[]) => {
                PDTList.value = pdtList;
                if(pdtList.includes(defaultOpen)){
                onOpen(defaultOpen)
               } else{
                onOpen(pdtList[0])
               }
                

            })
            .catch((err: string) => {
                console.error(err);

            });
    }

});



</script>