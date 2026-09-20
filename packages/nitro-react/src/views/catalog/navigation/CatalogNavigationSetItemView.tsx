import { ICatalogNode } from '@nitrodevco/nitro-api';

import { useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogNavigation } from '#base/hooks';
import { Box, ColorLayer, Icon, ThemeImage, ThemeText } from '#base/theme';

import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationSetItemViewProps {
    node: ICatalogNode;
}

export const CatalogNavigationSetItemView = ({ node }: CatalogNavigationSetItemViewProps) => {
    const { activateNode } = useCatalogNavigation();
    const isActive = useCatalogStore(x => x.activeNodes.includes(node));
    const isOpen = useCatalogStore(x => x.openNodes.includes(node));
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const iconUrl = catalogIconUrl.replace('%name%', node.icon.toString());

    return (
        <>
            <Box
                cursor="pointer"
                onPointerTap={() => activateNode(node)}
                layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', paddingTop: 2, paddingBottom: 2, paddingLeft: (node.depth - 2) * 10, minHeight: 16 }}
            >
                {isActive && <ColorLayer color="#82d1ed" />}
                <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', flex: 1, minHeight: 16 }}>
                    {isActive && <ColorLayer color="#63c5e9" />}
                    <Box layout={{ width: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <ThemeImage
                            src={iconUrl}
                            layout={{}}
                        />
                    </Box>
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between' }}>
                        <ThemeText
                            text={node.localization}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: isActive ? '#ffffff' : '#666666' }}
                        />
                        {node.children.length > 0 && (
                            // `catalog_ubuntu_with_tabs`'s `drop_button` (`tags="DOWNBTN"`,
                            // `color="0x999999"`), which `CatalogNodeRenderable.open`/`close`
                            // flips between icon style 7 (triangle down) and style 5 (triangle
                            // right) - not the up/down pair.
                            <Icon
                                name="drop_button"
                                variant={isOpen ? 7 : 5}
                                tintColor="#999999"
                            />
                        )}
                    </Box>
                </Box>
            </Box>
            {isOpen && node.children.length > 0 && <CatalogNavigationSetView node={node} />}
        </>
    );
};
