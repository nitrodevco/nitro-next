import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { ChestUpgradeLayoutButtonsItem } from './ChestUpgradeLayoutButtonsItem';
import { ChestUpgradeLayoutCurrentCapacityItem } from './ChestUpgradeLayoutCurrentCapacityItem';
import { ChestUpgradeLayoutErrorTextItem } from './ChestUpgradeLayoutErrorTextItem';
import { ChestUpgradeLayoutNewCapacityItem } from './ChestUpgradeLayoutNewCapacityItem';
import { ChestUpgradeLayoutProductNameItem } from './ChestUpgradeLayoutProductNameItem';

/** Named region `content` of ChestUpgradeLayout - configured through the parent's `content` prop. */
export interface ChestUpgradeLayoutContentProps {
    captionPlus?: string;
    captionPriceCredits?: string;
    captionPriceDiamonds?: string;
    itemsContent?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    onAmountSelectionDropmenu?: () => void;
    srcProductImage?: string;
    tintProductImage?: string;
}

export const ChestUpgradeLayoutContent = ({ captionPlus, captionPriceCredits, captionPriceDiamonds, itemsContent, itemsPropertiesItemlist, layout, onAmountSelectionDropmenu, srcProductImage, tintProductImage }: ChestUpgradeLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: 2, top: 8, bottom: 38, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <ChestUpgradeLayoutErrorTextItem />
                    <ChestUpgradeLayoutButtonsItem />
                </>
            )}
            <Region layout={{ width: 349, height: 164, flexShrink: 0 }}>
                <Border
                    variant="0"
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                >
                    <ThemeImage
                        name="product_image"
                        src={srcProductImage}
                        tint={tintProductImage}
                        layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                    />
                </Border>
                <Region
                    name="properties_itemlist"
                    layout={{ position: 'absolute', left: 143, right: 9, top: 15, height: 132, flexDirection: 'column', gap: 4 }}
                >
                    {itemsPropertiesItemlist ?? (
                        <>
                            <ChestUpgradeLayoutProductNameItem />
                            <ChestUpgradeLayoutCurrentCapacityItem />
                            <ChestUpgradeLayoutNewCapacityItem />
                        </>
                    )}
                    <Region layout={{ width: 276, height: 25, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                        <Region layout={{ width: 213, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {t('wiredchests.upgrade.capacity.amount')}
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="amount_selection_dropmenu"
                            onPointerTap={onAmountSelectionDropmenu}
                            layout={{ width: 58, height: 25, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
                <Region layout={{ position: 'absolute', left: 142, width: 356, top: 137, height: 22, flexDirection: 'row' }}>
                    <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="purchase_cost_box"
                        layout={{ width: 88, height: 25, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 25, flexDirection: 'row', gap: 2 }}>
                            <Region
                                name="price_credits"
                                layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {captionPriceCredits ?? '0'}
                            </Region>
                            <Icon
                                variant="34"
                                layout={{ width: 22, height: 22, flexShrink: 0 }}
                            />
                            <Region
                                name="plus"
                                layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {captionPlus ?? ' '}
                            </Region>
                            <Region
                                name="price_diamonds"
                                layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {captionPriceDiamonds ?? '0'}
                            </Region>
                            <Icon
                                variant="41"
                                layout={{ width: 22, height: 22, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
