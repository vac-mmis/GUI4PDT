import { PDT, type PDTJSON } from "@/models/pdt.model";
import { ref, toRaw } from "vue";
import axios from "axios";

import { defineStore } from "pinia";
import { PDTObject } from "@/models/object.model";

const PDTStore: any = defineStore("myPDT", () => {
    const _PDT = ref({} as PDT);
    const updated = ref(false);

    const fetchPDT = async () => {
        return axios
            .get("http://localhost:3000/api")
            .then((res) => {
                const pdtJSON: PDTJSON = res.data;
                _PDT.value = new PDT(pdtJSON);
                return pdtJSON;
            })
            .then((pdtJSON: PDTJSON) => toRaw(_PDT.value).init(pdtJSON))
            .catch((err: Error) => console.error(err));
    };

    function getObjects(): PDTObject[] {
        return toRaw(_PDT.value).getObjects();
    }

    function updateObjects(fun: Function) {
        updated.value = true;
        _PDT.value.updateObjects(fun);
    }

    return { updated, getObjects, fetchPDT, updateObjects };
});

export default PDTStore;
