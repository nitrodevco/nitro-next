import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2883_pending_bully_request_xml` (layout "pending_bully_request", 369x228) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingBullyRequestLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const PendingBullyRequestLayout = ({ layout, onClose, onCloseButton }: PendingBullyRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            params={163841}
            caption={t('guide.pending.bully.title')}
            onClose={onClose}
            layout={{ width: 369, height: 228, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 8, width: 351, top: 2, height: 192, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 188, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.bully.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#c30000' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 295, height: 24, flexShrink: 0, minWidth: 295, maxWidth: 295, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.bully.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                        />
                    </Region>
                    <Border
                        variant="102"
                        params={16}
                        layout={{ width: 295, height: 88, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 13, width: 133, top: 12, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.pending.bully.report')}
                                textStyle="text-style-il-border"
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <Region
                            name="user_name"
                            params={16}
                            layout={{ position: 'absolute', left: 37, width: 42, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="user123"
                                textStyle="text-style-il-border"
                            />
                        </Region>
                        <Region
                            name="room_name"
                            params={16}
                            layout={{ position: 'absolute', left: 37, width: 135, top: 42, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.pending.bully.room')}
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="user_avatar"
                            params={3932176}
                            options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                            layout={{ position: 'absolute', left: 13, width: 18, top: 34, height: 19 }}
                        />
                        <WidgetSlot
                            widgetType="updating_timestamp"
                            name="timestamp"
                            params={147472}
                            layout={{ position: 'absolute', left: 13, width: 4, top: 62, height: 4 }}
                        />
                    </Border>
                    <Region
                        params={16}
                        layout={{ width: 370, height: 52, flexShrink: 0 }}
                    >
                        <Button
                            variant="101"
                            name="close_button"
                            params={131281}
                            tintColor="#bbbbbb"
                            onPointerTap={onCloseButton}
                            layout={{ position: 'absolute', left: 115, width: 140, top: 0, height: 48 }}
                        >
                            {t('alert.close.button')}
                        </Button>
                    </Region>
                </Region>
                <ThemeImage
                    params={1040}
                    src={layoutImage('help_illustrations_bully.png')}
                    layout={{ position: 'absolute', left: 320, width: 35, top: 39, height: 120 }}
                />
            </Region>
        </Frame>
    );
};
