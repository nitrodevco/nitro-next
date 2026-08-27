import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `957_notification_gift_alert_xml` (layout "teaser_general", 433x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationGiftAlertLayoutProps {
    captionAlertDesc?: string;
    captionAlertTitle?: string;
    captionOpenTxt?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onNoFbBtn?: () => void;
}

export const NotificationGiftAlertLayout = ({ captionAlertDesc, captionAlertTitle, captionOpenTxt, layout, onClose, onNoFbBtn }: NotificationGiftAlertLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            id="widget_teaser_frame"
            name="widget_teaser_frame"
            tags={[ 'room_widget_teaser' ]}
            params={32769}
            caption={t('widget.furni.teaser.gift.title')}
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 433, height: 260, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="1"
                    name="bg"
                    params={16}
                    blend={0}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 227 }}
                >
                    <Border
                        variant="0"
                        name="white_bg"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 160 }}
                    />
                    <Region
                        name="alert_title"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 400, top: 12, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAlertTitle ?? t('widget.furni.teaser.gift.title')}
                            textOptions={{ fill: '#444444' }}
                        />
                    </Region>
                    <Region
                        name="alert_desc"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 400, top: 31, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAlertDesc ?? t('widget.furni.teaser.gift.title')}
                            textOptions={{ fill: '#888888', wordWrap: true, wordWrapWidth: 400 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="0"
                        name="no_fb_btn"
                        params={17}
                        onPointerTap={onNoFbBtn}
                        layout={{ position: 'absolute', left: 55, width: 306, top: 173, height: 46, minWidth: 306, maxWidth: 306, minHeight: 46, maxHeight: 46 }}
                    >
                        {t('widget.furni.teaser.gift.title')}
                        <Border
                            variant="3"
                            name="btn_bg_1"
                            params={16}
                            tintColor="#006d00"
                            layout={{ position: 'absolute', left: 3, width: 300, top: 3, height: 40, minWidth: 300, maxWidth: 300, minHeight: 40, maxHeight: 40 }}
                        />
                        <Border
                            variant="3"
                            name="btn_bg_2"
                            params={16}
                            tintColor="#309d00"
                            layout={{ position: 'absolute', left: 6, width: 294, top: 6, height: 17, minWidth: 294, maxWidth: 294, minHeight: 17, maxHeight: 17 }}
                        />
                        <Region
                            name="open_txt"
                            params={3932176}
                            layout={{ position: 'absolute', left: 6, width: 294, top: 11, height: 33, minWidth: 294, maxWidth: 294, minHeight: 33, maxHeight: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionOpenTxt ?? t('generic.ok')}
                                textStyle="text-style-bold"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                </Border>
            </Region>
        </Frame>
    );
};
