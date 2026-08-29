import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1113_roomtool_frame_xml` (layout "roomtool_frame", 240x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolFrameLayoutProps {
    layout?: BoxLayout;
    listCont?: RoomtoolFrameLayoutListContProps;
    onClose?: () => void;
}

export const RoomtoolFrameLayout = ({ layout, listCont, onClose }: RoomtoolFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Room Info"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 240, height: 437, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <RoomtoolFrameLayoutListCont {...listCont} />
            </Region>
        </Frame>
    );
};

/** Named region `tags_cont` of RoomtoolFrameLayout - configured through the parent's `tagsCont` prop. */
export interface RoomtoolFrameLayoutTagsContProps {
    captionTagsTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutTagsCont = ({ captionTagsTxt, layout, tags }: RoomtoolFrameLayoutTagsContProps) => {
    return (
        <Region
            name="tags_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 220, top: 60, height: 30, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Tags:" />
            </Region>
            <Region
                name="tags_txt"
                layout={{ position: 'absolute', left: 40, right: 2, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTagsTxt ?? 'PH Room Name: Neque porro quisquam est que'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `room_data` of RoomtoolFrameLayout - configured through the parent's `roomData` prop. */
export interface RoomtoolFrameLayoutRoomDataProps {
    captionDesc?: string;
    captionName?: string;
    layout?: BoxLayout;
    tags?: string[];
    tagsCont?: RoomtoolFrameLayoutTagsContProps;
}

export const RoomtoolFrameLayoutRoomData = ({ captionDesc, captionName, layout, tags, tagsCont }: RoomtoolFrameLayoutRoomDataProps) => {
    return (
        <Region
            name="room_data"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 220, top: 5, height: 90, ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? 'PH Room Name: Neque porro quisquam est que'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                />
            </Region>
            <Region
                name="desc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 220 }}
                />
            </Region>
            <RoomtoolFrameLayoutTagsCont {...tagsCont} />
        </Region>
    );
};

/** Row template `room_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutRoomContItemProps {
    layout?: BoxLayout;
    roomData?: RoomtoolFrameLayoutRoomDataProps;
    tags?: string[];
}

export const RoomtoolFrameLayoutRoomContItem = ({ layout, roomData, tags }: RoomtoolFrameLayoutRoomContItemProps) => {
    return (
        <Border
            variant="0"
            name="room_cont"
            tags={tags}
            layout={{ width: 230, height: 97, flexShrink: 0, ...layout }}
        >
            <RoomtoolFrameLayoutRoomData {...roomData} />
        </Border>
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem = ({ layout, tags }: RoomtoolFrameLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
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
    tags?: string[];
}

export const RoomtoolFrameLayoutInfoContItem = ({ captionHasEventTxt, captionOwnerInRoomTxt, captionOwnerNameTxt, captionUserCountTxt, layout, onChatlogBut, onEditInHkBut, onEnterRoomBut, tags }: RoomtoolFrameLayoutInfoContItemProps) => {
    return (
        <Border
            variant="0"
            name="info_cont"
            tags={tags}
            layout={{ width: 230, height: 74, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 80, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Room owner:" />
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Users in room:" />
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Owner in room:" />
            </Region>
            <Region layout={{ position: 'absolute', left: 5, width: 90, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Has event:" />
            </Region>
            <Region
                name="owner_name_txt"
                layout={{ position: 'absolute', left: 85, width: 71, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOwnerNameTxt ?? 'sulka'} />
            </Region>
            <Region
                name="owner_in_room_txt"
                layout={{ position: 'absolute', left: 100, width: 40, top: 28, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOwnerInRoomTxt ?? 'yes'} />
            </Region>
            <Region
                name="user_count_txt"
                layout={{ position: 'absolute', left: 100, width: 40, top: 15, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserCountTxt ?? '18'} />
            </Region>
            <Region
                name="has_event_txt"
                layout={{ position: 'absolute', left: 100, width: 40, top: 41, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHasEventTxt ?? 'no'} />
            </Region>
            <Button
                variant="0"
                name="enter_room_but"
                onPointerTap={onEnterRoomBut}
                layout={{ position: 'absolute', left: 155, width: 70, top: 4, height: 21, minWidth: 70, maxWidth: 70 }}
            >
                Enter room
            </Button>
            <Button
                variant="0"
                name="chatlog_but"
                onPointerTap={onChatlogBut}
                layout={{ position: 'absolute', left: 155, width: 70, top: 26, height: 21, minWidth: 70, maxWidth: 70 }}
            >
                Chatlog
            </Button>
            <Button
                variant="0"
                name="edit_in_hk_but"
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
    tags?: string[];
}

export const RoomtoolFrameLayoutEventSpacingItem = ({ layout, tags }: RoomtoolFrameLayoutEventSpacingItemProps) => {
    return (
        <Region
            name="event_spacing"
            tags={tags}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `event_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutEventContItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutEventContItem = ({ layout, tags }: RoomtoolFrameLayoutEventContItemProps) => {
    return (
        <Border
            variant="0"
            name="event_cont"
            tags={tags}
            layout={{ width: 230, height: 17, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem2 = ({ layout, tags }: RoomtoolFrameLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
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
    tags?: string[];
}

export const RoomtoolFrameLayoutActContItem = ({ layout, onChangenameCheck, onKickCheck, onLockCheck, tags }: RoomtoolFrameLayoutActContItemProps) => {
    return (
        <Border
            variant="0"
            name="act_cont"
            tags={tags}
            layout={{ width: 230, height: 76, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="0"
                name="kick_check"
                onPointerTap={onKickCheck}
                layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
            >
                Room Info
            </CheckBox>
            <CheckBox
                variant="0"
                name="lock_check"
                onPointerTap={onLockCheck}
                layout={{ position: 'absolute', left: 5, width: 16, top: 30, height: 16 }}
            >
                Room Info
            </CheckBox>
            <CheckBox
                variant="0"
                name="changename_check"
                onPointerTap={onChangenameCheck}
                layout={{ position: 'absolute', left: 5, width: 16, top: 54, height: 16 }}
            >
                Room Info
            </CheckBox>
            <Region layout={{ position: 'absolute', left: 24, width: 199, top: 5, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Kick users out of the room (automatically stops the event)"
                    textOptions={{ wordWrap: true, wordWrapWidth: 199 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 24, width: 199, top: 31, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Change room lock to doorbell" />
            </Region>
            <Region layout={{ position: 'absolute', left: 24, width: 199, top: 48, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
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
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem3 = ({ layout, tags }: RoomtoolFrameLayoutSpacingItem3Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `msgTemplatesSelect` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutMsgTemplatesSelectItemProps {
    layout?: BoxLayout;
    onMsgTemplatesSelect?: () => void;
    tags?: string[];
}

export const RoomtoolFrameLayoutMsgTemplatesSelectItem = ({ layout, onMsgTemplatesSelect, tags }: RoomtoolFrameLayoutMsgTemplatesSelectItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="msgTemplatesSelect"
            tags={tags}
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
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem4 = ({ layout, tags }: RoomtoolFrameLayoutSpacingItem4Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
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
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem5 = ({ layout, tags }: RoomtoolFrameLayoutSpacingItem5Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItem6Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutSpacingItem6 = ({ layout, tags }: RoomtoolFrameLayoutSpacingItem6Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `footer_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutFooterContItemProps {
    layout?: BoxLayout;
    onSendCautionBut?: () => void;
    onSendMessageBut?: () => void;
    tags?: string[];
}

export const RoomtoolFrameLayoutFooterContItem = ({ layout, onSendCautionBut, onSendMessageBut, tags }: RoomtoolFrameLayoutFooterContItemProps) => {
    return (
        <Region
            name="footer_cont"
            tags={tags}
            layout={{ width: 230, height: 21, flexShrink: 0, ...layout }}
        >
            <Button
                variant="0"
                name="send_caution_but"
                onPointerTap={onSendCautionBut}
                layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 21, minWidth: 97, maxWidth: 97 }}
            >
                Send Caution
            </Button>
            <Button
                variant="0"
                name="send_message_but"
                onPointerTap={onSendMessageBut}
                layout={{ position: 'absolute', left: 131, width: 97, top: 0, height: 21, minWidth: 97, maxWidth: 97 }}
            >
                Send message
            </Button>
        </Region>
    );
};

/** Named region `list_cont` of RoomtoolFrameLayout - configured through the parent's `listCont` prop. */
export interface RoomtoolFrameLayoutListContProps {
    itemsListCont?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomtoolFrameLayoutListCont = ({ itemsListCont, layout, tags }: RoomtoolFrameLayoutListContProps) => {
    return (
        <Region
            name="list_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 405, flexDirection: 'column', ...layout }}
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
    );
};
