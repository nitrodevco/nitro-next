import { SecurityLevelEnum } from "@nitrodevco/nitro-api";

import { useUserContext } from "../useUserContext";

export const useIsModerator = () => useUserContext(x => x.securityLevel >= SecurityLevelEnum.Moderator);