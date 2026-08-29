import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TransactionDetailsLayoutDesc1Item } from './TransactionDetailsLayoutDesc1Item';
import { TransactionDetailsLayoutDesc2Item } from './TransactionDetailsLayoutDesc2Item';
import { TransactionDetailsLayoutDesc3Item } from './TransactionDetailsLayoutDesc3Item';
import { TransactionDetailsLayoutSpacerItem } from './TransactionDetailsLayoutSpacerItem';
import { TransactionDetailsLayoutTitleItem } from './TransactionDetailsLayoutTitleItem';

/** Row template `extra_container` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutExtraContainerItemProps {
    itemsExtraInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
    onExtraInfoButton?: () => void;
    visibleExtraInfoBubble?: boolean;
    visibleExtraInfoBubbleTexts?: boolean;
    visibleExtraInfoButton?: boolean;
    visibleExtraPair?: boolean;
}

export const TransactionDetailsLayoutExtraContainerItem = ({ itemsExtraInfoBubbleTexts, layout, onExtraInfoButton, visibleExtraInfoBubble, visibleExtraInfoBubbleTexts, visibleExtraInfoButton, visibleExtraPair }: TransactionDetailsLayoutExtraContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_container"
            layout={{ width: 380, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleExtraPair ?? true) && (
                <Region
                    name="extra_pair"
                    layout={{ position: 'absolute', left: 0, width: 47, top: 0, bottom: 0, flexDirection: 'row', gap: 2 }}
                >
                    <Region layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {t('wiredchests.log_details.extra')}
                    </Region>
                    <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        -
                    </Region>
                </Region>
            )}
            {(visibleExtraInfoButton ?? true) && (
                <Region
                    name="extra_info_button"
                    onPointerTap={onExtraInfoButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 3, width: 20, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_info_grey.png')}
                        layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 18 }}
                    />
                </Region>
            )}
            {(visibleExtraInfoBubble ?? false) && (
                <Bubble
                    variant="7"
                    name="extra_info_bubble"
                    pointer="left"
                    layout={{ position: 'absolute', left: 379, width: 325, top: -79, height: 179 }}
                >
                    {(visibleExtraInfoBubbleTexts ?? true) && (
                        <Region
                            name="extra_info_bubble_texts"
                            layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 147, flexDirection: 'column', gap: 1 }}
                        >
                            {itemsExtraInfoBubbleTexts ?? (
                                <>
                                    <TransactionDetailsLayoutTitleItem />
                                    <TransactionDetailsLayoutSpacerItem />
                                    <TransactionDetailsLayoutDesc1Item />
                                    <TransactionDetailsLayoutDesc2Item />
                                    <TransactionDetailsLayoutDesc3Item />
                                </>
                            )}
                        </Region>
                    )}
                </Bubble>
            )}
        </Region>
    );
};
