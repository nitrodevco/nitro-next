/**
 * `RenderRoomMessageComposer.compressData`: the render data the server draws a room picture from,
 * as one JSON text - the planes (`getRoomPlanesDataArray`, an empty `masks` left out), the sprites,
 * the rendering modifiers, the effects (`spritesData`, `[]` unless set), the room id, the zoom when
 * it is not 1, then a status, a timestamp and a checksum the server checks it by - deflated with
 * zlib (`ByteArray.compress("zlib")`).
 *
 * The keys come from `StringUtil.makeMagicString` in Flash; they are written out here.
 */
import { IPlaneDrawingData } from '@nitrodevco/nitro-api';

export interface RenderRoomMessageSource {
    planes: IPlaneDrawingData[];
    /** `SpriteDataCollector.getFurniData`. */
    sprites: string;
    /** `SpriteDataCollector.getRoomRenderingModifiers`. */
    modifiers: string;
    roomId: number;
    /** `SessionDataManager.topSecurityLevel`. */
    topSecurityLevel: number;
    /** `setZoom`; 1 is left out. */
    zoom?: number;
    /** `addEffectData`. */
    effects?: string;
    /** `new Date().getTime()` when the composer was made. */
    time: number;
}

/** `JsonPlaneDrawingData` (`toJSON` in build 87 gives the key order). */
const planeJson = (plane: IPlaneDrawingData) => ({
    z: plane.z,
    cornerPoints: plane.cornerPoints.map(point => ({ x: Math.trunc(point.x), y: Math.trunc(point.y) })),
    color: plane.color >>> 0,
    masks: plane.maskAssetNames.map((name, index) => ({
        name,
        location: { x: Math.trunc(plane.maskAssetLocations[index].x), y: Math.trunc(plane.maskAssetLocations[index].y) },
        flipH: plane.maskAssetFlipHs[index],
        flipV: plane.maskAssetFlipVs[index],
    })),
    bottomAligned: plane.isBottomAligned(),
    texCols: plane.assetNameColumns.filter(column => column.length).map(assetNames => ({ assetNames })),
});

/** `CryptoTools.fletcher100` over `stringToByteArray` (each character's low byte). */
const fletcher100 = (text: string, seed: number, roomId: number) => {
    let a = seed;
    let b = roomId;

    for (let index = 0; index < text.length; index++) {
        a = (a + (text.charCodeAt(index) & 0xFF)) % 255;
        b = (a + b) % 255;
    }

    return (a + b) % 100;
};

/** `compressData` up to the deflate: the JSON text. */
export const buildRenderRoomMessageText = ({ planes, sprites, modifiers, roomId, topSecurityLevel, zoom = 1, effects = '[]', time }: RenderRoomMessageSource): string => {
    const planesJson = JSON.stringify(planes.map(planeJson), (key, value) => (((key === 'masks') && Array.isArray(value) && !value.length) ? undefined : value));
    let text = `{ "planes" : ${planesJson},"sprites" : ${sprites},"modifiers" : ${modifiers},"filters" : ${effects},"roomid" : ${roomId}`;

    if (zoom !== 1) text += `,"zoom" : ${zoom}`;

    const timeLastDigits = time % 100;
    const roundedTime = time - timeLastDigits;
    const status = Math.trunc(((roundedTime / 100) % 23) + topSecurityLevel);

    text += `,"status" : ${status}`;

    const check = Math.trunc((text.length + ((roundedTime / 100) * 17)) % 1493);
    const checksum = fletcher100(text, check, roomId);

    text += `,"timestamp" : ${roundedTime + checksum}`;
    text += `,"checksum" : ${(timeLastDigits + 13) * (check + 29)} }`;

    return text;
};

/** `compressData`: the text, UTF-8, zlib-deflated. */
export const buildRenderRoomMessageData = async (source: RenderRoomMessageSource): Promise<Uint8Array> => {
    const stream = new Blob([ new TextEncoder().encode(buildRenderRoomMessageText(source)) ]).stream().pipeThrough(new CompressionStream('deflate'));

    return new Uint8Array(await new Response(stream).arrayBuffer());
};
