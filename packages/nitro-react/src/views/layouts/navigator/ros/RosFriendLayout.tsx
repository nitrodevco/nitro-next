import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3057_ros_friend_xml` (layout "Friend", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosFriendLayoutProps {
    bgRegion?: ReactNode;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onUserInfoRegion?: () => void;
    srcArrowIcon?: string;
}

export const RosFriendLayout = ({ bgRegion, captionUserNameTxt, layout, onBgRegion, onUserInfoRegion, srcArrowIcon }: RosFriendLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <Region
                name="user_container"
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
            >
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
                >
                    {bgRegion}
                </Region>
                <Region
                    name="user_info_region"
                    tooltip={t('group.members.showinfo')}
                    onPointerTap={onUserInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 87, width: 15, top: 4, height: 11 }}
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
        </Region>
    );
};
