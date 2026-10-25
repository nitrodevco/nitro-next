import { useCallback } from 'react';

import { configReader } from '#base/utils/configReader';

import { useConfigData } from './useConfigData';

/**
 * A user badge's image: `badge.asset.url` with `%badgename%` the badge code, read as Flash's
 * `getProperty` reads it (`${key}` placeholders filled) - what `badgeImageUrl` is outside React.
 */
export const useBadgeImageUrl = () => {
    const config = useConfigData();

    return useCallback((code: string) => configReader(config).configString('badge.asset.url').replace('%badgename%', code), [ config ]);
};

/** A group badge's image: `badge.asset.group.url` with `%badgedata%` the badge data string. */
export const useGroupBadgeImageUrl = () => {
    const config = useConfigData();

    return useCallback((code: string) => configReader(config).configString('badge.asset.group.url').replace('%badgedata%', code), [ config ]);
};
