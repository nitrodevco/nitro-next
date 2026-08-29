import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder, CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps } from './CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder';
import { CatalogUbuntuWithTabsLayoutNavigationContainer, CatalogUbuntuWithTabsLayoutNavigationContainerProps } from './CatalogUbuntuWithTabsLayoutNavigationContainer';

/** Generated from `1609_catalog_ubuntu_with_tabs_xml` (layout "catalog_ubuntu_with_tabs", 570x635) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuWithTabsLayoutProps {
    captionSearchHelper?: string;
    catalogHeaderBackgroundBorder?: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps;
    layout?: BoxLayout;
    layoutContainer?: ReactNode;
    navigationContainer?: CatalogUbuntuWithTabsLayoutNavigationContainerProps;
    onClearSearchButton?: () => void;
    onClose?: () => void;
    onTabButton?: () => void;
    searchWaitingForResultsMask?: ReactNode;
    selectedTabContext?: string;
    srcSearchClearIcon?: string;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const CatalogUbuntuWithTabsLayout = ({ captionSearchHelper, catalogHeaderBackgroundBorder, layout, layoutContainer, navigationContainer, onClearSearchButton, onClose, onTabButton, searchWaitingForResultsMask, selectedTabContext, srcSearchClearIcon, visibleSearchWaitingForResultsMask }: CatalogUbuntuWithTabsLayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="catalog_main_container"
            name="catalog_main_container"
            caption={t('catalog.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 570, height: 635, minWidth: 570, maxWidth: 570, minHeight: 570, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder {...catalogHeaderBackgroundBorder} />
            <Border
                variant="105"
                name="searchContainer"
                layout={{ position: 'absolute', left: 8, width: 184, top: 131, height: 24 }}
            >
                <Region
                    name="search.helper"
                    layout={{ position: 'absolute', left: 4, width: 82, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchHelper ?? t('catalog.search')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    textColor="#666666"
                    layout={{ position: 'absolute', left: 4, width: 144, top: 3, height: 18 }}
                />
                <Region
                    name="clear_search_button"
                    onPointerTap={onClearSearchButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 160, width: 20, top: 2, height: 20 }}
                >
                    <ThemeImage
                        name="search.clear.icon"
                        src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            </Border>
            <CatalogUbuntuWithTabsLayoutNavigationContainer {...navigationContainer} />
            <Region
                name="layoutContainer"
                layout={{ position: 'absolute', left: 200, width: 360, top: 131, bottom: 3 }}
            >
                {layoutContainer}
            </Region>
            <TabContext
                variant="3"
                name="tab_context"
                layout={{ position: 'absolute', left: 0, width: 568, top: 5, height: 30 }}
            >
                <TabButton
                    variant="3"
                    name="tab_button"
                    selected={selectedTabContext === 'tab_button'}
                    onPointerTap={onTabButton}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, bottom: 0 }}
                />
            </TabContext>
            {(visibleSearchWaitingForResultsMask ?? false) && (
                <Region
                    name="search_waiting_for_results_mask"
                    backgroundColor="#eceae0"
                    layout={{ position: 'absolute', left: 0, right: -12, top: 0, bottom: -4 }}
                >
                    {searchWaitingForResultsMask}
                </Region>
            )}
        </Frame>
    );
};
