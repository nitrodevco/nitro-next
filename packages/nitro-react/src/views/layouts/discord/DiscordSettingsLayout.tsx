import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, CheckBox, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1728_discord_settings_xml` (layout "discord_settings", 377x551) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscordSettingsLayoutProps {
    captionDescTxt?: string;
    captionTitle?: string;
    captionTitle2?: string;
    captionTitle3?: string;
    itemsSettingContainer?: ReactNode;
    itemsSettingContainer2?: ReactNode;
    itemsSettingContainer3?: ReactNode;
    itemsSettingContainer4?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onCollectiblesServer?: () => void;
    onFunnyButton?: () => void;
    onOriginsServer?: () => void;
    onWiredServer?: () => void;
    srcDiscordBox?: string;
}

export const DiscordSettingsLayout = ({ captionDescTxt, captionTitle, captionTitle2, captionTitle3, itemsSettingContainer, itemsSettingContainer2, itemsSettingContainer3, itemsSettingContainer4, layout, onClose, onCollectiblesServer, onFunnyButton, onOriginsServer, onWiredServer, srcDiscordBox }: DiscordSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="103"
            id="discord_settings"
            name="discord_settings"
            params={32801}
            caption={t('discord_activity.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 377, height: 551, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 375, top: 0, height: 116 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 110, width: 171, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitle ?? t('discord_activity.header.title')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <Region
                        name="desc_txt"
                        params={16}
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
                <Region
                    name="settings"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 375, top: 114, height: 158 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 61, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitle2 ?? t('discord_activity.settings.title')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <Region
                        name="setting_container"
                        params={16}
                        layout={{ position: 'absolute', left: 19, width: 214, top: 39, height: 21, flexDirection: 'row', gap: 3 }}
                    >
                        {itemsSettingContainer ?? (
                            <DiscordSettingsLayoutShowHabboCbxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 190, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('discord_activity.settings.discord_status')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ fill: '#d5d4db' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="setting_container"
                        params={16}
                        layout={{ position: 'absolute', left: 19, width: 168, top: 65, height: 21, flexDirection: 'row', gap: 3 }}
                    >
                        {itemsSettingContainer2 ?? (
                            <DiscordSettingsLayoutShareActivityCbxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 144, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('discord_activity.settings.share_activity')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ fill: '#d5d4db' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="setting_container"
                        params={16}
                        layout={{ position: 'absolute', left: 45, width: 189, top: 91, height: 21, flexDirection: 'row', gap: 3 }}
                    >
                        {itemsSettingContainer3 ?? (
                            <DiscordSettingsLayoutHideInHiddenCbxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 165, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('discord_activity.settings.hide_hidden_rooms')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ fill: '#d5d4db' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="setting_container"
                        params={16}
                        layout={{ position: 'absolute', left: 45, width: 152, top: 117, height: 21, flexDirection: 'row', gap: 3 }}
                    >
                        {itemsSettingContainer4 ?? (
                            <DiscordSettingsLayoutAllowJoiningCbxItem />
                        )}
                        <Region
                            params={16}
                            layout={{ width: 128, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('discord_activity.settings.allow_joining')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ fill: '#d5d4db' }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="our_servers"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 375, top: 254, height: 222 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 81, top: 14, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitle3 ?? 'Our servers:'}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <ContainerButton
                        variant="107"
                        name="collectibles_server"
                        params={1}
                        dynamicStyle="button"
                        onPointerTap={onCollectiblesServer}
                        layout={{ position: 'absolute', left: 5, width: 186, top: 30, height: 98 }}
                    >
                        <Region
                            tags={[ '#icon' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 77, width: 79, top: 40, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Collectibles"
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <ThemeImage
                            tags={[ '#icon' ]}
                            src={layoutImage('collectables_icon_curator_stamp_large.png')}
                            layout={{ position: 'absolute', left: 22, width: 48, top: 26, height: 48 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="107"
                        name="wired_server"
                        params={1}
                        dynamicStyle="button"
                        onPointerTap={onWiredServer}
                        layout={{ position: 'absolute', left: 185, width: 186, top: 30, height: 98 }}
                    >
                        <ThemeImage
                            tags={[ '#icon' ]}
                            src={layoutImage('discord_wired_logo.png')}
                            layout={{ position: 'absolute', left: 19, width: 155, top: 18, height: 67 }}
                        />
                        <Region
                            tags={[ '#icon' ]}
                            layout={{ position: 'absolute', left: 77, width: 66, top: 32, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="The WiredFaculty"
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="107"
                        name="origins_server"
                        params={1}
                        dynamicStyle="button"
                        onPointerTap={onOriginsServer}
                        layout={{ position: 'absolute', left: 5, width: 186, top: 116, height: 98 }}
                    >
                        <Region
                            tags={[ '#icon' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 77, width: 86, top: 31, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Habbo Hotel:Origins"
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <ThemeImage
                            tags={[ '#icon' ]}
                            src={layoutImage('discord_origins_logo.png')}
                            layout={{ position: 'absolute', left: 27, width: 38, top: 26, height: 47 }}
                        />
                    </ContainerButton>
                </Region>
                <Button
                    variant="105"
                    name="funny_button"
                    params={132113}
                    tintColor="#bbbbbb"
                    onPointerTap={onFunnyButton}
                    layout={{ position: 'absolute', left: 14, width: 348, bottom: 44, height: 28, minWidth: 348, maxWidth: 348 }}
                >
                    {t('discord_activity.funny_button')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Row template `show_habbo_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutShowHabboCbxItemProps {
    layout?: BoxLayout;
    onShowHabboCbx?: () => void;
}

export const DiscordSettingsLayoutShowHabboCbxItem = ({ layout, onShowHabboCbx }: DiscordSettingsLayoutShowHabboCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="show_habbo_cbx"
            params={17}
            onPointerTap={onShowHabboCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};

/** Row template `share_activity_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutShareActivityCbxItemProps {
    layout?: BoxLayout;
    onShareActivityCbx?: () => void;
}

export const DiscordSettingsLayoutShareActivityCbxItem = ({ layout, onShareActivityCbx }: DiscordSettingsLayoutShareActivityCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="share_activity_cbx"
            params={17}
            onPointerTap={onShareActivityCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};

/** Row template `hide_in_hidden_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutHideInHiddenCbxItemProps {
    layout?: BoxLayout;
    onHideInHiddenCbx?: () => void;
}

export const DiscordSettingsLayoutHideInHiddenCbxItem = ({ layout, onHideInHiddenCbx }: DiscordSettingsLayoutHideInHiddenCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="hide_in_hidden_cbx"
            params={17}
            onPointerTap={onHideInHiddenCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};

/** Row template `allow_joining_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutAllowJoiningCbxItemProps {
    layout?: BoxLayout;
    onAllowJoiningCbx?: () => void;
}

export const DiscordSettingsLayoutAllowJoiningCbxItem = ({ layout, onAllowJoiningCbx }: DiscordSettingsLayoutAllowJoiningCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="allow_joining_cbx"
            params={17}
            onPointerTap={onAllowJoiningCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};
