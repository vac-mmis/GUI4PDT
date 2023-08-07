/**
 * This wrapper implements a module to handle mouse actions (click, hover) and allow control on visible objects.
 *
 * @remark Needs PDT type to handle its content.
 *
 * @module world.pointer
 */
import { Raycaster, Vector2, type Object3D, type PerspectiveCamera } from "three";

import type { PDT } from "@/models/pdt.model";

/**
 * Implements pointer object which give controls to visible objects
 */
export class Pointer {
    /** Current mouse coordinates in windows. */
    private mouseCoord: Vector2;
    /** Raycaster Three.JS object which intersects objects pointed by mouse. */
    private raycaster: Raycaster;
    /** HTML Div element with contains pointer's world. */
    private rendererDomElement: HTMLCanvasElement;
    /** Pointer's world camera. */
    private camera: PerspectiveCamera;
    /** Pointer's world PDT */
    private pdt: PDT;

    /** Callback calls on mouse click */
    private selectionCallback?: (obj?: Object3D | null) => void;
    /** Callback calls on mouse hover */
    private hoverCallback?: (obj?: Object3D | null) => void;

    /**
     * Creates a new Pointer object
     *
     * @param rendererDomElement HTML world container. Used to add hover and click listeners on world.
     * @param camera World camera.
     * @param pdt World PDT.
     * @param selectionCallback Callback used on mouse click.
     * @param hoverCallback Callback used on mouse hover.
     */
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

    /**
     * Gets first element intersected by raycaster from mouse event.
     *
     * @param event Mouse event to handle.
     * @param getToIntersect Function which gives objects to intersect.
     *
     * @returns Intersected element.
     */
    private getIntersect(event: MouseEvent, getToIntersect: () => Object3D[] | undefined) {
        const rect = this.rendererDomElement.getBoundingClientRect();
        this.mouseCoord.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        this.mouseCoord.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseCoord, this.camera);

        // Get objects to intersect
        const toIntersect = getToIntersect();
        if (toIntersect && toIntersect?.length > 0) {
            // If toIntersect is not empty, compute intersection between mouse and these objects.
            const intersects = this.raycaster.intersectObjects(toIntersect, true);
            return intersects[0] || undefined;
        } else {
            return undefined;
        }
    }

    /**
     * Updates pointer if needed, generally when selected PDT changes.
     *
     * @param pdt New selected PDT.
     * @param selectionCallback New selection callback.
     * @param hoverCallback New hover callback.
     */
    public updatePDT(
        pdt: PDT,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void
    ) {
        this.pdt = pdt;
        this.selectionCallback = selectionCallback;
        this.hoverCallback = hoverCallback;
    }

    /**
     * Actions to do on mouse click.
     *
     * @param event Mouse click event to handle/
     */
    private onClick = (event: MouseEvent) => {
        // See if the ray from the camera into the world hits one of our meshes
        const intersect = this.getIntersect(event, this.pdt.getClickables);

        if (intersect) {
            // Do PDT on click action
            const object = this.pdt.onClick(intersect);
            if (this.selectionCallback && object) {
                // Call on click callback function
                this.selectionCallback(object);
            }
        }
    };

    /**
     * Actions to do on mouse mover.
     *
     * @param event Mouse hover event to handle/
     */
    private onHover = (event: MouseEvent) => {
        const intersect = this.getIntersect(event, this.pdt.getHoverables);

        // Toggle rotation bool for meshes that we clicked
        if (intersect) {
            // Do PDT on hover action
            const object = this.pdt.onHover(intersect);
            if (this.hoverCallback && object) {
                // Call on hover callback function
                this.hoverCallback(object);
            }
        }
    };
}
