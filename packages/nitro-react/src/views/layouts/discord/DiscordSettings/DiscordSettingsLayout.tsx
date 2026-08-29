import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { DiscordSettingsLayoutOurServers, DiscordSettingsLayoutOurServersProps } from './DiscordSettingsLayoutOurServers';
import { DiscordSettingsLayoutSettings, DiscordSettingsLayoutSettingsProps } from './DiscordSettingsLayoutSettings';

/** Generated from `1728_discord_settings_xml` (layout "discord_settings", 377x551) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscordSettingsLayoutProps {
    captionDescTxt?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onFunnyButton?: () => void;
    ourServers?: DiscordSettingsLayoutOurServersProps;
    settings?: DiscordSettingsLayoutSettingsProps;
    srcDiscordBox?: string;
}

export const DiscordSettingsLayout = ({ captionDescTxt, captionTitle, layout, onClose, onFunnyButton, ourServers, settings, srcDiscordBox }: DiscordSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="103"
            id="discord_settings"
            name="discord_settings"
            caption={t('discord_activity.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 377, height: 551, minWidth: 377, minHeight: 551, ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', left: 1, width: 375, top: 0, height: 116 }}
            >
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 110, width: 171, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('discord_activity.header.title')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
                <Region
                    name="desc_txt"
                    layout={{ position: 'absolute', left: 110, width: 245, top: 35, height: 71, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescTxt ?? t('discord_activity.header.desc')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 245 }}
                    />
                </Region>
                <ThemeImage
                    name="discord_box"
                    src={srcDiscordBox ?? layoutImage('discord_discord_box.png')}
                    layout={{ position: 'absolute', left: 16, width: 77, top: 11, height: 96 }}
                />
            </Region>
            <DiscordSettingsLayoutSettings {...settings} />
            <DiscordSettingsLayoutOurServers {...ourServers} />
            <Button
                variant="105"
                name="funny_button"
                tintColor="#bbbbbb"
                onPointerTap={onFunnyButton}
                layout={{ position: 'absolute', left: 14, width: 348, bottom: 3, height: 28, minWidth: 348, maxWidth: 348 }}
            >
                {t('discord_activity.funny_button')}
            </Button>
        </Frame>
    );
};
