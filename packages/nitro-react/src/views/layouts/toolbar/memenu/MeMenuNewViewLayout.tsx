import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1238_me_menu_new_view_xml` (layout "me_menu_new_view", 546x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuNewViewLayoutProps {
    captionFieldText?: string;
    captionFieldText2?: string;
    captionFieldText3?: string;
    captionFieldText4?: string;
    captionFieldText5?: string;
    captionFieldText6?: string;
    captionFieldText7?: string;
    captionFieldText8?: string;
    layout?: BoxLayout;
    onClothes?: () => void;
    onCollectibles?: () => void;
    onForums?: () => void;
    onGuide?: () => void;
    onMinimail?: () => void;
    onProfile?: () => void;
    onRooms?: () => void;
    onTalents?: () => void;
    srcClothesIconColor?: string;
    srcClothesIconGrey?: string;
    srcCollectiblesIconColor?: string;
    srcCollectiblesIconGrey?: string;
    srcForumsIconColor?: string;
    srcForumsIconGrey?: string;
    srcGuideIconColor?: string;
    srcGuideIconGrey?: string;
    srcMinimailIconColor?: string;
    srcMinimailIconGrey?: string;
    srcProfileIconColor?: string;
    srcProfileIconGrey?: string;
    srcRoomsIconColor?: string;
    srcRoomsIconGrey?: string;
    srcTalentsIconColor?: string;
    srcTalentsIconGrey?: string;
}

export const MeMenuNewViewLayout = ({ captionFieldText, captionFieldText2, captionFieldText3, captionFieldText4, captionFieldText5, captionFieldText6, captionFieldText7, captionFieldText8, layout, onClothes, onCollectibles, onForums, onGuide, onMinimail, onProfile, onRooms, onTalents, srcClothesIconColor, srcClothesIconGrey, srcCollectiblesIconColor, srcCollectiblesIconGrey, srcForumsIconColor, srcForumsIconGrey, srcGuideIconColor, srcGuideIconGrey, srcMinimailIconColor, srcMinimailIconGrey, srcProfileIconColor, srcProfileIconGrey, srcRoomsIconColor, srcRoomsIconGrey, srcTalentsIconColor, srcTalentsIconGrey }: MeMenuNewViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 546, height: 53, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                params={147457}
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 546, top: 0, height: 53 }}
            >
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 546, top: 0, height: 53 }}
                >
                    <Region
                        params={147472}
                        layout={{ position: 'absolute', left: 3, width: 543, top: 3, height: 50 }}
                    >
                        <Region
                            name="guide"
                            params={17}
                            onPointerTap={onGuide}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 12, width: 50, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="guide_icon_color"
                                params={16}
                                src={srcGuideIconColor ?? layoutImage('me_menu_me_guide.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -25, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText ?? t('widget.memenu.guide')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="guide_icon_grey"
                                params={16}
                                src={srcGuideIconGrey ?? layoutImage('me_menu_me_guide.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="talents"
                            params={17}
                            onPointerTap={onTalents}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 70, width: 50, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="talents_icon_color"
                                params={16}
                                src={srcTalentsIconColor ?? layoutImage('me_menu_me_talents.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -25, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText2 ?? t('widget.memenu.talents')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="talents_icon_grey"
                                params={16}
                                src={srcTalentsIconGrey ?? layoutImage('me_menu_me_talents.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="minimail"
                            params={17}
                            onPointerTap={onMinimail}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 128, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="minimail_icon_color"
                                params={16}
                                src={srcMinimailIconColor ?? layoutImage('me_menu_me_mail.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText3 ?? t('widget.memenu.minimail')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="minimail_icon_grey"
                                params={16}
                                src={srcMinimailIconGrey ?? layoutImage('me_menu_me_mail.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="profile"
                            params={17}
                            onPointerTap={onProfile}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 196, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="profile_icon_color"
                                params={16}
                                src={srcProfileIconColor ?? layoutImage('me_menu_me_profile.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText4 ?? t('widget.memenu.profile')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="profile_icon_grey"
                                params={16}
                                src={srcProfileIconGrey ?? layoutImage('me_menu_me_profile.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="rooms"
                            params={17}
                            onPointerTap={onRooms}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 264, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="rooms_icon_color"
                                params={16}
                                src={srcRoomsIconColor ?? layoutImage('me_menu_me_rooms.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText5 ?? t('widget.memenu.myrooms')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="rooms_icon_grey"
                                params={16}
                                src={srcRoomsIconGrey ?? layoutImage('me_menu_me_rooms.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="clothes"
                            params={17}
                            onPointerTap={onClothes}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 332, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="clothes_icon_color"
                                params={16}
                                src={srcClothesIconColor ?? layoutImage('me_menu_me_clothing.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText6 ?? t('widget.memenu.editavatar')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="clothes_icon_grey"
                                params={16}
                                src={srcClothesIconGrey ?? layoutImage('me_menu_me_clothing.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="forums"
                            params={17}
                            onPointerTap={onForums}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 400, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="forums_icon_color"
                                params={16}
                                src={srcForumsIconColor ?? layoutImage('me_menu_me_forums.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText7 ?? t('widget.memenu.forums')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="forums_icon_grey"
                                params={16}
                                src={srcForumsIconGrey ?? layoutImage('me_menu_me_forums.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="collectibles"
                            params={17}
                            onPointerTap={onCollectibles}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 468, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="collectibles_icon_color"
                                params={16}
                                src={srcCollectiblesIconColor ?? layoutImage('me_menu_me_cabinet.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -24, width: 49, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText8 ?? t('memenu.collectibles')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="collectibles_icon_grey"
                                params={16}
                                src={srcCollectiblesIconGrey ?? layoutImage('me_menu_me_cabinet.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="spacer"
                            params={16}
                            layout={{ position: 'absolute', left: 536, width: 7, top: 2, height: 30 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
