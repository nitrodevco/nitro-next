import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `header` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutHeaderItemProps {
    captionDesc?: string;
    captionWarningText?: string;
    layout?: BoxLayout;
    layout1?: ReactNode;
    onNotificationSettingsButton?: () => void;
    onSettingsButton?: () => void;
    splitter?: ReactNode;
    visibleDesc?: boolean;
    visibleLayout1?: boolean;
    visibleNotificationSettingsButton?: boolean;
    visibleSettingsButton?: boolean;
    visibleSplitter?: boolean;
    visibleWarningText?: boolean;
}

export const ChestGenericLayoutHeaderItem = ({ captionDesc, captionWarningText, layout, layout1, onNotificationSettingsButton, onSettingsButton, splitter, visibleDesc, visibleLayout1, visibleNotificationSettingsButton, visibleSettingsButton, visibleSplitter, visibleWarningText }: ChestGenericLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ width: 460, height: 51, flexShrink: 0, ...layout }}
        >
            {(visibleLayout1 ?? true) && (
                <Region
                    name="layout_1"
                    backgroundColor="#dadada"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 0 }}
                >
                    {layout1}
                </Region>
            )}
            {(visibleSplitter ?? true) && (
                <Region
                    name="splitter"
                    backgroundColor="#c0c0c0"
                    layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 1 }}
                >
                    {splitter}
                </Region>
            )}
            {(visibleDesc ?? true) && (
                <Region
                    name="desc"
                    layout={{ position: 'absolute', left: 10, right: 70, top: 10, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDesc ?? ' A cozy chest waiting to be filled with all sorts of treasures!'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                    />
                </Region>
            )}
            {(visibleWarningText ?? false) && (
                <Region
                    name="warning_text"
                    layout={{ position: 'absolute', left: 10, right: 44, top: 10, bottom: -6, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWarningText ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 406 }}
                    />
                </Region>
            )}
            {(visibleNotificationSettingsButton ?? true) && (
                <ContainerButton
                    variant="7"
                    name="notification_settings_button"
                    tooltip={t('tooltip.notification_settings')}
                    dynamicStyle="button"
                    onPointerTap={onNotificationSettingsButton}
                    layout={{ position: 'absolute', right: 39, width: 24, top: 7, height: 24 }}
                >
                    <ThemeImage
                        src={layoutImage('wired_chests_bell_icon.png')}
                        layout={{ position: 'absolute', left: 6, width: 12, top: 4, height: 15 }}
                    />
                </ContainerButton>
            )}
            {(visibleSettingsButton ?? true) && (
                <ContainerButton
                    variant="7"
                    name="settings_button"
                    tooltip={t('tooltip.settings')}
                    dynamicStyle="button"
                    onPointerTap={onSettingsButton}
                    layout={{ position: 'absolute', right: 10, width: 24, top: 7, height: 24 }}
                >
                    <ThemeImage
                        src={layoutImage('wired_chests_gear_icon.png')}
                        layout={{ position: 'absolute', left: 5, width: 14, top: 5, height: 14 }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};
