import { useCatalogSelectors, useConfigValue } from '#base/context';
import { Box, ColorLayer, Text, useTextureFromUrl } from '#base/theme-pixi';

/** Pixi port of views/catalog/CatalogHeaderView.tsx. */
export const CatalogHeaderViewPixi = () => {
    const { activePage, activeNodes } = useCatalogSelectors();
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    let headerImageUrl = catalogImageUrl.replace('%name%', 'catalog_header_roombuilder');

    const headerData = activePage?.localization.imageDatas[0] ?? '';

    if (headerData && headerData.length) headerImageUrl = catalogImageUrl.replace('%name%', headerData);

    const iconTexture = useTextureFromUrl(catalogIconUrl?.replace('%name%', activeNode?.icon.toString() ?? '1'));
    const backgroundTexture = useTextureFromUrl(headerImageUrl);

    return (
        <Box layout={{ position: 'relative', width: '100%', height: 90, flexShrink: 0 }}>
            {backgroundTexture && (
                <pixiSprite
                    texture={backgroundTexture}
                    alpha={0.1}
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                />
            )}
            <ColorLayer color="#0e3f52" />
            <Box layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', gap: 16, paddingLeft: 20, paddingRight: 20 }}>
                {iconTexture && (
                    <pixiSprite
                        texture={iconTexture}
                        width={iconTexture.width * 2}
                        height={iconTexture.height * 2}
                        layout={{}}
                    />
                )}
                <Text
                    text={activeNode?.localization ?? ''}
                    textStyle="text-style-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Box>
        </Box>
    );
};
