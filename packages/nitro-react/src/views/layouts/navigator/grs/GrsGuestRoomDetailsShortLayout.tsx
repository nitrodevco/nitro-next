import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3025_grs_guest_room_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsShortLayoutProps {
    details?: GrsGuestRoomDetailsShortLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsShortLayout = ({ details, layout }: GrsGuestRoomDetailsShortLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <GrsGuestRoomDetailsShortLayoutDetails {...details} />
        </Region>
    );
};

/** Named region `favourite` of GrsGuestRoomDetailsShortLayout - configured through the parent's `favourite` prop. */
export interface GrsGuestRoomDetailsShortLayoutFavouriteProps {
    layout?: BoxLayout;
    onFavourite?: () => void;
    srcFavourite?: string;
}

export const GrsGuestRoomDetailsShortLayoutFavourite = ({ layout, onFavourite, srcFavourite }: GrsGuestRoomDetailsShortLayoutFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="favourite"
            tooltip={t('navigator.favourite.tooltip')}
            onPointerTap={onFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="favourite"
                src={srcFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `make_favourite` of GrsGuestRoomDetailsShortLayout - configured through the parent's `makeFavourite` prop. */
export interface GrsGuestRoomDetailsShortLayoutMakeFavouriteProps {
    layout?: BoxLayout;
    onMakeFavourite?: () => void;
    srcMakeFavourite?: string;
}

export const GrsGuestRoomDetailsShortLayoutMakeFavourite = ({ layout, onMakeFavourite, srcMakeFavourite }: GrsGuestRoomDetailsShortLayoutMakeFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_favourite"
            tooltip={t('navigator.makefavourite.tooltip')}
            onPointerTap={onMakeFavourite}
            cursor="pointer"
            layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="make_favourite"
                src={srcMakeFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `details` of GrsGuestRoomDetailsShortLayout - configured through the parent's `details` prop. */
export interface GrsGuestRoomDetailsShortLayoutDetailsProps {
    captionRoomname?: string;
    captionRoomNumber?: string;
    favourite?: GrsGuestRoomDetailsShortLayoutFavouriteProps;
    layout?: BoxLayout;
    makeFavourite?: GrsGuestRoomDetailsShortLayoutMakeFavouriteProps;
    onDetails?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
    srcGroupBaseIcon?: string;
    srcGroupBaseIconNoDoormode?: string;
    srcHome?: string;
}

export const GrsGuestRoomDetailsShortLayoutDetails = ({ captionRoomname, captionRoomNumber, favourite, layout, makeFavourite, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, srcGroupBaseIcon, srcGroupBaseIconNoDoormode, srcHome }: GrsGuestRoomDetailsShortLayoutDetailsProps) => {
    return (
        <Region
            name="details"
            backgroundColor="#ffffff"
            onPointerTap={onDetails}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, ...layout }}
        >
            <Region
                name="room_number"
                layout={{ position: 'absolute', left: 3, width: 21, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionRoomNumber ?? '10.'}
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Region
                name="roomname"
                layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomname ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <ThemeImage
                name="group_base_icon"
                src={srcGroupBaseIcon}
                layout={{ position: 'absolute', right: 75, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="group_base_icon_no_doormode"
                src={srcGroupBaseIconNoDoormode}
                layout={{ position: 'absolute', right: 60, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_password_small"
                src={srcDoormodePasswordSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_doorbell_small"
                src={srcDoormodeDoorbellSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_invisible_small"
                src={srcDoormodeInvisibleSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="home"
                src={srcHome}
                layout={{ position: 'absolute', right: 40, width: 18, top: 0, height: 16 }}
            />
            <GrsGuestRoomDetailsShortLayoutFavourite {...favourite} />
            <GrsGuestRoomDetailsShortLayoutMakeFavourite {...makeFavourite} />
        </Region>
    );
};
