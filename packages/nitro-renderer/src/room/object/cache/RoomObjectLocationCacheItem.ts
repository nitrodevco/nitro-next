import { IRoomGeometry, IRoomObject, IVector3D, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';

/**
 * `RoomObjectLocationCacheItem`: an object's screen location, worked out again only when the
 * object or the geometry changed. Its depth is taken from the tile the object stands on - the
 * location rounded to whole tiles - unless the object's model sets the accurate-z variable, when
 * the exact location's depth is kept. Wall items set it (`RoomEngine.addObjectWallItem`), so one
 * sorts by where it hangs rather than by the tile below.
 *
 * The screen x and y are left unrounded, as the 2026 client leaves them: `renderObject` snaps
 * each sprite once, against the display's offset and scale (`snapRoomSpriteCoordinate`), and a
 * position rounded here first would be rounded twice at every zoom but 1.
 */
export class RoomObjectLocationCacheItem {
    private _accurateZVariable: RoomObjectVariableEnum | undefined;
    private _location: Vector3d = new Vector3d();
    private _screenLocation: Vector3d = new Vector3d();
    private _roundedLocation: Vector3d = new Vector3d();
    private _locationChanged: boolean = false;

    private _geometryUpdateId: number = -1;
    private _objectUpdateId: number = -1;

    constructor(accurateZVariable?: RoomObjectVariableEnum) {
        this._accurateZVariable = accurateZVariable;
    }

    public dispose(): void {
        this._screenLocation = undefined!;
        this._roundedLocation = undefined!;
    }

    public updateLocation(object: IRoomObject, geometry: IRoomGeometry): IVector3D | undefined {
        if (!object || !geometry) return undefined;

        let locationChanged = false;

        const location = object.getLocation();

        if (geometry.updateId !== this._geometryUpdateId || object.updateCounter !== this._objectUpdateId) {
            this._objectUpdateId = object.updateCounter;

            if (
                geometry.updateId !== this._geometryUpdateId
                || location.x !== this._location.x
                || location.y !== this._location.y
                || location.z !== this._location.z
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

            const accurateZ = this._accurateZVariable ? object.model.getValue<number>(this._accurateZVariable) : NaN;
            const rounded = this._roundedLocation;

            rounded.x = Math.round(location.x);
            rounded.y = Math.round(location.y);
            rounded.z = location.z;

            if ((isNaN(accurateZ) || (accurateZ === 0)) && ((rounded.x !== location.x) || (rounded.y !== location.y))) {
                const roundedScreen = geometry.getScreenPosition(rounded);

                this._screenLocation.assign(screenLocation);

                if (roundedScreen) this._screenLocation.z = roundedScreen.z;
            } else {
                this._screenLocation.assign(screenLocation);
            }
        }

        return this._screenLocation;
    }

    public get locationChanged(): boolean {
        return this._locationChanged;
    }
}
