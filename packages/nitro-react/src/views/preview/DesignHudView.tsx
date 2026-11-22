/**
 * The room screen in the preview host's design window (`window: 'design'`, template `hud`): every piece
 * of the HUD a player sees in a room, where they see it, drawn by the game's own views with sample state
 * - the bottom bar with its icons and the friend bar, the purse, the chat input and two lines said, the
 * room tools with the room's name card, a notification bubble, the furni infostand, and by the state the
 * user infostand, the Me menu or the room info. Each piece is its own template window, so a press names the window it hit
 * (`select`'s `part`) and a patch made from it changes that window. Nothing is sent. Not a Flash feature.
 */
import { AvatarGenderType, IRoom, IRoomUserData, RoomChatTypeEnum, RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { useEffect, useLayoutEffect } from 'react';

import { ChatBubbleData } from '#base/chat';
import { roomStore } from '#base/context/room';
import { systemStore, useTranslation } from '#base/context/system';
import { UiFlagEnum, userStore } from '#base/context/user';
import { useChatBubbleVisual } from '#base/hooks';
import { Box } from '#base/theme';
import { NotificationsBubble } from '#base/views/notifications/NotificationsBubble';
import { PurseTemplateView } from '#base/views/purse/PurseTemplateView';
import { ChatBubbleBody } from '#base/views/room-widgets/chat/ChatBubbleBody';
import { RoomChatInputView } from '#base/views/room-widgets/chat-input/RoomChatInputView';
import { InfostandUserView } from '#base/views/room-widgets/object-infostand/InfostandUserView';
import { RoomInfoView } from '#base/views/room-widgets/room-info/RoomInfoView';
import { ROOM_TOOLS_INFO_MARGIN, roomToolsRight } from '#base/views/room-widgets/room-tools/roomToolsGeometry';
import { RoomToolsInfoView } from '#base/views/room-widgets/room-tools/RoomToolsInfoView';
import { RoomToolsView } from '#base/views/room-widgets/room-tools/RoomToolsView';
import { ToolbarView } from '#base/views/toolbar/ToolbarView';

import { SAMPLE_FRIENDS } from './DesignFriendListView';
import { DesignInfostandView } from './DesignInfostandView';
import { designState, HUD_WINDOW } from './designStates';

const none = () => undefined;

/** Activity point types: duckets (0) and diamonds (5). */
const ACTIVITY_POINTS = { 0: 1250, 5: 75 };

const FIGURE = 'hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64';

const ROOM_NAME = 'Sunset Cafe';
const ROOM_TAGS = [ 'cafe', 'chill' ];

/** The user the user infostand shows: in the room as object 1 (`RoomUsersEvent`). */
const SAMPLE_USER_OBJECT = 1;

const SAMPLE_USER = {
    id: SAMPLE_USER_OBJECT, objectId: SAMPLE_USER_OBJECT, category: RoomObjectCategoryEnum.Unit, name: 'Bonnie', userType: RoomObjectUserType.User, gender: AvatarGenderType.Female,
    figure: 'hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68', custom: 'Coffee first', webID: 1, activityPoints: 1250, groupId: 0, groupName: '', groupStatus: 0, ownerId: 0, ownerName: '',
    rarityLevel: 0, hasSaddle: false, isRiding: false, canBreed: false, canHarvest: false, canRevive: false, hasBreedingPermission: false, petLevel: 0, petPosture: '', botSkills: [], isModerator: false,
} as IRoomUserData;

/**
 * A room the HUD's views belong to - the chat input is drawn only in one (`RoomUI` creates it with the session) - with the
 * sample user's avatar in it as far as the infostand reads it (its model holds nothing: no rights, carries nothing, stands).
 */
const SAMPLE_ROOM = {
    roomId: 1,
    eventDispatcher: { addEventListener: () => undefined, removeEventListener: () => undefined },
    getRoomObject: (objectId: number) => ((objectId === SAMPLE_USER_OBJECT) ? { instanceId: 1, model: { updateCounter: 0, getValue: () => undefined } } : undefined),
} as unknown as IRoom;

/** The lines said, each where the room's chat draws it: from the top, a bubble's height apart. */
const LINES: { name: string; text: string; color: number; x: number; y: number }[] = [
    { name: 'Bonnie', text: 'Welcome to the cafe!', color: 0xe8b26a, x: 330, y: 60 },
    { name: 'Frank', text: 'Anyone up for a game?', color: 0x7fb2e5, x: 420, y: 86 },
];

/** A sample line as the room's chat gives it a bubble (`RoomChatBubbles`): the default style, a forced speaker. */
const lineData = (index: number): ChatBubbleData => ({
    id: -100 - index, roomId: 1, objectId: -1, text: LINES[index].text, chatType: RoomChatTypeEnum.Speak, styleId: 0, links: [], userLocation: undefined,
    timestamp: 0, extraParam: 0, forcedUserName: LINES[index].name, forcedFigure: FIGURE, forcedColor: LINES[index].color,
});

const ChatLine = ({ index }: { index: number }) => {
    const { style, layout, backgroundTexture, shownFaceTexture, render } = useChatBubbleVisual(lineData(index), 350);

    if (!style || !layout || !backgroundTexture) return null;

    return (
        <pixiContainer
            x={LINES[index].x}
            y={LINES[index].y}
            eventMode="none"
        >
            <ChatBubbleBody
                style={style}
                layout={layout}
                backgroundTexture={backgroundTexture}
                shownFaceTexture={shownFaceTexture}
                render={render}
            />
        </pixiContainer>
    );
};

/** The stores as the packets would fill them in a room, put back as they were when the view goes. */
const useRoomSample = () => {
    useLayoutEffect(() => {
        const ownUser = userStore.getState();
        const ownSystem = systemStore.getState();
        const ownRoom = roomStore.getState();

        ownUser.processFriends(SAMPLE_FRIENDS);
        userStore.setState({
            name: 'Me',
            figure: FIGURE,
            // The friend bar open, its friends' tabs shown (`setFriendBarState`).
            uiFlags: ownUser.uiFlags | UiFlagEnum.FriendBarExpanded,
            credits: 3820,
            activityPoints: ACTIVITY_POINTS,
            clubSubscription: { clubDays: 23, clubPeriods: 2, isVip: true, pastClubDays: 400, pastVipDays: 400, isExpiring: false, minutesUntilExpiration: 33120, minutesSinceLastModified: 0 },
        });
        systemStore.setState({ landingViewVisible: false });
        roomStore.setState({ room: SAMPLE_ROOM, usersByRoomObjectId: { [SAMPLE_USER_OBJECT]: SAMPLE_USER } });

        return () => {
            roomStore.setState(ownRoom, true);
            systemStore.setState({ landingViewVisible: ownSystem.landingViewVisible, toolbarMenu: undefined });
            userStore.setState(ownUser, true);
        };
    }, []);
};

export const DesignHudView = ({ state }: { state: string }) => {
    const shown = designState(HUD_WINDOW, state)?.tab ?? 'room';
    const t = useTranslation();

    useRoomSample();

    // The Me menu opens as its icon opens it.
    useEffect(() => {
        systemStore.getState().setToolbarMenu((shown === 'memenu') ? 'me' : undefined);
    }, [ shown ]);

    return (
        <>
            {LINES.map((line, index) => (
                <ChatLine
                    key={line.name}
                    index={index}
                />
            ))}
            {/* `extension_grid`'s place (`MainView`): top right, the purse's -38 taken in as padding. */}
            <Box layout={{ position: 'absolute', top: 0, right: 0, marginRight: 3, width: 230, paddingLeft: 38, flexDirection: 'column', alignItems: 'flex-start' }}>
                <PurseTemplateView />
            </Box>
            <NotificationsBubble
                item={{ key: 1, text: t('notifications.friend_online', '', { name: 'Frank' }), style: 'friendonline', layout: 'friendonline', image: undefined, internalLink: undefined, options: { figure: FIGURE }, fading: false }}
                frame={{ margin: 230, swipe: 0, blend: 1 }}
                zIndex={0}
                onHover={none}
                onClick={none}
                onSwipe={none}
                isDisplayed={() => true}
                onMeasure={none}
            />
            <RoomToolsView
                buttons={[ 'button_settings', 'button_chat_history', 'button_like', 'button_camera', 'button_share' ].map(key => ({ key, onPress: none }))}
                zoomLevel={1}
                canZoomIn
                canZoomOut={false}
                onZoomIn={none}
                onZoomOut={none}
                canGoBack
                canGoForward={false}
                canOpenHistory
                onGoBack={none}
                onGoForward={none}
                onToggleHistory={none}
                collapsed={false}
                onToggleCollapsed={none}
            />
            <RoomToolsInfoView
                open
                roomName={ROOM_NAME}
                ownerLine="By Bonnie"
                tags={ROOM_TAGS}
                left={roomToolsRight(false) + ROOM_TOOLS_INFO_MARGIN}
                onSelectTag={none}
                onPress={none}
            />
            {(shown === 'roominfo') && (
                <RoomInfoView
                    roomName={ROOM_NAME}
                    description="Coffee, cake and good company."
                    ownerName="Bonnie"
                    showOwner
                    tags={ROOM_TAGS}
                    rating={12}
                    ranking={0}
                    thumbnailUrl=""
                    showThumbnail={false}
                    canAddThumbnail={false}
                    onAddThumbnail={none}
                    showEmbed={false}
                    embedSrc=""
                    groupId={0}
                    groupName=""
                    groupBadgeUrl=""
                    onGroupInfo={none}
                    isHome={false}
                    isFavourite={false}
                    canFavourite
                    canRate
                    canEditRoomSettings={false}
                    canEditRoomFilter={false}
                    canStaffPick={false}
                    isStaffPicked={false}
                    canMuteAll={false}
                    allInRoomMuted={false}
                    canEditFloorPlan={false}
                    canManageRaidProtection={false}
                    canReport
                    canRemoveRights={false}
                    onOpenOwnerProfile={none}
                    onSelectTag={none}
                    onRate={none}
                    onToggleFavourite={none}
                    onMakeHome={none}
                    onRemoveRights={none}
                    onRoomSettings={none}
                    onRaidProtection={none}
                    onRoomFilter={none}
                    onReport={none}
                    onFloorPlanEditor={none}
                    onToggleStaffPick={none}
                    onMuteAll={none}
                    onClose={none}
                />
            )}
            {(shown === 'user') && (
                // The infostand's corner (`RoomWidgets`): bottom right, over the toolbar.
                <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                    <InfostandUserView
                        objectData={{ objectId: SAMPLE_USER_OBJECT, category: RoomObjectCategoryEnum.Unit }}
                        onClose={none}
                    />
                </Box>
            )}
            {((shown === 'room') || (shown === 'roominfo')) && <DesignInfostandView state="visitor" />}
            <ToolbarView />
            {/* Drawn after the toolbar because it sits inside it when it fits (`MainView`). */}
            <RoomChatInputView />
        </>
    );
};
