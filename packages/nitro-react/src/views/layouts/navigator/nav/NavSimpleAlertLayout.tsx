import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `3047_nav_simple_alert_xml` (layout "simple_alert", 193x157) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavSimpleAlertLayoutProps {
    captionBodyText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const NavSimpleAlertLayout = ({ captionBodyText, layout, onClose, onOk }: NavSimpleAlertLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="alert_%203"
            name="alert_%203"
            caption="PH Caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 193, height: 157, ...layout }}
        >
            <Region
                name="body_text"
                layout={{ position: 'absolute', left: 12, width: 160, top: 14, height: 78, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBodyText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                />
            </Region>
            <Button
                variant="3"
                name="ok"
                onPointerTap={onOk}
                layout={{ position: 'absolute', left: 62, width: 60, top: 97, height: 22, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.ok')}
            </Button>
        </Frame>
    );
};
