import type { IRoomObjectSprite } from '@nitrodevco/nitro-api';

import type { AvatarVisualization } from '../AvatarVisualization';
import type { IExpressionAddition } from './IExpressionAddition';

export class ExpressionAddition implements IExpressionAddition {
    constructor(
        private _id: number,
        private _type: number,
        private _visualization: AvatarVisualization | undefined,
    ) {}

    public dispose(): void {
        this._visualization = undefined;
    }

    public update(sprite: IRoomObjectSprite, scale: number): void {
        return;
    }

    public animate(sprite: IRoomObjectSprite): boolean {
        return false;
    }

    public get id(): number {
        return this._id;
    }

    public get type(): number {
        return this._type;
    }

    public get visualization(): AvatarVisualization | undefined {
        return this._visualization;
    }
}
