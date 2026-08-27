import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1113_roomtool_frame_xml` (layout "roomtool_frame", 240x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolFrameLayoutProps {
    itemsListCont?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RoomtoolFrameLayout = ({ itemsListCont, layout, onClose }: RoomtoolFrameLayoutProps) => {
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
                    {itemsListCont ?? (
                        <>
                            <RoomtoolFrameLayoutRoomContItem />
                            <RoomtoolFrameLayoutSpacingItem />
                            <RoomtoolFrameLayoutInfoContItem />
                            <RoomtoolFrameLayoutEventSpacingItem />
                            <RoomtoolFrameLayoutEventContItem />
                            <RoomtoolFrameLayoutSpacingItem2 />
                            <RoomtoolFrameLayoutActContItem />
                            <RoomtoolFrameLayoutSpacingItem3 />
                            <RoomtoolFrameLayoutMsgTemplatesSelectItem />
                            <RoomtoolFrameLayoutSpacingItem4 />
                            <RoomtoolFrameLayoutMessageInputItem />
                            <RoomtoolFrameLayoutSpacingItem5 />
                            <RoomtoolFrameLayoutSpacingItem6 />
                            <RoomtoolFrameLayoutFooterContItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `room_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutRoomContItemProps {
    captionDesc?: string;
    captionName?: string;
    captionTagsTxt?: string;
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutRoomContItem = ({ captionDesc, captionName, captionTagsTxt, layout }: RoomtoolFrameLayoutRoomContItemProps) => {
    return (
        <Border
            variant="0"
            name="room_cont"
            params={4194320}
            layout={{ width: 230, height: 97, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_data"
                params={16}
                layout={{ position: 'absolute', left: 5, width: 220, top: 5, height: 90 }}
            >
                <Region
                    name="name"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'PH Room Name: Neque porro quisquam est que'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                    />
                </Region>
                <Region
                    name="desc"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
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
                        layout={{ position: 'absolute', left: 40, right: 2, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTagsTxt ?? 'PH Room Name: Neque porro quisquam est que'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Border>
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem = ({ layout }: RoomtoolFrameLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `info_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutInfoContItemProps {
    captionHasEventTxt?: string;
    captionOwnerInRoomTxt?: string;
    captionOwnerNameTxt?: string;
    captionUserCountTxt?: string;
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    onEditInHkBut?: () => void;
    onEnterRoomBut?: () => void;
}

export const RoomtoolFrameLayoutInfoContItem = ({ captionHasEventTxt, captionOwnerInRoomTxt, captionOwnerNameTxt, captionUserCountTxt, layout, onChatlogBut, onEditInHkBut, onEnterRoomBut }: RoomtoolFrameLayoutInfoContItemProps) => {
    return (
        <Border
            variant="0"
            name="info_cont"
            params={16}
            layout={{ width: 230, height: 74, flexShrink: 0, ...layout }}
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
                <ThemeText text={captionOwnerNameTxt ?? 'sulka'} />
            </Region>
            <Region
                name="owner_in_room_txt"
                params={16}
                layout={{ position: 'absolute', left: 100, width: 40, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOwnerInRoomTxt ?? 'yes'} />
            </Region>
            <Region
                name="user_count_txt"
                params={16}
                layout={{ position: 'absolute', left: 100, width: 40, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserCountTxt ?? '18'} />
            </Region>
            <Region
                name="has_event_txt"
                params={16}
                layout={{ position: 'absolute', left: 100, width: 40, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHasEventTxt ?? 'no'} />
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
    );
};

/** Row template `event_spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutEventSpacingItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutEventSpacingItem = ({ layout }: RoomtoolFrameLayoutEventSpacingItemProps) => {
    return (
        <Region
            name="event_spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `event_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutEventContItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutEventContItem = ({ layout }: RoomtoolFrameLayoutEventContItemProps) => {
    return (
        <Border
            variant="0"
            name="event_cont"
            params={16}
            layout={{ width: 230, height: 17, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem2Props {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem2 = ({ layout }: RoomtoolFrameLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `act_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutActContItemProps {
    layout?: BoxLayout;
    onChangenameCheck?: () => void;
    onKickCheck?: () => void;
    onLockCheck?: () => void;
}

export const RoomtoolFrameLayoutActContItem = ({ layout, onChangenameCheck, onKickCheck, onLockCheck }: RoomtoolFrameLayoutActContItemProps) => {
    return (
        <Border
            variant="0"
            name="act_cont"
            params={16}
            layout={{ width: 230, height: 76, flexShrink: 0, ...layout }}
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
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem3Props {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem3 = ({ layout }: RoomtoolFrameLayoutSpacingItem3Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `msgTemplatesSelect` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutMsgTemplatesSelectItemProps {
    layout?: BoxLayout;
    onMsgTemplatesSelect?: () => void;
}

export const RoomtoolFrameLayoutMsgTemplatesSelectItem = ({ layout, onMsgTemplatesSelect }: RoomtoolFrameLayoutMsgTemplatesSelectItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="msgTemplatesSelect"
            params={1}
            onPointerTap={onMsgTemplatesSelect}
            layout={{ width: 227, height: 20, flexShrink: 0, ...layout }}
        >
            Select from message templates
        </Dropmenu>
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem4Props {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem4 = ({ layout }: RoomtoolFrameLayoutSpacingItem4Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `message_input` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutMessageInputItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutMessageInputItem = ({ layout }: RoomtoolFrameLayoutMessageInputItemProps) => {
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <TextInput
            value={messageInputValue}
            onChange={setMessageInputValue}
            backgroundColor="#ffffff"
            layout={{ width: 227, height: 45, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem5Props {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem5 = ({ layout }: RoomtoolFrameLayoutSpacingItem5Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem6Props {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutSpacingItem6 = ({ layout }: RoomtoolFrameLayoutSpacingItem6Props) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `footer_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutFooterContItemProps {
    layout?: BoxLayout;
    onSendCautionBut?: () => void;
    onSendMessageBut?: () => void;
}

export const RoomtoolFrameLayoutFooterContItem = ({ layout, onSendCautionBut, onSendMessageBut }: RoomtoolFrameLayoutFooterContItemProps) => {
    return (
        <Region
            name="footer_cont"
            params={16}
            layout={{ width: 230, height: 21, flexShrink: 0, ...layout }}
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
    );
};
