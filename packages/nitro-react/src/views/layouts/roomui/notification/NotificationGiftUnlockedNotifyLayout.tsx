import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `986_notification_gift_unlocked_notify_xml` (layout "teaser_general", 433x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationGiftUnlockedNotifyLayoutProps {
    captionHeader?: string;
    captionOpenTxt?: string;
    captionText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onReceivedOkBtn?: () => void;
    srcDecoImg?: string;
    srcDialogBg?: string;
    tintDecoImg?: string;
    tintDialogBg?: string;
}

export const NotificationGiftUnlockedNotifyLayout = ({ captionHeader, captionOpenTxt, captionText, layout, onClose, onReceivedOkBtn, srcDecoImg, srcDialogBg, tintDecoImg, tintDialogBg }: NotificationGiftUnlockedNotifyLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            id="widget_teaser_frame"
            name="widget_teaser_frame"
            caption={t('widget.furni.teaser.gift.title')}
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 433, height: 260, minWidth: 433, minHeight: 260, ...layout }}
        >
            <Border
                variant="1"
                name="bg"
                blend={0}
                layout={{ position: 'absolute', left: 0, right: 1, top: 0, bottom: -8 }}
            >
                <Border
                    variant="0"
                    name="white_bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 160 }}
                >
                    <ThemeImage
                        name="dialog_bg"
                        src={srcDialogBg}
                        tint={tintDialogBg}
                        layout={{ position: 'absolute', left: 1, width: 419, bottom: 1, height: 159 }}
                    />
                </Border>
                <ThemeText
                    text={captionHeader ?? t('widget.furni.teaser.notify.unlocked.title')}
                    textStyle="text-style-bold"
                    textOptions={{ fill: '#444444' }}
                    name="header"
                    layout={{ position: 'absolute', right: 8, width: 282, top: 12, height: 21 }}
                />
                <ThemeText
                    text={captionText ?? t('widget.furni.teaser.notify.unlocked.desc')}
                    textOptions={{ fill: '#888888', wordWrap: true, wordWrapWidth: 282 }}
                    name="text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 8, width: 282, top: 31, height: 120 }}
                />
                <ContainerButton
                    variant="0"
                    name="received_ok_btn"
                    onPointerTap={onReceivedOkBtn}
                    layout={{ position: 'absolute', left: 51, width: 306, bottom: 9, height: 46, minWidth: 306, maxWidth: 306, minHeight: 46, maxHeight: 46, justifyContent: 'center' }}
                >
                    <Border
                        variant="3"
                        name="btn_bg_1"
                        tintColor="#006d00"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3, minWidth: 300, maxWidth: 300, minHeight: 40, maxHeight: 40 }}
                    />
                    <Border
                        variant="3"
                        name="btn_bg_2"
                        tintColor="#309d00"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 6, height: 17, minWidth: 294, maxWidth: 294, minHeight: 17, maxHeight: 17 }}
                    />
                    <ThemeText
                        text={captionOpenTxt ?? t('generic.ok')}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="open_txt"
                        layout={{ position: 'absolute', width: 294, alignSelf: 'center', marginTop: 4.5, marginBottom: -4.5, height: 33, minWidth: 294, maxWidth: 294, minHeight: 33, maxHeight: 33 }}
                    />
                </ContainerButton>
                <ThemeImage
                    name="deco_img"
                    src={srcDecoImg}
                    tint={tintDecoImg}
                    layout={{ position: 'absolute', left: 23, width: 90, top: 16, height: 90, minWidth: 90, maxWidth: 90, minHeight: 90, maxHeight: 90 }}
                />
            </Border>
        </Frame>
    );
};
