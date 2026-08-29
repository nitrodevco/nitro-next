import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1820_illumina_purple_button_plain_xml` (layout "illumina_purple_button_plain", 28x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleButtonPlainLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaPurpleButtonPlainLayout = ({ captionBTNTEXT, layout }: IlluminaPurpleButtonPlainLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 28, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', width: 28, alignSelf: 'center', height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-il-button"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
