import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutTitleItem = ({ captionTitle, layout }: CostumehopperCostumerequiredLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionTitle ?? t('costumehopper.costumerequired.title')}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: '#c30000' }}
            name="title"
            layout={{ width: 183, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
