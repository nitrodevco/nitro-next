import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardInfoLayoutGiveGiftButtonItem } from './PackagecardInfoLayoutGiveGiftButtonItem';
import { PackagecardInfoLayoutOpenGiftButtonItem } from './PackagecardInfoLayoutOpenGiftButtonItem';

/** Row template `button_list` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardInfoLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, minWidth: 330, maxWidth: 360, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardInfoLayoutOpenGiftButtonItem />
                    <PackagecardInfoLayoutGiveGiftButtonItem />
                </>
            )}
        </Region>
    );
};
