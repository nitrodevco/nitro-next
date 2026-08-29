import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2906_welcome_tour_popup_xml` (layout "welcome_tour_popup", 435x222) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeTourPopupLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onTakeTour?: () => void;
    refuseTour?: WelcomeTourPopupLayoutRefuseTourProps;
}

export const WelcomeTourPopupLayout = ({ layout, onClose, onTakeTour, refuseTour }: WelcomeTourPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('help.tour.popup.action.accept')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 435, height: 222, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_frank_greeting.png')}
                layout={{ position: 'absolute', left: -4, width: 433, top: 5, height: 221 }}
            />
            <Region layout={{ position: 'absolute', left: 89, top: 15, flexDirection: 'column', gap: 4 }}>
                <Region layout={{ width: 326, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.tour.popup.title')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ wordWrap: true, wordWrapWidth: 326 }}
                    />
                </Region>
                <Region layout={{ width: 313, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.tour.popup.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 313 }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 83, width: 306, top: 80, height: 134, justifyContent: 'center' }}>
                <Button
                    variant="3"
                    name="take_tour"
                    onPointerTap={onTakeTour}
                    layout={{ position: 'absolute', width: 226, top: 44, height: 28 }}
                >
                    {t('help.tour.popup.action.accept')}
                </Button>
                <WelcomeTourPopupLayoutRefuseTour {...refuseTour} />
                <Border
                    variant="3"
                    blend={0.7}
                    visible={false}
                    layout={{ position: 'absolute', left: 1, width: 304, top: 88, height: 45 }}
                >
                    <Region layout={{ position: 'absolute', left: 11, width: 283, top: 9, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.tour.popup.hint')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 283 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `refuse_tour` of WelcomeTourPopupLayout - configured through the parent's `refuseTour` prop. */
export interface WelcomeTourPopupLayoutRefuseTourProps {
    layout?: BoxLayout;
    onRefuseTour?: () => void;
    visibleRefuseTour?: boolean;
}

export const WelcomeTourPopupLayoutRefuseTour = ({ layout, onRefuseTour, visibleRefuseTour }: WelcomeTourPopupLayoutRefuseTourProps) => {
    const t = useTranslation();

    return (
        <Region
            name="refuse_tour"
            visible={visibleRefuseTour ?? false}
            onPointerTap={onRefuseTour}
            cursor="pointer"
            layout={{ position: 'absolute', width: 168, top: 57, height: 16, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 168, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('help.tour.popup.action.refuse')} />
            </Region>
        </Region>
    );
};
