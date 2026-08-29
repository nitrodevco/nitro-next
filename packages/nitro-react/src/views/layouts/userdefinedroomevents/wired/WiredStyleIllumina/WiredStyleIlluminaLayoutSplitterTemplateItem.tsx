import { BoxLayout, Region } from '#base/theme';

/** Row template `splitter_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSplitterTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleIlluminaLayoutSplitterTemplateItem = ({ layout }: WiredStyleIlluminaLayoutSplitterTemplateItemProps) => {
    return (
        <Region
            name="splitter_template"
            layout={{ width: 1, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#919191"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18 }}
            />
            <Region
                backgroundColor="#f2f2f2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 18, height: 1 }}
            />
        </Region>
    );
};
