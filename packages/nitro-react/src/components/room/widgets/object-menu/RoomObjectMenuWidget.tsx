import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectUserType, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { ReactNode, useState } from 'react';

import { useOwnRoomObjectId, useRoom, useRoomBotsActions, useRoomFurnitureContextMenu, useRoomIsPlayingGame, useRoomObjectIdByWebId, useRoomStore } from '#base/context/room';
import { useWiredStore } from '#base/context/wired';
import { useRoomEventDispatcher } from '#base/hooks';
import { FurnitureContextMenuView } from '#base/views/room-widgets/furniture/FurnitureContextMenuView';
import { DecorateModeBubbleView } from '#base/views/room-widgets/object-menu/DecorateModeBubbleView';
import { InfoBubbleAvatarView } from '#base/views/room-widgets/object-menu/InfoBubbleAvatarView';
import { InfoBubbleOwnAvatarView } from '#base/views/room-widgets/object-menu/InfoBubbleOwnAvatarView';
import { InfoBubbleRentableBotView } from '#base/views/room-widgets/object-menu/InfoBubbleRentableBotView';

import { RoomObjectMenuBubble } from './RoomObjectMenuBubble';
import { RoomObjectMenuNameBubble } from './RoomObjectMenuNameBubble';
import { RoomObjectMenuPet } from './RoomObjectMenuPet';

/**
 * Everything that sits over a room object - `AvatarInfoWidget` and the furniture context menus.
 *
 * Selecting a unit opens its menu: your own, another user's, a pet's or a rentable bot's; a plain
 * bot only ever gets its name. Hovering shows a name bubble, but not while a menu is up. While you
 * decorate, your own avatar carries the decorate bubble instead of a menu.
 *
 * While the room's wired listens for clicks on users (`hasClickUserWired`), a unit's menu is held
 * back (`maybeSetupMenuView`) until the server answers the reported click
 * (`WIRED_USER_CLICK_HANDLED`) with `openMenu` for that same unit (`onUserClickHandledEvent`).
 * While the room is playing a game - a game arena, or wired click settings that make it one
 * (`isGameMode`: `RoomEngine.getActiveRoomIsPlayingGame`) - users, pets and rentable bots open no
 * menu at all.
 */
export const RoomObjectMenuWidget = () => {
    const [ selectedData, setSelectedData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const [ hoverData, setHoverData ] = useState<ISimpleRoomObjectData | undefined>(undefined);
    const room = useRoom();
    const ownRoomObjectId = useOwnRoomObjectId();
    const contextMenu = useRoomFurnitureContextMenu();
    const isDecorating = useRoomStore(x => x.isDecorating);
    const isPlayingGame = useRoomIsPlayingGame();
    const forcedBotMenuId = useRoomStore(x => x.forcedBotMenuId);
    // The room object's type is a pet's breed name, not its kind; the user list knows the kind.
    const selectedUserType = useRoomStore(x => (selectedData ? x.usersByRoomObjectId[selectedData.objectId]?.userType : undefined));
    const { setForcedBotMenuId } = useRoomBotsActions();
    const forcedBotObjectId = useRoomObjectIdByWebId(forcedBotMenuId ?? -1, RoomObjectUserType.RentableBot);
    const hasClickUserWired = useWiredStore(x => x.hasClickUserWired);
    const userClickHandled = useWiredStore(x => x.userClickHandled);
    // `§_-M2g§`: the room index whose menu waits for the server's answer.
    const [ heldMenuIndex, setHeldMenuIndex ] = useState<number | undefined>(undefined);
    const [ seenClickAnswer, setSeenClickAnswer ] = useState(userClickHandled?.sequence ?? 0);

    // `onUserClickHandledEvent`: an answer with `openMenu` for the held unit lets its menu open.
    if (userClickHandled && (userClickHandled.sequence !== seenClickAnswer)) {
        setSeenClickAnswer(userClickHandled.sequence);

        if (userClickHandled.openMenu && (heldMenuIndex === userClickHandled.index)) setHeldMenuIndex(undefined);
    }

    // `RWRBFOCME_OPEN`: the server asked for a bot's menu, so it opens as if the bot were clicked.
    if ((forcedBotMenuId !== undefined) && (forcedBotObjectId !== undefined)) {
        setForcedBotMenuId(undefined);
        setSelectedData({ objectId: forcedBotObjectId, category: RoomObjectCategoryEnum.Unit });
    }

    const onClose = () => setSelectedData(undefined);

    useRoomEventDispatcher(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, () => setSelectedData(undefined));

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([ RoomWidgetUpdateRoomObjectEvent.USER_REMOVED, RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED ], (event) => {
        if (selectedData && (selectedData.objectId === event.objectId) && (selectedData.category === event.category)) setSelectedData(undefined);
    });

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED, (event) => {
        setSelectedData({ objectId: event.objectId, category: event.category });
        setHoverData(undefined);
        setHeldMenuIndex((hasClickUserWired && (Number(event.category) === Number(RoomObjectCategoryEnum.Unit))) ? event.objectId : undefined);
    });

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER, (event) => {
        if (selectedData || (event.category !== RoomObjectCategoryEnum.Unit)) return;

        setHoverData({ objectId: event.objectId, category: event.category });
    });

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT, (event) => {
        if (!hoverData || (event.category !== RoomObjectCategoryEnum.Unit) || (hoverData.objectId !== event.objectId)) return;

        setHoverData(undefined);
    });

    // Someone leaving takes their menu and their name with them.
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.USER_REMOVED, (event) => {
        if (selectedData?.objectId === event.objectId) setSelectedData(undefined);
        if (hoverData?.objectId === event.objectId) setHoverData(undefined);
    });

    if (!room) return null;

    const renderSelected = () => {
        if (!selectedData || (selectedData.objectId < 0)) return null;

        switch (selectedData.category) {
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall: {
                // Selecting furniture asks its logic for a context menu; only some kinds offer one.
                if (!contextMenu || (contextMenu.objectId !== selectedData.objectId) || (contextMenu.category !== selectedData.category)) return null;

                return (
                    <RoomObjectMenuBubble objectData={selectedData}>
                        <FurnitureContextMenuView
                            objectData={selectedData}
                            menu={contextMenu.menu}
                            onClose={onClose}
                        />
                    </RoomObjectMenuBubble>
                );
            }
            case RoomObjectCategoryEnum.Unit: {
                const userType = selectedUserType;

                if (userType === undefined) return null;

                // `isGameMode()` - `updateUserView` / `updatePetView` / `updateRentableBotView` set no menu up.
                if (isPlayingGame && (userType !== RoomObjectUserType.Bot)) return null;

                // `maybeSetupMenuView` - a plain bot has no menu to hold, only its name.
                if ((heldMenuIndex === selectedData.objectId) && (userType !== RoomObjectUserType.Bot)) return null;

                const bubble = (children: ReactNode) => (
                    <RoomObjectMenuBubble
                        objectData={selectedData}
                        userType={userType}
                    >
                        {children}
                    </RoomObjectMenuBubble>
                );

                switch (userType) {
                    case RoomObjectUserType.Pet:
                        return bubble(
                            <RoomObjectMenuPet
                                objectData={selectedData}
                                onClose={onClose}
                            />,
                        );
                    case RoomObjectUserType.RentableBot:
                        return bubble(
                            <InfoBubbleRentableBotView
                                objectData={selectedData}
                                onClose={onClose}
                            />,
                        );
                    case RoomObjectUserType.Bot:
                        // A bot has nothing to offer but its name.
                        return <RoomObjectMenuNameBubble objectData={selectedData} />;
                    case RoomObjectUserType.User:
                        if (selectedData.objectId === ownRoomObjectId) {
                            // Decorating, your own avatar wears the decorate bubble rather than a menu.
                            if (isDecorating) return null;

                            return bubble(
                                <InfoBubbleOwnAvatarView
                                    objectData={selectedData}
                                    onClose={onClose}
                                />,
                            );
                        }

                        return bubble(
                            <InfoBubbleAvatarView
                                objectData={selectedData}
                                onClose={onClose}
                            />,
                        );
                }

                return null;
            }
        }

        return null;
    };

    return (
        <>
            {isDecorating && (ownRoomObjectId >= 0) && (
                <RoomObjectMenuBubble
                    objectData={{ objectId: ownRoomObjectId, category: RoomObjectCategoryEnum.Unit }}
                    userType={RoomObjectUserType.User}
                >
                    <DecorateModeBubbleView />
                </RoomObjectMenuBubble>
            )}
            {(hoverData && !isDecorating) ? <RoomObjectMenuNameBubble objectData={hoverData} /> : renderSelected()}
        </>
    );
};
