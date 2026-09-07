import { IVector3D, RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { IChatLink } from '@nitrodevco/nitro-packets';

/**
 * One chat message as the room store keeps it (the Flash `ChatItem`) - everything a
 * `ChatBubbleView` needs to draw itself. Immutable: the text rewrites the Flash factory did
 * (escaping, localised special types, colour prefixes) happen while rendering instead.
 */
export interface ChatBubbleData {
    id: number;
    roomId: number;
    /** The speaker's room object id (the Flash "user index"). */
    objectId: number;
    text: string;
    chatType: RoomChatTypeEnum;
    styleId: number;
    links: IChatLink[];
    /** The speaker's room object's own location vector - live, so the pointer follows them as they walk (Flash `ChatItem.userLocation`). */
    userLocation: IVector3D | undefined;
    /** Arrival time, nudged by one per message that shares a millisecond so ordering stays strict. */
    timestamp: number;
    /** Hand item id, remaining mute seconds, the giver's object id ... - the `extraParam` of the special chat types. */
    extraParam: number;
    /** Overrides for game chat: a fixed colour, an on-screen x rather than a room location, a figure / name that isn't in the room. */
    forcedColor?: number;
    forcedScreenLocationX?: number;
    forcedFigure?: string;
    forcedUserName?: string;
}

let nextChatBubbleId = 1;

export const createChatBubbleId = (): number => nextChatBubbleId++;
