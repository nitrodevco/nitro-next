import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `3051_grs_hot_room_details_xml` (layout "grs_hot_room_details", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsHotRoomDetailsLayoutProps {
    detailsContainer?: GrsHotRoomDetailsLayoutDetailsContainerProps;
    layout?: BoxLayout;
}

export const GrsHotRoomDetailsLayout = ({ detailsContainer, layout }: GrsHotRoomDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="0"
                name="popup_container"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 203, top: 0, height: 70 }}
            >
                <GrsHotRoomDetailsLayoutDetailsContainer {...detailsContainer} />
            </Border>
        </Region>
    );
};

/** Named region `details_container` of GrsHotRoomDetailsLayout - configured through the parent's `detailsContainer` prop. */
export interface GrsHotRoomDetailsLayoutDetailsContainerProps {
    layout?: BoxLayout;
}

export const GrsHotRoomDetailsLayoutDetailsContainer = ({ layout }: GrsHotRoomDetailsLayoutDetailsContainerProps) => {
    return (
        <Region
            name="details_container"
            layout={{ position: 'absolute', left: 5, width: 193, top: 5, height: 70, ...layout }}
        />
    );
};
