import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { ToolbarChatSettingsLayoutChatBubbleWidthItem } from './ToolbarChatSettingsLayoutChatBubbleWidthItem';
import { ToolbarChatSettingsLayoutChatBubbleWidthLabelItem } from './ToolbarChatSettingsLayoutChatBubbleWidthLabelItem';
import { ToolbarChatSettingsLayoutChatModeItem } from './ToolbarChatSettingsLayoutChatModeItem';
import { ToolbarChatSettingsLayoutChatModeLabelItem } from './ToolbarChatSettingsLayoutChatModeLabelItem';
import { ToolbarChatSettingsLayoutChatScrollSpeedItem } from './ToolbarChatSettingsLayoutChatScrollSpeedItem';
import { ToolbarChatSettingsLayoutChatScrollSpeedLabelItem } from './ToolbarChatSettingsLayoutChatScrollSpeedLabelItem';

/** Generated from `1259_toolbar_chat_settings_xml` (layout "toolbar_chat_settings", 257x269) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarChatSettingsLayoutProps {
    captionChatSettingsInfo?: string;
    captionSettingsTitle?: string;
    itemsChatSettingsList?: ReactNode;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
}

export const ToolbarChatSettingsLayout = ({ captionChatSettingsInfo, captionSettingsTitle, itemsChatSettingsList, layout, line, onBackBtn }: ToolbarChatSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 257, height: 269, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 257, top: 1, height: 269, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSettingsTitle ?? t('toolbar.chat.settings.title')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="settings_title"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 144, top: 5, height: 17 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 24, height: 1 }}
                >
                    {line}
                </Region>
                <ThemeText
                    text={captionChatSettingsInfo ?? t('toolbar.chat.settings.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                    name="chat_settings_info"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 33, height: 32 }}
                />
                <Region
                    name="chat_settings_list"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 70, height: 143, flexDirection: 'column', gap: 4 }}
                >
                    {itemsChatSettingsList ?? (
                        <>
                            <ToolbarChatSettingsLayoutChatModeLabelItem />
                            <ToolbarChatSettingsLayoutChatModeItem />
                            <ToolbarChatSettingsLayoutChatBubbleWidthLabelItem />
                            <ToolbarChatSettingsLayoutChatBubbleWidthItem />
                            <ToolbarChatSettingsLayoutChatScrollSpeedLabelItem />
                            <ToolbarChatSettingsLayoutChatScrollSpeedItem />
                        </>
                    )}
                </Region>
                <Button
                    variant="3"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 12, height: 28, minWidth: 60, maxWidth: 60, minHeight: 28, maxHeight: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
