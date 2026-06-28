

import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { type ILegacyWallGeometry, type IVector3D, Vector3d } from '@nitrodevco/nitro-api';

export class LegacyWallGeometry implements ILegacyWallGeometry {
    public static L: string = 'l' as const;
    public static R: string = 'r' as const;

    private _isDisposed: boolean = false;
    private _scale: RoomGeometryScaleType = RoomGeometryScaleType.ZoomedIn;
    private _heightMap: number[][] = [];
    private _width: number = 0;
    private _height: number = 0;
    private _floorHeight: number = 0;

    public initialize(width: number, height: number, floorHeight: number): void {
        if (width <= this._width && height <= this._height) {
            this._width = width;
            this._height = height;
            this._floorHeight = floorHeight;

            return;
        }

        this.reset();

        let y = 0;

        while (y < height) {
            const heights: number[] = [];

            this._heightMap.push(heights);

            let x = 0;

            while (x < width) {
                heights.push(0);

                x++;
            }

            y++;
        }

        this._width = width;
        this._height = height;
        this._floorHeight = floorHeight;
    }

    public dispose(): void {
        this.reset();
        this._isDisposed = true;
    }

    public setHeight(x: number, y: number, height: number): boolean {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) return false;

        const heightMap = this._heightMap[y];

        if (!heightMap) return false;

        heightMap[x] = height;

        return true;
    }

    public getHeight(x: number, y: number): number {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) return 0;

        const heightMap = this._heightMap[y];

        if (!heightMap) return 0;

        return heightMap[x];
    }

    public getLocation(width: number, height: number, localX: number, localY: number, direction: string): IVector3D {
        if (width == 0 && height == 0) {
            width = this._width;
            height = this._height;
            const _local_12 = Math.round(this.scale / 10);
            if (direction == LegacyWallGeometry.R) {
                let _local_7 = this._width - 1;
                while (_local_7 >= 0) {
                    let _local_6 = 1;
                    while (_local_6 < this._height) {
                        if (this.getHeight(_local_7, _local_6) <= this._floorHeight) {
                            if (_local_6 - 1 < height) {
                                width = _local_7;
                                height = _local_6 - 1;
                            }
                            break;
                        }
                        _local_6++;
                    }
                    _local_7--;
                }
                localY = localY + (this.scale / 4 - _local_12 / 2);
                localX = localX + this.scale / 2;
            } else {
                let _local_6 = this._height - 1;
                while (_local_6 >= 0) {
                    let _local_7 = 1;
                    while (_local_7 < this._width) {
                        if (this.getHeight(_local_7, _local_6) <= this._floorHeight) {
                            if (_local_7 - 1 < width) {
                                width = _local_7 - 1;
                                height = _local_6;
                            }
                            break;
                        }
                        _local_7++;
                    }
                    _local_6--;
                }
                localY = localY + (this.scale / 4 - _local_12 / 2);
                localX = localX - _local_12;
            }
        }
        let _local_8: number = width;
        let _local_9: number = height;
        let _local_10: number = this.getHeight(width, height);
        if (direction == LegacyWallGeometry.R) {
            _local_8 = _local_8 + (localX / (this._scale / 2) - 0.5);
            _local_9 = _local_9 + 0.5;
            _local_10 = _local_10 - (localY - localX / 2) / (this._scale / 2);
        } else {
            _local_9 = _local_9 + ((this._scale / 2 - localX) / (this._scale / 2) - 0.5);
            _local_8 = _local_8 + 0.5;
            _local_10 = _local_10 - (localY - (this._scale / 2 - localX) / 2) / (this._scale / 2);
        }
        const _local_11: IVector3D = new Vector3d(_local_8, _local_9, _local_10);
        return _local_11;
    }

    public getLocationFromString(loc: string): { width: number, height: number, localX: number, localY: number, direction: string } {
        let width = 0;
        let height = 0;
        let localX = 0;
        let localY = 0;
        let direction = '';

        if (loc.indexOf(':') === 0) {
            let parts = loc.split(' ');

            if (parts.length >= 3) {
                let widthHeight = parts[0];
                let leftRight = parts[1];

                direction = parts[2];

                if ((widthHeight.length > 3) && (leftRight.length > 2)) {
                    widthHeight = widthHeight.substr(3);
                    leftRight = leftRight.substr(2);
                    parts = widthHeight.split(',');

                    if (parts.length >= 2) {
                        width = parseInt(parts[0]);
                        height = parseInt(parts[1]);

                        parts = leftRight.split(',');

                        if (parts.length >= 2) {
                            localX = parseInt(parts[0]);
                            localY = parseInt(parts[1]);
                        }
                    }
                }
            }
        }

        return { width, height, localX, localY, direction };
    }

    public getLocationOldFormat(k: number, _arg_2: number, dir: string): IVector3D {
        let _local_7 = 0;
        let y = Math.ceil(k);
        const _local_6 = y - k;
        let finalX: number = 0;
        let finalY: number = 0;

        let x = 0;

        while (x < this._width) {
            if (y >= 0 && y < this._height) {
                if (this.getHeight(x, y) <= this._floorHeight) {
                    finalX = x - 1;
                    finalY = y;
                    _local_7 = x;
                    dir = LegacyWallGeometry.L;

                    break;
                }
                if (this.getHeight(x, y + 1) <= this._floorHeight) {
                    finalX = x;
                    finalY = y;
                    _local_7 = finalY - k;
                    dir = LegacyWallGeometry.R;

                    break;
                }
            }
            y++;
            x++;
        }

        let _local_11 =
            (this.getHeight(finalX, finalY) * this.scale) / 2 +
            ((-_local_7 * this.scale) / 2 + (((-_arg_2 * 18) / 32) * this.scale) / 2);

        if (dir == LegacyWallGeometry.R) {
            _local_11 = _local_11 + (_local_6 * this.scale) / 4;
        } else {
            _local_11 = _local_11 + ((1 - _local_6) * this.scale) / 4;
        }
        return this.getLocation(finalX, finalY, (this.scale / 2) * _local_6, _local_11, dir);
    }

    public getOldLocation(loc: IVector3D, angle: number): [number, number, number, number, string] | undefined {
        if (!loc) return undefined;

        let x = 0;
        let y = 0;
        let wallOffset = 0;
        let z = 0;
        let dir = '';
        let height = 0;

        if (angle == 90) {
            x = Math.floor(loc.x - 0.5);
            y = Math.floor(loc.y + 0.5);
            height = this.getHeight(x, y);
            wallOffset = this._scale / 2 - (loc.y - y + 0.5) * (this._scale / 2);
            z = (height - loc.z) * (this._scale / 2) + (this._scale / 2 - wallOffset) / 2;
            dir = LegacyWallGeometry.L;
        } else if (angle == 180) {
            x = Math.floor(loc.x + 0.5);
            y = Math.floor(loc.y - 0.5);
            height = this.getHeight(x, y);
            wallOffset = (loc.x + 0.5 - x) * (this._scale / 2);
            z = (height - loc.z) * (this._scale / 2) + wallOffset / 2;
            dir = LegacyWallGeometry.R;
        } else {
            return undefined;
        }

        return [x, y, wallOffset, z, dir];
    }

    public getOldLocationString(loc: IVector3D, angle: number): string {
        const _local_3 = this.getOldLocation(loc, angle);

        if (!_local_3) return '';

        return (
            ':w=' +
            Math.trunc(_local_3[0]) +
            ',' +
            Math.trunc(_local_3[1]) +
            ' l=' +
            Math.trunc(_local_3[2]) +
            ',' +
            Math.trunc(_local_3[3]) +
            ' ' +
            _local_3[4]
        );
    }

    public getDirection(dir: string): number {
        if (dir == LegacyWallGeometry.R) return 180;

        return 90;
    }

    public getFloorAltitude(x: number, y: number): number {
        const height = this.getHeight(x, y);
        const _local_4 = height + 1;

        return (
            height +
            (Math.trunc(this.getHeight(x - 1, y - 1)) == _local_4 ||
                Math.trunc(this.getHeight(x, y - 1)) == _local_4 ||
                Math.trunc(this.getHeight(x + 1, y - 1)) == _local_4 ||
                Math.trunc(this.getHeight(x - 1, y)) == _local_4 ||
                Math.trunc(this.getHeight(x + 1, y)) == _local_4 ||
                Math.trunc(this.getHeight(x - 1, y + 1)) == _local_4 ||
                Math.trunc(this.getHeight(x, y + 1)) == _local_4 ||
                Math.trunc(this.getHeight(x + 1, y + 1)) == _local_4
                ? 0.5
                : 0)
        );
    }

    public isRoomTile(x: number, y: number): boolean {
        return x >= 0 && x < this._width && y >= 0 && y < this._height && this._heightMap[y][x] >= 0;
    }

    public get disposed(): boolean {
        return this._isDisposed;
    }

    public get scale(): RoomGeometryScaleType {
        return this._scale;
    }

    public set scale(scale: RoomGeometryScaleType) {
        this._scale = scale;
    }

    private reset(): void {
        this._heightMap = [];
    }
}
