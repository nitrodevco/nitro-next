import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `879_notification_teaser_xml` (layout "teaser_general", 433x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationTeaserLayoutProps {
    captionCongrats?: string;
    captionDescription?: string;
    captionOk?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onTeaserOkBtn?: () => void;
    srcDecoImg?: string;
    srcDialogBg?: string;
}

export const NotificationTeaserLayout = ({ captionCongrats, captionDescription, captionOk, layout, onClose, onTeaserOkBtn, srcDecoImg, srcDialogBg }: NotificationTeaserLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            id="widget_teaser_frame"
            name="widget_teaser_frame"
            caption={t('widget.furni.teaser.title')}
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 433, height: 260, ...layout }}
        >
            <Border
                variant="0"
                tintColor="#4c4c4c"
                blend={0}
                layout={{ position: 'absolute', left: 0, width: 421, top: 0, height: 228 }}
            >
                <Border
                    variant="0"
                    name="white_border"
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 160 }}
                />
                <Region
                    name="congrats"
                    layout={{ position: 'absolute', left: 130, width: 247, top: 12, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCongrats ?? t('widget.furni.teaser.congrats')}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 130, width: 283, top: 32, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('widget.furni.teaser.description')}
                        textOptions={{ fill: '#888888', wordWrap: true, wordWrapWidth: 283 }}
                    />
                </Region>
                <ContainerButton
                    variant="1"
                    name="teaser_ok_btn"
                    onPointerTap={onTeaserOkBtn}
                    layout={{ position: 'absolute', left: 56, width: 306, top: 173, height: 46, minWidth: 306, maxWidth: 306, minHeight: 46, maxHeight: 46, justifyContent: 'center' }}
                >
                    <Border
                        variant="3"
                        name="ok_btn_bg1"
                        tintColor="#006d00"
                        layout={{ position: 'absolute', left: 3, width: 300, top: 3, height: 40 }}
                    />
                    <Border
                        variant="3"
                        tintColor="#309d00"
                        layout={{ position: 'absolute', left: 6, width: 294, top: 6, height: 17 }}
                    />
                    <Region
                        name="ok"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 295, alignSelf: 'center', marginTop: 3, marginBottom: -3, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOk ?? t('widget.furni.teaser.get')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <ThemeImage
                    name="dialog_bg"
                    src={srcDialogBg}
                    layout={{ position: 'absolute', left: 1, width: 418, bottom: 68, height: 160 }}
                />
                <ThemeImage
                    name="deco_img"
                    src={srcDecoImg}
                    layout={{ position: 'absolute', left: 20, width: 90, top: 15, height: 90, minWidth: 90, maxWidth: 90, minHeight: 90, maxHeight: 90 }}
                />
            </Border>
        </Frame>
    );
};
