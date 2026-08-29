import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `community_catalog_button` of CommunityGoalLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalLayoutCommunityCatalogButtonItemProps {
    layout?: BoxLayout;
    onCommunityCatalogButton?: () => void;
}

export const CommunityGoalLayoutCommunityCatalogButtonItem = ({ layout, onCommunityCatalogButton }: CommunityGoalLayoutCommunityCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="community_catalog_button"
            onPointerTap={onCommunityCatalogButton}
            layout={{ width: 250, height: 48, flexShrink: 0, minWidth: 250, maxWidth: 250, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('landing.view.community_catalog_button.text')}
        </Button>
    );
};
