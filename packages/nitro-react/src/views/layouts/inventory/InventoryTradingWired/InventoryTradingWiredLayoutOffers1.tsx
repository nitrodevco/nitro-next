import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { InventoryTradingWiredLayoutItemGridBorder1, InventoryTradingWiredLayoutItemGridBorder1Props } from './InventoryTradingWiredLayoutItemGridBorder1';
import { InventoryTradingWiredLayoutPlainTextItem2 } from './InventoryTradingWiredLayoutPlainTextItem2';

/** Named region `offers_1` of InventoryTradingWiredLayout - configured through the parent's `offers1` prop. */
export interface InventoryTradingWiredLayoutOffers1Props {
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionInfoText1?: string;
    itemGridBorder1?: InventoryTradingWiredLayoutItemGridBorder1Props;
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
    visibleInfoText1?: boolean;
}

export const InventoryTradingWiredLayoutOffers1 = ({ captionContentText2A, captionContentText2B, captionInfoText1, itemGridBorder1, itemsTextList1, layout, visibleInfoText1 }: InventoryTradingWiredLayoutOffers1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_1"
            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, ...layout }}
        >
            <Region
                name="text_list_1"
                layout={{ position: 'absolute', left: 54, right: 56, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
            >
                {itemsTextList1 ?? (
                    <InventoryTradingWiredLayoutPlainTextItem2 />
                )}
            </Region>
            <InventoryTradingWiredLayoutItemGridBorder1 {...itemGridBorder1} />
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
                layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText2A ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="content_text_2_b"
                layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText2B ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};
