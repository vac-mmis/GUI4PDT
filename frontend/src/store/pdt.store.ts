import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

import { PDT, type PDTJSON } from "@/models/pdt.model";

const PDTStore: any = defineStore("PDTs", () => {
    const _PDTs = ref([] as PDT[]);
    const _selectedPDT = ref<PDT>({} as PDT);

    const timeLength = computed(() => _selectedPDT.value.getLength());

    const getPDT = computed((): PDT => toRaw(_selectedPDT.value as PDT));

    const findPDT = computed(
        () =>
            (pdtName: string): PDT | undefined =>
                toRaw(_PDTs.value as PDT[]).find((pdt: PDT) => pdt.name === pdtName)
    );

    const fetch = async (pdtName: string) => {
        let pdt = findPDT.value(pdtName);
        if (!pdt) {
            pdt = await axios.get(`pdt/${pdtName}`).then((res) => new PDT(res.data as PDTJSON));
            if (!pdt) {
                throw new Error("PDT not found");
            } else {
                _PDTs.value.push(pdt);
            }
        }
        _selectedPDT.value = pdt;
    };

    async function list(): Promise<string[]> {
        return await axios.get(`pdts/list`).then((res) => res.data);
    }

    function updateObjects(fun: Function) {
        _selectedPDT.value.updateObjects(fun);
    }

    return { timeLength, getPDT, list, fetch, updateObjects };
});

export default PDTStore;
