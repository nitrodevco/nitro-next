import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2649_button_thick_black_xml` (layout "habbo_window_layout_button_thick_black", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonThickBlackLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonThickBlackLayout = ({ captionBTNTEXT, layout }: ButtonThickBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-button-bold"
                textOptions={{ fill: '#ffffff' }}
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22 }}
            />
        </Region>
    );
};
