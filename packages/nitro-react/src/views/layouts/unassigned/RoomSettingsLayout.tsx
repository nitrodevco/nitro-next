import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `3199_room_settings_xml` (layout "room_settings", 341x584) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomSettingsLayoutProps {
    contents?: RoomSettingsLayoutContentsProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RoomSettingsLayout = ({ contents, layout, onClose }: RoomSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 584, ...layout }}
        >
            <RoomSettingsLayoutContents {...contents} />
        </Frame>
    );
};

/** Named region `tag_category_container` of RoomSettingsLayout - configured through the parent's `tagCategoryContainer` prop. */
export interface RoomSettingsLayoutTagCategoryContainerProps {
    captionCategoryLabel?: string;
    captionMaxvisitorsLabel?: string;
    captionTagLabel?: string;
    captionTradesettingsLabel?: string;
    layout?: BoxLayout;
    onCategories?: () => void;
    onMaxvisitors?: () => void;
    onTradesettings?: () => void;
}

export const RoomSettingsLayoutTagCategoryContainer = ({ captionCategoryLabel, captionMaxvisitorsLabel, captionTagLabel, captionTradesettingsLabel, layout, onCategories, onMaxvisitors, onTradesettings }: RoomSettingsLayoutTagCategoryContainerProps) => {
    const t = useTranslation();
    const [ tag1Value, setTag1Value ] = useState('');
    const [ tag2Value, setTag2Value ] = useState('');

    return (
        <Region
            name="tag_category_container"
            layout={{ position: 'absolute', left: 0, width: 300, top: 100, height: 192, ...layout }}
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
                variant="3"
                name="categories"
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
                variant="3"
                name="maxvisitors"
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
                variant="3"
                name="tradesettings"
                onPointerTap={onTradesettings}
                layout={{ position: 'absolute', left: 0, width: 299, top: 106, height: 24 }}
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
                layout={{ position: 'absolute', left: 0, width: 145, top: 154, height: 15, overflow: 'hidden' }}
            />
            <TextInput
                value={tag2Value}
                onChange={setTag2Value}
                backgroundColor="#fbfbf9"
                layout={{ position: 'absolute', left: 149, width: 145, top: 154, height: 15, overflow: 'hidden' }}
            />
        </Region>
    );
};

/** Row template `tab_container_1` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer1ItemProps {
    captionDescriptionLabel?: string;
    captionRemoveLink?: string;
    captionRoomNameLabel?: string;
    captionWalkThroughText?: string;
    layout?: BoxLayout;
    onAllowWalkThroughCheckbox?: () => void;
    onRemoveLinkRegion?: () => void;
    tagCategoryContainer?: RoomSettingsLayoutTagCategoryContainerProps;
}

export const RoomSettingsLayoutTabContainer1Item = ({ captionDescriptionLabel, captionRemoveLink, captionRoomNameLabel, captionWalkThroughText, layout, onAllowWalkThroughCheckbox, onRemoveLinkRegion, tagCategoryContainer }: RoomSettingsLayoutTabContainer1ItemProps) => {
    const t = useTranslation();
    const [ roomNameValue, setRoomNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');

    return (
        <Region
            name="tab_container_1"
            layout={{ width: 321, height: 360, flexShrink: 0, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', left: 0, width: 300, top: 14, height: 20, overflow: 'hidden' }}
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
                layout={{ position: 'absolute', left: 0, width: 300, top: 51, height: 39, overflow: 'hidden' }}
            />
            <RoomSettingsLayoutTagCategoryContainer {...tagCategoryContainer} />
            <Region
                name="advanced_container"
                layout={{ position: 'absolute', left: 0, width: 216, top: 239, height: 82 }}
            >
                <CheckBox
                    variant="0"
                    name="allow_walk_through_checkbox"
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
                onPointerTap={onRemoveLinkRegion}
                cursor="pointer"
                layout={{ position: 'absolute', width: 189, top: 334, height: 22 }}
            >
                <Region
                    name="remove_link"
                    layout={{ position: 'absolute', left: 15, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    tintColor="#bb2200"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 20 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `doormode_container` of RoomSettingsLayout - configured through the parent's `doormodeContainer` prop. */
export interface RoomSettingsLayoutDoormodeContainerProps {
    captionDoormodeDoorbellLabel?: string;
    captionDoormodeInvisibleLabel?: string;
    captionDoormodeLabel?: string;
    captionDoormodeOpenLabel?: string;
    captionDoormodePasswordLabel?: string;
    layout?: BoxLayout;
    onDoormodeDoorbell?: () => void;
    onDoormodeInvisible?: () => void;
    onDoormodeOpen?: () => void;
    onDoormodePassword?: () => void;
}

export const RoomSettingsLayoutDoormodeContainer = ({ captionDoormodeDoorbellLabel, captionDoormodeInvisibleLabel, captionDoormodeLabel, captionDoormodeOpenLabel, captionDoormodePasswordLabel, layout, onDoormodeDoorbell, onDoormodeInvisible, onDoormodeOpen, onDoormodePassword }: RoomSettingsLayoutDoormodeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="doormode_container"
            layout={{ position: 'absolute', left: 0, width: 309, top: 87, height: 95, ...layout }}
        >
            <Region
                name="doormode_label"
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeLabel ?? t('navigator.roomsettings.doormode')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="doormode"
                layout={{ position: 'absolute', left: 5, width: 274, top: 18, height: 80 }}
            >
                <RadioButton
                    variant="0"
                    name="doormode_open"
                    onPointerTap={onDoormodeOpen}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_doorbell"
                    onPointerTap={onDoormodeDoorbell}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 20, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_invisible"
                    onPointerTap={onDoormodeInvisible}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 40, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_password"
                    onPointerTap={onDoormodePassword}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 60, height: 20 }}
                />
            </Region>
            <Region
                name="doormode_open_label"
                layout={{ position: 'absolute', left: 20, width: 230, top: 17, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeOpenLabel ?? t('navigator.roomsettings.doormode.open')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_doorbell_label"
                layout={{ position: 'absolute', left: 20, width: 249, top: 36, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeDoorbellLabel ?? t('navigator.roomsettings.doormode.doorbell')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_invisible_label"
                layout={{ position: 'absolute', left: 20, width: 245, top: 56, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeInvisibleLabel ?? t('navigator.roomsettings.doormode.invisible')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_password_label"
                layout={{ position: 'absolute', left: 20, width: 253, top: 76, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodePasswordLabel ?? t('navigator.roomsettings.doormode.password')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `normal_access_container` of RoomSettingsLayout - configured through the parent's `normalAccessContainer` prop. */
export interface RoomSettingsLayoutNormalAccessContainerProps {
    captionPasswordConfirmLabel?: string;
    captionPasswordLabel?: string;
    captionRoomAccessTabCaption?: string;
    captionRoomAccessTabInfo?: string;
    doormodeContainer?: RoomSettingsLayoutDoormodeContainerProps;
    layout?: BoxLayout;
    onBuildersFaqButton?: () => void;
    visibleDoormodeOverrideInfo?: boolean;
}

export const RoomSettingsLayoutNormalAccessContainer = ({ captionPasswordConfirmLabel, captionPasswordLabel, captionRoomAccessTabCaption, captionRoomAccessTabInfo, doormodeContainer, layout, onBuildersFaqButton, visibleDoormodeOverrideInfo }: RoomSettingsLayoutNormalAccessContainerProps) => {
    const t = useTranslation();
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ passwordConfirmValue, setPasswordConfirmValue ] = useState('');

    return (
        <Region
            name="normal_access_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 354, ...layout }}
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
                layout={{ position: 'absolute', left: 0, width: 300, top: 19, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomAccessTabInfo ?? t('navigator.roomsettings.roomaccess.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                />
            </Region>
            <RoomSettingsLayoutDoormodeContainer {...doormodeContainer} />
            <Region
                name="password_container"
                layout={{ position: 'absolute', left: 41, width: 195, top: 188, height: 68 }}
            >
                <Region
                    name="password_label"
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
                    layout={{ position: 'absolute', left: 1, width: 193, top: 15, height: 15, overflow: 'hidden' }}
                />
                <Region
                    name="password__confirm_label"
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
                    layout={{ position: 'absolute', left: 1, width: 193, top: 48, height: 15, overflow: 'hidden' }}
                />
            </Region>
            {(visibleDoormodeOverrideInfo ?? false) && (
                <Border
                    variant="0"
                    name="doormode_override_info"
                    layout={{ position: 'absolute', left: 0, width: 308, top: 88, height: 166, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', left: 5, width: 295, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('notification.builders_club.room_locked.title')}
                            textStyle="text-style-u-headline-small"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 5, width: 298, top: 42, height: 79, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('notification.builders_club.room_locked.message')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 298 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="builders_faq_button"
                        onPointerTap={onBuildersFaqButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 287, top: 122, height: 30 }}
                    >
                        {t('notification.builders_club.room_locked.linkTitle')}
                    </Button>
                </Border>
            )}
        </Region>
    );
};

/** Row template `guild_access_disclaimer` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_access_disclaimer"
            layout={{ width: 305, height: 33, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 305 }}
            />
        </Region>
    );
};

/** Row template `advanced_container` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutAdvancedContainerItemProps {
    captionAllowFoodConsumeText?: string;
    captionAllowPetsText?: string;
    captionMuteAllPetsText?: string;
    captionPetsContainer?: string;
    layout?: BoxLayout;
    onAllowFoodconsumeCheckbox?: () => void;
    onAllowPetsCheckbox?: () => void;
    onMuteAllPetsCheckbox?: () => void;
}

export const RoomSettingsLayoutAdvancedContainerItem = ({ captionAllowFoodConsumeText, captionAllowPetsText, captionMuteAllPetsText, captionPetsContainer, layout, onAllowFoodconsumeCheckbox, onAllowPetsCheckbox, onMuteAllPetsCheckbox }: RoomSettingsLayoutAdvancedContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="advanced_container"
            layout={{ width: 278, height: 82, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="0"
                name="allow_pets_checkbox"
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
                onPointerTap={onMuteAllPetsCheckbox}
                layout={{ position: 'absolute', left: 3, width: 270, top: 59, height: 20 }}
            />
            <Region
                name="mute_all_pets_text"
                layout={{ position: 'absolute', left: 18, width: 245, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMuteAllPetsText ?? t('navigator.roomsettings.mute_all_pets')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="pets_container"
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

/** Named region `flexible_content` of RoomSettingsLayout - configured through the parent's `flexibleContent` prop. */
export interface RoomSettingsLayoutFlexibleContentProps {
    itemsFlexibleContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutFlexibleContent = ({ itemsFlexibleContent, layout }: RoomSettingsLayoutFlexibleContentProps) => {
    return (
        <Region
            name="flexible_content"
            layout={{ position: 'absolute', left: 0, width: 315, top: 260, height: 117, flexDirection: 'column', ...layout }}
        >
            {itemsFlexibleContent ?? (
                <>
                    <RoomSettingsLayoutGuildAccessDisclaimerItem />
                    <RoomSettingsLayoutAdvancedContainerItem />
                </>
            )}
        </Region>
    );
};

/** Row template `tab_container_2` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer2ItemProps {
    flexibleContent?: RoomSettingsLayoutFlexibleContentProps;
    layout?: BoxLayout;
    normalAccessContainer?: RoomSettingsLayoutNormalAccessContainerProps;
}

export const RoomSettingsLayoutTabContainer2Item = ({ flexibleContent, layout, normalAccessContainer }: RoomSettingsLayoutTabContainer2ItemProps) => {
    return (
        <Region
            name="tab_container_2"
            layout={{ width: 321, height: 366, flexShrink: 0, ...layout }}
        >
            <RoomSettingsLayoutNormalAccessContainer {...normalAccessContainer} />
            <RoomSettingsLayoutFlexibleContent {...flexibleContent} />
        </Region>
    );
};

/** Named region `normal_rights_container` of RoomSettingsLayout - configured through the parent's `normalRightsContainer` prop. */
export interface RoomSettingsLayoutNormalRightsContainerProps {
    captionFriendsTxt?: string;
    captionSearchTxt?: string;
    captionUsersWithRightsTxt?: string;
    layout?: BoxLayout;
    onRemoveAllFlatCtrls?: () => void;
    visibleFriendsCont?: boolean;
    visibleFriendsTxt?: boolean;
    visibleUsersWithRightsCont?: boolean;
}

export const RoomSettingsLayoutNormalRightsContainer = ({ captionFriendsTxt, captionSearchTxt, captionUsersWithRightsTxt, layout, onRemoveAllFlatCtrls, visibleFriendsCont, visibleFriendsTxt, visibleUsersWithRightsCont }: RoomSettingsLayoutNormalRightsContainerProps) => {
    const t = useTranslation();
    const [ filterUsersInputValue, setFilterUsersInputValue ] = useState('');

    return (
        <Region
            name="normal_rights_container"
            layout={{ position: 'absolute', left: 0, right: -68, top: 0, height: 367, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="0"
                name="search_border"
                tintColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 312, top: 1, height: 42 }}
            >
                <Region
                    name="search_txt"
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
                    layout={{ position: 'absolute', left: 97, right: 9, top: 8, height: 23, overflow: 'hidden' }}
                />
            </Border>
            <Region
                name="users_with_rights_txt"
                layout={{ position: 'absolute', marginLeft: -121, marginRight: 121, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUsersWithRightsTxt ?? t('navigator.flatctrls.userswithrights')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
            {(visibleFriendsTxt ?? false) && (
                <Region
                    name="friends_txt"
                    layout={{ position: 'absolute', marginLeft: 54, marginRight: -54, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFriendsTxt ?? t('navigator.flatctrls.friends')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
            )}
            {(visibleUsersWithRightsCont ?? false) && (
                <Border
                    variant="0"
                    name="users_with_rights_cont"
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 150, top: 74, bottom: 4 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 39 }}
                    >
                        <Region
                            name="users_with_rights_item_list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for users_with_rights_item_list - rendered by that list's ScrollArea */}
                    <ButtonThick
                        variant="3"
                        name="remove_all_flat_ctrls"
                        onPointerTap={onRemoveAllFlatCtrls}
                        textStyle="text-style-button-shiny-bold"
                        layout={{ position: 'absolute', left: 4, width: 142, bottom: 4, height: 29, minWidth: 142, maxWidth: 142 }}
                    >
                        {t('navigator.flatctrls.clear')}
                    </ButtonThick>
                </Border>
            )}
            {(visibleFriendsCont ?? false) && (
                <Border
                    variant="0"
                    name="friends_cont"
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 173, width: 150, top: 74, bottom: 4 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 4 }}
                    >
                        <Region
                            name="friends_item_list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for friends_item_list - rendered by that list's ScrollArea */}
                </Border>
            )}
        </Region>
    );
};

/** Row template `tab_container_3` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer3ItemProps {
    layout?: BoxLayout;
    normalRightsContainer?: RoomSettingsLayoutNormalRightsContainerProps;
    visibleGuildRightsContainer?: boolean;
}

export const RoomSettingsLayoutTabContainer3Item = ({ layout, normalRightsContainer, visibleGuildRightsContainer }: RoomSettingsLayoutTabContainer3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_container_3"
            layout={{ width: 324, height: 367, flexShrink: 0, ...layout }}
        >
            {(visibleGuildRightsContainer ?? false) && (
                <Region
                    name="guild_rights_container"
                    layout={{ position: 'absolute', left: 6, right: -62, top: 0, height: 367 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 215, top: 3, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.flatctrls.guild.caption')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 0, width: 309, top: 42, height: 240, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.flatctrls.guild.info')}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
                        />
                    </Region>
                </Region>
            )}
            <RoomSettingsLayoutNormalRightsContainer {...normalRightsContainer} />
        </Region>
    );
};

/** Row template `tab_container_4` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer4ItemProps {
    captionChatSettingsText?: string;
    captionDoNotLeaveOnDoorTileText?: string;
    captionHideWallsText?: string;
    captionIdleAutokickText?: string;
    captionIdleAutokickTimeoutLabel?: string;
    captionIdleSleepText?: string;
    captionIdleSleepTimeoutLabel?: string;
    captionRoomBehaviorText?: string;
    captionVipSettingsText?: string;
    captionVipTabCaption?: string;
    captionVipTabInfo?: string;
    layout?: BoxLayout;
    onChatFloodSensitivity?: () => void;
    onDoNotLeaveOnDoorTileCheckbox?: () => void;
    onFloorThickness?: () => void;
    onHideWallsCheckbox?: () => void;
    onIdleAutokickCheckbox?: () => void;
    onIdleSleepCheckbox?: () => void;
    onWallThickness?: () => void;
}

export const RoomSettingsLayoutTabContainer4Item = ({ captionChatSettingsText, captionDoNotLeaveOnDoorTileText, captionHideWallsText, captionIdleAutokickText, captionIdleAutokickTimeoutLabel, captionIdleSleepText, captionIdleSleepTimeoutLabel, captionRoomBehaviorText, captionVipSettingsText, captionVipTabCaption, captionVipTabInfo, layout, onChatFloodSensitivity, onDoNotLeaveOnDoorTileCheckbox, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onWallThickness }: RoomSettingsLayoutTabContainer4ItemProps) => {
    const t = useTranslation();
    const [ idleSleepTimeoutValue, setIdleSleepTimeoutValue ] = useState('');
    const [ idleAutokickTimeoutValue, setIdleAutokickTimeoutValue ] = useState('');

    return (
        <Region
            name="tab_container_4"
            layout={{ width: 322, height: 395, flexShrink: 0, ...layout }}
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
                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 70, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipTabInfo ?? t('navigator.roomsettings.vip.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                />
            </Region>
            <Region
                name="vip_settings_text"
                layout={{ position: 'absolute', left: 0, width: 206, top: 90, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVipSettingsText ?? t('navigator.roomsettings.vip_settings')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <CheckBox
                variant="0"
                name="hide_walls_checkbox"
                onPointerTap={onHideWallsCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 110, height: 20 }}
            />
            <Region
                name="hide_walls_text"
                layout={{ position: 'absolute', left: 20, width: 194, top: 109, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHideWallsText ?? t('navigator.roomsettings.hide_walls')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="wall_thickness"
                onPointerTap={onWallThickness}
                layout={{ position: 'absolute', left: 0, width: 276, top: 131, height: 24 }}
            />
            <Dropmenu
                variant="3"
                name="floor_thickness"
                onPointerTap={onFloorThickness}
                layout={{ position: 'absolute', left: 0, width: 276, top: 162, height: 24 }}
            />
            <Region
                name="room_behavior_text"
                layout={{ position: 'absolute', left: 0, width: 148, top: 193, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomBehaviorText ?? t('navigator.roomsettings.room_behavior')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <CheckBox
                variant="0"
                name="do_not_leave_on_door_tile_checkbox"
                onPointerTap={onDoNotLeaveOnDoorTileCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 214, height: 20 }}
            />
            <Region
                name="do_not_leave_on_door_tile_text"
                layout={{ position: 'absolute', left: 20, width: 290, top: 213, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoNotLeaveOnDoorTileText ?? t('navigator.roomsettings.do_not_leave_on_door_tile')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <CheckBox
                variant="0"
                name="idle_sleep_checkbox"
                onPointerTap={onIdleSleepCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 236, height: 20 }}
            />
            <Region
                name="idle_sleep_text"
                layout={{ position: 'absolute', left: 20, width: 185, top: 235, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 20, width: 72, top: 257, height: 20, overflow: 'hidden' }}
            />
            <Region
                name="idle_sleep_timeout_label"
                layout={{ position: 'absolute', left: 98, width: 57, top: 259, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleSleepTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <CheckBox
                variant="0"
                name="idle_autokick_checkbox"
                onPointerTap={onIdleAutokickCheckbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 282, height: 20 }}
            />
            <Region
                name="idle_autokick_text"
                layout={{ position: 'absolute', left: 20, width: 210, top: 281, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 20, width: 72, top: 303, height: 20, overflow: 'hidden' }}
            />
            <Region
                name="idle_autokick_timeout_label"
                layout={{ position: 'absolute', left: 98, width: 57, top: 305, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionIdleAutokickTimeoutLabel ?? t('navigator.roomsettings.timeout.seconds')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="chat_settings_text"
                layout={{ position: 'absolute', left: 0, width: 97, top: 333, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionChatSettingsText ?? t('navigator.roomsettings.chat.flood_sensitivity')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="chat_flood_sensitivity"
                onPointerTap={onChatFloodSensitivity}
                layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
            />
        </Region>
    );
};

/** Row template `tab_container_5` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer5ItemProps {
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
    layout?: BoxLayout;
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    onModerationKickAll?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    onModerationUnbanBtn?: () => void;
}

export const RoomSettingsLayoutTabContainer5Item = ({ captionModerationBanHeader, captionModerationBannedUsersLabel, captionModerationBanNoneLabel, captionModerationBanRights, captionModerationHeader, captionModerationKickAllLabel, captionModerationKickHeader, captionModerationKickNoneLabel, captionModerationKickRightsHeader, captionModerationMuteHeader, captionModerationMuteNoneLabel, captionModerationMuteRightsLabel, layout, onModerationBanNone, onModerationBanRights, onModerationKickAll, onModerationKickNone, onModerationKickRights, onModerationMuteNone, onModerationMuteRights, onModerationUnbanBtn }: RoomSettingsLayoutTabContainer5ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_container_5"
            layout={{ width: 297, height: 367, flexShrink: 0, ...layout }}
        >
            <Region
                name="moderation_header"
                layout={{ position: 'absolute', left: 0, width: 323, top: 0, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationHeader ?? t('navigator.roomsettings.moderation.header')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 323 }}
                />
            </Region>
            <Region
                name="moderation_mute_header"
                layout={{ position: 'absolute', left: 0, width: 276, top: 50, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionModerationMuteHeader ?? t('navigator.roomsettings.moderation.mute.header')}
            </Region>
            <Region
                name="moderation_mute_selector"
                layout={{ position: 'absolute', left: 0, width: 291, top: 75, height: 31 }}
            >
                <RadioButton
                    variant="0"
                    name="moderation_mute_none"
                    onPointerTap={onModerationMuteNone}
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
                />
                <Region
                    name="moderation_mute_none_label"
                    layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationMuteNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                </Region>
                <Region
                    name="moderation_mute_rights_label"
                    layout={{ position: 'absolute', left: 95, width: 162, top: -4, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationMuteRightsLabel ?? t('navigator.roomsettings.moderation.rights')}
                </Region>
                <RadioButton
                    variant="0"
                    name="moderation_mute_rights"
                    onPointerTap={onModerationMuteRights}
                    layout={{ position: 'absolute', left: 80, width: 147, top: 0, height: 20 }}
                />
            </Region>
            <Region
                name="moderation_kick_header"
                layout={{ position: 'absolute', left: 0, width: 273, top: 110, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionModerationKickHeader ?? t('navigator.roomsettings.moderation.kick.header')}
            </Region>
            <Region
                name="moderation_kick_selector"
                layout={{ position: 'absolute', left: 0, width: 325, top: 130, height: 26 }}
            >
                <RadioButton
                    variant="0"
                    name="moderation_kick_none"
                    onPointerTap={onModerationKickNone}
                    layout={{ position: 'absolute', left: 0, width: 104, top: 0, height: 19 }}
                />
                <Region
                    name="moderation_kick_none_label"
                    layout={{ position: 'absolute', left: 15, width: 66, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationKickNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                </Region>
                <Region
                    name="moderation_kick_rights_header"
                    layout={{ position: 'absolute', left: 96, width: 123, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationKickRightsHeader ?? t('navigator.roomsettings.moderation.rights')}
                </Region>
                <Region
                    name="moderation_kick_all_label"
                    layout={{ position: 'absolute', left: 245, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationKickAllLabel ?? t('navigator.roomsettings.moderation.all')}
                </Region>
                <RadioButton
                    variant="0"
                    name="moderation_kick_rights"
                    onPointerTap={onModerationKickRights}
                    layout={{ position: 'absolute', left: 80, width: 90, top: 0, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="moderation_kick_all"
                    onPointerTap={onModerationKickAll}
                    layout={{ position: 'absolute', left: 230, width: 107, top: 0, height: 20 }}
                />
            </Region>
            <Region
                name="moderation_ban_header"
                layout={{ position: 'absolute', left: 0, width: 292, top: 160, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionModerationBanHeader ?? t('navigator.roomsettings.moderation.ban.header')}
            </Region>
            <Region
                name="moderation_ban_selector"
                layout={{ position: 'absolute', left: 0, width: 293, top: 180, height: 23 }}
            >
                <Region
                    name="moderation_ban_none_label"
                    layout={{ position: 'absolute', left: 15, width: 93, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationBanNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                </Region>
                <RadioButton
                    variant="0"
                    name="moderation_ban_none"
                    onPointerTap={onModerationBanNone}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
                />
                <Region
                    name="moderation_ban_rights"
                    layout={{ position: 'absolute', left: 95, width: 197, top: -4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionModerationBanRights ?? t('navigator.roomsettings.moderation.rights')}
                </Region>
                <RadioButton
                    variant="0"
                    name="moderation_ban_rights"
                    onPointerTap={onModerationBanRights}
                    layout={{ position: 'absolute', left: 80, width: 177, top: 0, height: 20 }}
                />
            </Region>
            <Border
                variant="0"
                name="moderation_banned_users_cont"
                layout={{ position: 'absolute', left: 0, width: 172, top: 210, height: 156 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 3, width: 129, top: 4, height: 146 }}
                >
                    <Region
                        name="moderation_banned_users"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                {/* <scrollbar_vertical> for moderation_banned_users - rendered by that list's ScrollArea */}
            </Border>
            <Region
                name="moderation_banned_users_label"
                layout={{ position: 'absolute', left: 178, width: 125, top: 233, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionModerationBannedUsersLabel ?? t('navigator.roomsettings.moderation.banned.users')}
            </Region>
            <Button
                variant="3"
                name="moderation_unban_btn"
                onPointerTap={onModerationUnbanBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 182, width: 257, top: 261, height: 32 }}
            >
                {t('navigator.roomsettings.moderation.unban')}
            </Button>
        </Region>
    );
};

/** Named region `contents` of RoomSettingsLayout - configured through the parent's `contents` prop. */
export interface RoomSettingsLayoutContentsProps {
    itemsContents?: ReactNode;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutContents = ({ itemsContents, layout }: RoomSettingsLayoutContentsProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, right: 5, top: 0, bottom: 35, ...layout }}
        >
            <Region
                name="contents"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsContents ?? (
                    <>
                        <RoomSettingsLayoutTabContainer1Item />
                        <RoomSettingsLayoutTabContainer2Item />
                        <RoomSettingsLayoutTabContainer3Item />
                        <RoomSettingsLayoutTabContainer4Item />
                        <RoomSettingsLayoutTabContainer5Item />
                    </>
                )}
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.1')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.2')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.3')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.4')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.5')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
            </Region>
        </ScrollArea>
    );
};
