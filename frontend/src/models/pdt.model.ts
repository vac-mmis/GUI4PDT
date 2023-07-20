import { PDTObject, type ObjectJSON } from "@/models/object.model";

export interface PDTJSON {
    name: string;
    objects: ObjectJSON[];
}

export class PDT {
    name: string;
    length: number;
    private objects: PDTObject[];

    constructor(pdt: PDTJSON) {
        this.name = pdt.name;
        this.length = pdt.objects[0].location.length;
        this.objects = pdt.objects.map((obj: ObjectJSON) => new PDTObject(obj));
    }

    public getObjects = (): PDTObject[] => this.objects;

    public getLength = (): number => this.length;

    public updateObjects = (fun: Function): void =>
        this.objects.forEach((obj: PDTObject) => fun(obj));
}
