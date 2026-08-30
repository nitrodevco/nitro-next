import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `70_citizenship_welcome_xml` (layout "citizenship_welcome", 480x302) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CitizenshipWelcomeLayoutProps {
    layout?: BoxLayout;
    onFrameClose?: () => void;
    onPostponeCitizenship?: () => void;
    onShowCitizenship?: () => void;
}

export const CitizenshipWelcomeLayout = ({ layout, onFrameClose, onPostponeCitizenship, onShowCitizenship }: CitizenshipWelcomeLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 480, height: 302, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Frame
                    variant="101"
                    caption={t('citizenship.promo.popup.title')}
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 282 }}
                >
                    <Region layout={{ position: 'absolute', left: 14, top: 37, flexDirection: 'column', gap: 10 }}>
                        <ThemeText
                            text={t('citizenship.promo.popup.heading')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ wordWrap: true, wordWrapWidth: 334 }}
                            verticalAlign="top"
                            layout={{ width: 334, height: 35, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('citizenship.promo.popup.description.1')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                            verticalAlign="top"
                            layout={{ width: 294, height: 40, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('citizenship.promo.popup.description.2')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                            verticalAlign="top"
                            layout={{ width: 294, height: 28, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 449, height: 79, flexShrink: 0, justifyContent: 'center' }}>
                            <Button
                                variant="100"
                                name="show_citizenship"
                                onPointerTap={onShowCitizenship}
                                layout={{ position: 'absolute', width: 139, top: 0, height: 52 }}
                            >
                                {t('citizenship.promo.popup.open.button')}
                            </Button>
                            <Region
                                name="postpone_citizenship"
                                onPointerTap={onPostponeCitizenship}
                                cursor="pointer"
                                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 228, top: 40, height: 22 }}
                            >
                                <ThemeText
                                    text={t('citizenship.promo.popup.close.button')}
                                    textStyle="text-style-il-link-regular"
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 6, height: 16 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <ThemeImage
                        src="${image.library.url}talent/welcome.png"
                        layout={{ position: 'absolute', left: 330, width: 178, top: 28, height: 193 }}
                    />
                </Frame>
                <ThemeText
                    text={t('citizenship.promo.popup.subtitle')}
                    textStyle="text-style-il-small-white"
                    layout={{ position: 'absolute', left: 10, width: 98, top: 7, height: 14 }}
                />
            </Region>
        </Region>
    );
};
