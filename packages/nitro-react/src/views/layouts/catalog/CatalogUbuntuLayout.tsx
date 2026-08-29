import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1687_catalog_ubuntu_xml` (layout "catalog_ubuntu", 570x640) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuLayoutProps {
    captionSearchHelper?: string;
    catalogHeaderBackgroundBorder?: CatalogUbuntuLayoutCatalogHeaderBackgroundBorderProps;
    clearSearchButton?: CatalogUbuntuLayoutClearSearchButtonProps;
    layout?: BoxLayout;
    layoutContainer?: CatalogUbuntuLayoutLayoutContainerProps;
    navigationContainer?: CatalogUbuntuLayoutNavigationContainerProps;
    onClose?: () => void;
}

export const CatalogUbuntuLayout = ({ captionSearchHelper, catalogHeaderBackgroundBorder, clearSearchButton, layout, layoutContainer, navigationContainer, onClose }: CatalogUbuntuLayoutProps) => {
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
            layout={{ width: 570, height: 640, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
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
                    <CatalogUbuntuLayoutClearSearchButton {...clearSearchButton} />
                </Border>
                <CatalogUbuntuLayoutNavigationContainer {...navigationContainer} />
                <CatalogUbuntuLayoutLayoutContainer
                    tags={[ 'UBUNTU' ]}
                    {...layoutContainer}
                />
            </Region>
        </Frame>
    );
};

/** Named region `catalog.header.background.body` of CatalogUbuntuLayout - configured through the parent's `catalogHeaderBackgroundBody` prop. */
export interface CatalogUbuntuLayoutCatalogHeaderBackgroundBodyProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutCatalogHeaderBackgroundBody = ({ layout, tags }: CatalogUbuntuLayoutCatalogHeaderBackgroundBodyProps) => {
    return (
        <Region
            name="catalog.header.background.body"
            tags={tags}
            backgroundColor="#0e3f52"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 86, ...layout }}
        />
    );
};

/** Named region `catalog.mode.header` of CatalogUbuntuLayout - configured through the parent's `catalogModeHeader` prop. */
export interface CatalogUbuntuLayoutCatalogModeHeaderProps {
    captionCatalogHeaderDescription?: string;
    captionCatalogHeaderTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
    visibleCatalogModeHeader?: boolean;
}

export const CatalogUbuntuLayoutCatalogModeHeader = ({ captionCatalogHeaderDescription, captionCatalogHeaderTitle, layout, tags, visibleCatalogModeHeader }: CatalogUbuntuLayoutCatalogModeHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog.mode.header"
            tags={tags}
            visible={visibleCatalogModeHeader ?? false}
            layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90, ...layout }}
        >
            <Region
                name="catalog.header.title"
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

/** Named region `builder.mode.header` of CatalogUbuntuLayout - configured through the parent's `builderModeHeader` prop. */
export interface CatalogUbuntuLayoutBuilderModeHeaderProps {
    captionBuilderHeaderStatusLimit?: string;
    captionBuilderHeaderStatusMembership?: string;
    captionBuilderHeaderTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutBuilderModeHeader = ({ captionBuilderHeaderStatusLimit, captionBuilderHeaderStatusMembership, captionBuilderHeaderTitle, layout, tags }: CatalogUbuntuLayoutBuilderModeHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builder.mode.header"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90, ...layout }}
        >
            <Region
                name="builder.header.title"
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
                layout={{ position: 'absolute', left: 80, width: 475, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBuilderHeaderStatusMembership ?? t('builder.header.status.membership')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                />
            </Region>
            <Region
                name="builder.header.status.limit"
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

/** Named region `catalog.header.background.border` of CatalogUbuntuLayout - configured through the parent's `catalogHeaderBackgroundBorder` prop. */
export interface CatalogUbuntuLayoutCatalogHeaderBackgroundBorderProps {
    builderModeHeader?: CatalogUbuntuLayoutBuilderModeHeaderProps;
    catalogHeaderBackgroundBody?: CatalogUbuntuLayoutCatalogHeaderBackgroundBodyProps;
    catalogModeHeader?: CatalogUbuntuLayoutCatalogModeHeaderProps;
    layout?: BoxLayout;
    srcCatalogHeaderIcon?: string;
    srcCatalogHeaderImage?: string;
    tags?: string[];
}

export const CatalogUbuntuLayoutCatalogHeaderBackgroundBorder = ({ builderModeHeader, catalogHeaderBackgroundBody, catalogModeHeader, layout, srcCatalogHeaderIcon, srcCatalogHeaderImage, tags }: CatalogUbuntuLayoutCatalogHeaderBackgroundBorderProps) => {
    return (
        <Region
            name="catalog.header.background.border"
            tags={tags}
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 90, ...layout }}
        >
            <CatalogUbuntuLayoutCatalogHeaderBackgroundBody {...catalogHeaderBackgroundBody} />
            <ThemeImage
                name="catalog.header.image"
                src={srcCatalogHeaderImage ?? '${image.library.url}catalogue/catalog_header_roombuilder.gif'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90 }}
            />
            <ThemeImage
                name="catalog.header.icon"
                src={srcCatalogHeaderIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
            />
            <CatalogUbuntuLayoutCatalogModeHeader {...catalogModeHeader} />
            <CatalogUbuntuLayoutBuilderModeHeader {...builderModeHeader} />
        </Region>
    );
};

/** Named region `clear_search_button` of CatalogUbuntuLayout - configured through the parent's `clearSearchButton` prop. */
export interface CatalogUbuntuLayoutClearSearchButtonProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    srcSearchClearIcon?: string;
    tags?: string[];
}

export const CatalogUbuntuLayoutClearSearchButton = ({ layout, onClearSearchButton, srcSearchClearIcon, tags }: CatalogUbuntuLayoutClearSearchButtonProps) => {
    return (
        <Region
            name="clear_search_button"
            tags={tags}
            onPointerTap={onClearSearchButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 160, width: 20, top: 2, height: 20, ...layout }}
        >
            <ThemeImage
                name="search.clear.icon"
                src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Row template `normal_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalListTemplateItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutNormalListTemplateItem = ({ layout, tags }: CatalogUbuntuLayoutNormalListTemplateItemProps) => {
    return (
        <Region
            name="normal_list_template"
            tags={tags}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuLayoutItemHilightInnerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightInner = ({ layout, tags }: CatalogUbuntuLayoutItemHilightInnerProps) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuLayoutItemHilightOuterProps {
    itemHilightInner?: CatalogUbuntuLayoutItemHilightInnerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightOuter = ({ itemHilightInner, layout, tags }: CatalogUbuntuLayoutItemHilightOuterProps) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CatalogUbuntuLayoutItemHilightInner {...itemHilightInner} />
        </Region>
    );
};

/** Row template `normal_topitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuLayoutItemHilightOuterProps;
    layout?: BoxLayout;
    onNormalTopitemTemplate?: () => void;
    srcIcon?: string;
    tags?: string[];
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutNormalTopitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onNormalTopitemTemplate, srcIcon, tags, visibleDropButton }: CatalogUbuntuLayoutNormalTopitemTemplateItemProps) => {
    return (
        <Region
            name="normal_topitem_template"
            tags={tags}
            onPointerTap={onNormalTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CatalogUbuntuLayoutItemHilightOuter {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
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
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuLayoutItemHilightInner2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightInner2 = ({ layout, tags }: CatalogUbuntuLayoutItemHilightInner2Props) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuLayoutItemHilightOuter2Props {
    itemHilightInner?: CatalogUbuntuLayoutItemHilightInner2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightOuter2 = ({ itemHilightInner, layout, tags }: CatalogUbuntuLayoutItemHilightOuter2Props) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19, ...layout }}
        >
            <CatalogUbuntuLayoutItemHilightInner2 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `normal_subitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalSubitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuLayoutItemHilightOuter2Props;
    layout?: BoxLayout;
    onNormalSubitemTemplate?: () => void;
    srcIcon?: string;
    tags?: string[];
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutNormalSubitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onNormalSubitemTemplate, srcIcon, tags, visibleDropButton }: CatalogUbuntuLayoutNormalSubitemTemplateItemProps) => {
    return (
        <Region
            name="normal_subitem_template"
            tags={tags}
            onPointerTap={onNormalSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <CatalogUbuntuLayoutItemHilightOuter2 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
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
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `builders_club_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubListTemplateItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutBuildersClubListTemplateItem = ({ layout, tags }: CatalogUbuntuLayoutBuildersClubListTemplateItemProps) => {
    return (
        <Region
            name="builders_club_list_template"
            tags={tags}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuLayoutItemHilightInner3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightInner3 = ({ layout, tags }: CatalogUbuntuLayoutItemHilightInner3Props) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#ff8d00"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuLayoutItemHilightOuter3Props {
    itemHilightInner?: CatalogUbuntuLayoutItemHilightInner3Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightOuter3 = ({ itemHilightInner, layout, tags }: CatalogUbuntuLayoutItemHilightOuter3Props) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            backgroundColor="#ffb53c"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CatalogUbuntuLayoutItemHilightInner3 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `builders_club_topitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubTopitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuLayoutItemHilightOuter3Props;
    layout?: BoxLayout;
    onBuildersClubTopitemTemplate?: () => void;
    srcIcon?: string;
    tags?: string[];
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutBuildersClubTopitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onBuildersClubTopitemTemplate, srcIcon, tags, visibleDropButton }: CatalogUbuntuLayoutBuildersClubTopitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_topitem_template"
            tags={tags}
            onPointerTap={onBuildersClubTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CatalogUbuntuLayoutItemHilightOuter3 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
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
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_hilight_inner` of CatalogUbuntuLayout - configured through the parent's `itemHilightInner` prop. */
export interface CatalogUbuntuLayoutItemHilightInner4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightInner4 = ({ layout, tags }: CatalogUbuntuLayoutItemHilightInner4Props) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#ff8d00"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CatalogUbuntuLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CatalogUbuntuLayoutItemHilightOuter4Props {
    itemHilightInner?: CatalogUbuntuLayoutItemHilightInner4Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutItemHilightOuter4 = ({ itemHilightInner, layout, tags }: CatalogUbuntuLayoutItemHilightOuter4Props) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            backgroundColor="#ffb53c"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19, ...layout }}
        >
            <CatalogUbuntuLayoutItemHilightInner4 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `builders_club_subitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubSubitemTemplateItemProps {
    captionItemTitle?: string;
    itemHilightOuter?: CatalogUbuntuLayoutItemHilightOuter4Props;
    layout?: BoxLayout;
    onBuildersClubSubitemTemplate?: () => void;
    srcIcon?: string;
    tags?: string[];
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutBuildersClubSubitemTemplateItem = ({ captionItemTitle, itemHilightOuter, layout, onBuildersClubSubitemTemplate, srcIcon, tags, visibleDropButton }: CatalogUbuntuLayoutBuildersClubSubitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_subitem_template"
            tags={tags}
            onPointerTap={onBuildersClubSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <CatalogUbuntuLayoutItemHilightOuter4 {...itemHilightOuter} />
            </Region>
            <ThemeImage
                name="icon"
                tags={[ 'ICON_IMAGE' ]}
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
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
                    tintColor="#999999"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `navigationList` of CatalogUbuntuLayout - configured through the parent's `navigationList` prop. */
export interface CatalogUbuntuLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutNavigationList = ({ itemsNavigationList, layout, tags }: CatalogUbuntuLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <>
                        <CatalogUbuntuLayoutNormalListTemplateItem />
                        <CatalogUbuntuLayoutNormalTopitemTemplateItem />
                        <CatalogUbuntuLayoutNormalSubitemTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubListTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubTopitemTemplateItem />
                        <CatalogUbuntuLayoutBuildersClubSubitemTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `navigationContainer` of CatalogUbuntuLayout - configured through the parent's `navigationContainer` prop. */
export interface CatalogUbuntuLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CatalogUbuntuLayoutNavigationListProps;
    tags?: string[];
}

export const CatalogUbuntuLayoutNavigationContainer = ({ layout, navigationList, tags }: CatalogUbuntuLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 8, width: 184, top: 124, bottom: 43, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CatalogUbuntuLayoutNavigationList {...navigationList} />
        </Region>
    );
};

/** Named region `layoutContainer` of CatalogUbuntuLayout - configured through the parent's `layoutContainer` prop. */
export interface CatalogUbuntuLayoutLayoutContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CatalogUbuntuLayoutLayoutContainer = ({ layout, tags }: CatalogUbuntuLayoutLayoutContainerProps) => {
    return (
        <Region
            name="layoutContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 200, width: 360, top: 96, bottom: 44, ...layout }}
        />
    );
};
