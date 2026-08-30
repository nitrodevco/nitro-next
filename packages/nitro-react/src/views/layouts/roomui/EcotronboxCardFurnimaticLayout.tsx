import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `899_ecotronbox_card_furnimatic_xml` (layout "ecotron_box_card", 257x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EcotronboxCardFurnimaticLayoutProps {
    captionEcotronboxCardDate?: string;
    captionEcotronboxCardMsg?: string;
    layout?: BoxLayout;
    onEcotronboxCardBtnClose?: () => void;
    onEcotronboxCardBtnOpen?: () => void;
    onEcotronboxContainer?: () => void;
    srcEcotronboxCardBg?: string;
    srcEcotronboxCardPreview?: string;
    tintEcotronboxCardPreview?: string;
}

export const EcotronboxCardFurnimaticLayout = ({ captionEcotronboxCardDate, captionEcotronboxCardMsg, layout, onEcotronboxCardBtnClose, onEcotronboxCardBtnOpen, onEcotronboxContainer, srcEcotronboxCardBg, srcEcotronboxCardPreview, tintEcotronboxCardPreview }: EcotronboxCardFurnimaticLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 257, height: 114, ...layout }}>
            <Region
                name="ecotronbox_container"
                onPointerTap={onEcotronboxContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="ecotronbox_card_bg"
                    src={srcEcotronboxCardBg ?? '${image.library.url}Giftcards/ecotronbox_card_bg_furnimatic.png'}
                    layout={{ position: 'absolute', left: 0, width: 257, top: 0, height: 114 }}
                />
                <ThemeImage
                    name="ecotronbox_card_preview"
                    src={srcEcotronboxCardPreview}
                    tint={tintEcotronboxCardPreview}
                    layout={{ position: 'absolute', left: 7, width: 39, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 39 }}
                />
                <ButtonThick
                    variant="0"
                    name="ecotronbox_card_btn_open"
                    onPointerTap={onEcotronboxCardBtnOpen}
                    layout={{ position: 'absolute', right: 5, width: 205, bottom: 2, height: 22 }}
                >
                    {t('widget.furni.furnimaticbox.open')}
                </ButtonThick>
                <Button
                    variant="0"
                    name="ecotronbox_card_btn_close"
                    onPointerTap={onEcotronboxCardBtnClose}
                    layout={{ position: 'absolute', left: 200, width: 85, bottom: 2, height: 22 }}
                >
                    {t('generic.close')}
                </Button>
                <ThemeText
                    text={captionEcotronboxCardMsg ?? t('widget.furni.furnimaticbox.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 139 }}
                    name="ecotronbox_card_msg"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 49, width: 139, top: 39, height: 45 }}
                />
                <ThemeText
                    text={captionEcotronboxCardDate ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 104 }}
                    name="ecotronbox_card_date"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, width: 104, top: 9, height: 12 }}
                />
            </Region>
        </Region>
    );
};
