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
            params={32769}
            caption="Alert"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 300, height: 165, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="_alert_description"
                    tags={[ 'DESCRIPTION' ]}
                    params={8388624}
                    layout={{ position: 'absolute', left: 16, width: 253, top: 14, height: 72, minHeight: 72, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlertDescription ?? 'Alert'}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 253 }}
                    />
                </Region>
                <Region
                    name="_alert_button_cancel"
                    params={132097}
                    layout={{ position: 'absolute', left: 20, width: 100, top: 102, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                    tags={[ 'OK' ]}
                    params={918545}
                    tintColor="#efefef"
                    onPointerTap={onAlertButtonOk}
                    layout={{ position: 'absolute', left: 196, width: 50, top: 98, height: 28, minWidth: 50 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
