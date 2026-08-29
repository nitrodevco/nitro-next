import { BoxLayout, Region } from '#base/theme';

import { LayoutSoundmachine_1654LayoutCtlgSoundmachine, LayoutSoundmachine_1654LayoutCtlgSoundmachineProps } from './LayoutSoundmachine_1654LayoutCtlgSoundmachine';

/** Generated from `1654_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1654LayoutProps {
    ctlgSoundmachine?: LayoutSoundmachine_1654LayoutCtlgSoundmachineProps;
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1654Layout = ({ ctlgSoundmachine, layout }: LayoutSoundmachine_1654LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSoundmachine_1654LayoutCtlgSoundmachine {...ctlgSoundmachine} />
        </Region>
    );
};
