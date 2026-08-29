import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1152_search_tree_dropdown_xml` (layout "search_tree_dropdown", 197x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchTreeDropdownLayoutProps {
    layout?: BoxLayout;
    searchTreeDropdown?: SearchTreeDropdownLayoutSearchTreeDropdownProps;
}

export const SearchTreeDropdownLayout = ({ layout, searchTreeDropdown }: SearchTreeDropdownLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 197, height: 22, ...layout }}>
            <SearchTreeDropdownLayoutSearchTreeDropdown {...searchTreeDropdown} />
        </Region>
    );
};

/** Row template `button_template` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutButtonTemplateItemProps {
    layout?: BoxLayout;
    onButtonTemplate?: () => void;
    srcButtonImg?: string;
}

export const SearchTreeDropdownLayoutButtonTemplateItem = ({ layout, onButtonTemplate, srcButtonImg }: SearchTreeDropdownLayoutButtonTemplateItemProps) => {
    return (
        <Region
            name="button_template"
            onPointerTap={onButtonTemplate}
            cursor="pointer"
            layout={{ width: 30, height: 20, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                name="button_border"
                tintColor="#fafafa"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="button_img"
                    src={srcButtonImg}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            </Border>
            <Region
                name="button_shadow"
                backgroundColor="#dddddd"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2 }}
            />
        </Region>
    );
};

/** Row template `button_list` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutButtonListItem = ({ itemsButtonList, layout }: SearchTreeDropdownLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ width: 196, height: 20, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsButtonList ?? (
                <SearchTreeDropdownLayoutButtonTemplateItem />
            )}
        </Region>
    );
};

/** Row template `spacer` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSpacerItem = ({ layout }: SearchTreeDropdownLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 195, height: 2, flexShrink: 0, ...layout }}
        >
            <Region
                name="splitter"
                backgroundColor="#dddddd"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
        </Region>
    );
};

/** Row template `content_box` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutContentBoxItemProps {
    captionNodeName?: string;
    layout?: BoxLayout;
    onNodeTemplate?: () => void;
    visibleEmptyContainer?: boolean;
}

export const SearchTreeDropdownLayoutContentBoxItem = ({ captionNodeName, layout, onNodeTemplate, visibleEmptyContainer }: SearchTreeDropdownLayoutContentBoxItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_box"
            layout={{ width: 195, height: 52, flexShrink: 0, ...layout }}
        >
            {(visibleEmptyContainer ?? false) && (
                <Region
                    name="empty_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 52 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, top: 19, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('wiredfurni.variable_picker.empty')}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#333333', align: 'center' }}
                        />
                    </Region>
                </Region>
            )}
            <Border
                variant="3"
                name="variable_overview_template"
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 36 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'column' }}>
                    <Region
                        name="spacing"
                        layout={{ width: 195, height: 3, flexShrink: 0 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 195, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="nodes_list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="spacing"
                        layout={{ width: 195, height: 3, flexShrink: 0 }}
                    />
                </Region>
            </Border>
            <Region
                name="node_template"
                backgroundColor="#ffffff"
                onPointerTap={onNodeTemplate}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20 }}
            >
                <Icon
                    variant="5"
                    name="right_triangle_icon"
                    tintColor="#777777"
                    layout={{ position: 'absolute', right: 6, width: 10, alignSelf: 'center', height: 10 }}
                />
                <Region
                    name="node_name"
                    layout={{ position: 'absolute', left: 7, width: 29, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNodeName ?? 'name'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `spacing` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSpacingItem = ({ layout }: SearchTreeDropdownLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 0, height: 2, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `main_cont` of SearchTreeDropdownLayout - configured through the parent's `mainCont` prop. */
export interface SearchTreeDropdownLayoutMainContProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
    onCancelSearch?: () => void;
}

export const SearchTreeDropdownLayoutMainCont = ({ itemsMainCont, layout, onCancelSearch }: SearchTreeDropdownLayoutMainContProps) => {
    return (
        <Region
            name="main_cont"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        >
            {itemsMainCont ?? (
                <>
                    <SearchTreeDropdownLayoutButtonListItem />
                    <SearchTreeDropdownLayoutSpacerItem />
                    <SearchTreeDropdownLayoutContentBoxItem />
                    <SearchTreeDropdownLayoutSpacingItem />
                </>
            )}
            <Region layout={{ width: 196, height: 20, flexShrink: 0 }}>
                <Region
                    name="search_wrapper_expanded"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                />
                <Region
                    name="cancel_search"
                    onPointerTap={onCancelSearch}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 6, width: 9, top: 5, height: 9 }}
                >
                    <ThemeImage
                        src={layoutImage('var_picker_cancel_search.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `expanded_view_wrapper` of SearchTreeDropdownLayout - configured through the parent's `expandedViewWrapper` prop. */
export interface SearchTreeDropdownLayoutExpandedViewWrapperProps {
    layout?: BoxLayout;
    mainCont?: SearchTreeDropdownLayoutMainContProps;
}

export const SearchTreeDropdownLayoutExpandedViewWrapper = ({ layout, mainCont }: SearchTreeDropdownLayoutExpandedViewWrapperProps) => {
    return (
        <Region
            name="expanded_view_wrapper"
            layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 1000, ...layout }}
        >
            <Border
                variant="12"
                name="expanded_view"
                layout={{ position: 'absolute', left: 0, width: 198, top: 0, bottom: 904 }}
            >
                <SearchTreeDropdownLayoutMainCont {...mainCont} />
            </Border>
        </Region>
    );
};

/** Named region `search_tree_dropdown` of SearchTreeDropdownLayout - configured through the parent's `searchTreeDropdown` prop. */
export interface SearchTreeDropdownLayoutSearchTreeDropdownProps {
    captionInputPlaceholderText?: string;
    expandedViewWrapper?: SearchTreeDropdownLayoutExpandedViewWrapperProps;
    layout?: BoxLayout;
    onInputFieldRegion?: () => void;
}

export const SearchTreeDropdownLayoutSearchTreeDropdown = ({ captionInputPlaceholderText, expandedViewWrapper, layout, onInputFieldRegion }: SearchTreeDropdownLayoutSearchTreeDropdownProps) => {
    const t = useTranslation();
    const [ inputFieldValue, setInputFieldValue ] = useState('');

    return (
        <Region
            name="search_tree_dropdown"
            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 22, ...layout }}
        >
            <Border
                variant="12"
                name="collapsed_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Icon
                    variant="7"
                    name="down_icon"
                    tintColor="#777777"
                    layout={{ position: 'absolute', right: 8, width: 10, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 5 }}
                />
            </Border>
            <SearchTreeDropdownLayoutExpandedViewWrapper {...expandedViewWrapper} />
            <Region
                name="search_wrapper_collapsed"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 20 }}
            >
                <Region
                    name="input_field_region"
                    onPointerTap={onInputFieldRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 20 }}
                >
                    <Region
                        name="input_placeholder_text"
                        layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInputPlaceholderText ?? t('wiredfurni.variable_picker.search')}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#808080', wordWrap: true }}
                        />
                    </Region>
                    <TextInput
                        value={inputFieldValue}
                        onChange={setInputFieldValue}
                        maxLength={60}
                        layout={{ position: 'absolute', left: 7, right: 0, top: 3, bottom: 0, overflow: 'hidden' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
