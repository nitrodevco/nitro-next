import { useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1113_roomtool_frame_xml` (layout "roomtool_frame", 240x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolFrameLayoutProps {
    layout?: BoxLayout;
    onChangenameCheck?: () => void;
    onChatlogBut?: () => void;
    onClose?: () => void;
    onEditInHkBut?: () => void;
    onEnterRoomBut?: () => void;
    onKickCheck?: () => void;
    onLockCheck?: () => void;
    onMsgTemplatesSelect?: () => void;
    onSendCautionBut?: () => void;
    onSendMessageBut?: () => void;
}

export const RoomtoolFrameLayout = ({ layout, onChangenameCheck, onChatlogBut, onClose, onEditInHkBut, onEnterRoomBut, onKickCheck, onLockCheck, onMsgTemplatesSelect, onSendCautionBut, onSendMessageBut }: RoomtoolFrameLayoutProps) => {
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="0"
            params={32769}
            caption="Room Info"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 240, height: 437, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="list_cont"
                    params={8388625}
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 405, flexDirection: 'column' }}
                >
                    <Border
                        variant="0"
                        name="room_cont"
                        params={4194320}
                        layout={{ width: 230, height: 97, flexShrink: 0 }}
                    >
                        <Region
                            name="room_data"
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 220, top: 5, height: 90 }}
                        >
                            <Region
                                name="name"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="PH Room Name: Neque porro quisquam est que"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region
                                name="desc"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 220, top: 30, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
                                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region
                                name="tags_cont"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 220, top: 60, height: 30 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Tags:" />
                                </Region>
                                <Region
                                    name="tags_txt"
                                    params={144}
                                    layout={{ position: 'absolute', left: 40, width: 178, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="PH Room Name: Neque porro quisquam est que"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Border>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Border
                        variant="0"
                        name="info_cont"
                        params={16}
                        layout={{ width: 230, height: 74, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 80, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Room owner:" />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 90, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Users in room:" />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 90, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Owner in room:" />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 90, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Has event:" />
                        </Region>
                        <Region
                            name="owner_name_txt"
                            params={17}
                            layout={{ position: 'absolute', left: 85, width: 71, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="sulka" />
                        </Region>
                        <Region
                            name="owner_in_room_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 100, width: 40, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="yes" />
                        </Region>
                        <Region
                            name="user_count_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 100, width: 40, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="18" />
                        </Region>
                        <Region
                            name="has_event_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 100, width: 40, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="no" />
                        </Region>
                        <Button
                            variant="0"
                            name="enter_room_but"
                            params={131089}
                            onPointerTap={onEnterRoomBut}
                            layout={{ position: 'absolute', left: 155, width: 70, top: 4, height: 21, minWidth: 70, maxWidth: 70 }}
                        >
                            Enter room
                        </Button>
                        <Button
                            variant="0"
                            name="chatlog_but"
                            params={131089}
                            onPointerTap={onChatlogBut}
                            layout={{ position: 'absolute', left: 155, width: 70, top: 26, height: 21, minWidth: 70, maxWidth: 70 }}
                        >
                            Chatlog
                        </Button>
                        <Button
                            variant="0"
                            name="edit_in_hk_but"
                            params={131089}
                            onPointerTap={onEditInHkBut}
                            layout={{ position: 'absolute', left: 155, width: 70, top: 48, height: 21, minWidth: 70, maxWidth: 70 }}
                        >
                            Edit in HK
                        </Button>
                    </Border>
                    <Region
                        name="event_spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Border
                        variant="0"
                        name="event_cont"
                        params={16}
                        layout={{ width: 230, height: 17, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Border
                        variant="0"
                        name="act_cont"
                        params={16}
                        layout={{ width: 230, height: 76, flexShrink: 0 }}
                    >
                        <CheckBox
                            variant="0"
                            name="kick_check"
                            params={17}
                            onPointerTap={onKickCheck}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                        >
                            Room Info
                        </CheckBox>
                        <CheckBox
                            variant="0"
                            name="lock_check"
                            params={17}
                            onPointerTap={onLockCheck}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 30, height: 16 }}
                        >
                            Room Info
                        </CheckBox>
                        <CheckBox
                            variant="0"
                            name="changename_check"
                            params={17}
                            onPointerTap={onChangenameCheck}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 54, height: 16 }}
                        >
                            Room Info
                        </CheckBox>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 24, width: 199, top: 5, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Kick users out of the room (automatically stops the event)"
                                textOptions={{ wordWrap: true, wordWrapWidth: 199 }}
                            />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 24, width: 199, top: 31, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Change room lock to doorbell" />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 24, width: 199, top: 48, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Change room name to 'Inappropriate to hotel management'"
                                textOptions={{ wordWrap: true, wordWrapWidth: 199 }}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Dropmenu
                        variant="0"
                        name="msgTemplatesSelect"
                        params={1}
                        onPointerTap={onMsgTemplatesSelect}
                        layout={{ width: 227, height: 20, flexShrink: 0 }}
                    >
                        Select from message templates
                    </Dropmenu>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <TextInput
                        value={messageInputValue}
                        onChange={setMessageInputValue}
                        backgroundColor="#ffffff"
                        layout={{ width: 227, height: 45, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 230, height: 5, flexShrink: 0 }}
                    />
                    <Region
                        name="footer_cont"
                        params={16}
                        layout={{ width: 230, height: 21, flexShrink: 0 }}
                    >
                        <Button
                            variant="0"
                            name="send_caution_but"
                            params={131089}
                            onPointerTap={onSendCautionBut}
                            layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 21, minWidth: 97, maxWidth: 97 }}
                        >
                            Send Caution
                        </Button>
                        <Button
                            variant="0"
                            name="send_message_but"
                            params={131089}
                            onPointerTap={onSendMessageBut}
                            layout={{ position: 'absolute', left: 131, width: 97, top: 0, height: 21, minWidth: 97, maxWidth: 97 }}
                        >
                            Send message
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
