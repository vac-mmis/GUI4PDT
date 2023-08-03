import { Group, Object3D, type Intersection } from "three";
import { PDTObject, type ObjectJSON, tickObjects } from "@/models/object.model";
import { ElevationMap } from "@/models/elevation.model";

export interface PDTJSON {
    name: string;
    objects: ObjectJSON[];
    elevationMap?: [number, number, number, number][];
}

export class PDT extends Group {
    name: string;
    length: number;
    private objects: PDTObject[];
    private elevationMap?: ElevationMap;

    constructor(pdt: PDTJSON) {
        super();
        this.name = pdt.name;
        this.userData.type = "PDT";
        this.length = pdt.objects[0].location.length;
        // Add objects as new children group
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj));
        this.add(new Group().add(...this.objects));
        // Add elevation map as new children
        if (pdt.elevationMap) {
            this.elevationMap = new ElevationMap(pdt.elevationMap);
            this.add(this.elevationMap);
        }
    }

    public getHoverables = (): Object3D[] | undefined =>
        this.elevationMap ? [this.elevationMap] : undefined;

    public getClickables = (): Object3D[] => this.objects;

    public getObjects = (): PDTObject[] => this.objects;

    public getElevationMap = () => this.elevationMap;

    public getLength = (): number => this.length;

    public updateObjects = (fun: Function): void => {
        this.objects.forEach((obj) => fun(obj));
    };

    /**
     * Get object intersected by Three.JS raycaster on hover.
     *
     * @param intersect Intersection result from World Pointer.
     *
     * @returns Intersected object.
     */
    public onHover(intersect: Intersection<Object3D>): PDTObject | undefined {
        this.elevationMap?.updateHelper(intersect);
        return undefined;
    }

    /**
     * Get object intersected by Three.JS raycaster on click.
     *
     * @param intersect Intersection result from World Pointer.
     *
     * @returns Intersected object.
     */
    public onClick(intersect: Intersection): PDTObject | undefined {
        let object = intersect.object;
        while (object.parent && object.userData.type !== "Object") {
            object = object.parent;
        }
        if (object.type === "Scene") {
            throw new Error("Object not found, Scene reached");
        }
        return object as PDTObject;
    }

    public tick = (time: number) => {
        this.updateObjects(tickObjects(time));
    };
}
