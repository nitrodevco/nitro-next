import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `habbicon_open_hub_button` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconOpenHubButtonItemProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem = ({ layout, onHabbiconOpenHubButton }: HabbiconselectorMenuLayoutHabbiconOpenHubButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="4"
            name="habbicon_open_hub_button"
            onPointerTap={onHabbiconOpenHubButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('habbicons.hud.get_more')}
        </Button>
    );
};
