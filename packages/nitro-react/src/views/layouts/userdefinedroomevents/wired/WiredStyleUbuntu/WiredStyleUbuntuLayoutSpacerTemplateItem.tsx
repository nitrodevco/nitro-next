import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutSpacerTemplateItem = ({ layout }: WiredStyleUbuntuLayoutSpacerTemplateItemProps) => {
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
