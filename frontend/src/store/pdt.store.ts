import { PDT } from "@/models/pdt.model";
import type { PlotData } from "plotly.js-dist-min";
import { ref } from "vue";
import axios from "axios";

import { defineStore } from "pinia";

const PDTStore: any = defineStore("myPDT", () => {
    const _PDT = ref({} as PDT);
    const updated = ref(false);

    const fetchPDT = async () => {
        return axios
            .get("http://localhost:3000/api")
            .then((res) => {
                const pdtJSON = res.data;
                pdtJSON.models.forEach((model: Partial<PlotData>) => {
                    model.i = Float32Array.from(Object.values(model.i as any));
                    model.j = Float32Array.from(Object.values(model.j as any));
                    model.k = Float32Array.from(Object.values(model.k as any));
                });
                _PDT.value = new PDT(pdtJSON);
            })
            .catch((err: Error) => console.error(err));
    };

    const getObjects = () => _PDT.value.getObjects();

    const getPlot = () => {
        updated.value = false;
        return _PDT.value.getPlot();
    };

    const findObject = (objID: number) => _PDT.value.findObject(objID);

    function updateObject(objID: number, fun: Function) {
        updated.value = true;
        const object = _PDT.value.findObject(objID);
        fun(object);
    }

    function updateObjects(fun: Function) {
        updated.value = true;
        _PDT.value.updateObjects(fun);
    }

    return { updated, getObjects, getPlot, fetchPDT, findObject, updateObject, updateObjects };
});

export default PDTStore;
