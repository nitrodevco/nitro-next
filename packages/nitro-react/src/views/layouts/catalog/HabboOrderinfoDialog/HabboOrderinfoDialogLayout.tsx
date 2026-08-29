import { BoxLayout, Region } from '#base/theme';

import { HabboOrderinfoDialogLayoutHabboOrderinfoDialog, HabboOrderinfoDialogLayoutHabboOrderinfoDialogProps } from './HabboOrderinfoDialogLayoutHabboOrderinfoDialog';

/** Generated from `1608_habbo_orderinfo_dialog_xml` (layout "habbo_orderinfo_dialog", 284x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoDialogLayoutProps {
    habboOrderinfoDialog?: HabboOrderinfoDialogLayoutHabboOrderinfoDialogProps;
    layout?: BoxLayout;
}

export const HabboOrderinfoDialogLayout = ({ habboOrderinfoDialog, layout }: HabboOrderinfoDialogLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 284, height: 149, ...layout }}>
            <HabboOrderinfoDialogLayoutHabboOrderinfoDialog {...habboOrderinfoDialog} />
        </Region>
    );
};
