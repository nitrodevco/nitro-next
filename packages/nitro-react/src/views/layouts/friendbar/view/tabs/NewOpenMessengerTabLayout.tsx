import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `51_new_open_messenger_tab_xml` (layout "new_open_messenger_tab", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewOpenMessengerTabLayoutProps {
    container?: NewOpenMessengerTabLayoutContainerProps;
    layout?: BoxLayout;
}

export const NewOpenMessengerTabLayout = ({ container, layout }: NewOpenMessengerTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <NewOpenMessengerTabLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of NewOpenMessengerTabLayout - configured through the parent's `container` prop. */
export interface NewOpenMessengerTabLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    tags?: string[];
}

export const NewOpenMessengerTabLayoutContainer = ({ layout, onContainer, tags }: NewOpenMessengerTabLayoutContainerProps) => {
    return (
        <Region
            name="container"
            tags={tags}
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                src={layoutImage('friend_bar_friendlist_messenger.png')}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};
