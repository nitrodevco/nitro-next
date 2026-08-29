import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `45_new_all_friends_tab_xml` (layout "new_all_friends_tab", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewAllFriendsTabLayoutProps {
    container?: NewAllFriendsTabLayoutContainerProps;
    layout?: BoxLayout;
}

export const NewAllFriendsTabLayout = ({ container, layout }: NewAllFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <NewAllFriendsTabLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of NewAllFriendsTabLayout - configured through the parent's `container` prop. */
export interface NewAllFriendsTabLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    tags?: string[];
}

export const NewAllFriendsTabLayoutContainer = ({ layout, onContainer, tags }: NewAllFriendsTabLayoutContainerProps) => {
    return (
        <Region
            name="container"
            tags={tags}
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_all_friends.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};
