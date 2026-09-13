import { AnimatedScalar } from '../variablefx/animation/AnimatedScalar';
import { IStackedAddition } from './IStackedAddition';
import { StackedAdditionSprite } from './StackedAdditionSprite';

export class StackedAdditionEntry {
    public addition: IStackedAddition | undefined;
    public sprite: StackedAdditionSprite | undefined = new StackedAdditionSprite();
    /** The entry's vertical slot; eases when the entries below it appear/disappear. */
    public y: AnimatedScalar = new AnimatedScalar(0.003, 0.35, 0.01, 0.004);
    public layer: number;
    public createdAt: number;
    public configId: number;
    public variableId: string;
    public contributesToLayout: boolean = true;

    private _initialized: boolean = false;
    private _targetY: number = 0;

    constructor(addition: IStackedAddition, layer: number, createdAt: number = 0, configId: number = 0, variableId: string = '') {
        this.addition = addition;
        this.layer = layer;
        this.createdAt = createdAt;
        this.configId = configId;
        this.variableId = variableId ?? '';
    }

    public setTarget(y: number, time: number): boolean {
        if (!this._initialized) {
            this.y.snapTo(y, time);
            this._targetY = y;
            this._initialized = true;

            return true;
        }

        if (this._targetY === y) return false;

        const previous = this.y.value;

        this._targetY = y;

        this.y.setTarget(y, time);

        return this.y.value !== previous;
    }

    public needsAnimationTick(time: number): boolean {
        return this._initialized && this.y.needsUpdate(time, 1);
    }

    public freezePosition(time: number): boolean {
        const changed = this.y.update(time);

        this.y.snapTo(this.y.value, time);
        this._targetY = this.y.value;

        return changed;
    }

    public dispose(): void {
        if (this.addition) {
            this.addition.dispose();
            this.addition = undefined;
        }

        if (this.sprite) {
            this.sprite.dispose();
            this.sprite = undefined;
        }
    }
}
