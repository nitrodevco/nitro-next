import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useOwnUserInfo = () => useUserContext(useShallow(x => ({
    userId: x.userId,
    name: x.name,
    figure: x.figure,
    sex: x.sex,
    customData: x.customData,
    realName: x.realName,
    directMail: x.directMail,
    respectTotal: x.respectTotal,
    respectLeft: x.respectLeft,
    petRespectLeft: x.petRespectLeft,
    streamPublishingAllowed: x.streamPublishingAllowed,
    lastAccessDate: x.lastAccessDate,
    nameChangeAllowed: x.nameChangeAllowed,
    accountSafetyLocked: x.accountSafetyLocked,
})));