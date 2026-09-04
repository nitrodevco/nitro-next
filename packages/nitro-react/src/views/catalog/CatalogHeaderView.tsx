import { useCatalogSelectors, useConfigValue, useTranslation } from '#base/context';
import { ColorLayer, Region, ThemeImage, ThemeText } from '#base/theme';

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

    return (
        <Region
            backgroundColor="#376275"
            zIndex={10}
            layout={{ position: 'absolute', top: 35, left: 1, right: 1, height: 90, overflow: 'hidden' }}
        >
            <ColorLayer
                color="#0e3f52"
                layout={{
                    position: 'absolute',
                    left: 1,
                    right: 1,
                    top: 1,
                    bottom: 1,
                    width: '100%',
                    height: '100%',
                }}
            />
            <ThemeImage
                src={headerImageUrl}
                layout={{ position: 'absolute', top: 0, left: 0 }}
                alpha={0.1}
                scale={1}
            />
            <Region layout={{ position: 'relative', width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: 24, gap: 8 }}>
                <ThemeImage
                    name="catalog.header.icon"
                    src={iconUrl}
                    scale={2}
                />
                <ThemeText
                    text={activeNode?.localization ?? ''}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
