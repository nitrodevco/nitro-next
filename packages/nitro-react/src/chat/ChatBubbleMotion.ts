import { Container, Point, Rectangle, Sprite } from 'pixi.js';
import { RefObject } from 'react';

import { CHAT_BUBBLE_POINTER_MIN_X, CHAT_BUBBLE_POINTER_RIGHT_MARGIN, ChatBubbleLayout } from './ChatBubbleContent';
import { ChatBubbleData } from './ChatBubbleData';
import { IChatFlowBubble, IChatFlowHost } from './simulation/IChatFlowBubble';

export interface ChatBubbleMotionOptions {
    data: ChatBubbleData;
    host: Pick<IChatFlowHost, 'stageWidth' | 'getUserScreenLocation'>;
    /** The rendered bubble's container and pointer sprite - read by ref, never during a React render. */
    container: RefObject<Container | null>;
    pointer: RefObject<Sprite | null>;
    /** The simulation let go of this bubble - it should leave the store. */
    onRecycle: () => void;
}

export interface ChatBubbleMotionMetrics {
    layout: ChatBubbleLayout;
    overlap: Rectangle;
    pointerOffsetY: number;
    useDesktopMargins: boolean;
    minHeight?: number;
}

/**
 * The movement half of the Flash `PooledChatBubble`, driving a React-rendered bubble's Pixi
 * container by ref. The simulation sets targets through `moveTo`/`setPosition`; each frame
 * `update` eases toward them over 150ms, re-aims the pointer at the speaker every two seconds,
 * and reveals the sprite after its first 150ms so it never flashes at its unrelaxed spot. The
 * x it exposes is a "proxy": the sprite's real x adds the room's pan offset (and, in
 * line-by-line mode, clamps to the desktop margins).
 */
export class ChatBubbleMotion implements IChatFlowBubble {
    /** `_Str_10527` / `_Str_16997` */
    private static readonly DESKTOP_MARGIN_LEFT = 85;
    private static readonly DESKTOP_MARGIN_RIGHT = 190;
    /** `_Str_6907` */
    private static readonly MOVE_DURATION_MS = 150;
    /** `_Str_25378` */
    private static readonly POINTER_UPDATE_INTERVAL_MS = 2000;

    private readonly _options: ChatBubbleMotionOptions;
    private _metrics: ChatBubbleMotionMetrics | undefined;
    private _timeMs: number = 0;
    private _moveBeginMs: number = 0;
    private _moveTargetX: number = 0;
    private _moveTargetY: number = 0;
    private _moveOriginX: number = 0;
    private _moveOriginY: number = 0;
    private _moveDeltaXPerMs: number = 0;
    private _moveDeltaYPerMs: number = 0;
    private _proxyX: number = 0;
    private _x: number = 0;
    private _y: number = 0;
    private _roomPanOffsetX: number = 0;
    private _hasHitDesktopMargin: boolean = false;
    private _readyToRecycle: boolean = false;
    private _timePointerPositionUpdateMs: number = 0;
    private _visible: boolean = false;

    constructor(options: ChatBubbleMotionOptions) {
        this._options = options;
    }

    public setMetrics(metrics: ChatBubbleMotionMetrics): void {
        this._metrics = metrics;
    }

    public get id(): number {
        return this._options.data.id;
    }

    public get roomId(): number {
        return this._options.data.roomId;
    }

    public get timestamp(): number {
        return this._options.data.timestamp;
    }

    public get bubbleWidth(): number {
        return this._metrics?.layout.bubbleWidth ?? 0;
    }

    public get limitedHeight(): number {
        return this._metrics?.layout.limitedHeight ?? 0;
    }

    public get minHeight(): number {
        return this._metrics?.minHeight ?? -1;
    }

    public get overlap(): Rectangle {
        return this._metrics?.overlap ?? new Rectangle(0, 0, 0, 0);
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get hasHitDesktopMargin(): boolean {
        return this._hasHitDesktopMargin;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get readyToRecycle(): boolean {
        return this._readyToRecycle;
    }

    public set readyToRecycle(flag: boolean) {
        if (this._readyToRecycle === flag) return;

        this._readyToRecycle = flag;

        if (flag) this._options.onRecycle();
    }

    /** `_Str_11643` - where the speaker is on screen right now (the stored room location, re-projected). */
    public get userScreenLocation(): Point {
        const { data, host } = this._options;

        if (data.forcedScreenLocationX !== undefined) return new Point((host.stageWidth / 2) + data.forcedScreenLocationX, 500);

        return host.getUserScreenLocation(data.roomId, data.userLocation);
    }

    public moveTo(x: number, y: number): void {
        if ((this._moveTargetX !== x) || (this._moveTargetY !== y)) {
            this._moveBeginMs = this._timeMs;
            this._moveOriginX = this._proxyX;
            this._moveOriginY = this._y;
            this._moveTargetX = x;
            this._moveTargetY = y;
            this._moveDeltaXPerMs = (x - this._proxyX) / ChatBubbleMotion.MOVE_DURATION_MS;
            this._moveDeltaYPerMs = (y - this._y) / ChatBubbleMotion.MOVE_DURATION_MS;
        }
    }

    public setPosition(x: number, y: number): void {
        this._moveTargetX = x;
        this._moveTargetY = y;
        this.proxyX = x;
        this.setY(y);
        this.updatePointerPosition();
    }

    public set roomPanOffsetX(value: number) {
        if (this._roomPanOffsetX !== value) {
            this._roomPanOffsetX = value;
            this.setPosition(this._moveTargetX, this._moveTargetY);
        }
    }

    public update(elapsedMs: number): void {
        this._timeMs += elapsedMs;

        if ((this._proxyX !== this._moveTargetX) || (this._y !== this._moveTargetY)) {
            const elapsed = this._timeMs - this._moveBeginMs;

            if ((elapsed < ChatBubbleMotion.MOVE_DURATION_MS) && (elapsed > 0)) {
                this.proxyX = Math.trunc(this._moveOriginX + (elapsed * this._moveDeltaXPerMs));
                this.setY(Math.trunc(this._moveOriginY + (elapsed * this._moveDeltaYPerMs)));
            } else {
                this.proxyX = this._moveTargetX;
                this.setY(this._moveTargetY);
            }

            // The bubble moved under its pointer: re-aim now rather than at the next two-second
            // refresh, or the bubble surfaces (after its hidden 150ms) pointing at where it was born.
            this.updatePointerPosition();
            this._timePointerPositionUpdateMs = this._timeMs;
        }

        if (this._timeMs > (this._timePointerPositionUpdateMs + ChatBubbleMotion.POINTER_UPDATE_INTERVAL_MS)) {
            this.updatePointerPosition();

            this._timePointerPositionUpdateMs = this._timeMs;
        }

        if ((this._timeMs > ChatBubbleMotion.MOVE_DURATION_MS) && !this._visible) {
            this._visible = true;

            const container = this._options.container.current;

            if (container) container.visible = true;
        }
    }

    /** `_Str_12210` - re-aims the pointer at the speaker, clamped inside the bubble. */
    public updatePointerPosition(): void {
        const pointer = this._options.pointer.current;
        const metrics = this._metrics;

        if (!pointer || !metrics || (metrics.layout.pointerY === undefined)) return;

        const speakerOffsetX = this.userScreenLocation.x - this._x;

        pointer.x = Math.max(CHAT_BUBBLE_POINTER_MIN_X, Math.min(metrics.layout.width - CHAT_BUBBLE_POINTER_RIGHT_MARGIN, speakerOffsetX));
        pointer.y = metrics.layout.height - metrics.pointerOffsetY;
    }

    /** Pushes the current position (and pointer aim) back onto the sprites - after a React re-render, which may have reset their props. */
    public syncContainer(): void {
        const container = this._options.container.current;

        if (container) {
            container.x = this._x;
            container.y = this._y;
            container.visible = this._visible;
        }

        this.updatePointerPosition();
    }

    /** `_Str_3980` - the simulation's x; the sprite's x adds the room pan (and the desktop clamp). */
    private get proxyX(): number {
        return this._proxyX;
    }

    private set proxyX(value: number) {
        this._proxyX = value;

        let x = this._proxyX + this._roomPanOffsetX;

        if (this._metrics?.useDesktopMargins) {
            const maxX = (this._options.host.stageWidth - ChatBubbleMotion.DESKTOP_MARGIN_RIGHT) - this.bubbleWidth;

            this._hasHitDesktopMargin = false;

            if (x > maxX) {
                x = maxX;
                this._hasHitDesktopMargin = true;
            }

            if (x < ChatBubbleMotion.DESKTOP_MARGIN_LEFT) {
                x = ChatBubbleMotion.DESKTOP_MARGIN_LEFT;
                this._hasHitDesktopMargin = true;
            }
        }

        this._x = x;

        const container = this._options.container.current;

        if (container) container.x = x;
    }

    private setY(value: number): void {
        this._y = value;

        const container = this._options.container.current;

        if (container) container.y = value;
    }
}
