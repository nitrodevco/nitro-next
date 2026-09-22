/**
 * The window each catalogue type is shown in. Flash's `HabboCatalog` keeps one
 * `CatalogWindowState` per type, each with its own main window - `catalog_ubuntu_with_tabs` for
 * the normal catalogue, and `catalog_ubuntu` (no tabs, 15px taller) for the Builders Club one,
 * as `useNonTabbedCatalog("BUILDERS_CLUB")` answers - and `toggleCatalog(type)` shows one and
 * hides the other. Here each is a registered window (`WindowRegistry`), opened with the same
 * params (`CatalogViewWindowParams`).
 */
import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

export type CatalogWindowName = 'catalog' | 'builders_catalog';

export const getCatalogWindowName = (catalogType: CatalogTypeEnum): CatalogWindowName => ((catalogType === CatalogTypeEnum.BuildersClub) ? 'builders_catalog' : 'catalog');

/** `HabboCatalog.useNonTabbedCatalog`: the Builders Club catalogue has no tabs (`client.desktop.use.non.tabbed.catalog` is not set for the hotel). */
export const isNonTabbedCatalog = (catalogType: CatalogTypeEnum): boolean => (catalogType === CatalogTypeEnum.BuildersClub);

/**
 * Whether `catalogType` is the catalogue `HabboCatalog` currently answers for (`§_-52q§`, the type
 * `toggleCatalog` last set active): the Builders Club one while its window is showing, the normal
 * one otherwise. Both windows' stores hear every catalogue packet; the ones Flash answers once - an
 * alert, the lazy offer for the page on show - are answered by this one only.
 */
export const isActiveCatalogType = (catalogType: CatalogTypeEnum, visibleWindows: Partial<Record<CatalogWindowName, unknown>>): boolean => {
    const buildersVisible = !!visibleWindows.builders_catalog;

    return (catalogType === CatalogTypeEnum.BuildersClub) ? buildersVisible : !buildersVisible;
};
