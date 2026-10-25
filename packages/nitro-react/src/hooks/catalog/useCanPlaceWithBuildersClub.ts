/**
 * `IHabboCatalog.canPlaceWithBC` for a view outside the catalogue - the infostand's place more
 * button (`InfoStandFurniView.update`). Flash asks it each time the stand updates; here it is asked
 * again each second (`useSecondsClock`), as the membership it reads counts down by the clock, which
 * also catches a change of the room's rights or users within the second.
 */
import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

import { canPlaceWithBuildersClub } from '#base/commands';
import { getCatalogStore } from '#base/context/catalog';

import { useSecondsClock } from '../useSecondsClock';

export const useCanPlaceWithBuildersClub = (): boolean => {
    const clockMs = useSecondsClock();

    return canPlaceWithBuildersClub(getCatalogStore(CatalogTypeEnum.BuildersClub), clockMs);
};
