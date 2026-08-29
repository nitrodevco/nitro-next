import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryTradingLayoutBoldTextItem2 } from './InventoryTradingLayoutBoldTextItem2';
import { InventoryTradingLayoutItemGridBorder1, InventoryTradingLayoutItemGridBorder1Props } from './InventoryTradingLayoutItemGridBorder1';
import { InventoryTradingLayoutPlainTextItem2 } from './InventoryTradingLayoutPlainTextItem2';

/** Named region `offers_1` of InventoryTradingLayout - configured through the parent's `offers1` prop. */
export interface InventoryTradingLayoutOffers1Props {
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionInfoText1?: string;
    itemGridBorder1?: InventoryTradingLayoutItemGridBorder1Props;
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
    srcLock1?: string;
    visibleInfoText1?: boolean;
}

export const InventoryTradingLayoutOffers1 = ({ captionContentText2A, captionContentText2B, captionInfoText1, itemGridBorder1, itemsTextList1, layout, srcLock1, visibleInfoText1 }: InventoryTradingLayoutOffers1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_1"
            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, ...layout }}
        >
            <Region
                name="text_list_1"
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
            >
                {itemsTextList1 ?? (
                    <>
                        <InventoryTradingLayoutBoldTextItem2 />
                        <InventoryTradingLayoutPlainTextItem2 />
                    </>
                )}
            </Region>
            <InventoryTradingLayoutItemGridBorder1 {...itemGridBorder1} />
            {(visibleInfoText1 ?? false) && (
                <Region
                    name="info_text_1"
                    layout={{ position: 'absolute', left: 34, width: 132, top: 23, height: 132, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText1 ?? t('inventory.trading.warning.others_account_disabled')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                    />
                </Region>
            )}
            <Region
                name="content_text_2_a"
                layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentText2A ?? ''}
            </Region>
            <Region
                name="content_text_2_b"
                layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentText2B ?? ''}
            </Region>
            <ThemeImage
                name="lock_1"
                src={srcLock1 ?? layoutImage('inventory_trading_trading_locked_icon.png')}
                layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
            />
        </Region>
    );
};
