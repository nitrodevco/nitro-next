import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { InventoryTradingWiredLayoutItemGridBorder0, InventoryTradingWiredLayoutItemGridBorder0Props } from './InventoryTradingWiredLayoutItemGridBorder0';
import { InventoryTradingWiredLayoutPlainTextItem } from './InventoryTradingWiredLayoutPlainTextItem';

/** Named region `offers_0` of InventoryTradingWiredLayout - configured through the parent's `offers0` prop. */
export interface InventoryTradingWiredLayoutOffers0Props {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionInfoText0?: string;
    itemGridBorder0?: InventoryTradingWiredLayoutItemGridBorder0Props;
    itemsTextList0?: ReactNode;
    layout?: BoxLayout;
    visibleInfoText0?: boolean;
}

export const InventoryTradingWiredLayoutOffers0 = ({ captionContentText1A, captionContentText1B, captionInfoText0, itemGridBorder0, itemsTextList0, layout, visibleInfoText0 }: InventoryTradingWiredLayoutOffers0Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_0"
            layout={{ position: 'absolute', left: 17, width: 200, top: 29, height: 200, ...layout }}
        >
            <Region
                name="text_list_0"
                layout={{ position: 'absolute', left: 52, right: 53, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
            >
                {itemsTextList0 ?? (
                    <InventoryTradingWiredLayoutPlainTextItem />
                )}
            </Region>
            <InventoryTradingWiredLayoutItemGridBorder0 {...itemGridBorder0} />
            {(visibleInfoText0 ?? false) && (
                <ThemeText
                    text={captionInfoText0 ?? t('inventory.trading.warning.own_account_disabled')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                    name="info_text_0"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 34, width: 132, top: 23, height: 132 }}
                />
            )}
            <Region
                name="content_text_1_a"
                layout={{ position: 'absolute', left: 0, right: 0, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText1A ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="content_text_1_b"
                layout={{ position: 'absolute', left: 0, right: 0, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText1B ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};
