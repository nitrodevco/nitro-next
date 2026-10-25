import { Canvas } from '@napi-rs/canvas';
import { FurnitureTypeEnum, IFurnitureData, IRoomObjectController, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRoomContentLoader } from '@nitrodevco/nitro-renderer';

import { RequestError } from '../http/RequestError';
import { drawRoomObject, updateObjectData } from '../room/drawRoomObject';
import { FurnitureRenderRequest } from './furnitureRequest';

/** A drawn furniture. One whose library does not load is an error, not an image missing a part. */
export interface FurnitureRender {
    frames: Canvas[];
    missing: string[];
}

/** One item of the furnidata, as the imager looks it up. */
export interface FurnitureItem {
    id: number;
    kind: FurnitureTypeEnum;
    /** Without its colour: the room object's type and the library's name. */
    className: string;
    colorIndex: number;
    /** As the furnidata writes it, colour and all. */
    fullName: string;
}

/** The furnidata's own item, as much of it as the imager reads. */
interface FurnidataItem {
    id: number;
    classname: string;
    revision?: number;
    adurl?: string | null;
}

interface Furnidata {
    roomitemtypes?: { furnitype?: FurnidataItem[] };
    wallitemtypes?: { furnitype?: FurnidataItem[] };
}

/**
 * Furniture images, drawn by the renderer's own furniture objects: the hotel's furnidata
 * (`furnituredata.url`) tells the room content loader each item's type, as the client's
 * `loadFurnitureData` does, the item's library comes from `asset.bundles.furni`, and the item is
 * drawn by its visualization at the room's full scale with its colour and state
 * (`drawRoomObject`). `drawFrames` puts the frames on one canvas, `l` doubled and `s` halved.
 *
 * The furnidata is read again every `refreshSeconds` from a url, so furniture the hotel adds is
 * drawn without a restart. Libraries nothing has drawn with for a while are released by the room
 * content loader's own `purge`, which the imager runs as the client's purge trigger does.
 */
export class FurnitureImager {
    private _floor = new Map<number, FurnitureItem>();
    private _wall = new Map<number, FurnitureItem>();
    private _byName = new Map<string, FurnitureItem>();

    private constructor(private readonly _source: string) {}

    public static async create(source: string, refreshSeconds: number, purgeSeconds: number): Promise<FurnitureImager> {
        const imager = new FurnitureImager(source);

        await imager.load();

        if (refreshSeconds > 0 && /^https?:/i.test(source)) {
            setInterval(() => {
                imager.load().catch((err: unknown) => console.error('Reloading the furnidata failed; keeping the current one:', err));
            }, refreshSeconds * 1000).unref();
        }

        if (purgeSeconds > 0) setInterval(() => GetRoomContentLoader().purge(), purgeSeconds * 1000).unref();

        return imager;
    }

    /** How many floor and wall items the furnidata has. */
    public get itemCount(): { floor: number; wall: number } {
        return { floor: this._floor.size, wall: this._wall.size };
    }

    /** The item a request names: by class name (floor first, as the furnidata lists both), or by id. */
    public find(request: Pick<FurnitureRenderRequest, 'name' | 'id' | 'wall'>): FurnitureItem {
        const item = request.name ? this._byName.get(request.name) : (request.wall ? this._wall : this._floor).get(request.id);

        if (!item) throw new RequestError(request.name ? `${request.name} is not in the furnidata` : `the furnidata has no ${request.wall ? 'wall' : 'floor'} item ${request.id}`, 404);

        return item;
    }

    public async render(request: FurnitureRenderRequest): Promise<FurnitureRender> {
        const item = this.find(request);
        const loader = GetRoomContentLoader();

        if (!(await loader.downloadAssetAsync(item.className)) || !GetAssetManager().getCollection(loader.getAssetAliasName(item.className))) {
            throw new RequestError(`${item.fullName} has no library to draw it with`, 404);
        }

        return { frames: drawRoomObject(item.className, furniture => setUpFurniture(furniture, item, request.state), request), missing: [] };
    }

    /** Reads the furnidata and hands its items to the room content loader, as the client does. */
    private async load(): Promise<void> {
        const response = await fetch(this._source);

        if (!response.ok) throw new Error(`Furnidata ${this._source} answered ${response.status}`);

        const data = await response.json() as Furnidata;
        const floor = new Map<number, FurnitureItem>();
        const wall = new Map<number, FurnitureItem>();
        const byName = new Map<string, FurnitureItem>();

        for (const [ kind, items, table ] of [
            [ FurnitureTypeEnum.Floor, data.roomitemtypes?.furnitype ?? [], floor ],
            [ FurnitureTypeEnum.Wall, data.wallitemtypes?.furnitype ?? [], wall ],
        ] as const) {
            const furnitureData: IFurnitureData[] = [];

            for (const value of items) {
                if (!value?.classname) continue;

                const [ className, color ] = value.classname.split('*');
                const item: FurnitureItem = { id: value.id, kind, className, colorIndex: color ? parseInt(color) : 0, fullName: value.classname };

                table.set(item.id, item);

                // Floor first: a name both kinds have is the floor item's, as the room content loader takes it.
                if (!byName.has(item.fullName.toLowerCase())) byName.set(item.fullName.toLowerCase(), item);

                // What `processFurnitureData` reads of an item; the rest of `IFurnitureData` is the client's catalogue and infostand.
                furnitureData.push({
                    type: kind,
                    id: item.id,
                    className,
                    fullName: item.fullName,
                    hasIndexedColor: color !== undefined,
                    colorIndex: item.colorIndex,
                    revision: value.revision ?? 0,
                    adUrl: value.adurl ?? '',
                } as IFurnitureData);
            }

            GetRoomContentLoader().processFurnitureData(furnitureData);
        }

        this._floor = floor;
        this._wall = wall;
        this._byName = byName;
    }
}

/** The furniture given its colour and state, as `renderGenericRoomObjectTexture` gives an item its value and state. */
const setUpFurniture = (furniture: IRoomObjectController, item: FurnitureItem, state: number): void => {
    const model = furniture.model;

    model.setValue(RoomObjectVariableEnum.FurnitureColor, item.colorIndex);
    model.setValue(RoomObjectVariableEnum.FurnitureExtras, NaN);
    model.setValue(RoomObjectVariableEnum.FurnitureData, state.toString());

    updateObjectData(furniture);
};
