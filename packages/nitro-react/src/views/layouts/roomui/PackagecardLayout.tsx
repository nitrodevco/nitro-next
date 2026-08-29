import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1101_packagecard_xml` (layout "packagecard", 374x243) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardLayoutProps {
    captionText?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    srcGiftImage?: string;
    srcImageBg?: string;
    stateContent?: PackagecardLayoutStateContentProps;
}

export const PackagecardLayout = ({ captionText, captionTitle, layout, onClose, srcGiftImage, srcImageBg, stateContent }: PackagecardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 374, height: 243, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 211 }}
            >
                <ThemeImage
                    name="image_bg"
                    src={srcImageBg}
                    layout={{ position: 'absolute', left: 10, width: 114, top: 16, height: 114 }}
                />
                <ThemeImage
                    name="gift_image"
                    src={srcGiftImage}
                    layout={{ position: 'absolute', left: 10, width: 114, top: 16, height: 114 }}
                />
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 135, width: 216, top: 16, height: 52, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('widget.furni.present.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 216 }}
                    />
                </Region>
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 135, width: 219, top: 68, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 219 }}
                    />
                </Region>
                <PackagecardLayoutStateContent {...stateContent} />
            </Border>
        </Frame>
    );
};

/** Named region `close` of PackagecardLayout - configured through the parent's `close` prop. */
export interface PackagecardLayoutCloseProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardLayoutClose = ({ layout, onClose }: PackagecardLayoutCloseProps) => {
    const t = useTranslation();

    return (
        <Region
            name="close"
            onPointerTap={onClose}
            cursor="pointer"
            layout={{ position: 'absolute', left: 14, width: 100, bottom: 9, height: 33, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 100, top: 9, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('widget.furni.present.close')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `state_content` of PackagecardLayout - configured through the parent's `stateContent` prop. */
export interface PackagecardLayoutStateContentProps {
    close?: PackagecardLayoutCloseProps;
    layout?: BoxLayout;
    onOpen?: () => void;
}

export const PackagecardLayoutStateContent = ({ close, layout, onOpen }: PackagecardLayoutStateContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="state_content"
            backgroundColor="#eaece8"
            layout={{ position: 'absolute', left: 6, width: 350, top: 156, height: 50, ...layout }}
        >
            <Region
                backgroundColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, width: 351, top: 0, height: 50 }}
            >
                <PackagecardLayoutClose {...close} />
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
    );
};
