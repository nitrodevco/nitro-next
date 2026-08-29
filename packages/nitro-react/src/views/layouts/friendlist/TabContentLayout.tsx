import { BoxLayout, Region } from '#base/theme';

/** Generated from `1498_tab_content_xml` (layout "tab_content", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabContentLayoutProps {
    layout?: BoxLayout;
    tabContent?: TabContentLayoutTabContentProps;
}

export const TabContentLayout = ({ layout, tabContent }: TabContentLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <TabContentLayoutTabContent {...tabContent} />
        </Region>
    );
};

/** Named region `list_content` of TabContentLayout - configured through the parent's `listContent` prop. */
export interface TabContentLayoutListContentProps {
    layout?: BoxLayout;
}

export const TabContentLayoutListContent = ({ layout }: TabContentLayoutListContentProps) => {
    return (
        <Region
            name="list_content"
            params={17}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 95, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `list` of TabContentLayout - configured through the parent's `list` prop. */
export interface TabContentLayoutListProps {
    layout?: BoxLayout;
    listContent?: TabContentLayoutListContentProps;
}

export const TabContentLayoutList = ({ layout, listContent }: TabContentLayoutListProps) => {
    return (
        <Region
            name="list"
            params={16}
            layout={{ position: 'absolute', left: 5, width: 218, top: 5, height: 95, ...layout }}
        >
            <TabContentLayoutListContent {...listContent} />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `tab_content` of TabContentLayout - configured through the parent's `tabContent` prop. */
export interface TabContentLayoutTabContentProps {
    layout?: BoxLayout;
    list?: TabContentLayoutListProps;
    onTabContent?: () => void;
}

export const TabContentLayoutTabContent = ({ layout, list, onTabContent }: TabContentLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={17}
            backgroundColor="#cccccc"
            onPointerTap={onTabContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 223, top: 18, height: 100, ...layout }}
        >
            <TabContentLayoutList {...list} />
        </Region>
    );
};
