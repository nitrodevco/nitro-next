import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1065_styleselector_menu_xml` (layout "styleselector_menu", 67x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StyleselectorMenuLayoutProps {
    layout?: BoxLayout;
}

export const StyleselectorMenuLayout = ({ layout }: StyleselectorMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 67, height: 42, ...layout }}>
            <Border
                variant="8"
                layout={{ position: 'absolute', left: 0, width: 67, top: 0, height: 41 }}
            >
                <Region
                    name="itemgrid"
                    layout={{ position: 'absolute', left: 6, width: 55, top: 5, height: 33, flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                />
            </Border>
        </Region>
    );
};
