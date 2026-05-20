import type { IVector3D } from '#api/utils';

export interface ILegacyWallGeometry {
    initialize(width: number, height: number, floorHeight: number): void;
    dispose(): void;
    setHeight(x: number, y: number, height: number): boolean;
    getHeight(x: number, y: number): number;
    getLocation(width: number, height: number, localX: number, localY: number, direction: string): IVector3D;
    getLocationOldFormat(k: number, _arg_2: number, dir: string): IVector3D;
    getOldLocation(loc: IVector3D, angle: number): [number, number, number, number, string] | undefined;
    getOldLocationString(loc: IVector3D, angle: number): string;
    getDirection(dir: string): number;
    getFloorAltitude(x: number, y: number): number;
    isRoomTile(x: number, y: number): boolean;
    readonly disposed: boolean;
    scale: number;
}
