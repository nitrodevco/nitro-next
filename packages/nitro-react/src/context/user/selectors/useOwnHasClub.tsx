import { ClubLevelEnum } from "@nitrodevco/nitro-api";

import { useOwnClubLevel } from "./useOwnClubLevel";

export const useOwnHasClub = () => {
    const ownClubLevel = useOwnClubLevel();

    return ownClubLevel >= ClubLevelEnum.Club;
}