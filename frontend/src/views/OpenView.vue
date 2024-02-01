<template>
    <div>
        <v-container>
            <v-label>
                <h1 slot="default">Open</h1>
            </v-label>
            <v-card max-width="300">
                <v-list dense :key="update">

                    <v-list-item v-for="(item, index) in PDTList" :key="index" :value="item" @click="onOpen(item)"
                        color="primary">
                        <v-row>
                            <v-col cols="10">
                                {{ item }}
                            </v-col>

                        </v-row>

                    </v-list-item>
                </v-list>
                
            </v-card>


        </v-container>
    </div>
</template>   
  
<script setup lang="ts">




import { ref } from "vue";
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


const onOpen = async (selected: string) => {
    const offlineMode = import.meta.env.VITE_OFFLINE_MODE === 'true';

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

    console.log(pdt.getPDT)



    router.push("/plot");

}



onBeforeMount(async () => {
    const offlineMode = import.meta.env.VITE_OFFLINE_MODE === 'true';

    if (offlineMode) {
        pdt.listLocally()
            .then((pdtList: string[]) => {
                PDTList.value = pdtList;
               

            }).catch((err: string) => {
                console.error(err)
            });
    } else {
        pdt.list()
            .then((pdtList: string[]) => {
                PDTList.value = pdtList;
              
            })
            .catch((err: string) => {
                console.error(err);

            });
    }

});



</script>