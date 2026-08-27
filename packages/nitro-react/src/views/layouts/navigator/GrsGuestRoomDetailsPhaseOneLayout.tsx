import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3001_grs_guest_room_details_phase_one_xml` (layout "grs_guest_room_details_phase_one", 346x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsPhaseOneLayoutProps {
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
}

export const GrsGuestRoomDetailsPhaseOneLayout = ({ captionRoomname, captionRoomNumber, layout, onDetails, onFavourite, onMakeFavourite, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, srcFavourite, srcGroupBaseIcon, srcGroupBaseIconNoDoormode, srcHome, srcMakeFavourite }: GrsGuestRoomDetailsPhaseOneLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 346, height: 17, ...layout }}>
            <Region
                name="details"
                params={145}
                backgroundColor="#ffffff"
                onPointerTap={onDetails}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 346, top: 0, height: 17 }}
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
                    layout={{ position: 'absolute', left: 250, width: 21, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="group_base_icon_no_doormode"
                    params={80}
                    src={srcGroupBaseIconNoDoormode}
                    layout={{ position: 'absolute', left: 265, width: 21, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_password_small"
                    params={80}
                    src={srcDoormodePasswordSmall}
                    layout={{ position: 'absolute', left: 273, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_doorbell_small"
                    params={80}
                    src={srcDoormodeDoorbellSmall}
                    layout={{ position: 'absolute', left: 273, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_invisible_small"
                    params={80}
                    src={srcDoormodeInvisibleSmall}
                    layout={{ position: 'absolute', left: 273, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="home"
                    params={80}
                    src={srcHome}
                    layout={{ position: 'absolute', left: 288, width: 18, top: 0, height: 16 }}
                />
                <Region
                    name="favourite"
                    tooltip={t('navigator.favourite.tooltip')}
                    params={81}
                    onPointerTap={onFavourite}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 288, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="favourite"
                        params={16}
                        src={srcFavourite}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="make_favourite"
                    tooltip={t('navigator.makefavourite.tooltip')}
                    params={81}
                    onPointerTap={onMakeFavourite}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 288, width: 18, top: 1, height: 16 }}
                >
                    <ThemeImage
                        name="make_favourite"
                        params={16}
                        src={srcMakeFavourite}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
