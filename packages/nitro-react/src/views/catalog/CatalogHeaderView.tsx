import { useCatalogSelectors, useConfigValue, useTranslation } from '#base/context';
import { Region, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';

/** Pixi port of views/catalog/CatalogHeaderView.tsx. */
export const CatalogHeaderView = () => {
    const { activePage, activeNodes } = useCatalogSelectors();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const t = useTranslation();

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = activePage?.localization.imageDatas[0] ?? '';

    if (headerData && headerData.length) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    const iconUrl = catalogIconUrl?.replace('%name%', activeNode?.icon.toString() ?? '1');
    // Image resolves its own texture internally, but this icon needs its NATIVE size doubled -
    // read it here too just to compute that (usePixiTexture/useTextureFromUrl share a module-
    // level cache, so this doesn't trigger a second network fetch, only a second cheap lookup).
    const iconTexture = useTextureFromUrl(iconUrl);

    return (
        <Region
            name="catalog.header.background.border"
            backgroundColor="#376275"
            layout={{ position: 'absolute', top: 34, left: 1, right: 1, height: 90 }}
        >
            <Region
                name="catalog.header.background.body"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 86 }}
            />
            <ThemeImage
                name="catalog.header.image"
                src={headerImageUrl}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90 }}
            />
            <ThemeImage
                name="catalog.header.icon"
                src={iconUrl}
                layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
            />
            <Region
                name="catalog.mode.header"
                layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
            >
                <Region
                    name="catalog.header.title"
                    layout={{ position: 'absolute', left: 80, width: 133, top: 11, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.header')}
                        textStyle="text-style-u-headline-big"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="catalog.header.description"
                    layout={{ position: 'absolute', left: 80, width: 475, top: 34, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.description')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
