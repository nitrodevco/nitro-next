import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ThemeText } from '#base/theme';

/** Generated from `1259_toolbar_chat_settings_xml` (layout "toolbar_chat_settings", 257x269) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarChatSettingsLayoutProps {
    captionChatSettingsInfo?: string;
    captionSettingsTitle?: string;
    itemsChatSettingsList?: ReactNode;
    layout?: BoxLayout;
    onBackBtn?: () => void;
}

export const ToolbarChatSettingsLayout = ({ captionChatSettingsInfo, captionSettingsTitle, itemsChatSettingsList, layout, onBackBtn }: ToolbarChatSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 257, height: 269, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 257, top: 1, height: 269 }}
            >
                <Region
                    name="settings_title"
                    params={786640}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -72.5, width: 144, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('toolbar.chat.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={786576}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 24, height: 1 }}
                />
                <Region
                    name="chat_settings_info"
                    params={144}
                    layout={{ position: 'absolute', left: 10, right: 10, top: 33, height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionChatSettingsInfo ?? t('toolbar.chat.settings.info')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="chat_settings_list"
                    params={144}
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
                    params={132145}
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 12, height: 28, minWidth: 60, maxWidth: 60, minHeight: 28, maxHeight: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};

/** Row template `chat_mode_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatModeLabelItemProps {
    captionChatModeLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatModeLabelItem = ({ captionChatModeLabel, layout }: ToolbarChatSettingsLayoutChatModeLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_mode_label"
            params={144}
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatModeLabel ?? t('toolbar.chat.settings.mode')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `chat_mode` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatModeItemProps {
    layout?: BoxLayout;
    onChatMode?: () => void;
}

export const ToolbarChatSettingsLayoutChatModeItem = ({ layout, onChatMode }: ToolbarChatSettingsLayoutChatModeItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_mode"
            params={177}
            onPointerTap={onChatMode}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `chat_bubble_width_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps {
    captionChatBubbleWidthLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatBubbleWidthLabelItem = ({ captionChatBubbleWidthLabel, layout }: ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_bubble_width_label"
            params={144}
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatBubbleWidthLabel ?? t('toolbar.chat.settings.bubble_width')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `chat_bubble_width` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatBubbleWidthItemProps {
    layout?: BoxLayout;
    onChatBubbleWidth?: () => void;
}

export const ToolbarChatSettingsLayoutChatBubbleWidthItem = ({ layout, onChatBubbleWidth }: ToolbarChatSettingsLayoutChatBubbleWidthItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_bubble_width"
            params={177}
            onPointerTap={onChatBubbleWidth}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `chat_scroll_speed_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatScrollSpeedLabelItemProps {
    captionChatScrollSpeedLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatScrollSpeedLabelItem = ({ captionChatScrollSpeedLabel, layout }: ToolbarChatSettingsLayoutChatScrollSpeedLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_scroll_speed_label"
            params={144}
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatScrollSpeedLabel ?? t('toolbar.chat.settings.scroll_speed')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `chat_scroll_speed` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatScrollSpeedItemProps {
    layout?: BoxLayout;
    onChatScrollSpeed?: () => void;
}

export const ToolbarChatSettingsLayoutChatScrollSpeedItem = ({ layout, onChatScrollSpeed }: ToolbarChatSettingsLayoutChatScrollSpeedItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_scroll_speed"
            params={177}
            onPointerTap={onChatScrollSpeed}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};
