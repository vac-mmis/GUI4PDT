/**
 * Stores and loads available pdt provided by backend API.
 *
 * @module Store.PDT
 */
import { ref, computed, toRaw } from "vue";
import axios from "axios";
import { defineStore } from "pinia";


import type { PDTJSON } from "@/interfaces/pdt";
import { PDT } from "@/models/pdt.model";

/**
 * PDT store handle by Pinia.
 */
export const PDTStore: any = defineStore("PDTs", () => {
    /** Stored PDT. */
    const _PDTs = ref([] as PDT[]);
    /** Current selected PDT. */
    const _selectedPDT = ref<PDT>({} as PDT);
    /** PDT names list */
    const _list = ref<string[]>([]);

    /** Number of timestamps. */
    const timeLength = computed(() => _selectedPDT.value.getTimeLength());

    /**
     * Get selected PDT.
     */
    const getPDT = computed((): PDT => toRaw(_selectedPDT.value as PDT));

    /**
     * Get available PDT List
     */
    const getPDTList = computed((): string[] => toRaw(_list.value));


    /**
     * Fetch and returns List of available PDT.
     *
     * @returns PDT list
     */
    //TODO removed check so that the lsit always updates
    async function list(): Promise<string[]> {

        _list.value = await axios.get(`pdts/list`).then((res) => res.data);

        return _list.value;
    }
    /**
    * Fetch and returns List of available PDT.
    *
    * @returns PDT list
    */
    //TODO removed check so that the lsit always updates
    async function listLocally(): Promise<string[]> {
        if (_list.value.length === 0) {


            const response = await fetch('saveData.json');
            const data = await response.json();
            const pdtData = data["pdts"];



            _list.value = pdtData.map((pdt: PDTJSON) => pdt.name);
        }
        return _list.value;
    }

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
    const fetchRemotely = async (pdtName: string) => {

        const pdt = await axios.get(`pdt/${pdtName}`).then((res) => new PDT(res.data as PDTJSON));
        if (!pdt) {
            throw new Error("PDT not found");
        } else {
            _PDTs.value.push(pdt);
            _selectedPDT.value = pdt;
        }

    };

    /**
     * Fetch, load and store desired PDT (by name) from backend API.
     *
     * @param name Name of PDT to fetch.
     */
    const fetchLocally = async (pdtName: string) => {
        let pdt = find(pdtName)

  

        if (!pdt) {

            const response = await fetch('saveData.json');
            const data = await response.json();

            const pdtData = data["pdts"].find((pdt: PDTJSON) => pdt.name === pdtName)
            pdt = new PDT(pdtData as PDTJSON);
            if (!pdt) {
                throw new Error("PDT not found");
            } else {
                _PDTs.value.push(pdt);
                _selectedPDT.value = pdt;
            }
        } else {
            _selectedPDT.value = pdt;
        }

     

    };

    return { timeLength, getPDT, getPDTList, list, listLocally, fetchRemotely, fetchLocally, find };
});
