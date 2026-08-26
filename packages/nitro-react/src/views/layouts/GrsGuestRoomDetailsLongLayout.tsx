import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2997_grs_guest_room_details_long_xml` (layout "navigator_guest_room_details_long", 253x351) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsLongLayoutProps {
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayout = ({ layout }: GrsGuestRoomDetailsLongLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 253, height: 351, ...layout }}>
            <Border
                variant="0"
                name="room_popup_container"
                layout={{ position: 'absolute', left: 0, width: 253, top: 0, height: 351 }}
            >
                <Region
                    name="details_container"
                    params={145}
                    layout={{ position: 'absolute', left: 10, width: 230, top: 10, height: 326 }}
                >
                    <Region
                        name="roomname"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="PH Room Name: Neque porro quisquam est que"
                            textOptions={{ wordWrap: true, wordWrapWidth: 233 }}
                        />
                    </Region>
                    <Region
                        name="roomowner_cont"
                        tooltip={t('infostand.profile.link.tooltip')}
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 235, top: 30, height: 17 }}
                    >
                        <Region
                            name="roomowner.caption"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 171, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('navigator.roomownercaption')} />
                        </Region>
                        <Region
                            name="user_info_region"
                            params={80}
                            layout={{ position: 'absolute', left: 50, width: 15, top: 0, height: 13 }}
                        >
                            <Icon
                                variant="21"
                                name="icon_eye_off"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 11 }}
                            />
                            <Icon
                                variant="22"
                                name="icon_eye_over"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 11 }}
                            />
                        </Region>
                        <Region
                            name="roomowner"
                            params={16}
                            layout={{ position: 'absolute', left: 67, width: 80, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="PH Room Owner" />
                        </Region>
                    </Region>
                    <Region
                        name="roomctg_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 180, top: 50, height: 12 }}
                    >
                        <Region
                            name="roomctg.caption"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('navigator.roomctg')} />
                        </Region>
                        <Region
                            name="roomctg"
                            params={17}
                            layout={{ position: 'absolute', left: 50, width: 65, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="PH Category" />
                        </Region>
                    </Region>
                    <Region
                        name="roomdesc"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 70, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
                            textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 233 }}
                        />
                    </Region>
                    <Region
                        name="extra_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 90, height: 70 }}
                    >
                        <Region
                            name="tags"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 40 }}
                        />
                        <Region
                            name="startedat_cont"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 12 }}
                        >
                            <Region
                                name="startedat.caption"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.eventstartedat')} />
                            </Region>
                            <Region
                                name="startedat"
                                params={17}
                                layout={{ position: 'absolute', left: 50, width: 46, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="PH: 15:48" />
                            </Region>
                        </Region>
                        <Region
                            name="rating_cont"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 12 }}
                        >
                            <Region
                                name="rating.caption"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('navigator.ratingcaption')} />
                            </Region>
                            <Region
                                name="rating"
                                params={17}
                                layout={{ position: 'absolute', left: 50, width: 21, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="999" />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="doormode_doorbell"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 125, height: 31 }}
                    >
                        <ThemeImage
                            name="doormode_doorbell"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                        />
                        <Region
                            name="infotxt"
                            params={16}
                            layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.info.doorbell')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="doormode_invisible"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 160, height: 31 }}
                    >
                        <ThemeImage
                            name="doormode_invisible"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                        />
                        <Region
                            name="infotxt"
                            params={16}
                            layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.info.invisible')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="doormode_password"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 190, height: 31 }}
                    >
                        <ThemeImage
                            name="doormode_password"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                        />
                        <Region
                            name="infotxt"
                            params={16}
                            layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.info.password')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="trading_allowed"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 215, height: 20 }}
                    >
                        <ThemeImage
                            name="trading_allowed"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 15 }}
                        />
                        <Region
                            name="infotxt"
                            params={16}
                            layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('navigator.info.tradingallowed')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="eventinfo_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 239, top: 242, height: 66 }}
                    >
                        <Region
                            name="eventinfo.caption"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('roomad.event')}
                                textStyle="text-style-il-regular"
                            />
                        </Region>
                        <Region
                            name="eventinfo_child_container"
                            params={16}
                            layout={{ position: 'absolute', left: 60, width: 183, top: 0, height: 78 }}
                        >
                            <Region
                                name="eventinfo_name"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 157, top: 0, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="BLA"
                                    textStyle="text-style-il-regular"
                                />
                            </Region>
                            <Region
                                name="eventinfo_desc"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 178, top: 15, height: 30, maxHeight: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Eventinfo lalala"
                                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 178 }}
                                />
                            </Region>
                            <Region
                                name="eventinfo_expirationtime"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 107, top: 53, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="roomsettings_cont"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 305, height: 20 }}
                    >
                        <Region
                            name="roomsettings"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('navigator.roomsettings')} />
                        </Region>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
