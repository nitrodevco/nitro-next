import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3001_grs_guest_room_details_phase_one_xml` (layout "grs_guest_room_details_phase_one", 346x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsPhaseOneLayoutProps {
    details?: GrsGuestRoomDetailsPhaseOneLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsPhaseOneLayout = ({ details, layout }: GrsGuestRoomDetailsPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 17, ...layout }}>
            <GrsGuestRoomDetailsPhaseOneLayoutDetails {...details} />
        </Region>
    );
};

/** Named region `favourite` of GrsGuestRoomDetailsPhaseOneLayout - configured through the parent's `favourite` prop. */
export interface GrsGuestRoomDetailsPhaseOneLayoutFavouriteProps {
    layout?: BoxLayout;
    onFavourite?: () => void;
    srcFavourite?: string;
}

export const GrsGuestRoomDetailsPhaseOneLayoutFavourite = ({ layout, onFavourite, srcFavourite }: GrsGuestRoomDetailsPhaseOneLayoutFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="favourite"
            tooltip={t('navigator.favourite.tooltip')}
            params={81}
            onPointerTap={onFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="favourite"
                params={16}
                src={srcFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `make_favourite` of GrsGuestRoomDetailsPhaseOneLayout - configured through the parent's `makeFavourite` prop. */
export interface GrsGuestRoomDetailsPhaseOneLayoutMakeFavouriteProps {
    layout?: BoxLayout;
    onMakeFavourite?: () => void;
    srcMakeFavourite?: string;
}

export const GrsGuestRoomDetailsPhaseOneLayoutMakeFavourite = ({ layout, onMakeFavourite, srcMakeFavourite }: GrsGuestRoomDetailsPhaseOneLayoutMakeFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_favourite"
            tooltip={t('navigator.makefavourite.tooltip')}
            params={81}
            onPointerTap={onMakeFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="make_favourite"
                params={16}
                src={srcMakeFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `details` of GrsGuestRoomDetailsPhaseOneLayout - configured through the parent's `details` prop. */
export interface GrsGuestRoomDetailsPhaseOneLayoutDetailsProps {
    captionRoomname?: string;
    captionRoomNumber?: string;
    favourite?: GrsGuestRoomDetailsPhaseOneLayoutFavouriteProps;
    layout?: BoxLayout;
    makeFavourite?: GrsGuestRoomDetailsPhaseOneLayoutMakeFavouriteProps;
    onDetails?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
    srcGroupBaseIcon?: string;
    srcGroupBaseIconNoDoormode?: string;
    srcHome?: string;
}

export const GrsGuestRoomDetailsPhaseOneLayoutDetails = ({ captionRoomname, captionRoomNumber, favourite, layout, makeFavourite, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, srcGroupBaseIcon, srcGroupBaseIconNoDoormode, srcHome }: GrsGuestRoomDetailsPhaseOneLayoutDetailsProps) => {
    return (
        <Region
            name="details"
            params={145}
            backgroundColor="#ffffff"
            onPointerTap={onDetails}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, ...layout }}
        >
            <Region
                name="room_number"
                params={16}
                layout={{ position: 'absolute', left: 3, width: 21, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionRoomNumber ?? '10.'}
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Region
                name="roomname"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 285, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomname ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <ThemeImage
                name="group_base_icon"
                params={80}
                src={srcGroupBaseIcon}
                layout={{ position: 'absolute', right: 75, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="group_base_icon_no_doormode"
                params={80}
                src={srcGroupBaseIconNoDoormode}
                layout={{ position: 'absolute', right: 60, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_password_small"
                params={80}
                src={srcDoormodePasswordSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_doorbell_small"
                params={80}
                src={srcDoormodeDoorbellSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_invisible_small"
                params={80}
                src={srcDoormodeInvisibleSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="home"
                params={80}
                src={srcHome}
                layout={{ position: 'absolute', right: 40, width: 18, top: 0, height: 16 }}
            />
            <GrsGuestRoomDetailsPhaseOneLayoutFavourite {...favourite} />
            <GrsGuestRoomDetailsPhaseOneLayoutMakeFavourite {...makeFavourite} />
        </Region>
    );
};
