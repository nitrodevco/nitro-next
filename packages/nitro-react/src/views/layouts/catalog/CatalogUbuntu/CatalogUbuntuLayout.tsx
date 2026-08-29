import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CatalogUbuntuLayoutCatalogHeaderBackgroundBorder, CatalogUbuntuLayoutCatalogHeaderBackgroundBorderProps } from './CatalogUbuntuLayoutCatalogHeaderBackgroundBorder';
import { CatalogUbuntuLayoutNavigationContainer, CatalogUbuntuLayoutNavigationContainerProps } from './CatalogUbuntuLayoutNavigationContainer';

/** Generated from `1687_catalog_ubuntu_xml` (layout "catalog_ubuntu", 570x640) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuLayoutProps {
    captionSearchHelper?: string;
    catalogHeaderBackgroundBorder?: CatalogUbuntuLayoutCatalogHeaderBackgroundBorderProps;
    layout?: BoxLayout;
    layoutContainer?: ReactNode;
    navigationContainer?: CatalogUbuntuLayoutNavigationContainerProps;
    onClearSearchButton?: () => void;
    onClose?: () => void;
    srcSearchClearIcon?: string;
}

export const CatalogUbuntuLayout = ({ captionSearchHelper, catalogHeaderBackgroundBorder, layout, layoutContainer, navigationContainer, onClearSearchButton, onClose, srcSearchClearIcon }: CatalogUbuntuLayoutProps) => {
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
            layout={{ width: 570, height: 640, minWidth: 570, maxWidth: 570, minHeight: 540, ...layout }}
        >
            <CatalogUbuntuLayoutCatalogHeaderBackgroundBorder {...catalogHeaderBackgroundBorder} />
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 8, width: 184, top: 96, height: 24 }}
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
            <CatalogUbuntuLayoutNavigationContainer {...navigationContainer} />
            <Region
                name="layoutContainer"
                layout={{ position: 'absolute', left: 200, width: 360, top: 96, bottom: 3 }}
            >
                {layoutContainer}
            </Region>
        </Frame>
    );
};
