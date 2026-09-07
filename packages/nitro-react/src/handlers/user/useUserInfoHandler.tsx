import { ChangeUserNameResultMessageCode } from '@nitrodevco/nitro-api';
import { AccountPreferencesEventMessage, ChangeUserNameResultMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, NoobnessLevelMessage, PetRespectFailedMessage, UserNameChangedMessage, UserObjectMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';

import { useOwnUserId, useUserActions, useUserInfoActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

export const useUserInfoHandler = () => {
    const userId = useOwnUserId();
    const { setRights, setNoobnessLevel, increasePetRespects, decreasePetRespects, setChatPreferences } = useUserActions();
    const { setUserInfo, setName, setFigure, setEmailVerified } = useUserInfoActions();

    useMessageListener(FigureUpdateEventMessage, (data) => {
        setFigure(data.figure, data.gender);
    });

    useMessageListener(UserObjectMessage, (data) => {
        setUserInfo(data.userInfo);
    });

    useMessageListener(NoobnessLevelMessage, (data) => {
        setNoobnessLevel(data.noobnessLevel);
    });

    useMessageListener(UserRightsMessage, (data) => {
        setRights(data.clubLevel, data.securityLevel, data.isAmbassador);
    });

    useMessageListener(PetRespectFailedMessage, (data) => {
        decreasePetRespects();
    });

    useMessageListener(ChangeUserNameResultMessage, (data) => {
        if (data.resultCode !== ChangeUserNameResultMessageCode.NameOk) return;

        setName(data.name, false);
    });

    useMessageListener(UserNameChangedMessage, (data) => {
        if (data.webId !== userId) return;

        setName(data.newName, false);
    });

    useMessageListener(EmailStatusResultEventMessage, (data) => {
        setEmailVerified(data.isVerified);
    });

    useMessageListener(AccountPreferencesEventMessage, (data) => {
        setChatPreferences({
            preferredChatStyle: data.preferedChatStyle,
            freeFlowChatDisabled: data.freeFlowChatDisabled,
            chatSizePreference: data.chatSizePreference,
            chatMode: data.chatMode,
            chatBubbleWidth: data.chatBubbleWidth,
            chatScrollSpeed: data.chatScrollSpeed,
        });
    });
};
