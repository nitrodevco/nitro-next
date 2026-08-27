import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1123_start_panel_xml` (layout "start_panel", 170x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StartPanelLayoutProps {
    captionOffenceName?: string;
    captionOffenceName2?: string;
    captionOffenceName3?: string;
    captionOffenceName4?: string;
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    onClose?: () => void;
    onRoomToolBut?: () => void;
    onTicketQueueBut?: () => void;
    onUserinfoBut?: () => void;
    visibleMouseover?: boolean;
    visibleMouseover2?: boolean;
    visibleMouseover3?: boolean;
    visibleMouseover4?: boolean;
}

export const StartPanelLayout = ({ captionOffenceName, captionOffenceName2, captionOffenceName3, captionOffenceName4, layout, onChatlogBut, onClose, onRoomToolBut, onTicketQueueBut, onUserinfoBut, visibleMouseover, visibleMouseover2, visibleMouseover3, visibleMouseover4 }: StartPanelLayoutProps) => {
    return (
        <Frame
            variant="100"
            id="mod_start_panel"
            name="mod_start_panel"
            params={32769}
            caption="Mod Tools"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 170, height: 170, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 158, top: 10, height: 128, flexDirection: 'column' }}
                >
                    <Region
                        name="room_tool_but"
                        params={17}
                        onPointerTap={onRoomToolBut}
                        cursor="pointer"
                        layout={{ width: 155, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            visible={visibleMouseover ?? false}
                            layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
                        >
                            <Border
                                variant="102"
                                name="mouseover"
                                params={16}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                        <Region
                            name="offence_name"
                            params={1073741840}
                            layout={{ position: 'absolute', left: 24, width: 123, top: 7, height: 15, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionOffenceName ?? 'Room tool for this room'}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('roomtools_history_open_icon.png')}
                            layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
                        />
                    </Region>
                    <Region
                        name="chatlog_but"
                        params={17}
                        onPointerTap={onChatlogBut}
                        cursor="pointer"
                        layout={{ width: 155, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            visible={visibleMouseover2 ?? false}
                            layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
                        >
                            <Border
                                variant="102"
                                name="mouseover"
                                params={16}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                        <Region
                            name="offence_name"
                            params={272}
                            layout={{ position: 'absolute', left: 24, width: 111, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionOffenceName2 ?? 'Chatlog for this room'}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('roomtools_chat_history.png')}
                            layout={{ position: 'absolute', left: 6, width: 20, top: 6, height: 20 }}
                        />
                    </Region>
                    <Region
                        name="userinfo_but"
                        params={17}
                        onPointerTap={onUserinfoBut}
                        cursor="pointer"
                        layout={{ width: 155, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            visible={visibleMouseover3 ?? false}
                            layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
                        >
                            <Border
                                variant="102"
                                name="mouseover"
                                params={16}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                        <Region
                            name="offence_name"
                            params={32784}
                            layout={{ position: 'absolute', left: 24, width: 50, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionOffenceName3 ?? 'User info:'}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('placeholder_avatar_small_head_cropped.png')}
                            layout={{ position: 'absolute', left: 5, width: 20, top: 4, height: 20 }}
                        />
                    </Region>
                    <Region
                        name="ticket_queue_but"
                        params={17}
                        onPointerTap={onTicketQueueBut}
                        cursor="pointer"
                        layout={{ width: 155, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            visible={visibleMouseover4 ?? false}
                            layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 30 }}
                        >
                            <Border
                                variant="102"
                                name="mouseover"
                                params={16}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                        <Region
                            name="offence_name"
                            params={16}
                            layout={{ position: 'absolute', left: 24, width: 78, top: 7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionOffenceName4 ?? 'Ticket browser'}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('tools_file_icon.png')}
                            layout={{ position: 'absolute', left: 6, width: 20, top: 5, height: 20 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
