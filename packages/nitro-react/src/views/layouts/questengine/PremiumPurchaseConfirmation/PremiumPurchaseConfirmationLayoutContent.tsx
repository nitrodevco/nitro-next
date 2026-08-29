import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { PremiumPurchaseConfirmationLayoutCreditsIconItem } from './PremiumPurchaseConfirmationLayoutCreditsIconItem';
import { PremiumPurchaseConfirmationLayoutDiamondsIconItem } from './PremiumPurchaseConfirmationLayoutDiamondsIconItem';
import { PremiumPurchaseConfirmationLayoutPlusTxtItem } from './PremiumPurchaseConfirmationLayoutPlusTxtItem';
import { PremiumPurchaseConfirmationLayoutPriceCreditsItem } from './PremiumPurchaseConfirmationLayoutPriceCreditsItem';
import { PremiumPurchaseConfirmationLayoutPriceDiamondsItem } from './PremiumPurchaseConfirmationLayoutPriceDiamondsItem';
import { PremiumPurchaseConfirmationLayoutTopBody, PremiumPurchaseConfirmationLayoutTopBodyProps } from './PremiumPurchaseConfirmationLayoutTopBody';

/** Named region `content` of PremiumPurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface PremiumPurchaseConfirmationLayoutContentProps {
    itemsPrice?: ReactNode;
    layout?: BoxLayout;
    topBody?: PremiumPurchaseConfirmationLayoutTopBodyProps;
}

export const PremiumPurchaseConfirmationLayoutContent = ({ itemsPrice, layout, topBody }: PremiumPurchaseConfirmationLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 12, right: 0, top: 20, height: 268, ...layout }}
        >
            <PremiumPurchaseConfirmationLayoutTopBody {...topBody} />
            <Border
                variant="15"
                name="purchase_cost_box"
                tintColor="#f7e7ff"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 10, height: 38 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 241, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textOptions={{ fill: '#57356b' }}
                    />
                </Region>
                <Region
                    name="price"
                    layout={{ position: 'absolute', right: 15, width: 87, top: 8, height: 22, flexDirection: 'row', gap: 3 }}
                >
                    {itemsPrice ?? (
                        <>
                            <PremiumPurchaseConfirmationLayoutPriceCreditsItem />
                            <PremiumPurchaseConfirmationLayoutCreditsIconItem />
                            <PremiumPurchaseConfirmationLayoutPlusTxtItem />
                            <PremiumPurchaseConfirmationLayoutPriceDiamondsItem />
                            <PremiumPurchaseConfirmationLayoutDiamondsIconItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
