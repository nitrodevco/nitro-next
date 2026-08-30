import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1101_packagecard_xml` (layout "packagecard", 374x243) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardLayoutProps {
    captionText?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onClose2?: () => void;
    onOpen?: () => void;
    srcGiftImage?: string;
    srcImageBg?: string;
    tintGiftImage?: string;
    tintImageBg?: string;
}

export const PackagecardLayout = ({ captionText, captionTitle, layout, onClose, onClose2, onOpen, srcGiftImage, srcImageBg, tintGiftImage, tintImageBg }: PackagecardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 374, height: 243, minWidth: 374, minHeight: 243, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 211 }}
            >
                <ThemeImage
                    name="image_bg"
                    src={srcImageBg}
                    tint={tintImageBg}
                    layout={{ position: 'absolute', left: 10, width: 114, top: 16, height: 114 }}
                />
                <ThemeImage
                    name="gift_image"
                    src={srcGiftImage}
                    tint={tintGiftImage}
                    layout={{ position: 'absolute', left: 10, width: 114, top: 16, height: 114 }}
                />
                <ThemeText
                    text={captionTitle ?? t('widget.furni.present.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 216 }}
                    name="title"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 135, width: 216, top: 16, height: 52 }}
                />
                <ThemeText
                    text={captionText ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 219 }}
                    name="text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 135, width: 219, top: 68, height: 80 }}
                />
                <Region
                    name="state_content"
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 6, width: 350, top: 156, height: 50 }}
                >
                    <Region
                        backgroundColor="#eeeeee"
                        layout={{ position: 'absolute', left: 0, width: 351, top: 0, bottom: 0 }}
                    >
                        <Region
                            name="close"
                            onPointerTap={onClose2}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 14, width: 100, bottom: 9, height: 33 }}
                        >
                            <ThemeText
                                text={t('widget.furni.present.close')}
                                textOptions={{ align: 'center' }}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 22 }}
                            />
                        </Region>
                        <ButtonThick
                            variant="5"
                            name="open"
                            tintColor="#00aa00"
                            onPointerTap={onOpen}
                            layout={{ position: 'absolute', left: 214, width: 130, bottom: 10, height: 30, minWidth: 130 }}
                        >
                            {t('widget.furni.present.open')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Border>
        </Frame>
    );
};
