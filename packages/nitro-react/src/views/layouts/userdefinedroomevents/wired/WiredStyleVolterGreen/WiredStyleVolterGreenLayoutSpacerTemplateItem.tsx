import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer_template` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterGreenLayoutSpacerTemplateItemProps) => {
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
