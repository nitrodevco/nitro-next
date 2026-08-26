import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `104_AchievementResolutionProgress_xml` (layout "AchievementResolutionProgress", 419x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementResolutionProgressLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onResetButton?: () => void;
}

export const AchievementResolutionProgressLayout = ({ layout, onClose, onResetButton }: AchievementResolutionProgressLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={49153}
            caption={t('resolution.progress.title')}
            onClose={onClose}
            layout={{ width: 419, height: 273, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 430, top: 0, height: 225, flexDirection: 'column', gap: 10 }}
                >
                    <Border
                        variant="102"
                        params={16}
                        layout={{ width: 404, height: 112, flexShrink: 0, minWidth: 338 }}
                    >
                        <Region
                            params={147472}
                            layout={{ position: 'absolute', left: 11, width: 387, top: 10, height: 97, flexDirection: 'row', gap: 10 }}
                        >
                            <Region
                                params={147472}
                                layout={{ width: 82, height: 90, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={786448}
                                    src={layoutImage('icons_hilighter_yellow.png')}
                                    layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 90, minHeight: 90, maxHeight: 90 }}
                                />
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="achievement_badge"
                                    params={16}
                                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                    layout={{ position: 'absolute', left: 16, width: 50, top: 15, height: 50 }}
                                />
                            </Region>
                            <Region
                                params={147472}
                                layout={{ width: 295, height: 75, flexShrink: 0, flexDirection: 'column', gap: 5 }}
                            >
                                <Region
                                    name="achievement.name"
                                    params={16}
                                    layout={{ width: 110, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Achievement name"
                                        textStyle="text-style-il-heading-2"
                                    />
                                </Region>
                                <Region
                                    name="achievement.desc"
                                    params={16}
                                    layout={{ width: 294, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Achievement description"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                                    />
                                </Region>
                                <Button
                                    variant="102"
                                    name="reset_button"
                                    params={131217}
                                    onPointerTap={onResetButton}
                                    layout={{ width: 153, height: 32, flexShrink: 0 }}
                                >
                                    {t('resolution.progress.reset')}
                                </Button>
                            </Region>
                        </Region>
                    </Border>
                    <Region
                        name="progress_main_container"
                        params={16}
                        layout={{ width: 404, height: 42, flexShrink: 0 }}
                    >
                        <Region
                            name="progress_container"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 404, top: 0, height: 16 }}
                        >
                            <ThemeImage
                                name="unachieved_left"
                                params={16}
                                src={layoutImage('talent_unachieved_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="unachieved_mid"
                                params={16}
                                src={layoutImage('talent_unachieved_mid.png')}
                                layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="unachieved_right"
                                params={16}
                                src={layoutImage('talent_unachieved_right.png')}
                                layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="achieved_left"
                                params={16}
                                src={layoutImage('talent_achieved_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="achieved_mid"
                                params={16}
                                src={layoutImage('talent_achieved_mid.png')}
                                layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="achieved_right"
                                params={16}
                                src={layoutImage('talent_achieved_right.png')}
                                layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
                            />
                        </Region>
                        <Region
                            name="progress_text"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 404, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('resolution.progress.progress')}
                                textStyle="text-style-il-heading-2"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('illumina_horizontal_separator.png')}
                        layout={{ width: 404, height: 2, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 404, height: 39, flexShrink: 0 }}
                    >
                        <WidgetSlot
                            widgetType="countdown"
                            name="time_left_widget"
                            params={147472}
                            layout={{ position: 'absolute', left: 142, width: 99, top: 1, height: 37 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: -11, width: 144, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={t('resolution.progress.time.left')}
                                textStyle="text-style-u-headline-small"
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
