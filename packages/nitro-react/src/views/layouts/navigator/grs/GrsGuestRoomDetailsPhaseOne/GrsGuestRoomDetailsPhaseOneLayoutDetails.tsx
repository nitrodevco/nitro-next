import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `details` of GrsGuestRoomDetailsPhaseOneLayout - configured through the parent's `details` prop. */
export interface GrsGuestRoomDetailsPhaseOneLayoutDetailsProps {
    captionRoomname?: string;
    captionRoomNumber?: string;
    layout?: BoxLayout;
    onDetails?: () => void;
    onFavourite?: () => void;
    onMakeFavourite?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
    srcFavourite?: string;
    srcGroupBaseIcon?: string;
    srcGroupBaseIconNoDoormode?: string;
    srcHome?: string;
    srcMakeFavourite?: string;
    tintDoormodeDoorbellSmall?: string;
    tintDoormodeInvisibleSmall?: string;
    tintDoormodePasswordSmall?: string;
    tintFavourite?: string;
    tintGroupBaseIcon?: string;
    tintGroupBaseIconNoDoormode?: string;
    tintHome?: string;
    tintMakeFavourite?: string;
}

export const GrsGuestRoomDetailsPhaseOneLayoutDetails = ({ captionRoomname, captionRoomNumber, layout, onDetails, onFavourite, onMakeFavourite, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, srcFavourite, srcGroupBaseIcon, srcGroupBaseIconNoDoormode, srcHome, srcMakeFavourite, tintDoormodeDoorbellSmall, tintDoormodeInvisibleSmall, tintDoormodePasswordSmall, tintFavourite, tintGroupBaseIcon, tintGroupBaseIconNoDoormode, tintHome, tintMakeFavourite }: GrsGuestRoomDetailsPhaseOneLayoutDetailsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="details"
            backgroundColor="#ffffff"
            onPointerTap={onDetails}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionRoomNumber ?? '10.'}
                textOptions={{ align: 'right' }}
                name="room_number"
                layout={{ position: 'absolute', left: 3, width: 21, top: 2, height: 13 }}
            />
            <ThemeText
                text={captionRoomname ?? 'PH Room Name: Neque porro quisquam est que'}
                name="roomname"
                layout={{ position: 'absolute', left: 6, width: 285, top: 2, height: 13 }}
            />
            <ThemeImage
                name="group_base_icon"
                src={srcGroupBaseIcon}
                tint={tintGroupBaseIcon}
                layout={{ position: 'absolute', right: 75, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="group_base_icon_no_doormode"
                src={srcGroupBaseIconNoDoormode}
                tint={tintGroupBaseIconNoDoormode}
                layout={{ position: 'absolute', right: 60, width: 21, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_password_small"
                src={srcDoormodePasswordSmall}
                tint={tintDoormodePasswordSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_doorbell_small"
                src={srcDoormodeDoorbellSmall}
                tint={tintDoormodeDoorbellSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_invisible_small"
                src={srcDoormodeInvisibleSmall}
                tint={tintDoormodeInvisibleSmall}
                layout={{ position: 'absolute', right: 60, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="home"
                src={srcHome}
                tint={tintHome}
                layout={{ position: 'absolute', right: 40, width: 18, top: 0, height: 16 }}
            />
            <Region
                name="favourite"
                tooltip={t('navigator.favourite.tooltip')}
                onPointerTap={onFavourite}
                cursor="pointer"
                layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="favourite"
                    src={srcFavourite}
                    tint={tintFavourite}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            <Region
                name="make_favourite"
                tooltip={t('navigator.makefavourite.tooltip')}
                onPointerTap={onMakeFavourite}
                cursor="pointer"
                layout={{ position: 'absolute', right: 40, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="make_favourite"
                    src={srcMakeFavourite}
                    tint={tintMakeFavourite}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
        </Region>
    );
};
