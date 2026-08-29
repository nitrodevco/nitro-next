import { BoxLayout, Region } from '#base/theme';

/** Generated from `967_room_view_container_xml` (layout "room_view_container", 160x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomViewContainerLayoutProps {
    layout?: BoxLayout;
    roomViewContainer?: RoomViewContainerLayoutRoomViewContainerProps;
}

export const RoomViewContainerLayout = ({ layout, roomViewContainer }: RoomViewContainerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 160, height: 100, ...layout }}>
            <RoomViewContainerLayoutRoomViewContainer {...roomViewContainer} />
        </Region>
    );
};

/** Named region `background_wrapper` of RoomViewContainerLayout - configured through the parent's `backgroundWrapper` prop. */
export interface RoomViewContainerLayoutBackgroundWrapperProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleBackgroundWrapper?: boolean;
}

export const RoomViewContainerLayoutBackgroundWrapper = ({ layout, tags, visibleBackgroundWrapper }: RoomViewContainerLayoutBackgroundWrapperProps) => {
    return (
        <Region
            name="background_wrapper"
            tags={tags}
            visible={visibleBackgroundWrapper ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `room_canvas_wrapper` of RoomViewContainerLayout - configured through the parent's `roomCanvasWrapper` prop. */
export interface RoomViewContainerLayoutRoomCanvasWrapperProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomViewContainerLayoutRoomCanvasWrapper = ({ layout, tags }: RoomViewContainerLayoutRoomCanvasWrapperProps) => {
    return (
        <Region
            name="room_canvas_wrapper"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `colorizer_wrapper` of RoomViewContainerLayout - configured through the parent's `colorizerWrapper` prop. */
export interface RoomViewContainerLayoutColorizerWrapperProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomViewContainerLayoutColorizerWrapper = ({ layout, tags }: RoomViewContainerLayoutColorizerWrapperProps) => {
    return (
        <Region
            name="colorizer_wrapper"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `room_view_container` of RoomViewContainerLayout - configured through the parent's `roomViewContainer` prop. */
export interface RoomViewContainerLayoutRoomViewContainerProps {
    backgroundWrapper?: RoomViewContainerLayoutBackgroundWrapperProps;
    colorizerWrapper?: RoomViewContainerLayoutColorizerWrapperProps;
    layout?: BoxLayout;
    roomCanvasWrapper?: RoomViewContainerLayoutRoomCanvasWrapperProps;
    tags?: string[];
}

export const RoomViewContainerLayoutRoomViewContainer = ({ backgroundWrapper, colorizerWrapper, layout, roomCanvasWrapper, tags }: RoomViewContainerLayoutRoomViewContainerProps) => {
    return (
        <Region
            name="room_view_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <RoomViewContainerLayoutBackgroundWrapper {...backgroundWrapper} />
            <RoomViewContainerLayoutRoomCanvasWrapper {...roomCanvasWrapper} />
            <RoomViewContainerLayoutColorizerWrapper {...colorizerWrapper} />
        </Region>
    );
};
