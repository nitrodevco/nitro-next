import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
    tintBadgePreviewImage?: string;
    vipRequiredRegion?: ReactNode;
    visibleStepCont4?: boolean;
}

export const GroupManagementWindowLayoutStepCont4 = ({ captionConfirmationCaption, captionConfirmationDesc, captionGetVipTxt, captionGuildBadgeTxt, captionGuildColorsTxt, captionVipRequiredTxt, layout, onVipRequiredRegion, srcBadgePreviewImage, srcBadgePreviewPrimaryColorBtm, srcBadgePreviewPrimaryColorTop, srcBadgePreviewSecondaryColorBtm, srcBadgePreviewSecondaryColorTop, tintBadgePreviewImage, vipRequiredRegion, visibleStepCont4 }: GroupManagementWindowLayoutStepCont4Props) => {
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
                        tint={tintBadgePreviewImage}
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
                    >
                        {vipRequiredRegion}
                    </Region>
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
