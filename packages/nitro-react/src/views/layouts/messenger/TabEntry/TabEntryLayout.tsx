import { BoxLayout, Region } from '#base/theme';

import { TabEntryLayoutTab, TabEntryLayoutTabProps } from './TabEntryLayoutTab';

/** Generated from `3098_tab_entry_xml` (layout "tab_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabEntryLayoutProps {
    layout?: BoxLayout;
    tab?: TabEntryLayoutTabProps;
}

export const TabEntryLayout = ({ layout, tab }: TabEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <TabEntryLayoutTab {...tab} />
        </Region>
    );
};
