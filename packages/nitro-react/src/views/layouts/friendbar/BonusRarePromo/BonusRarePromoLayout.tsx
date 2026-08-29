import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage } from '#base/theme';

import { BonusRarePromoLayoutMidContainer, BonusRarePromoLayoutMidContainerProps } from './BonusRarePromoLayoutMidContainer';

/** Generated from `39_bonus_rare_promo_xml` (layout "bonus_rare_promo", 602x75) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BonusRarePromoLayoutProps {
    layout?: BoxLayout;
    midContainer?: BonusRarePromoLayoutMidContainerProps;
    onBuyButton?: () => void;
    srcPreview?: string;
    srcPromoImage?: string;
    tintPreview?: string;
    visiblePreview?: boolean;
}

export const BonusRarePromoLayout = ({ layout, midContainer, onBuyButton, srcPreview, srcPromoImage, tintPreview, visiblePreview }: BonusRarePromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 602, height: 75, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 602, top: 0, height: 75 }}>
                <Border
                    variant="105"
                    blend={0.2}
                    layout={{ position: 'absolute', left: 1, width: 600, top: 5, height: 63 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 63, flexDirection: 'row' }}>
                        <Region
                            name="teaser_image_container"
                            layout={{ width: 96, height: 63, flexShrink: 0 }}
                        >
                            {(visiblePreview ?? false) && (
                                <ThemeImage
                                    name="preview"
                                    src={srcPreview}
                                    tint={tintPreview}
                                    layout={{ position: 'absolute', left: 27, width: 44, top: 12, height: 38 }}
                                />
                            )}
                            <ThemeImage
                                name="promo_image"
                                src={srcPromoImage}
                                layout={{ position: 'absolute', left: 8, width: 80, top: -9, height: 80 }}
                            />
                        </Region>
                        <BonusRarePromoLayoutMidContainer {...midContainer} />
                        <Region
                            name="button_container"
                            layout={{ width: 200, height: 56, flexShrink: 0 }}
                        >
                            <Button
                                variant="100"
                                name="buy_button"
                                onPointerTap={onBuyButton}
                                layout={{ position: 'absolute', right: 0, width: 200, top: 5, height: 51, maxWidth: 200 }}
                            >
                                {t('landing.view.bonus.rare.open.credits.page')}
                            </Button>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
