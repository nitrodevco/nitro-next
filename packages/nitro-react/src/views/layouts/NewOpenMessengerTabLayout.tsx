import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `51_new_open_messenger_tab_xml` (layout "new_open_messenger_tab", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewOpenMessengerTabLayoutProps {
    layout?: BoxLayout;
}

export const NewOpenMessengerTabLayout = ({ layout }: NewOpenMessengerTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                name="container"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('friend_bar_friendlist_messenger.png')}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
