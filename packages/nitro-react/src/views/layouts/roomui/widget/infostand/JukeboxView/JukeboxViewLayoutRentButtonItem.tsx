import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `rent_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
}

export const JukeboxViewLayoutRentButtonItem = ({ layout, onRentButton }: JukeboxViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            onPointerTap={onRentButton}
            textStyle="text-style-button-regular"
            layout={{ width: 130, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};
