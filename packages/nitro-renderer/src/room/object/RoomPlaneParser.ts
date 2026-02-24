import { type IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

import { RoomFloorHole } from './RoomFloorHole';
import { RoomMapData } from './RoomMapData';
import { RoomPlaneData } from './RoomPlaneData';
import { RoomWallData } from './RoomWallData';

export class RoomPlaneParser {
    public static TILE_BLOCKED: number = -110;
    public static TILE_HOLE: number = -100;
    private static FLOOR_THICKNESS: number = 0.25;
    private static WALL_THICKNESS: number = 0.25;
    private static MAX_WALL_ADDITIONAL_HEIGHT: number = 20;
    private _tileMatrix: number[][] = [];
    private _tileMatrixOriginal: number[][] = [];
    private _width: number = 0;
    private _height: number = 0;
    private _planes: RoomPlaneData[] = [];
    private _highlights: RoomPlaneData[] = [];
    private _fixedWallHeight: number = -1;
    private _floorHoles: Map<number, RoomFloorHole> = new Map();
    private _floorHolesInverted: Map<number, RoomFloorHole> = new Map();
    private _floorHoleMatrix: boolean[][] = [];
    private floorTiles: number[][] = [];
    private _minX: number = 0;

    public dispose(): void {
        this._planes = [];
        this._tileMatrix = [];
        this._tileMatrixOriginal = [];
        this._floorHoleMatrix = [];

        this._floorHoles.clear();
        this._floorHolesInverted.clear();
    }

    public reset(): void {
        this._planes = [];
        this._tileMatrix = [];
        this._tileMatrixOriginal = [];
        this._width = 0;
        this._height = 0;
        this._minX = 0;
        this._maxX = 0;
        this._minY = 0;
        this._maxY = 0;
        this._floorHeight = 0;
        this._floorHoleMatrix = [];
    }

    public initializeTileMap(width: number, height: number): boolean {
        if (width < 0) width = 0;

        if (height < 0) height = 0;

        this._tileMatrix = [];
        this._tileMatrixOriginal = [];
        this._floorHoleMatrix = [];

        let y = 0;

        while (y < height) {
            const tileMatrix: number[] = [];
            const tileMatrixOriginal: number[] = [];
            const floorHoleMatrix: boolean[] = [];

            let x = 0;

            while (x < width) {
                tileMatrix[x] = RoomPlaneParser.TILE_BLOCKED;
                tileMatrixOriginal[x] = RoomPlaneParser.TILE_BLOCKED;
                floorHoleMatrix[x] = false;

                x++;
            }

            this._tileMatrix.push(tileMatrix);
            this._tileMatrixOriginal.push(tileMatrixOriginal);
            this._floorHoleMatrix.push(floorHoleMatrix);

            y++;
        }

        this._width = width;
        this._height = height;
        this._minX = this._width;
        this._maxX = -1;
        this._minY = this._height;
        this._maxY = -1;

        return true;
    }

    public setTileHeight(x: number, y: number, height: number): boolean {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            const matrix = this._tileMatrix[y];

            matrix[x] = height;

            if (height >= 0) {
                if (x < this._minX) this._minX = x;
                if (x > this._maxX) this._maxX = x;
                if (y < this._minY) this._minY = y;
                if (y > this._maxY) this._maxY = y;
            } else {
                if (x === this._minX || x === this._maxX) {
                    let _local_5 = false;
                    let _local_6 = this._minY;

                    while (_local_6 < this._maxY) {
                        if (this.getTileHeightInternal(x, _local_6) >= 0) {
                            _local_5 = true;
                            break;
                        }

                        _local_6++;
                    }

                    if (!_local_5) {
                        if (x == this._minX) this._minX++;
                        if (x == this._maxX) this._maxX--;
                    }
                }

                if (y === this._minY || y === this._maxY) {
                    let _local_7 = false;
                    let _local_8 = this._minX;

                    while (_local_8 < this._maxX) {
                        if (this.getTileHeight(_local_8, y) >= 0) {
                            _local_7 = true;
                            break;
                        }

                        _local_8++;
                    }

                    if (!_local_7) {
                        if (y == this._minY) this._minY++;
                        if (y == this._maxY) this._maxY--;
                    }
                }
            }

            return true;
        }

        return false;
    }

    public getTileHeight(x: number, y: number): number {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return RoomPlaneParser.TILE_BLOCKED;
        }

        return Math.abs(this._tileMatrix[y][x] ?? 0);
    }

    public initializeFromTileData(k: number = -1): boolean {
        this._fixedWallHeight = k;

        let y = 0;

        while (y < this._height) {
            let x = 0;

            while (x < this._width) {
                if (this._tileMatrixOriginal[y] === undefined) this._tileMatrixOriginal[y] = [];

                this._tileMatrixOriginal[y][x] = this._tileMatrix[y][x];

                x++;
            }

            y++;
        }

        const enteranceTile = RoomPlaneParser.findEntranceTile(this._tileMatrix);

        y = 0;

        while (y < this._height) {
            let x = 0;

            while (x < this._width) {
                if (this._floorHoleMatrix[y] === undefined) this._floorHoleMatrix[y] = [];

                if (this._floorHoleMatrix[y][x]) this.setTileHeight(x, y, RoomPlaneParser.TILE_HOLE);

                x++;
            }

            y++;
        }

        return this.initialize(enteranceTile);
    }

    public initializeHighlightArea(param1: number, param2: number, param3: number, param4: number): void {
        this.clearHighlightArea();
        this.extractPlanes(this.floorTiles, param1 * 4, param2 * 4, param3 * 4, param4 * 4, true);
    }

    public clearHighlightArea(): number {
        const highLightsLength: number = this._highlights.length;
        this._planes = this._planes.slice(0, this._planes.length - this._highlights.length);
        this._highlights.length = 0;
        return highLightsLength;
    }

    public initializeFromMapData(data: RoomMapData): boolean {
        if (!data) return false;

        this.reset();

        this.resetFloorHoles();

        const width = data.width;
        const height = data.height;
        const wallHeight = data.wallHeight;
        const fixedWallsHeight = data.fixedWallsHeight;

        this.initializeTileMap(width, height);

        if (data.tileMap) {
            let y = 0;

            while (y < data.tileMap.length) {
                const row = data.tileMap[y];

                if (row) {
                    let x = 0;

                    while (x < row.length) {
                        const column = row[x];

                        if (column) this.setTileHeight(x, y, column.height);

                        x++;
                    }
                }

                y++;
            }
        }

        if (data.holeMap && data.holeMap.length) {
            let index = 0;

            while (index < data.holeMap.length) {
                const hole = data.holeMap[index];

                if (!hole) continue;

                this.addFloorHole(hole.id, hole.x, hole.y, hole.width, hole.height, hole.invert);

                index++;
            }

            this.initializeHoleMap();
        }

        this.wallHeight = wallHeight;

        this.initializeFromTileData(fixedWallsHeight);

        return true;
    }

    public isPlaneTemporaryHighlighter(param1: number): boolean {
        if (param1 < 0 || param1 >= this.planeCount) {
            return false;
        }

        const _loc2_: RoomPlaneData = this._planes[param1];

        if (_loc2_ == null) {
            return false;
        }

        return this._highlights.indexOf(_loc2_) != -1;
    }

    public getMapData(): RoomMapData {
        const data = new RoomMapData();

        data.width = this._width;
        data.height = this._height;
        data.wallHeight = this._wallHeight;
        data.fixedWallsHeight = this._fixedWallHeight;
        data.dimensions.minX = this.minX;
        data.dimensions.maxX = this.maxX;
        data.dimensions.minY = this.minY;
        data.dimensions.maxY = this.maxY;

        let y = 0;

        while (y < this._height) {
            const tileRow: { height: number }[] = [];
            const tileMatrix = this._tileMatrixOriginal[y];

            let x = 0;

            while (x < this._width) {
                const tileHeight = tileMatrix[x];

                tileRow.push({ height: tileHeight });

                x++;
            }

            data.tileMap.push(tileRow);

            y++;
        }

        for (const [holeId, holeData] of this._floorHoles.entries()) {
            if (!holeData) continue;

            data.holeMap.push({
                id: holeId,
                x: holeData.x,
                y: holeData.y,
                width: holeData.width,
                height: holeData.height,
                invert: false,
            });
        }

        for (const [holeId, holeData] of this._floorHolesInverted.entries()) {
            if (!holeData) continue;

            data.holeMap.push({
                id: holeId,
                x: holeData.x,
                y: holeData.y,
                width: holeData.width,
                height: holeData.height,
                invert: true,
            });
        }

        return data;
    }

    public getPlaneLocation(id: number): IVector3D | undefined {
        return this._planes[id]?.loc;
    }

    public getPlaneNormal(id: number): IVector3D | undefined {
        return this._planes[id]?.normal;
    }

    public getPlaneLeftSide(id: number): IVector3D | undefined {
        return this._planes[id]?.leftSide;
    }

    public getPlaneRightSide(id: number): IVector3D | undefined {
        return this._planes[id]?.rightSide;
    }

    public getPlaneNormalDirection(id: number): IVector3D | undefined {
        return this._planes[id]?.normalDirection;
    }

    public getPlaneSecondaryNormals(id: number): IVector3D[] {
        const normals: IVector3D[] = [];
        const plane = this._planes[id];

        if (plane) {
            let i = 0;

            while (i < plane.secondaryNormalCount) {
                normals.push(plane.getSecondaryNormal(i));

                i++;
            }
        }

        return normals;
    }

    public getPlaneType(id: number): number {
        return this._planes[id]?.type ?? RoomPlaneData.PLANE_UNDEFINED;
    }

    public getPlaneMaskCount(id: number): number {
        return this._planes[id]?.maskCount ?? 0;
    }

    public getPlaneMaskLeftSideLoc(id: number, maskId: number): number {
        return this._planes[id]?.getMaskLeftSideLoc(maskId) ?? -1;
    }

    public getPlaneMaskRightSideLoc(id: number, maskId: number): number {
        return this._planes[id]?.getMaskRightSideLoc(maskId) ?? -1;
    }

    public getPlaneMaskLeftSideLength(id: number, maskId: number): number {
        return this._planes[id]?.getMaskLeftSideLength(maskId) ?? -1;
    }

    public getPlaneMaskRightSideLength(id: number, maskId: number): number {
        return this._planes[id]?.getMaskRightSideLength(maskId) ?? -1;
    }

    public addFloorHole(
        id: number,
        x: number,
        y: number,
        width: number,
        height: number,
        inverted: boolean = false,
    ): void {
        this.removeFloorHole(id);

        const hole = new RoomFloorHole(x, y, width, height);

        if (inverted) this._floorHolesInverted.set(id, hole);
        else this._floorHoles.set(id, hole);
    }

    public removeFloorHole(id: number): void {
        this._floorHoles.delete(id);
        this._floorHolesInverted.delete(id);
    }

    public resetFloorHoles(): void {
        this._floorHoles.clear();
        this._floorHolesInverted.clear();
    }

    private getTileHeightOriginal(k: number, _arg_2: number): number {
        if (k < 0 || k >= this._width || _arg_2 < 0 || _arg_2 >= this._height) {
            return RoomPlaneParser.TILE_BLOCKED;
        }
        if (this._floorHoleMatrix[_arg_2][k]) {
            return RoomPlaneParser.TILE_HOLE;
        }
        const _local_3 = this._tileMatrixOriginal[_arg_2];
        return _local_3[k];
    }

    private getTileHeightInternal(x: number, y: number): number {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return RoomPlaneParser.TILE_BLOCKED;
        }

        return this._tileMatrix[y][x];
    }

    private initialize(enteranceTile: Point | undefined): boolean {
        let enteranceHeight = 0;

        if (enteranceTile) {
            enteranceHeight = this.getTileHeight(enteranceTile.x, enteranceTile.y);

            this.setTileHeight(enteranceTile.x, enteranceTile.y, RoomPlaneParser.TILE_BLOCKED);
        }

        this._floorHeight = RoomPlaneParser.getFloorHeight(this._tileMatrix);

        this.createWallPlanes();

        const materices: number[][] = [];

        for (const matrix of this._tileMatrix) materices.push(matrix.concat());

        RoomPlaneParser.padHeightMap(materices);
        RoomPlaneParser.addTileTypes(materices);
        RoomPlaneParser.unpadHeightMap(materices);

        this.floorTiles = RoomPlaneParser.expandFloorTiles(materices);

        this.extractPlanes(this.floorTiles);
        if (enteranceTile != null) {
            this.setTileHeight(enteranceTile.x, enteranceTile.y, enteranceHeight);
            this.addFloor(
                new Vector3d(enteranceTile.x + 0.5, enteranceTile.y + 0.5, enteranceHeight),
                new Vector3d(-1, 0, 0),
                new Vector3d(0, -1, 0),
                false,
                false,
                false,
                false,
            );
        }

        return true;
    }

    private generateWallData(k: Point, _arg_2: boolean): RoomWallData | undefined {
        const wallData: RoomWallData = new RoomWallData();
        const funcs: ((k: Point, _arg_2: boolean) => Point | undefined)[] = [
            this.extractTopWall.bind(this),
            this.extractRightWall.bind(this),
            this.extractBottomWall.bind(this),
            this.extractLeftWall.bind(this),
        ];

        let _local_5 = 0;
        let corner: Point = new Point(k.x, k.y);
        let _local_7 = 0;

        while (_local_7++ < 1000) {
            let border = false;
            let highlight = false;

            const direction = _local_5;

            if (corner.x < this.minX || corner.x > this.maxX || corner.y < this.minY || corner.y > this.maxY)
                border = true;

            const extraction = funcs[_local_5](corner, _arg_2);

            if (extraction === undefined) return undefined;

            let length = Math.abs(extraction.x - corner.x) + Math.abs(extraction.y - corner.y);

            if (corner.x === extraction.x || corner.y === extraction.y) {
                _local_5 = (_local_5 - 1 + funcs.length) % funcs.length;
                length = length + 1;
                highlight = true;
            } else {
                _local_5 = (_local_5 + 1) % funcs.length;
                length--;
            }

            wallData.addWall(corner, direction, length, border, highlight);

            if (
                extraction.x == k.x &&
                extraction.y == k.y &&
                (!(extraction.x == corner.x) || !(extraction.y == corner.y))
            )
                break;

            corner = extraction;
        }

        if (wallData.count === 0) return undefined;

        return wallData;
    }

    private hidePeninsulaWallChains(k: RoomWallData): void {
        let _local_2 = 0;
        const _local_3: number = k.count;
        while (_local_2 < _local_3) {
            const _local_4 = _local_2;

            let _local_5 = _local_2;
            let _local_6 = 0;
            let _local_7 = false;

            while (!k.getBorder(_local_2) && _local_2 < _local_3) {
                if (k.getLeftTurn(_local_2)) {
                    _local_6++;
                } else if (_local_6 > 0) {
                    _local_6--;
                }

                if (_local_6 > 1) _local_7 = true;

                _local_5 = _local_2;
                _local_2++;
            }

            if (_local_7) {
                let _local_8 = _local_4;

                while (_local_8 <= _local_5) {
                    k.setHideWall(_local_8, true);

                    _local_8++;
                }
            }

            _local_2++;
        }
    }

    private updateWallsNextToHoles(k: RoomWallData): void {
        let _local_4: Point;
        let _local_5: number;
        let _local_6: number;
        let _local_7: IVector3D;
        let _local_8: IVector3D;
        let _local_9: number;
        let _local_10: number;
        const _local_2: number = k.count;
        let _local_3 = 0;
        while (_local_3 < _local_2) {
            if (!k.getHideWall(_local_3)) {
                _local_4 = k.getCorner(_local_3);
                _local_5 = k.getDirection(_local_3);
                _local_6 = k.getLength(_local_3);
                _local_7 = RoomWallData.WALL_DIRECTION_VECTORS[_local_5];
                _local_8 = RoomWallData.WALL_NORMAL_VECTORS[_local_5];
                _local_9 = 0;
                _local_10 = 0;
                while (_local_10 < _local_6) {
                    if (
                        this.getTileHeightInternal(
                            _local_4.x + _local_10 * _local_7.x - _local_8.x,
                            _local_4.y + _local_10 * _local_7.y - _local_8.y,
                        ) == RoomPlaneParser.TILE_HOLE
                    ) {
                        if (_local_10 > 0 && _local_9 == 0) {
                            k.setLength(_local_3, _local_10);
                            break;
                        }
                        _local_9++;
                    } else if (_local_9 > 0) {
                        k.moveCorner(_local_3, _local_9);
                        break;
                    }
                    _local_10++;
                }
                if (_local_9 == _local_6) {
                    k.setHideWall(_local_3, true);
                }
            }
            _local_3++;
        }
    }

    private resolveOriginalWallIndex(k: Point, _arg_2: Point, _arg_3: RoomWallData): number {
        let _local_10: Point;
        let _local_11: Point;
        let _local_12: number;
        let _local_13: number;
        let _local_14: number;
        let _local_15: number;
        const _local_4: number = Math.min(k.y, _arg_2.y);
        const _local_5: number = Math.max(k.y, _arg_2.y);
        const _local_6: number = Math.min(k.x, _arg_2.x);
        const _local_7: number = Math.max(k.x, _arg_2.x);
        const _local_8: number = _arg_3.count;
        let _local_9 = 0;
        while (_local_9 < _local_8) {
            _local_10 = _arg_3.getCorner(_local_9);
            _local_11 = _arg_3.getEndPoint(_local_9);
            if (k.x == _arg_2.x) {
                if (_local_10.x == k.x && _local_11.x == k.x) {
                    _local_12 = Math.min(_local_10.y, _local_11.y);
                    _local_13 = Math.max(_local_10.y, _local_11.y);
                    if (_local_12 <= _local_4 && _local_5 <= _local_13) {
                        return _local_9;
                    }
                }
            } else if (k.y == _arg_2.y) {
                if (_local_10.y == k.y && _local_11.y == k.y) {
                    _local_14 = Math.min(_local_10.x, _local_11.x);
                    _local_15 = Math.max(_local_10.x, _local_11.x);
                    if (_local_14 <= _local_6 && _local_7 <= _local_15) {
                        return _local_9;
                    }
                }
            }
            _local_9++;
        }
        return -1;
    }

    private hideOriginallyHiddenWalls(k: RoomWallData, _arg_2: RoomWallData): void {
        let _local_5: Point;
        let _local_6: Point;
        let _local_7: IVector3D;
        let _local_8: number;
        let _local_9: number;
        const _local_3: number = k.count;
        let _local_4 = 0;
        while (_local_4 < _local_3) {
            if (!k.getHideWall(_local_4)) {
                _local_5 = k.getCorner(_local_4);
                _local_6 = new Point(_local_5.x, _local_5.y);
                _local_7 = RoomWallData.WALL_DIRECTION_VECTORS[k.getDirection(_local_4)];
                _local_8 = k.getLength(_local_4);
                _local_6.x = _local_6.x + _local_7.x * _local_8;
                _local_6.y = _local_6.y + _local_7.y * _local_8;
                _local_9 = this.resolveOriginalWallIndex(_local_5, _local_6, _arg_2);
                if (_local_9 >= 0) {
                    if (_arg_2.getHideWall(_local_9)) {
                        k.setHideWall(_local_4, true);
                    }
                } else {
                    k.setHideWall(_local_4, true);
                }
            }
            _local_4++;
        }
    }

    private checkWallHiding(k: RoomWallData, _arg_2: RoomWallData): void {
        this.hidePeninsulaWallChains(_arg_2);
        this.updateWallsNextToHoles(k);
        this.hideOriginallyHiddenWalls(k, _arg_2);
    }

    private addWalls(k: RoomWallData, _arg_2: RoomWallData): void {
        const _local_3 = k.count;
        const _local_4 = _arg_2.count;
        let _local_7 = 0;

        while (_local_7 < _local_3) {
            if (!k.getHideWall(_local_7)) {
                const _local_8 = k.getCorner(_local_7);
                const _local_9 = k.getDirection(_local_7);
                const _local_10 = k.getLength(_local_7);
                const _local_11 = RoomWallData.WALL_DIRECTION_VECTORS[_local_9];
                const _local_12 = RoomWallData.WALL_NORMAL_VECTORS[_local_9];
                let _local_13 = -1;
                let _local_14 = 0;

                while (_local_14 < _local_10) {
                    const _local_27 = this.getTileHeightInternal(
                        _local_8.x + _local_14 * _local_11.x + _local_12.x,
                        _local_8.y + _local_14 * _local_11.y + _local_12.y,
                    );

                    if (_local_27 >= 0 && (_local_27 < _local_13 || _local_13 < 0)) {
                        _local_13 = _local_27;
                    }

                    _local_14++;
                }

                const _local_15 = _local_13;

                let loc = new Vector3d(_local_8.x, _local_8.y, _local_15);
                loc = Vector3d.sum(loc, Vector3d.product(_local_12, 0.5));
                loc = Vector3d.sum(loc, Vector3d.product(_local_11, -0.5));

                const _local_17 =
                    this.wallHeight +
                    Math.min(RoomPlaneParser.MAX_WALL_ADDITIONAL_HEIGHT, this.floorHeight) -
                    _local_13;
                const leftSideLoc = Vector3d.product(_local_11, -_local_10);
                const rightSideLoc = new Vector3d(0, 0, _local_17);

                loc = Vector3d.dif(loc, leftSideLoc);

                const _local_20 = this.resolveOriginalWallIndex(_local_8, k.getEndPoint(_local_7), _arg_2);

                let _local_5 = 0;
                let _local_6 = 0;

                if (_local_20 >= 0) {
                    _local_5 = _arg_2.getDirection((_local_20 + 1) % _local_4);
                    _local_6 = _arg_2.getDirection((_local_20 - 1 + _local_4) % _local_4);
                } else {
                    _local_5 = k.getDirection((_local_7 + 1) % _local_3);
                    _local_6 = k.getDirection((_local_7 - 1 + _local_3) % _local_3);
                }

                let secondaryNormal: IVector3D | undefined = undefined;

                if ((_local_5 - _local_9 + 4) % 4 == 3) {
                    secondaryNormal = RoomWallData.WALL_NORMAL_VECTORS[_local_5];
                } else if ((_local_9 - _local_6 + 4) % 4 == 3) {
                    secondaryNormal = RoomWallData.WALL_NORMAL_VECTORS[_local_6];
                }

                this.addWall(
                    loc,
                    leftSideLoc,
                    rightSideLoc,
                    secondaryNormal!,
                    !k.getLeftTurn((_local_7 - 1 + _local_3) % _local_3) || k.getManuallyLeftCut(_local_7),
                    !k.getLeftTurn(_local_7) || k.getManuallyRightCut(_local_7),
                    !k.getHideWall((_local_7 + 1) % _local_3),
                );
            }

            _local_7++;
        }
    }

    private createWallPlanes(): boolean {
        let _local_13: number;
        let _local_14: number;

        const tileMatrix = this._tileMatrix;
        const _local_5: number = tileMatrix.length;

        let _local_6 = 0;

        if (_local_5 == 0) return false;

        let _local_2 = 0;

        while (_local_2 < _local_5) {
            const _local_4 = tileMatrix[_local_2];

            if (_local_4 == null || _local_4.length == 0) return false;

            if (_local_6 > 0) {
                _local_6 = Math.min(_local_6, _local_4.length);
            } else {
                _local_6 = _local_4.length;
            }

            _local_2++;
        }

        const _local_7 = Math.min(
            RoomPlaneParser.MAX_WALL_ADDITIONAL_HEIGHT,
            this._fixedWallHeight != -1 ? this._fixedWallHeight : RoomPlaneParser.getFloorHeight(tileMatrix),
        );

        const minX: number = this.minX;

        let minY: number = this.minY;

        while (minY <= this.maxY) {
            if (this.getTileHeightInternal(minX, minY) > RoomPlaneParser.TILE_HOLE) {
                minY--;

                break;
            }

            minY++;
        }

        if (minY > this.maxY) return false;

        const _local_10 = new Point(minX, minY);
        const _local_11 = this.generateWallData(_local_10, true);
        const _local_12 = this.generateWallData(_local_10, false);

        if (_local_11 && _local_12) {
            _local_13 = _local_11.count;
            _local_14 = _local_12.count;
            this.checkWallHiding(_local_11, _local_12);
            this.addWalls(_local_11, _local_12);
        }

        let _local_3 = 0;

        while (_local_3 < this.tileMapHeight) {
            let _local_2 = 0;

            while (_local_2 < this.tileMapWidth) {
                if (this.getTileHeightInternal(_local_2, _local_3) < 0) {
                    this.setTileHeight(_local_2, _local_3, -(_local_7 + this.wallHeight));
                }

                _local_2++;
            }

            _local_3++;
        }
        return true;
    }

    private extractTopWall(k: Point, _arg_2: boolean): Point | undefined {
        if (k) {
            let width = 1;

            const height = !_arg_2 ? RoomPlaneParser.TILE_BLOCKED : RoomPlaneParser.TILE_HOLE;

            while (width < 1000) {
                if (this.getTileHeightInternal(k.x + width, k.y) > height) return new Point(k.x + width - 1, k.y);
                if (this.getTileHeightInternal(k.x + width, k.y + 1) <= height) return new Point(k.x + width, k.y + 1);

                width++;
            }
        }

        return undefined;
    }

    private extractRightWall(k: Point, _arg_2: boolean): Point | undefined {
        if (k) {
            let width = 1;

            const height = !_arg_2 ? RoomPlaneParser.TILE_BLOCKED : RoomPlaneParser.TILE_HOLE;

            while (width < 1000) {
                if (this.getTileHeightInternal(k.x, k.y + width) > height) return new Point(k.x, k.y + (width - 1));
                if (this.getTileHeightInternal(k.x - 1, k.y + width) <= height) return new Point(k.x - 1, k.y + width);

                width++;
            }
        }

        return undefined;
    }

    private extractBottomWall(k: Point, _arg_2: boolean): Point | undefined {
        if (k) {
            let width = 1;

            const height = !_arg_2 ? RoomPlaneParser.TILE_BLOCKED : RoomPlaneParser.TILE_HOLE;

            while (width < 1000) {
                if (this.getTileHeightInternal(k.x - width, k.y) > height) return new Point(k.x - (width - 1), k.y);
                if (this.getTileHeightInternal(k.x - width, k.y - 1) <= height) return new Point(k.x - width, k.y - 1);

                width++;
            }
        }

        return undefined;
    }

    private extractLeftWall(k: Point, _arg_2: boolean): Point | undefined {
        if (k) {
            let width = 1;

            const height = !_arg_2 ? RoomPlaneParser.TILE_BLOCKED : RoomPlaneParser.TILE_HOLE;

            while (width < 1000) {
                if (this.getTileHeightInternal(k.x, k.y - width) > height) return new Point(k.x, k.y - (width - 1));
                if (this.getTileHeightInternal(k.x + 1, k.y - width) <= height) return new Point(k.x + 1, k.y - width);

                width++;
            }
        }
        return undefined;
    }

    private addWall(
        loc: IVector3D,
        leftSideLoc: IVector3D,
        rightSideLoc: IVector3D,
        secondaryNormal: IVector3D,
        _arg_5: boolean,
        _arg_6: boolean,
        _arg_7: boolean,
    ): void {
        this.addPlane(RoomPlaneData.PLANE_WALL, loc, leftSideLoc, rightSideLoc, [secondaryNormal]);

        this.addPlane(RoomPlaneData.PLANE_LANDSCAPE, loc, leftSideLoc, rightSideLoc, [secondaryNormal]);

        const wallThickness = RoomPlaneParser.WALL_THICKNESS * this._wallThicknessMultiplier;
        const floorThickness = RoomPlaneParser.FLOOR_THICKNESS * this._floorThicknessMultiplier;
        const normal = Vector3d.crossProduct(leftSideLoc, rightSideLoc);
        const planeRightSideLoc = Vector3d.product(normal, (1 / normal.length) * -wallThickness);

        this.addPlane(RoomPlaneData.PLANE_WALL, Vector3d.sum(loc, rightSideLoc), leftSideLoc, planeRightSideLoc, [
            normal,
            secondaryNormal,
        ]);

        if (_arg_5)
            this.addPlane(
                RoomPlaneData.PLANE_WALL,
                Vector3d.sum(Vector3d.sum(loc, leftSideLoc), rightSideLoc),
                Vector3d.product(rightSideLoc, -(rightSideLoc.length + floorThickness) / rightSideLoc.length),
                planeRightSideLoc,
                [normal, secondaryNormal],
            );

        if (_arg_6) {
            this.addPlane(
                RoomPlaneData.PLANE_WALL,
                Vector3d.sum(loc, Vector3d.product(rightSideLoc, -floorThickness / rightSideLoc.length)),
                Vector3d.product(rightSideLoc, (rightSideLoc.length + floorThickness) / rightSideLoc.length),
                planeRightSideLoc,
                [normal, secondaryNormal],
            );

            if (_arg_7) {
                const _local_12 = Vector3d.product(leftSideLoc, wallThickness / leftSideLoc.length);
                this.addPlane(
                    RoomPlaneData.PLANE_WALL,
                    Vector3d.sum(Vector3d.sum(loc, rightSideLoc), Vector3d.product(_local_12, -1)),
                    _local_12,
                    planeRightSideLoc,
                    [normal, leftSideLoc, secondaryNormal],
                );
            }
        }
    }

    private addFloor(
        loc: IVector3D,
        leftSideLoc: IVector3D,
        rightSideLoc: IVector3D,
        _arg_4: boolean,
        _arg_5: boolean,
        _arg_6: boolean,
        _arg_7: boolean,
        highlight: boolean = false,
    ): void {
        const plane = this.addPlane(RoomPlaneData.PLANE_FLOOR, loc, leftSideLoc, rightSideLoc, [], highlight);

        if (plane) {
            const floorThickness = RoomPlaneParser.FLOOR_THICKNESS * this._floorThicknessMultiplier;

            const planeRightSideLoc = new Vector3d(0, 0, floorThickness);
            const planeLoc = Vector3d.dif(loc, planeRightSideLoc);

            if (_arg_6)
                this.addPlane(RoomPlaneData.PLANE_FLOOR, planeLoc, leftSideLoc, planeRightSideLoc, [], highlight);

            if (_arg_7)
                this.addPlane(
                    RoomPlaneData.PLANE_FLOOR,
                    Vector3d.sum(planeLoc, Vector3d.sum(leftSideLoc, rightSideLoc)),
                    Vector3d.product(leftSideLoc, -1),
                    planeRightSideLoc,
                    [],
                    highlight,
                );

            if (_arg_4)
                this.addPlane(
                    RoomPlaneData.PLANE_FLOOR,
                    Vector3d.sum(planeLoc, rightSideLoc),
                    Vector3d.product(rightSideLoc, -1),
                    planeRightSideLoc,
                    [],
                    highlight,
                );

            if (_arg_5)
                this.addPlane(
                    RoomPlaneData.PLANE_FLOOR,
                    Vector3d.sum(planeLoc, leftSideLoc),
                    rightSideLoc,
                    planeRightSideLoc,
                    [],
                    highlight,
                );
        }
    }

    private addPlane(
        type: number,
        loc: IVector3D,
        leftSideLoc: IVector3D,
        rightSideLoc: IVector3D,
        secondaryNormals: IVector3D[],
        highlight: boolean = false,
    ): RoomPlaneData | undefined {
        if (leftSideLoc.length > 0 && rightSideLoc.length > 0) {
            const plane: RoomPlaneData = new RoomPlaneData(type, loc, leftSideLoc, rightSideLoc, secondaryNormals);

            this._planes.push(plane);

            if (highlight) this._highlights.push(plane);

            return plane;
        }

        return undefined;
    }

    private initializeHoleMap(): void {
        let k: number;
        let _local_2: number;
        let _local_3: boolean[];
        _local_2 = 0;
        while (_local_2 < this._height) {
            _local_3 = this._floorHoleMatrix[_local_2];
            k = 0;
            while (k < this._width) {
                _local_3[k] = this._floorHolesInverted.size > 0;
                k++;
            }
            _local_2++;
        }
        for (const _local_4 of this._floorHolesInverted.values()) {
            this.initializeHole(_local_4, true);
        }
        for (const _local_4 of this._floorHoles.values()) {
            this.initializeHole(_local_4);
        }
    }

    private initializeHole(param1: RoomFloorHole, param2: boolean = false): void {
        let k: number;
        let _local_2: number;
        let _local_3: boolean[];
        let _local_6: number;
        let _local_7: number;
        let _local_8: number;
        let _local_9: number;
        const _local_5: RoomFloorHole = param1;
        if (_local_5 != null) {
            _local_6 = _local_5.x;
            _local_7 = _local_5.x + _local_5.width - 1;
            _local_8 = _local_5.y;
            _local_9 = _local_5.y + _local_5.height - 1;
            _local_6 = _local_6 < 0 ? 0 : _local_6;
            _local_7 = _local_7 >= this._width ? this._width - 1 : _local_7;
            _local_8 = _local_8 < 0 ? 0 : _local_8;
            _local_9 = _local_9 >= this._height ? this._height - 1 : _local_9;
            _local_2 = _local_8;
            while (_local_2 <= _local_9) {
                _local_3 = this._floorHoleMatrix[_local_2];
                k = _local_6;
                while (k <= _local_7) {
                    _local_3[k] = !param2;
                    k++;
                }
                _local_2++;
            }
        }
    }

    private extractPlanes(
        param1: number[][],
        param2: number = 0,
        param3: number = 0,
        param4: number = -1,
        param5: number = -1,
        param6: boolean = false,
    ): void {
        let _loc13_ = 0;
        let _loc24_ = 0;
        let _loc25_ = 0;
        let _loc9_ = 0;
        let _loc19_ = 0;
        let _loc16_ = 0;
        let _loc10_ = false;
        let _loc8_ = false;
        let _loc20_ = false;
        let _loc12_ = false;
        let _loc21_ = 0;
        let _loc23_ = 0;
        let _loc11_ = false;
        let _loc15_ = NaN;
        let _loc17_ = NaN;
        let _loc18_ = NaN;
        let _loc28_ = NaN;
        const _loc14_: number = param1.length;
        const _loc26_: number = param1[0].length;
        const _loc27_: number = param5 == -1 ? _loc14_ : Math.min(_loc14_, param3 + param5);
        const _loc22_: number = param4 == -1 ? _loc26_ : Math.min(_loc26_, param2 + param4);
        const _loc7_: boolean[][] = [];
        _loc13_ = 0;
        while (_loc13_ < _loc27_) {
            _loc7_[_loc13_] = [];
            _loc13_++;
        }
        _loc24_ = param3;
        while (_loc24_ < _loc27_) {
            _loc25_ = param2;
            while (_loc25_ < _loc22_) {
                if (!((_loc9_ = param1[_loc24_][_loc25_]) < 0 || _loc7_[_loc24_][_loc25_])) {
                    _loc10_ = _loc25_ == 0 || param1[_loc24_][_loc25_ - 1] != _loc9_;
                    _loc8_ = _loc24_ == 0 || param1[_loc24_ - 1][_loc25_] != _loc9_;
                    _loc19_ = _loc25_ + 1;
                    while (_loc19_ < _loc22_) {
                        if (
                            param1[_loc24_][_loc19_] != _loc9_ ||
                            _loc7_[_loc24_][_loc19_] ||
                            (_loc24_ > 0 && (param1[_loc24_ - 1][_loc19_] == _loc9_) == _loc8_)
                        ) {
                            break;
                        }
                        _loc19_++;
                    }
                    _loc20_ = _loc19_ == _loc26_ || param1[_loc24_][_loc19_] != _loc9_;
                    _loc11_ = false;
                    _loc16_ = _loc24_ + 1;
                    while (_loc16_ <= _loc27_ && !_loc11_) {
                        _loc12_ = _loc16_ == _loc14_ || param1[_loc16_][_loc25_] != _loc9_;
                        _loc11_ =
                            _loc16_ == _loc27_ ||
                            _loc12_ ||
                            (_loc25_ > 0 && (param1[_loc16_][_loc25_ - 1] == _loc9_) == _loc10_) ||
                            (_loc19_ < _loc26_ && (param1[_loc16_][_loc19_] == _loc9_) == _loc20_);
                        if (_loc16_ == _loc14_) {
                            break;
                        }
                        _loc21_ = _loc25_;
                        while (_loc21_ < _loc19_) {
                            if ((param1[_loc16_][_loc21_] == _loc9_) == _loc12_) {
                                _loc11_ = true;
                                _loc19_ = _loc21_;
                                break;
                            }
                            _loc21_++;
                        }
                        if (_loc11_) {
                            break;
                        }
                        _loc16_++;
                    }
                    if (!_loc12_) {
                        _loc12_ = _loc16_ == _loc14_;
                    }
                    _loc20_ = _loc19_ == _loc26_ || param1[_loc24_][_loc19_] != _loc9_;
                    _loc23_ = _loc24_;
                    while (_loc23_ < _loc16_) {
                        _loc21_ = _loc25_;
                        while (_loc21_ < _loc19_) {
                            _loc7_[_loc23_][_loc21_] = true;
                            _loc21_++;
                        }
                        _loc23_++;
                    }
                    _loc15_ = _loc25_ / 4 - 0.5;
                    _loc17_ = _loc24_ / 4 - 0.5;
                    _loc18_ = (_loc19_ - _loc25_) / 4;
                    _loc28_ = (_loc16_ - _loc24_) / 4;
                    this.addFloor(
                        new Vector3d(_loc15_ + _loc18_, _loc17_ + _loc28_, _loc9_ / 4),
                        new Vector3d(-_loc18_, 0, 0),
                        new Vector3d(0, -_loc28_, 0),
                        _loc20_,
                        _loc10_,
                        _loc12_,
                        _loc8_,
                        param6,
                    );
                }
                _loc25_++;
            }
            _loc24_++;
        }
    }

    public get minX(): number {
        return this._minX;
    }

    private _maxX: number = 0;

    public get maxX(): number {
        return this._maxX;
    }

    private _minY: number = 0;

    public get minY(): number {
        return this._minY;
    }

    private _maxY: number = 0;

    public get maxY(): number {
        return this._maxY;
    }

    private _wallHeight: number;

    public get wallHeight(): number {
        if (this._fixedWallHeight != -1) {
            return this._fixedWallHeight + 3.6;
        }
        return this._wallHeight;
    }

    public set wallHeight(k: number) {
        if (k < 0) {
            k = 0;
        }
        this._wallHeight = k;
    }

    private _wallThicknessMultiplier: number;

    public get wallThicknessMultiplier(): number {
        return this._wallThicknessMultiplier;
    }

    public set wallThicknessMultiplier(k: number) {
        if (k < 0) {
            k = 0;
        }
        this._wallThicknessMultiplier = k;
    }

    private _floorThicknessMultiplier: number;

    public get floorThicknessMultiplier(): number {
        return this._floorThicknessMultiplier;
    }

    public set floorThicknessMultiplier(k: number) {
        if (k < 0) {
            k = 0;
        }
        this._floorThicknessMultiplier = k;
    }

    private _floorHeight: number = 0;

    public get floorHeight(): number {
        if (this._fixedWallHeight != -1) {
            return this._fixedWallHeight;
        }
        return this._floorHeight;
    }

    private _restrictsDragging: boolean;

    public get restrictsDragging(): boolean {
        return this._restrictsDragging;
    }

    public set restrictsDragging(flag: boolean) {
        this._restrictsDragging = flag;
    }

    private _restrictsScaling: boolean = false;

    public get restrictsScaling(): boolean {
        return this._restrictsScaling;
    }

    public set restrictsScaling(flag: boolean) {
        this._restrictsScaling = flag;
    }

    private _restrictedScale: number = 1;

    public get restrictedScale(): number {
        return this._restrictedScale;
    }

    public set restrictedScale(scale: number) {
        this._restrictedScale = scale;
    }

    public get tileMapWidth(): number {
        return this._width;
    }

    public get tileMapHeight(): number {
        return this._height;
    }

    public get planeCount(): number {
        return this._planes.length;
    }

    private static getFloorHeight(matricies: number[][]): number {
        const length = matricies.length;

        if (!length) return 0;

        let tileHeight = 0;

        let i = 0;

        while (i < length) {
            const matrix = matricies[i];

            let j = 0;

            while (j < matrix.length) {
                const height = matrix[j];

                if (height > tileHeight) tileHeight = height;

                j++;
            }

            i++;
        }

        return tileHeight;
    }

    private static findEntranceTile(matricies: number[][]): Point | undefined {
        if (!matricies) return undefined;

        const length = matricies.length;

        if (!length) return undefined;

        const _local_6: number[] = [];

        let i = 0;

        while (i < length) {
            const matrix = matricies[i];

            if (!matrix || !matrix.length) return undefined;

            let j = 0;

            while (j < matrix.length) {
                if (matrix[j] >= 0) {
                    _local_6.push(j);

                    break;
                }

                j++;
            }

            if (_local_6.length < i + 1) _local_6.push(matrix.length + 1);

            i++;
        }

        i = 1;

        while (i < _local_6.length - 1) {
            if (
                Math.trunc(_local_6[i]) <= Math.trunc(_local_6[i - 1]) - 1 &&
                Math.trunc(_local_6[i]) <= Math.trunc(_local_6[i + 1]) - 1
            )
                return new Point(Math.trunc(_local_6[i] | 0), i);

            i++;
        }

        return undefined;
    }

    private static expandFloorTiles(k: number[][]): number[][] {
        if (!k || !k.length) return [];

        const _local_2 = k.length;
        const _local_3: number = k[0].length;
        const _local_4: number[][] = [];

        let _local_6 = 0;

        while (_local_6 < _local_2 * 4) {
            _local_4[_local_6] = [];
            _local_6++;
        }

        let _local_9 = 0;

        _local_6 = 0;

        while (_local_6 < _local_2) {
            let _local_10 = 0;
            let _local_5 = 0;

            while (_local_5 < _local_3) {
                const _local_11 = k[_local_6][_local_5];

                if (_local_11 < 0 || _local_11 <= 0xff) {
                    let _local_8 = 0;

                    while (_local_8 < 4) {
                        let _local_7 = 0;

                        while (_local_7 < 4) {
                            if (_local_4[_local_9 + _local_8] === undefined) _local_4[_local_9 + _local_8] = [];

                            _local_4[_local_9 + _local_8][_local_10 + _local_7] =
                                _local_11 < 0 ? _local_11 : _local_11 * 4;

                            _local_7++;
                        }

                        _local_8++;
                    }
                } else {
                    const _local_12 = (_local_11 & 0xff) * 4;
                    const _local_13 = _local_12 + ((_local_11 >> 11) & 0x01) * 3;
                    const _local_14 = _local_12 + ((_local_11 >> 10) & 0x01) * 3;
                    const _local_15 = _local_12 + ((_local_11 >> 9) & 0x01) * 3;
                    const _local_16 = _local_12 + ((_local_11 >> 8) & 0x01) * 3;

                    let _local_7 = 0;

                    while (_local_7 < 3) {
                        const _local_17 = _local_7 + 1;

                        _local_4[_local_9][_local_10 + _local_7] =
                            (_local_13 * (3 - _local_7) + _local_14 * _local_7) / 3;
                        _local_4[_local_9 + 3][_local_10 + _local_17] =
                            (_local_15 * (3 - _local_17) + _local_16 * _local_17) / 3;
                        _local_4[_local_9 + _local_17][_local_10] =
                            (_local_13 * (3 - _local_17) + _local_15 * _local_17) / 3;
                        _local_4[_local_9 + _local_7][_local_10 + 3] =
                            (_local_14 * (3 - _local_7) + _local_16 * _local_7) / 3;
                        _local_7++;
                    }

                    _local_4[_local_9 + 1][_local_10 + 1] = _local_13 > _local_12 ? _local_12 + 2 : _local_12 + 1;
                    _local_4[_local_9 + 1][_local_10 + 2] = _local_14 > _local_12 ? _local_12 + 2 : _local_12 + 1;
                    _local_4[_local_9 + 2][_local_10 + 1] = _local_15 > _local_12 ? _local_12 + 2 : _local_12 + 1;
                    _local_4[_local_9 + 2][_local_10 + 2] = _local_16 > _local_12 ? _local_12 + 2 : _local_12 + 1;
                }
                _local_10 = _local_10 + 4;
                _local_5++;
            }
            _local_9 = _local_9 + 4;
            _local_6++;
        }
        return _local_4;
    }

    private static addTileTypes(k: number[][]): void {
        if (!k || !k.length) return;

        const width: number = k.length - 1;
        const height: number = k[0].length - 1;

        let x = 1;

        while (x < width) {
            let y = 1;

            while (y < height) {
                const _local_6 = k[x][y];

                if (_local_6 < 0) {
                    //
                } else {
                    const _local_7 = k[x - 1][y - 1] & 0xff;
                    const _local_8 = k[x - 1][y] & 0xff;
                    const _local_9 = k[x - 1][y + 1] & 0xff;
                    const _local_10 = k[x][y - 1] & 0xff;
                    const _local_11 = k[x][y + 1] & 0xff;
                    const _local_12 = k[x + 1][y - 1] & 0xff;
                    const _local_13 = k[x + 1][y] & 0xff;
                    const _local_14 = k[x + 1][y + 1] & 0xff;
                    const _local_15 = _local_6 + 1;
                    const _local_16 = _local_6 - 1;

                    let _local_17 =
                        (_local_7 == _local_15 || _local_8 == _local_15 || _local_10 == _local_15 ? 8 : 0) |
                        (_local_9 == _local_15 || _local_8 == _local_15 || _local_11 == _local_15 ? 4 : 0) |
                        (_local_12 == _local_15 || _local_13 == _local_15 || _local_10 == _local_15 ? 2 : 0) |
                        (_local_14 == _local_15 || _local_13 == _local_15 || _local_11 == _local_15 ? 1 : 0);

                    if (_local_17 == 15) _local_17 = 0;

                    k[x][y] = _local_6 | (_local_17 << 8);
                }
                y++;
            }
            x++;
        }
    }

    private static unpadHeightMap(k: number[][]): void {
        k.shift();
        k.pop();

        for (const _local_2 of k) {
            _local_2.shift();
            _local_2.pop();
        }
    }

    private static padHeightMap(k: number[][]): void {
        if (!k || !k.length) return;

        const _local_2: number[] = [];
        const _local_3: number[] = [];

        for (const _local_4 of k) {
            _local_4.push(RoomPlaneParser.TILE_BLOCKED);
            _local_4.unshift(RoomPlaneParser.TILE_BLOCKED);
        }

        for (const _local_5 of k[0]) {
            _local_2.push(RoomPlaneParser.TILE_BLOCKED);
            _local_3.push(RoomPlaneParser.TILE_BLOCKED);
        }

        k.push(_local_3);
        k.unshift(_local_2);
    }
}
