import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1065_styleselector_menu_xml` (layout "styleselector_menu", 67x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StyleselectorMenuLayoutProps {
    itemgrid?: StyleselectorMenuLayoutItemgridProps;
    layout?: BoxLayout;
}

export const StyleselectorMenuLayout = ({ itemgrid, layout }: StyleselectorMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 67, height: 42, ...layout }}>
            <Border
                variant="8"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 67, top: 0, height: 41 }}
            >
                <StyleselectorMenuLayoutItemgrid {...itemgrid} />
            </Border>
        </Region>
    );
};

/** Named region `itemgrid` of StyleselectorMenuLayout - configured through the parent's `itemgrid` prop. */
export interface StyleselectorMenuLayoutItemgridProps {
    layout?: BoxLayout;
}

export const StyleselectorMenuLayoutItemgrid = ({ layout }: StyleselectorMenuLayoutItemgridProps) => {
    return (
        <Region
            name="itemgrid"
            params={12582928}
            layout={{ position: 'absolute', left: 6, width: 55, top: 5, height: 33, flexDirection: 'row', flexWrap: 'wrap', gap: 1, ...layout }}
        />
    );
};
