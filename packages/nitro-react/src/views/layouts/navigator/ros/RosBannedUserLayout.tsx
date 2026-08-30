import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `3034_ros_banned_user_xml` (layout "Banned User", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBannedUserLayoutProps {
    bgRegion?: ReactNode;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onUserInfoRegion?: () => void;
}

export const RosBannedUserLayout = ({ bgRegion, captionUserNameTxt, layout, onBgRegion, onUserInfoRegion }: RosBannedUserLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 111, height: 20, ...layout }}>
            <Region
                name="user_container"
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
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
                <ThemeText
                    text={captionUserNameTxt ?? 'User name PH'}
                    textStyle="text-style-u-regular"
                    name="user_name_txt"
                    layout={{ position: 'absolute', left: 24, width: 80, top: 1, height: 17 }}
                />
            </Region>
        </Region>
    );
};
