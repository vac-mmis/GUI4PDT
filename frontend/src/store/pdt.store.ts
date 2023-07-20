import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

import { PDT, type PDTJSON } from "@/models/pdt.model";
import type { PDTObject } from "@/models/object.model";

const PDTStore: any = defineStore("PDTs", () => {
    const _PDTs = ref([] as PDT[]);
    const _selectedPDT = ref({} as PDT);

    const length = computed(() => _selectedPDT.value.getLength());

    const fetch = async (pdtName: string) => {
        let pdt = findPDT(pdtName);
        if (!pdt) {
            pdt = await axios.get(`pdt/${pdtName}`).then((res) => {
                const newPDT = new PDT(res.data as PDTJSON);
                _PDTs.value.push(newPDT);
                return newPDT;
            });

            if (!pdt) {
                throw new Error("PDT not found");
            }
        }
        _selectedPDT.value = pdt;
    };

    async function list(): Promise<string[]> {
        return await axios.get(`pdts/list`).then((res) => res.data);
    }

    function findPDT(pdtName: string): PDT | undefined {
        return (toRaw(_PDTs.value) as PDT[]).find((pdt: PDT) => pdt.name === pdtName);
    }

    function getObjects(): PDTObject[] {
        return toRaw(_selectedPDT.value).getObjects();
    }

    function updateObjects(fun: Function) {
        _selectedPDT.value.updateObjects(fun);
    }

    return { length, list, getObjects, fetch, updateObjects };
});

export default PDTStore;
