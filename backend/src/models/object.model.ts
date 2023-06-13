import ObjectServices from "../services/object.services";
import { ObjectJSONType } from "../types/object.types";
import { Data } from "plotly.js-dist-min";

export class PDTObject {
    id!: number;
    obj!: Partial<Data>;
    type!: Data;
    location: Partial<Data>;
    rotation!: Data;
    material!: Data;

    constructor(obj: ObjectJSONType) {
        this.location = ObjectServices.locationToData(obj.location);
        this.type = ObjectServices.typeToData(obj.type);
        //this.obj = ObjectServices.objToData(this.type.);
    }

    toData() {
        return this;
    }
}
