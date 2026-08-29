import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { GrsGuestRoomDetailsLongLayoutExtraCont, GrsGuestRoomDetailsLongLayoutExtraContProps } from './GrsGuestRoomDetailsLongLayoutExtraCont';

/** Named region `details_container` of GrsGuestRoomDetailsLongLayout - configured through the parent's `detailsContainer` prop. */
export interface GrsGuestRoomDetailsLongLayoutDetailsContainerProps {
    captionDoormodeInvisibleInfotxt?: string;
    captionDoormodePasswordInfotxt?: string;
    captionEventinfoCaption?: string;
    captionEventinfoDesc?: string;
    captionEventinfoExpirationtime?: string;
    captionEventinfoName?: string;
    captionInfotxt?: string;
    captionRoomctg?: string;
    captionRoomctgCaption?: string;
    captionRoomdesc?: string;
    captionRoomname?: string;
    captionRoomowner?: string;
    captionRoomownerCaption?: string;
    captionRoomsettings?: string;
    captionTradingAllowedInfotxt?: string;
    extraCont?: GrsGuestRoomDetailsLongLayoutExtraContProps;
    layout?: BoxLayout;
    onDetailsContainer?: () => void;
    onRoomownerCont?: () => void;
    onRoomsettingsCont?: () => void;
    srcDoormodeDoorbell?: string;
    srcDoormodeInvisible?: string;
    srcDoormodePassword?: string;
    srcTradingAllowed?: string;
    tintDoormodeDoorbell?: string;
    tintDoormodeInvisible?: string;
    tintDoormodePassword?: string;
    tintTradingAllowed?: string;
}

export const GrsGuestRoomDetailsLongLayoutDetailsContainer = ({ captionDoormodeInvisibleInfotxt, captionDoormodePasswordInfotxt, captionEventinfoCaption, captionEventinfoDesc, captionEventinfoExpirationtime, captionEventinfoName, captionInfotxt, captionRoomctg, captionRoomctgCaption, captionRoomdesc, captionRoomname, captionRoomowner, captionRoomownerCaption, captionRoomsettings, captionTradingAllowedInfotxt, extraCont, layout, onDetailsContainer, onRoomownerCont, onRoomsettingsCont, srcDoormodeDoorbell, srcDoormodeInvisible, srcDoormodePassword, srcTradingAllowed, tintDoormodeDoorbell, tintDoormodeInvisible, tintDoormodePassword, tintTradingAllowed }: GrsGuestRoomDetailsLongLayoutDetailsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="details_container"
            onPointerTap={onDetailsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, right: 13, top: 10, height: 326, ...layout }}
        >
            <Region
                name="roomname"
                layout={{ position: 'absolute', left: 0, right: -3, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomname ?? 'PH Room Name: Neque porro quisquam est que'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 233 }}
                />
            </Region>
            <Region
                name="roomowner_cont"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onRoomownerCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 235, top: 30, height: 17 }}
            >
                <Region
                    name="roomowner.caption"
                    layout={{ position: 'absolute', left: 0, width: 171, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomownerCaption ?? t('navigator.roomownercaption')}
                </Region>
                <Region
                    name="user_info_region"
                    layout={{ position: 'absolute', right: 170, width: 15, top: 0, height: 13 }}
                >
                    <Icon
                        variant="21"
                        name="icon_eye_off"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 11 }}
                    />
                    <Icon
                        variant="22"
                        name="icon_eye_over"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 2, height: 11 }}
                    />
                </Region>
                <Region
                    name="roomowner"
                    layout={{ position: 'absolute', left: 67, width: 80, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomowner ?? 'PH Room Owner'}
                </Region>
            </Region>
            <Region
                name="roomctg_cont"
                layout={{ position: 'absolute', left: 0, width: 180, top: 50, height: 12 }}
            >
                <Region
                    name="roomctg.caption"
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomctgCaption ?? t('navigator.roomctg')}
                </Region>
                <Region
                    name="roomctg"
                    layout={{ position: 'absolute', left: 50, width: 65, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomctg ?? 'PH Category'}
                </Region>
            </Region>
            <Region
                name="roomdesc"
                layout={{ position: 'absolute', left: 0, right: -3, top: 70, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomdesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 233 }}
                />
            </Region>
            <GrsGuestRoomDetailsLongLayoutExtraCont {...extraCont} />
            <Region
                name="doormode_doorbell"
                layout={{ position: 'absolute', left: 0, width: 233, top: 125, height: 31 }}
            >
                <ThemeImage
                    name="doormode_doorbell"
                    src={srcDoormodeDoorbell}
                    tint={tintDoormodeDoorbell}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                />
                <Region
                    name="infotxt"
                    layout={{ position: 'absolute', left: 35, width: 198, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfotxt ?? t('navigator.info.doorbell')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                    />
                </Region>
            </Region>
            <Region
                name="doormode_invisible"
                layout={{ position: 'absolute', left: 0, width: 233, top: 160, height: 31 }}
            >
                <ThemeImage
                    name="doormode_invisible"
                    src={srcDoormodeInvisible}
                    tint={tintDoormodeInvisible}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                />
                <Region
                    name="infotxt"
                    layout={{ position: 'absolute', left: 35, width: 198, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDoormodeInvisibleInfotxt ?? t('navigator.info.invisible')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                    />
                </Region>
            </Region>
            <Region
                name="doormode_password"
                layout={{ position: 'absolute', left: 0, width: 233, top: 190, height: 31 }}
            >
                <ThemeImage
                    name="doormode_password"
                    src={srcDoormodePassword}
                    tint={tintDoormodePassword}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
                />
                <Region
                    name="infotxt"
                    layout={{ position: 'absolute', left: 35, width: 198, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDoormodePasswordInfotxt ?? t('navigator.info.password')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                    />
                </Region>
            </Region>
            <Region
                name="trading_allowed"
                layout={{ position: 'absolute', left: 0, width: 233, top: 215, height: 20 }}
            >
                <ThemeImage
                    name="trading_allowed"
                    src={srcTradingAllowed}
                    tint={tintTradingAllowed}
                    layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 15 }}
                />
                <Region
                    name="infotxt"
                    layout={{ position: 'absolute', left: 35, width: 198, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTradingAllowedInfotxt ?? t('navigator.info.tradingallowed')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                    />
                </Region>
            </Region>
            <Region
                name="eventinfo_cont"
                layout={{ position: 'absolute', left: 0, width: 239, top: 242, height: 66 }}
            >
                <Region
                    name="eventinfo.caption"
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEventinfoCaption ?? t('roomad.event')}
                        textStyle="text-style-il-regular"
                    />
                </Region>
                <Region
                    name="eventinfo_child_container"
                    layout={{ position: 'absolute', left: 60, width: 183, top: 0, height: 78 }}
                >
                    <Region
                        name="eventinfo_name"
                        layout={{ position: 'absolute', left: 0, width: 157, top: 0, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEventinfoName ?? 'BLA'}
                            textStyle="text-style-il-regular"
                        />
                    </Region>
                    <Region
                        name="eventinfo_desc"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 15, height: 30, maxHeight: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEventinfoDesc ?? 'Eventinfo lalala'}
                            textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 178 }}
                        />
                    </Region>
                    <Region
                        name="eventinfo_expirationtime"
                        layout={{ position: 'absolute', left: 0, width: 107, top: 53, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEventinfoExpirationtime ?? ''}
                            textStyle="text-style-il-regular"
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="roomsettings_cont"
                onPointerTap={onRoomsettingsCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 233, top: 305, height: 20 }}
            >
                <Region
                    name="roomsettings"
                    layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomsettings ?? t('navigator.roomsettings')}
                </Region>
            </Region>
        </Region>
    );
};
