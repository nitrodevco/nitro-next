import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { AddFriendsTabLayoutButtonItem } from './AddFriendsTabLayoutButtonItem';
import { AddFriendsTabLayoutHeaderItem } from './AddFriendsTabLayoutHeaderItem';
import { AddFriendsTabLayoutSpacerItem } from './AddFriendsTabLayoutSpacerItem';
import { AddFriendsTabLayoutTextItem } from './AddFriendsTabLayoutTextItem';

/** Generated from `66_add_friends_tab_xml` (layout "entity", 127x164) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddFriendsTabLayoutProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const AddFriendsTabLayout = ({ itemsTabContent, layout }: AddFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 127, height: 164, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#74dbfa"
                layout={{ position: 'absolute', left: 0, width: 127, top: 0, height: 164 }}
            >
                <Region
                    name="tab_content"
                    layout={{ position: 'absolute', left: 7, right: 4, top: 3, height: 140, minHeight: 40, flexDirection: 'column' }}
                >
                    {itemsTabContent ?? (
                        <>
                            <AddFriendsTabLayoutHeaderItem />
                            <AddFriendsTabLayoutTextItem />
                            <AddFriendsTabLayoutSpacerItem />
                            <AddFriendsTabLayoutButtonItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
