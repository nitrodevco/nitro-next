import { GetTickerTime } from '../../utils';

export class RoomShakingEffect {
    public static readonly STATE_NOT_INITIALIZED = 0;
    public static readonly STATE_START_DELAY = 1;
    public static readonly STATE_RUNNING = 2;
    public static readonly STATE_OVER = 3;

    private static delayDuration: number = 20000;
    private static duration: number = 5000;
    private static state: number = RoomShakingEffect.STATE_NOT_INITIALIZED;
    private static isVisualizationActive: boolean = false;
    private static progress: number = 0;
    private static startTime: number = 0;
    private static offTimeout: ReturnType<typeof setTimeout> | undefined;

    public static init(delayMs: number, durationMs: number): void {
        this.progress = 0;
        this.delayDuration = delayMs;
        this.duration = durationMs;
        this.startTime = GetTickerTime();
        this.state = RoomShakingEffect.STATE_START_DELAY;
    }

    public static turnVisualizationOn(): void {
        if (this.state === RoomShakingEffect.STATE_NOT_INITIALIZED || this.state === RoomShakingEffect.STATE_OVER) {
            return;
        }

        if (!this.offTimeout) {
            this.offTimeout = setTimeout(() => this.turnVisualizationOff(), this.duration);
        }

        const elapsedTime = GetTickerTime() - this.startTime;

        if (elapsedTime > this.delayDuration + this.duration) {
            this.state = RoomShakingEffect.STATE_OVER;
            return;
        }

        this.isVisualizationActive = true;

        if (elapsedTime < this.delayDuration) {
            this.state = RoomShakingEffect.STATE_START_DELAY;
            return;
        }

        this.state = RoomShakingEffect.STATE_RUNNING;
        this.progress = (elapsedTime - this.delayDuration) / this.duration;
    }

    public static turnVisualizationOff(): void {
        this.isVisualizationActive = false;

        if (this.offTimeout) {
            clearTimeout(this.offTimeout);
            this.offTimeout = undefined;
        }
    }

    public static isVisualizationOn(): boolean {
        return this.isVisualizationActive && this.isRunning();
    }

    public static getProgress(): number {
        return this.progress;
    }

    private static isRunning(): boolean {
        return this.state === RoomShakingEffect.STATE_START_DELAY || this.state === RoomShakingEffect.STATE_RUNNING;
    }
}