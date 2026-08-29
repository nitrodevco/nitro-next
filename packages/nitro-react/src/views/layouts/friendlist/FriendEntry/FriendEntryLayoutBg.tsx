import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `bg` of FriendEntryLayout - configured through the parent's `bg` prop. */
export interface FriendEntryLayoutBgProps {
    captionCaption?: string;
    captionName?: string;
    captionSelectAllText?: string;
    layout?: BoxLayout;
    onBg?: () => void;
    onFollowFriend?: () => void;
    onPager?: () => void;
    onRelationshipStatus?: () => void;
    onSelectAllRegion?: () => void;
    onStartChat?: () => void;
    onUserInfoRegion?: () => void;
    pager?: ReactNode;
    srcArrowDownBlack?: string;
    srcArrowRightBlack?: string;
    srcFace?: string;
    srcFollowFriend?: string;
    srcStartChat?: string;
    srcStatus?: string;
    tintArrowDownBlack?: string;
    tintArrowRightBlack?: string;
    tintFace?: string;
    tintFollowFriend?: string;
    tintStartChat?: string;
}

export const FriendEntryLayoutBg = ({ captionCaption, captionName, captionSelectAllText, layout, onBg, onFollowFriend, onPager, onRelationshipStatus, onSelectAllRegion, onStartChat, onUserInfoRegion, pager, srcArrowDownBlack, srcArrowRightBlack, srcFace, srcFollowFriend, srcStartChat, srcStatus, tintArrowDownBlack, tintArrowRightBlack, tintFace, tintFollowFriend, tintStartChat }: FriendEntryLayoutBgProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bg"
            backgroundColor="#ffffcc"
            onPointerTap={onBg}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 38, width: 39, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionName ?? 'bobber'}
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
            <Region
                name="start_chat"
                onPointerTap={onStartChat}
                cursor="pointer"
                layout={{ position: 'absolute', right: 3, width: 16, top: 2, height: 14 }}
            >
                <ThemeImage
                    name="start_chat"
                    src={srcStartChat}
                    tint={tintStartChat}
                    layout={{ position: 'absolute', right: 0, width: 16, top: 0, height: 14 }}
                />
            </Region>
            <Region
                name="follow_friend"
                onPointerTap={onFollowFriend}
                cursor="pointer"
                layout={{ position: 'absolute', right: 20, width: 16, top: 2, height: 14 }}
            >
                <ThemeImage
                    name="follow_friend"
                    src={srcFollowFriend}
                    tint={tintFollowFriend}
                    layout={{ position: 'absolute', right: 0, width: 16, top: 0, height: 14 }}
                />
            </Region>
            <Region
                name="relationship_status"
                onPointerTap={onRelationshipStatus}
                cursor="pointer"
                layout={{ position: 'absolute', right: 39, width: 26, top: 2, height: 16 }}
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
            <ThemeImage
                name="face"
                src={srcFace}
                tint={tintFace}
                layout={{ position: 'absolute', marginLeft: -43, marginRight: 43, width: 20, alignSelf: 'center', height: 20 }}
            />
            <ThemeImage
                name="arrow_down_black"
                src={srcArrowDownBlack}
                tint={tintArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 8, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                tint={tintArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 5, height: 10 }}
            />
            <Region
                name="user_info_region"
                onPointerTap={onUserInfoRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 20, width: 15, top: 5, height: 11 }}
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
            <Region
                name="pager"
                onPointerTap={onPager}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 190, top: 20, height: 20 }}
            >
                {pager}
            </Region>
            <Region
                name="select_all_region"
                onPointerTap={onSelectAllRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 6, width: 49, top: 0, height: 16 }}
            >
                <Region
                    name="select_all_text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSelectAllText ?? t('friendlist.select_all')}
                        textStyle="text-style-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};
