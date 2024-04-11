<template>
    <v-app-bar color="primary" dark collapse-on-scroll>

        <v-row align-md="center" justify="space-between" class="mx-10">

            <v-col-auto>

                <v-app-bar-title> OTC-DaTA GUI</v-app-bar-title>
            </v-col-auto>

            <v-col-auto class="me-auto mx-10">

                <MultiMenu></MultiMenu>


            </v-col-auto>

            <v-col-auto>
                <v-row>
                    <v-col align-self="center">
                        <v-icon icon="fas fa-triangle-exclamation"></v-icon>

                        
                    </v-col>
                    <v-col >
                       <v-label class="text-h5" color="white">
                         {{test}}
                       </v-label>
                           
            
                    </v-col>
                </v-row>


            </v-col-auto>


        </v-row>

    </v-app-bar>
</template>

<script lang="ts" setup>


import MultiMenu from "@/components/MainComponents/MultiMenu.vue";
import { computed } from "vue";

const test = computed( () => {
    
    if (import.meta.env.VITE_OFFLINE_MODE === "true"){
        return "OFFLINE MODE";
    } else {
        return "ONLINE MODE";
    }
    
});

</script>


<style></style>
