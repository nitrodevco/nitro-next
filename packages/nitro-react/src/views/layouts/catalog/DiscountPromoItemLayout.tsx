import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1561_discountPromoItem_xml` (layout "discountPromoItem", 180x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscountPromoItemLayoutProps {
    layout?: BoxLayout;
    promoContainer?: DiscountPromoItemLayoutPromoContainerProps;
}

export const DiscountPromoItemLayout = ({ layout, promoContainer }: DiscountPromoItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 20, ...layout }}>
            <DiscountPromoItemLayoutPromoContainer {...promoContainer} />
        </Region>
    );
};

/** Named region `background` of DiscountPromoItemLayout - configured through the parent's `background` prop. */
export interface DiscountPromoItemLayoutBackgroundProps {
    layout?: BoxLayout;
}

export const DiscountPromoItemLayoutBackground = ({ layout }: DiscountPromoItemLayoutBackgroundProps) => {
    return (
        <Region
            name="background"
            params={128}
            backgroundColor="#009100"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `click_region` of DiscountPromoItemLayout - configured through the parent's `clickRegion` prop. */
export interface DiscountPromoItemLayoutClickRegionProps {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const DiscountPromoItemLayoutClickRegion = ({ layout, onClickRegion }: DiscountPromoItemLayoutClickRegionProps) => {
    return (
        <Region
            name="click_region"
            params={17}
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 25, width: 152, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `promo_container` of DiscountPromoItemLayout - configured through the parent's `promoContainer` prop. */
export interface DiscountPromoItemLayoutPromoContainerProps {
    background?: DiscountPromoItemLayoutBackgroundProps;
    captionPromoText?: string;
    captionPromoTextEffect?: string;
    clickRegion?: DiscountPromoItemLayoutClickRegionProps;
    layout?: BoxLayout;
    srcIconBitmap?: string;
}

export const DiscountPromoItemLayoutPromoContainer = ({ background, captionPromoText, captionPromoTextEffect, clickRegion, layout, srcIconBitmap }: DiscountPromoItemLayoutPromoContainerProps) => {
    return (
        <Region
            name="promo_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 20, minHeight: 20, maxHeight: 20, ...layout }}
        >
            <DiscountPromoItemLayoutBackground {...background} />
            <ThemeImage
                name="icon_bitmap"
                src={srcIconBitmap}
                layout={{ position: 'absolute', left: 4, width: 15, top: 2, height: 15 }}
            />
            <Region
                name="promo_text_effect"
                layout={{ position: 'absolute', left: 33, width: 151, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionPromoTextEffect ?? 'test 1 get 2 tests for free!'} />
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
            <DiscountPromoItemLayoutClickRegion {...clickRegion} />
        </Region>
    );
};
