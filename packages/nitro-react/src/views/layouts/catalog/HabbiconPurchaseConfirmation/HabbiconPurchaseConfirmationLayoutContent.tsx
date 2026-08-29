import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutButtonsItem } from './HabbiconPurchaseConfirmationLayoutButtonsItem';
import { HabbiconPurchaseConfirmationLayoutTopBodyItem } from './HabbiconPurchaseConfirmationLayoutTopBodyItem';
import { HabbiconPurchaseConfirmationLayoutValueAreaItem } from './HabbiconPurchaseConfirmationLayoutValueAreaItem';

/** Named region `content` of HabbiconPurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface HabbiconPurchaseConfirmationLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutContent = ({ itemsContent, layout }: HabbiconPurchaseConfirmationLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: -10, top: 8, height: 250, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutTopBodyItem />
                    <HabbiconPurchaseConfirmationLayoutValueAreaItem />
                    <HabbiconPurchaseConfirmationLayoutButtonsItem />
                </>
            )}
        </Region>
    );
};
