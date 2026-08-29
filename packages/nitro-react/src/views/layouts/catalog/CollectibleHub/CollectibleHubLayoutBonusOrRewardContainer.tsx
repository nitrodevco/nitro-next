import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

import { CollectibleHubLayoutCompletionHeaderContainer, CollectibleHubLayoutCompletionHeaderContainerProps } from './CollectibleHubLayoutCompletionHeaderContainer';

/** Named region `bonus_or_reward_container` of CollectibleHubLayout - configured through the parent's `bonusOrRewardContainer` prop. */
export interface CollectibleHubLayoutBonusOrRewardContainerProps {
    completionHeaderContainer?: CollectibleHubLayoutCompletionHeaderContainerProps;
    layout?: BoxLayout;
    onClaimButton?: () => void;
}

export const CollectibleHubLayoutBonusOrRewardContainer = ({ completionHeaderContainer, layout, onClaimButton }: CollectibleHubLayoutBonusOrRewardContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bonus_or_reward_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 200, ...layout }}
        >
            <CollectibleHubLayoutCompletionHeaderContainer {...completionHeaderContainer} />
            <Button
                variant="5"
                name="claim_button"
                tintColor="#01a101"
                onPointerTap={onClaimButton}
                layout={{ position: 'absolute', right: 7, width: 97, top: 166, height: 30 }}
            >
                {t('collectibles.claim')}
            </Button>
        </Region>
    );
};
