import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { ChestGenericLayoutCrule1Item } from './ChestGenericLayoutCrule1Item';
import { ChestGenericLayoutCrule2Item } from './ChestGenericLayoutCrule2Item';
import { ChestGenericLayoutCrule3Item } from './ChestGenericLayoutCrule3Item';
import { ChestGenericLayoutCrule4Item } from './ChestGenericLayoutCrule4Item';
import { ChestGenericLayoutCtitleItem } from './ChestGenericLayoutCtitleItem';
import { ChestGenericLayoutRule1Item } from './ChestGenericLayoutRule1Item';
import { ChestGenericLayoutRule2Item } from './ChestGenericLayoutRule2Item';
import { ChestGenericLayoutRule3Item } from './ChestGenericLayoutRule3Item';
import { ChestGenericLayoutRule4Item } from './ChestGenericLayoutRule4Item';
import { ChestGenericLayoutRule5Item } from './ChestGenericLayoutRule5Item';
import { ChestGenericLayoutRule6Item } from './ChestGenericLayoutRule6Item';
import { ChestGenericLayoutRule7Item } from './ChestGenericLayoutRule7Item';
import { ChestGenericLayoutSpacerrItem } from './ChestGenericLayoutSpacerrItem';
import { ChestGenericLayoutSpacerrItem2 } from './ChestGenericLayoutSpacerrItem2';
import { ChestGenericLayoutSpacerrItem3 } from './ChestGenericLayoutSpacerrItem3';
import { ChestGenericLayoutTitleItem } from './ChestGenericLayoutTitleItem';

/** Named region `lock_info_bubble_texts` of ChestGenericLayout - configured through the parent's `lockInfoBubbleTexts` prop. */
export interface ChestGenericLayoutLockInfoBubbleTextsProps {
    itemsLockInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutLockInfoBubbleTexts = ({ itemsLockInfoBubbleTexts, layout }: ChestGenericLayoutLockInfoBubbleTextsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="lock_info_bubble_texts"
            layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 504, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsLockInfoBubbleTexts ?? (
                <>
                    <ChestGenericLayoutTitleItem />
                    <ChestGenericLayoutSpacerrItem />
                    <ChestGenericLayoutRule1Item />
                    <ChestGenericLayoutRule2Item />
                    <ChestGenericLayoutRule3Item />
                    <ChestGenericLayoutRule4Item />
                    <ChestGenericLayoutRule5Item />
                    <ChestGenericLayoutRule6Item />
                    <ChestGenericLayoutRule7Item />
                    <ChestGenericLayoutSpacerrItem2 />
                    <ChestGenericLayoutCtitleItem />
                    <ChestGenericLayoutSpacerrItem3 />
                    <ChestGenericLayoutCrule1Item />
                    <ChestGenericLayoutCrule2Item />
                    <ChestGenericLayoutCrule3Item />
                    <ChestGenericLayoutCrule4Item />
                </>
            )}
            <Region layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('wiredchests.lock_info.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                />
            </Region>
            <Region layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('wiredchests.capacity_info.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                />
            </Region>
        </Region>
    );
};
