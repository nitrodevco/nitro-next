import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1687_catalog_ubuntu_xml` (layout "catalog_ubuntu", 570x640) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogUbuntuLayoutProps {
    captionBuilderHeaderStatusLimit?: string;
    captionBuilderHeaderStatusMembership?: string;
    captionBuilderHeaderTitle?: string;
    captionCatalogHeaderDescription?: string;
    captionCatalogHeaderTitle?: string;
    captionSearchHelper?: string;
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    onClose?: () => void;
    srcCatalogHeaderIcon?: string;
    srcCatalogHeaderImage?: string;
    srcSearchClearIcon?: string;
    visibleCatalogModeHeader?: boolean;
}

export const CatalogUbuntuLayout = ({ captionBuilderHeaderStatusLimit, captionBuilderHeaderStatusMembership, captionBuilderHeaderTitle, captionCatalogHeaderDescription, captionCatalogHeaderTitle, captionSearchHelper, itemsNavigationList, layout, onClearSearchButton, onClose, srcCatalogHeaderIcon, srcCatalogHeaderImage, srcSearchClearIcon, visibleCatalogModeHeader }: CatalogUbuntuLayoutProps) => {
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
            layout={{ width: 570, height: 640, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="catalog.header.background.border"
                    params={144}
                    backgroundColor="#376275"
                    layout={{ position: 'absolute', left: 1, width: 568, top: 0, height: 90 }}
                >
                    <Region
                        name="catalog.header.background.body"
                        params={144}
                        backgroundColor="#0e3f52"
                        layout={{ position: 'absolute', left: 2, width: 564, top: 2, height: 86 }}
                    />
                    <ThemeImage
                        name="catalog.header.image"
                        params={144}
                        src={srcCatalogHeaderImage ?? '${image.library.url}catalogue/catalog_header_roombuilder.gif'}
                        layout={{ position: 'absolute', left: 0, width: 568, top: 0, height: 90 }}
                    />
                    <ThemeImage
                        name="catalog.header.icon"
                        params={16}
                        src={srcCatalogHeaderIcon ?? '${image.library.url}catalogue/icon_1.png'}
                        layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
                    />
                    <Region
                        name="catalog.mode.header"
                        params={16}
                        visible={visibleCatalogModeHeader ?? false}
                        layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
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
                    <Region
                        name="builder.mode.header"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
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
                </Region>
                <Border
                    variant="105"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 184, top: 96, height: 24 }}
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
                    <Region
                        name="clear_search_button"
                        params={17}
                        onPointerTap={onClearSearchButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 160, width: 20, top: 2, height: 20 }}
                    >
                        <ThemeImage
                            name="search.clear.icon"
                            params={16}
                            src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="navigationContainer"
                    params={2064}
                    layout={{ position: 'absolute', left: 8, width: 184, top: 124, height: 473 }}
                >
                    <Border
                        variant="6"
                        params={2064}
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 473 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 3, width: 178, top: 5, height: 463 }}
                    >
                        <Region
                            name="navigationList"
                            params={2064}
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
                </Region>
                <Region
                    name="layoutContainer"
                    tags={[ 'UBUNTU' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 200, width: 360, top: 96, height: 500 }}
                />
            </Region>
        </Frame>
    );
};

/** Row template `normal_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalListTemplateItemProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuLayoutNormalListTemplateItem = ({ layout }: CatalogUbuntuLayoutNormalListTemplateItemProps) => {
    return (
        <Region
            name="normal_list_template"
            params={16}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Row template `normal_topitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalTopitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onNormalTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutNormalTopitemTemplateItem = ({ captionItemTitle, layout, onNormalTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuLayoutNormalTopitemTemplateItemProps) => {
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
                <Region
                    name="item_hilight_outer"
                    params={16}
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
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
                layout={{ position: 'absolute', left: 26, width: 27, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Row template `normal_subitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalSubitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onNormalSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutNormalSubitemTemplateItem = ({ captionItemTitle, layout, onNormalSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuLayoutNormalSubitemTemplateItemProps) => {
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
                <Region
                    name="item_hilight_outer"
                    params={16}
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15 }}
                    />
                </Region>
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
                layout={{ position: 'absolute', left: 42, width: 55, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Row template `builders_club_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubListTemplateItemProps {
    layout?: BoxLayout;
}

export const CatalogUbuntuLayoutBuildersClubListTemplateItem = ({ layout }: CatalogUbuntuLayoutBuildersClubListTemplateItemProps) => {
    return (
        <Region
            name="builders_club_list_template"
            params={16}
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Row template `builders_club_topitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubTopitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onBuildersClubTopitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutBuildersClubTopitemTemplateItem = ({ captionItemTitle, layout, onBuildersClubTopitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuLayoutBuildersClubTopitemTemplateItemProps) => {
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
                <Region
                    name="item_hilight_outer"
                    params={16}
                    backgroundColor="#ffb53c"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#ff8d00"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
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
                layout={{ position: 'absolute', left: 26, width: 27, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Row template `builders_club_subitem_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubSubitemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onBuildersClubSubitemTemplate?: () => void;
    srcIcon?: string;
    visibleDropButton?: boolean;
}

export const CatalogUbuntuLayoutBuildersClubSubitemTemplateItem = ({ captionItemTitle, layout, onBuildersClubSubitemTemplate, srcIcon, visibleDropButton }: CatalogUbuntuLayoutBuildersClubSubitemTemplateItemProps) => {
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
                <Region
                    name="item_hilight_outer"
                    params={16}
                    backgroundColor="#ffb53c"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 19 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#ff8d00"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 15 }}
                    />
                </Region>
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
                layout={{ position: 'absolute', left: 42, width: 55, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
