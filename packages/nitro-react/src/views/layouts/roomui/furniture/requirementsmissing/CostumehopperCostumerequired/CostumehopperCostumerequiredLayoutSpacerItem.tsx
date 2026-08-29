import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `spacer` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutSpacerItemProps {
    layout?: BoxLayout;
    srcSpacer?: string;
}

export const CostumehopperCostumerequiredLayoutSpacerItem = ({ layout, srcSpacer }: CostumehopperCostumerequiredLayoutSpacerItemProps) => {
    return (
        <ThemeImage
            name="spacer"
            src={srcSpacer}
            layout={{ width: 291, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
