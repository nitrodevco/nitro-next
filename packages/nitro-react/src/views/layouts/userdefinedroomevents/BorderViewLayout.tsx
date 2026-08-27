import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1140_border_view_xml` (layout "border_view", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BorderViewLayoutProps {
    layout?: BoxLayout;
}

export const BorderViewLayout = ({ layout }: BorderViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Border
                variant="2"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};
