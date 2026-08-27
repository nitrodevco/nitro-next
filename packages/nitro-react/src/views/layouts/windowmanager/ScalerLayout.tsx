import { BoxLayout, Region } from '#base/theme';

/** Generated from `2488_scaler_xml` (layout "habbo_window_layout_scaler", 15x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScalerLayoutProps {
    layout?: BoxLayout;
}

export const ScalerLayout = ({ layout }: ScalerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 15, height: 15, ...layout }} />
    );
};
