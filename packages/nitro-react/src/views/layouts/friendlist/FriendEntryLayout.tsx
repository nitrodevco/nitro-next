import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1526_friend_entry_xml` (layout "friend_entry", 102x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendEntryLayoutProps {
    captionCaption?: string;
    captionName?: string;
    captionSelectAllText?: string;
    layout?: BoxLayout;
    onBg?: () => void;
    onFollowFriend?: () => void;
    onRelationshipStatus?: () => void;
    onSelectAllRegion?: () => void;
    onStartChat?: () => void;
    onUserInfoRegion?: () => void;
    srcArrowDownBlack?: string;
    srcArrowRightBlack?: string;
    srcFace?: string;
    srcFollowFriend?: string;
    srcStartChat?: string;
    srcStatus?: string;
}

export const FriendEntryLayout = ({ captionCaption, captionName, captionSelectAllText, layout, onBg, onFollowFriend, onRelationshipStatus, onSelectAllRegion, onStartChat, onUserInfoRegion, srcArrowDownBlack, srcArrowRightBlack, srcFace, srcFollowFriend, srcStartChat, srcStatus }: FriendEntryLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 102, height: 20, ...layout }}>
            <Region
                name="bg"
                params={145}
                backgroundColor="#ffffcc"
                onPointerTap={onBg}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 102, top: 0, height: 20 }}
            >
                <Region
                    name="name"
                    params={16}
                    layout={{ position: 'absolute', left: 38, width: 39, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionName ?? 'bobber'} />
                </Region>
                <Region
                    name="caption"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 68, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCaption ?? 'Friends (0)'}
                        textStyle="text-style-bold"
                    />
                </Region>
                <Region
                    name="start_chat"
                    params={81}
                    onPointerTap={onStartChat}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 83, width: 16, top: 2, height: 14 }}
                >
                    <ThemeImage
                        name="start_chat"
                        tags={[ 'bitmap' ]}
                        params={80}
                        src={srcStartChat}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                    />
                </Region>
                <Region
                    name="follow_friend"
                    params={81}
                    onPointerTap={onFollowFriend}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 66, width: 16, top: 2, height: 14 }}
                >
                    <ThemeImage
                        name="follow_friend"
                        tags={[ 'bitmap' ]}
                        params={80}
                        src={srcFollowFriend}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 14 }}
                    />
                </Region>
                <Region
                    name="relationship_status"
                    params={81}
                    onPointerTap={onRelationshipStatus}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 37, width: 26, top: 2, height: 16 }}
                >
                    <ThemeImage
                        name="status"
                        tags={[ 'bitmap' ]}
                        params={80}
                        src={srcStatus}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                    />
                    <Icon
                        variant="7"
                        name="drop"
                        tags={[ 'drop' ]}
                        params={80}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 16, width: 10, top: 5, height: 5 }}
                    />
                </Region>
                <ThemeImage
                    name="face"
                    params={3932176}
                    src={srcFace}
                    layout={{ position: 'absolute', left: -2, width: 20, top: 0, height: 20 }}
                />
                <ThemeImage
                    name="arrow_down_black"
                    params={16}
                    src={srcArrowDownBlack}
                    layout={{ position: 'absolute', left: 71, width: 10, top: 8, height: 10 }}
                />
                <ThemeImage
                    name="arrow_right_black"
                    params={16}
                    src={srcArrowRightBlack}
                    layout={{ position: 'absolute', left: 71, width: 10, top: 5, height: 10 }}
                />
                <Region
                    name="user_info_region"
                    params={17}
                    onPointerTap={onUserInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 20, width: 15, top: 5, height: 11 }}
                >
                    <Icon
                        variant="21"
                        name="icon_eye_off"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
                    />
                    <Icon
                        variant="22"
                        name="icon_eye_over"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 11 }}
                    />
                </Region>
                <Region
                    name="pager"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 190, top: 20, height: 20 }}
                />
                <Region
                    name="select_all_region"
                    params={409681}
                    onPointerTap={onSelectAllRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 47, width: 49, top: 0, height: 16 }}
                >
                    <Region
                        name="select_all_text"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 49, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSelectAllText ?? t('friendlist.select_all')}
                            textStyle="text-style-regular"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
