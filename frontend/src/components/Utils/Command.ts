/**
 * This file implements a generic command to build command Vue components
 *
 * @module command
 */

import { ref } from "vue";

/**
 * Implementation of generic command for user interface.
 */
export class Command<T> {
    /** Command name */
    name: string;
    /** Command icon */
    icon: string;
    /** Command tooltip */
    tooltip: string;
    /** Command reactive state, used to watch command state */
    state = ref<T>();

    /** Command internal getter */
    private getter: () => T;
    /** Command internal setter */
    private setter: (newValue: T) => void;

    /**
     * Create a command object for button management
     *
     * @param name Command name.
     * @param icon Command icon.
     * @param tooltip Command tooltip.
     * @param getter Command getter.
     * @param setter Command setter
     */
    constructor(
        name: string,
        icon: string,
        tooltip: string,
        getter: () => T,
        setter: (newValue: T) => void
    ) {
        this.name = name;
        this.icon = icon;
        this.tooltip = tooltip;
        this.getter = getter;
        this.setter = setter;
        this.state.value = this.getter();
    }

    /**
     * Merge boolean command list into one global command.
     *
     * @remark Getter would be a AND operation between all getters and setter would apply global new value to all setters.
     *
     * @param commandList Command list to merge.
     */
    public static buildGlobalBooleanCommand(commandList: Command<boolean>[][]): Command<boolean>[] {
        return commandList.reduce((previous: Command<boolean>[], current: Command<boolean>[]) =>
            current.map(
                (command, i) =>
                    new Command<boolean>(
                        command.name,
                        command.icon,
                        command.tooltip,
                        () => [previous[i].get, command.getter].every((g) => g()),
                        (newValue: boolean) =>
                            [previous[i].set, command.setter].forEach((s) => s(newValue))
                    )
            )
        );
    }

    /**
     * Get command reactive state.
     *
     * @returns Command state.
     */
    public get = () => {
        return this.state;
    };

    /**
     * Change command state.
     *
     * @param newValue New command value.
     */
    public set = (newValue: T) => {
        this.state.value = newValue;
        this.setter(newValue);
    };
}
