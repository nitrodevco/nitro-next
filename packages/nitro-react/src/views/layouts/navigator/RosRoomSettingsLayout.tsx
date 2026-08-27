import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeText } from '#base/theme';

/** Generated from `3065_ros_room_settings_xml` (layout "ros_room_settings", 341x477) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosRoomSettingsLayoutProps {
    captionCategoryLabel?: string;
    captionChatSettingsText?: string;
    captionDescriptionLabel?: string;
    captionDoNotLeaveOnDoorTileText?: string;
    captionDoormodeDoorbellLabel?: string;
    captionDoormodeInvisibleLabel?: string;
    captionDoormodeLabel?: string;
    captionDoormodeOpenLabel?: string;
    captionDoormodePasswordLabel?: string;
    captionFriendsTxt?: string;
    captionHideWallsText?: string;
    captionIdleAutokickText?: string;
    captionIdleAutokickTimeoutLabel?: string;
    captionIdleSleepText?: string;
    captionIdleSleepTimeoutLabel?: string;
    captionMaxvisitorsLabel?: string;
    captionModerationBanHeader?: string;
    captionModerationBannedUsersLabel?: string;
    captionModerationBanNoneLabel?: string;
    captionModerationBanRights?: string;
    captionModerationHeader?: string;
    captionModerationKickAllLabel?: string;
    captionModerationKickHeader?: string;
    captionModerationKickNoneLabel?: string;
    captionModerationKickRightsHeader?: string;
    captionModerationMuteHeader?: string;
    captionModerationMuteNoneLabel?: string;
    captionModerationMuteRightsLabel?: string;
    captionPasswordConfirmLabel?: string;
    captionPasswordLabel?: string;
    captionRemoveLink?: string;
    captionRoomAccessTabCaption?: string;
    captionRoomAccessTabInfo?: string;
    captionRoomBehaviorText?: string;
    captionRoomNameLabel?: string;
    captionSearchTxt?: string;
    captionTagLabel?: string;
    captionTradesettingsLabel?: string;
    captionUsersWithRightsTxt?: string;
    captionVipSettingsText?: string;
    captionVipTabCaption?: string;
    captionVipTabInfo?: string;
    captionWalkThroughText?: string;
    itemsFlexibleContent?: ReactNode;
    layout?: BoxLayout;
    onAllowWalkThroughCheckbox?: () => void;
    onBuildersFaqButton?: () => void;
    onCategories?: () => void;
    onChatFloodSensitivity?: () => void;
    onClose?: () => void;
    onContentContainer?: () => void;
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
    onModerationBanDropdown?: () => void;
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    onModerationKickAll?: () => void;
    onModerationKickDropdown?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    onModerationMuteDropdown?: () => void;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    onModerationUnbanBtn?: () => void;
    onRemoveAllFlatCtrls?: () => void;
    onRemoveLinkRegion?: () => void;
    onTab1?: () => void;
    onTab2?: () => void;
    onTab3?: () => void;
    onTab4?: () => void;
    onTab5?: () => void;
    onTabContainer1?: () => void;
    onTabContainer2?: () => void;
    onTradesettings?: () => void;
    onWallThickness?: () => void;
    visibleDoormodeOverrideInfo?: boolean;
    visibleGuildRightsContainer?: boolean;
    visibleModerationBanSelector?: boolean;
    visibleModerationKickSelector?: boolean;
    visibleModerationMuteSelector?: boolean;
    visibleTabContainer1?: boolean;
    visibleTabContainer2?: boolean;
    visibleTabContainer3?: boolean;
    visibleTabContainer5?: boolean;
}

export const RosRoomSettingsLayout = ({ captionCategoryLabel, captionChatSettingsText, captionDescriptionLabel, captionDoNotLeaveOnDoorTileText, captionDoormodeDoorbellLabel, captionDoormodeInvisibleLabel, captionDoormodeLabel, captionDoormodeOpenLabel, captionDoormodePasswordLabel, captionFriendsTxt, captionHideWallsText, captionIdleAutokickText, captionIdleAutokickTimeoutLabel, captionIdleSleepText, captionIdleSleepTimeoutLabel, captionMaxvisitorsLabel, captionModerationBanHeader, captionModerationBannedUsersLabel, captionModerationBanNoneLabel, captionModerationBanRights, captionModerationHeader, captionModerationKickAllLabel, captionModerationKickHeader, captionModerationKickNoneLabel, captionModerationKickRightsHeader, captionModerationMuteHeader, captionModerationMuteNoneLabel, captionModerationMuteRightsLabel, captionPasswordConfirmLabel, captionPasswordLabel, captionRemoveLink, captionRoomAccessTabCaption, captionRoomAccessTabInfo, captionRoomBehaviorText, captionRoomNameLabel, captionSearchTxt, captionTagLabel, captionTradesettingsLabel, captionUsersWithRightsTxt, captionVipSettingsText, captionVipTabCaption, captionVipTabInfo, captionWalkThroughText, itemsFlexibleContent, layout, onAllowWalkThroughCheckbox, onBuildersFaqButton, onCategories, onChatFloodSensitivity, onClose, onContentContainer, onDoNotLeaveOnDoorTileCheckbox, onDoormodeDoorbell, onDoormodeInvisible, onDoormodeOpen, onDoormodePassword, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onMaxvisitors, onModerationBanDropdown, onModerationBanNone, onModerationBanRights, onModerationKickAll, onModerationKickDropdown, onModerationKickNone, onModerationKickRights, onModerationMuteDropdown, onModerationMuteNone, onModerationMuteRights, onModerationUnbanBtn, onRemoveAllFlatCtrls, onRemoveLinkRegion, onTab1, onTab2, onTab3, onTab4, onTab5, onTabContainer1, onTabContainer2, onTradesettings, onWallThickness, visibleDoormodeOverrideInfo, visibleGuildRightsContainer, visibleModerationBanSelector, visibleModerationKickSelector, visibleModerationMuteSelector, visibleTabContainer1, visibleTabContainer2, visibleTabContainer3, visibleTabContainer5 }: RosRoomSettingsLayoutProps) => {
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
            params={32769}
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 477, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TabContext
                    variant="3"
                    name="tab_context"
                    params={17}
                    layout={{ position: 'absolute', left: -6, width: 354, top: 3, height: 32 }}
                >
                    <TabButton
                        variant="3"
                        name="tab_1"
                        params={17}
                        onPointerTap={onTab1}
                        layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.1')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_2"
                        params={17}
                        onPointerTap={onTab2}
                        layout={{ position: 'absolute', left: 185, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.2')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_3"
                        params={131089}
                        onPointerTap={onTab3}
                        layout={{ position: 'absolute', left: 370, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.3')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_4"
                        params={17}
                        onPointerTap={onTab4}
                        layout={{ position: 'absolute', left: 555, width: 186, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.4')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_5"
                        params={17}
                        onPointerTap={onTab5}
                        layout={{ position: 'absolute', left: 741, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.5')}
                    </TabButton>
                </TabContext>
                <Region
                    name="content_container"
                    params={17}
                    onPointerTap={onContentContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 327, top: 42, height: 369 }}
                >
                    <Region
                        name="tab_container_1"
                        params={1}
                        visible={visibleTabContainer1 ?? false}
                        onPointerTap={onTabContainer1}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 360 }}
                    >
                        <Region
                            name="room_name_label"
                            layout={{ position: 'absolute', left: 0, width: 119, top: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRoomNameLabel ?? t('navigator.roomname')}
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
                            layout={{ position: 'absolute', left: 0, width: 163, top: 35, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDescriptionLabel ?? t('navigator.roomsettings.desc')}
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
                            layout={{ position: 'absolute', left: 0, width: 300, top: 100, height: 192 }}
                        >
                            <Region
                                name="category_label"
                                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCategoryLabel ?? t('navigator.category')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Dropmenu
                                variant="2"
                                name="categories"
                                params={33}
                                onPointerTap={onCategories}
                                layout={{ position: 'absolute', left: 0, width: 300, top: 16, height: 24 }}
                            />
                            <Region
                                name="maxvisitors_label"
                                layout={{ position: 'absolute', left: 0, width: 125, top: 45, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionMaxvisitorsLabel ?? t('navigator.maxvisitors')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Dropmenu
                                variant="2"
                                name="maxvisitors"
                                params={33}
                                onPointerTap={onMaxvisitors}
                                layout={{ position: 'absolute', left: 0, width: 300, top: 61, height: 24 }}
                            />
                            <Region
                                name="tradesettings_label"
                                layout={{ position: 'absolute', left: 0, width: 138, top: 90, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTradesettingsLabel ?? t('navigator.tradesettings')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Dropmenu
                                variant="2"
                                name="tradesettings"
                                params={33}
                                onPointerTap={onTradesettings}
                                layout={{ position: 'absolute', left: 0, width: 300, top: 106, height: 24 }}
                            />
                            <Region
                                name="tag_label"
                                layout={{ position: 'absolute', left: 0, width: 86, top: 138, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTagLabel ?? t('navigator.tags')}
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
                            layout={{ position: 'absolute', left: 0, width: 218, top: 253, height: 82 }}
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
                                layout={{ position: 'absolute', left: 18, width: 249, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionWalkThroughText ?? t('navigator.roomsettings.allow_walk_through')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                        </Region>
                        <Region
                            name="remove_link_region"
                            params={17}
                            onPointerTap={onRemoveLinkRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 60, width: 180, top: 339, height: 18, justifyContent: 'center' }}
                        >
                            <Region
                                name="remove_link"
                                params={4980752}
                                layout={{ position: 'absolute', top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRemoveLink ?? t('navigator.roomsettings.delete')}
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
                        name="tab_container_2"
                        params={1}
                        visible={visibleTabContainer2 ?? false}
                        onPointerTap={onTabContainer2}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 366 }}
                    >
                        <Region
                            name="normal_access_container"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 354 }}
                        >
                            <Region
                                name="room_access_tab_caption"
                                layout={{ position: 'absolute', left: 0, width: 295, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRoomAccessTabCaption ?? t('navigator.roomsettings.roomaccess.caption')}
                                    textStyle="text-style-u-headline-small"
                                />
                            </Region>
                            <Region
                                name="room_access_tab_info"
                                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRoomAccessTabInfo ?? t('navigator.roomsettings.roomaccess.info')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
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
                                        text={captionDoormodeLabel ?? t('navigator.roomsettings.doormode')}
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
                                        text={captionDoormodeOpenLabel ?? t('navigator.roomsettings.doormode.open')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="doormode_doorbell_label"
                                    params={48}
                                    layout={{ position: 'absolute', left: 20, width: 249, top: 36, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionDoormodeDoorbellLabel ?? t('navigator.roomsettings.doormode.doorbell')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="doormode_invisible_label"
                                    params={48}
                                    layout={{ position: 'absolute', left: 20, width: 245, top: 56, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionDoormodeInvisibleLabel ?? t('navigator.roomsettings.doormode.invisible')}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Region
                                    name="doormode_password_label"
                                    params={48}
                                    layout={{ position: 'absolute', left: 20, width: 253, top: 76, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionDoormodePasswordLabel ?? t('navigator.roomsettings.doormode.password')}
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
                                        text={captionPasswordLabel ?? t('navigator.roomsettings.password')}
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
                                        text={captionPasswordConfirmLabel ?? t('navigator.roomsettings.passwordconfirm')}
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
                                visible={visibleDoormodeOverrideInfo ?? false}
                                layout={{ position: 'absolute', left: 0, width: 308, top: 88, height: 166 }}
                            >
                                <Border
                                    variant="0"
                                    name="doormode_override_info"
                                    layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
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
                                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 287, top: 122, height: 30 }}
                                    >
                                        {t('notification.builders_club.room_locked.linkTitle')}
                                    </Button>
                                </Border>
                            </Region>
                        </Region>
                        <Region
                            name="flexible_content"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 277, top: 260, height: 117, flexDirection: 'column' }}
                        >
                            {itemsFlexibleContent ?? (
                                <>
                                    <RosRoomSettingsLayoutGuildAccessDisclaimerItem />
                                    <RosRoomSettingsLayoutAdvancedContainerItem />
                                </>
                            )}
                        </Region>
                    </Region>
                    <Region
                        name="tab_container_3"
                        params={144}
                        visible={visibleTabContainer3 ?? false}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367 }}
                    >
                        <Region
                            name="guild_rights_container"
                            params={144}
                            visible={visibleGuildRightsContainer ?? false}
                            layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 367 }}
                        >
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 215, top: 3, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.flatctrls.guild.caption')}
                                    textStyle="text-style-u-headline-small"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                                />
                            </Region>
                            <Region
                                visible={false}
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
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367, justifyContent: 'center' }}
                        >
                            <Border
                                variant="0"
                                name="search_border"
                                params={16}
                                tintColor="#e9e9e1"
                                layout={{ position: 'absolute', left: 0, width: 322, top: 1, height: 42 }}
                            >
                                <Region
                                    name="search_txt"
                                    params={16}
                                    layout={{ position: 'absolute', left: 6, width: 138, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionSearchTxt ?? t('navigator.flatctrls.filter')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <TextInput
                                    value={filterUsersInputValue}
                                    onChange={setFilterUsersInputValue}
                                    layout={{ position: 'absolute', left: 97, right: 9, top: 8, height: 23 }}
                                />
                            </Border>
                            <Region
                                name="users_with_rights_txt"
                                params={786448}
                                layout={{ position: 'absolute', marginLeft: -88.5, marginRight: 88.5, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionUsersWithRightsTxt ?? t('navigator.flatctrls.userswithrights')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                                />
                            </Region>
                            <Region
                                name="friends_txt"
                                params={786448}
                                layout={{ position: 'absolute', marginLeft: 86.5, marginRight: -86.5, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFriendsTxt ?? t('navigator.flatctrls.friends')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                                />
                            </Region>
                            <Border
                                variant="0"
                                name="users_with_rights_cont"
                                params={2064}
                                tintColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 150, top: 74, bottom: 4 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 39 }}
                                >
                                    <Region
                                        name="users_with_rights_item_list"
                                        params={2192}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                                {/* <scrollbar_vertical> for users_with_rights_item_list - rendered by that list's ScrollArea */}
                                <ButtonThick
                                    variant="3"
                                    name="remove_all_flat_ctrls"
                                    params={132113}
                                    onPointerTap={onRemoveAllFlatCtrls}
                                    layout={{ position: 'absolute', left: 4, width: 142, bottom: 4, height: 29, minWidth: 142, maxWidth: 142 }}
                                >
                                    {t('navigator.flatctrls.clear')}
                                </ButtonThick>
                            </Border>
                            <Border
                                variant="0"
                                name="friends_cont"
                                params={2064}
                                tintColor="#ffffff"
                                layout={{ position: 'absolute', left: 173, width: 150, top: 74, bottom: 4 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 4 }}
                                >
                                    <Region
                                        name="friends_item_list"
                                        params={2192}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                                {/* <scrollbar_vertical> for friends_item_list - rendered by that list's ScrollArea */}
                            </Border>
                        </Region>
                    </Region>
                    <Region
                        name="tab_container_4"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 322, top: 0, height: 395 }}
                    >
                        <Region
                            name="vip_tab_caption"
                            layout={{ position: 'absolute', left: 0, width: 237, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionVipTabCaption ?? t('navigator.roomsettings.vip.caption')}
                                textStyle="text-style-u-headline-small"
                            />
                        </Region>
                        <Region
                            name="vip_tab_info"
                            layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionVipTabInfo ?? t('navigator.roomsettings.vip.info')}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                            />
                        </Region>
                        <Region
                            name="vip_settings_text"
                            layout={{ position: 'absolute', left: 0, width: 206, top: 84, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionVipSettingsText ?? t('navigator.roomsettings.vip_settings')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <CheckBox
                            variant="0"
                            name="hide_walls_checkbox"
                            params={17}
                            onPointerTap={onHideWallsCheckbox}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 104, height: 20 }}
                        />
                        <Region
                            name="hide_walls_text"
                            layout={{ position: 'absolute', left: 20, width: 194, top: 103, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionHideWallsText ?? t('navigator.roomsettings.hide_walls')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Dropmenu
                            variant="2"
                            name="wall_thickness"
                            params={33}
                            onPointerTap={onWallThickness}
                            layout={{ position: 'absolute', left: 0, width: 276, top: 125, height: 24 }}
                        />
                        <Dropmenu
                            variant="2"
                            name="floor_thickness"
                            params={33}
                            onPointerTap={onFloorThickness}
                            layout={{ position: 'absolute', left: 0, width: 276, top: 156, height: 24 }}
                        />
                        <Region
                            name="room_behavior_text"
                            layout={{ position: 'absolute', left: 0, width: 221, top: 191, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRoomBehaviorText ?? t('navigator.roomsettings.room_behavior')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <CheckBox
                            variant="0"
                            name="do_not_leave_on_door_tile_checkbox"
                            params={17}
                            onPointerTap={onDoNotLeaveOnDoorTileCheckbox}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 212, height: 20 }}
                        />
                        <Region
                            name="do_not_leave_on_door_tile_text"
                            layout={{ position: 'absolute', left: 20, width: 292, top: 211, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDoNotLeaveOnDoorTileText ?? t('navigator.roomsettings.do_not_leave_on_door_tile')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <CheckBox
                            variant="0"
                            name="idle_sleep_checkbox"
                            params={17}
                            onPointerTap={onIdleSleepCheckbox}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 234, height: 20 }}
                        />
                        <Region
                            name="idle_sleep_text"
                            layout={{ position: 'absolute', left: 20, width: 192, top: 233, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionIdleSleepText ?? t('navigator.roomsettings.idle_sleep')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <TextInput
                            value={idleSleepTimeoutValue}
                            onChange={setIdleSleepTimeoutValue}
                            backgroundColor="#fbfbf9"
                            layout={{ position: 'absolute', left: 24, width: 50, top: 255, height: 20 }}
                        />
                        <Region
                            name="idle_sleep_timeout_label"
                            layout={{ position: 'absolute', left: 77, width: 231, top: 257, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionIdleSleepTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <CheckBox
                            variant="0"
                            name="idle_autokick_checkbox"
                            params={17}
                            onPointerTap={onIdleAutokickCheckbox}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 280, height: 20 }}
                        />
                        <Region
                            name="idle_autokick_text"
                            layout={{ position: 'absolute', left: 20, width: 210, top: 279, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionIdleAutokickText ?? t('navigator.roomsettings.idle_autokick')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <TextInput
                            value={idleAutokickTimeoutValue}
                            onChange={setIdleAutokickTimeoutValue}
                            backgroundColor="#fbfbf9"
                            layout={{ position: 'absolute', left: 24, width: 50, top: 301, height: 20 }}
                        />
                        <Region
                            name="idle_autokick_timeout_label"
                            layout={{ position: 'absolute', left: 77, width: 231, top: 303, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionIdleAutokickTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Region
                            name="chat_settings_text"
                            layout={{ position: 'absolute', left: 0, width: 260, top: 335, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionChatSettingsText ?? t('navigator.roomsettings.chat.flood_sensitivity')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Dropmenu
                            variant="2"
                            name="chat_flood_sensitivity"
                            params={33}
                            onPointerTap={onChatFloodSensitivity}
                            layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
                        />
                    </Region>
                    <Region
                        name="tab_container_5"
                        params={144}
                        visible={visibleTabContainer5 ?? false}
                        layout={{ position: 'absolute', left: 0, right: -4, top: 0, height: 367 }}
                    >
                        <Region
                            name="moderation_header"
                            params={16}
                            layout={{ position: 'absolute', left: 6, width: 317, top: 5, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationHeader ?? t('navigator.roomsettings.moderation.header')}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 317 }}
                            />
                        </Region>
                        <Region
                            name="moderation_mute_header"
                            params={16}
                            layout={{ position: 'absolute', left: 7, width: 276, top: 42, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationMuteHeader ?? t('navigator.roomsettings.moderation.mute.header')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="moderation_mute_selector"
                            params={17}
                            visible={visibleModerationMuteSelector ?? false}
                            layout={{ position: 'absolute', left: 10, width: 291, top: 61, height: 31 }}
                        >
                            <RadioButton
                                variant="0"
                                name="moderation_mute_none"
                                params={17}
                                onPointerTap={onModerationMuteNone}
                                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
                            />
                            <RadioButton
                                variant="0"
                                name="moderation_mute_rights"
                                params={17}
                                onPointerTap={onModerationMuteRights}
                                layout={{ position: 'absolute', left: 110, width: 147, top: 0, height: 20 }}
                            />
                            <Region
                                name="moderation_mute_none_label"
                                params={16}
                                layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationMuteNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="moderation_mute_rights_label"
                                params={16}
                                layout={{ position: 'absolute', left: 125, width: 162, top: -2, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationMuteRightsLabel ?? t('navigator.roomsettings.moderation.rights')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                        </Region>
                        <Region
                            name="moderation_kick_header"
                            params={16}
                            layout={{ position: 'absolute', left: 7, width: 273, top: 92, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationKickHeader ?? t('navigator.roomsettings.moderation.kick.header')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="moderation_kick_selector"
                            params={17}
                            visible={visibleModerationKickSelector ?? false}
                            layout={{ position: 'absolute', left: 10, width: 325, top: 112, height: 26 }}
                        >
                            <Region
                                name="moderation_kick_all_label"
                                params={16}
                                layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationKickAllLabel ?? t('navigator.roomsettings.moderation.all')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <RadioButton
                                variant="0"
                                name="moderation_kick_all"
                                params={17}
                                onPointerTap={onModerationKickAll}
                                layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 20 }}
                            />
                            <Region
                                name="moderation_kick_rights_header"
                                params={16}
                                layout={{ position: 'absolute', left: 126, width: 123, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationKickRightsHeader ?? t('navigator.roomsettings.moderation.rights')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <RadioButton
                                variant="0"
                                name="moderation_kick_none"
                                params={17}
                                onPointerTap={onModerationKickNone}
                                layout={{ position: 'absolute', left: 240, width: 104, top: 0, height: 19 }}
                            />
                            <Region
                                name="moderation_kick_none_label"
                                params={16}
                                layout={{ position: 'absolute', left: 255, width: 66, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationKickNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <RadioButton
                                variant="0"
                                name="moderation_kick_rights"
                                params={17}
                                onPointerTap={onModerationKickRights}
                                layout={{ position: 'absolute', left: 110, width: 90, top: 0, height: 20 }}
                            />
                        </Region>
                        <Region
                            name="moderation_ban_header"
                            params={16}
                            layout={{ position: 'absolute', left: 7, width: 292, top: 142, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationBanHeader ?? t('navigator.roomsettings.moderation.ban.header')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="moderation_ban_selector"
                            params={17}
                            visible={visibleModerationBanSelector ?? false}
                            layout={{ position: 'absolute', left: 10, width: 293, top: 161, height: 23 }}
                        >
                            <Region
                                name="moderation_ban_none_label"
                                params={16}
                                layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationBanNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <RadioButton
                                variant="0"
                                name="moderation_ban_none"
                                params={17}
                                onPointerTap={onModerationBanNone}
                                layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
                            />
                            <RadioButton
                                variant="0"
                                name="moderation_ban_rights"
                                params={17}
                                onPointerTap={onModerationBanRights}
                                layout={{ position: 'absolute', left: 110, width: 177, top: 0, height: 20 }}
                            />
                            <Region
                                name="moderation_ban_rights"
                                params={16}
                                layout={{ position: 'absolute', left: 125, width: 197, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionModerationBanRights ?? t('navigator.roomsettings.moderation.rights')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                        </Region>
                        <Border
                            variant="0"
                            name="moderation_banned_users_cont"
                            params={16}
                            layout={{ position: 'absolute', left: 8, width: 172, top: 200, height: 156 }}
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
                            {/* <scrollbar_vertical> for moderation_banned_users - rendered by that list's ScrollArea */}
                        </Border>
                        <Region
                            name="moderation_banned_users_label"
                            params={16}
                            layout={{ position: 'absolute', left: 190, width: 125, top: 236, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModerationBannedUsersLabel ?? t('navigator.roomsettings.moderation.banned.users')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                        <Button
                            variant="3"
                            name="moderation_unban_btn"
                            params={131089}
                            onPointerTap={onModerationUnbanBtn}
                            layout={{ position: 'absolute', left: 190, width: 257, top: 261, height: 32 }}
                        >
                            {t('navigator.roomsettings.moderation.unban')}
                        </Button>
                        <Dropmenu
                            variant="2"
                            name="moderation_mute_dropdown"
                            params={17}
                            onPointerTap={onModerationMuteDropdown}
                            layout={{ position: 'absolute', left: 10, width: 276, top: 61, height: 24 }}
                        />
                        <Dropmenu
                            variant="2"
                            name="moderation_kick_dropdown"
                            params={17}
                            onPointerTap={onModerationKickDropdown}
                            layout={{ position: 'absolute', left: 10, width: 276, top: 112, height: 24 }}
                        />
                        <Dropmenu
                            variant="2"
                            name="moderation_ban_dropdown"
                            params={17}
                            onPointerTap={onModerationBanDropdown}
                            layout={{ position: 'absolute', left: 10, width: 276, top: 161, height: 24 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `guild_access_disclaimer` of RosRoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RosRoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RosRoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_access_disclaimer"
            layout={{ width: 277, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 277 }}
            />
        </Region>
    );
};

/** Row template `advanced_container` of RosRoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RosRoomSettingsLayoutAdvancedContainerItemProps {
    captionAllowFoodConsumeText?: string;
    captionAllowPetsText?: string;
    captionMuteAllPetsText?: string;
    captionPetsContainer?: string;
    layout?: BoxLayout;
    onAllowFoodconsumeCheckbox?: () => void;
    onAllowPetsCheckbox?: () => void;
    onMuteAllPetsCheckbox?: () => void;
}

export const RosRoomSettingsLayoutAdvancedContainerItem = ({ captionAllowFoodConsumeText, captionAllowPetsText, captionMuteAllPetsText, captionPetsContainer, layout, onAllowFoodconsumeCheckbox, onAllowPetsCheckbox, onMuteAllPetsCheckbox }: RosRoomSettingsLayoutAdvancedContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="advanced_container"
            params={16}
            layout={{ width: 218, height: 82, flexShrink: 0, ...layout }}
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
                layout={{ position: 'absolute', left: 18, width: 191, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAllowPetsText ?? t('navigator.roomsettings.allowpets')}
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
                layout={{ position: 'absolute', left: 18, width: 245, top: 38, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAllowFoodConsumeText ?? t('navigator.roomsettings.allowfoodconsume')}
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
                layout={{ position: 'absolute', left: 18, width: 215, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMuteAllPetsText ?? t('navigator.roomsettings.mute_all_pets')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="pets_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPetsContainer ?? t('navigator.roomsettings.pets')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};
