import { AnimationFrameData } from './AnimationFrameData';
import type { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationFrameDirectionalData extends AnimationFrameData {
    private _directionalOffsets: DirectionalOffsetData | undefined = undefined;

    constructor(
        id: number,
        x: number,
        y: number,
        randomX: number,
        randomY: number,
        offsets: DirectionalOffsetData | undefined,
        repeats: number,
    ) {
        super(id, x, y, randomX, randomY, repeats);

        if (offsets) this._directionalOffsets = offsets;
    }

    public override hasDirectionalOffsets(): boolean {
        return !!this._directionalOffsets || false;
    }

    public override getX(direction: number): number {
        const x = super.getX(direction);

        return this._directionalOffsets?.getXOffset(direction, x) ?? x;
    }

    public override getY(direction: number): number {
        const y = super.getY(direction);

        return this._directionalOffsets?.getYOffset(direction, y) ?? y;
    }
}
