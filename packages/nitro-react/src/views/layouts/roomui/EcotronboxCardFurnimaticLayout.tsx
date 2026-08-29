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
                layout={{ position: 'absolute', left: 0, width: 257, top: 0, height: 114 }}
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
                    layout={{ position: 'absolute', left: 7, width: 39, top: 38, height: 39 }}
                />
                <ButtonThick
                    variant="0"
                    name="ecotronbox_card_btn_open"
                    onPointerTap={onEcotronboxCardBtnOpen}
                    layout={{ position: 'absolute', left: 47, width: 205, top: 90, height: 22 }}
                >
                    {t('widget.furni.furnimaticbox.open')}
                </ButtonThick>
                <Button
                    variant="0"
                    name="ecotronbox_card_btn_close"
                    onPointerTap={onEcotronboxCardBtnClose}
                    layout={{ position: 'absolute', left: 200, width: 85, top: 90, height: 22 }}
                >
                    {t('generic.close')}
                </Button>
                <Region
                    name="ecotronbox_card_msg"
                    layout={{ position: 'absolute', left: 49, width: 139, top: 39, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEcotronboxCardMsg ?? t('widget.furni.furnimaticbox.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 139 }}
                    />
                </Region>
                <Region
                    name="ecotronbox_card_date"
                    layout={{ position: 'absolute', left: 12, width: 104, top: 9, height: 12, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEcotronboxCardDate ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 104 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
