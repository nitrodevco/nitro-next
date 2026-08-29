import { BoxLayout, Region } from '#base/theme';

/** Generated from `1141_horizontal_list_view_xml` (layout "horizontal_list_view", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HorizontalListViewLayoutProps {
    layout?: BoxLayout;
}

export const HorizontalListViewLayout = ({ layout }: HorizontalListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <Region
                name="horizontal_list_view"
                layout={{ position: 'absolute', left: 0, top: 0, minHeight: 0, flexDirection: 'row' }}
            />
        </Region>
    );
};
