/**
 * Stores and loads available pdt provided by backend API.
 *
 * @module pdt.store
 */
import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

import { PDT, type PDTJSON } from "@/models/pdt.model";

/**
 * PDT store handle by Pinia.
 */
const PDTStore: any = defineStore("PDTs", () => {
    /** Stored PDT. */
    const _PDTs = ref([] as PDT[]);
    /** Current selected PDT. */
    const _selectedPDT = ref<PDT>({} as PDT);

    /** Number of timestamps. */
    const timeLength = computed(() => _selectedPDT.value.getTimeLength());

    /**
     * Get selected PDT.
     */
    const getPDT = computed((): PDT => toRaw(_selectedPDT.value as PDT));

    /**
     * Returns desired PDT from storage with given name.
     *
     * @param name Desired PDT name.
     *
     * @returns Desired PDT.
     */
    function find(pdtName: string): PDT | undefined {
        return toRaw(_PDTs.value as PDT[]).find((pdt: PDT) => pdt.name === pdtName);
    }

    /**
     * Fetch, load and store desired PDT (by name) from backend API.
     *
     * @param name Name of PDT to fetch.
     */
    const fetch = async (pdtName: string) => {
        let pdt = find(pdtName);
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

    /**
     * Fetch and returns List of available PDT.
     *
     * @returns PDT list
     */
    async function list(): Promise<string[]> {
        return await axios.get(`pdts/list`).then((res) => res.data);
    }

    return { timeLength, getPDT, list, fetch, find };
});

export default PDTStore;
