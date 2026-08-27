import { BoxLayout, Region } from '#base/theme';

/** Generated from `2506_scaler_3_xml` (layout "habbo_window_layout_scaler_3", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Scaler3LayoutProps {
    layout?: BoxLayout;
}

export const Scaler3Layout = ({ layout }: Scaler3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }} />
    );
};
