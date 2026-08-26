import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `13_element_concurrentusersinfo_xml` (layout "element_concurrentusersinfo", 185x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementConcurrentusersinfoLayoutProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const ElementConcurrentusersinfoLayout = ({ layout, onActionButton }: ElementConcurrentusersinfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 185, height: 70, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 70 }}
            >
                <Region
                    name="state.active"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 30 }}
                >
                    <Region
                        name="users_desc"
                        tags={[ 'COLORABLE' ]}
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.concurrentusers.info')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 185 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="state.achieved"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 80 }}
                >
                    <ThemeImage
                        name="badge_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 9, width: 38, top: 3, height: 38 }}
                    />
                    <Region
                        name="badge_desc"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 50, width: 130, top: 7, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.concurrentusers.reward')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="action_button"
                        params={131089}
                        onPointerTap={onActionButton}
                        layout={{ position: 'absolute', left: -10, width: 200, top: 30, height: 48, minWidth: 160, maxWidth: 200, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('landing.view.concurrentusers.redeem')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
