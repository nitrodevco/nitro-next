/**
 * The pieces of furniture data the Flash widgets parsed out of a room object's model by hand.
 * The formats are the server's, not ours, so they are kept here as plain functions - away from
 * the components that render them, and testable on their own.
 */
import { GetObjectDataForFlags, IRoomObject, MapDataType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { PresentOpenedMessageType } from '@nitrodevco/nitro-packets';

export interface StickieData {
    /** Bare hex, no leading hash: the colour the note's paper is drawn in. */
    colorHex: string;
    text: string;
}

/**
 * A post-it's `furniture_itemdata`: the colour, then a space, then the note. A note that has
 * never been written is just the colour, and anything shorter than six characters is not a
 * post-it worth opening - the same floor `FurnitureStickieWidgetHandler` applied.
 */
export const parseStickieData = (itemData: string | undefined): StickieData | undefined => {
    if (!itemData || itemData.length < 6) return undefined;

    const spaceIndex = itemData.indexOf(' ');

    if (spaceIndex <= 0) return { colorHex: itemData, text: '' };

    return { colorHex: itemData.slice(0, spaceIndex), text: itemData.slice(spaceIndex + 1) };
};

export interface TrophyData {
    ownerName: string;
    date: string;
    message: string;
}

/**
 * A trophy's `furniture_data`: who won it, when, and the engraving, tab separated. The
 * engraving is whatever is left after the second tab, so its own tabs (there should be none,
 * but the field is free text) stay part of the message rather than truncating it.
 */
export const parseTrophyData = (furnitureData: string | undefined): TrophyData => {
    const [ ownerName = '', date = '', ...rest ] = (furnitureData ?? '').split('\t');

    return { ownerName, date, message: rest.join('\t') };
};

/**
 * Where a link furni points. Newer furni carry it in their `furniture_data` map under
 * `internalLink`; older ones only have the link the asset itself declared, which the logic
 * copies onto the model. Both Flash link handlers looked in exactly that order.
 */
export const parseFurnitureLink = (
    mappedLink: string | undefined,
    modelLink: string | undefined,
): string | undefined => {
    if (mappedLink && mappedLink.length) return mappedLink;

    if (modelLink && modelLink.length) return modelLink;

    return undefined;
};

/** The same lookup against a live room object, for the callers that hold one. */
export const readFurnitureLink = (roomObject: IRoomObject): string | undefined => {
    const stuffData = GetObjectDataForFlags(roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat));

    stuffData.initializeFromRoomObjectModel(roomObject.model);

    return parseFurnitureLink(
        (stuffData instanceof MapDataType) ? stuffData.getValue('internalLink') : undefined,
        roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureInternalLink),
    );
};

export interface PhotoData {
    /** Either a full URL or a name to hang off the stories image base. */
    url: string;
    creatorName: string;
    creatorId: number;
    /** Milliseconds since the epoch, as the photo was taken. */
    time: number;
    caption: string;
}

/**
 * A photo furni's `furniture_data`: JSON whose keys come in two spellings, a one-letter one and
 * a written-out one, and Flash read both. A photo that is only an id has its real data on the
 * extra-data service instead, which is not fetched here.
 */
export const parsePhotoData = (furnitureData: string | undefined): PhotoData | undefined => {
    if (!furnitureData || !furnitureData.length) return undefined;

    let parsed: Record<string, unknown>;

    try {
        parsed = JSON.parse(furnitureData) as Record<string, unknown>;
    } catch {
        return undefined;
    }

    const read = (short: string, long: string): string => {
        const value = parsed[short] ?? parsed[long];

        // The server writes strings and numbers here; anything else is not a field we know.
        if (typeof value === 'string') return value;

        if (typeof value === 'number') return value.toString();

        return '';
    };

    const url = read('w', 'url');

    if (!url.length) return undefined;

    return {
        url,
        creatorName: read('n', 'creator_name'),
        creatorId: parseInt(read('s', 'creator_id'), 10) || 0,
        time: parseInt(read('t', 'time'), 10) || 0,
        caption: read('m', 'caption'),
    };
};

/**
 * Where the photo actually lives. A stored name is hung off the configured base - selfies sit
 * under their own folder, posters do not - and anything already absolute is left alone.
 */
export const resolvePhotoUrl = (url: string, baseUrl: string, isPoster: boolean): string => {
    if (url.indexOf('http') === 0) return url;

    const folder = isPoster ? '' : 'postcards/selfie/';
    const name = (url.indexOf('.png') === -1) ? `${url}.png` : url;

    return `${baseUrl}${folder}${name}`;
};

/**
 * The pet package's naming dialog is raised by the server rather than by a furni asking for it,
 * so it has no `RoomObjectWidgetRequestEvent` of its own. It is still a widget on the same map,
 * and this is the key it lives under.
 */
export const PET_PACKAGE_WIDGET = 'PET_PACKAGE';

/**
 * `PresentFurniWidget`'s opened card (`packagecard_new_opened`) outlives the gift it came out of -
 * the box leaves the room the moment it is opened - so it is not a request of the gift's own. It
 * is opened, empty, by the open button (`sendOpen`: Flash's `§_-B28§` "opening" flag) and filled
 * by `PresentOpenedMessage` (`RWPDUE_CONTENTS*`), and this is the key it lives under.
 */
export const PRESENT_OPENED_WIDGET = 'PRESENT_OPENED';

/** What the opened card is handed: the sender of the gift that was opened, then what came out. */
export interface PresentOpenedData {
    /** `_senderName`, `§_-I2T§` and `§_-1V§`, kept from the card whose open button was pressed. */
    senderName: string;
    senderFigure: string;
    trustedSender: boolean;
    /** Nothing until the server has answered the open. */
    contents?: PresentOpenedMessageType;
}
