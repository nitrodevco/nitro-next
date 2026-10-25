import { Canvas } from '@napi-rs/canvas';
import { IRoomObjectController, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRoomContentLoader } from '@nitrodevco/nitro-renderer';

import { RequestError } from '../http/RequestError';
import { drawRoomObject, ROOM_OBJECT_SCALE, updateObjectData } from '../room/drawRoomObject';
import { PetRenderRequest } from './petRequest';

/** A drawn pet. Nothing of a pet goes missing quietly: a pet that cannot be drawn is an error. */
export interface PetRender {
    frames: Canvas[];
    missing: string[];
}

/** What one pet type has to draw with, read from its library's visualization data. */
export interface PetTypeInfo {
    name: string;
    postures: string[];
    defaultPosture: string;
    gestures: string[];
    palettes: number[];
}

/**
 * Pet images, drawn by the renderer's own pet object: the pet's library is loaded by the room
 * content loader (`asset.bundles.pets`, the type names from `renderer.petTypes`), and the pet -
 * given its figure, posture and gesture as the room's pet logic gives them - is drawn by
 * `AnimatedPetVisualization` at the room's full scale (`drawRoomObject`). `drawFrames` puts the
 * frames on one canvas, `l` doubled and `s` halved as the avatars are.
 */
export class PetImager {
    public constructor(private readonly _types: readonly string[]) {}

    public get types(): readonly string[] {
        return this._types;
    }

    /** A pet type's name, from its number or name. */
    public typeName(type: number | string): string {
        const name = (typeof type === 'number') ? this._types[type] : (this._types.includes(type) ? type : undefined);

        if (!name) throw new RequestError(`${type} is not a pet type: they are ${this._types.map((value, index) => `${index} ${value}`).join(', ')}`, 404);

        return name;
    }

    /** What a pet type draws with: its postures, gestures and palettes. Loads its library if it is not. */
    public async typeInfo(type: number | string): Promise<PetTypeInfo> {
        const name = this.typeName(type);

        if (!(await GetRoomContentLoader().downloadAssetAsync(name))) throw new Error(`The pet library ${name} did not load`);

        const data = GetAssetManager().getCollection(name)?.data;
        const visualization = data?.visualizations?.find(value => value.size === ROOM_OBJECT_SCALE) ?? data?.visualizations?.[0];
        const postures = visualization?.postures?.postures?.map(posture => posture.id) ?? [];

        return {
            name,
            postures,
            defaultPosture: visualization?.postures?.defaultPosture ?? postures[0] ?? '',
            gestures: visualization?.gestures?.map(gesture => gesture.id) ?? [],
            palettes: data?.palettes?.map(palette => Number(palette.id)) ?? [],
        };
    }

    /** The frames of the image - one for a still, every frame of the animation's loop for `animate`. */
    public async render(request: PetRenderRequest): Promise<PetRender> {
        const info = await this.typeInfo(request.type);
        const posture = request.posture || info.defaultPosture;

        if (request.posture && !info.postures.includes(request.posture)) throw new RequestError(`posture ${request.posture} is not one the ${info.name} has: ${info.postures.join(', ')}`);
        if (request.gesture && !info.gestures.includes(request.gesture)) throw new RequestError(`gesture ${request.gesture} is not one the ${info.name} has: ${info.gestures.join(', ') || 'none'}`);
        if (info.palettes.length && !info.palettes.includes(request.paletteId)) throw new RequestError(`palette ${request.paletteId} is not one the ${info.name} has: ${info.palettes.join(', ')}`);

        return { frames: drawRoomObject(info.name, pet => setUpPet(pet, posture, request), request), missing: [] };
    }
}

/** The pet given its figure, posture and gesture, as `renderGenericRoomObjectTexture` gives a pet its figure. */
const setUpPet = (pet: IRoomObjectController, posture: string, request: PetRenderRequest): void => {
    const model = pet.model;

    model.setValue(RoomObjectVariableEnum.PetPaletteIndex, request.paletteId);
    model.setValue(RoomObjectVariableEnum.PetColor, request.color);
    model.setValue(RoomObjectVariableEnum.FigurePosture, posture);
    model.setValue(RoomObjectVariableEnum.FigureGesture, request.gesture);
    model.setValue(RoomObjectVariableEnum.HeadDirection, request.headDirection * 45);

    if (request.headOnly) model.setValue(RoomObjectVariableEnum.PetHeadOnly, 1);

    if (request.parts.length) {
        model.setValue(RoomObjectVariableEnum.PetCustomLayerIds, request.parts.map(part => part.layerId));
        model.setValue(RoomObjectVariableEnum.PetCustomPartsIds, request.parts.map(part => part.partId));
        model.setValue(RoomObjectVariableEnum.PetCustomPaletteIds, request.parts.map(part => part.paletteId));
    }

    updateObjectData(pet);
};
