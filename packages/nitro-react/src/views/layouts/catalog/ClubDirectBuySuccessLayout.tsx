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
            params={33025}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 428, height: 227, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    backgroundColor="#4d4d4d"
                    layout={{ position: 'absolute', left: -2, width: 426, top: -3, height: 135 }}
                >
                    <ThemeImage
                        name="teaser_image"
                        params={16}
                        src={srcTeaserImage ?? '${image.library.url}directVipBuy/success_teaser_image_HC.png'}
                        layout={{ position: 'absolute', left: 12, width: 105, top: 13, height: 111 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 131, width: 289, top: 15, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('direct.club.buy.success.congratulations')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 131, width: 292, top: 51, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('direct.club.buy.success.text.line.1')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 292 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 131, width: 287, top: 78, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('direct.club.buy.success.text.line.2')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 287 }}
                        />
                    </Region>
                </Region>
                <ButtonThick
                    variant="3"
                    name="button_ok"
                    params={393233}
                    onPointerTap={onButtonOk}
                    layout={{ position: 'absolute', right: 10, width: 213, top: 148, height: 29 }}
                >
                    {t('direct.club.buy.success.ok.button')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
