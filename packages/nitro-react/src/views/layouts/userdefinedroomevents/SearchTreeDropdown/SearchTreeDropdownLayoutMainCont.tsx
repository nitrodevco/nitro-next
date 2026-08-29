import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SearchTreeDropdownLayoutButtonListItem } from './SearchTreeDropdownLayoutButtonListItem';
import { SearchTreeDropdownLayoutContentBoxItem } from './SearchTreeDropdownLayoutContentBoxItem';
import { SearchTreeDropdownLayoutSpacerItem } from './SearchTreeDropdownLayoutSpacerItem';
import { SearchTreeDropdownLayoutSpacingItem } from './SearchTreeDropdownLayoutSpacingItem';

/** Named region `main_cont` of SearchTreeDropdownLayout - configured through the parent's `mainCont` prop. */
export interface SearchTreeDropdownLayoutMainContProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
    onCancelSearch?: () => void;
    searchWrapperExpanded?: ReactNode;
}

export const SearchTreeDropdownLayoutMainCont = ({ itemsMainCont, layout, onCancelSearch, searchWrapperExpanded }: SearchTreeDropdownLayoutMainContProps) => {
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
                >
                    {searchWrapperExpanded}
                </Region>
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
