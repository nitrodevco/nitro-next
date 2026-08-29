import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleIlluminaLayoutSpacerTemplateItem = ({ layout }: WiredStyleIlluminaLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#aaaaaa"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};
