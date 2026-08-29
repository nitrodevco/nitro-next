import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2594_illumina_dark_button_xml` (layout "illumina_dark_button", 28x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkButtonLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaDarkButtonLayout = ({ captionBTNTEXT, layout }: IlluminaDarkButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 28, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 28, alignSelf: 'center', height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-id-button"
                />
            </Region>
        </Region>
    );
};
