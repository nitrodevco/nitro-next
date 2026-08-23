import { SecurityLevelEnum } from '@nitrodevco/nitro-api';

import { useOwnSecurityLevel } from './useOwnSecurityLevel';

export const useOwnIsModerator = () => {
    const securityLevel = useOwnSecurityLevel();

    return securityLevel >= SecurityLevelEnum.Moderator;
};
