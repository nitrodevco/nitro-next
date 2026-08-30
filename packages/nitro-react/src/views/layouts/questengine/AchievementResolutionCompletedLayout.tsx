import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `107_AchievementResolutionCompleted_xml` (layout "AchievementResolutionCompleted", 340x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementResolutionCompletedLayoutProps {
    achievementBadge?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
}

export const AchievementResolutionCompletedLayout = ({ achievementBadge, layout, onCancelButton, onClose }: AchievementResolutionCompletedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('resolution.completed.title')}
            onClose={onClose}
            layout={{ width: 340, height: 273, minWidth: 340, minHeight: 273, maxHeight: 525, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: 3, marginRight: -3, top: 10, bottom: 0, flexDirection: 'column', gap: 5 }}>
                    <ThemeText
                        text={t('resolution.completed.header')}
                        textStyle="text-style-il-heading-title"
                        layout={{ width: 254, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24 }}
                    />
                    <ThemeText
                        text={t('resolution.completed.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 40, flexShrink: 0, minHeight: 40, maxHeight: 40 }}
                    />
                    <Region layout={{ width: 125, height: 120, flexShrink: 0, justifyContent: 'center' }}>
                        <ThemeImage
                            src={layoutImage('common_hilight_big.png')}
                            layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 120, top: 0, height: 120, minHeight: 120, maxHeight: 120 }}
                        />
                        <ThemeImage
                            src={layoutImage('icons_hilighter_yellow.png')}
                            layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 81, bottom: 10, height: 90, minHeight: 90, maxHeight: 90 }}
                        />
                        <WidgetSlot
                            widgetType="badge_image"
                            name="achievement_badge"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 50, alignSelf: 'center', marginTop: 2, marginBottom: -2, height: 50 }}
                        >
                            {achievementBadge}
                        </WidgetSlot>
                    </Region>
                    <Region
                        name="cancel_button"
                        onPointerTap={onCancelButton}
                        cursor="pointer"
                        layout={{ alignSelf: 'stretch', height: 23, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('resolution.completed.close')}
                            textStyle="text-style-il-link-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 294, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 7 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
