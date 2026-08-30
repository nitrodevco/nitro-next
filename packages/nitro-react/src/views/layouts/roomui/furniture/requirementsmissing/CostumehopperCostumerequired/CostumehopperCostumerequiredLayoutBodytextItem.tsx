import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `bodytext` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutBodytextItemProps {
    captionBodytext?: string;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutBodytextItem = ({ captionBodytext, layout }: CostumehopperCostumerequiredLayoutBodytextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionBodytext ?? t('costumehopper.costumerequired.bodytext')}
            textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            name="bodytext"
            verticalAlign="top"
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, ...layout }}
        />
    );
};
