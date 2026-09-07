import { Point, Rectangle } from 'pixi.js';

import { CHAT_BUBBLE_HEIGHT_PADDING, CHAT_FLOW_SCROLL_UP_STEP } from '../ChatConstants';
import { IChatFlowBubble } from './IChatFlowBubble';

let nextSpacerId = -1;

/**
 * The invisible row spacer line-by-line mode inserts on every scroll-up cycle (the Flash
 * `BlankStyle` bubble): nothing is drawn, it only occupies one scroll step in the simulation so
 * the next real bubble lands a full row lower. Pure simulation state - no React, no sprite.
 */
export class ChatFlowSpacer implements IChatFlowBubble {
    private static readonly EMPTY_OVERLAP = new Rectangle(0, 0, 0, 0);

    public readonly id: number = nextSpacerId--;
    public readonly roomId: number = -1;
    public readonly timestamp: number = Math.floor(performance.now());
    public readonly bubbleWidth: number = 20;
    public readonly limitedHeight: number = CHAT_FLOW_SCROLL_UP_STEP + CHAT_BUBBLE_HEIGHT_PADDING;
    public readonly minHeight: number;
    public readonly hasHitDesktopMargin: boolean = false;
    public readyToRecycle: boolean = false;

    private _x: number = 0;
    private _y: number = 0;

    constructor(height: number) {
        this.minHeight = height;
    }

    public get overlap(): Rectangle {
        return ChatFlowSpacer.EMPTY_OVERLAP;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get userScreenLocation(): Point {
        return new Point(0, 0);
    }

    public moveTo(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public setPosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }
}
