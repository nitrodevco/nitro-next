import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2964_safety_locked_notification_xml` (layout "safety_locked_notification", 192x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SafetyLockedNotificationLayoutProps {
    layout?: BoxLayout;
}

export const SafetyLockedNotificationLayout = ({ layout }: SafetyLockedNotificationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 80, ...layout }}>
            <Border
                variant="6"
                params={273}
                tintColor="#6f6f6f"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 79 }}
            >
                <Region
                    name="info_text"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 174, top: 6, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('notifications.text.safety_locked')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174 }}
                    />
                </Region>
                <Region
                    name="unlock_link_region"
                    params={131089}
                    layout={{ position: 'absolute', left: 8, width: 35, top: 51, height: 18 }}
                >
                    <Region
                        name="unlock_link"
                        layout={{ position: 'absolute', left: 0, width: 147, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('notifications.button.safety_locked_unlock')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
