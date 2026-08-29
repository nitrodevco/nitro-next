import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `previous_btn` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutPreviousBtnItemProps {
    layout?: BoxLayout;
    onPreviousBtn?: () => void;
}

export const MainView_1185LayoutPreviousBtnItem = ({ layout, onPreviousBtn }: MainView_1185LayoutPreviousBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="previous_btn"
            onPointerTap={onPreviousBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('badge_leaderboard.previous')}
        </Button>
    );
};
