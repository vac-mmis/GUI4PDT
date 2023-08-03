import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";

import { World } from "@/World/world";
import type { Timer } from "@/World/systems/Timer";

const worldStore: any = defineStore("worldStore", () => {
    const _World = ref<World>();

    const getWorld = computed((): World => toRaw(_World.value as World));

    const getTimer = computed((): Timer => {
        if (_World.value) return toRaw(_World.value.getTimer());
        else throw new Error("World undefined");
    });

    function setWorld(...params: ConstructorParameters<typeof World>) {
        if (!_World.value) {
            _World.value = new World(...params);
        } else _World.value.update(params[0], params[1], params[2]);
    }

    return { getWorld, getTimer, setWorld };
});

export default worldStore;
