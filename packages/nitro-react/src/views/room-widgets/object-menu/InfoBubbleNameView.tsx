import { IRoomObjectNameData } from '@nitrodevco/nitro-api';

import { LayoutImage, TemplateWindow } from '#base/theme';

/**
 * The name bubble over a hovered user - `UserNameView` (`AvatarContextInfoView.updateWindow`),
 * drawn from its `habbo-room-ui-com/avatar_info_widget` template: the `name` set on the built
 * window, whose `reflect_horizontal_resize_to_parent` makes the bubble follow its width, and
 * `change_name_container` hidden. The view's `_window.height = 39` is the layout's own height.
 *
 * `relationship_status` (`updateRelationshipStatus`: the friend's relationship bitmap) shows the
 * icon it is given and is hidden without one: the name data this view gets does not carry it.
 */
export interface InfoBubbleNameViewProps {
    nameData: IRoomObjectNameData;
    /** `_window.color` (`0xAARRGGBB`), over the layout's - `UserNameView.setup`'s. */
    color?: number;
    /** The `relationship_status_*` image of a friend's relationship. */
    relationshipIcon?: string;
}

export const InfoBubbleNameView = ({ nameData, color = undefined, relationshipIcon = undefined }: InfoBubbleNameViewProps) => {
    if (!nameData) return null;

    return (
        <TemplateWindow
            id="habbo-room-ui-com/avatar_info_widget"
            bindings={{
                ...((color !== undefined) && { '': { color } }),
                name: { caption: nameData.name, setCaptionAfterBuild: true },
                relationship_status: relationshipIcon ? { visible: true, asset: LayoutImage(`habbo-window-manager-com/${relationshipIcon}`) } : { visible: false },
                change_name_container: { visible: false },
            }}
        />
    );
};
