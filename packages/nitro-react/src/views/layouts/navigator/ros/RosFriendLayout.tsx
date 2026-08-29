import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3057_ros_friend_xml` (layout "Friend", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosFriendLayoutProps {
    layout?: BoxLayout;
    userContainer?: RosFriendLayoutUserContainerProps;
}

export const RosFriendLayout = ({ layout, userContainer }: RosFriendLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <RosFriendLayoutUserContainer {...userContainer} />
        </Region>
    );
};

/** Named region `bg_region` of RosFriendLayout - configured through the parent's `bgRegion` prop. */
export interface RosFriendLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
    tags?: string[];
}

export const RosFriendLayoutBgRegion = ({ layout, onBgRegion, tags }: RosFriendLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            tags={tags}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `user_info_region` of RosFriendLayout - configured through the parent's `userInfoRegion` prop. */
export interface RosFriendLayoutUserInfoRegionProps {
    layout?: BoxLayout;
    onUserInfoRegion?: () => void;
    tags?: string[];
}

export const RosFriendLayoutUserInfoRegion = ({ layout, onUserInfoRegion, tags }: RosFriendLayoutUserInfoRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_info_region"
            tags={tags}
            tooltip={t('group.members.showinfo')}
            onPointerTap={onUserInfoRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 87, width: 15, top: 4, height: 11, ...layout }}
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

/** Named region `user_container` of RosFriendLayout - configured through the parent's `userContainer` prop. */
export interface RosFriendLayoutUserContainerProps {
    bgRegion?: RosFriendLayoutBgRegionProps;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    srcArrowIcon?: string;
    tags?: string[];
    userInfoRegion?: RosFriendLayoutUserInfoRegionProps;
}

export const RosFriendLayoutUserContainer = ({ bgRegion, captionUserNameTxt, layout, srcArrowIcon, tags, userInfoRegion }: RosFriendLayoutUserContainerProps) => {
    return (
        <Region
            name="user_container"
            tags={tags}
            backgroundColor="#cc0000"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        >
            <RosFriendLayoutBgRegion {...bgRegion} />
            <RosFriendLayoutUserInfoRegion {...userInfoRegion} />
            <Region
                name="user_name_txt"
                layout={{ position: 'absolute', left: 24, width: 80, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserNameTxt ?? 'User name PH'}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <ThemeImage
                name="arrow_icon"
                src={srcArrowIcon ?? '${image.library.url}Events/arrow_move_left.png'}
                layout={{ position: 'absolute', left: 1, width: 6, top: 4, height: 11 }}
            />
        </Region>
    );
};
