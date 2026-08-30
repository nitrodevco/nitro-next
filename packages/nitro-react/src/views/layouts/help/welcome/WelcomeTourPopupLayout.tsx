import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2906_welcome_tour_popup_xml` (layout "welcome_tour_popup", 435x222) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeTourPopupLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onRefuseTour?: () => void;
    onTakeTour?: () => void;
    visibleRefuseTour?: boolean;
}

export const WelcomeTourPopupLayout = ({ layout, onClose, onRefuseTour, onTakeTour, visibleRefuseTour }: WelcomeTourPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('help.tour.popup.action.accept')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 435, height: 222, minWidth: 435, minHeight: 222, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_frank_greeting.png')}
                layout={{ position: 'absolute', left: -4, width: 433, top: 5, height: 221 }}
            />
            <Region layout={{ position: 'absolute', left: 89, top: 15, flexDirection: 'column', gap: 4 }}>
                <ThemeText
                    text={t('help.tour.popup.title')}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ wordWrap: true, wordWrapWidth: 326 }}
                    verticalAlign="top"
                    layout={{ width: 326, height: 21, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('help.tour.popup.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 313 }}
                    verticalAlign="top"
                    layout={{ width: 313, height: 44, flexShrink: 0 }}
                />
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
                {(visibleRefuseTour ?? false) && (
                    <Region
                        name="refuse_tour"
                        onPointerTap={onRefuseTour}
                        cursor="pointer"
                        layout={{ position: 'absolute', width: 168, top: 57, height: 16 }}
                    >
                        {/* `text` is hidden and has no name to show it by */}
                    </Region>
                )}
                {/* `border` is hidden and has no name to show it by */}
            </Region>
        </Frame>
    );
};
