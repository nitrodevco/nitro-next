import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Row template `habbicon_popup_action_row` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupActionRowItemProps {
    layout?: BoxLayout;
    onHabbiconPopupActionButton?: () => void;
    visibleHabbiconPopupActionButton?: boolean;
}

export const HabbiconHubLayoutHabbiconPopupActionRowItem = ({ layout, onHabbiconPopupActionButton, visibleHabbiconPopupActionButton }: HabbiconHubLayoutHabbiconPopupActionRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habbicon_popup_action_row"
            layout={{ width: 180, height: 28, flexShrink: 0, ...layout }}
        >
            {(visibleHabbiconPopupActionButton ?? true) && (
                <Button
                    variant="5"
                    name="habbicon_popup_action_button"
                    tintColor="#01a101"
                    onPointerTap={onHabbiconPopupActionButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 12, width: 156, top: 0, height: 28, minWidth: 156, maxWidth: 156 }}
                >
                    {t('generic.claim')}
                </Button>
            )}
        </Region>
    );
};
