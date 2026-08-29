import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `quests_button` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutQuestsButtonItemProps {
    layout?: BoxLayout;
    onQuestsButton?: () => void;
}

export const VipQuestsPromoLayoutQuestsButtonItem = ({ layout, onQuestsButton }: VipQuestsPromoLayoutQuestsButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="quests_button"
            onPointerTap={onQuestsButton}
            layout={{ alignSelf: 'stretch', height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187, ...layout }}
        >
            {t('citizenship.vip.quests.button')}
        </Button>
    );
};
