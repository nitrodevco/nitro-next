import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3025_grs_guest_room_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsShortLayoutProps {
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsShortLayout = ({ layout }: GrsGuestRoomDetailsShortLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <Region
                name="details"
                params={145}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 17 }}
            >
                <Region
                    name="room_number"
                    params={16}
                    layout={{ position: 'absolute', left: 3, width: 21, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text="10."
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <Region
                    name="roomname"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="PH Room Name: Neque porro quisquam est que" />
                </Region>
                <ThemeImage
                    name="group_base_icon"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 175, width: 21, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="group_base_icon_no_doormode"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 190, width: 21, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_password_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 198, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_doorbell_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 198, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_invisible_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 198, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="home"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 213, width: 18, top: 0, height: 16 }}
                />
                <Region
                    name="favourite"
                    tooltip={t('navigator.favourite.tooltip')}
                    params={81}
                    layout={{ position: 'absolute', left: 213, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="favourite"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="make_favourite"
                    tooltip={t('navigator.makefavourite.tooltip')}
                    params={81}
                    layout={{ position: 'absolute', left: 213, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="make_favourite"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
