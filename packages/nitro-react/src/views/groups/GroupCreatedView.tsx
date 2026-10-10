/**
 * The welcome window a new group opens with - `GroupCreatedWindowCtrl`: `group_created_window`,
 * centred (`_window.center()`). Its close button and its `ok_button` do the same thing: close, and
 * ask for the group's details, which opens the details window on it.
 */
import { TemplateWindow, useTemplateFrame } from '#base/theme';

export interface GroupCreatedViewProps {
    onClose: () => void;
}

export const GroupCreatedView = ({ onClose }: GroupCreatedViewProps) => {
    const frame = useTemplateFrame({ id: 'group_created_window', centered: true, rememberPosition: false, onClose });

    return (
        <TemplateWindow
            id="habbo-groups-com/group_created_window"
            frame={frame}
            bindings={{ ok_button: { onPointerTap: onClose } }}
        />
    );
};
