import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2997_grs_guest_room_details_long_xml` (layout "navigator_guest_room_details_long", 253x351) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsLongLayoutProps {
    detailsContainer?: GrsGuestRoomDetailsLongLayoutDetailsContainerProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayout = ({ detailsContainer, layout }: GrsGuestRoomDetailsLongLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 253, height: 351, ...layout }}>
            <Border
                variant="0"
                name="room_popup_container"
                layout={{ position: 'absolute', left: 0, width: 253, top: 0, height: 351 }}
            >
                <GrsGuestRoomDetailsLongLayoutDetailsContainer {...detailsContainer} />
            </Border>
        </Region>
    );
};

/** Named region `user_info_region` of GrsGuestRoomDetailsLongLayout - configured through the parent's `userInfoRegion` prop. */
export interface GrsGuestRoomDetailsLongLayoutUserInfoRegionProps {
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutUserInfoRegion = ({ layout }: GrsGuestRoomDetailsLongLayoutUserInfoRegionProps) => {
    return (
        <Region
            name="user_info_region"
            params={80}
            layout={{ position: 'absolute', right: 170, width: 15, top: 0, height: 13, ...layout }}
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
    );
};

/** Named region `roomowner_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `roomownerCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutRoomownerContProps {
    captionRoomowner?: string;
    captionRoomownerCaption?: string;
    layout?: BoxLayout;
    onRoomownerCont?: () => void;
    userInfoRegion?: GrsGuestRoomDetailsLongLayoutUserInfoRegionProps;
}

export const GrsGuestRoomDetailsLongLayoutRoomownerCont = ({ captionRoomowner, captionRoomownerCaption, layout, onRoomownerCont, userInfoRegion }: GrsGuestRoomDetailsLongLayoutRoomownerContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="roomowner_cont"
            tooltip={t('infostand.profile.link.tooltip')}
            params={17}
            onPointerTap={onRoomownerCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 235, top: 30, height: 17, ...layout }}
        >
            <Region
                name="roomowner.caption"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 171, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomownerCaption ?? t('navigator.roomownercaption')} />
            </Region>
            <GrsGuestRoomDetailsLongLayoutUserInfoRegion {...userInfoRegion} />
            <Region
                name="roomowner"
                params={16}
                layout={{ position: 'absolute', left: 67, width: 80, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomowner ?? 'PH Room Owner'} />
            </Region>
        </Region>
    );
};

/** Named region `roomctg_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `roomctgCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutRoomctgContProps {
    captionRoomctg?: string;
    captionRoomctgCaption?: string;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutRoomctgCont = ({ captionRoomctg, captionRoomctgCaption, layout }: GrsGuestRoomDetailsLongLayoutRoomctgContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="roomctg_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 180, top: 50, height: 12, ...layout }}
        >
            <Region
                name="roomctg.caption"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomctgCaption ?? t('navigator.roomctg')} />
            </Region>
            <Region
                name="roomctg"
                params={17}
                layout={{ position: 'absolute', left: 50, width: 65, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomctg ?? 'PH Category'} />
            </Region>
        </Region>
    );
};

/** Named region `tags` of GrsGuestRoomDetailsLongLayout - configured through the parent's `tags` prop. */
export interface GrsGuestRoomDetailsLongLayoutTagsProps {
    layout?: BoxLayout;
    onTags?: () => void;
}

export const GrsGuestRoomDetailsLongLayoutTags = ({ layout, onTags }: GrsGuestRoomDetailsLongLayoutTagsProps) => {
    return (
        <Region
            name="tags"
            params={17}
            onPointerTap={onTags}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 40, ...layout }}
        />
    );
};

/** Named region `startedat_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `startedatCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutStartedatContProps {
    captionStartedat?: string;
    captionStartedatCaption?: string;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutStartedatCont = ({ captionStartedat, captionStartedatCaption, layout }: GrsGuestRoomDetailsLongLayoutStartedatContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="startedat_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 12, ...layout }}
        >
            <Region
                name="startedat.caption"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionStartedatCaption ?? t('navigator.eventstartedat')} />
            </Region>
            <Region
                name="startedat"
                params={17}
                layout={{ position: 'absolute', left: 50, width: 46, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionStartedat ?? 'PH: 15:48'} />
            </Region>
        </Region>
    );
};

/** Named region `rating_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `ratingCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutRatingContProps {
    captionRating?: string;
    captionRatingCaption?: string;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutRatingCont = ({ captionRating, captionRatingCaption, layout }: GrsGuestRoomDetailsLongLayoutRatingContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rating_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 12, ...layout }}
        >
            <Region
                name="rating.caption"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRatingCaption ?? t('navigator.ratingcaption')} />
            </Region>
            <Region
                name="rating"
                params={17}
                layout={{ position: 'absolute', left: 50, width: 21, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRating ?? '999'} />
            </Region>
        </Region>
    );
};

/** Named region `extra_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `extraCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutExtraContProps {
    layout?: BoxLayout;
    ratingCont?: GrsGuestRoomDetailsLongLayoutRatingContProps;
    startedatCont?: GrsGuestRoomDetailsLongLayoutStartedatContProps;
    tags?: GrsGuestRoomDetailsLongLayoutTagsProps;
}

export const GrsGuestRoomDetailsLongLayoutExtraCont = ({ layout, ratingCont, startedatCont, tags }: GrsGuestRoomDetailsLongLayoutExtraContProps) => {
    return (
        <Region
            name="extra_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 90, height: 70, ...layout }}
        >
            <GrsGuestRoomDetailsLongLayoutTags {...tags} />
            <GrsGuestRoomDetailsLongLayoutStartedatCont {...startedatCont} />
            <GrsGuestRoomDetailsLongLayoutRatingCont {...ratingCont} />
        </Region>
    );
};

/** Named region `doormode_doorbell` of GrsGuestRoomDetailsLongLayout - configured through the parent's `doormodeDoorbell` prop. */
export interface GrsGuestRoomDetailsLongLayoutDoormodeDoorbellProps {
    captionInfotxt?: string;
    layout?: BoxLayout;
    srcDoormodeDoorbell?: string;
}

export const GrsGuestRoomDetailsLongLayoutDoormodeDoorbell = ({ captionInfotxt, layout, srcDoormodeDoorbell }: GrsGuestRoomDetailsLongLayoutDoormodeDoorbellProps) => {
    const t = useTranslation();

    return (
        <Region
            name="doormode_doorbell"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 125, height: 31, ...layout }}
        >
            <ThemeImage
                name="doormode_doorbell"
                params={16}
                src={srcDoormodeDoorbell}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
            />
            <Region
                name="infotxt"
                params={16}
                layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfotxt ?? t('navigator.info.doorbell')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `doormode_invisible` of GrsGuestRoomDetailsLongLayout - configured through the parent's `doormodeInvisible` prop. */
export interface GrsGuestRoomDetailsLongLayoutDoormodeInvisibleProps {
    captionInfotxt?: string;
    layout?: BoxLayout;
    srcDoormodeInvisible?: string;
}

export const GrsGuestRoomDetailsLongLayoutDoormodeInvisible = ({ captionInfotxt, layout, srcDoormodeInvisible }: GrsGuestRoomDetailsLongLayoutDoormodeInvisibleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="doormode_invisible"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 160, height: 31, ...layout }}
        >
            <ThemeImage
                name="doormode_invisible"
                params={16}
                src={srcDoormodeInvisible}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
            />
            <Region
                name="infotxt"
                params={16}
                layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfotxt ?? t('navigator.info.invisible')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `doormode_password` of GrsGuestRoomDetailsLongLayout - configured through the parent's `doormodePassword` prop. */
export interface GrsGuestRoomDetailsLongLayoutDoormodePasswordProps {
    captionInfotxt?: string;
    layout?: BoxLayout;
    srcDoormodePassword?: string;
}

export const GrsGuestRoomDetailsLongLayoutDoormodePassword = ({ captionInfotxt, layout, srcDoormodePassword }: GrsGuestRoomDetailsLongLayoutDoormodePasswordProps) => {
    const t = useTranslation();

    return (
        <Region
            name="doormode_password"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 190, height: 31, ...layout }}
        >
            <ThemeImage
                name="doormode_password"
                params={16}
                src={srcDoormodePassword}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 24 }}
            />
            <Region
                name="infotxt"
                params={16}
                layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfotxt ?? t('navigator.info.password')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `trading_allowed` of GrsGuestRoomDetailsLongLayout - configured through the parent's `tradingAllowed` prop. */
export interface GrsGuestRoomDetailsLongLayoutTradingAllowedProps {
    captionInfotxt?: string;
    layout?: BoxLayout;
    srcTradingAllowed?: string;
}

export const GrsGuestRoomDetailsLongLayoutTradingAllowed = ({ captionInfotxt, layout, srcTradingAllowed }: GrsGuestRoomDetailsLongLayoutTradingAllowedProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trading_allowed"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 233, top: 215, height: 20, ...layout }}
        >
            <ThemeImage
                name="trading_allowed"
                params={16}
                src={srcTradingAllowed}
                layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 15 }}
            />
            <Region
                name="infotxt"
                params={16}
                layout={{ position: 'absolute', left: 35, width: 198, top: 0, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfotxt ?? t('navigator.info.tradingallowed')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `eventinfo_child_container` of GrsGuestRoomDetailsLongLayout - configured through the parent's `eventinfoChildContainer` prop. */
export interface GrsGuestRoomDetailsLongLayoutEventinfoChildContainerProps {
    captionEventinfoDesc?: string;
    captionEventinfoExpirationtime?: string;
    captionEventinfoName?: string;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutEventinfoChildContainer = ({ captionEventinfoDesc, captionEventinfoExpirationtime, captionEventinfoName, layout }: GrsGuestRoomDetailsLongLayoutEventinfoChildContainerProps) => {
    return (
        <Region
            name="eventinfo_child_container"
            params={16}
            layout={{ position: 'absolute', left: 60, width: 183, top: 0, height: 78, ...layout }}
        >
            <Region
                name="eventinfo_name"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 157, top: 0, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventinfoName ?? 'BLA'}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <Region
                name="eventinfo_desc"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 178, top: 15, height: 30, maxHeight: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventinfoDesc ?? 'Eventinfo lalala'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 178 }}
                />
            </Region>
            <Region
                name="eventinfo_expirationtime"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 107, top: 53, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventinfoExpirationtime ?? ''}
                    textStyle="text-style-il-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `eventinfo_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `eventinfoCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutEventinfoContProps {
    captionEventinfoCaption?: string;
    eventinfoChildContainer?: GrsGuestRoomDetailsLongLayoutEventinfoChildContainerProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayoutEventinfoCont = ({ captionEventinfoCaption, eventinfoChildContainer, layout }: GrsGuestRoomDetailsLongLayoutEventinfoContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="eventinfo_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 239, top: 242, height: 66, ...layout }}
        >
            <Region
                name="eventinfo.caption"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventinfoCaption ?? t('roomad.event')}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <GrsGuestRoomDetailsLongLayoutEventinfoChildContainer {...eventinfoChildContainer} />
        </Region>
    );
};

/** Named region `roomsettings_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `roomsettingsCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutRoomsettingsContProps {
    captionRoomsettings?: string;
    layout?: BoxLayout;
    onRoomsettingsCont?: () => void;
}

export const GrsGuestRoomDetailsLongLayoutRoomsettingsCont = ({ captionRoomsettings, layout, onRoomsettingsCont }: GrsGuestRoomDetailsLongLayoutRoomsettingsContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="roomsettings_cont"
            params={17}
            onPointerTap={onRoomsettingsCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 233, top: 305, height: 20, ...layout }}
        >
            <Region
                name="roomsettings"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomsettings ?? t('navigator.roomsettings')} />
            </Region>
        </Region>
    );
};

/** Named region `details_container` of GrsGuestRoomDetailsLongLayout - configured through the parent's `detailsContainer` prop. */
export interface GrsGuestRoomDetailsLongLayoutDetailsContainerProps {
    captionRoomdesc?: string;
    captionRoomname?: string;
    doormodeDoorbell?: GrsGuestRoomDetailsLongLayoutDoormodeDoorbellProps;
    doormodeInvisible?: GrsGuestRoomDetailsLongLayoutDoormodeInvisibleProps;
    doormodePassword?: GrsGuestRoomDetailsLongLayoutDoormodePasswordProps;
    eventinfoCont?: GrsGuestRoomDetailsLongLayoutEventinfoContProps;
    extraCont?: GrsGuestRoomDetailsLongLayoutExtraContProps;
    layout?: BoxLayout;
    onDetailsContainer?: () => void;
    roomctgCont?: GrsGuestRoomDetailsLongLayoutRoomctgContProps;
    roomownerCont?: GrsGuestRoomDetailsLongLayoutRoomownerContProps;
    roomsettingsCont?: GrsGuestRoomDetailsLongLayoutRoomsettingsContProps;
    tradingAllowed?: GrsGuestRoomDetailsLongLayoutTradingAllowedProps;
}

export const GrsGuestRoomDetailsLongLayoutDetailsContainer = ({ captionRoomdesc, captionRoomname, doormodeDoorbell, doormodeInvisible, doormodePassword, eventinfoCont, extraCont, layout, onDetailsContainer, roomctgCont, roomownerCont, roomsettingsCont, tradingAllowed }: GrsGuestRoomDetailsLongLayoutDetailsContainerProps) => {
    return (
        <Region
            name="details_container"
            params={145}
            onPointerTap={onDetailsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, right: 13, top: 10, height: 326, ...layout }}
        >
            <Region
                name="roomname"
                params={144}
                layout={{ position: 'absolute', left: 0, right: -3, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomname ?? 'PH Room Name: Neque porro quisquam est que'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 233 }}
                />
            </Region>
            <GrsGuestRoomDetailsLongLayoutRoomownerCont {...roomownerCont} />
            <GrsGuestRoomDetailsLongLayoutRoomctgCont {...roomctgCont} />
            <Region
                name="roomdesc"
                params={144}
                layout={{ position: 'absolute', left: 0, right: -3, top: 70, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomdesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 233 }}
                />
            </Region>
            <GrsGuestRoomDetailsLongLayoutExtraCont {...extraCont} />
            <GrsGuestRoomDetailsLongLayoutDoormodeDoorbell {...doormodeDoorbell} />
            <GrsGuestRoomDetailsLongLayoutDoormodeInvisible {...doormodeInvisible} />
            <GrsGuestRoomDetailsLongLayoutDoormodePassword {...doormodePassword} />
            <GrsGuestRoomDetailsLongLayoutTradingAllowed {...tradingAllowed} />
            <GrsGuestRoomDetailsLongLayoutEventinfoCont {...eventinfoCont} />
            <GrsGuestRoomDetailsLongLayoutRoomsettingsCont {...roomsettingsCont} />
        </Region>
    );
};
