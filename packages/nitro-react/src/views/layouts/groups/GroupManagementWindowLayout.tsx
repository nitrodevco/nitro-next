import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1201_group_management_window_xml` (layout "Achievements", 392x497) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupManagementWindowLayoutProps {
    footerCont?: GroupManagementWindowLayoutFooterContProps;
    headerCont?: GroupManagementWindowLayoutHeaderContProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onResetBadge?: () => void;
    onResetColors?: () => void;
    stepCont1?: GroupManagementWindowLayoutStepCont1Props;
    stepCont3?: GroupManagementWindowLayoutStepCont3Props;
    stepCont4?: GroupManagementWindowLayoutStepCont4Props;
    stepCont5?: GroupManagementWindowLayoutStepCont5Props;
    visibleFooterCont?: boolean;
    visibleResetBadge?: boolean;
    visibleResetColors?: boolean;
    visibleStepCont2?: boolean;
    visibleStepCont3?: boolean;
    visibleStepCont4?: boolean;
    visibleStepCont5?: boolean;
}

export const GroupManagementWindowLayout = ({ footerCont, headerCont, layout, onClose, onResetBadge, onResetColors, stepCont1, stepCont3, stepCont4, stepCont5, visibleFooterCont, visibleResetBadge, visibleResetColors, visibleStepCont2, visibleStepCont3, visibleStepCont4, visibleStepCont5 }: GroupManagementWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_main_window"
            name="groups_main_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 392, height: 497, ...layout }}
        >
            <GroupManagementWindowLayoutHeaderCont {...headerCont} />
            <GroupManagementWindowLayoutStepCont1 {...stepCont1} />
            {(visibleStepCont2 ?? false) && (
                <Region
                    name="step_cont_2"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 110, height: 305 }}
                />
            )}
            {(visibleResetBadge ?? false) && (
                <ButtonThick
                    variant="3"
                    name="reset_badge"
                    onPointerTap={onResetBadge}
                    layout={{ position: 'absolute', left: 17, width: 94, top: 245, height: 29, minWidth: 94, maxWidth: 94 }}
                >
                    {t('group.edit.reset.badge')}
                </ButtonThick>
            )}
            {(visibleStepCont3 ?? false) && (
                <GroupManagementWindowLayoutStepCont3 {...stepCont3} />
            )}
            {(visibleResetColors ?? false) && (
                <ButtonThick
                    variant="3"
                    name="reset_colors"
                    onPointerTap={onResetColors}
                    layout={{ position: 'absolute', left: 15, width: 90, top: 195, height: 29, minWidth: 90, maxWidth: 90 }}
                >
                    {t('group.edit.reset.color')}
                </ButtonThick>
            )}
            {(visibleStepCont4 ?? false) && (
                <GroupManagementWindowLayoutStepCont4 {...stepCont4} />
            )}
            {(visibleFooterCont ?? false) && (
                <GroupManagementWindowLayoutFooterCont {...footerCont} />
            )}
            {(visibleStepCont5 ?? false) && (
                <GroupManagementWindowLayoutStepCont5 {...stepCont5} />
            )}
        </Frame>
    );
};

/** Named region `steps_header_cont` of GroupManagementWindowLayout - configured through the parent's `stepsHeaderCont` prop. */
export interface GroupManagementWindowLayoutStepsHeaderContProps {
    captionStepTitle1?: string;
    captionStepTitle2?: string;
    captionStepTitle3?: string;
    captionStepTitle4?: string;
    layout?: BoxLayout;
    srcGcreate10?: string;
    srcGcreate11?: string;
    srcGcreate20?: string;
    srcGcreate21?: string;
    srcGcreate30?: string;
    srcGcreate31?: string;
    srcGcreate40?: string;
    srcGcreate41?: string;
    srcGcreateIconCredit?: string;
    visibleStepsHeaderCont?: boolean;
}

export const GroupManagementWindowLayoutStepsHeaderCont = ({ captionStepTitle1, captionStepTitle2, captionStepTitle3, captionStepTitle4, layout, srcGcreate10, srcGcreate11, srcGcreate20, srcGcreate21, srcGcreate30, srcGcreate31, srcGcreate40, srcGcreate41, srcGcreateIconCredit, visibleStepsHeaderCont }: GroupManagementWindowLayoutStepsHeaderContProps) => {
    const t = useTranslation();

    return (
        (visibleStepsHeaderCont ?? false) && (
            <Region
                name="steps_header_cont"
                layout={{ position: 'absolute', left: 16, right: 15, top: 5, height: 33, ...layout }}
            >
                <ThemeImage
                    name="gcreate_1_0"
                    src={srcGcreate10 ?? '${image.library.url}guilds/gcreate_1_0.png'}
                    layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_1_1"
                    src={srcGcreate11 ?? '${image.library.url}guilds/gcreate_1_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_2_0"
                    src={srcGcreate20 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                    layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_2_1"
                    src={srcGcreate21 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                    layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_3_0"
                    src={srcGcreate30 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                    layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_3_1"
                    src={srcGcreate31 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                    layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_4_0"
                    src={srcGcreate40 ?? '${image.library.url}guilds/gcreate_4_0.png'}
                    layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_4_1"
                    src={srcGcreate41 ?? '${image.library.url}guilds/gcreate_4_1.png'}
                    layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                />
                <ThemeImage
                    name="gcreate_icon_credit"
                    src={srcGcreateIconCredit ?? '${image.library.url}guilds/gcreate_icon_credit.png'}
                    layout={{ position: 'absolute', left: 335, width: 21, top: 0, height: 20 }}
                />
                <Region
                    name="step_title_1"
                    layout={{ position: 'absolute', left: -38, right: 242, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStepTitle1 ?? t('group.create.steplabel.1')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="step_title_2"
                    layout={{ position: 'absolute', left: 40, right: 164, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStepTitle2 ?? t('group.create.steplabel.2')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="step_title_3"
                    layout={{ position: 'absolute', left: 115, right: 89, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStepTitle3 ?? t('group.create.steplabel.3')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="step_title_4"
                    layout={{ position: 'absolute', left: 210, right: -6, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStepTitle4 ?? t('group.create.steplabel.4')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        )
    );
};

/** Named region `header_cont` of GroupManagementWindowLayout - configured through the parent's `headerCont` prop. */
export interface GroupManagementWindowLayoutHeaderContProps {
    captionHeaderCaptionTxt?: string;
    captionHeaderDescTxt?: string;
    layout?: BoxLayout;
    onEditTab1?: () => void;
    onEditTab2?: () => void;
    onEditTab3?: () => void;
    onEditTab5?: () => void;
    srcHeaderPicBitmapStep1?: string;
    srcHeaderPicBitmapStep2?: string;
    srcHeaderPicBitmapStep3?: string;
    srcHeaderPicBitmapStep4?: string;
    srcHeaderPicBitmapStep5?: string;
    srcHeaderPicBitmapStep6?: string;
    stepsHeaderCont?: GroupManagementWindowLayoutStepsHeaderContProps;
    visibleStepsHeaderCont?: boolean;
}

export const GroupManagementWindowLayoutHeaderCont = ({ captionHeaderCaptionTxt, captionHeaderDescTxt, layout, onEditTab1, onEditTab2, onEditTab3, onEditTab5, srcHeaderPicBitmapStep1, srcHeaderPicBitmapStep2, srcHeaderPicBitmapStep3, srcHeaderPicBitmapStep4, srcHeaderPicBitmapStep5, srcHeaderPicBitmapStep6, stepsHeaderCont, visibleStepsHeaderCont }: GroupManagementWindowLayoutHeaderContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_cont"
            layout={{ position: 'absolute', left: 0, right: 1, top: 0, height: 110, ...layout }}
        >
            <Region
                backgroundColor="#b3b099"
                layout={{ position: 'absolute', left: 1, right: 0, top: 0, bottom: 0 }}
            />
            <TabContext
                variant="0"
                name="edit_guild_tab_context"
                layout={{ position: 'absolute', left: -6, right: -5, top: 89, bottom: 0 }}
            >
                <TabButton
                    variant="0"
                    name="edit_tab_1"
                    onPointerTap={onEditTab1}
                    layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.1')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_2"
                    onPointerTap={onEditTab2}
                    layout={{ position: 'absolute', left: 97, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.2')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_3"
                    onPointerTap={onEditTab3}
                    layout={{ position: 'absolute', left: 198, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.3')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="edit_tab_5"
                    onPointerTap={onEditTab5}
                    layout={{ position: 'absolute', left: 299, width: 101, top: 0, height: 22 }}
                >
                    {t('group.edit.tab.5')}
                </TabButton>
            </TabContext>
            {(visibleStepsHeaderCont ?? false) && (
                <GroupManagementWindowLayoutStepsHeaderCont {...stepsHeaderCont} />
            )}
            <ThemeImage
                name="header_pic_bitmap_step_1"
                src={srcHeaderPicBitmapStep1 ?? '${image.library.url}guilds/group_UI_identity.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_2"
                src={srcHeaderPicBitmapStep2 ?? '${image.library.url}guilds/group_UI_badge.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_3"
                src={srcHeaderPicBitmapStep3 ?? '${image.library.url}guilds/group_UI_colors.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_4"
                src={srcHeaderPicBitmapStep4 ?? '${image.library.url}guilds/group_UI_ready.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_5"
                src={srcHeaderPicBitmapStep5 ?? '${image.library.url}guilds/group_UI_ready.png'}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <ThemeImage
                name="header_pic_bitmap_step_6"
                src={srcHeaderPicBitmapStep6}
                layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
            />
            <Region
                name="header_caption_txt"
                layout={{ position: 'absolute', left: 126, right: 2, top: 43, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderCaptionTxt ?? 'Caption PH'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 263 }}
                />
            </Region>
            <Region
                name="header_desc_txt"
                layout={{ position: 'absolute', left: 126, right: 33, top: 69, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderDescTxt ?? 'Desc PH'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 232 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `step_cont_1` of GroupManagementWindowLayout - configured through the parent's `stepCont1` prop. */
export interface GroupManagementWindowLayoutStepCont1Props {
    captionBaseLabel?: string;
    captionBaseWarning?: string;
    captionCreateRoomLinkTxt?: string;
    captionDescLabel?: string;
    captionNameLabel?: string;
    captionStep1MembersTxt?: string;
    layout?: BoxLayout;
    onBaseDropmenu?: () => void;
    onCreateRoomLinkRegion?: () => void;
    onStep1MembersRegion?: () => void;
}

export const GroupManagementWindowLayoutStepCont1 = ({ captionBaseLabel, captionBaseWarning, captionCreateRoomLinkTxt, captionDescLabel, captionNameLabel, captionStep1MembersTxt, layout, onBaseDropmenu, onCreateRoomLinkRegion, onStep1MembersRegion }: GroupManagementWindowLayoutStepCont1Props) => {
    const t = useTranslation();
    const [ nameTxtValue, setNameTxtValue ] = useState('');
    const [ descTxtValue, setDescTxtValue ] = useState('');

    return (
        <Region
            name="step_cont_1"
            layout={{ position: 'absolute', left: 0, right: 19, top: 128, height: 310, ...layout }}
        >
            <Border
                variant="0"
                name="step_1_badge"
                layout={{ position: 'absolute', left: 17, width: 94, top: 11, height: 94 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_logo"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
            </Border>
            <Region
                name="step_1_members_region"
                onPointerTap={onStep1MembersRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 17, width: 94, top: 110, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="step_1_members_txt"
                    layout={{ position: 'absolute', width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStep1MembersTxt ?? 'Members PH'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Region>
            <Region
                name="name_label"
                layout={{ position: 'absolute', left: 126, right: 140, top: -8, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionNameLabel ?? t('group.edit.name')} />
            </Region>
            <TextInput
                value={nameTxtValue}
                onChange={setNameTxtValue}
                maxLength={29}
                layout={{ position: 'absolute', left: 126, right: 0, top: 14, height: 26 }}
            />
            <Region
                name="desc_label"
                layout={{ position: 'absolute', left: 126, right: 147, top: 52, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionDescLabel ?? t('group.edit.desc')} />
            </Region>
            <TextInput
                value={descTxtValue}
                onChange={setDescTxtValue}
                maxLength={254}
                layout={{ position: 'absolute', left: 126, right: 0, top: 74, height: 80 }}
            />
            <Region
                name="base_label"
                layout={{ position: 'absolute', left: 126, right: 146, top: 166, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBaseLabel ?? t('group.edit.base')} />
            </Region>
            <Dropmenu
                variant="0"
                name="base_dropmenu"
                onPointerTap={onBaseDropmenu}
                layout={{ position: 'absolute', left: 126, right: 0, top: 188, height: 26 }}
            />
            <Region
                name="base_warning"
                layout={{ position: 'absolute', left: 126, right: 0, top: 214, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBaseWarning ?? t('group.edit.base.warning')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                />
            </Region>
            <Region
                name="create_room_link_region"
                layout={{ position: 'absolute', left: 126, width: 247, top: 252, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                onPointerTap={onCreateRoomLinkRegion}
                cursor="pointer"
            >
                <ThemeText
                    text={captionCreateRoomLinkTxt ?? t('group.createroom')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `step_cont_3` of GroupManagementWindowLayout - configured through the parent's `stepCont3` prop. */
export interface GroupManagementWindowLayoutStepCont3Props {
    captionLabelGuildColor?: string;
    captionLabelPrimary?: string;
    captionLabelSecondary?: string;
    layout?: BoxLayout;
    srcGuildColorPrimaryColorBtm?: string;
    srcGuildColorPrimaryColorTop?: string;
    srcGuildColorSecondaryColorBtm?: string;
    srcGuildColorSecondaryColorTop?: string;
    visibleStepCont3?: boolean;
}

export const GroupManagementWindowLayoutStepCont3 = ({ captionLabelGuildColor, captionLabelPrimary, captionLabelSecondary, layout, srcGuildColorPrimaryColorBtm, srcGuildColorPrimaryColorTop, srcGuildColorSecondaryColorBtm, srcGuildColorSecondaryColorTop, visibleStepCont3 }: GroupManagementWindowLayoutStepCont3Props) => {
    const t = useTranslation();

    return (
        (visibleStepCont3 ?? false) && (
            <Region
                name="step_cont_3"
                layout={{ position: 'absolute', left: 0, right: 0, top: 110, height: 305, ...layout }}
            >
                <Region
                    name="label_guild_color"
                    layout={{ position: 'absolute', left: 13, width: 92, bottom: 280, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabelGuildColor ?? t('group.edit.color.guild.color')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="5"
                    layout={{ position: 'absolute', left: 13, width: 92, top: 29, height: 46 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                    >
                        <ThemeImage
                            name="guild_color_primary_color_btm"
                            src={srcGuildColorPrimaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                            layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="guild_color_primary_color_top"
                            src={srcGuildColorPrimaryColorTop ?? layoutImage('group_guild_color_top.png')}
                            layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="guild_color_secondary_color_btm"
                            src={srcGuildColorSecondaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                            layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="guild_color_secondary_color_top"
                            src={srcGuildColorSecondaryColorTop ?? layoutImage('group_guild_color_top.png')}
                            layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                        />
                    </Border>
                </Border>
                <Region
                    name="label_primary"
                    layout={{ position: 'absolute', left: 128, width: 142, bottom: 280, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabelPrimary ?? t('group.edit.color.primary.color')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="label_secondary"
                    layout={{ position: 'absolute', left: 280, width: 100, bottom: 280, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabelSecondary ?? t('group.edit.color.secondary.color')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="3"
                    name="border"
                    tintColor="#bebba5"
                    layout={{ position: 'absolute', left: 128, width: 142, top: 29, height: 277 }}
                >
                    <Region
                        name="guild_primary_color_selector"
                        layout={{ position: 'absolute', left: 3, width: 138, top: 3, height: 273, flexDirection: 'row', flexWrap: 'wrap' }}
                    />
                </Border>
                <Border
                    variant="3"
                    name="border"
                    tintColor="#bebba5"
                    layout={{ position: 'absolute', left: 280, width: 96, top: 29, height: 277 }}
                >
                    <Region
                        name="guild_secondary_color_selector"
                        layout={{ position: 'absolute', left: 3, width: 94, top: 3, height: 273, flexDirection: 'row', flexWrap: 'wrap' }}
                    />
                </Border>
            </Region>
        )
    );
};

/** Named region `step_cont_4` of GroupManagementWindowLayout - configured through the parent's `stepCont4` prop. */
export interface GroupManagementWindowLayoutStepCont4Props {
    captionConfirmationCaption?: string;
    captionConfirmationDesc?: string;
    captionGetVipTxt?: string;
    captionGuildBadgeTxt?: string;
    captionGuildColorsTxt?: string;
    captionVipRequiredTxt?: string;
    layout?: BoxLayout;
    onVipRequiredRegion?: () => void;
    srcBadgePreviewImage?: string;
    srcBadgePreviewPrimaryColorBtm?: string;
    srcBadgePreviewPrimaryColorTop?: string;
    srcBadgePreviewSecondaryColorBtm?: string;
    srcBadgePreviewSecondaryColorTop?: string;
    visibleStepCont4?: boolean;
}

export const GroupManagementWindowLayoutStepCont4 = ({ captionConfirmationCaption, captionConfirmationDesc, captionGetVipTxt, captionGuildBadgeTxt, captionGuildColorsTxt, captionVipRequiredTxt, layout, onVipRequiredRegion, srcBadgePreviewImage, srcBadgePreviewPrimaryColorBtm, srcBadgePreviewPrimaryColorTop, srcBadgePreviewSecondaryColorBtm, srcBadgePreviewSecondaryColorTop, visibleStepCont4 }: GroupManagementWindowLayoutStepCont4Props) => {
    const t = useTranslation();

    return (
        (visibleStepCont4 ?? false) && (
            <Region
                name="step_cont_4"
                layout={{ position: 'absolute', left: 0, right: 3, top: 111, height: 360, ...layout }}
            >
                <Region
                    name="confirmation_caption"
                    layout={{ position: 'absolute', left: 126, width: 256, top: 8, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionConfirmationCaption ?? 'Group Name Here DIPPA DAPPA DII'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                    />
                </Region>
                <Region
                    name="confirmation_desc"
                    layout={{ position: 'absolute', left: 126, width: 260, top: 46, height: 215, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionConfirmationDesc ?? t('group.create.confirm.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    />
                </Region>
                <Border
                    variant="0"
                    name="badge_border"
                    layout={{ position: 'absolute', left: 15, width: 92, top: 50, height: 92 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 84 }}
                    />
                    <ThemeImage
                        name="badge_preview_image"
                        src={srcBadgePreviewImage}
                        layout={{ position: 'absolute', left: 26, width: 39, top: 26, height: 39 }}
                    />
                </Border>
                <Region
                    name="guild_badge_txt"
                    layout={{ position: 'absolute', left: 15, width: 92, top: 33, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildBadgeTxt ?? t('group.create.confirm.guildbadge')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="guild_colors_txt"
                    layout={{ position: 'absolute', left: 15, width: 92, top: 155, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildColorsTxt ?? t('group.create.confirm.guildcolors')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="5"
                    layout={{ position: 'absolute', left: 15, width: 92, top: 172, height: 46 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                    >
                        <ThemeImage
                            name="badge_preview_primary_color_btm"
                            src={srcBadgePreviewPrimaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                            layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="badge_preview_primary_color_top"
                            src={srcBadgePreviewPrimaryColorTop ?? layoutImage('group_guild_color_top.png')}
                            layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="badge_preview_secondary_color_btm"
                            src={srcBadgePreviewSecondaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                            layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                        />
                        <ThemeImage
                            name="badge_preview_secondary_color_top"
                            src={srcBadgePreviewSecondaryColorTop ?? layoutImage('group_guild_color_top.png')}
                            layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                        />
                    </Border>
                </Border>
                <Border
                    variant="0"
                    name="vip_required_border"
                    tintColor="#cc0000"
                    layout={{ position: 'absolute', left: 126, width: 248, top: 253, height: 39 }}
                >
                    <Region
                        name="vip_required_region"
                        onPointerTap={onVipRequiredRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 248, top: 0, height: 39 }}
                    />
                    <Icon
                        variant="14"
                        name="vip_icon"
                        layout={{ position: 'absolute', left: 14, width: 16, top: 11, height: 17 }}
                    />
                    <Region
                        name="vip_required_txt"
                        layout={{ position: 'absolute', left: 38, width: 192, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionVipRequiredTxt ?? t('group.create.confirm.viprequired')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="get_vip_txt"
                        layout={{ position: 'absolute', left: 38, width: 160, top: 20, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGetVipTxt ?? t('group.create.confirm.getvip')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Border>
            </Region>
        )
    );
};

/** Named region `footer_cont` of GroupManagementWindowLayout - configured through the parent's `footerCont` prop. */
export interface GroupManagementWindowLayoutFooterContProps {
    captionBuyTxt?: string;
    captionCancelLink?: string;
    captionPreviousStepLink?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCancelLinkRegion?: () => void;
    onNextStepButton?: () => void;
    onPreviousStepLinkRegion?: () => void;
    srcBuyCreditIcon?: string;
    visibleFooterCont?: boolean;
}

export const GroupManagementWindowLayoutFooterCont = ({ captionBuyTxt, captionCancelLink, captionPreviousStepLink, layout, onBuyButton, onCancelLinkRegion, onNextStepButton, onPreviousStepLinkRegion, srcBuyCreditIcon, visibleFooterCont }: GroupManagementWindowLayoutFooterContProps) => {
    const t = useTranslation();

    return (
        (visibleFooterCont ?? false) && (
            <Region
                name="footer_cont"
                layout={{ position: 'absolute', left: 0, right: 2, bottom: 45, height: 42, ...layout }}
            >
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                >
                    <Region
                        name="cancel_link"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionCancelLink ?? t('cancel')} />
                    </Region>
                </Region>
                <Region
                    name="previous_step_link_region"
                    onPointerTap={onPreviousStepLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                >
                    <Region
                        name="previous_step_link"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionPreviousStepLink ?? t('group.create.previousstep')} />
                    </Region>
                </Region>
                <Border
                    variant="0"
                    name="buy_border"
                    tintColor="#ffc300"
                    layout={{ position: 'absolute', left: 126, width: 248, top: 0, height: 39 }}
                >
                    <ThemeImage
                        name="buy_credit_icon"
                        src={srcBuyCreditIcon ?? '${image.library.url}guilds/gcreate_icon_credit.png'}
                        layout={{ position: 'absolute', left: 9, width: 21, top: 11, height: 20 }}
                    />
                    <Region
                        name="buy_txt"
                        layout={{ position: 'absolute', left: 37, width: 131, top: 3, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBuyTxt ?? t('group.create.confirm.buyinfo')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 131 }}
                        />
                    </Region>
                    <ButtonThick
                        variant="3"
                        name="buy_button"
                        onPointerTap={onBuyButton}
                        layout={{ position: 'absolute', right: 4, width: 72, top: 5, height: 29, minWidth: 72, maxWidth: 72 }}
                    >
                        {t('group.create.confirm.buy')}
                    </ButtonThick>
                </Border>
                <ButtonThick
                    variant="3"
                    name="next_step_button"
                    onPointerTap={onNextStepButton}
                    layout={{ position: 'absolute', left: 256, width: 120, top: 13, height: 29, minWidth: 120, maxWidth: 120 }}
                >
                    {t('group.create.nextstep')}
                </ButtonThick>
            </Region>
        )
    );
};

/** Named region `group_type_selector` of GroupManagementWindowLayout - configured through the parent's `groupTypeSelector` prop. */
export interface GroupManagementWindowLayoutGroupTypeSelectorProps {
    layout?: BoxLayout;
    onGrouptypeRegion0?: () => void;
    onGrouptypeRegion1?: () => void;
    onGrouptypeRegion2?: () => void;
    onRbTypeExclusive?: () => void;
    onRbTypePrivate?: () => void;
    onRbTypeRegular?: () => void;
    srcGrouptypeIcon0?: string;
    srcGrouptypeIcon1?: string;
    srcGrouptypeIcon2?: string;
}

export const GroupManagementWindowLayoutGroupTypeSelector = ({ layout, onGrouptypeRegion0, onGrouptypeRegion1, onGrouptypeRegion2, onRbTypeExclusive, onRbTypePrivate, onRbTypeRegular, srcGrouptypeIcon0, srcGrouptypeIcon1, srcGrouptypeIcon2 }: GroupManagementWindowLayoutGroupTypeSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_type_selector"
            layout={{ position: 'absolute', left: 5, width: 152, top: 5, height: 191, ...layout }}
        >
            <RadioButton
                variant="0"
                name="rb_type_regular"
                onPointerTap={onRbTypeRegular}
                layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 112, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.regular.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_0"
                tooltip={t('group.edit.settings.type.regular.help')}
                onPointerTap={onGrouptypeRegion0}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 22, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_0"
                    src={srcGrouptypeIcon0 ?? '${image.library.url}guilds/grouptype_icon_0.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 15, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.regular.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
            <RadioButton
                variant="0"
                name="rb_type_exclusive"
                onPointerTap={onRbTypeExclusive}
                layout={{ position: 'absolute', left: 0, width: 15, top: 62, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.exclusive.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_1"
                tooltip={t('group.edit.settings.type.exclusive.help')}
                onPointerTap={onGrouptypeRegion1}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 82, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_1"
                    src={srcGrouptypeIcon1 ?? '${image.library.url}guilds/grouptype_icon_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 75, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.exclusive.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
            <RadioButton
                variant="0"
                name="rb_type_private"
                onPointerTap={onRbTypePrivate}
                layout={{ position: 'absolute', left: 0, width: 15, top: 122, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 120, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.private.label')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="grouptype_region_2"
                tooltip={t('group.edit.settings.type.private.help')}
                onPointerTap={onGrouptypeRegion2}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 16, top: 142, height: 16 }}
            >
                <ThemeImage
                    name="grouptype_icon_2"
                    src={srcGrouptypeIcon2 ?? '${image.library.url}guilds/grouptype_icon_2.png'}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 132, top: 135, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('group.edit.settings.type.private.help')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `step_cont_5` of GroupManagementWindowLayout - configured through the parent's `stepCont5` prop. */
export interface GroupManagementWindowLayoutStepCont5Props {
    captionGuildRights?: string;
    captionGuildType?: string;
    groupTypeSelector?: GroupManagementWindowLayoutGroupTypeSelectorProps;
    layout?: BoxLayout;
    onCbMemberRights?: () => void;
    visibleStepCont5?: boolean;
}

export const GroupManagementWindowLayoutStepCont5 = ({ captionGuildRights, captionGuildType, groupTypeSelector, layout, onCbMemberRights, visibleStepCont5 }: GroupManagementWindowLayoutStepCont5Props) => {
    const t = useTranslation();

    return (
        (visibleStepCont5 ?? false) && (
            <Region
                name="step_cont_5"
                layout={{ position: 'absolute', left: 0, right: 3, top: 111, height: 360, ...layout }}
            >
                <Region
                    name="guild_type"
                    layout={{ position: 'absolute', left: 16, width: 170, bottom: 335, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildType ?? t('group.edit.settings.type.caption')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 16, width: 170, top: 29, height: 199 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 191 }}
                    >
                        <GroupManagementWindowLayoutGroupTypeSelector {...groupTypeSelector} />
                    </Border>
                </Border>
                <Region
                    name="guild_rights"
                    layout={{ position: 'absolute', left: 207, width: 170, bottom: 335, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionGuildRights ?? t('group.edit.settings.rights.caption')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 207, width: 170, top: 29, height: 144 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 135 }}
                    >
                        <CheckBox
                            variant="0"
                            name="cb_member_rights"
                            onPointerTap={onCbMemberRights}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                        />
                        <Region layout={{ position: 'absolute', left: 25, width: 133, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('group.edit.settings.rights.members.label')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region layout={{ position: 'absolute', left: 5, width: 152, top: 25, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('group.edit.settings.rights.members.help')}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 152 }}
                            />
                        </Region>
                    </Border>
                </Border>
            </Region>
        )
    );
};
