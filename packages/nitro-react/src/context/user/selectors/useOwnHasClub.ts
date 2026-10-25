import { ClubLevelEnum } from '@nitrodevco/nitro-api';

import { useOwnClubLevel } from './useOwnClubLevel';

/** `SessionDataManager.hasClub`: whether the user has Habbo Club, or better. */
export const useOwnHasClub = () => {
    const ownClubLevel = useOwnClubLevel();

    return ownClubLevel >= ClubLevelEnum.Club;
};
