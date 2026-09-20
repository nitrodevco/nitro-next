import { Rectangle } from 'pixi.js';

import { ChatBubbleSimulationEntity } from './ChatBubbleSimulationEntity';
import { IChatFlowBubble } from './IChatFlowBubble';

/**
 * The Flash `ChatBubbleSimulationWithLimitedWideRect`: a narrow bubble (under 240px) in free-flow
 * mode gets a second, 240px wide, half-height rectangle centred on it. Neighbours collide with
 * that wider footprint, so short messages keep a comfortable gap around them instead of packing
 * edge to edge - the offset shifts as the stage nudges the bubble back toward its speaker.
 */
export class ChatBubbleSimulationWithLimitedWideRect extends ChatBubbleSimulationEntity {
    /** `WIDERECT_WIDTH` - its own constant in Flash, equal to (but not) `ChatBubbleWidth.THIN`. */
    public static readonly WIDE_RECT_WIDTH = 240;

    private _wideRectOffset: number;

    constructor(bubble: IChatFlowBubble) {
        super(bubble, false);

        this._wideRect = new Rectangle();
        this._wideRect.width = ChatBubbleSimulationWithLimitedWideRect.WIDE_RECT_WIDTH;
        this._wideRect.height = this._rect.height / 2;
        this._wideRectOffset = -(ChatBubbleSimulationWithLimitedWideRect.WIDE_RECT_WIDTH - this._rect.width) / 2;
        this._wideRect.x = this._rect.x + this._wideRectOffset;
        this._wideRect.y = this._rect.y;
    }

    public override get x(): number {
        return this._x;
    }

    public override set x(value: number) {
        this._x = this._x + ((value - this._x) * (1 - ChatBubbleSimulationEntity.SMOOTHING));
        this._rect.x = this._x;

        if (this._wideRect) this._wideRect.x = this._rect.x + this._wideRectOffset;
    }

    public override initializePosition(x: number, y: number): void {
        const overlap = this._visualization?.overlap;

        this._x = x + (overlap ? overlap.x : 0);
        this._y = y + (overlap ? overlap.y : 0);
        this._rect.x = this._x;
        this._rect.y = this._y;

        if (this._wideRect) {
            this._wideRect.x = this._rect.x + this._wideRectOffset;
            this._wideRect.y = this._rect.y;
        }
    }

    public get wideRectOffset(): number {
        return this._wideRectOffset;
    }

    public set wideRectOffset(value: number) {
        this._wideRectOffset = value;
    }
}
