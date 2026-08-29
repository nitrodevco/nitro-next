import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `spacer` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutSpacerItemProps {
    layout?: BoxLayout;
    srcSpacer?: string;
}

export const ViprequiredLayoutSpacerItem = ({ layout, srcSpacer }: ViprequiredLayoutSpacerItemProps) => {
    return (
        <ThemeImage
            name="spacer"
            src={srcSpacer}
            layout={{ width: 291, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
