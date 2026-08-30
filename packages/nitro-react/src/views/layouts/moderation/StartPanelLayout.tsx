import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1123_start_panel_xml` (layout "start_panel", 170x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StartPanelLayoutProps {
    captionChatlogButOffenceName?: string;
    captionOffenceName?: string;
    captionTicketQueueButOffenceName?: string;
    captionUserinfoButOffenceName?: string;
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    onClose?: () => void;
    onRoomToolBut?: () => void;
    onTicketQueueBut?: () => void;
    onUserinfoBut?: () => void;
    visibleChatlogButMouseover?: boolean;
    visibleMouseover?: boolean;
    visibleTicketQueueButMouseover?: boolean;
    visibleUserinfoButMouseover?: boolean;
}

export const StartPanelLayout = ({ captionChatlogButOffenceName, captionOffenceName, captionTicketQueueButOffenceName, captionUserinfoButOffenceName, layout, onChatlogBut, onClose, onRoomToolBut, onTicketQueueBut, onUserinfoBut, visibleChatlogButMouseover, visibleMouseover, visibleTicketQueueButMouseover, visibleUserinfoButMouseover }: StartPanelLayoutProps) => {
    return (
        <Frame
            variant="100"
            id="mod_start_panel"
            name="mod_start_panel"
            caption="Mod Tools"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 170, height: 170, minWidth: 170, minHeight: 170, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: -9, flexDirection: 'column' }}>
                <Region
                    name="room_tool_but"
                    onPointerTap={onRoomToolBut}
                    cursor="pointer"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    {(visibleMouseover ?? false) && (
                        <Border
                            variant="102"
                            name="mouseover"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                    <ThemeText
                        text={captionOffenceName ?? 'Room tool for this room'}
                        textStyle="text-style-il-button"
                        name="offence_name"
                        layout={{ position: 'absolute', right: 8, width: 123, top: 7, bottom: 8, overflow: 'hidden' }}
                    />
                    <ThemeImage
                        src={layoutImage('roomtools_history_open_icon.png')}
                        layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
                    />
                </Region>
                <Region
                    name="chatlog_but"
                    onPointerTap={onChatlogBut}
                    cursor="pointer"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, justifyContent: 'center' }}
                >
                    {(visibleChatlogButMouseover ?? false) && (
                        <Border
                            variant="102"
                            name="mouseover"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                    <ThemeText
                        text={captionChatlogButOffenceName ?? 'Chatlog for this room'}
                        textStyle="text-style-il-button"
                        name="offence_name"
                        layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 111, top: 7, bottom: 8 }}
                    />
                    <ThemeImage
                        src={layoutImage('roomtools_chat_history.png')}
                        layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
                    />
                </Region>
                <Region
                    name="userinfo_but"
                    onPointerTap={onUserinfoBut}
                    cursor="pointer"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    {(visibleUserinfoButMouseover ?? false) && (
                        <Border
                            variant="102"
                            name="mouseover"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                    <ThemeText
                        text={captionUserinfoButOffenceName ?? 'User info:'}
                        textStyle="text-style-il-button"
                        name="offence_name"
                        layout={{ position: 'absolute', left: 24, width: 50, top: 7, bottom: 8 }}
                    />
                    <ThemeImage
                        src={layoutImage('placeholder_avatar_small_head_cropped.png')}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 20 }}
                    />
                </Region>
                <Region
                    name="ticket_queue_but"
                    onPointerTap={onTicketQueueBut}
                    cursor="pointer"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    {(visibleTicketQueueButMouseover ?? false) && (
                        <Border
                            variant="102"
                            name="mouseover"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                    <ThemeText
                        text={captionTicketQueueButOffenceName ?? 'Ticket browser'}
                        textStyle="text-style-il-button"
                        name="offence_name"
                        layout={{ position: 'absolute', left: 24, width: 78, top: 7, bottom: 8 }}
                    />
                    <ThemeImage
                        src={layoutImage('tools_file_icon.png')}
                        layout={{ position: 'absolute', left: 6, width: 20, top: 5, height: 20 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
