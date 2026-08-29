import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryTradingLayoutBoldTextItem } from './InventoryTradingLayoutBoldTextItem';
import { InventoryTradingLayoutItemGridBorder0, InventoryTradingLayoutItemGridBorder0Props } from './InventoryTradingLayoutItemGridBorder0';
import { InventoryTradingLayoutPlainTextItem } from './InventoryTradingLayoutPlainTextItem';

/** Named region `offers_0` of InventoryTradingLayout - configured through the parent's `offers0` prop. */
export interface InventoryTradingLayoutOffers0Props {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionInfoText0?: string;
    itemGridBorder0?: InventoryTradingLayoutItemGridBorder0Props;
    itemsTextList0?: ReactNode;
    layout?: BoxLayout;
    srcLock0?: string;
    visibleInfoText0?: boolean;
}

export const InventoryTradingLayoutOffers0 = ({ captionContentText1A, captionContentText1B, captionInfoText0, itemGridBorder0, itemsTextList0, layout, srcLock0, visibleInfoText0 }: InventoryTradingLayoutOffers0Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_0"
            layout={{ position: 'absolute', left: 17, width: 200, top: 29, height: 200, ...layout }}
        >
            <Region
                name="text_list_0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
            >
                {itemsTextList0 ?? (
                    <>
                        <InventoryTradingLayoutBoldTextItem />
                        <InventoryTradingLayoutPlainTextItem />
                    </>
                )}
            </Region>
            <InventoryTradingLayoutItemGridBorder0 {...itemGridBorder0} />
            {(visibleInfoText0 ?? false) && (
                <Region
                    name="info_text_0"
                    layout={{ position: 'absolute', left: 34, width: 132, top: 23, height: 132, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText0 ?? t('inventory.trading.warning.own_account_disabled')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                    />
                </Region>
            )}
            <Region
                name="content_text_1_a"
                layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentText1A ?? ''}
            </Region>
            <Region
                name="content_text_1_b"
                layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentText1B ?? ''}
            </Region>
            <ThemeImage
                name="lock_0"
                src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
                layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
            />
        </Region>
    );
};
