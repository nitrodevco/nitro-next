import {
    AlphaTolerance, IObjectVisualizationData,
    IPlaneVisualization,
    IRoomGeometry,
    IRoomObjectModel,
    IRoomObjectSprite,
    IRoomPlane,
    IVector3D,
    RoomGeometryScaleType,
    RoomObjectSpriteTypeEnum, RoomObjectVariableEnum, ToInt32, Vector3d } from '@nitrodevco/nitro-api';
import { Filter, Rectangle, Texture } from 'pixi.js';

import { RoomMapData } from '../../RoomMapData';
import { RoomMapMaskData } from '../../RoomMapMaskData';
import { RoomPlaneBitmapMaskData } from '../../RoomPlaneBitmapMaskData';
import { RoomPlaneData } from '../../RoomPlaneData';
import { RoomPlaneParser } from '../../RoomPlaneParser';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { PlaneTextureCache } from './PlaneTextureCache';
import { RoomPlane } from './RoomPlane';
import { RoomVisualizationData } from './RoomVisualizationData';

export class RoomVisualization extends RoomObjectSpriteVisualization implements IPlaneVisualization {
    private static readonly NO_FILTERS: Filter[] = [];
    private static FLOOR_COLOR: number = 0xffffff as const;
    private static FLOOR_COLOR_LEFT: number = 0xdddddd as const;
    private static FLOOR_COLOR_RIGHT: number = 0xbbbbbb as const;
    private static WALL_COLOR_TOP: number = 0xffffff as const;
    private static WALL_COLOR_SIDE: number = 0xcccccc as const;
    private static WALL_COLOR_BOTTOM: number = 0x999999 as const;
    private static WALL_COLOR_BORDER: number = 0x999999 as const;
    private static LANDSCAPE_COLOR_TOP: number = 0xffffff as const;
    private static LANDSCAPE_COLOR_SIDE: number = 0xcccccc as const;
    private static LANDSCAPE_COLOR_BOTTOM: number = 0x999999 as const;
    private static ROOM_DEPTH_OFFSET: number = 1000 as const;

    protected _data: RoomVisualizationData | undefined = undefined;

    private _roomPlaneParser: RoomPlaneParser = new RoomPlaneParser();
    private _geometryUpdateId: number = -1;
    private _boundingRectangle: Rectangle | undefined = undefined;
    private _directionX: number = 0;
    private _directionY: number = 0;
    private _directionZ: number = 0;
    private _floorThickness: number = NaN;
    private _wallThickness: number = NaN;
    private _holeUpdateTime: number = NaN;
    private _planes: RoomPlane[] = [];
    /** The parser plane each of `_planes` was made from: a long floor plane can be several. */
    private _planeParserIndexes: number[] = [];
    /** How many of the parser's planes have been made into `_planes`. */
    private _parserPlanesCreated = 0;
    /** Finished textures the room's small floor planes share (`PlaneTextureCache`). */
    private _planeTextureCache: PlaneTextureCache = new PlaneTextureCache();
    private _visiblePlanes: RoomPlane[] = [];
    private _visiblePlaneSpriteNumbers: number[] = [];
    private _roomScale: RoomGeometryScaleType = RoomGeometryScaleType.None;
    private _color: number = 0xffffff;
    private _backgroundRed: number = 0xff;
    private _backgroundGreen: number = 0xff;
    private _backgroundBlue: number = 0xff;
    private _wallType: string | undefined = undefined;
    private _floorType: string | undefined = undefined;
    private _landscapeType: string | undefined = undefined;
    private _typeVisibility: boolean[] = [];
    private _assetUpdateCounter: number = 0;
    private _maskData: RoomMapMaskData | undefined = undefined;
    private _isPlaneSet: boolean = false;

    private _highlightAreaX: number = 0;
    private _highlightAreaY: number = 0;
    private _highlightAreaWidth: number = 0;
    private _highlightAreaHeight: number = 0;
    private _highlightFilter: Filter | undefined = undefined;
    private _highlightPlaneOffsets: number[] = [];

    constructor() {
        super();

        this._typeVisibility[RoomPlane.TYPE_UNDEFINED] = false;
        this._typeVisibility[RoomPlane.TYPE_FLOOR] = true;
        this._typeVisibility[RoomPlane.TYPE_WALL] = true;
        this._typeVisibility[RoomPlane.TYPE_LANDSCAPE] = true;
    }

    public override initialize(data: IObjectVisualizationData): boolean {
        if (!(data instanceof RoomVisualizationData)) return false;

        this._data = data;

        super.initialize(data);

        if (this.asset) this._data.setGraphicAssetCollection(this.asset);

        return true;
    }

    public override dispose(): void {
        super.dispose();

        this.clearPlanes();

        this._planes = [];
        this._visiblePlanes = [];
        this._visiblePlaneSpriteNumbers = [];
        this._highlightPlaneOffsets = [];

        if (this._roomPlaneParser) {
            this._roomPlaneParser.dispose();

            this._roomPlaneParser = undefined!;
        }

        if (this._data) {
            this._data.clearCache();

            this._data = undefined!;
        }
    }

    protected override reset(): void {
        super.reset();

        this._floorType = undefined;
        this._wallType = undefined;
        this._landscapeType = undefined;
        this._maskData = undefined;
        this._geometryUpdateId = -1;
        this._roomScale = RoomGeometryScaleType.None;
    }

    public override update(geometry: IRoomGeometry, time: number, _update: boolean, _skipUpdate: boolean): void {
        if (!this.object || !geometry) return;

        const geometryUpdate = this.updateGeometry(geometry);
        const objectModel = this.object.model;

        let needsUpdate = geometryUpdate;

        if (this.updateThickness(objectModel)) needsUpdate = true;

        if (this.updateHole(objectModel)) needsUpdate = true;

        this.initializeRoomPlanes();

        if (this.updateMasksAndColors(objectModel)) needsUpdate = true;

        if (this.updatePlaneTexturesAndVisibilities(objectModel)) needsUpdate = true;

        if (this.updatePlanes(geometry, geometryUpdate, time)) needsUpdate = true;

        if (needsUpdate) {
            let index = 0;

            while (index < this._visiblePlanes.length) {
                const spriteIndex = this._visiblePlaneSpriteNumbers[index];
                const sprite = this.getSprite(spriteIndex);
                const plane = this._visiblePlanes[index];

                // Every plane but the landscape takes the background colour, channel by channel.
                // It is white unless a background-only colour is set (`RoomLogic.updateColors`).
                if (sprite && plane && plane.type !== RoomPlane.TYPE_LANDSCAPE) {
                    const color = plane.color;
                    const blue = ((color & 0xff) * this._backgroundBlue) / 0xff;
                    const green = (((color >> 8) & 0xff) * this._backgroundGreen) / 0xff;
                    const red = (((color >> 16) & 0xff) * this._backgroundRed) / 0xff;
                    const alpha = color >> 24;

                    // `uint(...)`: the sum truncated and read unsigned.
                    sprite.texture = plane.getColoredTexture(Math.trunc((alpha << 24) + (red << 16) + (green << 8) + blue) >>> 0) ?? Texture.EMPTY;
                    sprite.color = 0xFFFFFF;
                }

                index++;
            }
        }

        this.updateSpriteCounter++;

        this.updateModelCounter = objectModel.updateCounter;
    }

    private updateGeometry(geometry: IRoomGeometry): boolean {
        if (!geometry) return false;

        if (this._geometryUpdateId === geometry.updateId) return false;

        this._geometryUpdateId = geometry.updateId;
        this._boundingRectangle = undefined;

        const direction = geometry.direction;

        if (
            direction
            && (direction.x !== this._directionX
                || direction.y !== this._directionY
                || direction.z !== this._directionZ
                || geometry.scale !== this._roomScale)
        ) {
            this._directionX = direction.x;
            this._directionY = direction.y;
            this._directionZ = direction.z;
            this._roomScale = geometry.scale;

            return true;
        }

        return false;
    }

    private updateThickness(model: IRoomObjectModel): boolean {
        if (this.updateModelCounter === model.updateCounter) return false;

        const floorThickness = model.getValue<number>(RoomObjectVariableEnum.RoomFloorThickness);
        const wallThickness = model.getValue<number>(RoomObjectVariableEnum.RoomWallThickness);

        // Flash `updatePlaneThicknesses` tests the values the model now holds, not the ones kept: kept
        // ones start NaN, so testing those left every room at the thickness it was built with.
        if (!isNaN(floorThickness) && !isNaN(wallThickness) && (floorThickness !== this._floorThickness || wallThickness !== this._wallThickness)) {
            this._floorThickness = floorThickness;
            this._wallThickness = wallThickness;

            this.clearPlanes();

            return true;
        }

        return false;
    }

    private updateHole(model: IRoomObjectModel): boolean {
        if (this.updateModelCounter === model.updateCounter) return false;

        const holeUpdate = model.getValue<number>(RoomObjectVariableEnum.RoomFloorHoleUpdateTime);

        if (!isNaN(holeUpdate) && holeUpdate !== this._holeUpdateTime) {
            this._holeUpdateTime = holeUpdate;

            this.clearPlanes();

            return true;
        }

        return false;
    }

    private updatePlaneTexturesAndVisibilities(model: IRoomObjectModel): boolean {
        if (this.updateModelCounter === model.updateCounter) return false;

        const floorType = model.getValue<string>(RoomObjectVariableEnum.RoomFloorType);
        const wallType = model.getValue<string>(RoomObjectVariableEnum.RoomWallType);
        const landscapeType = model.getValue<string>(RoomObjectVariableEnum.RoomLandscapeType);

        const floorVisibility = model.getValue<number>(RoomObjectVariableEnum.RoomFloorVisibility) === 1;
        const wallVisibility = model.getValue<number>(RoomObjectVariableEnum.RoomWallVisibility) === 1;
        const landscapeVisibility = model.getValue<number>(RoomObjectVariableEnum.RoomLandscapeVisibility) === 1;

        let result = false;

        result = this.updatePlaneTypes(floorType, wallType, landscapeType);

        result = this.updatePlaneVisibility(floorVisibility, wallVisibility, landscapeVisibility) ? true : result;

        return result;
    }

    private updateMasksAndColors(model: IRoomObjectModel): boolean {
        if (this.updateModelCounter === model.updateCounter) return false;

        let didUpdate = false;

        const planeMask = model.getValue<RoomMapMaskData>(RoomObjectVariableEnum.RoomPlaneMaskData);

        if (planeMask !== this._maskData) {
            this.updatePlaneMasks(planeMask);

            this._maskData = planeMask;

            didUpdate = true;
        }

        const backgroundColor = model.getValue<number>(RoomObjectVariableEnum.RoomBackgroundColor);

        if (backgroundColor !== this._color) {
            this._color = backgroundColor;
            this._backgroundBlue = this._color & 0xff;
            this._backgroundGreen = (this._color >> 8) & 0xff;
            this._backgroundRed = (this._color >> 16) & 0xff;

            didUpdate = true;
        }

        return didUpdate;
    }

    private clearPlanes(): void {
        if (this._planes) {
            while (this._planes.length) {
                const plane = this._planes[0];

                if (plane) plane.dispose();

                this._planes.shift();
            }

            this._planes = [];
            this._highlightPlaneOffsets = [];
        }

        this._planeParserIndexes = [];
        this._parserPlanesCreated = 0;
        this._planeTextureCache.dispose();

        this._isPlaneSet = false;
        this._assetUpdateCounter = this._assetUpdateCounter + 1;

        this.reset();
    }

    protected initializeRoomPlanes(): void {
        if (!this.object || this._isPlaneSet) return;

        if (!isNaN(this._floorThickness)) this._roomPlaneParser.floorThicknessMultiplier = this._floorThickness;
        if (!isNaN(this._wallThickness)) this._roomPlaneParser.wallThicknessMultiplier = this._wallThickness;

        this._roomPlaneParser.clearHighlightArea();

        const mapData = this.object.model.getValue<RoomMapData>(RoomObjectVariableEnum.RoomMapData);

        if (!this._roomPlaneParser.initializeFromMapData(mapData)) return;

        this._roomPlaneParser.initializeHighlightArea(
            this._highlightAreaX,
            this._highlightAreaY,
            this._highlightAreaWidth,
            this._highlightAreaHeight,
        );

        this.createPlanesAndSprites();
    }

    /**
     * A plane draws into a texture the size of its whole rectangle on screen, (L + R) tiles across
     * at 32 px and half that high at the largest scale. For a long thin floor plane - the edge
     * under a 64-tile stair strip, 64 by a quarter tile - that is 2056x1028 pixels for a diagonal
     * line of them, and a big stepped room ran the GPU out of memory (5.2 GB for a 63x64 ramp).
     * Past this many pixels a plane that fills less than an eighth of its rectangle is drawn as
     * pieces along its long side: a tile long when it is a tile wide or less, so the pieces share
     * their textures (`PlaneTextureCache`), else four times its width. Smaller planes, which is
     * every plane of an ordinary room, are left whole.
     */
    public static PLANE_SPLIT_PIXELS = 1 << 20;

    private static splitFloorPlane(location: IVector3D, leftSide: IVector3D, rightSide: IVector3D): [ IVector3D, IVector3D, IVector3D ][] {
        const leftLength = leftSide.length;
        const rightLength = rightSide.length;
        const span = leftLength + rightLength;

        if ((span * 32 * span * 16) <= RoomVisualization.PLANE_SPLIT_PIXELS) return [ [ location, leftSide, rightSide ] ];

        if ((leftLength * rightLength * 8) >= (span * span)) return [ [ location, leftSide, rightSide ] ];

        const alongLeft = leftLength >= rightLength;
        const long = alongLeft ? leftSide : rightSide;
        const longLength = alongLeft ? leftLength : rightLength;
        const shortLength = alongLeft ? rightLength : leftLength;
        const pieceLength = (shortLength <= 1) ? 1 : (shortLength * 4);
        const pieces: [ IVector3D, IVector3D, IVector3D ][] = [];

        for (let start = 0; start < longLength; start += pieceLength) {
            const length = Math.min(pieceLength, longLength - start);
            const pieceLocation = Vector3d.sum(location, Vector3d.product(long, start / longLength));
            const pieceSide = Vector3d.product(long, length / longLength);

            pieces.push(alongLeft ? [ pieceLocation, pieceSide, rightSide ] : [ pieceLocation, leftSide, pieceSide ]);
        }

        return pieces;
    }

    private createPlanesAndSprites(offset: number = 0): void {
        const maxX = this.getLandscapeWidth();
        const maxY = this.getLandscapeHeight();

        let landscapeOffsetX = 0;
        let randomSeed = this.object.model.getValue<number>(RoomObjectVariableEnum.RoomRandomSeed);
        let index = offset;

        while (index < this._roomPlaneParser.planeCount) {
            this._highlightPlaneOffsets[index] = -1;
            const location = this._roomPlaneParser.getPlaneLocation(index);
            const leftSide = this._roomPlaneParser.getPlaneLeftSide(index);
            const rightSide = this._roomPlaneParser.getPlaneRightSide(index);
            const secondaryNormals = this._roomPlaneParser.getPlaneSecondaryNormals(index);
            const planeType = this._roomPlaneParser.getPlaneType(index);

            let plane: RoomPlane | undefined = undefined;

            if (location && leftSide && rightSide) {
                const _local_14 = Vector3d.crossProduct(leftSide, rightSide);

                randomSeed = ToInt32(Math.trunc(randomSeed * 7613 + 517) >>> 0);
                plane = undefined;

                if (planeType === RoomPlaneData.PLANE_FLOOR) {
                    const color
                        = _local_14.z !== 0
                            ? RoomVisualization.FLOOR_COLOR
                            : _local_14.x !== 0
                                ? RoomVisualization.FLOOR_COLOR_RIGHT
                                : RoomVisualization.FLOOR_COLOR_LEFT;

                    // Highlighters and masked planes stay whole: both are addressed by the parser's plane.
                    const pieces: [ IVector3D, IVector3D, IVector3D ][] = (this._roomPlaneParser.isPlaneTemporaryHighlighter(index) || (this._roomPlaneParser.getPlaneMaskCount(index) > 0))
                        ? [ [ location, leftSide, rightSide ] ]
                        : RoomVisualization.splitFloorPlane(location, leftSide, rightSide);

                    const createFloorPlane = (pieceLocation: IVector3D, pieceLeftSide: IVector3D, pieceRightSide: IVector3D): RoomPlane => {
                        const _local_15 = pieceLocation.x + pieceLeftSide.x + 0.5;
                        const _local_16 = pieceLocation.y + pieceRightSide.y + 0.5;
                        const textureOffsetX = Math.trunc(_local_15) - _local_15;
                        const textureOffsetY = Math.trunc(_local_16) - _local_16;

                        const floorPlane = new RoomPlane(
                            this.object.getLocation(),
                            pieceLocation,
                            pieceLeftSide,
                            pieceRightSide,
                            RoomPlane.TYPE_FLOOR,
                            true,
                            secondaryNormals,
                            randomSeed,
                            -textureOffsetX,
                            -textureOffsetY,
                        );

                        floorPlane.color = color;

                        if (this._data) floorPlane.rasterizer = this._data.floorRasterizer;

                        floorPlane.sharedTextureCache = this._planeTextureCache;

                        // The pieces of a split plane sort as the whole plane did.
                        if (pieces.length > 1) floorPlane.setDepthGeometry(location, leftSide, rightSide);

                        return floorPlane;
                    };

                    for (let piece = 1; piece < pieces.length; piece++) {
                        const extra = createFloorPlane(...pieces[piece]);

                        if (this._data?.maskManager) extra.maskManager = this._data.maskManager;

                        this._planes.push(extra);
                        this._planeParserIndexes.push(index);
                    }

                    plane = createFloorPlane(...pieces[0]);
                } else if (planeType === RoomPlaneData.PLANE_WALL || planeType === RoomPlaneData.PLANE_BILLBOARD) {
                    plane = new RoomPlane(
                        this.object.getLocation(),
                        location,
                        leftSide,
                        rightSide,
                        RoomPlane.TYPE_WALL,
                        true,
                        secondaryNormals,
                        randomSeed,
                    );

                    // A wall less than a tile long or high draws only its colour.
                    if ((leftSide.length < 1) || (rightSide.length < 1)) plane.hasTexture = false;

                    plane.color
                        = _local_14.x === 0 && _local_14.y === 0
                            ? RoomVisualization.WALL_COLOR_BORDER
                            : _local_14.y > 0
                                ? RoomVisualization.WALL_COLOR_TOP
                                : _local_14.y === 0
                                    ? RoomVisualization.WALL_COLOR_SIDE
                                    : RoomVisualization.WALL_COLOR_BOTTOM;

                    // Flash builds a billboard (type 4) exactly as a wall, drawn from the billboard data.
                    if (this._data) plane.rasterizer = (planeType === RoomPlaneData.PLANE_BILLBOARD) ? this._data.wallAdRasterizr : this._data.wallRasterizer;
                } else if (planeType === RoomPlaneData.PLANE_LANDSCAPE) {
                    plane = new RoomPlane(
                        this.object.getLocation(),
                        location,
                        leftSide,
                        rightSide,
                        RoomPlane.TYPE_LANDSCAPE,
                        true,
                        secondaryNormals,
                        randomSeed,
                        landscapeOffsetX,
                        0,
                        maxX,
                        maxY,
                    );

                    plane.color
                        = _local_14.y > 0
                            ? RoomVisualization.LANDSCAPE_COLOR_TOP
                            : _local_14.y === 0
                                ? RoomVisualization.LANDSCAPE_COLOR_SIDE
                                : RoomVisualization.LANDSCAPE_COLOR_BOTTOM;

                    if (this._data) plane.rasterizer = this._data.landscapeRasterizer;

                    landscapeOffsetX = landscapeOffsetX + leftSide.length;
                }

                if (plane) {
                    if (this._data?.maskManager) plane.maskManager = this._data.maskManager;

                    let i = 0;

                    while (i < this._roomPlaneParser.getPlaneMaskCount(index)) {
                        const _local_20 = this._roomPlaneParser.getPlaneMaskLeftSideLoc(index, i);
                        const _local_21 = this._roomPlaneParser.getPlaneMaskRightSideLoc(index, i);
                        const _local_22 = this._roomPlaneParser.getPlaneMaskLeftSideLength(index, i);
                        const _local_23 = this._roomPlaneParser.getPlaneMaskRightSideLength(index, i);

                        plane.addRectangleMask(_local_20, _local_21, _local_22, _local_23);

                        i++;
                    }

                    this._highlightPlaneOffsets[index] = this._planes.length;
                    this._planes.push(plane);
                    this._planeParserIndexes.push(index);
                }
            } else {
                return;
            }

            index++;
        }

        this._parserPlanesCreated = this._roomPlaneParser.planeCount;
        this._isPlaneSet = true;
        this.defineSprites();
    }

    public initializeHighlightArea(
        highlightAreaX: number,
        highlightAreaY: number,
        highlightAreaWidth: number,
        highlightAreaHeight: number,
        highlightFilter: Filter,
    ): void {
        this.clearHighlightArea();

        this._highlightAreaX = highlightAreaX;
        this._highlightAreaY = highlightAreaY;
        this._highlightAreaWidth = highlightAreaWidth;
        this._highlightAreaHeight = highlightAreaHeight;
        this._highlightFilter = highlightFilter;

        this._roomPlaneParser.initializeHighlightArea(
            highlightAreaX,
            highlightAreaY,
            highlightAreaWidth,
            highlightAreaHeight,
        );

        this.createPlanesAndSprites(this._parserPlanesCreated);
        this.reset();
    }

    public clearHighlightArea(): void {
        this._highlightAreaX = 0;
        this._highlightAreaY = 0;
        this._highlightAreaWidth = 0;
        this._highlightAreaHeight = 0;

        const totalHighlightedPlanes = this._roomPlaneParser.clearHighlightArea();
        let _local_4 = 0;

        let _local_1 = this._roomPlaneParser.planeCount;

        while (_local_1 < this._roomPlaneParser.planeCount + totalHighlightedPlanes) {
            const _local_2 = this._highlightPlaneOffsets[_local_1];

            if (_local_2 !== -1) {
                _local_4 = _local_4 + 1;
                this._highlightPlaneOffsets[_local_1] = -1;
            }

            _local_1 = _local_1 + 1;
        }

        this._planes = this._planes.slice(0, this._planes.length - _local_4);
        this._planeParserIndexes = this._planeParserIndexes.slice(0, this._planes.length);
        this._parserPlanesCreated = this._roomPlaneParser.planeCount;
        this.createSprites(this._planes.length);

        this.reset();
    }

    protected defineSprites(): void {
        this.createSprites(this._planes.length);

        let planeIndex = 0;

        while (planeIndex < this._planes.length) {
            const plane = this._planes[planeIndex];
            const sprite = this.getSprite(planeIndex);
            const parserIndex = this._planeParserIndexes[planeIndex] ?? planeIndex;

            if (plane && sprite && plane.leftSide && plane.rightSide) {
                if (plane.type === RoomPlane.TYPE_WALL && (plane.leftSide.length < 1 || plane.rightSide.length < 1)) {
                    sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
                } else {
                    sprite.alphaTolerance = AlphaTolerance.MATCH_OPAQUE_PIXELS;
                }

                if (plane.type === RoomPlane.TYPE_WALL) {
                    sprite.tag = 'plane.wall@' + (parserIndex + 1);
                } else if (plane.type === RoomPlane.TYPE_FLOOR) {
                    sprite.tag = 'plane.floor@' + (parserIndex + 1);
                } else {
                    sprite.tag = 'plane@' + (parserIndex + 1);
                }

                sprite.spriteType = RoomObjectSpriteTypeEnum.RoomPlane;

                if (this._roomPlaneParser.isPlaneTemporaryHighlighter(parserIndex)) {
                    if (this._highlightFilter) sprite.filters = [ this._highlightFilter ];

                    sprite.skipMouseHandling = true;
                    plane.extraDepth = -100;
                    plane.isHighlighter = true;
                } else {
                    sprite.filters = RoomVisualization.NO_FILTERS;
                    sprite.skipMouseHandling = false;
                    plane.extraDepth = 0;
                    plane.isHighlighter = false;
                }
            }

            planeIndex++;
        }
    }

    private getLandscapeWidth(): number {
        let length = 0;
        let index = 0;

        while (index < this._roomPlaneParser.planeCount) {
            const type = this._roomPlaneParser.getPlaneType(index);

            if (type === RoomPlaneData.PLANE_LANDSCAPE) {
                const vector = this._roomPlaneParser.getPlaneLeftSide(index);

                if (vector) length += vector.length;
            }

            index++;
        }

        return length;
    }

    private getLandscapeHeight(): number {
        let length = 0;
        let index = 0;

        while (index < this._roomPlaneParser.planeCount) {
            const type = this._roomPlaneParser.getPlaneType(index);

            if (type === RoomPlaneData.PLANE_LANDSCAPE) {
                const vector = this._roomPlaneParser.getPlaneRightSide(index);

                if (vector && vector.length > length) length = vector.length;
            }

            index++;
        }

        if (length > 5) length = 5;

        return length;
    }

    protected updatePlaneTypes(
        floorType: string | undefined,
        wallType: string | undefined,
        landscapeType: string | undefined,
    ): boolean {
        if (floorType !== this._floorType) this._floorType = floorType;
        else floorType = undefined;

        if (wallType !== this._wallType) this._wallType = wallType;
        else wallType = undefined;

        if (landscapeType !== this._landscapeType) this._landscapeType = landscapeType;
        else landscapeType = undefined;

        if (!floorType && !wallType && !landscapeType) return false;

        let index = 0;

        while (index < this._planes.length) {
            const plane = this._planes[index];

            if (plane) {
                if (plane.type === RoomPlane.TYPE_FLOOR && floorType) {
                    plane.id = floorType;
                } else if (plane.type === RoomPlane.TYPE_WALL && wallType) {
                    plane.id = wallType;
                } else if (plane.type === RoomPlane.TYPE_LANDSCAPE && landscapeType) {
                    plane.id = landscapeType;
                }
            }

            index++;
        }

        return true;
    }

    private updatePlaneVisibility(
        floorVisibility: boolean,
        wallVisibility: boolean,
        landscapeVisibility: boolean,
    ): boolean {
        if (
            floorVisibility === this._typeVisibility[RoomPlane.TYPE_FLOOR]
            && wallVisibility === this._typeVisibility[RoomPlane.TYPE_WALL]
            && landscapeVisibility === this._typeVisibility[RoomPlane.TYPE_LANDSCAPE]
        )
            return false;

        this._typeVisibility[RoomPlane.TYPE_FLOOR] = floorVisibility;
        this._typeVisibility[RoomPlane.TYPE_WALL] = wallVisibility;
        this._typeVisibility[RoomPlane.TYPE_LANDSCAPE] = landscapeVisibility;

        this._visiblePlanes = [];
        this._visiblePlaneSpriteNumbers = [];

        return true;
    }

    /**
     * How long one update may spend drawing plane textures. A large irregular room has hundreds of
     * planes; drawn in one frame they stall it for seconds (black on a phone). Past the budget the
     * rest are drawn in the next frames - every plane still takes its geometry each pass, so its
     * visibility and screen rectangle (and the room's bounds) are right from the first.
     */
    public static PLANE_RASTER_BUDGET_MS: number = 12;

    protected updatePlanes(
        geometry: IRoomGeometry,
        geometryUpdate: boolean,
        timeSinceStartMs: number,
    ): boolean {
        this._assetUpdateCounter++;

        const rasterStart = performance.now();

        if (geometryUpdate) {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }

        const hasVisiblePlanes = this._visiblePlanes.length > 0;

        let visiblePlanes = this._visiblePlanes;

        if (!this._visiblePlanes.length) visiblePlanes = this._planes;

        let depth = 0;
        let updated = false;
        let index = 0;

        while (index < visiblePlanes.length) {
            let id = index;

            if (hasVisiblePlanes) id = this._visiblePlaneSpriteNumbers[index];

            const sprite = this.getSprite(id);

            if (sprite) {
                const plane = visiblePlanes[index];

                if (plane) {
                    sprite.id = plane.uniqueId;

                    // The first plane is always drawn, so a pass always makes progress.
                    const canRasterize = (performance.now() - rasterStart) < RoomVisualization.PLANE_RASTER_BUDGET_MS;

                    if (plane.update(geometry, timeSinceStartMs, canRasterize)) {
                        if (plane.visible) {
                            depth = plane.relativeDepth + this.floorRelativeDepth + id / 1000;

                            if (plane.type !== RoomPlane.TYPE_FLOOR) {
                                depth = plane.relativeDepth + this.wallRelativeDepth + id / 1000;

                                if (plane.leftSide.length < 1 || plane.rightSide.length < 1) {
                                    depth = depth + RoomVisualization.ROOM_DEPTH_OFFSET * 0.5;
                                }
                            }

                            this.updateSprite(sprite, geometry, plane, `plane ${id} ${geometry.scale}`, depth);
                        }

                        updated = true;
                    }

                    // A plane whose texture was drawn for another geometry stays hidden until its own is drawn.
                    if (sprite.visible != (plane.visible && this._typeVisibility[plane.type] && !plane.textureOutOfPlace)) {
                        sprite.visible = !sprite.visible;
                        updated = true;
                    }

                    if (plane.visible && this._typeVisibility[plane.type]) {
                        if (!hasVisiblePlanes) {
                            this._visiblePlanes.push(plane);
                            this._visiblePlaneSpriteNumbers.push(index);
                        }
                    }
                } else {
                    sprite.id = 0;

                    if (sprite.visible) {
                        sprite.visible = false;
                        updated = true;
                    }
                }
            }

            index++;
        }

        return updated;
    }

    protected updatePlaneMasks(maskData: RoomMapMaskData): void {
        if (!maskData) return;

        const _local_4: number[] = [];
        const _local_5: number[] = [];

        let _local_6 = false;
        let index = 0;

        while (index < this._planes.length) {
            const plane = this._planes[index];

            if (plane) {
                plane.resetBitmapMasks();

                if (plane.type === RoomPlane.TYPE_LANDSCAPE) _local_4.push(index);
            }

            index++;
        }

        for (const mask of maskData.masks) {
            const maskType = mask.type;
            const maskLocation = mask.locations[0] ?? undefined;
            const maskCategory = mask.category;

            if (!maskLocation) continue;

            let i = 0;

            while (i < this._planes.length) {
                const plane = this._planes[i];

                if (plane.type === RoomPlane.TYPE_WALL || plane.type === RoomPlane.TYPE_LANDSCAPE) {
                    if (plane && plane.location && plane.normal) {
                        const _local_14 = Vector3d.dif(maskLocation, plane.location);
                        const _local_15 = Math.abs(Vector3d.scalarProjection(_local_14, plane.normal));

                        if (_local_15 < 0.01) {
                            if (plane.leftSide && plane.rightSide) {
                                const leftSideLoc = Vector3d.scalarProjection(_local_14, plane.leftSide);
                                const rightSideLoc = Vector3d.scalarProjection(_local_14, plane.rightSide);

                                if (
                                    plane.type === RoomPlane.TYPE_WALL
                                    || (plane.type === RoomPlane.TYPE_LANDSCAPE
                                        && maskCategory === RoomPlaneBitmapMaskData.HOLE)
                                ) {
                                    plane.addBitmapMask(maskType, leftSideLoc, rightSideLoc);
                                } else if (plane.type === RoomPlane.TYPE_LANDSCAPE) {
                                    if (!plane.canBeVisible) _local_6 = true;

                                    plane.canBeVisible = true;

                                    _local_5.push(i);
                                }
                            }
                        }
                    }
                }

                i++;
            }
        }

        index = 0;

        while (index < _local_4.length) {
            const planeIndex = _local_4[index];

            if (_local_5.indexOf(planeIndex) < 0) {
                const plane = this._planes[planeIndex];

                plane.canBeVisible = false;
                _local_6 = true;
            }

            index++;
        }

        if (_local_6) {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }
    }

    private updateSprite(
        sprite: IRoomObjectSprite,
        geometry: IRoomGeometry,
        plane: RoomPlane,
        _arg_3: string,
        relativeDepth: number,
    ): void {
        const offset = plane.offset;

        sprite.offsetX = -offset.x;
        sprite.offsetY = -offset.y;
        sprite.relativeDepth = relativeDepth;
        sprite.color = 0xFFFFFF;
        sprite.texture = plane.getColoredTexture(plane.color) ?? Texture.EMPTY;
        sprite.name = _arg_3 + '_' + this._assetUpdateCounter;
    }

    /**
     * The room's screen rectangle, from its planes' geometry rather than their drawn sprites: the
     * planes are drawn over several frames (`PLANE_RASTER_BUDGET_MS`), and bounds taken from the ones
     * drawn so far would centre the entry camera on a half-drawn room. Before any plane has its
     * geometry, the sprites'.
     */
    public override getBoundingRectangle(): Rectangle {
        if (!this._boundingRectangle) this._boundingRectangle = this.getPlaneBounds() ?? super.getBoundingRectangle();

        return new Rectangle(
            this._boundingRectangle.x,
            this._boundingRectangle.y,
            this._boundingRectangle.width,
            this._boundingRectangle.height,
        );
    }

    /** The union of the shown planes' screen rectangles, or `undefined` when none has one. */
    private getPlaneBounds(): Rectangle | undefined {
        let bounds: Rectangle | undefined = undefined;

        for (const plane of this._planes) {
            if (!plane || !this._typeVisibility[plane.type]) continue;

            const rectangle = plane.screenBounds;

            if (!rectangle || (rectangle.width <= 0) || (rectangle.height <= 0)) continue;

            if (!bounds) bounds = rectangle;
            else bounds.enlarge(rectangle);
        }

        return bounds;
    }

    public get planes(): IRoomPlane[] {
        const planes: IRoomPlane[] = [];

        for (const plane of this._visiblePlanes) planes.push(plane);

        return planes;
    }

    public get floorRelativeDepth(): number {
        return RoomVisualization.ROOM_DEPTH_OFFSET + 0.1;
    }

    public get wallRelativeDepth(): number {
        return RoomVisualization.ROOM_DEPTH_OFFSET + 0.5;
    }
}
