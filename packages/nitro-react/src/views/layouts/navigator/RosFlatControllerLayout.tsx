import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3039_ros_flat_controller_xml` (layout "Flat controller", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosFlatControllerLayoutProps {
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onUserInfoRegion?: () => void;
    srcArrowIcon?: string;
}

export const RosFlatControllerLayout = ({ captionUserNameTxt, layout, onBgRegion, onUserInfoRegion, srcArrowIcon }: RosFlatControllerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <Region
                name="user_container"
                params={16}
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
            >
                <Region
                    name="bg_region"
                    params={17}
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
                />
                <Region
                    name="user_info_region"
                    tooltip={t('group.members.showinfo')}
                    params={81}
                    onPointerTap={onUserInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 87, width: 15, top: 4, height: 11 }}
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
                    name="user_name_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 24, width: 80, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserNameTxt ?? 'User name PH'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <ThemeImage
                    name="arrow_icon"
                    params={16}
                    src={srcArrowIcon ?? '${image.library.url}Events/arrow_move_right.png'}
                    layout={{ position: 'absolute', left: 104, width: 6, top: 4, height: 11 }}
                />
            </Region>
        </Region>
    );
};
