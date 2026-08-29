import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1561_discountPromoItem_xml` (layout "discountPromoItem", 180x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscountPromoItemLayoutProps {
    background?: ReactNode;
    captionPromoText?: string;
    captionPromoTextEffect?: string;
    clickRegion?: ReactNode;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    srcIconBitmap?: string;
    tintIconBitmap?: string;
}

export const DiscountPromoItemLayout = ({ background, captionPromoText, captionPromoTextEffect, clickRegion, layout, onClickRegion, srcIconBitmap, tintIconBitmap }: DiscountPromoItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 20, ...layout }}>
            <Region
                name="promo_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 20, maxHeight: 20 }}
            >
                <Region
                    name="background"
                    backgroundColor="#009100"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {background}
                </Region>
                <ThemeImage
                    name="icon_bitmap"
                    src={srcIconBitmap}
                    tint={tintIconBitmap}
                    layout={{ position: 'absolute', left: 4, width: 15, top: 2, height: 15 }}
                />
                <Region
                    name="promo_text_effect"
                    layout={{ position: 'absolute', left: 33, width: 151, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPromoTextEffect ?? 'test 1 get 2 tests for free!'}
                </Region>
                <Region
                    name="promo_text"
                    layout={{ position: 'absolute', left: 32, width: 151, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPromoText ?? 'test 1 get 2 tests for free!'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 25, width: 152, top: 0, bottom: 0 }}
                >
                    {clickRegion}
                </Region>
            </Region>
        </Region>
    );
};
