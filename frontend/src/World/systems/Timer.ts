/**
 * This wrapper implements a tool to control {@link World} time and animations
 *
 * @remark For the moment, one second in world animation correspond to a new timestamp in PDT.
 *
 * @module world.timer
 */
import { Clock, type Camera, type Scene, type WebGLRenderer } from "three";

/**
 * Implements timer tool to control PDT and world time.
 */
export class Timer {
    /** World camera/ */
    private camera: Camera;
    /** World scene. */
    private scene: Scene;
    /** World renderer. */
    private renderer: WebGLRenderer;

    /** Current time. */
    private time: number;
    /** Internal timer clock. */
    private clock: Clock;
    /** Callback used when time updating. */
    private timerCallback: (t: number) => void;

    /**
     * Creates a new timer for world time control.
     *
     * @param camera World camera.
     * @param scene World scene.
     * @param renderer World renderer.
     * @param timerCallback Callback called when time updates.
     */
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

        // Set animation loop
        this.renderer.setAnimationLoop(() => {
            // tick scene elements
            this.tick();
            // return time value to callback
            this.timerCallback(this.time);
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    /**
     * @returns Current time.
     */
    public getTime = (): number => this.time;

    /**
     * Set new time to when update world.
     * @param t Desired time.
     */
    public setTime(t: number): void {
        this.time = t;
        this.tick(true);
    }

    /**
     * Set new timer callback.
     *
     * @param timerCallback New timer callback.
     */
    public setTimerCallback(timerCallback: (t: number) => void): void {
        this.timerCallback = timerCallback;
    }

    /**
     * Start world timer.
     */
    public start(): void {
        this.clock.start();
    }

    /**
     * Stop world timer.
     */
    public stop(): void {
        this.clock.stop();
    }

    /**
     * Tick world and its elements to current time + clock delta.
     *
     * @param update Force object tick with actual timestamp.
     */
    private tick(update: boolean = false): void {
        const delta = this.clock.getDelta();
        this.time += delta;
        this.scene.children.forEach((child: any) => {
            if (child.tick && typeof child.tick === "function") {
                child.tick(this.clock.running || update ? this.time : undefined);
            }
        });
    }
}
