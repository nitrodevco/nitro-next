import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `next_btn` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutNextBtnItemProps {
    layout?: BoxLayout;
    onNextBtn?: () => void;
}

export const MainView_1185LayoutNextBtnItem = ({ layout, onNextBtn }: MainView_1185LayoutNextBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="next_btn"
            onPointerTap={onNextBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('badge_leaderboard.next')}
        </Button>
    );
};
