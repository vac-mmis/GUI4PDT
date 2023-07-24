import { ref, type Ref } from "vue";

export default class Command {
    name: string;
    icon: string;
    tooltip: string;
    getter: () => boolean;
    setter: (b: boolean) => void;
    value: Ref<boolean>;

    constructor(
        name: string,
        icon: string,
        tooltip: string,
        get: () => boolean,
        set: (b: boolean) => void
    ) {
        this.name = name;
        this.icon = icon;
        this.tooltip = tooltip;
        this.getter = get;
        this.setter = set;
        this.value = ref(this.getter());
    }

    public static buildGlobalCommand(commandTab: Command[][]): Command[] {
        return commandTab.reduce((previous: Command[], current: Command[]) =>
            current.map(
                (command, i) =>
                    new Command(
                        command.name,
                        command.icon,
                        command.tooltip,
                        () => [previous[i].get, command.getter].every((g, j) => g()),
                        (b: boolean) => [previous[i].set, command.setter].forEach((s) => s(b))
                    )
            )
        );
    }

    public get = () => {
        return this.value;
    };

    public set = (b: boolean) => {
        this.value.value = b;
        this.setter(b);
    };
}
