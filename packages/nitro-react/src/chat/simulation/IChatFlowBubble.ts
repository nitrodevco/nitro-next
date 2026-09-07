import { IVector3D, RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType } from '@nitrodevco/nitro-api';
import { Point, PointData, Rectangle } from 'pixi.js';

/** The FreeFlow knobs - in the current client these come from the account preferences (`chatMode` / `chatBubbleWidth` / `chatScrollSpeed`), not the room. */
export interface IChatFlowSettings {
    mode: RoomChatModeType;
    bubbleWidth: RoomChatBubbleWidthType;
    scrollSpeed: RoomChatScrollSpeedType;
}

/**
 * What the simulation needs from a bubble on screen - the slice of the Flash `PooledChatBubble`
 * the stage and its entities touched. `ChatBubbleMotion` implements it for a rendered bubble;
 * `ChatFlowSpacer` for the invisible row spacers of line-by-line mode.
 */
export interface IChatFlowBubble {
    readonly id: number;
    readonly roomId: number;
    readonly timestamp: number;
    /** The art's full extent (Flash `Sprite.width`). */
    readonly bubbleWidth: number;
    /** Height as the simulation sees it: system styles as tall as their text, everything else capped at 108. */
    readonly limitedHeight: number;
    /** A forced height (spacers), else -1. */
    readonly minHeight: number;
    readonly overlap: Rectangle;
    /** The sprite's current position. */
    readonly x: number;
    readonly y: number;
    readonly hasHitDesktopMargin: boolean;
    /** Where the speaker is on screen right now. */
    readonly userScreenLocation: Point;
    readyToRecycle: boolean;
    /** Ease to a position over 150ms. */
    moveTo(x: number, y: number): void;
    /** Jump straight there. */
    setPosition(x: number, y: number): void;
}

/** What the stage needs from whoever hosts it (the Flash `HabboFreeFlowChat` component). */
export interface IChatFlowHost {
    readonly chatSettings: IChatFlowSettings | undefined;
    /** Chat mode "old" - bubbles stack in rows and hug the desktop margins. */
    readonly isLineByLineMode: boolean;
    /** The y new bubbles are born at: a quarter of the way down the screen. */
    readonly chatAreaHeight: number;
    readonly stageWidth: number;
    readonly stageHeight: number;
    /** The room canvas's current pan offset, so bubbles can follow horizontal drags. */
    getCanvasOffset(roomId: number): PointData | undefined;
    /** A room location projected to the screen the way the Flash `getUserScreenLocation` did. */
    getUserScreenLocation(roomId: number, location: IVector3D | undefined): Point;
    /** A bubble scrolled off the top (or was cleared) and should leave the display list. */
    onBubbleRemoved(bubble: IChatFlowBubble): void;
}
