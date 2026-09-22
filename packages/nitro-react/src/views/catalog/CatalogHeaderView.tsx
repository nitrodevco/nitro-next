import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { refreshBuilderStatus, updateBuilderStatus } from '#base/commands';
import { CATALOG_HEADER_DESCRIPTION, CATALOG_HEADER_IMAGE, CatalogPage, getCatalogPageImage, getCatalogPageText, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Region, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

/** `HabboCatalog.update` runs every frame; the builder status refreshes at most every 500 ms of it. */
const BUILDER_STATUS_UPDATE_INTERVAL = 500;

/** `refreshBuilderStatus` sets every status value as `<font color="#ff8d00"><b>value</b></font>`. */
const builderStatusValue = (value: string) => `<font color="#ff8d00"><b>${value}</b></font>`;

/**
 * The catalogue header, `catalog.header.background.border` of `catalog_ubuntu_with_tabs.xml`: the
 * page's header image (`catalog.header.image`, zoomed 2x, greyscale at blend 0.1) over the two
 * background fills, the node's icon zoomed 2x, and the mode header.
 *
 * `LocalizationCatalogWidget.initLocalizables` fills it through `PageLocalization`:
 * `catalog.header.title` is the node's localization (the search header on a search page),
 * `catalog.header.description` and `catalog.header.image` whichever of the page's texts and images
 * the layout sends there (the first of each on most layouts, none on `info_duckets`). `HabboCatalog.setCatalogMode` picks the fill colours and
 * shows `catalog.mode.header` or `builder.mode.header`.
 *
 * The builder header is `HabboCatalog.refreshBuilderStatus`'s: the title names the status (member,
 * grace period or trial), `builder.header.status.membership` the time the membership or its grace
 * period has left (`FriendlyTime`, or the status name for a trial) and `builder.header.status.limit`
 * the furni placed against the limit, each value in bold orange. It is refreshed as the window
 * opens (`toggleCatalog`), whenever the membership or the furni count arrives (the handlers), and
 * every 500 ms while either countdown is within 200 s of running out (`update`). A Builders Club
 * page's icon is always `icon_193` (`initLocalizables`).
 */
export const CatalogHeaderView = () => {
    const activePage = useCatalogStore(x => x.activePage);
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const catalogType = useCatalogStore(x => x.catalogType);
    const builderIsMember = useCatalogStore(x => x.builderIsMember);
    const builderIsInGrace = useCatalogStore(x => x.builderIsInGrace);
    const builderStatusSecondsLeft = useCatalogStore(x => x.builderStatusSecondsLeft);
    const builderFurniCount = useCatalogStore(x => x.builderFurniCount);
    const builderFurniLimit = useCatalogStore(x => x.builderFurniLimit);
    const store = useCatalogStoreApi();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const t = useTranslation();

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = getCatalogPageImage(activePage, CATALOG_HEADER_IMAGE);

    if (headerData) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    const isBuilder = (catalogType === CatalogTypeEnum.BuildersClub);
    const iconUrl = catalogIconUrl?.replace('%name%', activePage?.isBuilderPage ? '193' : (activeNode?.icon.toString() ?? '1'));

    useEffect(() => {
        if (!isBuilder) return;

        refreshBuilderStatus(store);

        const interval = setInterval(() => updateBuilderStatus(store), BUILDER_STATUS_UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, [ isBuilder, store ]);

    const builderStatus = t(`builder.header.status.${builderIsMember ? 'member' : (builderIsInGrace ? 'grace' : 'trial')}`);
    const builderDuration = (builderIsMember || builderIsInGrace) ? GetFriendlyTime(t, builderStatusSecondsLeft) : builderStatus;

    return (
        <Region
            name="catalog.header.background.border"
            backgroundColor={isBuilder ? '#4e4844' : '#376275'}
            layout={{ position: 'absolute', left: 1, width: 568, top: 35, height: 90, overflow: 'hidden' }}
        >
            <Region
                name="catalog.header.background.body"
                backgroundColor={isBuilder ? '#2d2724' : '#0e3f52'}
                layout={{ position: 'absolute', left: 2, width: 564, top: 2, height: 86 }}
            />
            <ThemeImage
                name="catalog.header.image"
                src={headerImageUrl}
                bitmap={{ stretchedX: false, stretchedY: false, zoomX: 2, zoomY: 2, pivot: 'center' }}
                greyscale
                alpha={0.1}
                layout={{ position: 'absolute', left: 0, width: 568, top: 0, height: 90 }}
            />
            <ThemeImage
                name="catalog.header.icon"
                src={iconUrl}
                bitmap={{ stretchedX: false, stretchedY: false, zoomX: 2, zoomY: 2, pivot: 'center' }}
                layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
            />
            {!isBuilder && (
                <Region
                    name="catalog.mode.header"
                    layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
                >
                    <ThemeText
                        name="catalog.header.title"
                        text={activeNode?.localization ?? t((activePage?.mode === CatalogPage.MODE_SEARCH) ? 'catalog.search.header' : 'catalog.header')}
                        textStyle="u_headline_big"
                        textOptions={{ fill: '#ffffff' }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, top: 11 }}
                    />
                    <ThemeText
                        name="catalog.header.description"
                        text={getCatalogPageText(activePage, CATALOG_HEADER_DESCRIPTION) ?? ''}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 471 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, width: 475, top: 34 }}
                    />
                </Region>
            )}
            {isBuilder && (
                <Region
                    name="builder.mode.header"
                    layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
                >
                    <ThemeText
                        name="builder.header.title"
                        text={t('builder.header.title', 'builder.header.title', { bcstatus: builderStatus })}
                        textStyle="u_headline_big"
                        textOptions={{ fill: '#ffffff', fontSize: 24 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, top: 11 }}
                    />
                    <ThemeText
                        name="builder.header.status.membership"
                        text={t('builder.header.status.membership', 'builder.header.status.membership', { duration: builderStatusValue(builderDuration) })}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 471 }}
                        flashFormat={{ leading: 2 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, width: 475, top: 41 }}
                    />
                    <ThemeText
                        name="builder.header.status.limit"
                        text={t('builder.header.status.limit', 'builder.header.status.limit', { count: builderStatusValue(builderFurniCount.toString()), limit: builderStatusValue(builderFurniLimit.toString()) })}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 471 }}
                        flashFormat={{ leading: 2 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, width: 475, top: 56 }}
                    />
                </Region>
            )}
        </Region>
    );
};
