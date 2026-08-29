import { BoxLayout, Region } from '#base/theme';

import { SearchEntryLayoutEntry, SearchEntryLayoutEntryProps } from './SearchEntryLayoutEntry';

/** Generated from `1525_search_entry_xml` (layout "search_entry", 190x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchEntryLayoutProps {
    entry?: SearchEntryLayoutEntryProps;
    layout?: BoxLayout;
}

export const SearchEntryLayout = ({ entry, layout }: SearchEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 190, height: 20, ...layout }}>
            <SearchEntryLayoutEntry {...entry} />
        </Region>
    );
};
