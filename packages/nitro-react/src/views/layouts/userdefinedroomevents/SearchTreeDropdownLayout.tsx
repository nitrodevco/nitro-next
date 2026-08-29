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

/** Named region `button_shadow` of SearchTreeDropdownLayout - configured through the parent's `buttonShadow` prop. */
export interface SearchTreeDropdownLayoutButtonShadowProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutButtonShadow = ({ layout }: SearchTreeDropdownLayoutButtonShadowProps) => {
    return (
        <Region
            name="button_shadow"
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, ...layout }}
        />
    );
};

/** Row template `button_template` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutButtonTemplateItemProps {
    buttonShadow?: SearchTreeDropdownLayoutButtonShadowProps;
    layout?: BoxLayout;
    onButtonTemplate?: () => void;
    srcButtonImg?: string;
}

export const SearchTreeDropdownLayoutButtonTemplateItem = ({ buttonShadow, layout, onButtonTemplate, srcButtonImg }: SearchTreeDropdownLayoutButtonTemplateItemProps) => {
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
            <SearchTreeDropdownLayoutButtonShadow {...buttonShadow} />
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

/** Named region `splitter` of SearchTreeDropdownLayout - configured through the parent's `splitter` prop. */
export interface SearchTreeDropdownLayoutSplitterProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSplitter = ({ layout }: SearchTreeDropdownLayoutSplitterProps) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, ...layout }}
        />
    );
};

/** Row template `spacer` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutSpacerItemProps {
    layout?: BoxLayout;
    splitter?: SearchTreeDropdownLayoutSplitterProps;
}

export const SearchTreeDropdownLayoutSpacerItem = ({ layout, splitter }: SearchTreeDropdownLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 195, height: 2, flexShrink: 0, ...layout }}
        >
            <SearchTreeDropdownLayoutSplitter {...splitter} />
        </Region>
    );
};

/** Named region `empty_container` of SearchTreeDropdownLayout - configured through the parent's `emptyContainer` prop. */
export interface SearchTreeDropdownLayoutEmptyContainerProps {
    layout?: BoxLayout;
    visibleEmptyContainer?: boolean;
}

export const SearchTreeDropdownLayoutEmptyContainer = ({ layout, visibleEmptyContainer }: SearchTreeDropdownLayoutEmptyContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="empty_container"
            visible={visibleEmptyContainer ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 52, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 19, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('wiredfurni.variable_picker.empty')}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#333333', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spacing` of SearchTreeDropdownLayout - configured through the parent's `spacing` prop. */
export interface SearchTreeDropdownLayoutSpacingProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSpacing = ({ layout }: SearchTreeDropdownLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 195, height: 3, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `nodes_list` of SearchTreeDropdownLayout - configured through the parent's `nodesList` prop. */
export interface SearchTreeDropdownLayoutNodesListProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutNodesList = ({ layout }: SearchTreeDropdownLayoutNodesListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 195, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="nodes_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `spacing` of SearchTreeDropdownLayout - configured through the parent's `spacing` prop. */
export interface SearchTreeDropdownLayoutSpacing2Props {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSpacing2 = ({ layout }: SearchTreeDropdownLayoutSpacing2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 195, height: 3, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `node_template` of SearchTreeDropdownLayout - configured through the parent's `nodeTemplate` prop. */
export interface SearchTreeDropdownLayoutNodeTemplateProps {
    captionNodeName?: string;
    layout?: BoxLayout;
    onNodeTemplate?: () => void;
}

export const SearchTreeDropdownLayoutNodeTemplate = ({ captionNodeName, layout, onNodeTemplate }: SearchTreeDropdownLayoutNodeTemplateProps) => {
    return (
        <Region
            name="node_template"
            backgroundColor="#ffffff"
            onPointerTap={onNodeTemplate}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20, ...layout }}
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
    );
};

/** Row template `content_box` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutContentBoxItemProps {
    emptyContainer?: SearchTreeDropdownLayoutEmptyContainerProps;
    layout?: BoxLayout;
    nodesList?: SearchTreeDropdownLayoutNodesListProps;
    nodeTemplate?: SearchTreeDropdownLayoutNodeTemplateProps;
    spacing?: SearchTreeDropdownLayoutSpacingProps;
    spacing2?: SearchTreeDropdownLayoutSpacing2Props;
}

export const SearchTreeDropdownLayoutContentBoxItem = ({ emptyContainer, layout, nodesList, nodeTemplate, spacing, spacing2 }: SearchTreeDropdownLayoutContentBoxItemProps) => {
    return (
        <Region
            name="content_box"
            layout={{ width: 195, height: 52, flexShrink: 0, ...layout }}
        >
            <SearchTreeDropdownLayoutEmptyContainer {...emptyContainer} />
            <Border
                variant="3"
                name="variable_overview_template"
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 36 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'column' }}>
                    <SearchTreeDropdownLayoutSpacing {...spacing} />
                    <SearchTreeDropdownLayoutNodesList {...nodesList} />
                    <SearchTreeDropdownLayoutSpacing2 {...spacing2} />
                </Region>
            </Border>
            <SearchTreeDropdownLayoutNodeTemplate {...nodeTemplate} />
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

/** Named region `search_wrapper_expanded` of SearchTreeDropdownLayout - configured through the parent's `searchWrapperExpanded` prop. */
export interface SearchTreeDropdownLayoutSearchWrapperExpandedProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSearchWrapperExpanded = ({ layout }: SearchTreeDropdownLayoutSearchWrapperExpandedProps) => {
    return (
        <Region
            name="search_wrapper_expanded"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `cancel_search` of SearchTreeDropdownLayout - configured through the parent's `cancelSearch` prop. */
export interface SearchTreeDropdownLayoutCancelSearchProps {
    layout?: BoxLayout;
    onCancelSearch?: () => void;
}

export const SearchTreeDropdownLayoutCancelSearch = ({ layout, onCancelSearch }: SearchTreeDropdownLayoutCancelSearchProps) => {
    return (
        <Region
            name="cancel_search"
            onPointerTap={onCancelSearch}
            cursor="pointer"
            layout={{ position: 'absolute', right: 6, width: 9, top: 5, height: 9, ...layout }}
        >
            <ThemeImage
                src={layoutImage('var_picker_cancel_search.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
            />
        </Region>
    );
};

/** Named region `main_cont` of SearchTreeDropdownLayout - configured through the parent's `mainCont` prop. */
export interface SearchTreeDropdownLayoutMainContProps {
    cancelSearch?: SearchTreeDropdownLayoutCancelSearchProps;
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
    searchWrapperExpanded?: SearchTreeDropdownLayoutSearchWrapperExpandedProps;
}

export const SearchTreeDropdownLayoutMainCont = ({ cancelSearch, itemsMainCont, layout, searchWrapperExpanded }: SearchTreeDropdownLayoutMainContProps) => {
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
                <SearchTreeDropdownLayoutSearchWrapperExpanded {...searchWrapperExpanded} />
                <SearchTreeDropdownLayoutCancelSearch {...cancelSearch} />
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

/** Named region `input_field_region` of SearchTreeDropdownLayout - configured through the parent's `inputFieldRegion` prop. */
export interface SearchTreeDropdownLayoutInputFieldRegionProps {
    captionInputPlaceholderText?: string;
    layout?: BoxLayout;
    onInputFieldRegion?: () => void;
}

export const SearchTreeDropdownLayoutInputFieldRegion = ({ captionInputPlaceholderText, layout, onInputFieldRegion }: SearchTreeDropdownLayoutInputFieldRegionProps) => {
    const t = useTranslation();
    const [ inputFieldValue, setInputFieldValue ] = useState('');

    return (
        <Region
            name="input_field_region"
            onPointerTap={onInputFieldRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 20, ...layout }}
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
    );
};

/** Named region `search_wrapper_collapsed` of SearchTreeDropdownLayout - configured through the parent's `searchWrapperCollapsed` prop. */
export interface SearchTreeDropdownLayoutSearchWrapperCollapsedProps {
    inputFieldRegion?: SearchTreeDropdownLayoutInputFieldRegionProps;
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayoutSearchWrapperCollapsed = ({ inputFieldRegion, layout }: SearchTreeDropdownLayoutSearchWrapperCollapsedProps) => {
    return (
        <Region
            name="search_wrapper_collapsed"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 20, ...layout }}
        >
            <SearchTreeDropdownLayoutInputFieldRegion {...inputFieldRegion} />
        </Region>
    );
};

/** Named region `search_tree_dropdown` of SearchTreeDropdownLayout - configured through the parent's `searchTreeDropdown` prop. */
export interface SearchTreeDropdownLayoutSearchTreeDropdownProps {
    expandedViewWrapper?: SearchTreeDropdownLayoutExpandedViewWrapperProps;
    layout?: BoxLayout;
    searchWrapperCollapsed?: SearchTreeDropdownLayoutSearchWrapperCollapsedProps;
}

export const SearchTreeDropdownLayoutSearchTreeDropdown = ({ expandedViewWrapper, layout, searchWrapperCollapsed }: SearchTreeDropdownLayoutSearchTreeDropdownProps) => {
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
            <SearchTreeDropdownLayoutSearchWrapperCollapsed {...searchWrapperCollapsed} />
        </Region>
    );
};
