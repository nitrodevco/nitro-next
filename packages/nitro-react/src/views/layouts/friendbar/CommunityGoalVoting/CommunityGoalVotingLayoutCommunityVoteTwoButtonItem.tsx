import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `community_vote_two_button` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutCommunityVoteTwoButtonItemProps {
    layout?: BoxLayout;
    onCommunityVoteTwoButton?: () => void;
}

export const CommunityGoalVotingLayoutCommunityVoteTwoButtonItem = ({ layout, onCommunityVoteTwoButton }: CommunityGoalVotingLayoutCommunityVoteTwoButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="community_vote_two_button"
            onPointerTap={onCommunityVoteTwoButton}
            layout={{ width: 250, height: 45, flexShrink: 0, minWidth: 250, maxWidth: 250, ...layout }}
        >
            {t('landing.view.community_catalog_button.text')}
        </Button>
    );
};
