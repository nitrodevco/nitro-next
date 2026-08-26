import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `3199_room_settings_xml` (layout "room_settings", 341x584) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomSettingsLayoutProps {
    layout?: BoxLayout;
    onAllowFoodconsumeCheckbox?: () => void;
    onAllowPetsCheckbox?: () => void;
    onAllowWalkThroughCheckbox?: () => void;
    onBuildersFaqButton?: () => void;
    onCategories?: () => void;
    onChatFloodSensitivity?: () => void;
    onClose?: () => void;
    onDoNotLeaveOnDoorTileCheckbox?: () => void;
    onDoormodeDoorbell?: () => void;
    onDoormodeInvisible?: () => void;
    onDoormodeOpen?: () => void;
    onDoormodePassword?: () => void;
    onFloorThickness?: () => void;
    onHideWallsCheckbox?: () => void;
    onIdleAutokickCheckbox?: () => void;
    onIdleSleepCheckbox?: () => void;
    onMaxvisitors?: () => void;
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    onModerationKickAll?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    onModerationUnbanBtn?: () => void;
    onMuteAllPetsCheckbox?: () => void;
    onRemoveAllFlatCtrls?: () => void;
    onTradesettings?: () => void;
    onWallThickness?: () => void;
}

export const RoomSettingsLayout = ({ layout, onAllowFoodconsumeCheckbox, onAllowPetsCheckbox, onAllowWalkThroughCheckbox, onBuildersFaqButton, onCategories, onChatFloodSensitivity, onClose, onDoNotLeaveOnDoorTileCheckbox, onDoormodeDoorbell, onDoormodeInvisible, onDoormodeOpen, onDoormodePassword, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onMaxvisitors, onModerationBanNone, onModerationBanRights, onModerationKickAll, onModerationKickNone, onModerationKickRights, onModerationMuteNone, onModerationMuteRights, onModerationUnbanBtn, onMuteAllPetsCheckbox, onRemoveAllFlatCtrls, onTradesettings, onWallThickness }: RoomSettingsLayoutProps) => {
    const t = useTranslation();
    const [ roomNameValue, setRoomNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');
    const [ tag1Value, setTag1Value ] = useState('');
    const [ tag2Value, setTag2Value ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ passwordConfirmValue, setPasswordConfirmValue ] = useState('');
    const [ filterUsersInputValue, setFilterUsersInputValue ] = useState('');
    const [ idleSleepTimeoutValue, setIdleSleepTimeoutValue ] = useState('');
    const [ idleAutokickTimeoutValue, setIdleAutokickTimeoutValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            params={98305}
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 584, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, width: 332, top: 0, height: 549 }}
                >
                    <Region
                        name="contents"
                        params={2192}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.roomsettings.tab.1')}
                                textStyle="text-style-u-headline-big"
                            />
                        </Region>
                        <Region
                            name="tab_container_1"
                            params={16}
                            layout={{ width: 321, height: 360, flexShrink: 0 }}
                        >
                            <Region
                                name="room_name_label"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 119, top: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomname')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <TextInput
                                value={roomNameValue}
                                onChange={setRoomNameValue}
                                backgroundColor="#fbfbf9"
                                layout={{ position: 'absolute', left: 0, width: 300, top: 14, height: 20 }}
                            />
                            <Region
                                name="description_label"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 163, top: 35, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.desc')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <TextInput
                                value={descriptionValue}
                                onChange={setDescriptionValue}
                                backgroundColor="#fbfbf9"
                                layout={{ position: 'absolute', left: 0, width: 300, top: 51, height: 39 }}
                            />
                            <Region
                                name="tag_category_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 300, top: 100, height: 192 }}
                            >
                                <Region
                                    name="category_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.category')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Dropmenu
                                    variant="3"
                                    name="categories"
                                    params={49}
                                    onPointerTap={onCategories}
                                    layout={{ position: 'absolute', left: 0, width: 300, top: 16, height: 24 }}
                                />
                                <Region
                                    name="maxvisitors_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 125, top: 45, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.maxvisitors')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Dropmenu
                                    variant="3"
                                    name="maxvisitors"
                                    params={49}
                                    onPointerTap={onMaxvisitors}
                                    layout={{ position: 'absolute', left: 0, width: 300, top: 61, height: 24 }}
                                />
                                <Region
                                    name="tradesettings_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 138, top: 90, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.tradesettings')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Dropmenu
                                    variant="3"
                                    name="tradesettings"
                                    params={49}
                                    onPointerTap={onTradesettings}
                                    layout={{ position: 'absolute', left: 0, width: 299, top: 106, height: 24 }}
                                />
                                <Region
                                    name="tag_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 86, top: 138, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.tags')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <TextInput
                                    value={tag1Value}
                                    onChange={setTag1Value}
                                    backgroundColor="#fbfbf9"
                                    layout={{ position: 'absolute', left: 0, width: 145, top: 154, height: 15 }}
                                />
                                <TextInput
                                    value={tag2Value}
                                    onChange={setTag2Value}
                                    backgroundColor="#fbfbf9"
                                    layout={{ position: 'absolute', left: 149, width: 145, top: 154, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="advanced_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 216, top: 239, height: 82 }}
                            >
                                <CheckBox
                                    variant="0"
                                    name="allow_walk_through_checkbox"
                                    params={17}
                                    onPointerTap={onAllowWalkThroughCheckbox}
                                    layout={{ position: 'absolute', left: 2, width: 20, top: 59, height: 20 }}
                                />
                                <Region
                                    name="walk_through_text"
                                    params={16}
                                    layout={{ position: 'absolute', left: 18, width: 249, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.roomsettings.allow_walk_through')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="remove_link_region"
                                params={147665}
                                layout={{ position: 'absolute', left: 66, width: 189, top: 334, height: 22 }}
                            >
                                <Region
                                    name="remove_link"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 15, width: 174, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.roomsettings.delete')}
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#bb2200' }}
                                    />
                                </Region>
                                <Icon
                                    variant="9"
                                    name="remove_icon"
                                    params={16}
                                    tintColor="#bb2200"
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 20 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.roomsettings.tab.2')}
                                textStyle="text-style-u-headline-big"
                            />
                        </Region>
                        <Region
                            name="tab_container_2"
                            params={16}
                            layout={{ width: 321, height: 366, flexShrink: 0 }}
                        >
                            <Region
                                name="normal_access_container"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 321, top: 0, height: 354 }}
                            >
                                <Region
                                    name="room_access_tab_caption"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 295, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.roomsettings.roomaccess.caption')}
                                        textStyle="text-style-u-headline-small"
                                    />
                                </Region>
                                <Region
                                    name="room_access_tab_info"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 300, top: 19, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.roomsettings.roomaccess.info')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                                    />
                                </Region>
                                <Region
                                    name="doormode_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 309, top: 87, height: 95 }}
                                >
                                    <Region
                                        name="doormode_label"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.doormode')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <Region
                                        name="doormode"
                                        params={17}
                                        layout={{ position: 'absolute', left: 5, width: 274, top: 18, height: 80 }}
                                    >
                                        <RadioButton
                                            variant="0"
                                            name="doormode_open"
                                            params={17}
                                            onPointerTap={onDoormodeOpen}
                                            layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 20 }}
                                        />
                                        <RadioButton
                                            variant="0"
                                            name="doormode_doorbell"
                                            params={17}
                                            onPointerTap={onDoormodeDoorbell}
                                            layout={{ position: 'absolute', left: 0, width: 270, top: 20, height: 20 }}
                                        />
                                        <RadioButton
                                            variant="0"
                                            name="doormode_invisible"
                                            params={17}
                                            onPointerTap={onDoormodeInvisible}
                                            layout={{ position: 'absolute', left: 0, width: 270, top: 40, height: 20 }}
                                        />
                                        <RadioButton
                                            variant="0"
                                            name="doormode_password"
                                            params={17}
                                            onPointerTap={onDoormodePassword}
                                            layout={{ position: 'absolute', left: 0, width: 270, top: 60, height: 20 }}
                                        />
                                    </Region>
                                    <Region
                                        name="doormode_open_label"
                                        params={48}
                                        layout={{ position: 'absolute', left: 20, width: 230, top: 17, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.doormode.open')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <Region
                                        name="doormode_doorbell_label"
                                        params={48}
                                        layout={{ position: 'absolute', left: 20, width: 249, top: 36, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.doormode.doorbell')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <Region
                                        name="doormode_invisible_label"
                                        params={48}
                                        layout={{ position: 'absolute', left: 20, width: 245, top: 56, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.doormode.invisible')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <Region
                                        name="doormode_password_label"
                                        params={48}
                                        layout={{ position: 'absolute', left: 20, width: 253, top: 76, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.doormode.password')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="password_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 41, width: 195, top: 188, height: 68 }}
                                >
                                    <Region
                                        name="password_label"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 189, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.password')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <TextInput
                                        value={passwordValue}
                                        onChange={setPasswordValue}
                                        backgroundColor="#fbfbf9"
                                        layout={{ position: 'absolute', left: 1, width: 193, top: 15, height: 15 }}
                                    />
                                    <Region
                                        name="password__confirm_label"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 234, top: 32, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.passwordconfirm')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <TextInput
                                        value={passwordConfirmValue}
                                        onChange={setPasswordConfirmValue}
                                        backgroundColor="#fbfbf9"
                                        layout={{ position: 'absolute', left: 1, width: 193, top: 48, height: 15 }}
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 308, top: 88, height: 166 }}
                                >
                                    <Border
                                        variant="0"
                                        name="doormode_override_info"
                                        params={16}
                                        layout={{ width: '100%', height: '100%' }}
                                    >
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 5, width: 295, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('notification.builders_club.room_locked.title')}
                                                textStyle="text-style-u-headline-small"
                                            />
                                        </Region>
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 5, width: 298, top: 42, height: 79, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('notification.builders_club.room_locked.message')}
                                                textOptions={{ wordWrap: true, wordWrapWidth: 298 }}
                                            />
                                        </Region>
                                        <Button
                                            variant="3"
                                            name="builders_faq_button"
                                            params={131281}
                                            onPointerTap={onBuildersFaqButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 11, width: 287, top: 122, height: 30 }}
                                        >
                                            {t('notification.builders_club.room_locked.linkTitle')}
                                        </Button>
                                    </Border>
                                </Region>
                            </Region>
                            <Region
                                name="flexible_content"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 315, top: 260, height: 117, flexDirection: 'column' }}
                            >
                                <Region
                                    name="guild_access_disclaimer"
                                    params={16}
                                    layout={{ width: 305, height: 33, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 305 }}
                                    />
                                </Region>
                                <Region
                                    name="advanced_container"
                                    params={16}
                                    layout={{ width: 278, height: 82, flexShrink: 0 }}
                                >
                                    <CheckBox
                                        variant="0"
                                        name="allow_pets_checkbox"
                                        params={17}
                                        onPointerTap={onAllowPetsCheckbox}
                                        layout={{ position: 'absolute', left: 3, width: 270, top: 19, height: 20 }}
                                    />
                                    <Region
                                        name="allow_pets_text"
                                        params={16}
                                        layout={{ position: 'absolute', left: 18, width: 191, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.allowpets')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <CheckBox
                                        variant="0"
                                        name="allow_foodconsume_checkbox"
                                        params={17}
                                        onPointerTap={onAllowFoodconsumeCheckbox}
                                        layout={{ position: 'absolute', left: 3, width: 270, top: 39, height: 20 }}
                                    />
                                    <Region
                                        name="allow_food_consume_text"
                                        params={16}
                                        layout={{ position: 'absolute', left: 18, width: 245, top: 38, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.allowfoodconsume')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <CheckBox
                                        variant="0"
                                        name="mute_all_pets_checkbox"
                                        params={17}
                                        onPointerTap={onMuteAllPetsCheckbox}
                                        layout={{ position: 'absolute', left: 3, width: 270, top: 59, height: 20 }}
                                    />
                                    <Region
                                        name="mute_all_pets_text"
                                        params={16}
                                        layout={{ position: 'absolute', left: 18, width: 245, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.mute_all_pets')}
                                            textStyle="text-style-u-regular"
                                        />
                                    </Region>
                                    <Region
                                        name="pets_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.roomsettings.pets')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.roomsettings.tab.3')}
                                textStyle="text-style-u-headline-big"
                            />
                        </Region>
                        <Region
                            name="tab_container_3"
                            params={16}
                            layout={{ width: 324, height: 367, flexShrink: 0 }}
                        >
                            <Region
                                name="guild_rights_container"
                                params={144}
                                visible={false}
                                layout={{ position: 'absolute', left: 6, width: 380, top: 0, height: 367 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 215, top: 3, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.flatctrls.guild.caption')}
                                        textStyle="text-style-u-headline-small"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                                    />
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 309, top: 42, height: 240, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.flatctrls.guild.info')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="normal_rights_container"
                                params={144}
                                layout={{ position: 'absolute', left: 0, width: 392, top: 0, height: 367 }}
                            >
                                <Border
                                    variant="0"
                                    name="search_border"
                                    params={16}
                                    tintColor="#e9e9e1"
                                    layout={{ position: 'absolute', left: 0, width: 312, top: 1, height: 42 }}
                                >
                                    <Region
                                        name="search_txt"
                                        params={16}
                                        layout={{ position: 'absolute', left: 6, width: 138, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('navigator.flatctrls.filter')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <TextInput
                                        value={filterUsersInputValue}
                                        onChange={setFilterUsersInputValue}
                                        layout={{ position: 'absolute', left: 97, width: 206, top: 8, height: 23 }}
                                    />
                                </Border>
                                <Region
                                    name="users_with_rights_txt"
                                    params={786448}
                                    layout={{ position: 'absolute', left: 0, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.flatctrls.userswithrights')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                                    />
                                </Region>
                                <Region
                                    name="friends_txt"
                                    params={786448}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 175, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.flatctrls.friends')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 150, top: 74, height: 289 }}
                                >
                                    <Border
                                        variant="0"
                                        name="users_with_rights_cont"
                                        params={2064}
                                        tintColor="#ffffff"
                                        layout={{ width: '100%', height: '100%' }}
                                    >
                                        <ScrollArea
                                            orientation="vertical"
                                            layout={{ position: 'absolute', left: 4, width: 121, top: 4, height: 246 }}
                                        >
                                            <Region
                                                name="users_with_rights_item_list"
                                                params={2192}
                                                layout={{ flexDirection: 'column', width: '100%' }}
                                            />
                                        </ScrollArea>
                                        <ButtonThick
                                            variant="3"
                                            name="remove_all_flat_ctrls"
                                            params={132113}
                                            onPointerTap={onRemoveAllFlatCtrls}
                                            textStyle="text-style-button-shiny-bold"
                                            layout={{ position: 'absolute', left: 4, width: 142, top: 256, height: 29, minWidth: 142, maxWidth: 142 }}
                                        >
                                            {t('navigator.flatctrls.clear')}
                                        </ButtonThick>
                                    </Border>
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 173, width: 150, top: 74, height: 289 }}
                                >
                                    <Border
                                        variant="0"
                                        name="friends_cont"
                                        params={2064}
                                        tintColor="#ffffff"
                                        layout={{ width: '100%', height: '100%' }}
                                    >
                                        <ScrollArea
                                            orientation="vertical"
                                            layout={{ position: 'absolute', left: 4, width: 121, top: 4, height: 281 }}
                                        >
                                            <Region
                                                name="friends_item_list"
                                                params={2192}
                                                layout={{ flexDirection: 'column', width: '100%' }}
                                            />
                                        </ScrollArea>
                                    </Border>
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.roomsettings.tab.4')}
                                textStyle="text-style-u-headline-big"
                            />
                        </Region>
                        <Region
                            name="tab_container_4"
                            params={16}
                            layout={{ width: 322, height: 395, flexShrink: 0 }}
                        >
                            <Region
                                name="vip_tab_caption"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 237, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.vip.caption')}
                                    textStyle="text-style-u-headline-small"
                                />
                            </Region>
                            <Region
                                name="vip_tab_info"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 70, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.vip.info')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                                />
                            </Region>
                            <Region
                                name="vip_settings_text"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 206, top: 90, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.vip_settings')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <CheckBox
                                variant="0"
                                name="hide_walls_checkbox"
                                params={17}
                                onPointerTap={onHideWallsCheckbox}
                                layout={{ position: 'absolute', left: 0, width: 20, top: 110, height: 20 }}
                            />
                            <Region
                                name="hide_walls_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 194, top: 109, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.hide_walls')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Dropmenu
                                variant="3"
                                name="wall_thickness"
                                params={49}
                                onPointerTap={onWallThickness}
                                layout={{ position: 'absolute', left: 0, width: 276, top: 131, height: 24 }}
                            />
                            <Dropmenu
                                variant="3"
                                name="floor_thickness"
                                params={49}
                                onPointerTap={onFloorThickness}
                                layout={{ position: 'absolute', left: 0, width: 276, top: 162, height: 24 }}
                            />
                            <Region
                                name="room_behavior_text"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 148, top: 193, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.room_behavior')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <CheckBox
                                variant="0"
                                name="do_not_leave_on_door_tile_checkbox"
                                params={17}
                                onPointerTap={onDoNotLeaveOnDoorTileCheckbox}
                                layout={{ position: 'absolute', left: 0, width: 20, top: 214, height: 20 }}
                            />
                            <Region
                                name="do_not_leave_on_door_tile_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 290, top: 213, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.do_not_leave_on_door_tile')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <CheckBox
                                variant="0"
                                name="idle_sleep_checkbox"
                                params={17}
                                onPointerTap={onIdleSleepCheckbox}
                                layout={{ position: 'absolute', left: 0, width: 20, top: 236, height: 20 }}
                            />
                            <Region
                                name="idle_sleep_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 185, top: 235, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.idle_sleep')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <TextInput
                                value={idleSleepTimeoutValue}
                                onChange={setIdleSleepTimeoutValue}
                                backgroundColor="#fbfbf9"
                                layout={{ position: 'absolute', left: 20, width: 72, top: 257, height: 20 }}
                            />
                            <Region
                                name="idle_sleep_timeout_label"
                                params={16}
                                layout={{ position: 'absolute', left: 98, width: 57, top: 259, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.timeout.seconds')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <CheckBox
                                variant="0"
                                name="idle_autokick_checkbox"
                                params={17}
                                onPointerTap={onIdleAutokickCheckbox}
                                layout={{ position: 'absolute', left: 0, width: 20, top: 282, height: 20 }}
                            />
                            <Region
                                name="idle_autokick_text"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 210, top: 281, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.idle_autokick')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <TextInput
                                value={idleAutokickTimeoutValue}
                                onChange={setIdleAutokickTimeoutValue}
                                backgroundColor="#fbfbf9"
                                layout={{ position: 'absolute', left: 20, width: 72, top: 303, height: 20 }}
                            />
                            <Region
                                name="idle_autokick_timeout_label"
                                params={16}
                                layout={{ position: 'absolute', left: 98, width: 57, top: 305, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.timeout.seconds')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="chat_settings_text"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 97, top: 333, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.chat.flood_sensitivity')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Dropmenu
                                variant="3"
                                name="chat_flood_sensitivity"
                                params={49}
                                onPointerTap={onChatFloodSensitivity}
                                layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
                            />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.roomsettings.tab.5')}
                                textStyle="text-style-u-headline-big"
                            />
                        </Region>
                        <Region
                            name="tab_container_5"
                            params={144}
                            layout={{ width: 297, height: 367, flexShrink: 0 }}
                        >
                            <Region
                                name="moderation_header"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 323, top: 0, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.moderation.header')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 323 }}
                                />
                            </Region>
                            <Region
                                name="moderation_mute_header"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 276, top: 50, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.roomsettings.moderation.mute.header')} />
                            </Region>
                            <Region
                                name="moderation_mute_selector"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 291, top: 75, height: 31 }}
                            >
                                <RadioButton
                                    variant="0"
                                    name="moderation_mute_none"
                                    params={17}
                                    onPointerTap={onModerationMuteNone}
                                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
                                />
                                <Region
                                    name="moderation_mute_none_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.none')} />
                                </Region>
                                <Region
                                    name="moderation_mute_rights_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 95, width: 162, top: -4, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.rights')} />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="moderation_mute_rights"
                                    params={17}
                                    onPointerTap={onModerationMuteRights}
                                    layout={{ position: 'absolute', left: 80, width: 147, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="moderation_kick_header"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 110, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.roomsettings.moderation.kick.header')} />
                            </Region>
                            <Region
                                name="moderation_kick_selector"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 325, top: 130, height: 26 }}
                            >
                                <RadioButton
                                    variant="0"
                                    name="moderation_kick_none"
                                    params={17}
                                    onPointerTap={onModerationKickNone}
                                    layout={{ position: 'absolute', left: 0, width: 104, top: 0, height: 19 }}
                                />
                                <Region
                                    name="moderation_kick_none_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 66, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.none')} />
                                </Region>
                                <Region
                                    name="moderation_kick_rights_header"
                                    params={16}
                                    layout={{ position: 'absolute', left: 96, width: 123, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.rights')} />
                                </Region>
                                <Region
                                    name="moderation_kick_all_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 245, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.all')} />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="moderation_kick_rights"
                                    params={17}
                                    onPointerTap={onModerationKickRights}
                                    layout={{ position: 'absolute', left: 80, width: 90, top: 0, height: 20 }}
                                />
                                <RadioButton
                                    variant="0"
                                    name="moderation_kick_all"
                                    params={17}
                                    onPointerTap={onModerationKickAll}
                                    layout={{ position: 'absolute', left: 230, width: 107, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="moderation_ban_header"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 292, top: 160, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.roomsettings.moderation.ban.header')} />
                            </Region>
                            <Region
                                name="moderation_ban_selector"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 293, top: 180, height: 23 }}
                            >
                                <Region
                                    name="moderation_ban_none_label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.none')} />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="moderation_ban_none"
                                    params={17}
                                    onPointerTap={onModerationBanNone}
                                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
                                />
                                <Region
                                    name="moderation_ban_rights"
                                    params={16}
                                    layout={{ position: 'absolute', left: 95, width: 197, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.roomsettings.moderation.rights')} />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="moderation_ban_rights"
                                    params={17}
                                    onPointerTap={onModerationBanRights}
                                    layout={{ position: 'absolute', left: 80, width: 177, top: 0, height: 20 }}
                                />
                            </Region>
                            <Border
                                variant="0"
                                name="moderation_banned_users_cont"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 172, top: 210, height: 156 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 3, width: 129, top: 4, height: 146 }}
                                >
                                    <Region
                                        name="moderation_banned_users"
                                        params={16}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                            </Border>
                            <Region
                                name="moderation_banned_users_label"
                                params={16}
                                layout={{ position: 'absolute', left: 178, width: 125, top: 233, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.roomsettings.moderation.banned.users')} />
                            </Region>
                            <Button
                                variant="3"
                                name="moderation_unban_btn"
                                params={131089}
                                onPointerTap={onModerationUnbanBtn}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 182, width: 257, top: 261, height: 32 }}
                            >
                                {t('navigator.roomsettings.moderation.unban')}
                            </Button>
                        </Region>
                    </Region>
                </ScrollArea>
            </Region>
        </Frame>
    );
};
