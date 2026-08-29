import { BoxLayout, Region } from '#base/theme';

import { LayoutSoundmachine_1627LayoutCtlgSoundmachine, LayoutSoundmachine_1627LayoutCtlgSoundmachineProps } from './LayoutSoundmachine_1627LayoutCtlgSoundmachine';

/** Generated from `1627_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1627LayoutProps {
    ctlgSoundmachine?: LayoutSoundmachine_1627LayoutCtlgSoundmachineProps;
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627Layout = ({ ctlgSoundmachine, layout }: LayoutSoundmachine_1627LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSoundmachine_1627LayoutCtlgSoundmachine {...ctlgSoundmachine} />
        </Region>
    );
};
