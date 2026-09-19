import { ChangeUserNameResultMessageCode } from '@nitrodevco/nitro-api';
import { AccountPreferencesEventMessage, ChangeUserNameResultMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, NoobnessLevelMessage, PetRespectFailedMessage, UserNameChangedMessage, UserObjectMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Who you are - Flash's `SessionDataManager`: the user object at login, figure and name changes,
 * rights, noobness level, email status and the account preferences. Also counts pet respects
 * down, since the server only reports a failure.
 */
export const registerUserInfoHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setRights, setNoobnessLevel, increasePetRespects, decreasePetRespects, setChatPreferences, setUiFlags, setUserInfo, setName, setFigure, setEmailVerified } = userStore.getState();

    return subscribeAll(subscribe, [
        on(FigureUpdateEventMessage, (data) => {
            setFigure(data.figure, data.gender);
        }),

        on(UserObjectMessage, (data) => {
            setUserInfo(data.userInfo);
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
            setChatPreferences({
                preferredChatStyle: data.preferedChatStyle,
                freeFlowChatDisabled: data.freeFlowChatDisabled,
                chatSizePreference: data.chatSizePreference,
                chatMode: data.chatMode,
                chatBubbleWidth: data.chatBubbleWidth,
                chatScrollSpeed: data.chatScrollSpeed,
            });
        }),
    ]);
};
