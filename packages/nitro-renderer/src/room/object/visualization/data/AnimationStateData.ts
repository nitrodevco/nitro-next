import { AnimationFrame } from './AnimationFrame';

export class AnimationStateData {
    private _animationId: number = -1;
    private _animationAfterTransitionId: number = 0;
    private _animationOver: boolean = false;
    private _frameCounter: number = 0;
    private _frames: (AnimationFrame | undefined)[] = [];
    private _lastFramePlayed: boolean[] = [];
    private _animationPlayed: boolean[] = [];
    private _layerCount: number = 0;

    public get animationOver(): boolean {
        return this._animationOver;
    }

    public set animationOver(k: boolean) {
        this._animationOver = k;
    }

    public get frameCounter(): number {
        return this._frameCounter;
    }

    public set frameCounter(count: number) {
        this._frameCounter = count;
    }

    public get animationId(): number {
        return this._animationId;
    }

    public set animationId(id: number) {
        if (id === this._animationId) return;

        this._animationId = id;

        this.resetAnimationFrames(false);
    }

    public get animationAfterTransitionId(): number {
        return this._animationAfterTransitionId;
    }

    public set animationAfterTransitionId(k: number) {
        this._animationAfterTransitionId = k;
    }

    public dispose(): void {
        this.recycleFrames();

        this._frames = [];
        this._lastFramePlayed = [];
        this._animationPlayed = [];
    }

    public setLayerCount(count: number): void {
        this._layerCount = count;

        this.resetAnimationFrames();
    }

    public resetAnimationFrames(recycle: boolean = true): void {
        if (recycle || !this._frames) {
            this.recycleFrames();

            this._frames = [];
        }

        this._lastFramePlayed = [];
        this._animationPlayed = [];
        this._animationOver = false;
        this._frameCounter = 0;

        let layerId = 0;

        while (layerId < this._layerCount) {
            if (recycle || this._frames.length <= layerId) {
                this._frames[layerId] = undefined;
            } else {
                const frame = this._frames[layerId];

                if (frame) {
                    frame.recycle();

                    this._frames[layerId] = AnimationFrame.allocate(
                        frame.id,
                        frame.x,
                        frame.y,
                        frame.repeats,
                        0,
                        frame.isLastFrame,
                    );
                }
            }

            this._lastFramePlayed[layerId] = false;
            this._animationPlayed[layerId] = false;

            layerId++;
        }
    }

    private recycleFrames(): void {
        if (!this._frames || !this._frames.length) return;

        for (const frame of this._frames) frame?.recycle();
    }

    public getFrame(layerId: number): AnimationFrame | undefined {
        return this._frames[layerId];
    }

    public setFrame(layerId: number, frame: AnimationFrame | undefined): void {
        if (layerId < 0 || layerId >= this._layerCount) return;

        const existingFrame = this._frames[layerId];

        if (existingFrame) existingFrame.recycle();

        this._frames[layerId] = frame;
    }

    public getAnimationPlayed(layerId: number): boolean {
        if (layerId < 0 || layerId >= this._layerCount) return true;

        return this._animationPlayed[layerId];
    }

    public setAnimationPlayed(layerId: number, flag: boolean): void {
        if (layerId < 0 || layerId >= this._layerCount) return;

        this._animationPlayed[layerId] = flag;
    }

    public getLastFramePlayed(layerId: number): boolean {
        if (layerId < 0 || layerId >= this._layerCount) return true;

        return this._lastFramePlayed[layerId];
    }

    public setLastFramePlayed(layerId: number, flag: boolean): void {
        if (layerId < 0 || layerId >= this._layerCount) return;

        this._lastFramePlayed[layerId] = flag;
    }
}
