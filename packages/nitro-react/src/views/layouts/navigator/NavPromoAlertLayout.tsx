import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `2995_nav_promo_alert_xml` (layout "simple_alert", 224x182) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavPromoAlertLayoutProps {
    captionBodyText?: string;
    captionPromoText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const NavPromoAlertLayout = ({ captionBodyText, captionPromoText, layout, onClose, onOk }: NavPromoAlertLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="alert_%203"
            name="alert_%203"
            params={32769}
            caption="PH Caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 224, height: 182, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="body_text"
                    params={1}
                    layout={{ position: 'absolute', left: 7, width: 186, top: 12, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBodyText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="ok"
                    params={131089}
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', left: 76, width: 60, top: 122, height: 24, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.ok')}
                </Button>
                <Region
                    name="promo_container"
                    params={17}
                    layout={{ position: 'absolute', left: 7, width: 199, top: 72, height: 43 }}
                >
                    <Icon
                        variant="16"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 44, top: 3, height: 43 }}
                    />
                    <Region
                        name="promo_text"
                        params={16}
                        layout={{ position: 'absolute', left: 46, width: 144, top: 6, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPromoText ?? t('002_lorem_ipsum_content')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 144 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
