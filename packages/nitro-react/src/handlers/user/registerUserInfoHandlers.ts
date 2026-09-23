import { ChangeUserNameResultMessageCode } from '@nitrodevco/nitro-api';
import { AccountPreferencesEventMessage, ChangeUserNameResultMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, GetUserNftChatStylesComposer, NoobnessLevelMessage, PetRespectFailedMessage, UserNameChangedMessage, UserNftChatStylesMessage, UserObjectMessage, UserPurchasableChatStyleChangedMessage, UserPurchasableChatStylesMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';

import { clampChatFontSizeMode } from '#base/chat';
import { WebSocketConnection } from '#base/context/communication';
import { SOUND_VOLUME_SCALE, userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Who you are - Flash's `SessionDataManager`: the user object at login, figure and name changes,
 * rights, noobness level, email status, the account preferences and the chat styles the account
 * owns (NFT and bought ones, which the chat input's style picker offers). Also counts pet
 * respects down, since the server only reports a failure.
 */
export const registerUserInfoHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setRights, setNoobnessLevel, increasePetRespects, decreasePetRespects, setChatPreferences, setSoundVolumes, setUiFlags, setRoomCameraFollowDisabled, setRoomInvitesIgnored, setOnlineIndicatorPreference, setUserInfo, setName, setFigure, setEmailVerified, setNftChatStyles, setPurchasableChatStyles, setPurchasableChatStyleOwned } = userStore.getState();

    return subscribeAll(subscribe, [
        on(FigureUpdateEventMessage, (data) => {
            setFigure(data.figure, data.gender);
        }),

        on(UserObjectMessage, (data) => {
            setUserInfo(data.userInfo);
            // `SessionDataManager.initSessionData`.
            send(new GetUserNftChatStylesComposer({}));
        }),

        on(UserNftChatStylesMessage, (data) => {
            setNftChatStyles(data.chatStyleIds);
        }),

        on(UserPurchasableChatStylesMessage, (data) => {
            setPurchasableChatStyles(data.chatStyleIds);
        }),

        on(UserPurchasableChatStyleChangedMessage, (data) => {
            setPurchasableChatStyleOwned(data.styleId, data.added);
        }),

        on(NoobnessLevelMessage, (data) => {
            setNoobnessLevel(data.noobnessLevel);
        }),

        on(UserRightsMessage, (data) => {
            setRights(data.clubLevel, data.securityLevel, data.isAmbassador);
        }),

        on(PetRespectFailedMessage, (data) => {
            decreasePetRespects();
        }),

        on(ChangeUserNameResultMessage, (data) => {
            if (data.resultCode !== ChangeUserNameResultMessageCode.NameOk) return;

            setName(data.name, false);
        }),

        on(UserNameChangedMessage, (data) => {
            if (data.webId !== userStore.getState().userId) return;

            setName(data.newName, false);
        }),

        on(EmailStatusResultEventMessage, (data) => {
            setEmailVerified(data.isVerified);
        }),

        on(AccountPreferencesEventMessage, (data) => {
            setUiFlags(data.uiFlags);
            /*
             * `HabboSoundManagerFlash10.onSoundSettingsEvent`: each percentage is scaled back to
             * 0..1, and a `uiVolume` of exactly 1 is read as 100 - an old stored value that would
             * otherwise mute the client's own sounds to a hundredth.
             */
            setSoundVolumes(
                ((data.uiVolume === 1) ? SOUND_VOLUME_SCALE : data.uiVolume) / SOUND_VOLUME_SCALE,
                data.furniVolume / SOUND_VOLUME_SCALE,
                data.traxVolume / SOUND_VOLUME_SCALE,
            );
            setRoomCameraFollowDisabled(data.roomCameraFollowDisabled);
            setRoomInvitesIgnored(data.roomInvitesIgnored);
            setOnlineIndicatorPreference(data.onlineIndicatorPreference);
            setChatPreferences({
                preferredChatStyle: data.preferedChatStyle,
                freeFlowChatDisabled: data.freeFlowChatDisabled,
                // `HabboFreeFlowChat.onAccountPreferences`: `clampChatFontSizeMode(chatSizePreference)`.
                chatSizePreference: clampChatFontSizeMode(data.chatSizePreference),
                chatMode: data.chatMode,
                chatBubbleWidth: data.chatBubbleWidth,
                chatScrollSpeed: data.chatScrollSpeed,
            });
        }),
    ]);
};
