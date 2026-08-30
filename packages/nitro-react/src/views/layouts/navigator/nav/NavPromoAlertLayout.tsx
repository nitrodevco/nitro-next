import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `2995_nav_promo_alert_xml` (layout "simple_alert", 224x182) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavPromoAlertLayoutProps {
    captionBodyText?: string;
    captionPromoText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
    onPromoContainer?: () => void;
}

export const NavPromoAlertLayout = ({ captionBodyText, captionPromoText, layout, onClose, onOk, onPromoContainer }: NavPromoAlertLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="alert_%203"
            name="alert_%203"
            caption="PH Caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 224, height: 182, minWidth: 224, minHeight: 182, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeText
                    text={captionBodyText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                    name="body_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 7, width: 186, top: 12, height: 57 }}
                />
                <Button
                    variant="3"
                    name="ok"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', width: 60, bottom: -5, height: 24, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.ok')}
                </Button>
                <Region
                    name="promo_container"
                    onPointerTap={onPromoContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 7, right: 6, top: 72, height: 43 }}
                >
                    <Icon
                        variant="16"
                        layout={{ position: 'absolute', left: 0, width: 44, top: 3, height: 43 }}
                    />
                    <ThemeText
                        text={captionPromoText ?? t('002_lorem_ipsum_content')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 144 }}
                        name="promo_text"
                        verticalAlign="top"
                        layout={{ position: 'absolute', right: 9, width: 144, top: 6, bottom: 3 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
