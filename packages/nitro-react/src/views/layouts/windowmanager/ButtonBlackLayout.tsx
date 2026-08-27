import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2799_button_black_xml` (layout "habbo_window_layout_button_black", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonBlackLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonBlackLayout = ({ captionBTNTEXT, layout }: ButtonBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, justifyContent: 'center', ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-button-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
