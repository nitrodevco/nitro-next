import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeText } from '#base/theme';

/** Generated from `3065_ros_room_settings_xml` (layout "ros_room_settings", 341x477) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosRoomSettingsLayoutProps {
    contentContainer?: RosRoomSettingsLayoutContentContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTab1?: () => void;
    onTab2?: () => void;
    onTab3?: () => void;
    onTab4?: () => void;
    onTab5?: () => void;
}

export const RosRoomSettingsLayout = ({ contentContainer, layout, onClose, onTab1, onTab2, onTab3, onTab4, onTab5 }: RosRoomSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 477, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TabContext
                    variant="3"
                    name="tab_context"
                    layout={{ position: 'absolute', left: -6, width: 354, top: 3, height: 32 }}
                >
                    <TabButton
                        variant="3"
                        name="tab_1"
                        onPointerTap={onTab1}
                        layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.1')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_2"
                        onPointerTap={onTab2}
                        layout={{ position: 'absolute', left: 185, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.2')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_3"
                        onPointerTap={onTab3}
                        layout={{ position: 'absolute', left: 370, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.3')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_4"
                        onPointerTap={onTab4}
                        layout={{ position: 'absolute', left: 555, width: 186, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.4')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_5"
                        onPointerTap={onTab5}
                        layout={{ position: 'absolute', left: 741, width: 185, top: 0, height: 32 }}
                    >
                        {t('navigator.roomsettings.tab.5')}
                    </TabButton>
                </TabContext>
                <RosRoomSettingsLayoutContentContainer {...contentContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `tag_category_container` of RosRoomSettingsLayout - configured through the parent's `tagCategoryContainer` prop. */
export interface RosRoomSettingsLayoutTagCategoryContainerProps {
    captionCategoryLabel?: string;
    captionMaxvisitorsLabel?: string;
    captionTagLabel?: string;
    captionTradesettingsLabel?: string;
    layout?: BoxLayout;
    onCategories?: () => void;
    onMaxvisitors?: () => void;
    onTradesettings?: () => void;
}

export const RosRoomSettingsLayoutTagCategoryContainer = ({ captionCategoryLabel, captionMaxvisitorsLabel, captionTagLabel, captionTradesettingsLabel, layout, onCategories, onMaxvisitors, onTradesettings }: RosRoomSettingsLayoutTagCategoryContainerProps) => {
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
                variant="2"
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
                variant="2"
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
                variant="2"
                name="tradesettings"
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
    );
};

/** Named region `advanced_container` of RosRoomSettingsLayout - configured through the parent's `advancedContainer` prop. */
export interface RosRoomSettingsLayoutAdvancedContainerProps {
    captionWalkThroughText?: string;
    layout?: BoxLayout;
    onAllowWalkThroughCheckbox?: () => void;
}

export const RosRoomSettingsLayoutAdvancedContainer = ({ captionWalkThroughText, layout, onAllowWalkThroughCheckbox }: RosRoomSettingsLayoutAdvancedContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="advanced_container"
            layout={{ position: 'absolute', left: 0, width: 218, top: 253, height: 82, ...layout }}
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
    );
};

/** Named region `remove_link_region` of RosRoomSettingsLayout - configured through the parent's `removeLinkRegion` prop. */
export interface RosRoomSettingsLayoutRemoveLinkRegionProps {
    captionRemoveLink?: string;
    layout?: BoxLayout;
    onRemoveLinkRegion?: () => void;
}

export const RosRoomSettingsLayoutRemoveLinkRegion = ({ captionRemoveLink, layout, onRemoveLinkRegion }: RosRoomSettingsLayoutRemoveLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="remove_link_region"
            onPointerTap={onRemoveLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 60, width: 180, top: 339, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="remove_link"
                layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
    );
};

/** Named region `tab_container_1` of RosRoomSettingsLayout - configured through the parent's `tabContainer1` prop. */
export interface RosRoomSettingsLayoutTabContainer1Props {
    advancedContainer?: RosRoomSettingsLayoutAdvancedContainerProps;
    captionDescriptionLabel?: string;
    captionRoomNameLabel?: string;
    layout?: BoxLayout;
    onTabContainer1?: () => void;
    removeLinkRegion?: RosRoomSettingsLayoutRemoveLinkRegionProps;
    tagCategoryContainer?: RosRoomSettingsLayoutTagCategoryContainerProps;
    visibleTabContainer1?: boolean;
}

export const RosRoomSettingsLayoutTabContainer1 = ({ advancedContainer, captionDescriptionLabel, captionRoomNameLabel, layout, onTabContainer1, removeLinkRegion, tagCategoryContainer, visibleTabContainer1 }: RosRoomSettingsLayoutTabContainer1Props) => {
    const t = useTranslation();
    const [ roomNameValue, setRoomNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');

    return (
        <Region
            name="tab_container_1"
            visible={visibleTabContainer1 ?? false}
            onPointerTap={onTabContainer1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 360, ...layout }}
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
            <RosRoomSettingsLayoutTagCategoryContainer {...tagCategoryContainer} />
            <RosRoomSettingsLayoutAdvancedContainer {...advancedContainer} />
            <RosRoomSettingsLayoutRemoveLinkRegion {...removeLinkRegion} />
        </Region>
    );
};

/** Named region `doormode` of RosRoomSettingsLayout - configured through the parent's `doormode` prop. */
export interface RosRoomSettingsLayoutDoormodeProps {
    layout?: BoxLayout;
    onDoormodeDoorbell?: () => void;
    onDoormodeInvisible?: () => void;
    onDoormodeOpen?: () => void;
    onDoormodePassword?: () => void;
}

export const RosRoomSettingsLayoutDoormode = ({ layout, onDoormodeDoorbell, onDoormodeInvisible, onDoormodeOpen, onDoormodePassword }: RosRoomSettingsLayoutDoormodeProps) => {
    return (
        <Region
            name="doormode"
            layout={{ position: 'absolute', left: 5, width: 274, top: 18, height: 80, ...layout }}
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
    );
};

/** Named region `doormode_container` of RosRoomSettingsLayout - configured through the parent's `doormodeContainer` prop. */
export interface RosRoomSettingsLayoutDoormodeContainerProps {
    captionDoormodeDoorbellLabel?: string;
    captionDoormodeInvisibleLabel?: string;
    captionDoormodeLabel?: string;
    captionDoormodeOpenLabel?: string;
    captionDoormodePasswordLabel?: string;
    doormode?: RosRoomSettingsLayoutDoormodeProps;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutDoormodeContainer = ({ captionDoormodeDoorbellLabel, captionDoormodeInvisibleLabel, captionDoormodeLabel, captionDoormodeOpenLabel, captionDoormodePasswordLabel, doormode, layout }: RosRoomSettingsLayoutDoormodeContainerProps) => {
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
            <RosRoomSettingsLayoutDoormode {...doormode} />
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

/** Named region `password_container` of RosRoomSettingsLayout - configured through the parent's `passwordContainer` prop. */
export interface RosRoomSettingsLayoutPasswordContainerProps {
    captionPasswordConfirmLabel?: string;
    captionPasswordLabel?: string;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutPasswordContainer = ({ captionPasswordConfirmLabel, captionPasswordLabel, layout }: RosRoomSettingsLayoutPasswordContainerProps) => {
    const t = useTranslation();
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ passwordConfirmValue, setPasswordConfirmValue ] = useState('');

    return (
        <Region
            name="password_container"
            layout={{ position: 'absolute', left: 41, width: 195, top: 188, height: 68, ...layout }}
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
                layout={{ position: 'absolute', left: 1, width: 193, top: 15, height: 15 }}
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
                layout={{ position: 'absolute', left: 1, width: 193, top: 48, height: 15 }}
            />
        </Region>
    );
};

/** Named region `normal_access_container` of RosRoomSettingsLayout - configured through the parent's `normalAccessContainer` prop. */
export interface RosRoomSettingsLayoutNormalAccessContainerProps {
    captionRoomAccessTabCaption?: string;
    captionRoomAccessTabInfo?: string;
    doormodeContainer?: RosRoomSettingsLayoutDoormodeContainerProps;
    layout?: BoxLayout;
    onBuildersFaqButton?: () => void;
    passwordContainer?: RosRoomSettingsLayoutPasswordContainerProps;
    visibleDoormodeOverrideInfo?: boolean;
}

export const RosRoomSettingsLayoutNormalAccessContainer = ({ captionRoomAccessTabCaption, captionRoomAccessTabInfo, doormodeContainer, layout, onBuildersFaqButton, passwordContainer, visibleDoormodeOverrideInfo }: RosRoomSettingsLayoutNormalAccessContainerProps) => {
    const t = useTranslation();

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
                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomAccessTabInfo ?? t('navigator.roomsettings.roomaccess.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                />
            </Region>
            <RosRoomSettingsLayoutDoormodeContainer {...doormodeContainer} />
            <RosRoomSettingsLayoutPasswordContainer {...passwordContainer} />
            <Region
                visible={visibleDoormodeOverrideInfo ?? false}
                layout={{ position: 'absolute', left: 0, width: 308, top: 88, height: 166 }}
            >
                <Border
                    variant="0"
                    name="doormode_override_info"
                    layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
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
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 287, top: 122, height: 30 }}
                    >
                        {t('notification.builders_club.room_locked.linkTitle')}
                    </Button>
                </Border>
            </Region>
        </Region>
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
            layout={{ width: 218, height: 82, flexShrink: 0, ...layout }}
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
                layout={{ position: 'absolute', left: 18, width: 215, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Named region `flexible_content` of RosRoomSettingsLayout - configured through the parent's `flexibleContent` prop. */
export interface RosRoomSettingsLayoutFlexibleContentProps {
    itemsFlexibleContent?: ReactNode;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutFlexibleContent = ({ itemsFlexibleContent, layout }: RosRoomSettingsLayoutFlexibleContentProps) => {
    return (
        <Region
            name="flexible_content"
            layout={{ position: 'absolute', left: 0, width: 277, top: 260, height: 117, flexDirection: 'column', ...layout }}
        >
            {itemsFlexibleContent ?? (
                <>
                    <RosRoomSettingsLayoutGuildAccessDisclaimerItem />
                    <RosRoomSettingsLayoutAdvancedContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `tab_container_2` of RosRoomSettingsLayout - configured through the parent's `tabContainer2` prop. */
export interface RosRoomSettingsLayoutTabContainer2Props {
    flexibleContent?: RosRoomSettingsLayoutFlexibleContentProps;
    layout?: BoxLayout;
    normalAccessContainer?: RosRoomSettingsLayoutNormalAccessContainerProps;
    onTabContainer2?: () => void;
    visibleTabContainer2?: boolean;
}

export const RosRoomSettingsLayoutTabContainer2 = ({ flexibleContent, layout, normalAccessContainer, onTabContainer2, visibleTabContainer2 }: RosRoomSettingsLayoutTabContainer2Props) => {
    return (
        <Region
            name="tab_container_2"
            visible={visibleTabContainer2 ?? false}
            onPointerTap={onTabContainer2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 366, ...layout }}
        >
            <RosRoomSettingsLayoutNormalAccessContainer {...normalAccessContainer} />
            <RosRoomSettingsLayoutFlexibleContent {...flexibleContent} />
        </Region>
    );
};

/** Named region `guild_rights_container` of RosRoomSettingsLayout - configured through the parent's `guildRightsContainer` prop. */
export interface RosRoomSettingsLayoutGuildRightsContainerProps {
    layout?: BoxLayout;
    visibleGuildRightsContainer?: boolean;
}

export const RosRoomSettingsLayoutGuildRightsContainer = ({ layout, visibleGuildRightsContainer }: RosRoomSettingsLayoutGuildRightsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_rights_container"
            visible={visibleGuildRightsContainer ?? false}
            layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 367, ...layout }}
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
    );
};

/** Named region `users_with_rights_item_list` of RosRoomSettingsLayout - configured through the parent's `usersWithRightsItemList` prop. */
export interface RosRoomSettingsLayoutUsersWithRightsItemListProps {
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutUsersWithRightsItemList = ({ layout }: RosRoomSettingsLayoutUsersWithRightsItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 39, ...layout }}
        >
            <Region
                name="users_with_rights_item_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `friends_item_list` of RosRoomSettingsLayout - configured through the parent's `friendsItemList` prop. */
export interface RosRoomSettingsLayoutFriendsItemListProps {
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutFriendsItemList = ({ layout }: RosRoomSettingsLayoutFriendsItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 4, ...layout }}
        >
            <Region
                name="friends_item_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `normal_rights_container` of RosRoomSettingsLayout - configured through the parent's `normalRightsContainer` prop. */
export interface RosRoomSettingsLayoutNormalRightsContainerProps {
    captionFriendsTxt?: string;
    captionSearchTxt?: string;
    captionUsersWithRightsTxt?: string;
    friendsItemList?: RosRoomSettingsLayoutFriendsItemListProps;
    layout?: BoxLayout;
    onRemoveAllFlatCtrls?: () => void;
    usersWithRightsItemList?: RosRoomSettingsLayoutUsersWithRightsItemListProps;
}

export const RosRoomSettingsLayoutNormalRightsContainer = ({ captionFriendsTxt, captionSearchTxt, captionUsersWithRightsTxt, friendsItemList, layout, onRemoveAllFlatCtrls, usersWithRightsItemList }: RosRoomSettingsLayoutNormalRightsContainerProps) => {
    const t = useTranslation();
    const [ filterUsersInputValue, setFilterUsersInputValue ] = useState('');

    return (
        <Region
            name="normal_rights_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="0"
                name="search_border"
                tintColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 322, top: 1, height: 42 }}
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
                    layout={{ position: 'absolute', left: 97, right: 9, top: 8, height: 23 }}
                />
            </Border>
            <Region
                name="users_with_rights_txt"
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
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 150, top: 74, bottom: 4 }}
            >
                <RosRoomSettingsLayoutUsersWithRightsItemList {...usersWithRightsItemList} />
                {/* <scrollbar_vertical> for users_with_rights_item_list - rendered by that list's ScrollArea */}
                <ButtonThick
                    variant="3"
                    name="remove_all_flat_ctrls"
                    onPointerTap={onRemoveAllFlatCtrls}
                    layout={{ position: 'absolute', left: 4, width: 142, bottom: 4, height: 29, minWidth: 142, maxWidth: 142 }}
                >
                    {t('navigator.flatctrls.clear')}
                </ButtonThick>
            </Border>
            <Border
                variant="0"
                name="friends_cont"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 173, width: 150, top: 74, bottom: 4 }}
            >
                <RosRoomSettingsLayoutFriendsItemList {...friendsItemList} />
                {/* <scrollbar_vertical> for friends_item_list - rendered by that list's ScrollArea */}
            </Border>
        </Region>
    );
};

/** Named region `tab_container_3` of RosRoomSettingsLayout - configured through the parent's `tabContainer3` prop. */
export interface RosRoomSettingsLayoutTabContainer3Props {
    guildRightsContainer?: RosRoomSettingsLayoutGuildRightsContainerProps;
    layout?: BoxLayout;
    normalRightsContainer?: RosRoomSettingsLayoutNormalRightsContainerProps;
    visibleTabContainer3?: boolean;
}

export const RosRoomSettingsLayoutTabContainer3 = ({ guildRightsContainer, layout, normalRightsContainer, visibleTabContainer3 }: RosRoomSettingsLayoutTabContainer3Props) => {
    return (
        <Region
            name="tab_container_3"
            visible={visibleTabContainer3 ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367, ...layout }}
        >
            <RosRoomSettingsLayoutGuildRightsContainer {...guildRightsContainer} />
            <RosRoomSettingsLayoutNormalRightsContainer {...normalRightsContainer} />
        </Region>
    );
};

/** Named region `tab_container_4` of RosRoomSettingsLayout - configured through the parent's `tabContainer4` prop. */
export interface RosRoomSettingsLayoutTabContainer4Props {
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

export const RosRoomSettingsLayoutTabContainer4 = ({ captionChatSettingsText, captionDoNotLeaveOnDoorTileText, captionHideWallsText, captionIdleAutokickText, captionIdleAutokickTimeoutLabel, captionIdleSleepText, captionIdleSleepTimeoutLabel, captionRoomBehaviorText, captionVipSettingsText, captionVipTabCaption, captionVipTabInfo, layout, onChatFloodSensitivity, onDoNotLeaveOnDoorTileCheckbox, onFloorThickness, onHideWallsCheckbox, onIdleAutokickCheckbox, onIdleSleepCheckbox, onWallThickness }: RosRoomSettingsLayoutTabContainer4Props) => {
    const t = useTranslation();
    const [ idleSleepTimeoutValue, setIdleSleepTimeoutValue ] = useState('');
    const [ idleAutokickTimeoutValue, setIdleAutokickTimeoutValue ] = useState('');

    return (
        <Region
            name="tab_container_4"
            layout={{ position: 'absolute', left: 6, width: 322, top: 0, height: 395, ...layout }}
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
                onPointerTap={onWallThickness}
                layout={{ position: 'absolute', left: 0, width: 276, top: 125, height: 24 }}
            />
            <Dropmenu
                variant="2"
                name="floor_thickness"
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
                onPointerTap={onChatFloodSensitivity}
                layout={{ position: 'absolute', left: 0, width: 276, top: 358, height: 24 }}
            />
        </Region>
    );
};

/** Named region `moderation_mute_selector` of RosRoomSettingsLayout - configured through the parent's `moderationMuteSelector` prop. */
export interface RosRoomSettingsLayoutModerationMuteSelectorProps {
    captionModerationMuteNoneLabel?: string;
    captionModerationMuteRightsLabel?: string;
    layout?: BoxLayout;
    onModerationMuteNone?: () => void;
    onModerationMuteRights?: () => void;
    visibleModerationMuteSelector?: boolean;
}

export const RosRoomSettingsLayoutModerationMuteSelector = ({ captionModerationMuteNoneLabel, captionModerationMuteRightsLabel, layout, onModerationMuteNone, onModerationMuteRights, visibleModerationMuteSelector }: RosRoomSettingsLayoutModerationMuteSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moderation_mute_selector"
            visible={visibleModerationMuteSelector ?? false}
            layout={{ position: 'absolute', left: 10, width: 291, top: 61, height: 31, ...layout }}
        >
            <RadioButton
                variant="0"
                name="moderation_mute_none"
                onPointerTap={onModerationMuteNone}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 20 }}
            />
            <RadioButton
                variant="0"
                name="moderation_mute_rights"
                onPointerTap={onModerationMuteRights}
                layout={{ position: 'absolute', left: 110, width: 147, top: 0, height: 20 }}
            />
            <Region
                name="moderation_mute_none_label"
                layout={{ position: 'absolute', left: 15, width: 93, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationMuteNoneLabel ?? t('navigator.roomsettings.moderation.none')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="moderation_mute_rights_label"
                layout={{ position: 'absolute', left: 125, width: 162, top: -2, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationMuteRightsLabel ?? t('navigator.roomsettings.moderation.rights')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `moderation_kick_selector` of RosRoomSettingsLayout - configured through the parent's `moderationKickSelector` prop. */
export interface RosRoomSettingsLayoutModerationKickSelectorProps {
    captionModerationKickAllLabel?: string;
    captionModerationKickNoneLabel?: string;
    captionModerationKickRightsHeader?: string;
    layout?: BoxLayout;
    onModerationKickAll?: () => void;
    onModerationKickNone?: () => void;
    onModerationKickRights?: () => void;
    visibleModerationKickSelector?: boolean;
}

export const RosRoomSettingsLayoutModerationKickSelector = ({ captionModerationKickAllLabel, captionModerationKickNoneLabel, captionModerationKickRightsHeader, layout, onModerationKickAll, onModerationKickNone, onModerationKickRights, visibleModerationKickSelector }: RosRoomSettingsLayoutModerationKickSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moderation_kick_selector"
            visible={visibleModerationKickSelector ?? false}
            layout={{ position: 'absolute', left: 10, width: 325, top: 112, height: 26, ...layout }}
        >
            <Region
                name="moderation_kick_all_label"
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
                onPointerTap={onModerationKickAll}
                layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 20 }}
            />
            <Region
                name="moderation_kick_rights_header"
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
                onPointerTap={onModerationKickNone}
                layout={{ position: 'absolute', left: 240, width: 104, top: 0, height: 19 }}
            />
            <Region
                name="moderation_kick_none_label"
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
                onPointerTap={onModerationKickRights}
                layout={{ position: 'absolute', left: 110, width: 90, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `moderation_ban_selector` of RosRoomSettingsLayout - configured through the parent's `moderationBanSelector` prop. */
export interface RosRoomSettingsLayoutModerationBanSelectorProps {
    captionModerationBanNoneLabel?: string;
    captionModerationBanRights?: string;
    layout?: BoxLayout;
    onModerationBanNone?: () => void;
    onModerationBanRights?: () => void;
    visibleModerationBanSelector?: boolean;
}

export const RosRoomSettingsLayoutModerationBanSelector = ({ captionModerationBanNoneLabel, captionModerationBanRights, layout, onModerationBanNone, onModerationBanRights, visibleModerationBanSelector }: RosRoomSettingsLayoutModerationBanSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moderation_ban_selector"
            visible={visibleModerationBanSelector ?? false}
            layout={{ position: 'absolute', left: 10, width: 293, top: 161, height: 23, ...layout }}
        >
            <Region
                name="moderation_ban_none_label"
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
                onPointerTap={onModerationBanNone}
                layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 20 }}
            />
            <RadioButton
                variant="0"
                name="moderation_ban_rights"
                onPointerTap={onModerationBanRights}
                layout={{ position: 'absolute', left: 110, width: 177, top: 0, height: 20 }}
            />
            <Region
                name="moderation_ban_rights"
                layout={{ position: 'absolute', left: 125, width: 197, top: -2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationBanRights ?? t('navigator.roomsettings.moderation.rights')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `moderation_banned_users` of RosRoomSettingsLayout - configured through the parent's `moderationBannedUsers` prop. */
export interface RosRoomSettingsLayoutModerationBannedUsersProps {
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutModerationBannedUsers = ({ layout }: RosRoomSettingsLayoutModerationBannedUsersProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 129, top: 4, height: 146, ...layout }}
        >
            <Region
                name="moderation_banned_users"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `tab_container_5` of RosRoomSettingsLayout - configured through the parent's `tabContainer5` prop. */
export interface RosRoomSettingsLayoutTabContainer5Props {
    captionModerationBanHeader?: string;
    captionModerationBannedUsersLabel?: string;
    captionModerationHeader?: string;
    captionModerationKickHeader?: string;
    captionModerationMuteHeader?: string;
    layout?: BoxLayout;
    moderationBannedUsers?: RosRoomSettingsLayoutModerationBannedUsersProps;
    moderationBanSelector?: RosRoomSettingsLayoutModerationBanSelectorProps;
    moderationKickSelector?: RosRoomSettingsLayoutModerationKickSelectorProps;
    moderationMuteSelector?: RosRoomSettingsLayoutModerationMuteSelectorProps;
    onModerationBanDropdown?: () => void;
    onModerationKickDropdown?: () => void;
    onModerationMuteDropdown?: () => void;
    onModerationUnbanBtn?: () => void;
    visibleTabContainer5?: boolean;
}

export const RosRoomSettingsLayoutTabContainer5 = ({ captionModerationBanHeader, captionModerationBannedUsersLabel, captionModerationHeader, captionModerationKickHeader, captionModerationMuteHeader, layout, moderationBannedUsers, moderationBanSelector, moderationKickSelector, moderationMuteSelector, onModerationBanDropdown, onModerationKickDropdown, onModerationMuteDropdown, onModerationUnbanBtn, visibleTabContainer5 }: RosRoomSettingsLayoutTabContainer5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_container_5"
            visible={visibleTabContainer5 ?? false}
            layout={{ position: 'absolute', left: 0, right: -4, top: 0, height: 367, ...layout }}
        >
            <Region
                name="moderation_header"
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
                layout={{ position: 'absolute', left: 7, width: 276, top: 42, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationMuteHeader ?? t('navigator.roomsettings.moderation.mute.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <RosRoomSettingsLayoutModerationMuteSelector {...moderationMuteSelector} />
            <Region
                name="moderation_kick_header"
                layout={{ position: 'absolute', left: 7, width: 273, top: 92, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationKickHeader ?? t('navigator.roomsettings.moderation.kick.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <RosRoomSettingsLayoutModerationKickSelector {...moderationKickSelector} />
            <Region
                name="moderation_ban_header"
                layout={{ position: 'absolute', left: 7, width: 292, top: 142, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionModerationBanHeader ?? t('navigator.roomsettings.moderation.ban.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <RosRoomSettingsLayoutModerationBanSelector {...moderationBanSelector} />
            <Border
                variant="0"
                name="moderation_banned_users_cont"
                layout={{ position: 'absolute', left: 8, width: 172, top: 200, height: 156 }}
            >
                <RosRoomSettingsLayoutModerationBannedUsers {...moderationBannedUsers} />
                {/* <scrollbar_vertical> for moderation_banned_users - rendered by that list's ScrollArea */}
            </Border>
            <Region
                name="moderation_banned_users_label"
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
                onPointerTap={onModerationUnbanBtn}
                layout={{ position: 'absolute', left: 190, width: 257, top: 261, height: 32 }}
            >
                {t('navigator.roomsettings.moderation.unban')}
            </Button>
            <Dropmenu
                variant="2"
                name="moderation_mute_dropdown"
                onPointerTap={onModerationMuteDropdown}
                layout={{ position: 'absolute', left: 10, width: 276, top: 61, height: 24 }}
            />
            <Dropmenu
                variant="2"
                name="moderation_kick_dropdown"
                onPointerTap={onModerationKickDropdown}
                layout={{ position: 'absolute', left: 10, width: 276, top: 112, height: 24 }}
            />
            <Dropmenu
                variant="2"
                name="moderation_ban_dropdown"
                onPointerTap={onModerationBanDropdown}
                layout={{ position: 'absolute', left: 10, width: 276, top: 161, height: 24 }}
            />
        </Region>
    );
};

/** Named region `content_container` of RosRoomSettingsLayout - configured through the parent's `contentContainer` prop. */
export interface RosRoomSettingsLayoutContentContainerProps {
    layout?: BoxLayout;
    onContentContainer?: () => void;
    tabContainer1?: RosRoomSettingsLayoutTabContainer1Props;
    tabContainer2?: RosRoomSettingsLayoutTabContainer2Props;
    tabContainer3?: RosRoomSettingsLayoutTabContainer3Props;
    tabContainer4?: RosRoomSettingsLayoutTabContainer4Props;
    tabContainer5?: RosRoomSettingsLayoutTabContainer5Props;
}

export const RosRoomSettingsLayoutContentContainer = ({ layout, onContentContainer, tabContainer1, tabContainer2, tabContainer3, tabContainer4, tabContainer5 }: RosRoomSettingsLayoutContentContainerProps) => {
    return (
        <Region
            name="content_container"
            onPointerTap={onContentContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 327, top: 42, height: 369, ...layout }}
        >
            <RosRoomSettingsLayoutTabContainer1 {...tabContainer1} />
            <RosRoomSettingsLayoutTabContainer2 {...tabContainer2} />
            <RosRoomSettingsLayoutTabContainer3 {...tabContainer3} />
            <RosRoomSettingsLayoutTabContainer4 {...tabContainer4} />
            <RosRoomSettingsLayoutTabContainer5 {...tabContainer5} />
        </Region>
    );
};
