import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PremiumPurchaseConfirmationLayoutBenefitBoostRowItem } from './PremiumPurchaseConfirmationLayoutBenefitBoostRowItem';
import { PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem } from './PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem';
import { PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem } from './PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem';
import { PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem } from './PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem';
import { PremiumPurchaseConfirmationLayoutBenefitTasksRowItem } from './PremiumPurchaseConfirmationLayoutBenefitTasksRowItem';
import { PremiumPurchaseConfirmationLayoutDescriptionTxtItem } from './PremiumPurchaseConfirmationLayoutDescriptionTxtItem';
import { PremiumPurchaseConfirmationLayoutSpacingItem } from './PremiumPurchaseConfirmationLayoutSpacingItem';
import { PremiumPurchaseConfirmationLayoutSpacingItem2 } from './PremiumPurchaseConfirmationLayoutSpacingItem2';

/** Named region `benefits` of PremiumPurchaseConfirmationLayout - configured through the parent's `benefits` prop. */
export interface PremiumPurchaseConfirmationLayoutBenefitsProps {
    itemsBenefits?: ReactNode;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutBenefits = ({ itemsBenefits, layout }: PremiumPurchaseConfirmationLayoutBenefitsProps) => {
    return (
        <Region
            name="benefits"
            layout={{ position: 'absolute', left: 146, right: 0, top: 3, height: 205, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsBenefits ?? (
                <>
                    <PremiumPurchaseConfirmationLayoutSpacingItem />
                    <PremiumPurchaseConfirmationLayoutDescriptionTxtItem />
                    <PremiumPurchaseConfirmationLayoutSpacingItem2 />
                    <PremiumPurchaseConfirmationLayoutBenefitBoostRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitTasksRowItem />
                    <PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem />
                </>
            )}
        </Region>
    );
};
