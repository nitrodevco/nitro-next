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
    tags?: string[];
}

export const GrsGuestRoomDetailsPhaseOneLayoutFavourite = ({ layout, onFavourite, srcFavourite, tags }: GrsGuestRoomDetailsPhaseOneLayoutFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="favourite"
            tags={tags}
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

/** Named region `make_favourite` of GrsGuestRoomDetailsPhaseOneLayout - configured through the parent's `makeFavourite` prop. */
export interface GrsGuestRoomDetailsPhaseOneLayoutMakeFavouriteProps {
    layout?: BoxLayout;
    onMakeFavourite?: () => void;
    srcMakeFavourite?: string;
    tags?: string[];
}

export const GrsGuestRoomDetailsPhaseOneLayoutMakeFavourite = ({ layout, onMakeFavourite, srcMakeFavourite, tags }: GrsGuestRoomDetailsPhaseOneLayoutMakeFavouriteProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_favourite"
            tags={tags}
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
    tags?: string[];
}

export const GrsGuestRoomDetailsPhaseOneLayoutDetails = ({ captionRoomname, captionRoomNumber, favourite, layout, makeFavourite, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, srcGroupBaseIcon, srcGroupBaseIconNoDoormode, srcHome, tags }: GrsGuestRoomDetailsPhaseOneLayoutDetailsProps) => {
    return (
        <Region
            name="details"
            tags={tags}
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
                layout={{ position: 'absolute', left: 6, width: 285, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
            <GrsGuestRoomDetailsPhaseOneLayoutFavourite {...favourite} />
            <GrsGuestRoomDetailsPhaseOneLayoutMakeFavourite {...makeFavourite} />
        </Region>
    );
};
