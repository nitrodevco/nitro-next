import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `take_tour_button` of TourTaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TourTaskProgressDialogLayoutTakeTourButtonItemProps {
    layout?: BoxLayout;
    onTakeTourButton?: () => void;
}

export const TourTaskProgressDialogLayoutTakeTourButtonItem = ({ layout, onTakeTourButton }: TourTaskProgressDialogLayoutTakeTourButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="101"
            name="take_tour_button"
            tintColor="#bbbbbb"
            onPointerTap={onTakeTourButton}
            layout={{ width: 153, height: 55, flexShrink: 0, ...layout }}
        >
            {t('talent.track.progress.tour.accept')}
        </Button>
    );
};
