import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `tag_and_group_info` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutTagAndGroupInfoItemProps {
    itemsTagList?: ReactNode;
    layout?: BoxLayout;
    srcGroupModeAdmin?: string;
    srcGroupModeFurnish?: string;
    srcGroupModeSize?: string;
    visibleGroupModeAdmin?: boolean;
    visibleGroupModeFurnish?: boolean;
    visibleGroupModeSize?: boolean;
    visibleTagList?: boolean;
}

export const RoomInfoPopupBubbleLayoutTagAndGroupInfoItem = ({ itemsTagList, layout, srcGroupModeAdmin, srcGroupModeFurnish, srcGroupModeSize, visibleGroupModeAdmin, visibleGroupModeFurnish, visibleGroupModeSize, visibleTagList }: RoomInfoPopupBubbleLayoutTagAndGroupInfoItemProps) => {
    return (
        <Region
            name="tag_and_group_info"
            layout={{ alignSelf: 'stretch', height: 23, flexShrink: 0, ...layout }}
        >
            {(visibleTagList ?? true) && (
                <Region
                    name="tag_list"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, bottom: 3, flexDirection: 'row', gap: 2 }}
                >
                    {itemsTagList}
                </Region>
            )}
            {(visibleGroupModeFurnish ?? true) && (
                <ThemeImage
                    name="group_mode_furnish"
                    src={srcGroupModeFurnish}
                    layout={{ position: 'absolute', right: 9, width: 18, top: 0, height: 16 }}
                />
            )}
            {(visibleGroupModeAdmin ?? true) && (
                <ThemeImage
                    name="group_mode_admin"
                    src={srcGroupModeAdmin}
                    layout={{ position: 'absolute', left: 279, width: 18, top: 0, height: 16 }}
                />
            )}
            {(visibleGroupModeSize ?? true) && (
                <ThemeImage
                    name="group_mode_size"
                    src={srcGroupModeSize}
                    layout={{ position: 'absolute', left: 299, width: 18, top: 0, height: 16 }}
                />
            )}
        </Region>
    );
};
