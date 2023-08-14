/**
 * This file implements a generic controller to build controller Vue components
 *
 * @module controller
 */

import { ref } from "vue";

const NameIcon = {
    loc: "fas fa-crosshairs",
    class: "fas fa-object-group",
    surface: "fas fa-water",
    "z-var": "fas fa-chart-simple",
};

const ValueIcon = {
    invisible: "fas fa-eye-slash",
    absolute: "fas fa-eye",
    prob: "fas fa-wave-square",
};

const ValueTip = {
    invisible: "Hide",
    absolute: "Show most probable",
    prob: "Show distribution",
};

export type ControllerValues = keyof typeof ValueIcon | undefined;

/**
 * Implementation of generic controller for user interface.
 */
export class Controller<T extends ControllerValues> {
    /** Controller name */
    name: keyof typeof NameIcon;
    /** Controller values */
    values: Readonly<Array<T>>;

    /** Controller icon */
    icon: string;
    /** Controller tooltip */
    tooltip: string;
    /** Controller reactive state, used to watch controller state */
    state = ref<T>();

    /** Controller internal getter */
    private getter: () => T | undefined;
    /** Controller internal setter */
    private setter: (newValue: T) => void;

    /**
     * Create a controller object for button management
     *
     * @param name Controller name.
     * @param tooltip Controller tooltip.
     * @param getter Controller getter.
     * @param setter Controller setter
     */
    constructor(
        name: keyof typeof NameIcon,
        values: Readonly<Array<T>>,
        tooltip: string,
        getter: () => T | undefined,
        setter: (newValue: T) => void
    ) {
        this.name = name;
        this.values = values;
        this.icon = NameIcon[name];
        this.tooltip = tooltip;
        this.getter = getter;
        this.setter = setter;
        this.state.value = this.getter();
    }

    /**
     * Merge boolean controller list into one global controller.
     *
     * @remark Getter would be a AND operation between all getters and setter would apply global new value to all setters.
     *
     * @param controllerList Controller list to merge.
     */
    public static buildGlobalBooleanController<T extends ControllerValues>(
        controllerList: Controller<T>[][]
    ): Controller<T>[] {
        return controllerList.reduce(
            (previous: Controller<T>[], current: Controller<T>[], currentIndex) =>
                current.map((controller, i) => {
                    const reducedGetter = () => {
                        if (previous[i].get().value === controller.getter()) {
                            return controller.getter();
                        } else {
                            return undefined;
                        }
                    };
                    const reducedSetter =
                        currentIndex <= 1
                            ? (newValue: T) => {
                                  previous[i].set(newValue);
                                  controller.set(newValue);
                              }
                            : (newValue: T) => {
                                  previous[i].setter(newValue);
                                  controller.set(newValue);
                              };
                    return new Controller<T>(
                        controller.name,
                        controller.values,
                        controller.tooltip,
                        reducedGetter,
                        reducedSetter
                    );
                })
        );
    }

    /**
     * Get value icon.
     *
     * @param value Controller available value.
     *
     * @returns Value icon
     */
    public static getValueIcon = (value: keyof typeof ValueIcon) => ValueIcon[value];

    /**
     * Get value tip.
     *
     * @param value Controller available value.
     *
     * @returns Value tip.
     */
    public static getValueTip = (value: keyof typeof ValueTip) => ValueTip[value];

    /**
     * Get controller reactive state.
     *
     * @returns Controller state.
     */
    public get = () => {
        return this.state;
    };

    /**
     * Change controller state.
     *
     * @param newValue New controller value.
     */
    public set = (newValue: T) => {
        this.state.value = newValue;
        this.setter(newValue);
    };
}
