import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `103_AchievementsResolutions_xml` (layout "AchievementResolutions", 312x525) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsResolutionsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSaveButton?: () => void;
}

export const AchievementsResolutionsLayout = ({ layout, onClose, onSaveButton }: AchievementsResolutionsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={32769}
            caption={t('resolution.title')}
            onClose={onClose}
            layout={{ width: 312, height: 525, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 310, top: 50, height: 389, minWidth: 310, maxWidth: 310 }}
                />
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 310, top: 0, height: 390, maxWidth: 310, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ width: 264, height: 50, flexShrink: 0, minHeight: 50, maxHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('resolution.header')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                        />
                    </Region>
                    <Region
                        name="achievements"
                        params={16}
                        layout={{ width: 290, height: 230, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}
                    />
                    <Region
                        params={147472}
                        layout={{ width: 295, height: 90, flexShrink: 0, flexDirection: 'row' }}
                    >
                        <Region
                            params={147472}
                            layout={{ width: 75, height: 90, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={786448}
                                src={layoutImage('common_star.png')}
                                layout={{ position: 'absolute', left: 0, width: 75, top: 0, height: 90, minHeight: 90, maxHeight: 90 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="achievement_badge"
                                params={16}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 13, width: 50, top: 14, height: 50 }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 220, height: 63, flexShrink: 0, maxWidth: 220, flexDirection: 'column', gap: 5 }}
                        >
                            <Region
                                name="achievement.name"
                                params={16}
                                layout={{ width: 220, height: 17, flexShrink: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Achievement name "
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region
                                name="achievement.description"
                                params={16}
                                layout={{ width: 220, height: 16, flexShrink: 0, minWidth: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Achievement description"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 220, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 153, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('resolution.achievement.level')} />
                                </Region>
                                <Region
                                    name="achievement.level"
                                    params={16}
                                    layout={{ width: 173, height: 15, flexShrink: 0, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0"
                                        textStyle="text-style-il-heading-3"
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Button
                    variant="102"
                    name="save_button"
                    params={917521}
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 63, width: 180, top: 395, height: 30, minWidth: 180, maxWidth: 180 }}
                >
                    {t('resolution.button.ok')}
                </Button>
                <Region
                    name="disabled.reason"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 5, width: 300, top: 403, height: 15, minWidth: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text="Disabled for reason."
                        textStyle="text-style-il-border"
                        textOptions={{ wordWrap: true, wordWrapWidth: 300, align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    params={147472}
                    layout={{ position: 'absolute', left: 103, width: 99, top: 444, height: 37 }}
                />
            </Region>
        </Frame>
    );
};
