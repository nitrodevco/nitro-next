import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3039_ros_flat_controller_xml` (layout "Flat controller", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosFlatControllerLayoutProps {
    layout?: BoxLayout;
    userContainer?: RosFlatControllerLayoutUserContainerProps;
}

export const RosFlatControllerLayout = ({ layout, userContainer }: RosFlatControllerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <RosFlatControllerLayoutUserContainer {...userContainer} />
        </Region>
    );
};

/** Named region `bg_region` of RosFlatControllerLayout - configured through the parent's `bgRegion` prop. */
export interface RosFlatControllerLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const RosFlatControllerLayoutBgRegion = ({ layout, onBgRegion }: RosFlatControllerLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `user_info_region` of RosFlatControllerLayout - configured through the parent's `userInfoRegion` prop. */
export interface RosFlatControllerLayoutUserInfoRegionProps {
    layout?: BoxLayout;
    onUserInfoRegion?: () => void;
}

export const RosFlatControllerLayoutUserInfoRegion = ({ layout, onUserInfoRegion }: RosFlatControllerLayoutUserInfoRegionProps) => {
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

/** Named region `user_container` of RosFlatControllerLayout - configured through the parent's `userContainer` prop. */
export interface RosFlatControllerLayoutUserContainerProps {
    bgRegion?: RosFlatControllerLayoutBgRegionProps;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    srcArrowIcon?: string;
    userInfoRegion?: RosFlatControllerLayoutUserInfoRegionProps;
}

export const RosFlatControllerLayoutUserContainer = ({ bgRegion, captionUserNameTxt, layout, srcArrowIcon, userInfoRegion }: RosFlatControllerLayoutUserContainerProps) => {
    return (
        <Region
            name="user_container"
            backgroundColor="#cc0000"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        >
            <RosFlatControllerLayoutBgRegion {...bgRegion} />
            <RosFlatControllerLayoutUserInfoRegion {...userInfoRegion} />
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
                src={srcArrowIcon ?? '${image.library.url}Events/arrow_move_right.png'}
                layout={{ position: 'absolute', left: 104, width: 6, top: 4, height: 11 }}
            />
        </Region>
    );
};
