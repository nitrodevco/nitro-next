import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `use` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
}

export const JukeboxViewLayoutUseItem = ({ layout, onUse }: JukeboxViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            onPointerTap={onUse}
            textStyle="text-style-button-regular"
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};
