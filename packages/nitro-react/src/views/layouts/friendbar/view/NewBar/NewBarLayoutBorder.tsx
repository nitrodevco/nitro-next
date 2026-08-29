import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NewBarLayoutFriendtools, NewBarLayoutFriendtoolsProps } from './NewBarLayoutFriendtools';

/** Named region `border` of NewBarLayout - configured through the parent's `border` prop. */
export interface NewBarLayoutBorderProps {
    friendtools?: NewBarLayoutFriendtoolsProps;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onBorder?: () => void;
    onButtonLeftPage?: () => void;
    onButtonRightPage?: () => void;
    onCollapseRight?: () => void;
    srcIconsToolbarCollapseRight?: string;
}

export const NewBarLayoutBorder = ({ friendtools, itemsList, layout, onBorder, onButtonLeftPage, onButtonRightPage, onCollapseRight, srcIconsToolbarCollapseRight }: NewBarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 48, ...layout }}
        >
            <NewBarLayoutFriendtools {...friendtools} />
            <Region
                name="button_left_page"
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonLeftPage}
                cursor="pointer"
                layout={{ position: 'absolute', left: 145, width: 28, top: 4, height: 40 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_friends_browse_bg.png')}
                    tint="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 31 }}
                />
                <Icon
                    variant="4"
                    tintColor="#9c9791"
                    layout={{ position: 'absolute', left: 12, width: 10, top: 15, height: 10 }}
                />
            </Region>
            <Region
                name="list"
                layout={{ position: 'absolute', left: 173, top: 6, flexDirection: 'row', gap: 3 }}
            >
                {itemsList}
            </Region>
            <Region
                name="button_right_page"
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonRightPage}
                cursor="pointer"
                layout={{ position: 'absolute', left: 248, width: 29, top: 4, height: 40 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_friends_browse_bg.png')}
                    tint="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 5, height: 31 }}
                />
                <Icon
                    variant="5"
                    tintColor="#9c9791"
                    layout={{ position: 'absolute', left: 11, width: 10, top: 15, height: 10 }}
                />
            </Region>
            <Region
                name="collapse_right"
                onPointerTap={onCollapseRight}
                cursor="pointer"
                layout={{ position: 'absolute', left: 282, width: 15, top: 2, height: 46, justifyContent: 'center' }}
            >
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
                />
                <ThemeImage
                    name="icons_toolbar_collapse_right"
                    src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                    layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
                />
            </Region>
        </Region>
    );
};
