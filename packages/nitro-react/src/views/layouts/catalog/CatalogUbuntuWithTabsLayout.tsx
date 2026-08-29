import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1609_catalog_ubuntu_with_tabs_xml` (layout "catalog_ubuntu_with_tabs", 570x635) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuWithTabsLayoutProps {
    captionSearchHelper?: string;
    catalogHeaderBackgroundBorder?: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps;
    clearSearchButton?: CatalogUbuntuWithTabsLayoutClearSearchButtonProps;
    layout?: BoxLayout;
    layoutContainer?: CatalogUbuntuWithTabsLayoutLayoutContainerProps;
    navigationContainer?: CatalogUbuntuWithTabsLayoutNavigationContainerProps;
    onClose?: () => void;
    onTabButton?: () => void;
    searchWaitingForResultsMask?: CatalogUbuntuWithTabsLayoutSearchWaitingForResultsMaskProps;
}

export const CatalogUbuntuWithTabsLayout = ({ captionSearchHelper, catalogHeaderBackgroundBorder, clearSearchButton, layout, layoutContainer, navigationContainer, onClose, onTabButton, searchWaitingForResultsMask }: CatalogUbuntuWithTabsLayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="catalog_main_container"
            name="catalog_main_container"
            params={98337}
            caption={t('catalog.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 570, height: 635, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder {...catalogHeaderBackgroundBorder} />
                <Border
                    variant="105"
                    name="searchContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 184, top: 131, height: 24 }}
                >
                    <Region
                        name="search.helper"
                        params={16}
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
                    <CatalogUbuntuWithTabsLayoutClearSearchButton {...clearSearchButton} />
                </Border>
                <CatalogUbuntuWithTabsLayoutNavigationContainer {...navigationContainer} />
                <CatalogUbuntuWithTabsLayoutLayoutContainer {...layoutContainer} />
                <TabContext
                    variant="3"
                    name="tab_context"
                    layout={{ position: 'absolute', left: 0, width: 568, top: 5, height: 30 }}
                >
                    <TabButton
                        variant="3"
                        name="tab_button"
                        params={17}
                        onPointerTap={onTabButton}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 30 }}
                    />
                </TabContext>
                <CatalogUbuntuWithTabsLayoutSearchWaitingForResultsMask {...searchWaitingForResultsMask} />
            </Region>
        </Frame>
    );
};

/** Named region `catalog.header.background.body` of CatalogUbuntuWithTabsLayout - configured through the parent's `catalogHeaderBackgroundBody` prop. */
export interface CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBodyProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBody = ({ layout }: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBodyProps) => {
    return (
        <Region
            name="catalog.header.background.body"
            params={144}
            backgroundColor="#0e3f52"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 86, ...layout }}
        />
    );
};

/** Named region `catalog.mode.header` of CatalogUbuntuWithTabsLayout - configured through the parent's `catalogModeHeader` prop. */
export interface CatalogUbuntuWithTabsLayoutCatalogModeHeaderProps {
    captionCatalogHeaderDescription?: string;
    captionCatalogHeaderTitle?: string;
    layout?: BoxLayout;
    visibleCatalogModeHeader?: boolean;
}

export const CatalogUbuntuWithTabsLayoutCatalogModeHeader = ({ captionCatalogHeaderDescription, captionCatalogHeaderTitle, layout, visibleCatalogModeHeader }: CatalogUbuntuWithTabsLayoutCatalogModeHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog.mode.header"
            params={16}
            visible={visibleCatalogModeHeader ?? false}
            layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90, ...layout }}
        >
            <Region
                name="catalog.header.title"
                params={16}
                layout={{ position: 'absolute', left: 80, width: 133, top: 11, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCatalogHeaderTitle ?? t('catalog.header')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="catalog.header.description"
                params={16}
                layout={{ position: 'absolute', left: 80, width: 475, top: 34, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCatalogHeaderDescription ?? t('catalog.description')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `builder.mode.header` of CatalogUbuntuWithTabsLayout - configured through the parent's `builderModeHeader` prop. */
export interface CatalogUbuntuWithTabsLayoutBuilderModeHeaderProps {
    captionBuilderHeaderStatusLimit?: string;
    captionBuilderHeaderStatusMembership?: string;
    captionBuilderHeaderTitle?: string;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutBuilderModeHeader = ({ captionBuilderHeaderStatusLimit, captionBuilderHeaderStatusMembership, captionBuilderHeaderTitle, layout }: CatalogUbuntuWithTabsLayoutBuilderModeHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builder.mode.header"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90, ...layout }}
        >
            <Region
                name="builder.header.title"
                params={16}
                layout={{ position: 'absolute', left: 80, width: 226, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBuilderHeaderTitle ?? t('builder.header.title')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="builder.header.status.membership"
                params={16}
                layout={{ position: 'absolute', left: 80, width: 475, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBuilderHeaderStatusMembership ?? t('builder.header.status.membership')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                />
            </Region>
            <Region
                name="builder.header.status.limit"
                params={16}
                layout={{ position: 'absolute', left: 80, width: 475, top: 56, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBuilderHeaderStatusLimit ?? t('builder.header.status.limit')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `catalog.header.background.border` of CatalogUbuntuWithTabsLayout - configured through the parent's `catalogHeaderBackgroundBorder` prop. */
export interface CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps {
    builderModeHeader?: CatalogUbuntuWithTabsLayoutBuilderModeHeaderProps;
    catalogHeaderBackgroundBody?: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBodyProps;
    catalogModeHeader?: CatalogUbuntuWithTabsLayoutCatalogModeHeaderProps;
    layout?: BoxLayout;
    srcCatalogHeaderIcon?: string;
    srcCatalogHeaderImage?: string;
}

export const CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder = ({ builderModeHeader, catalogHeaderBackgroundBody, catalogModeHeader, layout, srcCatalogHeaderIcon, srcCatalogHeaderImage }: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps) => {
    return (
        <Region
            name="catalog.header.background.border"
            params={144}
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 35, height: 90, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBody {...catalogHeaderBackgroundBody} />
            <ThemeImage
                name="catalog.header.image"
                params={144}
                src={srcCatalogHeaderImage ?? '${image.library.url}catalogue/catalog_header_roombuilder.gif'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90 }}
            />
            <ThemeImage
                name="catalog.header.icon"
                params={16}
                src={srcCatalogHeaderIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
            />
            <CatalogUbuntuWithTabsLayoutCatalogModeHeader {...catalogModeHeader} />
            <CatalogUbuntuWithTabsLayoutBuilderModeHeader {...builderModeHeader} />
        </Region>
    );
};

/** Named region `clear_search_button` of CatalogUbuntuWithTabsLayout - configured through the parent's `clearSearchButton` prop. */
export interface CatalogUbuntuWithTabsLayoutClearSearchButtonProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    srcSearchClearIcon?: string;
}

export const CatalogUbuntuWithTabsLayoutClearSearchButton = ({ layout, onClearSearchButton, srcSearchClearIcon }: CatalogUbuntuWithTabsLayoutClearSearchButtonProps) => {
    return (
        <Region
            name="clear_search_button"
            params={17}
            onPointerTap={onClearSearchButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 160, width: 20, top: 2, height: 20, ...layout }}
        >
            <ThemeImage
                name="search.clear.icon"
                params={16}
                src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Row template `normal_list_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalListTemplateItemProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutNormalListTemplateItem = ({ layout }: CatalogUbuntuWithTabsLayoutNormalListTemplateItemProps) => {
    return (
        <Region
            name="normal_list_template"
            params={16}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightInnerProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightInner = ({ layout }: CatalogUbuntuWithTabsLayoutItemHilightInnerProps) => {
    return (
        <Region
            name="item_hilight_inner"
            params={16}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightOuterProps {
    itemHilightInner?: CatalogUbuntuWithTabsLayoutItemHilightInnerProps;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightOuter = ({ itemHilightInner, layout }: CatalogUbuntuWithTabsLayoutItemHilightOuterProps) => {
    return (
        <Region
            name="item_hilight_outer"
            params={16}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutItemHilightInner {...itemHilightInner} />
        </Region>
    );
};

/** Row template `normal_topitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuWithTabsLayoutItemHilightOuterProps;
    layout?: BoxLayout;
    onNormalTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onNormalTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItemProps) => {
    return (
        <Region
            name="normal_topitem_template"
            params={131089}
            onPointerTap={onNormalTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CatalogUbuntuWithTabsLayoutItemHilightOuter {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
                layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleDropButton ?? false}
                layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
            >
                <Icon
                    variant="5"
                    name="drop_button"
                    tags={[ 'DOWNBTN' ]}
                    params={16}
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightInner2Props {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightInner2 = ({ layout }: CatalogUbuntuWithTabsLayoutItemHilightInner2Props) => {
    return (
        <Region
            name="item_hilight_inner"
            params={16}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightOuter2Props {
    itemHilightInner?: CatalogUbuntuWithTabsLayoutItemHilightInner2Props;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightOuter2 = ({ itemHilightInner, layout }: CatalogUbuntuWithTabsLayoutItemHilightOuter2Props) => {
    return (
        <Region
            name="item_hilight_outer"
            params={16}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutItemHilightInner2 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `normal_subitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuWithTabsLayoutItemHilightOuter2Props;
    layout?: BoxLayout;
    onNormalSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onNormalSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItemProps) => {
    return (
        <Region
            name="normal_subitem_template"
            params={131089}
            onPointerTap={onNormalSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <CatalogUbuntuWithTabsLayoutItemHilightOuter2 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
                layout={{ position: 'absolute', left: 42, right: 82, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'sub-item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#52819a' }}
                />
            </Region>
            <Region
                visible={visibleDropButton ?? false}
                layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
            >
                <Icon
                    variant="5"
                    name="drop_button"
                    tags={[ 'DOWNBTN' ]}
                    params={16}
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `builders_club_list_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItemProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItem = ({ layout }: CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItemProps) => {
    return (
        <Region
            name="builders_club_list_template"
            params={16}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightInner3Props {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightInner3 = ({ layout }: CatalogUbuntuWithTabsLayoutItemHilightInner3Props) => {
    return (
        <Region
            name="item_hilight_inner"
            params={16}
            backgroundColor="#ff8d00"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightOuter3Props {
    itemHilightInner?: CatalogUbuntuWithTabsLayoutItemHilightInner3Props;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightOuter3 = ({ itemHilightInner, layout }: CatalogUbuntuWithTabsLayoutItemHilightOuter3Props) => {
    return (
        <Region
            name="item_hilight_outer"
            params={16}
            backgroundColor="#ffb53c"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutItemHilightInner3 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `builders_club_topitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuWithTabsLayoutItemHilightOuter3Props;
    layout?: BoxLayout;
    onBuildersClubTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onBuildersClubTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_topitem_template"
            params={131089}
            onPointerTap={onBuildersClubTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CatalogUbuntuWithTabsLayoutItemHilightOuter3 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
                layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleDropButton ?? false}
                layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
            >
                <Icon
                    variant="5"
                    name="drop_button"
                    tags={[ 'DOWNBTN' ]}
                    params={16}
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightInner4Props {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightInner4 = ({ layout }: CatalogUbuntuWithTabsLayoutItemHilightInner4Props) => {
    return (
        <Region
            name="item_hilight_inner"
            params={16}
            backgroundColor="#ff8d00"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuWithTabsLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuWithTabsLayoutItemHilightOuter4Props {
    itemHilightInner?: CatalogUbuntuWithTabsLayoutItemHilightInner4Props;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutItemHilightOuter4 = ({ itemHilightInner, layout }: CatalogUbuntuWithTabsLayoutItemHilightOuter4Props) => {
    return (
        <Region
            name="item_hilight_outer"
            params={16}
            backgroundColor="#ffb53c"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19, ...layout }}
        >
            <CatalogUbuntuWithTabsLayoutItemHilightInner4 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `builders_club_subitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuWithTabsLayoutItemHilightOuter4Props;
    layout?: BoxLayout;
    onBuildersClubSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onBuildersClubSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_subitem_template"
            params={131089}
            onPointerTap={onBuildersClubSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <CatalogUbuntuWithTabsLayoutItemHilightOuter4 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                params={16}
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
                layout={{ position: 'absolute', left: 42, right: 82, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'sub-item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#b77734' }}
                />
            </Region>
            <Region
                visible={visibleDropButton ?? false}
                layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
            >
                <Icon
                    variant="5"
                    name="drop_button"
                    tags={[ 'DOWNBTN' ]}
                    params={16}
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `navigationList` of CatalogUbuntuWithTabsLayout - configured through the parent's `navigationList` prop. */
export interface CatalogUbuntuWithTabsLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutNavigationList = ({ itemsNavigationList, layout }: CatalogUbuntuWithTabsLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
                params={2064}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <>
                        <CatalogUbuntuWithTabsLayoutNormalListTemplateItem />
                        <CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubListTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem />
                        <CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `navigationContainer` of CatalogUbuntuWithTabsLayout - configured through the parent's `navigationContainer` prop. */
export interface CatalogUbuntuWithTabsLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CatalogUbuntuWithTabsLayoutNavigationListProps;
}

export const CatalogUbuntuWithTabsLayoutNavigationContainer = ({ layout, navigationList }: CatalogUbuntuWithTabsLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            params={2064}
            layout={{ position: 'absolute', left: 8, width: 184, top: 159, bottom: 43, ...layout }}
        >
            <Border
                variant="6"
                params={2064}
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CatalogUbuntuWithTabsLayoutNavigationList {...navigationList} />
        </Region>
    );
};

/** Named region `layoutContainer` of CatalogUbuntuWithTabsLayout - configured through the parent's `layoutContainer` prop. */
export interface CatalogUbuntuWithTabsLayoutLayoutContainerProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutLayoutContainer = ({ layout }: CatalogUbuntuWithTabsLayoutLayoutContainerProps) => {
    return (
        <Region
            name="layoutContainer"
            tags={[ 'UBUNTU' ]}
            params={2064}
            layout={{ position: 'absolute', left: 200, width: 360, top: 131, bottom: 44, ...layout }}
        />
    );
};

/** Named region `search_waiting_for_results_mask` of CatalogUbuntuWithTabsLayout - configured through the parent's `searchWaitingForResultsMask` prop. */
export interface CatalogUbuntuWithTabsLayoutSearchWaitingForResultsMaskProps {
    layout?: BoxLayout;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const CatalogUbuntuWithTabsLayoutSearchWaitingForResultsMask = ({ layout, visibleSearchWaitingForResultsMask }: CatalogUbuntuWithTabsLayoutSearchWaitingForResultsMaskProps) => {
    return (
        <Region
            name="search_waiting_for_results_mask"
            params={2176}
            visible={visibleSearchWaitingForResultsMask ?? false}
            backgroundColor="#eceae0"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 37, ...layout }}
        />
    );
};
