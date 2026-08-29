import { BoxLayout, Region } from '#base/theme';

import { SearchTreeDropdownLayoutSearchTreeDropdown, SearchTreeDropdownLayoutSearchTreeDropdownProps } from './SearchTreeDropdownLayoutSearchTreeDropdown';

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
