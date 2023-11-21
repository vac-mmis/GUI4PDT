<template>
    <v-app-bar color="primary" dark collapse-on-scroll>

        <v-row align-md="center" class="mx-2">
            

                <v-img src="uni_kugel.svg" max-height="30" max-width="30">

                </v-img>
           

            <v-col cols="auto">


                <v-app-bar-title> OTC-DaTA GUI</v-app-bar-title>
            </v-col>

            <v-col cols="auto">

                <MultiMenu></MultiMenu>


            </v-col>


        </v-row>

    </v-app-bar>
</template>

<script lang="ts" setup>


import MultiMenu from "@/components/MainComponents/MultiMenu.vue";

</script>


<style></style>

