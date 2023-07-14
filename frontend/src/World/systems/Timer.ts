import { Camera, Clock, WebGLRenderer, Scene } from "three";

export class Timer {
    private camera: Camera;
    private scene: Scene;
    private renderer: WebGLRenderer;
    private clock: Clock;
    private time: number;
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
        this.clock = new Clock(false);
        this.timerCallback = timerCallback || ((): void => {});
        this.time = 0;

        this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera));
    }

    public start() {
        this.clock.start();
        this.renderer.setAnimationLoop(() => {
            // render a frame
            this.tick();
            this.timerCallback(this.time);

            this.renderer.render(this.scene, this.camera);
        });
    }

    public stop() {
        this.clock.stop();
        this.renderer.setAnimationLoop(() => this.renderer.render(this.scene, this.camera));
    }

    public setTimerCallback(timerCallback: (t: number) => void) {
        this.timerCallback = timerCallback;
    }

    public setTime(t: number) {
        this.time = t;
        this.tick();
    }

    public getTime = (): number => this.time;

    public tick() {
        const delta = this.clock.getDelta();
        this.time += delta;
        this.scene.children.forEach((object: any) => {
            if (object.tick) {
                object.tick(this.time);
            }
        });
    }
}
