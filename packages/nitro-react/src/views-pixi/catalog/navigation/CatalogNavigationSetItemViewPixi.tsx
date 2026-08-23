import { ICatalogNode } from '@nitrodevco/nitro-api';

import { useConfigValue } from '#base/context';
import { useCatalogNavigation } from '#base/hooks';
import { Box, ColorLayer, NitroIcon, Text, useTextureFromUrl } from '#base/theme-pixi';

import { CatalogNavigationSetViewPixi } from './CatalogNavigationSetViewPixi';

export interface CatalogNavigationSetItemViewPixiProps {
    node: ICatalogNode;
}

/** Pixi port of views/catalog/navigation/CatalogNavigationSetItemView.tsx. */
export const CatalogNavigationSetItemViewPixi = ({ node }: CatalogNavigationSetItemViewPixiProps) => {
    const { activateNode } = useCatalogNavigation();
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const iconTexture = useTextureFromUrl(catalogIconUrl.replace('%name%', node.icon.toString()));

    return (
        <Box layout={{ flexDirection: 'column' }}>
            <Box
                eventMode="static"
                cursor="pointer"
                onPointerTap={() => activateNode(node)}
                layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', paddingTop: 2, paddingBottom: 2, paddingLeft: (node.depth - 2) * 10, minHeight: 16 }}
            >
                {node.isActive && <ColorLayer color="#82d1ed" />}
                <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', flex: 1, minHeight: 16 }}>
                    {node.isActive && <ColorLayer color="#63c5e9" />}
                    <Box layout={{ width: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {iconTexture && (
                            <pixiSprite
                                texture={iconTexture}
                                layout={{}}
                            />
                        )}
                    </Box>
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between' }}>
                        <Text
                            text={node.localization}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: node.isActive ? '#ffffff' : '#666666' }}
                        />
                        {node.children.length > 0 && (
                            <NitroIcon
                                icon={node.isOpen ? 'icon-tri-arrow-up' : 'icon-tri-arrow-down'}
                                layout={{}}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
            {node.isOpen && node.children.length > 0 && <CatalogNavigationSetViewPixi node={node} />}
        </Box>
    );
};
