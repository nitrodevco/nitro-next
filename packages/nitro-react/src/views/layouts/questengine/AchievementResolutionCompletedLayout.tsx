import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `107_AchievementResolutionCompleted_xml` (layout "AchievementResolutionCompleted", 340x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementResolutionCompletedLayoutProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
}

export const AchievementResolutionCompletedLayout = ({ layout, onCancelButton, onClose }: AchievementResolutionCompletedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={49153}
            caption={t('resolution.completed.title')}
            onClose={onClose}
            layout={{ width: 340, height: 273, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: 20, top: 10, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 254, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('resolution.completed.header')}
                            textStyle="text-style-il-heading-title"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 294, height: 40, flexShrink: 0, minHeight: 40, maxHeight: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('resolution.completed.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                        />
                    </Region>
                    <Region
                        params={147472}
                        layout={{ width: 125, height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            params={786448}
                            src={layoutImage('common_hilight_big.png')}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -57.5, width: 120, top: 0, height: 120, minHeight: 120, maxHeight: 120 }}
                        />
                        <ThemeImage
                            params={786448}
                            src={layoutImage('icons_hilighter_yellow.png')}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -38.5, width: 81, top: 20, height: 90, minHeight: 90, maxHeight: 90 }}
                        />
                        <WidgetSlot
                            widgetType="badge_image"
                            name="achievement_badge"
                            params={16}
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 39, width: 50, top: 37, height: 50 }}
                        />
                    </Region>
                    <Region
                        name="cancel_button"
                        params={17}
                        onPointerTap={onCancelButton}
                        cursor="pointer"
                        layout={{ width: 294, height: 23, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 294, top: 0, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('resolution.completed.close')}
                                textStyle="text-style-il-link-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 294, align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
