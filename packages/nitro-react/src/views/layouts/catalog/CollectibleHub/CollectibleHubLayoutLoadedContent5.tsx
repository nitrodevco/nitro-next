import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region } from '#base/theme';

import { CollectibleHubLayoutItemContainer3, CollectibleHubLayoutItemContainer3Props } from './CollectibleHubLayoutItemContainer3';

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent5Props {
    itemContainer?: CollectibleHubLayoutItemContainer3Props;
    layout?: BoxLayout;
    onClaimButton?: () => void;
    visibleLoadedContent?: boolean;
}

export const CollectibleHubLayoutLoadedContent5 = ({ itemContainer, layout, onClaimButton, visibleLoadedContent }: CollectibleHubLayoutLoadedContent5Props) => {
    const t = useTranslation();

    return (
        (visibleLoadedContent ?? false) && (
            <Region
                name="loaded_content"
                layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
            >
                <CollectibleHubLayoutItemContainer3 {...itemContainer} />
                <Border
                    variant="3"
                    name="bottom_container"
                    tintColor="#bac3cd"
                    layout={{ position: 'absolute', left: 0, width: 486, top: 380, height: 50 }}
                >
                    <Button
                        variant="5"
                        name="claim_button"
                        tintColor="#2095d4"
                        onPointerTap={onClaimButton}
                        layout={{ position: 'absolute', left: 180, width: 137, top: 10, height: 30, minWidth: 100 }}
                    >
                        {t('collectibles.claim_all')}
                    </Button>
                </Border>
            </Region>
        )
    );
};
