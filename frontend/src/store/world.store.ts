/**
 * Stores and loads Three.JS world defined in ${@link World} module
 *
 * @module Store.World
 */

import { ref, computed, toRaw } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { Object3D } from "three";

import { World } from "@/World";
import type { Timer } from "@/World/systems/Timer";
import type { PDT } from "@/models/pdt.model";

import { PDTStore } from "@/store/pdt.store";

/**
 * Defines world status message format
 */
export type Status = {
    status: "waiting" | "loading PDT" | "loading world" | "error" | "success";
    message: string;
};

/**
 * World store handle by Pinia.
 */
export const worldStore: any = defineStore("worldStore", () => {
    /** World internal store */
    const _World = ref<World<PDT>>();
    /** World loading status */
    const _status = ref<Status>({ status: "waiting", message: "" });

    /** Returns stored world */
    const getWorld = computed((): World<PDT> => toRaw(_World.value as World<PDT>));

     
    /** Returns world loading status */
    const getStatus = computed((): Status => toRaw(_status.value));

    /**
     * Set world loading status.
     *
     * @param status New status.
     */
    function setStatus(status: Status) {
        _status.value = status;
    }

    /** Returns world time controller */
    const getTimer = computed((): Timer => {
        if (_World.value) return toRaw(_World.value.getTimer());
        else throw new Error("World undefined");
    });

    /**
     * Init or update world store with given parameters.
     *
     * @param container HTML div container which contains Three.JS world.
     * @param selectionCallback Callback used when there is a click on a world element.
     * @param hoverCallback Callback used when mouse hover on an world element.
     * @param timerCallback Callback used when time changes.
     */
    function setWorld(
        container: HTMLDivElement,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void,
        timerCallback?: (t: number) => number
    ) {
        const { getPDT } = storeToRefs(PDTStore());
        if (!_World.value) {
            _World.value = new World<PDT>(
                getPDT.value,
                container,
                selectionCallback,
                hoverCallback,
                timerCallback
            );
        } else _World.value.update(getPDT.value, container, selectionCallback, hoverCallback);
    }

    return { getWorld, getStatus, getTimer, setWorld, setStatus };
});
