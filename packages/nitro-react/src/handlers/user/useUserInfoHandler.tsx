import { ChangeUserNameResultMessageCode } from "@nitrodevco/nitro-api";
import { ChangeUserNameResultMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, NoobnessLevelMessage, PetRespectFailedMessage, UserNameChangedMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-shared";

import { useOwnUserId, useUserInfoActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useUserInfoHandler = () => {
    const userId = useOwnUserId();
    const { setUserInfo, setName, setFigure, setEmailVerified, setRights, setNoobnessLevel, increasePetRespects, decreasePetRespects } = useUserInfoActions();

    useMessageListener(FigureUpdateEventMessage, data => {
        setFigure(data.figure, data.gender);
    });

    useMessageListener(UserObjectMessage, data => {
        setUserInfo(data.userInfo);
    });

    useMessageListener(NoobnessLevelMessage, data => {
        setNoobnessLevel(data.noobnessLevel);
    });

    useMessageListener(UserRightsMessage, data => {
        setRights(data.clubLevel, data.securityLevel, data.isAmbassador);
    });

    useMessageListener(PetRespectFailedMessage, data => {
        decreasePetRespects();
    });

    useMessageListener(ChangeUserNameResultMessage, data => {
        if (data.resultCode !== ChangeUserNameResultMessageCode.NameOk) return;

        setName(data.name, false);
    });

    useMessageListener(UserNameChangedMessage, data => {
        if (data.webId !== userId) return;

        setName(data.newName, false);
    });

    useMessageListener(EmailStatusResultEventMessage, data => {
        setEmailVerified(data.isVerified);
    });
}