import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer_template` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterBlueLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#999999"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};
