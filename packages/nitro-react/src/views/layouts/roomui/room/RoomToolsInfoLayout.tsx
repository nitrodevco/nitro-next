import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `874_room_tools_info_xml` (layout "room_tools_info", 255x77) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsInfoLayoutProps {
    captionRoomName?: string;
    layout?: BoxLayout;
    ownerNameAndTags?: RoomToolsInfoLayoutOwnerNameAndTagsProps;
}

export const RoomToolsInfoLayout = ({ captionRoomName, layout, ownerNameAndTags }: RoomToolsInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 255, height: 77, ...layout }}>
            <Region layout={{ position: 'absolute', left: -1, width: 255, top: 0, height: 77, maxWidth: 320 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 255, top: 0, height: 77, maxWidth: 320 }}
                >
                    <Region
                        name="room_name"
                        layout={{ position: 'absolute', left: 10, top: 6, height: 24, minWidth: 60, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomName ?? '...'}
                            textStyle="text-style-ubuntu-condensed-title"
                        />
                    </Region>
                    <RoomToolsInfoLayoutOwnerNameAndTags {...ownerNameAndTags} />
                </Border>
            </Region>
        </Region>
    );
};

/** Named region `tag1_region` of RoomToolsInfoLayout - configured through the parent's `tag1Region` prop. */
export interface RoomToolsInfoLayoutTag1RegionProps {
    captionTag1?: string;
    layout?: BoxLayout;
    onTag1Region?: () => void;
    tags?: string[];
}

export const RoomToolsInfoLayoutTag1Region = ({ captionTag1, layout, onTag1Region, tags }: RoomToolsInfoLayoutTag1RegionProps) => {
    return (
        <Region
            name="tag1_region"
            tags={tags}
            onPointerTap={onTag1Region}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, width: 29, top: -1, height: 15, ...layout }}
        >
            <Region
                name="tag1"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTag1 ?? '#jobs'}
                    textOptions={{ fill: '#1b79ab' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `tag1_border` of RoomToolsInfoLayout - pass real rows through its `items…` slot. */
export interface RoomToolsInfoLayoutTag1BorderItemProps {
    layout?: BoxLayout;
    tag1Region?: RoomToolsInfoLayoutTag1RegionProps;
    tags?: string[];
}

export const RoomToolsInfoLayoutTag1BorderItem = ({ layout, tag1Region, tags }: RoomToolsInfoLayoutTag1BorderItemProps) => {
    return (
        <Border
            variant="3"
            name="tag1_border"
            tags={tags}
            tintColor="#1c2935"
            layout={{ width: 30, height: 13, flexShrink: 0, ...layout }}
        >
            <RoomToolsInfoLayoutTag1Region {...tag1Region} />
        </Border>
    );
};

/** Named region `tag2_region` of RoomToolsInfoLayout - configured through the parent's `tag2Region` prop. */
export interface RoomToolsInfoLayoutTag2RegionProps {
    captionTag2?: string;
    layout?: BoxLayout;
    onTag2Region?: () => void;
    tags?: string[];
}

export const RoomToolsInfoLayoutTag2Region = ({ captionTag2, layout, onTag2Region, tags }: RoomToolsInfoLayoutTag2RegionProps) => {
    return (
        <Region
            name="tag2_region"
            tags={tags}
            onPointerTap={onTag2Region}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, width: 34, top: -1, height: 15, ...layout }}
        >
            <Region
                name="tag2"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTag2 ?? '#party'}
                    textOptions={{ fill: '#1b79ab' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `tag2_border` of RoomToolsInfoLayout - pass real rows through its `items…` slot. */
export interface RoomToolsInfoLayoutTag2BorderItemProps {
    layout?: BoxLayout;
    tag2Region?: RoomToolsInfoLayoutTag2RegionProps;
    tags?: string[];
}

export const RoomToolsInfoLayoutTag2BorderItem = ({ layout, tag2Region, tags }: RoomToolsInfoLayoutTag2BorderItemProps) => {
    return (
        <Border
            variant="3"
            name="tag2_border"
            tags={tags}
            tintColor="#1c2935"
            layout={{ width: 35, height: 13, flexShrink: 0, ...layout }}
        >
            <RoomToolsInfoLayoutTag2Region {...tag2Region} />
        </Border>
    );
};

/** Named region `tags` of RoomToolsInfoLayout - configured through the parent's `tags` prop. */
export interface RoomToolsInfoLayoutTagsProps {
    itemsTags?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomToolsInfoLayoutTags = ({ itemsTags, layout, tags }: RoomToolsInfoLayoutTagsProps) => {
    return (
        <Region
            name="tags"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 25, maxWidth: 230, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsTags ?? (
                <>
                    <RoomToolsInfoLayoutTag1BorderItem />
                    <RoomToolsInfoLayoutTag2BorderItem />
                </>
            )}
        </Region>
    );
};

/** Named region `owner_name_and_tags` of RoomToolsInfoLayout - configured through the parent's `ownerNameAndTags` prop. */
export interface RoomToolsInfoLayoutOwnerNameAndTagsProps {
    captionRoomOwner?: string;
    layout?: BoxLayout;
    tags?: string[];
    tags2?: RoomToolsInfoLayoutTagsProps;
}

export const RoomToolsInfoLayoutOwnerNameAndTags = ({ captionRoomOwner, layout, tags, tags2 }: RoomToolsInfoLayoutOwnerNameAndTagsProps) => {
    return (
        <Region
            name="owner_name_and_tags"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 126, top: 33, height: 44, maxWidth: 300, ...layout }}
        >
            <Region
                name="room_owner"
                layout={{ position: 'absolute', left: 0, top: 0, height: 21, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomOwner ?? '...'}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ fill: '#999999' }}
                />
            </Region>
            <RoomToolsInfoLayoutTags {...tags2} />
        </Region>
    );
};
