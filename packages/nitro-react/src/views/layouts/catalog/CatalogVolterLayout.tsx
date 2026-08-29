import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1659_catalog_volter_xml` (layout "catalog_volter", 550x516) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogVolterLayoutProps {
    catalogMainContainer?: CatalogVolterLayoutCatalogMainContainerProps;
    layout?: BoxLayout;
}

export const CatalogVolterLayout = ({ catalogMainContainer, layout }: CatalogVolterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 550, height: 516, ...layout }}>
            <CatalogVolterLayoutCatalogMainContainer {...catalogMainContainer} />
        </Region>
    );
};

/** Row template `list_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutListTemplateItemProps {
    layout?: BoxLayout;
}

export const CatalogVolterLayoutListTemplateItem = ({ layout }: CatalogVolterLayoutListTemplateItemProps) => {
    return (
        <Region
            name="list_template"
            params={16}
            layout={{ width: 158, height: 21, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `background` of CatalogVolterLayout - configured through the parent's `background` prop. */
export interface CatalogVolterLayoutBackgroundProps {
    layout?: BoxLayout;
}

export const CatalogVolterLayoutBackground = ({ layout }: CatalogVolterLayoutBackgroundProps) => {
    return (
        <Region
            name="background"
            tags={[ 'SELECTION_COLOR' ]}
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `iconBackground` of CatalogVolterLayout - configured through the parent's `iconBackground` prop. */
export interface CatalogVolterLayoutIconBackgroundProps {
    layout?: BoxLayout;
}

export const CatalogVolterLayoutIconBackground = ({ layout }: CatalogVolterLayoutIconBackgroundProps) => {
    return (
        <Region
            name="iconBackground"
            tags={[ 'ICON_COLOR' ]}
            params={16}
            backgroundColor="#eeeeee"
            layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('catalogue_color_picker_27x22_color.png')}
                layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Row template `item_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutItemTemplateItemProps {
    background?: CatalogVolterLayoutBackgroundProps;
    captionItemTitle?: string;
    iconBackground?: CatalogVolterLayoutIconBackgroundProps;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcIcon?: string;
}

export const CatalogVolterLayoutItemTemplateItem = ({ background, captionItemTitle, iconBackground, layout, onItemTemplate, srcIcon }: CatalogVolterLayoutItemTemplateItemProps) => {
    return (
        <Region
            name="item_template"
            params={131217}
            backgroundColor="#000000"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 158, height: 21, flexShrink: 0, ...layout }}
        >
            <CatalogVolterLayoutBackground {...background} />
            <CatalogVolterLayoutIconBackground {...iconBackground} />
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE' ]}
                params={176}
                layout={{ position: 'absolute', left: 26, right: 128, top: 4, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionItemTitle ?? ''} />
            </Region>
            <Icon
                variant="5"
                name="drop_button"
                tags={[ 'DOWNBTN' ]}
                params={16}
                tintColor="#000000"
                layout={{ position: 'absolute', left: 122, width: 15, top: 5, height: 15 }}
            />
        </Region>
    );
};

/** Named region `background` of CatalogVolterLayout - configured through the parent's `background` prop. */
export interface CatalogVolterLayoutBackground2Props {
    layout?: BoxLayout;
}

export const CatalogVolterLayoutBackground2 = ({ layout }: CatalogVolterLayoutBackground2Props) => {
    return (
        <Region
            name="background"
            tags={[ 'SELECTION_COLOR' ]}
            params={16}
            backgroundColor="#d2f0f3"
            layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 20, ...layout }}
        />
    );
};

/** Row template `subitem_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutSubitemTemplateItemProps {
    background?: CatalogVolterLayoutBackground2Props;
    captionItemTitle?: string;
    layout?: BoxLayout;
    onSubitemTemplate?: () => void;
    srcIcon?: string;
}

export const CatalogVolterLayoutSubitemTemplateItem = ({ background, captionItemTitle, layout, onSubitemTemplate, srcIcon }: CatalogVolterLayoutSubitemTemplateItemProps) => {
    return (
        <Region
            name="subitem_template"
            params={131217}
            backgroundColor="#000000"
            onPointerTap={onSubitemTemplate}
            cursor="pointer"
            layout={{ width: 158, height: 21, flexShrink: 0, ...layout }}
        >
            <CatalogVolterLayoutBackground2 {...background} />
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 5, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE' ]}
                params={176}
                layout={{ position: 'absolute', left: 32, right: 122, top: 4, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionItemTitle ?? ''} />
            </Region>
        </Region>
    );
};

/** Named region `navigationList` of CatalogVolterLayout - configured through the parent's `navigationList` prop. */
export interface CatalogVolterLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogVolterLayoutNavigationList = ({ itemsNavigationList, layout }: CatalogVolterLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 160, top: 0, height: 434, ...layout }}
        >
            <Region
                name="navigationList"
                params={16}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <>
                        <CatalogVolterLayoutListTemplateItem />
                        <CatalogVolterLayoutItemTemplateItem />
                        <CatalogVolterLayoutSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `layoutContainer` of CatalogVolterLayout - configured through the parent's `layoutContainer` prop. */
export interface CatalogVolterLayoutLayoutContainerProps {
    layout?: BoxLayout;
}

export const CatalogVolterLayoutLayoutContainer = ({ layout }: CatalogVolterLayoutLayoutContainerProps) => {
    return (
        <Region
            name="layoutContainer"
            layout={{ position: 'absolute', left: 6, width: 360, top: 40, height: 460, ...layout }}
        />
    );
};

/** Named region `catalog_main_container` of CatalogVolterLayout - configured through the parent's `catalogMainContainer` prop. */
export interface CatalogVolterLayoutCatalogMainContainerProps {
    captionCatalogHeaderDescription?: string;
    layout?: BoxLayout;
    layoutContainer?: CatalogVolterLayoutLayoutContainerProps;
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
            params={32801}
            onPointerTap={onCatalogMainContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 550, top: 0, height: 516, ...layout }}
        >
            <Frame
                variant="0"
                id="navigatorMain"
                name="navigatorMain"
                params={257}
                caption={t('catalog.title')}
                tintColor="#418db0"
                onClose={onNavigatorMain}
                layout={{ position: 'absolute', left: 370, width: 175, top: 24, height: 466 }}
            >
                <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                    <Border
                        variant="5"
                        name="navigationContainer"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32 }}
                    >
                        <CatalogVolterLayoutNavigationList {...navigationList} />
                    </Border>
                </Region>
            </Frame>
            <ThemeImage
                name="layoutBackground"
                params={257}
                src={srcLayoutBackground ?? layoutImage('catalogue_background.png')}
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 516 }}
            />
            <CatalogVolterLayoutLayoutContainer {...layoutContainer} />
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
