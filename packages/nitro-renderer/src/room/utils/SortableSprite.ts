import type { IRoomObjectSprite, ISortableSprite } from '@nitrodevco/nitro-api';

export class SortableSprite implements ISortableSprite {
    public static Z_INFINITY: number = 100000000;

    private _name: string = '';
    private _sprite: IRoomObjectSprite = null!;
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    public dispose(): void {
        this._z = -SortableSprite.Z_INFINITY;
        this._sprite = null!;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get sprite(): IRoomObjectSprite {
        return this._sprite;
    }

    public set sprite(sprite: IRoomObjectSprite) {
        this._sprite = sprite;
    }

    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        this._y = y;
    }

    public get z(): number {
        return this._z;
    }

    public set z(z: number) {
        this._z = z;
    }
}
