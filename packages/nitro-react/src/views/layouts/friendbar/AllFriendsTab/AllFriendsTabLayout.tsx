import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { AllFriendsTabLayoutHeaderItem } from './AllFriendsTabLayoutHeaderItem';

/** Generated from `44_all_friends_tab_xml` (layout "all_friends_tab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AllFriendsTabLayoutProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const AllFriendsTabLayout = ({ itemsTabContent, layout }: AllFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#74dbfa"
                layout={{ position: 'absolute', left: 0, width: 127, top: 0, height: 36 }}
            >
                <Region
                    name="tab_content"
                    layout={{ position: 'absolute', left: 7, right: 4, top: 3, height: 31, minHeight: 30, flexDirection: 'column' }}
                >
                    {itemsTabContent ?? (
                        <AllFriendsTabLayoutHeaderItem />
                    )}
                </Region>
            </Border>
        </Region>
    );
};
