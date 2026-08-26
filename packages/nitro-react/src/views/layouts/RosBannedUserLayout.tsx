import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `3034_ros_banned_user_xml` (layout "Banned User", 111x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBannedUserLayoutProps {
    layout?: BoxLayout;
}

export const RosBannedUserLayout = ({ layout }: RosBannedUserLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
                />
                <Region
                    name="user_info_region"
                    tooltip={t('group.members.showinfo')}
                    params={81}
                    layout={{ position: 'absolute', left: 9, width: 15, top: 4, height: 11 }}
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
                        text="User name PH"
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};
