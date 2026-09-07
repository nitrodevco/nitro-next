import { Rectangle } from 'pixi.js';

import { CHAT_BUBBLE_HEIGHT_PADDING } from '../ChatConstants';
import { IChatFlowBubble } from './IChatFlowBubble';

/**
 * The Flash `ChatBubbleSimulationEntity`: a bubble as the collision simulation sees it - a
 * rectangle (the bubble's art minus its overlap allowance and a little vertical slack) whose
 * x eases toward wherever the simulation pushes it. In line-by-line mode a second, effectively
 * infinitely wide rectangle makes every bubble collide with every other on its row, which is
 * what turns the free flow into a stack of lines.
 */
export class ChatBubbleSimulationEntity {
    /** `_Str_20405` - x moves 90% of the way to its target per assignment. */
    protected static readonly SMOOTHING = 0.1;
    /** `_Str_13725` - the extra width each side of a line-by-line wide rect. */
    private static readonly WIDE_MARGIN = 2500;

    protected _visualization: IChatFlowBubble | undefined;
    protected _x: number;
    protected _y: number;
    protected _rect: Rectangle;
    protected _wideRect: Rectangle | undefined = undefined;
    protected _pendingDeltaX: number = 0;
    protected _pendingDeltaY: number = 0;
    private _collidedWith: ChatBubbleSimulationEntity[] = [];
    private _isSpacer: boolean = false;

    constructor(bubble: IChatFlowBubble, lineByLine: boolean = false) {
        this._visualization = bubble;
        this._rect = new Rectangle();

        const overlap = bubble.overlap;

        this._x = bubble.x + overlap.x;
        this._y = bubble.y + overlap.y;
        this._rect.x = this._x;
        this._rect.y = this._y;
        this._rect.width = bubble.bubbleWidth - (overlap.x + overlap.width);
        this._rect.height = (bubble.limitedHeight - CHAT_BUBBLE_HEIGHT_PADDING) - (overlap.y + overlap.height);

        if (bubble.minHeight !== -1) this._rect.height = bubble.minHeight;

        if (lineByLine) {
            this._wideRect = new Rectangle();
            this._wideRect.width = this._rect.width + (2 * ChatBubbleSimulationEntity.WIDE_MARGIN);
            this._wideRect.height = (bubble.minHeight !== -1) ? bubble.minHeight : (this._rect.height / 2);
            this._wideRect.x = this._rect.x - ChatBubbleSimulationEntity.WIDE_MARGIN;
            this._wideRect.y = this._rect.y;
        }
    }

    /** The on-screen bubble this entity stands for (undefined once disposed). */
    public get bubble(): IChatFlowBubble | undefined {
        return this._visualization;
    }

    public dispose(): void {
        if (this._visualization) this._visualization.readyToRecycle = true;

        this._visualization = undefined;
        this._collidedWith = [];
        this._wideRect = undefined;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
        this._rect.y = this._y;

        if (this._wideRect) this._wideRect.y = this._rect.y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = this._x + ((value - this._x) * (1 - ChatBubbleSimulationEntity.SMOOTHING));
        this._rect.x = this._x;

        if (this._wideRect) this._wideRect.x = this._rect.x - ChatBubbleSimulationEntity.WIDE_MARGIN;
    }

    public get rect(): Rectangle {
        return this._rect;
    }

    /** The wide rect where there is one, else the plain rect (Flash `_Str_10759`). */
    public get wideRect(): Rectangle {
        return this._wideRect ?? this._rect;
    }

    public get hasWideRect(): boolean {
        return !!this._wideRect;
    }

    public get centerX(): number {
        return this._x + (this._rect.width / 2);
    }

    public initializePosition(x: number, y: number): void {
        const overlap = this._visualization?.overlap;

        this._x = x + (overlap ? overlap.x : 0);
        this._y = y + (overlap ? overlap.y : 0);
        this._rect.x = this._x;
        this._rect.y = this._y;

        if (this._wideRect) {
            this._wideRect.x = this._rect.x - ChatBubbleSimulationEntity.WIDE_MARGIN;
            this._wideRect.y = this._rect.y;
        }
    }

    public addPendingX(delta: number): void {
        this._pendingDeltaX += delta;
    }

    public addPendingY(delta: number): void {
        this._pendingDeltaY += delta;
    }

    public markCollidedWith(entity: ChatBubbleSimulationEntity): void {
        this._collidedWith.push(entity);
    }

    public hasCollidedWith(entity: ChatBubbleSimulationEntity): boolean {
        return this._collidedWith.indexOf(entity) !== -1;
    }

    /** Commits the pushes gathered during one iteration; upward movement is capped at `maxUp` px. */
    public applyPending(maxUp: number): void {
        this.x = this.x + this._pendingDeltaX;
        this.y = this.y + Math.max(this._pendingDeltaY, -maxUp);
    }

    public resetPending(): void {
        this._pendingDeltaX = 0;
        this._pendingDeltaY = 0;
        this._collidedWith.length = 0;
    }

    /** Pushes the simulated position to the sprite - eased over 150ms, or instantly on a resize. */
    public applyToVisualization(instant: boolean = false): void {
        if (!this._visualization) return;

        const overlap = this._visualization.overlap;
        const x = Math.trunc(this._x - overlap.x);
        const y = Math.trunc(this._y - overlap.y);

        if (!instant) this._visualization.moveTo(x, y);
        else this._visualization.setPosition(x, y);
    }

    public set fullHeightCollision(flag: boolean) {
        if (this._wideRect) this._wideRect.height = flag ? this._rect.height : (this._rect.height / 2);
    }

    public get hasHitDesktopMargin(): boolean {
        return this._visualization?.hasHitDesktopMargin ?? false;
    }

    public get readyToRecycle(): boolean {
        return this._visualization?.readyToRecycle ?? true;
    }

    public set readyToRecycle(flag: boolean) {
        if (this._visualization) this._visualization.readyToRecycle = flag;
    }

    public get timestamp(): number {
        return this._visualization?.timestamp ?? 0;
    }

    public get isSpacer(): boolean {
        return this._isSpacer;
    }

    public set isSpacer(flag: boolean) {
        this._isSpacer = flag;
    }

    public intersects(other: ChatBubbleSimulationEntity): boolean {
        if (this._wideRect) return this._rect.intersects(other._rect) || this._wideRect.intersects(other.wideRect);

        if (other._wideRect) return this._rect.intersects(other._rect) || this._rect.intersects(other._wideRect);

        return this._rect.intersects(other._rect);
    }

    public intersectsRect(other: ChatBubbleSimulationEntity): boolean {
        return this._rect.intersects(other._rect);
    }
}
