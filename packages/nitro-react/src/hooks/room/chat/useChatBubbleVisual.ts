import { AvatarGenderType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { PetFigureData } from '@nitrodevco/nitro-renderer';
import { Rectangle, Texture } from 'pixi.js';
import { useEffect, useMemo, useState } from 'react';

import { buildChatBubbleMarkup, ChatBubbleData, chatFontSizeScale, computeChatBubbleLayout, resolveChatBubbleText, scaleChatFontSize } from '#base/chat';
import { useRoom, useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';

import { useChatAvatarHead } from './useChatAvatarHead';
import { useChatBackgroundTexture } from './useChatBackgroundTexture';
import { useChatBubbleText } from './useChatBubbleText';
import { useChatPetFace } from './useChatPetFace';
import { useChatStyle } from './useChatStyle';

const EMPTY_LINKS: never[] = [];

/** `ChatBubbleFactory.getPetImage` draws every pet's head alone except this type's (the cow). */
const FULL_BODY_CHAT_PET_TYPE = 35;

/**
 * Everything a chat bubble draws, from its data: the style's bitmaps, the speaker's head or the
 * pet's face, the rasterised text and the size arithmetic (`PooledChatBubble.recreate`, whose
 * result `ChatBubbleFactory.getHistoryLineEntry` draws into a bitmap as well). The live bubble
 * adds its motion to this; the chat history only places it. `maxWidth` is the wrap width the
 * bubble-width setting maps to.
 */
export const useChatBubbleVisual = (data: ChatBubbleData, maxWidth: number) => {
    const t = useTranslation();
    const room = useRoom();
    const style = useChatStyle(data.styleId);
    const liveUserData = useRoomStore(x => x.usersByRoomObjectId[data.objectId]);
    // Flash built the bubble once from the speaker; one who leaves the room keeps their name, head and colour.
    const [ userData, setUserData ] = useState(liveUserData);

    if (liveUserData && (liveUserData !== userData)) setUserData(liveUserData);
    const chatSizePreference = useUserStore(x => x.chatSizePreference);
    // `recreate` read the scale once; the state keeps the mode this bubble was built with.
    const [ builtWithSizePreference ] = useState(chatSizePreference);
    const fontSizeScale = chatFontSizeScale(builtWithSizePreference);
    const displayFontSizeScale = chatFontSizeScale(chatSizePreference);

    const isPet = (userData?.userType === RoomObjectUserType.Pet);
    const userName = data.forcedUserName ?? userData?.name ?? '';
    const figure = data.forcedFigure ?? (isPet ? undefined : userData?.figure);
    const petPosture = isPet ? (room?.getRoomObject(data.objectId, RoomObjectCategoryEnum.Unit)?.model.getValue<string>(RoomObjectVariableEnum.FigurePosture) ?? undefined) : undefined;

    const head = useChatAvatarHead(figure, userData?.gender ?? AvatarGenderType.Male);
    const petFigure = isPet ? userData?.figure : undefined;
    const petHeadOnly = !!petFigure && (new PetFigureData(petFigure).typeId !== FULL_BODY_CHAT_PET_TYPE);
    const pet = useChatPetFace(petFigure, petPosture, { headOnly: petHeadOnly });
    // `ChatBubbleFactory.getNewChatBubble`: the style's icon, else a forced figure's head, a user's head or a pet's face - bots get none.
    const isForced = !!(data.forcedFigure || data.forcedUserName);
    const faceTexture = style?.iconTexture ?? ((isForced || (userData?.userType === RoomObjectUserType.User)) ? head.texture : (isPet ? pet.texture : undefined));
    const color = data.forcedColor ?? (isPet ? pet.color : head.chestColor) ?? 0xffffff;

    const text = useMemo(() => resolveChatBubbleText(data, userName, t), [ data, userName, t ]);
    const content = useMemo(() => (style ? buildChatBubbleMarkup(text, userName, data.chatType, style, data.links ?? EMPTY_LINKS) : undefined), [ style, text, userName, data.chatType, data.links ]);

    const margins = style?.textFieldMargins;
    const wrapWidth = margins ? ((maxWidth - margins.x) - margins.width) : maxWidth;
    const render = useChatBubbleText(content?.markup ?? '', style?.fontFace ?? 'Ubuntu', scaleChatFontSize(style?.fontSize, fontSizeScale), style?.textColor ?? 0, wrapWidth);

    const layout = useMemo(() => (style
        ? computeChatBubbleLayout({
                style,
                textWidth: render?.textWidth ?? 0,
                textHeight: render?.textHeight ?? 0,
                lineCount: render?.lineCount ?? 1,
                maxWidth,
                pointerHeight: style.pointerTexture?.height ?? 0,
                faceWidth: faceTexture?.width,
                faceHeight: faceTexture?.height,
                fontSizeScale,
                displayFontSizeScale,
            })
        : undefined), [ style, render, maxWidth, faceTexture, fontSizeScale, displayFontSizeScale ]);

    const backgroundTexture = useChatBackgroundTexture(style, color);

    // Flash kept the bottom rows of an over-tall head: a sub-frame of the head texture, owned here.
    const shownFaceTexture = useMemo(() => {
        if (!faceTexture || !layout?.face) return undefined;

        if (layout.face.cropTop <= 0) return faceTexture;

        return new Texture({
            source: faceTexture.source,
            frame: new Rectangle(faceTexture.frame.x, faceTexture.frame.y + layout.face.cropTop, faceTexture.width, layout.face.height),
        });
    }, [ faceTexture, layout ]);

    useEffect(() => () => {
        if (shownFaceTexture && (shownFaceTexture !== faceTexture)) shownFaceTexture.destroy(false);
    }, [ shownFaceTexture, faceTexture ]);

    return { style, layout, backgroundTexture, shownFaceTexture, render, content };
};
