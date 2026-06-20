import type { UserStore } from "../UserStore";

export type UserInfoActions = {
    setUserInfo: UserStore['setUserInfo'];
    setName: UserStore['setName'];
    setFigure: UserStore['setFigure'];
    setAccountSafetyLocked: UserStore['setAccountSafetyLocked'];
    setEmailVerified: UserStore['setEmailVerified'];
    setTags: UserStore['setTags'];
    setRights: UserStore['setRights'];
    setNoobnessLevel: UserStore['setNoobnessLevel'];
    increasePetRespects: UserStore['increasePetRespects'];
    decreasePetRespects: UserStore['decreasePetRespects'];
}

export const extractUserInfoActions = (store: UserStore) => ({
    setUserInfo: store.setUserInfo,
    setName: store.setName,
    setFigure: store.setFigure,
    setAccountSafetyLocked: store.setAccountSafetyLocked,
    setEmailVerified: store.setEmailVerified,
    setTags: store.setTags,
    setRights: store.setRights,
    setNoobnessLevel: store.setNoobnessLevel,
    increasePetRespects: store.increasePetRespects,
    decreasePetRespects: store.decreasePetRespects,
});