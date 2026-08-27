import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, Dropmenu, Frame, Icon, RadioButton, Region, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1201_group_management_window_xml` (layout "Achievements", 392x497) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupManagementWindowLayoutProps {
    captionBaseLabel?: string;
    captionBaseWarning?: string;
    captionBuyTxt?: string;
    captionCancelLink?: string;
    captionConfirmationCaption?: string;
    captionConfirmationDesc?: string;
    captionCreateRoomLinkTxt?: string;
    captionDescLabel?: string;
    captionGetVipTxt?: string;
    captionGuildBadgeTxt?: string;
    captionGuildColorsTxt?: string;
    captionGuildRights?: string;
    captionGuildType?: string;
    captionHeaderCaptionTxt?: string;
    captionHeaderDescTxt?: string;
    captionLabelGuildColor?: string;
    captionLabelPrimary?: string;
    captionLabelSecondary?: string;
    captionNameLabel?: string;
    captionPreviousStepLink?: string;
    captionStep1MembersTxt?: string;
    captionStepTitle1?: string;
    captionStepTitle2?: string;
    captionStepTitle3?: string;
    captionStepTitle4?: string;
    captionVipRequiredTxt?: string;
    layout?: BoxLayout;
    onBaseDropmenu?: () => void;
    onBuyButton?: () => void;
    onCancelLinkRegion?: () => void;
    onCbMemberRights?: () => void;
    onClose?: () => void;
    onCreateRoomLinkRegion?: () => void;
    onEditTab1?: () => void;
    onEditTab2?: () => void;
    onEditTab3?: () => void;
    onEditTab5?: () => void;
    onGrouptypeRegion0?: () => void;
    onGrouptypeRegion1?: () => void;
    onGrouptypeRegion2?: () => void;
    onNextStepButton?: () => void;
    onPreviousStepLinkRegion?: () => void;
    onRbTypeExclusive?: () => void;
    onRbTypePrivate?: () => void;
    onRbTypeRegular?: () => void;
    onResetBadge?: () => void;
    onResetColors?: () => void;
    onStep1MembersRegion?: () => void;
    onVipRequiredRegion?: () => void;
    srcBadgePreviewImage?: string;
    srcBadgePreviewPrimaryColorBtm?: string;
    srcBadgePreviewPrimaryColorTop?: string;
    srcBadgePreviewSecondaryColorBtm?: string;
    srcBadgePreviewSecondaryColorTop?: string;
    srcBuyCreditIcon?: string;
    srcGcreate10?: string;
    srcGcreate11?: string;
    srcGcreate20?: string;
    srcGcreate21?: string;
    srcGcreate30?: string;
    srcGcreate31?: string;
    srcGcreate40?: string;
    srcGcreate41?: string;
    srcGcreateIconCredit?: string;
    srcGrouptypeIcon0?: string;
    srcGrouptypeIcon1?: string;
    srcGrouptypeIcon2?: string;
    srcGuildColorPrimaryColorBtm?: string;
    srcGuildColorPrimaryColorTop?: string;
    srcGuildColorSecondaryColorBtm?: string;
    srcGuildColorSecondaryColorTop?: string;
    srcHeaderPicBitmapStep1?: string;
    srcHeaderPicBitmapStep2?: string;
    srcHeaderPicBitmapStep3?: string;
    srcHeaderPicBitmapStep4?: string;
    srcHeaderPicBitmapStep5?: string;
    srcHeaderPicBitmapStep6?: string;
    visibleFooterCont?: boolean;
    visibleResetBadge?: boolean;
    visibleResetColors?: boolean;
    visibleStepCont2?: boolean;
    visibleStepCont3?: boolean;
    visibleStepCont4?: boolean;
    visibleStepCont5?: boolean;
    visibleStepsHeaderCont?: boolean;
}

export const GroupManagementWindowLayout = ({ captionBaseLabel, captionBaseWarning, captionBuyTxt, captionCancelLink, captionConfirmationCaption, captionConfirmationDesc, captionCreateRoomLinkTxt, captionDescLabel, captionGetVipTxt, captionGuildBadgeTxt, captionGuildColorsTxt, captionGuildRights, captionGuildType, captionHeaderCaptionTxt, captionHeaderDescTxt, captionLabelGuildColor, captionLabelPrimary, captionLabelSecondary, captionNameLabel, captionPreviousStepLink, captionStep1MembersTxt, captionStepTitle1, captionStepTitle2, captionStepTitle3, captionStepTitle4, captionVipRequiredTxt, layout, onBaseDropmenu, onBuyButton, onCancelLinkRegion, onCbMemberRights, onClose, onCreateRoomLinkRegion, onEditTab1, onEditTab2, onEditTab3, onEditTab5, onGrouptypeRegion0, onGrouptypeRegion1, onGrouptypeRegion2, onNextStepButton, onPreviousStepLinkRegion, onRbTypeExclusive, onRbTypePrivate, onRbTypeRegular, onResetBadge, onResetColors, onStep1MembersRegion, onVipRequiredRegion, srcBadgePreviewImage, srcBadgePreviewPrimaryColorBtm, srcBadgePreviewPrimaryColorTop, srcBadgePreviewSecondaryColorBtm, srcBadgePreviewSecondaryColorTop, srcBuyCreditIcon, srcGcreate10, srcGcreate11, srcGcreate20, srcGcreate21, srcGcreate30, srcGcreate31, srcGcreate40, srcGcreate41, srcGcreateIconCredit, srcGrouptypeIcon0, srcGrouptypeIcon1, srcGrouptypeIcon2, srcGuildColorPrimaryColorBtm, srcGuildColorPrimaryColorTop, srcGuildColorSecondaryColorBtm, srcGuildColorSecondaryColorTop, srcHeaderPicBitmapStep1, srcHeaderPicBitmapStep2, srcHeaderPicBitmapStep3, srcHeaderPicBitmapStep4, srcHeaderPicBitmapStep5, srcHeaderPicBitmapStep6, visibleFooterCont, visibleResetBadge, visibleResetColors, visibleStepCont2, visibleStepCont3, visibleStepCont4, visibleStepCont5, visibleStepsHeaderCont }: GroupManagementWindowLayoutProps) => {
    const t = useTranslation();
    const [ nameTxtValue, setNameTxtValue ] = useState('');
    const [ descTxtValue, setDescTxtValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="groups_main_window"
            name="groups_main_window"
            params={32769}
            caption={t('group.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 392, height: 497, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 391, top: 0, height: 110 }}
                >
                    <Region
                        params={2192}
                        backgroundColor="#b3b099"
                        layout={{ position: 'absolute', left: 1, width: 390, top: 0, height: 110 }}
                    />
                    <TabContext
                        variant="0"
                        name="edit_guild_tab_context"
                        params={2193}
                        layout={{ position: 'absolute', left: -6, width: 402, top: 89, height: 21 }}
                    >
                        <TabButton
                            variant="0"
                            name="edit_tab_1"
                            params={131089}
                            onPointerTap={onEditTab1}
                            layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 22 }}
                        >
                            {t('group.edit.tab.1')}
                        </TabButton>
                        <TabButton
                            variant="0"
                            name="edit_tab_2"
                            params={131089}
                            onPointerTap={onEditTab2}
                            layout={{ position: 'absolute', left: 97, width: 101, top: 0, height: 22 }}
                        >
                            {t('group.edit.tab.2')}
                        </TabButton>
                        <TabButton
                            variant="0"
                            name="edit_tab_3"
                            params={131089}
                            onPointerTap={onEditTab3}
                            layout={{ position: 'absolute', left: 198, width: 101, top: 0, height: 22 }}
                        >
                            {t('group.edit.tab.3')}
                        </TabButton>
                        <TabButton
                            variant="0"
                            name="edit_tab_5"
                            params={131089}
                            onPointerTap={onEditTab5}
                            layout={{ position: 'absolute', left: 299, width: 101, top: 0, height: 22 }}
                        >
                            {t('group.edit.tab.5')}
                        </TabButton>
                    </TabContext>
                    <Region
                        name="steps_header_cont"
                        params={144}
                        visible={visibleStepsHeaderCont ?? false}
                        layout={{ position: 'absolute', left: 16, width: 360, top: 5, height: 33 }}
                    >
                        <ThemeImage
                            name="gcreate_1_0"
                            params={16}
                            src={srcGcreate10 ?? '${image.library.url}guilds/gcreate_1_0.png'}
                            layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_1_1"
                            params={16}
                            src={srcGcreate11 ?? '${image.library.url}guilds/gcreate_1_1.png'}
                            layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_2_0"
                            params={16}
                            src={srcGcreate20 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                            layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_2_1"
                            params={16}
                            src={srcGcreate21 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                            layout={{ position: 'absolute', left: 77, width: 83, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_3_0"
                            params={16}
                            src={srcGcreate30 ?? '${image.library.url}guilds/gcreate_2_0.png'}
                            layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_3_1"
                            params={16}
                            src={srcGcreate31 ?? '${image.library.url}guilds/gcreate_2_1.png'}
                            layout={{ position: 'absolute', left: 153, width: 83, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_4_0"
                            params={16}
                            src={srcGcreate40 ?? '${image.library.url}guilds/gcreate_4_0.png'}
                            layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_4_1"
                            params={16}
                            src={srcGcreate41 ?? '${image.library.url}guilds/gcreate_4_1.png'}
                            layout={{ position: 'absolute', left: 227, width: 133, top: 0, height: 33 }}
                        />
                        <ThemeImage
                            name="gcreate_icon_credit"
                            params={16}
                            src={srcGcreateIconCredit ?? '${image.library.url}guilds/gcreate_icon_credit.png'}
                            layout={{ position: 'absolute', left: 335, width: 21, top: 0, height: 20 }}
                        />
                        <Region
                            name="step_title_1"
                            params={786560}
                            layout={{ position: 'absolute', left: -38, width: 156, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStepTitle1 ?? t('group.create.steplabel.1')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="step_title_2"
                            params={786560}
                            layout={{ position: 'absolute', left: 40, width: 156, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStepTitle2 ?? t('group.create.steplabel.2')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="step_title_3"
                            params={786560}
                            layout={{ position: 'absolute', left: 115, width: 156, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStepTitle3 ?? t('group.create.steplabel.3')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="step_title_4"
                            params={786560}
                            layout={{ position: 'absolute', left: 210, width: 156, top: 7, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStepTitle4 ?? t('group.create.steplabel.4')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="header_pic_bitmap_step_1"
                        params={16}
                        src={srcHeaderPicBitmapStep1 ?? '${image.library.url}guilds/group_UI_identity.png'}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="header_pic_bitmap_step_2"
                        params={16}
                        src={srcHeaderPicBitmapStep2 ?? '${image.library.url}guilds/group_UI_badge.png'}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="header_pic_bitmap_step_3"
                        params={16}
                        src={srcHeaderPicBitmapStep3 ?? '${image.library.url}guilds/group_UI_colors.png'}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="header_pic_bitmap_step_4"
                        params={16}
                        src={srcHeaderPicBitmapStep4 ?? '${image.library.url}guilds/group_UI_ready.png'}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="header_pic_bitmap_step_5"
                        params={16}
                        src={srcHeaderPicBitmapStep5 ?? '${image.library.url}guilds/group_UI_ready.png'}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="header_pic_bitmap_step_6"
                        params={16}
                        src={srcHeaderPicBitmapStep6}
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 62 }}
                    />
                    <Region
                        name="header_caption_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 263, top: 43, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeaderCaptionTxt ?? 'Caption PH'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 263 }}
                        />
                    </Region>
                    <Region
                        name="header_desc_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 232, top: 69, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeaderDescTxt ?? 'Desc PH'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 232 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="step_cont_1"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 373, top: 128, height: 310 }}
                >
                    <Border
                        variant="0"
                        name="step_1_badge"
                        params={16}
                        layout={{ position: 'absolute', left: 17, width: 94, top: 11, height: 94 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                        />
                        <WidgetSlot
                            widgetType="badge_image"
                            name="group_logo"
                            params={16}
                            options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                    </Border>
                    <Region
                        name="step_1_members_region"
                        params={17}
                        onPointerTap={onStep1MembersRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 17, width: 94, top: 110, height: 18 }}
                    >
                        <Region
                            name="step_1_members_txt"
                            params={786448}
                            layout={{ position: 'absolute', left: 10, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionStep1MembersTxt ?? 'Members PH'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </Region>
                    <Region
                        name="name_label"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 107, top: -8, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionNameLabel ?? t('group.edit.name')} />
                    </Region>
                    <TextInput
                        value={nameTxtValue}
                        onChange={setNameTxtValue}
                        maxLength={29}
                        layout={{ position: 'absolute', left: 126, width: 247, top: 14, height: 26 }}
                    />
                    <Region
                        name="desc_label"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 100, top: 52, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionDescLabel ?? t('group.edit.desc')} />
                    </Region>
                    <TextInput
                        value={descTxtValue}
                        onChange={setDescTxtValue}
                        maxLength={254}
                        layout={{ position: 'absolute', left: 126, width: 247, top: 74, height: 80 }}
                    />
                    <Region
                        name="base_label"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 101, top: 166, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionBaseLabel ?? t('group.edit.base')} />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="base_dropmenu"
                        params={129}
                        onPointerTap={onBaseDropmenu}
                        layout={{ position: 'absolute', left: 126, width: 247, top: 188, height: 26 }}
                    />
                    <Region
                        name="base_warning"
                        params={129}
                        layout={{ position: 'absolute', left: 126, width: 247, top: 214, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBaseWarning ?? t('group.edit.base.warning')}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                        />
                    </Region>
                    <Region
                        name="create_room_link_region"
                        params={17}
                        onPointerTap={onCreateRoomLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 126, width: 247, top: 252, height: 38 }}
                    >
                        <Region
                            name="create_room_link_txt"
                            params={128}
                            layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCreateRoomLinkTxt ?? t('group.createroom')}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 247 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="step_cont_2"
                    params={144}
                    visible={visibleStepCont2 ?? false}
                    layout={{ position: 'absolute', left: 0, width: 392, top: 110, height: 305 }}
                />
                <Region
                    visible={visibleResetBadge ?? false}
                    layout={{ position: 'absolute', left: 17, width: 94, top: 245, height: 29, minWidth: 94, maxWidth: 94 }}
                >
                    <ButtonThick
                        variant="3"
                        name="reset_badge"
                        params={131089}
                        onPointerTap={onResetBadge}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('group.edit.reset.badge')}
                    </ButtonThick>
                </Region>
                <Region
                    name="step_cont_3"
                    params={144}
                    visible={visibleStepCont3 ?? false}
                    layout={{ position: 'absolute', left: 0, width: 392, top: 110, height: 305 }}
                >
                    <Region
                        name="label_guild_color"
                        params={1048592}
                        layout={{ position: 'absolute', left: 13, width: 92, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabelGuildColor ?? t('group.edit.color.guild.color')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Border
                        variant="5"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 92, top: 29, height: 46 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                        >
                            <ThemeImage
                                name="guild_color_primary_color_btm"
                                params={16}
                                src={srcGuildColorPrimaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                                layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="guild_color_primary_color_top"
                                params={16}
                                src={srcGuildColorPrimaryColorTop ?? layoutImage('group_guild_color_top.png')}
                                layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="guild_color_secondary_color_btm"
                                params={16}
                                src={srcGuildColorSecondaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                                layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="guild_color_secondary_color_top"
                                params={16}
                                src={srcGuildColorSecondaryColorTop ?? layoutImage('group_guild_color_top.png')}
                                layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                            />
                        </Border>
                    </Border>
                    <Region
                        name="label_primary"
                        params={1048592}
                        layout={{ position: 'absolute', left: 128, width: 142, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabelPrimary ?? t('group.edit.color.primary.color')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="label_secondary"
                        params={1048592}
                        layout={{ position: 'absolute', left: 280, width: 100, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        params={16}
                        tintColor="#bebba5"
                        layout={{ position: 'absolute', left: 128, width: 142, top: 29, height: 277 }}
                    >
                        <Region
                            name="guild_primary_color_selector"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 138, top: 3, height: 273, flexDirection: 'row', flexWrap: 'wrap' }}
                        />
                    </Border>
                    <Border
                        variant="3"
                        name="border"
                        params={16}
                        tintColor="#bebba5"
                        layout={{ position: 'absolute', left: 280, width: 96, top: 29, height: 277 }}
                    >
                        <Region
                            name="guild_secondary_color_selector"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 94, top: 3, height: 273, flexDirection: 'row', flexWrap: 'wrap' }}
                        />
                    </Border>
                </Region>
                <Region
                    visible={visibleResetColors ?? false}
                    layout={{ position: 'absolute', left: 15, width: 90, top: 195, height: 29, minWidth: 90, maxWidth: 90 }}
                >
                    <ButtonThick
                        variant="3"
                        name="reset_colors"
                        params={131089}
                        onPointerTap={onResetColors}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('group.edit.reset.color')}
                    </ButtonThick>
                </Region>
                <Region
                    name="step_cont_4"
                    params={144}
                    visible={visibleStepCont4 ?? false}
                    layout={{ position: 'absolute', left: 0, width: 389, top: 111, height: 360 }}
                >
                    <Region
                        name="confirmation_caption"
                        params={1}
                        layout={{ position: 'absolute', left: 126, width: 256, top: 8, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionConfirmationCaption ?? 'Group Name Here DIPPA DAPPA DII'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                        />
                    </Region>
                    <Region
                        name="confirmation_desc"
                        params={1}
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
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 92, top: 50, height: 92 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 84 }}
                        />
                        <ThemeImage
                            name="badge_preview_image"
                            params={16}
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
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 92, top: 172, height: 46 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 84, top: 4, height: 38 }}
                        >
                            <ThemeImage
                                name="badge_preview_primary_color_btm"
                                params={16}
                                src={srcBadgePreviewPrimaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                                layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="badge_preview_primary_color_top"
                                params={16}
                                src={srcBadgePreviewPrimaryColorTop ?? layoutImage('group_guild_color_top.png')}
                                layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="badge_preview_secondary_color_btm"
                                params={16}
                                src={srcBadgePreviewSecondaryColorBtm ?? layoutImage('group_guild_color_btm.png')}
                                layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                            />
                            <ThemeImage
                                name="badge_preview_secondary_color_top"
                                params={16}
                                src={srcBadgePreviewSecondaryColorTop ?? layoutImage('group_guild_color_top.png')}
                                layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 30 }}
                            />
                        </Border>
                    </Border>
                    <Border
                        variant="0"
                        name="vip_required_border"
                        params={16}
                        tintColor="#cc0000"
                        layout={{ position: 'absolute', left: 126, width: 248, top: 253, height: 39 }}
                    >
                        <Region
                            name="vip_required_region"
                            params={17}
                            onPointerTap={onVipRequiredRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 248, top: 0, height: 39 }}
                        />
                        <Icon
                            variant="14"
                            name="vip_icon"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 16, top: 11, height: 17 }}
                        />
                        <Region
                            name="vip_required_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 38, width: 192, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionVipRequiredTxt ?? t('group.create.confirm.viprequired')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="get_vip_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 38, width: 160, top: 20, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionGetVipTxt ?? t('group.create.confirm.getvip')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="footer_cont"
                    params={1168}
                    visible={visibleFooterCont ?? false}
                    layout={{ position: 'absolute', left: 0, width: 390, top: 410, height: 42 }}
                >
                    <Region
                        name="cancel_link_region"
                        params={17}
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                    >
                        <Region
                            name="cancel_link"
                            params={4194320}
                            layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionCancelLink ?? t('cancel')} />
                        </Region>
                    </Region>
                    <Region
                        name="previous_step_link_region"
                        params={17}
                        onPointerTap={onPreviousStepLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                    >
                        <Region
                            name="previous_step_link"
                            params={4194320}
                            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionPreviousStepLink ?? t('group.create.previousstep')} />
                        </Region>
                    </Region>
                    <Border
                        variant="0"
                        name="buy_border"
                        params={16}
                        tintColor="#ffc300"
                        layout={{ position: 'absolute', left: 126, width: 248, top: 0, height: 39 }}
                    >
                        <ThemeImage
                            name="buy_credit_icon"
                            params={16}
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
                            params={131153}
                            onPointerTap={onBuyButton}
                            layout={{ position: 'absolute', left: 172, width: 72, top: 5, height: 29, minWidth: 72, maxWidth: 72 }}
                        >
                            {t('group.create.confirm.buy')}
                        </ButtonThick>
                    </Border>
                    <ButtonThick
                        variant="3"
                        name="next_step_button"
                        params={131089}
                        onPointerTap={onNextStepButton}
                        layout={{ position: 'absolute', left: 256, width: 120, top: 13, height: 29, minWidth: 120, maxWidth: 120 }}
                    >
                        {t('group.create.nextstep')}
                    </ButtonThick>
                </Region>
                <Region
                    name="step_cont_5"
                    params={144}
                    visible={visibleStepCont5 ?? false}
                    layout={{ position: 'absolute', left: 0, width: 389, top: 111, height: 360 }}
                >
                    <Region
                        name="guild_type"
                        params={1048592}
                        layout={{ position: 'absolute', left: 16, width: 170, top: 6, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionGuildType ?? t('group.edit.settings.type.caption')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Border
                        variant="0"
                        params={16}
                        layout={{ position: 'absolute', left: 16, width: 170, top: 29, height: 199 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 191 }}
                        >
                            <Region
                                name="group_type_selector"
                                params={17}
                                layout={{ position: 'absolute', left: 5, width: 152, top: 5, height: 191 }}
                            >
                                <RadioButton
                                    variant="0"
                                    name="rb_type_regular"
                                    params={17}
                                    onPointerTap={onRbTypeRegular}
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 15 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 112, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.regular.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="grouptype_region_0"
                                    tooltip={t('group.edit.settings.type.regular.help')}
                                    params={17}
                                    onPointerTap={onGrouptypeRegion0}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 16, top: 22, height: 16 }}
                                >
                                    <ThemeImage
                                        name="grouptype_icon_0"
                                        params={16}
                                        src={srcGrouptypeIcon0 ?? '${image.library.url}guilds/grouptype_icon_0.png'}
                                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                                    />
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 132, top: 15, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.regular.help')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                                    />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="rb_type_exclusive"
                                    params={17}
                                    onPointerTap={onRbTypeExclusive}
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 62, height: 15 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 132, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.exclusive.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="grouptype_region_1"
                                    tooltip={t('group.edit.settings.type.exclusive.help')}
                                    params={17}
                                    onPointerTap={onGrouptypeRegion1}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 16, top: 82, height: 16 }}
                                >
                                    <ThemeImage
                                        name="grouptype_icon_1"
                                        params={16}
                                        src={srcGrouptypeIcon1 ?? '${image.library.url}guilds/grouptype_icon_1.png'}
                                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                                    />
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 132, top: 75, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.exclusive.help')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                                    />
                                </Region>
                                <RadioButton
                                    variant="0"
                                    name="rb_type_private"
                                    params={17}
                                    onPointerTap={onRbTypePrivate}
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 122, height: 15 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 132, top: 120, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.private.label')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="grouptype_region_2"
                                    tooltip={t('group.edit.settings.type.private.help')}
                                    params={17}
                                    onPointerTap={onGrouptypeRegion2}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 16, top: 142, height: 16 }}
                                >
                                    <ThemeImage
                                        name="grouptype_icon_2"
                                        params={16}
                                        src={srcGrouptypeIcon2 ?? '${image.library.url}guilds/grouptype_icon_2.png'}
                                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                                    />
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 132, top: 135, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('group.edit.settings.type.private.help')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                                    />
                                </Region>
                            </Region>
                        </Border>
                    </Border>
                    <Region
                        name="guild_rights"
                        params={1048592}
                        layout={{ position: 'absolute', left: 207, width: 170, top: 6, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionGuildRights ?? t('group.edit.settings.rights.caption')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Border
                        variant="0"
                        params={16}
                        layout={{ position: 'absolute', left: 207, width: 170, top: 29, height: 144 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 162, top: 4, height: 135 }}
                        >
                            <CheckBox
                                variant="0"
                                name="cb_member_rights"
                                params={17}
                                onPointerTap={onCbMemberRights}
                                layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 25, width: 133, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('group.edit.settings.rights.members.label')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 5, width: 152, top: 25, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('group.edit.settings.rights.members.help')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 152 }}
                                />
                            </Region>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};
