import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `3034_ros_banned_user_xml` (layout "Banned User", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBannedUserLayoutProps {
    layout?: BoxLayout;
    userContainer?: RosBannedUserLayoutUserContainerProps;
}

export const RosBannedUserLayout = ({ layout, userContainer }: RosBannedUserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <RosBannedUserLayoutUserContainer {...userContainer} />
        </Region>
    );
};

/** Named region `bg_region` of RosBannedUserLayout - configured through the parent's `bgRegion` prop. */
export interface RosBannedUserLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const RosBannedUserLayoutBgRegion = ({ layout, onBgRegion }: RosBannedUserLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `user_info_region` of RosBannedUserLayout - configured through the parent's `userInfoRegion` prop. */
export interface RosBannedUserLayoutUserInfoRegionProps {
    layout?: BoxLayout;
    onUserInfoRegion?: () => void;
}

export const RosBannedUserLayoutUserInfoRegion = ({ layout, onUserInfoRegion }: RosBannedUserLayoutUserInfoRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_info_region"
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

/** Named region `user_container` of RosBannedUserLayout - configured through the parent's `userContainer` prop. */
export interface RosBannedUserLayoutUserContainerProps {
    bgRegion?: RosBannedUserLayoutBgRegionProps;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    userInfoRegion?: RosBannedUserLayoutUserInfoRegionProps;
}

export const RosBannedUserLayoutUserContainer = ({ bgRegion, captionUserNameTxt, layout, userInfoRegion }: RosBannedUserLayoutUserContainerProps) => {
    return (
        <Region
            name="user_container"
            backgroundColor="#cc0000"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        >
            <RosBannedUserLayoutBgRegion {...bgRegion} />
            <RosBannedUserLayoutUserInfoRegion {...userInfoRegion} />
            <Region
                name="user_name_txt"
                layout={{ position: 'absolute', left: 24, width: 80, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserNameTxt ?? 'User name PH'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
