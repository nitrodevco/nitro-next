import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1018_notification_gift_locked_xml` (layout "teaser_general", 433x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationGiftLockedLayoutProps {
    captionHeader?: string;
    captionShareTxt?: string;
    captionSkip?: string;
    captionText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onPostBtn?: () => void;
    onSkipBtn?: () => void;
    srcDecoImg?: string;
    srcDialogBg?: string;
}

export const NotificationGiftLockedLayout = ({ captionHeader, captionShareTxt, captionSkip, captionText, layout, onClose, onPostBtn, onSkipBtn, srcDecoImg, srcDialogBg }: NotificationGiftLockedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            id="widget_teaser_frame"
            name="widget_teaser_frame"
            caption={t('widget.furni.teaser.gift.title')}
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 433, height: 260, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="1"
                    name="bg"
                    blend={0}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 227 }}
                >
                    <Border
                        variant="0"
                        name="white_bg"
                        layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 160 }}
                    >
                        <ThemeImage
                            name="dialog_bg"
                            src={srcDialogBg}
                            layout={{ position: 'absolute', left: 1, width: 419, bottom: 1, height: 159 }}
                        />
                    </Border>
                    <Region
                        name="header"
                        layout={{ position: 'absolute', left: 130, width: 282, top: 12, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeader ?? t('widget.furni.teaser.gift.locked.title')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#444444' }}
                        />
                    </Region>
                    <Region
                        name="text"
                        layout={{ position: 'absolute', left: 130, width: 282, top: 31, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionText ?? t('widget.furni.teaser.gift.locked.desc')}
                            textOptions={{ fill: '#888888', wordWrap: true, wordWrapWidth: 282 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="0"
                        name="post_btn"
                        onPointerTap={onPostBtn}
                        layout={{ position: 'absolute', left: 104, width: 306, top: 173, height: 46, minWidth: 306, maxWidth: 306, minHeight: 46, maxHeight: 46, justifyContent: 'center' }}
                    >
                        {t('widget.furni.teaser.gift.title')}
                        <Border
                            variant="3"
                            name="btn_bg_1"
                            tintColor="#006d00"
                            layout={{ position: 'absolute', left: 3, width: 300, top: 3, height: 40, minWidth: 300, maxWidth: 300, minHeight: 40, maxHeight: 40 }}
                        />
                        <Border
                            variant="3"
                            name="btn_bg_2"
                            tintColor="#309d00"
                            layout={{ position: 'absolute', left: 6, width: 294, top: 6, height: 17, minWidth: 294, maxWidth: 294, minHeight: 17, maxHeight: 17 }}
                        />
                        <Region
                            name="share_txt"
                            layout={{ position: 'absolute', width: 294, alignSelf: 'center', marginTop: 3.5, marginBottom: -3.5, height: 33, minWidth: 294, maxWidth: 294, minHeight: 33, maxHeight: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionShareTxt ?? t('widget.furni.teaser.gift.locked.share')}
                                textStyle="text-style-bold"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="skip_btn"
                        tintColor="#999999"
                        onPointerTap={onSkipBtn}
                        layout={{ position: 'absolute', left: 12, width: 80, top: 182, height: 30, minWidth: 80, maxWidth: 80, minHeight: 30, maxHeight: 30 }}
                    >
                        skip
                        <Border
                            variant="3"
                            name="skip_btn_bg1"
                            tintColor="#444444"
                            layout={{ position: 'absolute', left: 2, width: 76, top: 2, height: 26, minWidth: 76, maxWidth: 76, minHeight: 26, maxHeight: 26 }}
                        />
                        <Border
                            variant="3"
                            name="skip_btn_bg2"
                            tintColor="#666666"
                            layout={{ position: 'absolute', left: 4, width: 72, top: 4, height: 11, minWidth: 72, maxWidth: 72, minHeight: 11, maxHeight: 11 }}
                        />
                        <Region
                            name="skip"
                            layout={{ position: 'absolute', left: 4, width: 73, top: 6, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionSkip ?? t('widget.furni.teaser.gift.locked.skip')}
                                textOptions={{ fill: '#cccccc', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ThemeImage
                        name="deco_img"
                        src={srcDecoImg}
                        layout={{ position: 'absolute', left: 23, width: 90, top: 16, height: 90, minWidth: 90, maxWidth: 90, minHeight: 90, maxHeight: 90 }}
                    />
                </Border>
            </Region>
        </Frame>
    );
};
