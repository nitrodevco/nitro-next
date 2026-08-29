import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `place_in_room_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutPlaceInRoomButtonItemProps {
    layout?: BoxLayout;
    onPlaceInRoomButton?: () => void;
}

export const PackagecardNewOpenedLayoutPlaceInRoomButtonItem = ({ layout, onPlaceInRoomButton }: PackagecardNewOpenedLayoutPlaceInRoomButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="place_in_room_button"
            onPointerTap={onPlaceInRoomButton}
            layout={{ width: 226, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.place_in_room')}
        </ButtonThick>
    );
};
