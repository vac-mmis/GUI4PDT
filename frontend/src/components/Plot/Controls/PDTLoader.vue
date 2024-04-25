<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { PDTStore } from "@/store/pdt.store";
import { worldStore } from "@/store/world.store";
import { modelStore } from "@/store/model.store";
import { materialStore } from "@/store/material.store";

const models = modelStore();
const materials = materialStore();
const pdt = PDTStore();
const world = worldStore();

const selectedPDT = ref(pdt.getPDT.name ?? "");

const default_pdt = import.meta.env.VITE_DEFAULT_PDT ?? "";

onBeforeMount(async () => {
    console.log(default_pdt);
    if (selectedPDT.value !== "") {
        world.setStatus({ status: "success", message: `` });
        return;
    }
    world.setStatus({ status: "waiting", message: `Wait for PDT` });

    pdt.list()
        .then((pdtList: string[]) => {
            if (pdtList.includes(default_pdt)) {
                selectedPDT.value = default_pdt;
            } else {
                selectedPDT.value = pdtList[0];
            }
        })
        .catch((err: string) => {
            world.setStatus({ status: "error", message: "No PDT found or server unavailable" });
            console.error(err);
        });

    await models.fetchData();
    await materials.fetchData();

    world.setStatus({ status: "loading PDT", message: "Fetching selected PDT..." });
    pdt.fetchData(selectedPDT.value)
        .catch((err: string) => {
            world.setStatus({ status: "error", message: err });
            console.error(err);
        })
        .finally(() => {
            world.setStatus({
                status: "loading world",
                message: `${selectedPDT.value} loaded successfully`,
            });
        });

    // Load PDT name list

    // Load models and materials

    //
    //     if (offlineMode) {
    //         models.fetchLocally()
    //             .then(() => materials.fetchLocally())
    //             .then(() => pdts.listLocally()).then((pdtList: string[]) => {
    //             })
    //             .catch((err: string) => {
    //                 console.error(err);
    //             }).then(() => pdts.fetchLocally(getPDT.value.name ?? "default")
    //                 .catch((err: string) => {
    //                     world.setStatus({ status: "error", message: err });
    //                     console.error(err);
    //                 })
    //                 .finally(() => {
    //                     world.setStatus({
    //                         status: "loading world",
    //                         message: `${getPDT.value.name} loaded successfully`,
    //                     });
    //                 }));
    //     } else {
    //         manager = new Manager("http://localhost:3000", { transports: ['websocket'] });
    //         socket = manager.socket("/");
    //         socket.on("connect", () => {
    //             models.fetchRemotely()
    //                 .then(() => materials.fetchRemotely())
    //                 .then(() => pdts.list()).then((pdtList: string[]) => {
    //                 })
    //                 .catch((err: string) => {
    //                     console.error(err);
    //                 }).then(() => pdts.fetchRemotely(getPDT.value.name ?? "default")
    //                     .catch((err: string) => {
    //                         world.setStatus({ status: "error", message: err });
    //                         console.error(err);
    //                     })
    //                     .finally(() => {
    //                         world.setStatus({
    //                             status: "loading world",
    //                             message: `${getPDT.value.name} loaded successfully`,
    //                         });
    //                     }));
    //         });
    //         socket.on("new material", async () => {
    //             await materials.fetchRemotely();
    //             await pdts.fetchRemotely(getPDT.value.name)
    //                 .catch((err: any) => {
    //                     world.setStatus({ status: "error", message: err });
    //                     console.error(err);
    //                 })
    //             updateScene();
    //         })
    //         socket.on("new model", async () => {
    //             await models.fetchRemotely();
    //             await pdts.fetchRemotely(pdts.getPDT.name)
    //                 .catch((err: any) => {
    //                     world.setStatus({ status: "error", message: err });
    //                     console.error(err);
    //                 })
    //             updateScene();
    //         })
    //         socket.on("new pdt", async () => {
    //             await pdts.fetchRemotely(pdts.getPDT.name)
    //                 .catch((err: string) => {
    //                     world.setStatus({ status: "error", message: err });
    //                     console.error(err);
    //                 })
    //             updateScene();
    //         })
    //     }
});
</script>
