import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `45_new_all_friends_tab_xml` (layout "new_all_friends_tab", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewAllFriendsTabLayoutProps {
    layout?: BoxLayout;
    onContainer?: () => void;
}

export const NewAllFriendsTabLayout = ({ layout, onContainer }: NewAllFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                name="container"
                params={17}
                onPointerTap={onContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('friend_bar_all_friends.png')}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
