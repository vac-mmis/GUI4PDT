import type { PDT, PDTObject } from "@/types/pdt.types";
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
                _PDT.value = res.data;
                _PDT.value.objects.forEach((objects: PDTObject) => {
                    objects.obj = objects.obj.map((obj: PlotData) => {
                        obj.i = Float32Array.from(Object.values(obj.i));
                        obj.j = Float32Array.from(Object.values(obj.j));
                        obj.k = Float32Array.from(Object.values(obj.k));
                        return obj;
                    });
                });
            })
            .catch((err: Error) => console.error(err));
    };

    function getPlot(): Partial<PlotData>[] {
        const plot = _PDT.value.objects.flatMap((obj: PDTObject) => [obj.location, ...obj.obj]);
        updated.value = false;
        return plot;
    }

    function getObjects(): PDTObject[] {
        return _PDT.value.objects;
    }

    function updatePDT(fun: Function) {
        updated.value = true;
        _PDT.value.objects.forEach((obj: PDTObject) => fun(obj));
    }

    function updateObject(objectID: number, fun: Function) {
        updated.value = true;
        console.log("updateObject : ", updated.value);
        const objectToUpdate = _PDT.value.objects.find((obj) => obj.id === objectID);
        if (objectToUpdate) {
            _PDT.value.objects[objectID] = fun(_PDT.value.objects[objectID]);
        }
    }

    const findObject = (objectID: number) => {
        return _PDT.value.objects.find((obj) => obj.id === objectID);
    };

    return { fetchPDT, getPlot, getObjects, updatePDT, updateObject, findObject, updated };
});

export default PDTStore;
