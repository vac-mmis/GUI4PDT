import ObjectServices from "../services/object.services";
import { ObjectJSONType } from "../types/object.types";
import { PlotData } from "plotly.js-dist-min";

export class PDTObject {
    id!: number;
    obj: Partial<PlotData>[];
    type: Partial<PlotData>;
    location: Partial<PlotData>;
    rotation!: PlotData;
    material!: PlotData;

    constructor(obj: ObjectJSONType, models?: Partial<PlotData>[]) {
        this.location = ObjectServices.locationToData(obj.location);
        this.type = ObjectServices.typeToData(obj.type);
        this.obj = ObjectServices.objToData(obj, models);
    }

    toData() {
        return this;
    }
}
