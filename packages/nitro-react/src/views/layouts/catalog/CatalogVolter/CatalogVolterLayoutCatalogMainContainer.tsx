import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CatalogVolterLayoutNavigationList, CatalogVolterLayoutNavigationListProps } from './CatalogVolterLayoutNavigationList';

/** Named region `catalog_main_container` of CatalogVolterLayout - configured through the parent's `catalogMainContainer` prop. */
export interface CatalogVolterLayoutCatalogMainContainerProps {
    captionCatalogHeaderDescription?: string;
    layout?: BoxLayout;
    layoutContainer?: ReactNode;
    navigationList?: CatalogVolterLayoutNavigationListProps;
    onCatalogMainContainer?: () => void;
    onNavigatorMain?: () => void;
    srcCatalogHeaderImage?: string;
    srcLayoutBackground?: string;
}

export const CatalogVolterLayoutCatalogMainContainer = ({ captionCatalogHeaderDescription, layout, layoutContainer, navigationList, onCatalogMainContainer, onNavigatorMain, srcCatalogHeaderImage, srcLayoutBackground }: CatalogVolterLayoutCatalogMainContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_main_container"
            onPointerTap={onCatalogMainContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Frame
                variant="0"
                id="navigatorMain"
                name="navigatorMain"
                caption={t('catalog.title')}
                tintColor="#418db0"
                onClose={onNavigatorMain}
                layout={{ position: 'absolute', left: 370, width: 175, top: 24, height: 466 }}
            >
                <Border
                    variant="5"
                    name="navigationContainer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9 }}
                >
                    <CatalogVolterLayoutNavigationList {...navigationList} />
                </Border>
            </Frame>
            <ThemeImage
                name="layoutBackground"
                src={srcLayoutBackground ?? layoutImage('catalogue_background.png')}
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 516 }}
            />
            <Region
                name="layoutContainer"
                layout={{ position: 'absolute', left: 6, width: 360, top: 40, height: 460 }}
            >
                {layoutContainer}
            </Region>
            <ThemeImage
                name="catalog.header.image"
                src={srcCatalogHeaderImage ?? '${image.library.url}catalogue/catalog_header_roombuilder.gif'}
                layout={{ position: 'absolute', left: 6, width: 359, top: 35, height: 70 }}
            />
            <Region
                name="catalog.header.description"
                layout={{ position: 'absolute', left: 10, width: 355, top: 110, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCatalogHeaderDescription ?? t('lorem.header')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                />
            </Region>
        </Region>
    );
};
