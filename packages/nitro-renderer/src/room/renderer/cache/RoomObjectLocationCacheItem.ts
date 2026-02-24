import type { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { type IRoomGeometry, type IRoomObject, type IVector3D, Vector3d } from '@nitrodevco/nitro-api';

export class RoomObjectLocationCacheItem {
    private _roomObjectVariableAccurateZ: string;

    private _location: Vector3d = new Vector3d();
    private _screenLocation: Vector3d = new Vector3d();
    private _locationChanged: boolean = false;

    private _geometryUpdateId: number = -1;
    private _objectUpdateId: number = -1;

    constructor(accurateZ: string) {
        this._roomObjectVariableAccurateZ = accurateZ || '';
    }

    public dispose(): void {
        this._screenLocation = undefined!;
    }

    public updateLocation(object: IRoomObject, geometry: IRoomGeometry): IVector3D | undefined {
        if (!object || !geometry) return undefined;

        let locationChanged = false;

        const location = object.getLocation();

        if (geometry.updateId !== this._geometryUpdateId || object.updateCounter !== this._objectUpdateId) {
            this._objectUpdateId = object.updateCounter;

            if (
                geometry.updateId !== this._geometryUpdateId ||
                location.x !== this._location.x ||
                location.y !== this._location.y ||
                location.z !== this._location.z
            ) {
                this._geometryUpdateId = geometry.updateId;
                this._location.assign(location);

                locationChanged = true;
            }
        }

        this._locationChanged = locationChanged;

        if (this._locationChanged) {
            const screenLocation = geometry.getScreenPosition(location);

            if (!screenLocation) return undefined;

            const accurateZ = object.model.getValue<number>(
                this._roomObjectVariableAccurateZ as RoomObjectVariableEnum,
            );

            if (isNaN(accurateZ) || accurateZ === 0) {
                const rounded = new Vector3d(Math.round(location.x), Math.round(location.y), location.z);

                if (rounded.x !== location.x || rounded.y !== location.y) {
                    const roundedScreen = geometry.getScreenPosition(rounded);

                    this._screenLocation.assign(screenLocation);

                    if (roundedScreen) this._screenLocation.z = roundedScreen.z;
                } else {
                    this._screenLocation.assign(screenLocation);
                }
            } else {
                this._screenLocation.assign(screenLocation);
            }

            this._screenLocation.x = Math.round(this._screenLocation.x);
            this._screenLocation.y = Math.round(this._screenLocation.y);
        }

        return this._screenLocation;
    }

    public get locationChanged(): boolean {
        return this._locationChanged;
    }
}
