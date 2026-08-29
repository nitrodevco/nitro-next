import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1526_friend_entry_xml` (layout "friend_entry", 102x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendEntryLayoutProps {
    bg?: FriendEntryLayoutBgProps;
    layout?: BoxLayout;
}

export const FriendEntryLayout = ({ bg, layout }: FriendEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 102, height: 20, ...layout }}>
            <FriendEntryLayoutBg {...bg} />
        </Region>
    );
};

/** Named region `start_chat` of FriendEntryLayout - configured through the parent's `startChat` prop. */
export interface FriendEntryLayoutStartChatProps {
    layout?: BoxLayout;
    onStartChat?: () => void;
    srcStartChat?: string;
}

export const FriendEntryLayoutStartChat = ({ layout, onStartChat, srcStartChat }: FriendEntryLayoutStartChatProps) => {
    return (
        <Region
            name="start_chat"
            onPointerTap={onStartChat}
            cursor="pointer"
            layout={{ position: 'absolute', right: 3, width: 16, top: 2, height: 14, ...layout }}
        >
            <ThemeImage
                name="start_chat"
                src={srcStartChat}
                layout={{ position: 'absolute', right: 0, width: 16, top: 0, height: 14 }}
            />
        </Region>
    );
};

/** Named region `follow_friend` of FriendEntryLayout - configured through the parent's `followFriend` prop. */
export interface FriendEntryLayoutFollowFriendProps {
    layout?: BoxLayout;
    onFollowFriend?: () => void;
    srcFollowFriend?: string;
}

export const FriendEntryLayoutFollowFriend = ({ layout, onFollowFriend, srcFollowFriend }: FriendEntryLayoutFollowFriendProps) => {
    return (
        <Region
            name="follow_friend"
            onPointerTap={onFollowFriend}
            cursor="pointer"
            layout={{ position: 'absolute', right: 20, width: 16, top: 2, height: 14, ...layout }}
        >
            <ThemeImage
                name="follow_friend"
                src={srcFollowFriend}
                layout={{ position: 'absolute', right: 0, width: 16, top: 0, height: 14 }}
            />
        </Region>
    );
};

/** Named region `relationship_status` of FriendEntryLayout - configured through the parent's `relationshipStatus` prop. */
export interface FriendEntryLayoutRelationshipStatusProps {
    layout?: BoxLayout;
    onRelationshipStatus?: () => void;
    srcStatus?: string;
}

export const FriendEntryLayoutRelationshipStatus = ({ layout, onRelationshipStatus, srcStatus }: FriendEntryLayoutRelationshipStatusProps) => {
    return (
        <Region
            name="relationship_status"
            onPointerTap={onRelationshipStatus}
            cursor="pointer"
            layout={{ position: 'absolute', right: 39, width: 26, top: 2, height: 16, ...layout }}
        >
            <ThemeImage
                name="status"
                src={srcStatus}
                layout={{ position: 'absolute', right: 10, width: 16, top: 1, height: 14 }}
            />
            <Icon
                variant="7"
                name="drop"
                tintColor="#000000"
                layout={{ position: 'absolute', right: 0, width: 10, top: 5, height: 5 }}
            />
        </Region>
    );
};

/** Named region `user_info_region` of FriendEntryLayout - configured through the parent's `userInfoRegion` prop. */
export interface FriendEntryLayoutUserInfoRegionProps {
    layout?: BoxLayout;
    onUserInfoRegion?: () => void;
}

export const FriendEntryLayoutUserInfoRegion = ({ layout, onUserInfoRegion }: FriendEntryLayoutUserInfoRegionProps) => {
    return (
        <Region
            name="user_info_region"
            onPointerTap={onUserInfoRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 20, width: 15, top: 5, height: 11, ...layout }}
        >
            <Icon
                variant="21"
                name="icon_eye_off"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
            />
            <Icon
                variant="22"
                name="icon_eye_over"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
            />
        </Region>
    );
};

/** Named region `pager` of FriendEntryLayout - configured through the parent's `pager` prop. */
export interface FriendEntryLayoutPagerProps {
    layout?: BoxLayout;
    onPager?: () => void;
}

export const FriendEntryLayoutPager = ({ layout, onPager }: FriendEntryLayoutPagerProps) => {
    return (
        <Region
            name="pager"
            onPointerTap={onPager}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 190, top: 20, height: 20, ...layout }}
        />
    );
};

/** Named region `select_all_region` of FriendEntryLayout - configured through the parent's `selectAllRegion` prop. */
export interface FriendEntryLayoutSelectAllRegionProps {
    captionSelectAllText?: string;
    layout?: BoxLayout;
    onSelectAllRegion?: () => void;
}

export const FriendEntryLayoutSelectAllRegion = ({ captionSelectAllText, layout, onSelectAllRegion }: FriendEntryLayoutSelectAllRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="select_all_region"
            onPointerTap={onSelectAllRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 6, width: 49, top: 0, height: 16, ...layout }}
        >
            <Region
                name="select_all_text"
                layout={{ position: 'absolute', left: 0, width: 49, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSelectAllText ?? t('friendlist.select_all')}
                    textStyle="text-style-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `bg` of FriendEntryLayout - configured through the parent's `bg` prop. */
export interface FriendEntryLayoutBgProps {
    captionCaption?: string;
    captionName?: string;
    followFriend?: FriendEntryLayoutFollowFriendProps;
    layout?: BoxLayout;
    onBg?: () => void;
    pager?: FriendEntryLayoutPagerProps;
    relationshipStatus?: FriendEntryLayoutRelationshipStatusProps;
    selectAllRegion?: FriendEntryLayoutSelectAllRegionProps;
    srcArrowDownBlack?: string;
    srcArrowRightBlack?: string;
    srcFace?: string;
    startChat?: FriendEntryLayoutStartChatProps;
    userInfoRegion?: FriendEntryLayoutUserInfoRegionProps;
}

export const FriendEntryLayoutBg = ({ captionCaption, captionName, followFriend, layout, onBg, pager, relationshipStatus, selectAllRegion, srcArrowDownBlack, srcArrowRightBlack, srcFace, startChat, userInfoRegion }: FriendEntryLayoutBgProps) => {
    return (
        <Region
            name="bg"
            backgroundColor="#ffffcc"
            onPointerTap={onBg}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 38, width: 39, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionName ?? 'bobber'} />
            </Region>
            <Region
                name="caption"
                layout={{ position: 'absolute', left: 0, width: 68, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCaption ?? 'Friends (0)'}
                    textStyle="text-style-bold"
                />
            </Region>
            <FriendEntryLayoutStartChat {...startChat} />
            <FriendEntryLayoutFollowFriend {...followFriend} />
            <FriendEntryLayoutRelationshipStatus {...relationshipStatus} />
            <ThemeImage
                name="face"
                src={srcFace}
                layout={{ position: 'absolute', marginLeft: -43, marginRight: 43, width: 20, alignSelf: 'center', height: 20 }}
            />
            <ThemeImage
                name="arrow_down_black"
                src={srcArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 8, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 5, height: 10 }}
            />
            <FriendEntryLayoutUserInfoRegion {...userInfoRegion} />
            <FriendEntryLayoutPager {...pager} />
            <FriendEntryLayoutSelectAllRegion {...selectAllRegion} />
        </Region>
    );
};
