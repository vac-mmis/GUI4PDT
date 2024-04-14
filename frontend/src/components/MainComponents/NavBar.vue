<template>
    <v-app-bar color="primary" dark collapse-on-scroll>

        <v-row align-md="center" justify="space-between" class="mx-10">

            <v-col cols="auto">

                <v-app-bar-title> OTC-DaTA GUI</v-app-bar-title>
            </v-col>

            <v-col cols="auto" class="me-auto mx-10">

                <MultiMenu></MultiMenu>


            </v-col>

            <v-col cols="auto">


                <v-btn v-if="!offline" @click="saveDistributionData"> Save_Distribution_Data</v-btn>

            </v-col>

            <v-col cols="auto">
                <v-row>
                    <v-col align-self="center">
                        <v-icon icon="fas fa-triangle-exclamation"></v-icon>
                    </v-col>
                    <v-col>
                        
                        <v-label v-if="offline" class="text-h5" color="white">
                            {{ "OFFLINE_MODE" }}
                        </v-label>
                        <v-label v-else class="text-h5" color="white">
                            {{ "ONLINE_MODE" }}
                        </v-label>
                        
                    </v-col>
                </v-row>
            </v-col>


        </v-row>

    </v-app-bar>
</template>

<script lang="ts" setup>


import MultiMenu from "@/components/MainComponents/MultiMenu.vue";
import { computed ,ref} from "vue";
import { PDTStore } from "@/store/pdt.store";
import { saveFile } from "@/utils";

const pdt = PDTStore()

const offline = ref<boolean>(import.meta.env.VITE_OFFLINE_MODE === 'true')



const saveDistributionData = async () => {

    console.log("Start loading data and saving the distribution")


    const pdts = await Promise.all(
        pdt.getPDTList.map(async (name: string) => {
            await pdt.fetchRemotely(name);
            return pdt.getPDT
        })
    );
  
    for (let pdt of pdts) {
        console.log("calculating: " + pdt.name)
        let objects = []
        for (let index = 0;index < pdt.objects.length;index++) {
            let points = []

            for (let i = 0; i < pdt.getTimeLength(); i++) {

               

                const dist = pdt.objects[index].location.dist[i];
                
                if (dist){
                if ("type" in dist) {
                    points.push(dist.representation(true));

                }}
            }
            
            objects.push(points)
            console.log("progress: " + index, "of",pdt.objects.length)
            

        }
        console.log(objects)
        console.log(objects.length)
        saveFile(objects,pdt.name+"_dist.json")
    }


    console.log("finished")
    

    


}

</script>


<style></style>
