import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `9_new_search_friends_tab_xml` (layout "new_search_friends_tab", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewSearchFriendsTabLayoutProps {
    container?: NewSearchFriendsTabLayoutContainerProps;
    layout?: BoxLayout;
}

export const NewSearchFriendsTabLayout = ({ container, layout }: NewSearchFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <NewSearchFriendsTabLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of NewSearchFriendsTabLayout - configured through the parent's `container` prop. */
export interface NewSearchFriendsTabLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
}

export const NewSearchFriendsTabLayoutContainer = ({ layout, onContainer }: NewSearchFriendsTabLayoutContainerProps) => {
    return (
        <Region
            name="container"
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_search_habbos.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};
