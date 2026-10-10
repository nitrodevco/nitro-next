/**
 * The group details window - `DetailsWindowCtrl`: `group_info_window`, centred, holding the group's
 * details (`GroupDetailsCtrl`, `useGroupDetailsItem`) in its `group_cont`.
 */
import { TemplateWindow, useTemplateFrame } from '#base/theme';

import { useGroupDetailsItem } from './useGroupDetailsItem';

export interface GroupInfoViewProps {
    groupId: number;
    onClose: () => void;
}

export const GroupInfoView = ({ groupId, onClose }: GroupInfoViewProps) => {
    const frame = useTemplateFrame({ id: 'group_info_window', centered: true, rememberPosition: false, onClose });
    const details = useGroupDetailsItem(groupId);

    if (!details) return null;

    return (
        <TemplateWindow
            id="habbo-groups-com/group_info_window"
            frame={frame}
            bindings={{ group_cont: { items: [ details ] } }}
        />
    );
};
