import { AvatarActionStateType, IRoomObjectSprite, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { IStackedAddition } from '../../stacked/IStackedAddition';
import { StackedAdditionStack } from '../../stacked/StackedAdditionStack';
import { VariableFxStackAddition } from '../../variablefx/VariableFxStackAddition';
import { AvatarVisualization } from '../AvatarVisualization';
import { IAvatarAddition } from './IAvatarAddition';

/**
 * The avatar addition that owns the stack of Variable FX statuses drawn above the head. It
 * occupies one addition sprite; the stack composes its entries into that sprite's texture.
 */
export class StackedAdditions implements IAvatarAddition {
    public static LAYER_VARIABLE_FX: number = 0;
    public static LAYER_HABBICON: number = 100;

    private static ROOM_LARGE_STACK_BOTTOM_Y: number = -86;
    private static ROOM_SMALL_STACK_BOTTOM_Y: number = -45;

    private _id: number;
    private _visualization: AvatarVisualization | undefined;
    private _stack: StackedAdditionStack = new StackedAdditionStack();
    private _scale: RoomGeometryScaleType = RoomGeometryScaleType.ZoomedIn;
    private _disposed: boolean = false;

    constructor(id: number, visualization: AvatarVisualization) {
        this._id = id;
        this._visualization = visualization;
    }

    public get id(): number {
        return this._id;
    }

    public get isEmpty(): boolean {
        return this._stack.isEmpty;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get stack(): StackedAdditionStack {
        return this._stack;
    }

    public addStackedAddition(addition: IStackedAddition, layer: number, createdAt: number = 0, configId: number = 0, variableId: string = ''): void {
        this._stack.add(addition, layer, createdAt, configId, variableId);
    }

    public removeStackedAddition(id: number): void {
        this._stack.remove(id);
    }

    public getStackedAddition(id: number): IStackedAddition | undefined {
        return this._stack.get(id);
    }

    public getVariableFxAddition(configId: number, variableId: string): VariableFxStackAddition | undefined {
        for (const addition of this.getVariableFxAdditions()) {
            if (addition.configId === configId && addition.variableId === variableId) return addition;
        }

        return undefined;
    }

    public getVariableFxAdditions(): VariableFxStackAddition[] {
        const additions: VariableFxStackAddition[] = [];

        for (const addition of this._stack.getAdditions()) {
            if (addition instanceof VariableFxStackAddition) additions.push(addition);
        }

        return additions;
    }

    public update(sprite: IRoomObjectSprite, scale: RoomGeometryScaleType): void {
        this._scale = scale;

        this._stack.update(sprite, scale, this.resolveStackBottomY());
    }

    public animate(sprite: IRoomObjectSprite): boolean {
        return this._stack.animate(sprite, this.resolveStackBottomY());
    }

    public dispose(): void {
        this._stack.dispose();
        this._visualization = undefined;
        this._disposed = true;
    }

    private resolveStackBottomY(): number {
        const small = this._scale < RoomGeometryScaleType.AvatarSizeNormal;
        const avatarScale = small ? RoomGeometryScaleType.ZoomedOut : RoomGeometryScaleType.ZoomedIn;

        let bottomY = small ? StackedAdditions.ROOM_SMALL_STACK_BOTTOM_Y : StackedAdditions.ROOM_LARGE_STACK_BOTTOM_Y;

        if (!this._visualization) return bottomY;

        const posture = this._visualization.posture;

        if (posture === AvatarActionStateType.Sit) {
            bottomY += avatarScale / 2;
        } else if (posture === AvatarActionStateType.Lay) {
            bottomY += avatarScale;
        }

        return bottomY;
    }
}
