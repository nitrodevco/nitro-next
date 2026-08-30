import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1615_club_direct_buy_success_xml` (layout "club_direct_buy_success", 428x227) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubDirectBuySuccessLayoutProps {
    layout?: BoxLayout;
    onButtonOk?: () => void;
    onClose?: () => void;
    srcTeaserImage?: string;
}

export const ClubDirectBuySuccessLayout = ({ layout, onButtonOk, onClose, srcTeaserImage }: ClubDirectBuySuccessLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 428, height: 227, minWidth: 428, minHeight: 227, ...layout }}
        >
            <Region
                backgroundColor="#4d4d4d"
                layout={{ position: 'absolute', left: -2, right: -8, top: -3, height: 135 }}
            >
                <ThemeImage
                    name="teaser_image"
                    src={srcTeaserImage ?? '${image.library.url}directVipBuy/success_teaser_image_HC.png'}
                    layout={{ position: 'absolute', left: 12, width: 105, bottom: 11, height: 111 }}
                />
                <ThemeText
                    text={t('direct.club.buy.success.congratulations')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                    layout={{ position: 'absolute', right: 6, width: 289, top: 15, height: 24 }}
                />
                <ThemeText
                    text={t('direct.club.buy.success.text.line.1')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 292 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 3, width: 292, alignSelf: 'center', marginTop: -2.5, marginBottom: 2.5, height: 28 }}
                />
                <ThemeText
                    text={t('direct.club.buy.success.text.line.2')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 287 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 8, width: 287, bottom: 7, height: 50 }}
                />
            </Region>
            <ButtonThick
                variant="3"
                name="button_ok"
                onPointerTap={onButtonOk}
                layout={{ position: 'absolute', right: -2, width: 213, bottom: 9, height: 29 }}
            >
                {t('direct.club.buy.success.ok.button')}
            </ButtonThick>
        </Frame>
    );
};
