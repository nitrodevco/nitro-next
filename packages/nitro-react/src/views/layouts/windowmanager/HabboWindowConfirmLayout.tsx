import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1755_habbo_window_confirm_xml` (layout "habbo_window_confirm", 300x165) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWindowConfirmLayoutProps {
    captionAlertButtonCancel?: string;
    captionAlertDescription?: string;
    layout?: BoxLayout;
    onAlertButtonCancel?: () => void;
    onAlertButtonOk?: () => void;
    onClose?: () => void;
}

export const HabboWindowConfirmLayout = ({ captionAlertButtonCancel, captionAlertDescription, layout, onAlertButtonCancel, onAlertButtonOk, onClose }: HabboWindowConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="_alert_frame"
            name="_alert_frame"
            caption="Alert"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 300, height: 165, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="_alert_description"
                    layout={{ position: 'absolute', left: 16, width: 253, top: 14, minHeight: 72, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlertDescription ?? 'Alert'}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 253 }}
                    />
                </Region>
                <Region
                    name="_alert_button_cancel"
                    layout={{ position: 'absolute', left: 20, width: 100, bottom: 46, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onAlertButtonCancel}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionAlertButtonCancel ?? t('generic.cancel')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="_alert_button_ok"
                    tintColor="#efefef"
                    onPointerTap={onAlertButtonOk}
                    layout={{ position: 'absolute', marginLeft: 71, marginRight: -71, width: 50, bottom: 39, height: 28, minWidth: 50 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
