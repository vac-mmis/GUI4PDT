import type { PDT, PDTObject } from "@/types/pdt.types";
import type { PlotData } from "plotly.js-dist-min";
import { ref } from "vue";
import axios from "axios";

import { defineStore } from "pinia";

const PDTStore: any = defineStore("myPDT", () => {
    const _PDT = ref({} as PDT);
    const showLocation = ref(false); // Add this line

    const fetchPDT = async () => {
        return axios
            .get("http://localhost:3000/api")
            .then((res) => {
                _PDT.value = res.data;
                _PDT.value.models.forEach((model: any) => {
                    model.i = Object.values(model.i);
                    model.j = Object.values(model.j);
                    model.k = Object.values(model.k);
                });
            })
            .catch((err: Error) => console.error(err));
    };

    function getPlot(): PlotData[] {
        return _PDT.value.objects
            .map((obj: PDTObject) => {
                const location = obj.location;
                obj.location.visible = showLocation.value;
                const objects = obj.obj.map((model: any) => {
                    model.i = Object.values(model.i);
                    model.j = Object.values(model.j);
                    model.k = Object.values(model.k);
                    return model;
                });
                return [location, ...objects];
            })
            .flat();
    }

    function toggleLocation() {
        console.log("toggle");
        showLocation.value = !showLocation.value;
    }

    function updatePDT(fun: Function) {
        console.log("here");
        _PDT.value.objects.forEach((obj: PDTObject) => fun(obj));
    }

    const findObject = (objID: number) => {
        return _PDT.value.objects.find((obj) => obj.id === objID);
    };

    return { fetchPDT, getPlot, updatePDT, findObject, showLocation, toggleLocation };
});

export default PDTStore;
