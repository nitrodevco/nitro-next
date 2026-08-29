import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

import { AchievementsResolutionsLayoutElementList, AchievementsResolutionsLayoutElementListProps } from './AchievementsResolutionsLayoutElementList';

/** Generated from `103_AchievementsResolutions_xml` (layout "AchievementResolutions", 312x525) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsResolutionsLayoutProps {
    captionDisabledReason?: string;
    countdownWidget?: ReactNode;
    elementList?: AchievementsResolutionsLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onSaveButton?: () => void;
    visibleDisabledReason?: boolean;
}

export const AchievementsResolutionsLayout = ({ captionDisabledReason, countdownWidget, elementList, layout, onClose, onSaveButton, visibleDisabledReason }: AchievementsResolutionsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('resolution.title')}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 312, height: 525, minWidth: 312, maxWidth: 312, minHeight: 525, maxHeight: 525, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Border
                    variant="103"
                    layout={{ position: 'absolute', left: 0, right: -10, alignSelf: 'center', marginTop: 2.5, marginBottom: -2.5, height: 389, minWidth: 310, maxWidth: 310 }}
                />
                <AchievementsResolutionsLayoutElementList {...elementList} />
                <Button
                    variant="102"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', marginLeft: 3, marginRight: -3, width: 180, top: 395, height: 30, minWidth: 180, maxWidth: 180 }}
                >
                    {t('resolution.button.ok')}
                </Button>
                {(visibleDisabledReason ?? false) && (
                    <Region
                        name="disabled.reason"
                        layout={{ position: 'absolute', left: 5, right: -5, top: 403, height: 15, minWidth: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionDisabledReason ?? 'Disabled for reason.'}
                            textStyle="text-style-il-border"
                            textOptions={{ wordWrap: true, wordWrapWidth: 300, align: 'center' }}
                        />
                    </Region>
                )}
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 99, bottom: 3, height: 37 }}
                >
                    {countdownWidget}
                </WidgetSlot>
            </Region>
        </Frame>
    );
};
