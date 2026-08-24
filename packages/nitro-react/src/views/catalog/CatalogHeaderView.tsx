import { useCatalogSelectors, useConfigValue } from '#base/context';
import { Box, ColorLayer, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';

/** Pixi port of views/catalog/CatalogHeaderView.tsx. */
export const CatalogHeaderView = () => {
    const { activePage, activeNodes } = useCatalogSelectors();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = activePage?.localization.imageDatas[0] ?? '';

    if (headerData && headerData.length) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    const iconUrl = catalogIconUrl?.replace('%name%', activeNode?.icon.toString() ?? '1');
    // Image resolves its own texture internally, but this icon needs its NATIVE size doubled -
    // read it here too just to compute that (usePixiTexture/useTextureFromUrl share a module-
    // level cache, so this doesn't trigger a second network fetch, only a second cheap lookup).
    const iconTexture = useTextureFromUrl(iconUrl);

    return (
        <Box layout={{ position: 'relative', width: '100%', height: 90, flexShrink: 0 }}>
            <ThemeImage
                src={headerImageUrl}
                alpha={0.1}
                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            />
            <ColorLayer color="#0e3f52" />
            <Box layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', gap: 16, paddingLeft: 20, paddingRight: 20 }}>
                {iconTexture && (
                    <ThemeImage
                        src={iconUrl}
                        width={iconTexture.width * 2}
                        height={iconTexture.height * 2}
                        layout={{}}
                    />
                )}
                <ThemeText
                    text={activeNode?.localization ?? ''}
                    textStyle="text-style-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Box>
        </Box>
    );
};
