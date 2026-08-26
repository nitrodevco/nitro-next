import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1562_targeted_offer_habbomall_xml` (layout "targeted_offer_habbomall", 268x362) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferHabbomallLayoutProps {
    layout?: BoxLayout;
    onBtnBuy?: () => void;
    onClose?: () => void;
}

export const TargetedOfferHabbomallLayout = ({ layout, onBtnBuy, onClose }: TargetedOfferHabbomallLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 268, height: 362, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="bmp_illustration"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 10, width: 240, top: 6, height: 140 }}
                />
                <Border
                    variant="3"
                    params={16}
                    tintColor="#ffde5a"
                    layout={{ position: 'absolute', left: 10, width: 240, top: 153, height: 122 }}
                >
                    <Region
                        name="txt_title"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 225, top: 8, height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    />
                    <Region
                        name="txt_description"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 224, top: 40, height: 75, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('targeted.offer.habbomall.notification')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 224 }}
                        />
                    </Region>
                </Border>
                <ButtonThick
                    variant="6"
                    name="btn_buy"
                    params={131089}
                    tintColor="#4faf4f"
                    onPointerTap={onBtnBuy}
                    layout={{ position: 'absolute', left: 53, width: 197, top: 284, height: 30 }}
                >
                    {t('targeted.offer.open.habbomall')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
