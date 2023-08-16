/**
 * Stores and loads Three.JS world defined in ${@link World} module
 *
 * @module world.store
 */

import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";

import { World } from "@/World/world";
import type { Timer } from "@/World/systems/Timer";

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
const worldStore: any = defineStore("worldStore", () => {
    /** World internal store */
    const _World = ref<World>();
    /** World loading status */
    const _status = ref<Status>({ status: "waiting", message: "" });

    /** Returns stored world */
    const getWorld = computed((): World => toRaw(_World.value as World));

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
    function setWorld(...params: ConstructorParameters<typeof World>) {
        if (!_World.value) {
            _World.value = new World(...params);
        } else _World.value.update(params[0], params[1], params[2]);
    }

    return { getWorld, getStatus, getTimer, setWorld, setStatus };
});

export default worldStore;
