import { Clock, type Camera, type Scene, type WebGLRenderer } from "three";

export class Timer {
    private camera: Camera;
    private scene: Scene;
    private renderer: WebGLRenderer;

    private time: number;
    private clock: Clock;
    private timerCallback: (t: number) => void;

    constructor(
        camera: Camera,
        scene: Scene,
        renderer: WebGLRenderer,
        timerCallback?: (t: number) => void
    ) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;

        // Setup clock
        this.time = 0;
        this.clock = new Clock(false);
        this.timerCallback = timerCallback ?? ((): void => {});

        // Set idle animation loop
        this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera));
    }

    public getTime = (): number => this.time;

    public setTime(t: number) {
        this.time = t;
        this.tick();
    }

    public setTimerCallback(timerCallback: (t: number) => void) {
        this.timerCallback = timerCallback;
    }

    public start() {
        this.clock.start();
        this.renderer.setAnimationLoop(() => {
            // tick scene elements
            this.tick();
            // return time value to callback
            this.timerCallback(this.time);
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    public stop() {
        this.clock.stop();
        // Set idle animation loop
        this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera));
    }

    private tick() {
        const delta = this.clock.getDelta();
        this.time += delta;
        this.scene.children.forEach((child: any) => {
            if (child.tick && typeof child.tick === "function") {
                child.tick(this.time);
            }
        });
    }
}
