import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { DiscordSettingsLayoutAllowJoiningCbxItem } from './DiscordSettingsLayoutAllowJoiningCbxItem';
import { DiscordSettingsLayoutHideInHiddenCbxItem } from './DiscordSettingsLayoutHideInHiddenCbxItem';
import { DiscordSettingsLayoutShareActivityCbxItem } from './DiscordSettingsLayoutShareActivityCbxItem';
import { DiscordSettingsLayoutShowHabboCbxItem } from './DiscordSettingsLayoutShowHabboCbxItem';

/** Named region `settings` of DiscordSettingsLayout - configured through the parent's `settings` prop. */
export interface DiscordSettingsLayoutSettingsProps {
    captionTitle?: string;
    itemsSettingContainer?: ReactNode;
    itemsSettingContainer2?: ReactNode;
    itemsSettingContainer3?: ReactNode;
    itemsSettingContainer4?: ReactNode;
    layout?: BoxLayout;
}

export const DiscordSettingsLayoutSettings = ({ captionTitle, itemsSettingContainer, itemsSettingContainer2, itemsSettingContainer3, itemsSettingContainer4, layout }: DiscordSettingsLayoutSettingsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings"
            layout={{ position: 'absolute', left: 1, width: 375, top: 114, height: 158, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 15, width: 61, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('discord_activity.settings.title')}
                    textStyle="text-style-il-regular-white"
                />
            </Region>
            <Region
                name="setting_container"
                layout={{ position: 'absolute', left: 19, width: 214, top: 39, height: 21, flexDirection: 'row', gap: 3 }}
            >
                {itemsSettingContainer ?? (
                    <DiscordSettingsLayoutShowHabboCbxItem />
                )}
                <ThemeText
                    text={t('discord_activity.settings.discord_status')}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#d5d4db' }}
                    layout={{ width: 190, height: 17, flexShrink: 0 }}
                />
            </Region>
            <Region
                name="setting_container"
                layout={{ position: 'absolute', left: 19, width: 168, top: 65, height: 21, flexDirection: 'row', gap: 3 }}
            >
                {itemsSettingContainer2 ?? (
                    <DiscordSettingsLayoutShareActivityCbxItem />
                )}
                <ThemeText
                    text={t('discord_activity.settings.share_activity')}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#d5d4db' }}
                    layout={{ width: 144, height: 17, flexShrink: 0 }}
                />
            </Region>
            <Region
                name="setting_container"
                layout={{ position: 'absolute', left: 45, width: 189, top: 91, height: 21, flexDirection: 'row', gap: 3 }}
            >
                {itemsSettingContainer3 ?? (
                    <DiscordSettingsLayoutHideInHiddenCbxItem />
                )}
                <ThemeText
                    text={t('discord_activity.settings.hide_hidden_rooms')}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#d5d4db' }}
                    layout={{ width: 165, height: 17, flexShrink: 0 }}
                />
            </Region>
            <Region
                name="setting_container"
                layout={{ position: 'absolute', left: 45, width: 152, top: 117, height: 21, flexDirection: 'row', gap: 3 }}
            >
                {itemsSettingContainer4 ?? (
                    <DiscordSettingsLayoutAllowJoiningCbxItem />
                )}
                <ThemeText
                    text={t('discord_activity.settings.allow_joining')}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#d5d4db' }}
                    layout={{ width: 128, height: 17, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
