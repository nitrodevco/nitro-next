import { CatalogTypeEnum, ICatalogNode } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogNavigation } from '#base/hooks';
import { Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationSetItemViewProps {
    node: ICatalogNode;
}

/**
 * One row of the navigation list - `CatalogNodeRenderable`, cloned from the
 * `<mode>_topitem_template` / `<mode>_subitem_template` regions of `catalog_ubuntu_with_tabs.xml`.
 * `CatalogNavigator.getItemTemplate(depth)` picks the template: with `catalog.deep.hierarchy` a
 * depth above 2 is a sub item, without it everything but depth 1; the deep hierarchy also hides
 * the icon at depth 1 and steps icon and title 6px right per level past 3 (`createWindow`).
 *
 * `setActiveLook` (the node is active, or the pointer is over it) shows the `SELECTION_HILIGHT`
 * fills and turns the title white with the template's etching; `setInactiveLook` hides them and
 * puts the template's colour back with no etching. The drop arrow is icon style 5, and 7 while
 * the node is open.
 */
export const CatalogNavigationSetItemView = ({ node }: CatalogNavigationSetItemViewProps) => {
    const { activateNode } = useCatalogNavigation();
    const isActive = useCatalogStore(x => x.activeNodes.includes(node));
    const isOpen = useCatalogStore(x => x.openNodes.includes(node));
    const catalogType = useCatalogStore(x => x.catalogType);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const isDeepHierarchy = String(useConfigValue('catalog.deep.hierarchy')) === 'true';
    const [ isHovered, setIsHovered ] = useState(false);
    const iconUrl = catalogIconUrl.replace('%name%', node.icon.toString());

    const depth = node.depth;
    const isTopItem = isDeepHierarchy ? (depth <= 2) : (depth === 1);
    const isBuilder = (catalogType === CatalogTypeEnum.BuildersClub);
    const showLook = isActive || isHovered;

    const hilightOuter = isBuilder ? '#ffb53c' : '#82d1ed';
    const hilightInner = isBuilder ? '#ff8d00' : '#63c5e9';
    const etchingColor = isBuilder ? 0xFFCF7200 : 0xFFB4B4AE;
    const normalColor = isTopItem ? '#666666' : (isBuilder ? '#b77734' : '#52819a');

    let iconX = isTopItem ? 0 : 15;
    let titleX = isTopItem ? 26 : 42;
    let iconVisible = true;

    if (isDeepHierarchy) {
        if (depth === 1) {
            iconVisible = false;
            titleX = 0;
        }

        if (depth > 3) {
            iconX = 15 + (6 * (depth - 3));
            titleX = 42 + (6 * (depth - 3));
        }
    }

    return (
        <>
            <Region
                name={isTopItem ? 'normal_topitem_template' : 'normal_subitem_template'}
                cursor="pointer"
                onPointerTap={() => activateNode(node)}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
                layout={{ width: isTopItem ? 180 : 179, height: 21, flexShrink: 0 }}
            >
                {showLook && (
                    <Region
                        backgroundColor="#b4b4ae"
                        layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: isTopItem ? 21 : 20 }}
                    >
                        <Region
                            name="item_hilight_outer"
                            backgroundColor={hilightOuter}
                            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: isTopItem ? 20 : 19 }}
                        >
                            <Region
                                name="item_hilight_inner"
                                backgroundColor={hilightInner}
                                layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: isTopItem ? 16 : 15 }}
                            />
                        </Region>
                    </Region>
                )}
                {iconVisible && (
                    <ThemeImage
                        name="icon"
                        src={iconUrl}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: iconX, width: 20, top: isTopItem ? 1 : 0, height: 20 }}
                    />
                )}
                <ThemeText
                    name="item_title"
                    text={node.localization}
                    textStyle="u_bold"
                    textOptions={{ fill: showLook ? '#ffffff' : normalColor }}
                    flashFormat={{
                        ...(!isTopItem && { italic: true }),
                        ...(showLook && { etchingColor, etchingPosition: 'top' }),
                    }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: titleX, top: isTopItem ? 2 : 1 }}
                />
                {node.children.length > 0 && (
                    <Icon
                        name="drop_button"
                        variant={isOpen ? 7 : 5}
                        tintColor="#999999"
                        layout={{ position: 'absolute', left: 145, top: 6 }}
                    />
                )}
            </Region>
            {isOpen && node.children.length > 0 && <CatalogNavigationSetView node={node} />}
        </>
    );
};
