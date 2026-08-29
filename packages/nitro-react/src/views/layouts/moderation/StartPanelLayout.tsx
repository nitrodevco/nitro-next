import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1123_start_panel_xml` (layout "start_panel", 170x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StartPanelLayoutProps {
    chatlogBut?: StartPanelLayoutChatlogButProps;
    layout?: BoxLayout;
    onClose?: () => void;
    roomToolBut?: StartPanelLayoutRoomToolButProps;
    ticketQueueBut?: StartPanelLayoutTicketQueueButProps;
    userinfoBut?: StartPanelLayoutUserinfoButProps;
}

export const StartPanelLayout = ({ chatlogBut, layout, onClose, roomToolBut, ticketQueueBut, userinfoBut }: StartPanelLayoutProps) => {
    return (
        <Frame
            variant="100"
            id="mod_start_panel"
            name="mod_start_panel"
            caption="Mod Tools"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 170, height: 170, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 158, top: 10, height: 128, flexDirection: 'column' }}>
                <StartPanelLayoutRoomToolBut {...roomToolBut} />
                <StartPanelLayoutChatlogBut {...chatlogBut} />
                <StartPanelLayoutUserinfoBut {...userinfoBut} />
                <StartPanelLayoutTicketQueueBut {...ticketQueueBut} />
            </Region>
        </Frame>
    );
};

/** Named region `room_tool_but` of StartPanelLayout - configured through the parent's `roomToolBut` prop. */
export interface StartPanelLayoutRoomToolButProps {
    captionOffenceName?: string;
    layout?: BoxLayout;
    onRoomToolBut?: () => void;
    visibleMouseover?: boolean;
}

export const StartPanelLayoutRoomToolBut = ({ captionOffenceName, layout, onRoomToolBut, visibleMouseover }: StartPanelLayoutRoomToolButProps) => {
    return (
        <Region
            name="room_tool_but"
            onPointerTap={onRoomToolBut}
            cursor="pointer"
            layout={{ width: 155, height: 30, flexShrink: 0, ...layout }}
        >
            <Border
                variant="102"
                name="mouseover"
                visible={visibleMouseover ?? false}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
            />
            <Region
                name="offence_name"
                layout={{ position: 'absolute', left: 24, width: 123, top: 7, height: 15, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOffenceName ?? 'Room tool for this room'}
                    textStyle="text-style-il-button"
                />
            </Region>
            <ThemeImage
                src={layoutImage('roomtools_history_open_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
            />
        </Region>
    );
};

/** Named region `chatlog_but` of StartPanelLayout - configured through the parent's `chatlogBut` prop. */
export interface StartPanelLayoutChatlogButProps {
    captionOffenceName?: string;
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    visibleMouseover?: boolean;
}

export const StartPanelLayoutChatlogBut = ({ captionOffenceName, layout, onChatlogBut, visibleMouseover }: StartPanelLayoutChatlogButProps) => {
    return (
        <Region
            name="chatlog_but"
            onPointerTap={onChatlogBut}
            cursor="pointer"
            layout={{ width: 155, height: 30, flexShrink: 0, ...layout }}
        >
            <Border
                variant="102"
                name="mouseover"
                visible={visibleMouseover ?? false}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
            />
            <Region
                name="offence_name"
                layout={{ position: 'absolute', left: 24, width: 111, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOffenceName ?? 'Chatlog for this room'}
                    textStyle="text-style-il-button"
                />
            </Region>
            <ThemeImage
                src={layoutImage('roomtools_chat_history.png')}
                layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
            />
        </Region>
    );
};

/** Named region `userinfo_but` of StartPanelLayout - configured through the parent's `userinfoBut` prop. */
export interface StartPanelLayoutUserinfoButProps {
    captionOffenceName?: string;
    layout?: BoxLayout;
    onUserinfoBut?: () => void;
    visibleMouseover?: boolean;
}

export const StartPanelLayoutUserinfoBut = ({ captionOffenceName, layout, onUserinfoBut, visibleMouseover }: StartPanelLayoutUserinfoButProps) => {
    return (
        <Region
            name="userinfo_but"
            onPointerTap={onUserinfoBut}
            cursor="pointer"
            layout={{ width: 155, height: 30, flexShrink: 0, ...layout }}
        >
            <Border
                variant="102"
                name="mouseover"
                visible={visibleMouseover ?? false}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
            />
            <Region
                name="offence_name"
                layout={{ position: 'absolute', left: 24, width: 50, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOffenceName ?? 'User info:'}
                    textStyle="text-style-il-button"
                />
            </Region>
            <ThemeImage
                src={layoutImage('placeholder_avatar_small_head_cropped.png')}
                layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 20 }}
            />
        </Region>
    );
};

/** Named region `ticket_queue_but` of StartPanelLayout - configured through the parent's `ticketQueueBut` prop. */
export interface StartPanelLayoutTicketQueueButProps {
    captionOffenceName?: string;
    layout?: BoxLayout;
    onTicketQueueBut?: () => void;
    visibleMouseover?: boolean;
}

export const StartPanelLayoutTicketQueueBut = ({ captionOffenceName, layout, onTicketQueueBut, visibleMouseover }: StartPanelLayoutTicketQueueButProps) => {
    return (
        <Region
            name="ticket_queue_but"
            onPointerTap={onTicketQueueBut}
            cursor="pointer"
            layout={{ width: 155, height: 30, flexShrink: 0, ...layout }}
        >
            <Border
                variant="102"
                name="mouseover"
                visible={visibleMouseover ?? false}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
            />
            <Region
                name="offence_name"
                layout={{ position: 'absolute', left: 24, width: 78, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOffenceName ?? 'Ticket browser'}
                    textStyle="text-style-il-button"
                />
            </Region>
            <ThemeImage
                src={layoutImage('tools_file_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 20, top: 5, height: 20 }}
            />
        </Region>
    );
};
