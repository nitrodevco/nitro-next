import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `13_element_concurrentusersinfo_xml` (layout "element_concurrentusersinfo", 185x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementConcurrentusersinfoLayoutProps {
    captionBadgeDesc?: string;
    captionUsersDesc?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    onActionButton?: () => void;
    srcBadgeImage?: string;
    visibleStateAchieved?: boolean;
}

export const ElementConcurrentusersinfoLayout = ({ captionBadgeDesc, captionUsersDesc, colorableTextColor, layout, onActionButton, srcBadgeImage, visibleStateAchieved }: ElementConcurrentusersinfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 185, height: 70, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="state.active"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
                >
                    <Region
                        name="users_desc"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUsersDesc ?? t('landing.view.concurrentusers.info')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 185 }}
                        />
                    </Region>
                </Region>
                {(visibleStateAchieved ?? false) && (
                    <Region
                        name="state.achieved"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
                    >
                        <ThemeImage
                            name="badge_image"
                            src={srcBadgeImage}
                            layout={{ position: 'absolute', left: 9, width: 38, top: 3, height: 38 }}
                        />
                        <Region
                            name="badge_desc"
                            layout={{ position: 'absolute', left: 50, width: 130, top: 7, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBadgeDesc ?? t('landing.view.concurrentusers.reward')}
                                textStyle="text-style-il-heading-3"
                                textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 130 }}
                            />
                        </Region>
                        <Button
                            variant="100"
                            name="action_button"
                            onPointerTap={onActionButton}
                            layout={{ position: 'absolute', left: -10, width: 200, top: 30, height: 48, minWidth: 160, maxWidth: 200, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('landing.view.concurrentusers.redeem')}
                        </Button>
                    </Region>
                )}
            </Region>
        </Region>
    );
};
