import { Raycaster, Vector2, type Object3D, type PerspectiveCamera } from "three";

import type { PDT } from "@/models/pdt.model";

export class Pointer {
    private mouseCoord: Vector2;
    private raycaster: Raycaster;
    private rendererDomElement: HTMLCanvasElement;
    private camera: PerspectiveCamera;
    private pdt: PDT;
    private selectionCallback?: (obj?: Object3D | null) => void;
    private hoverCallback?: (obj?: Object3D | null) => void;

    constructor(
        rendererDomElement: HTMLCanvasElement,
        camera: PerspectiveCamera,
        pdt: PDT,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void
    ) {
        this.mouseCoord = new Vector2(0, 0);
        this.raycaster = new Raycaster();
        this.rendererDomElement = rendererDomElement;
        this.camera = camera;
        this.pdt = pdt;
        this.selectionCallback = selectionCallback;
        this.hoverCallback = hoverCallback;

        this.rendererDomElement.addEventListener("click", this.onClick);
        this.rendererDomElement.addEventListener("pointermove", this.onHover);
    }

    private getIntersect(event: MouseEvent, getToIntersect: () => Object3D[] | undefined) {
        const rect = this.rendererDomElement.getBoundingClientRect();
        this.mouseCoord.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        this.mouseCoord.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseCoord, this.camera);

        const toIntersect = getToIntersect();
        if (toIntersect) {
            const intersects = this.raycaster.intersectObjects(toIntersect, true);
            return intersects[0] || undefined;
        } else {
            return undefined;
        }
    }

    public updatePDT(
        newPDT: PDT,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void
    ) {
        this.pdt = newPDT;
        this.selectionCallback = selectionCallback;
        this.hoverCallback = hoverCallback;
    }

    public onClick = (event: MouseEvent) => {
        // See if the ray from the camera into the world hits one of our meshes
        const intersect = this.getIntersect(event, this.pdt.getClickables);

        if (intersect) {
            const object = this.pdt.onClick(intersect);
            if (this.selectionCallback) {
                this.selectionCallback(object);
            }
        }
    };

    public onHover = (event: MouseEvent) => {
        const intersect = this.getIntersect(event, this.pdt.getHoverables);

        // Toggle rotation bool for meshes that we clicked
        if (intersect) {
            const object = this.pdt.onHover(intersect);
            if (this.hoverCallback && object) {
                this.hoverCallback(object);
            }
        }
    };
}
