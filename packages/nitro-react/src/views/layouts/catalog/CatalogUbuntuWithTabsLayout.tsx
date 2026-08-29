import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1609_catalog_ubuntu_with_tabs_xml` (layout "catalog_ubuntu_with_tabs", 570x635) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuWithTabsLayoutProps {
    captionSearchHelper?: string;
    catalogHeaderBackgroundBorder?: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps;
    layout?: BoxLayout;
    navigationContainer?: CatalogUbuntuWithTabsLayoutNavigationContainerProps;
    onClearSearchButton?: () => void;
    onClose?: () => void;
    onTabButton?: () => void;
    srcSearchClearIcon?: string;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const CatalogUbuntuWithTabsLayout = ({ captionSearchHelper, catalogHeaderBackgroundBorder, layout, navigationContainer, onClearSearchButton, onClose, onTabButton, srcSearchClearIcon, visibleSearchWaitingForResultsMask }: CatalogUbuntuWithTabsLayoutProps) => {
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
            layout={{ width: 570, height: 635, ...layout }}
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
                layout={{ position: 'absolute', left: 200, width: 360, top: 131, bottom: 44 }}
            />
            <TabContext
                variant="3"
                name="tab_context"
                layout={{ position: 'absolute', left: 0, width: 568, top: 5, height: 30 }}
            >
                <TabButton
                    variant="3"
                    name="tab_button"
                    onPointerTap={onTabButton}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 30 }}
                />
            </TabContext>
            {(visibleSearchWaitingForResultsMask ?? false) && (
                <Region
                    name="search_waiting_for_results_mask"
                    backgroundColor="#eceae0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 37 }}
                />
            )}
        </Frame>
    );
};

/** Named region `catalog.header.background.border` of CatalogUbuntuWithTabsLayout - configured through the parent's `catalogHeaderBackgroundBorder` prop. */
export interface CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps {
    captionBuilderHeaderStatusLimit?: string;
    captionBuilderHeaderStatusMembership?: string;
    captionBuilderHeaderTitle?: string;
    captionCatalogHeaderDescription?: string;
    captionCatalogHeaderTitle?: string;
    layout?: BoxLayout;
    srcCatalogHeaderIcon?: string;
    srcCatalogHeaderImage?: string;
    visibleCatalogModeHeader?: boolean;
}

export const CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder = ({ captionBuilderHeaderStatusLimit, captionBuilderHeaderStatusMembership, captionBuilderHeaderTitle, captionCatalogHeaderDescription, captionCatalogHeaderTitle, layout, srcCatalogHeaderIcon, srcCatalogHeaderImage, visibleCatalogModeHeader }: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog.header.background.border"
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 35, height: 90, ...layout }}
        >
            <Region
                name="catalog.header.background.body"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 86 }}
            />
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
            {(visibleCatalogModeHeader ?? false) && (
                <Region
                    name="catalog.mode.header"
                    layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
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
            )}
            <Region
                name="builder.mode.header"
                layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
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
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Row template `normal_topitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onNormalTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItem = ({ captionItemTitle, layout, onNormalTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutNormalTopitemTemplateItemProps) => {
    return (
        <Region
            name="normal_topitem_template"
            onPointerTap={onNormalTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <Region
                    name="item_hilight_outer"
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="icon"
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            {(visibleDropButton ?? false) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#999999"
                    layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
                />
            )}
        </Region>
    );
};

/** Row template `normal_subitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onNormalSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItem = ({ captionItemTitle, layout, onNormalSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutNormalSubitemTemplateItemProps) => {
    return (
        <Region
            name="normal_subitem_template"
            onPointerTap={onNormalSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <Region
                    name="item_hilight_outer"
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19 }}
                >
                    <Region
                        name="item_hilight_inner"
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="icon"
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 42, right: 82, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'sub-item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#52819a' }}
                />
            </Region>
            {(visibleDropButton ?? false) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#999999"
                    layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
                />
            )}
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
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Row template `builders_club_topitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onBuildersClubTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItem = ({ captionItemTitle, layout, onBuildersClubTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutBuildersClubTopitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_topitem_template"
            onPointerTap={onBuildersClubTopitemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <Region
                    name="item_hilight_outer"
                    backgroundColor="#ffb53c"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        backgroundColor="#ff8d00"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="icon"
                src={srcIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 26, right: 127, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            {(visibleDropButton ?? false) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#999999"
                    layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
                />
            )}
        </Region>
    );
};

/** Row template `builders_club_subitem_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onBuildersClubSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItem = ({ captionItemTitle, layout, onBuildersClubSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuWithTabsLayoutBuildersClubSubitemTemplateItemProps) => {
    return (
        <Region
            name="builders_club_subitem_template"
            onPointerTap={onBuildersClubSubitemTemplate}
            cursor="pointer"
            layout={{ width: 179, height: 21, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 20 }}
            >
                <Region
                    name="item_hilight_outer"
                    backgroundColor="#ffb53c"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19 }}
                >
                    <Region
                        name="item_hilight_inner"
                        backgroundColor="#ff8d00"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15 }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="icon"
                src={srcIcon ?? '${image.library.url}catalogue/icon_2.png'}
                layout={{ position: 'absolute', left: 15, width: 20, top: 0, height: 20 }}
            />
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 42, right: 82, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'sub-item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#b77734' }}
                />
            </Region>
            {(visibleDropButton ?? false) && (
                <Icon
                    variant="5"
                    name="drop_button"
                    tintColor="#999999"
                    layout={{ position: 'absolute', left: 145, width: 15, top: 6, height: 15 }}
                />
            )}
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
            layout={{ position: 'absolute', left: 8, width: 184, top: 159, bottom: 43, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CatalogUbuntuWithTabsLayoutNavigationList {...navigationList} />
        </Region>
    );
};
