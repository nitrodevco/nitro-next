import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SearchTreeDropdownLayoutButtonTemplateItem } from './SearchTreeDropdownLayoutButtonTemplateItem';

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
