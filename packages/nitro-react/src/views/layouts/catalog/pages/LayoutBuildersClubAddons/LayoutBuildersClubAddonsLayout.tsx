import { BoxLayout, Region } from '#base/theme';

import { LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons, LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps } from './LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons';

/** Generated from `1673_layout_builders_club_addons_xml` (layout "layout_builders_club_addons", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubAddonsLayoutProps {
    ctlgBuildersClubAddons?: LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayout = ({ ctlgBuildersClubAddons, layout }: LayoutBuildersClubAddonsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons {...ctlgBuildersClubAddons} />
        </Region>
    );
};
