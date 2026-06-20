import { ChangeUserNameResultMessageCode } from "@nitrodevco/nitro-api";
import { ChangeUserNameResultMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, NoobnessLevelMessage, PetRespectFailedMessage, UserNameChangedMessage, UserObjectMessage, UserRightsMessage } from "@nitrodevco/nitro-shared";
import { useShallow } from "zustand/shallow";

import { useSessionStore } from "#base/stores";

import { useMessageListener } from "../hooks/events";

export const useSessionHandler = () => {
    const [userId, setUserInfo, setName, setFigure, setRights, setNoobnessLevel, increasePetRespects, decreasePetRespects, setEmailVerified] = useSessionStore(useShallow(x => [x.userId, x.setUserInfo, x.setName, x.setFigure, x.setRights, x.setNoobnessLevel, x.increasePetRespects, x.decreasePetRespects, x.setEmailVerified]));

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