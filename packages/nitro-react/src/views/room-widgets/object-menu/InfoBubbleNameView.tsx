import { IRoomObjectNameData } from '@nitrodevco/nitro-api';

import { Box, Bubble, ThemeText } from '#base/theme';

export interface InfoBubbleNameViewProps {
    nameData: IRoomObjectNameData;
}

/**
 * The name bubble over a hovered user - `UserNameView` (`AvatarContextInfoView.updateWindow`) on
 * the `avatar_info_widget` layout: a style 5 bubble tinted `0x3d3d3d`, 39 high, its `name` a
 * `u_regular` 11 white text at 16,3 of the content area (8 in). `change_name_container` is always
 * hidden there. The name's `reflect_horizontal_resize_to_parent` makes the bubble follow the
 * name's width: the layout's 129 for an 81-wide name, so 24 either side of it.
 *
 * `relationship_status` (the friend's relationship bitmap at 2,4) is not drawn: the name data this
 * view gets does not carry it.
 */
export const InfoBubbleNameView = ({ nameData }: InfoBubbleNameViewProps) => {
    if (!nameData) return null;

    return (
        <Box layout={{ height: 39, flexDirection: 'row', paddingLeft: 24, paddingRight: 24, paddingTop: 11 }}>
            <Bubble
                variant="5"
                tintColor="#3d3d3d"
                margins={[ 8, 8, 8, 8 ]}
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            />
            <ThemeText
                text={nameData.name}
                textStyle="u_regular"
                textOptions={{ fill: '#ffffff', fontSize: 11 }}
                name="name"
                verticalAlign="top"
            />
        </Box>
    );
};
