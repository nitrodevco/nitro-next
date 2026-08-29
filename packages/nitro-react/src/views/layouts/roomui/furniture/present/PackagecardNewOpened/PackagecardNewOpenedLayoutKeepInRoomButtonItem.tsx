import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `keep_in_room_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutKeepInRoomButtonItemProps {
    layout?: BoxLayout;
    onKeepInRoomButton?: () => void;
}

export const PackagecardNewOpenedLayoutKeepInRoomButtonItem = ({ layout, onKeepInRoomButton }: PackagecardNewOpenedLayoutKeepInRoomButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="keep_in_room_button"
            onPointerTap={onKeepInRoomButton}
            layout={{ width: 224, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.keep_in_room')}
        </ButtonThick>
    );
};
