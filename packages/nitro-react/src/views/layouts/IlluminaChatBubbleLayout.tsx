import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2026_illumina_chat_bubble_xml` (layout "chat_bubble", 259x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaChatBubbleLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayout = ({ layout }: IlluminaChatBubbleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 259, height: 80, ...layout }}>
            <Region
                params={147600}
                layout={{ position: 'absolute', left: 0, width: 259, top: 0, height: 80 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 56 }}
                >
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        params={16}
                        layout={{ position: 'absolute', left: -19, width: 90, top: -21, height: 130 }}
                    />
                </Region>
                <ThemeImage
                    name="arrow_point"
                    params={16}
                    src={layoutImage('illumina_light_bubble_chat_arrow.png')}
                    layout={{ position: 'absolute', left: 47, width: 5, top: 39, height: 10 }}
                />
                <Region
                    name="bubble_wrapper"
                    params={147472}
                    layout={{ position: 'absolute', left: 52, width: 207, top: 15, height: 65, flexDirection: 'column' }}
                >
                    <Region
                        name="user_name_region"
                        params={147473}
                        layout={{ width: 31, height: 15, flexShrink: 0 }}
                    >
                        <Region
                            name="user_name"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="USER:"
                                textStyle="text-style-il-border"
                                textOptions={{ fill: '#555555' }}
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="106"
                        params={147472}
                        layout={{ width: 207, height: 18, flexShrink: 0 }}
                    >
                        <Region
                            name="message_region"
                            params={147473}
                            layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18 }}
                        >
                            <Region
                                name="spaced_message_container"
                                params={147472}
                                layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 18, flexDirection: 'column' }}
                            >
                                <Region
                                    name="spacing"
                                    params={16}
                                    layout={{ width: 0, height: 7, flexShrink: 0 }}
                                />
                                <Region
                                    name="message_container"
                                    params={147472}
                                    layout={{ width: 0, height: 4, flexShrink: 0, flexDirection: 'column' }}
                                >
                                    <Region
                                        name="message_template"
                                        params={16}
                                        layout={{ width: 207, height: 4, flexShrink: 0, minHeight: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    />
                                    <Region
                                        name="habbicon_template"
                                        params={16}
                                        visible={false}
                                        layout={{ width: 80, height: 80, flexShrink: 0 }}
                                    >
                                        <ThemeImage
                                            name="habbicon_bitmap"
                                            params={16}
                                            src={undefined}
                                            layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="spacing"
                                    params={16}
                                    layout={{ width: 0, height: 7, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                    </Border>
                    <WidgetSlot
                        widgetType="updating_timestamp"
                        name="post_time"
                        params={147472}
                        layout={{ width: 131, height: 16, flexShrink: 0 }}
                    />
                    <Region
                        name="offline_placeholder"
                        params={147473}
                        layout={{ width: 250, height: 16, flexShrink: 0 }}
                    >
                        <Region
                            name="offline"
                            params={16400}
                            layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('messenger.notification.persisted_message_sent')} />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
