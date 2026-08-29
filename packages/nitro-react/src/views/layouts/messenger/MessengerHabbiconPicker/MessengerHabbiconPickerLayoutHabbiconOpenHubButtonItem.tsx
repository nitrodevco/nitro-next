import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `habbicon_open_hub_button` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItemProps {
    layout?: BoxLayout;
    onHabbiconOpenHubButton?: () => void;
}

export const MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem = ({ layout, onHabbiconOpenHubButton }: MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="habbicon_open_hub_button"
            onPointerTap={onHabbiconOpenHubButton}
            textStyle="text-style-il-button"
            layout={{ width: 90, height: 24, flexShrink: 0, minWidth: 90, maxWidth: 90, ...layout }}
        >
            {t('habbicons.hud.get_more')}
        </Button>
    );
};
