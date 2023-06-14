import ObjectServices from "../services/object.services";
import { ObjectJSONType } from "../types/object.types";
import { PlotData } from "plotly.js-dist-min";

export default class PDTObject {
    id: number;
    obj: Partial<PlotData>[];
    type: Partial<PlotData>;
    location: Partial<PlotData>;
    rotation!: PlotData;
    material!: PlotData;

    constructor(obj: ObjectJSONType, models?: Partial<PlotData>[]) {
        this.id = obj.id;
        this.location = ObjectServices.locationToData(obj);
        this.type = ObjectServices.typeToData(obj);
        this.obj = ObjectServices.objToData(obj, models);
    }

    toData() {
        return this;
    }
}
