import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer_template` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#666666"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};
