import { IRoomObjectNameData } from '@nitrodevco/nitro-api';

import { TemplateWindow } from '#base/theme';

/**
 * The name bubble over a hovered user - `UserNameView` (`AvatarContextInfoView.updateWindow`),
 * drawn from its `habbo-room-ui-com/avatar_info_widget` template: the `name` set on the built
 * window, whose `reflect_horizontal_resize_to_parent` makes the bubble follow its width, and
 * `change_name_container` hidden. The view's `_window.height = 39` is the layout's own height.
 *
 * `relationship_status` (the friend's relationship bitmap) is hidden: the name data this view gets
 * does not carry it.
 */
export interface InfoBubbleNameViewProps {
    nameData: IRoomObjectNameData;
}

export const InfoBubbleNameView = ({ nameData }: InfoBubbleNameViewProps) => {
    if (!nameData) return null;

    return (
        <TemplateWindow
            id="habbo-room-ui-com/avatar_info_widget"
            bindings={{
                name: { caption: nameData.name, setCaptionAfterBuild: true },
                relationship_status: { visible: false },
                change_name_container: { visible: false },
            }}
        />
    );
};
