import { Canvas } from '@napi-rs/canvas';
import { GetObjectDataForFlags, IRoomObjectController, IRoomObjectSpriteVisualization, ObjectDataFlagsEnum, RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine, ObjectDataUpdateMessage, RoomGeometry, RoomObjectSpriteVisualization } from '@nitrodevco/nitro-renderer';

import { drawFrames, ImageSize, PlacedSprite } from '../output/drawFrames';

/**
 * Pets and furniture animate a step every room update of `UPDATE_TIME_INCREASER` (41 ms), so an
 * animated image plays at the room's speed.
 */
export const ROOM_OBJECT_FRAME_MS = RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;

/** The most frames an animated image has. */
export const MAX_ANIMATION_FRAMES = 64;

/**
 * How many steps are looked at to find where an animation repeats: twice the most frames, so a
 * loop as long as the most is seen to come round once.
 */
const LOOP_HORIZON = MAX_ANIMATION_FRAMES * 2;

/** The room's full scale, from whose assets every size is drawn. */
export const ROOM_OBJECT_SCALE = RoomGeometryScaleType.ZoomedIn;

/**
 * Ids for the imager's objects in the room engine's temporary room, apart from the ones the engine
 * hands its own generic images (`_imageObjectIdBank`, 1-1000).
 */
const FIRST_OBJECT_ID = 1_000_000;
const OBJECT_ID_RANGE = 1_000_000;

let nextObjectId = 0;

/** Which frames of a room object are drawn, which way it faces, and how large. */
export interface RoomObjectFrames {
    size: ImageSize;
    /** 0-7, in the room's eighths of a turn. */
    direction: number;
    /** Steps of its animation before the (first) frame drawn. */
    frame: number;
    /** Every frame of the animation's loop, rather than the one. */
    animate: boolean;
}

/**
 * A room object of `type` drawn as `RoomEngine.getGenericRoomObjectTexture` draws the client's pet
 * and furniture images: made in the engine's temporary room - its library must be loaded already -
 * turned, given its values by `setUp`, and updated at the room's full scale with the geometry that
 * method uses. Each frame is the visualization's visible sprites, back to front, placed as
 * `RoomObjectSpriteVisualization.buildImageContainer` places them.
 *
 * An animated image steps the object a room update at a time and keeps the shortest loop its
 * frames repeat in (`loopLength`). The frames are drawn (`drawFrames`) before the object is
 * removed: its library lets go of the palette textures a pet was drawn with once nothing
 * references it. Nothing here waits, so no other request's object comes between the object's
 * making and its removal.
 */
export const drawRoomObject = (type: string, setUp: (object: IRoomObjectController) => void, frames: RoomObjectFrames): Canvas[] => {
    const room = GetRoomEngine().getTemporaryRoom();
    const category = GetRoomContentLoader().getCategoryForType(type);
    const objectId = FIRST_OBJECT_ID + (nextObjectId++ % OBJECT_ID_RANGE);
    const object = room.createRoomObjectAndInitalize(objectId, type, category) as IRoomObjectController | undefined;

    if (!object) throw new Error(`${type} could not be made`);

    const geometry = new RoomGeometry(ROOM_OBJECT_SCALE, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));

    try {
        object.setDirection(new Vector3d(frames.direction * 45));
        setUp(object);

        const visualization = object.visualization as IRoomObjectSpriteVisualization | undefined;

        if (!visualization) throw new Error(`${type} has no visualization`);

        let time = 0;
        const step = (): PlacedSprite[] => {
            visualization.update(geometry, time, true, false);
            time += ROOM_OBJECT_FRAME_MS;

            return placeSprites(visualization);
        };

        // The first update draws the object as it is; each one after is a step of its animation.
        let frame = step();

        for (let i = 0; i < frames.frame; i++) frame = step();

        if (!frames.animate) return drawFrames([ frame ], frames.size);

        const drawn = [ frame ];

        while (drawn.length < LOOP_HORIZON) drawn.push(step());

        return drawFrames(drawn.slice(0, loopLength(drawn.map(frameKey))), frames.size);
    } finally {
        geometry.dispose();
        room.removeRoomObject(objectId, category);
    }
};

/**
 * The object's data, from the values its model was given, as `renderGenericRoomObjectTexture`
 * hands it over when it has none of its own: the legacy data, made from the model (a furniture's
 * `FurnitureData` state is its string).
 */
export const updateObjectData = (object: IRoomObjectController): void => {
    const objectData = GetObjectDataForFlags(ObjectDataFlagsEnum.Legacy);

    objectData.initializeFromRoomObjectModel(object.model);
    object.processUpdateMessage(new ObjectDataUpdateMessage(parseInt(objectData.getLegacyString()), objectData));
};

/** The visible sprites, back to front, as `buildImageContainer` lays them out. */
const placeSprites = (visualization: IRoomObjectSpriteVisualization): PlacedSprite[] => {
    const sprites = visualization.sprites.filter(sprite => sprite.visible && sprite.texture && (sprite.alpha > 0));

    // Stable: sprites at one depth keep the order the visualization lists them in.
    return sprites.sort((a, b) => b.relativeDepth - a.relativeDepth).map(sprite => ({
        texture: sprite.texture,
        x: sprite.offsetX,
        y: sprite.offsetY,
        flipH: sprite.flipH,
        flipV: sprite.flipV,
        alpha: sprite.alpha / 255,
        tint: sprite.color,
        blendMode: sprite.blendMode,
    }));
};

/** What a frame shows, as a string: two frames with the same key draw the same image. */
const frameKey = (sprites: PlacedSprite[]): string => sprites.map(sprite => [
    sprite.texture.uid, sprite.x, sprite.y, sprite.flipH, sprite.flipV, sprite.alpha, sprite.tint, sprite.blendMode,
].join(':')).join('|');

/**
 * The shortest loop the frames repeat in, up to `MAX_ANIMATION_FRAMES`: the length after which
 * every frame seen is the one that many before it. A still object is one frame; an animation that
 * never comes round within the horizon (a random one) is cut at the most frames.
 */
export const loopLength = (keys: string[]): number => {
    for (let length = 1; length <= MAX_ANIMATION_FRAMES; length++) {
        let repeats = true;

        for (let i = length; i < keys.length; i++) {
            if (keys[i] !== keys[i - length]) {
                repeats = false;
                break;
            }
        }

        if (repeats) return length;
    }

    return MAX_ANIMATION_FRAMES;
};
