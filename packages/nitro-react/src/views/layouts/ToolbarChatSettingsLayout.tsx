import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ThemeText } from '#base/theme';

/** Generated from `1259_toolbar_chat_settings_xml` (layout "toolbar_chat_settings", 257x269) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarChatSettingsLayoutProps {
    layout?: BoxLayout;
    onBackBtn?: () => void;
    onChatBubbleWidth?: () => void;
    onChatMode?: () => void;
    onChatScrollSpeed?: () => void;
}

export const ToolbarChatSettingsLayout = ({ layout, onBackBtn, onChatBubbleWidth, onChatMode, onChatScrollSpeed }: ToolbarChatSettingsLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 56, width: 144, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('toolbar.chat.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={786576}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, width: 237, top: 24, height: 1 }}
                />
                <Region
                    name="chat_settings_info"
                    params={144}
                    layout={{ position: 'absolute', left: 10, width: 237, top: 33, height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('toolbar.chat.settings.info')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="chat_settings_list"
                    params={144}
                    layout={{ position: 'absolute', left: 10, width: 237, top: 70, height: 143, flexDirection: 'column', gap: 4 }}
                >
                    <Region
                        name="chat_mode_label"
                        params={144}
                        layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('toolbar.chat.settings.mode')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="chat_mode"
                        params={177}
                        onPointerTap={onChatMode}
                        layout={{ width: 237, height: 24, flexShrink: 0 }}
                    />
                    <Region
                        name="chat_bubble_width_label"
                        params={144}
                        layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('toolbar.chat.settings.bubble_width')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="chat_bubble_width"
                        params={177}
                        onPointerTap={onChatBubbleWidth}
                        layout={{ width: 237, height: 24, flexShrink: 0 }}
                    />
                    <Region
                        name="chat_scroll_speed_label"
                        params={144}
                        layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('toolbar.chat.settings.scroll_speed')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="chat_scroll_speed"
                        params={177}
                        onPointerTap={onChatScrollSpeed}
                        layout={{ width: 237, height: 24, flexShrink: 0 }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="back_btn"
                    params={132145}
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, top: 229, height: 28, minWidth: 60, maxWidth: 60, minHeight: 28, maxHeight: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
