import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `step_cont_3` of GroupManagementWindowLayout - configured through the parent's `stepCont3` prop. */
export interface GroupManagementWindowLayoutStepCont3Props {
    captionLabelGuildColor?: string;
    captionLabelPrimary?: string;
    captionLabelSecondary?: string;
    itemsGuildPrimaryColorSelector?: ReactNode;
    itemsGuildSecondaryColorSelector?: ReactNode;
    layout?: BoxLayout;
    srcGuildColorPrimaryColorBtm?: string;
    srcGuildColorPrimaryColorTop?: string;
    srcGuildColorSecondaryColorBtm?: string;
    srcGuildColorSecondaryColorTop?: string;
    visibleStepCont3?: boolean;
}

export const GroupManagementWindowLayoutStepCont3 = ({ captionLabelGuildColor, captionLabelPrimary, captionLabelSecondary, itemsGuildPrimaryColorSelector, itemsGuildSecondaryColorSelector, layout, srcGuildColorPrimaryColorBtm, srcGuildColorPrimaryColorTop, srcGuildColorSecondaryColorBtm, srcGuildColorSecondaryColorTop, visibleStepCont3 }: GroupManagementWindowLayoutStepCont3Props) => {
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
                    >
                        {itemsGuildPrimaryColorSelector}
                    </Region>
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
                    >
                        {itemsGuildSecondaryColorSelector}
                    </Region>
                </Border>
            </Region>
        )
    );
};
