import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useUserActions = () => useUserContext(useShallow(x => ({
    setTags: x.setTags,
    setRights: x.setRights,
    setNoobnessLevel: x.setNoobnessLevel,
    increasePetRespects: x.increasePetRespects,
    decreasePetRespects: x.decreasePetRespects,
})));