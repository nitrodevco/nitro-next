import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `1188_group_info_window_xml` (layout "Group info window", 363x232) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupInfoWindowLayoutProps {
    groupCont?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const GroupInfoWindowLayout = ({ groupCont, layout, onClose }: GroupInfoWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_info_window"
            name="groups_info_window"
            caption={t('group.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 363, height: 268, ...layout }}
        >
            <Region
                name="group_cont"
                layout={{ position: 'absolute', left: 10, width: 343, top: 10, height: 214 }}
            >
                {groupCont}
            </Region>
        </Frame>
    );
};
