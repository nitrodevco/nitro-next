import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1219_bottom_background_border_xml` (layout "bottom_background_border", 293x54) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BottomBackgroundBorderLayoutProps {
    layout?: BoxLayout;
}

export const BottomBackgroundBorderLayout = ({ layout }: BottomBackgroundBorderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 293, height: 54, ...layout }}>
            <Border
                variant="9"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 54 }}
            />
        </Region>
    );
};
