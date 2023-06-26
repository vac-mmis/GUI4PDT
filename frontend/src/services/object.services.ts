import { PDTObject } from "@/models/object.model";
import type { PlotMarker, Font, ColorBar } from "plotly.js-dist-min";

const addLocationBar = () => {
    return (obj: PDTObject) => {
        let location = obj.location;
        if (location.marker) {
            let marker = location.marker as PlotMarker;
            marker.colorbar = {
                y: -0.25,
                orientation: "h",
                yanchor: "bottom",
                title: "Location Density",
                titleside: "bottom",
                titlefont: {
                    size: 10,
                } as Font,
                thickness: 20, // Adjust the thickness of the color scale bar
                xpad: 10, // Add padding between the color scale bar and the plot
                ypad: 0, // Set the y padding of the color scale bar to 0
            } as Partial<ColorBar>;
        }
        return [location, ...obj.obj];
    };
};

const toggleObjects = (showObject: boolean) => {
    return (obj: PDTObject) => {
        let types = obj.obj;
        types.forEach((type: any) => {
            type.visible = showObject;
        });
        return [types, ...obj.obj];
    };
};

const ObjectServices = {
    addLocationBar,
    toggleObjects,
};

export default ObjectServices;
