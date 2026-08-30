import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2566_illumina_purple_button_xml` (layout "illumina_purple_button", 48x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleButtonLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaPurpleButtonLayout = ({ captionBTNTEXT, layout }: IlluminaPurpleButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 48, height: 48, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-il-button"
                textOptions={{ fill: '#ffffff' }}
                name="_BTN_TEXT"
                layout={{ position: 'absolute', marginLeft: -10, marginRight: 10, width: 28, alignSelf: 'center', marginTop: -10, marginBottom: 10, height: 28 }}
            />
        </Region>
    );
};
