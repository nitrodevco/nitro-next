import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/**
 * Port of Flash `RoomObjectFurniIconUpdateMessage`: the room telling a furni that the icon it
 * asked for (`RoomObjectFurniIconAssetEvent`) is in its asset collection under `assetName` -
 * or, while it is still downloading, that it is `loading_icon`.
 */
export class ObjectFurniIconUpdateMessage extends RoomObjectUpdateMessage {
    /** Flash's name for it, copied over from the badge message it was made from. */
    public static BADGE_LOADED: string = 'ROFIUM_FURNI_ICON_LOADED' as const;

    private _assetName: string;
    private _wallItem: boolean;
    private _typeId: number;
    private _extra: string;

    constructor(assetName: string, wallItem: boolean, typeId: number, extra: string) {
        super(undefined, undefined);

        this._assetName = assetName;
        this._wallItem = wallItem;
        this._typeId = typeId;
        this._extra = extra;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get wallItem(): boolean {
        return this._wallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get extra(): string {
        return this._extra;
    }
}
