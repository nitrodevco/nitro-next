import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1787_habbo_window_alert_link_xml` (layout "habbo_window_alert", 278x181) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWindowAlertLinkLayoutProps {
    layout?: BoxLayout;
    onAlertButtonLink?: () => void;
    onAlertButtonOk?: () => void;
    onClose?: () => void;
}

export const HabboWindowAlertLinkLayout = ({ layout, onAlertButtonLink, onAlertButtonOk, onClose }: HabboWindowAlertLinkLayoutProps) => {
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
            layout={{ width: 278, height: 181, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="_alert_description"
                    tags={[ 'DESCRIPTION' ]}
                    params={8388624}
                    layout={{ position: 'absolute', left: 27, width: 210, top: 13, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Alert"
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="_alert_button_link"
                    tags={[ 'LINK' ]}
                    params={918545}
                    onPointerTap={onAlertButtonLink}
                    layout={{ position: 'absolute', left: 157, width: 81, top: 118, height: 24, minWidth: 50 }}
                >
                    Open URL
                </ButtonThick>
                <Region
                    name="_alert_button_ok"
                    tags={[ 'OK' ]}
                    params={918529}
                    layout={{ position: 'absolute', left: 21, width: 82, top: 121, height: 17, minWidth: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onAlertButtonOk}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('generic.ok')}
                        textStyle="text-style-u-regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
