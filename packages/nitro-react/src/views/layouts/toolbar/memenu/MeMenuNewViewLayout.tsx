import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1238_me_menu_new_view_xml` (layout "me_menu_new_view", 546x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuNewViewLayoutProps {
    captionClothesFieldText?: string;
    captionCollectiblesFieldText?: string;
    captionFieldText?: string;
    captionForumsFieldText?: string;
    captionMinimailFieldText?: string;
    captionProfileFieldText?: string;
    captionRoomsFieldText?: string;
    captionTalentsFieldText?: string;
    layout?: BoxLayout;
    onClothes?: () => void;
    onCollectibles?: () => void;
    onForums?: () => void;
    onGuide?: () => void;
    onMinimail?: () => void;
    onProfile?: () => void;
    onRooms?: () => void;
    onTalents?: () => void;
    spacer?: ReactNode;
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

export const MeMenuNewViewLayout = ({ captionClothesFieldText, captionCollectiblesFieldText, captionFieldText, captionForumsFieldText, captionMinimailFieldText, captionProfileFieldText, captionRoomsFieldText, captionTalentsFieldText, layout, onClothes, onCollectibles, onForums, onGuide, onMinimail, onProfile, onRooms, onTalents, spacer, srcClothesIconColor, srcClothesIconGrey, srcCollectiblesIconColor, srcCollectiblesIconGrey, srcForumsIconColor, srcForumsIconGrey, srcGuideIconColor, srcGuideIconGrey, srcMinimailIconColor, srcMinimailIconGrey, srcProfileIconColor, srcProfileIconGrey, srcRoomsIconColor, srcRoomsIconGrey, srcTalentsIconColor, srcTalentsIconGrey }: MeMenuNewViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 546, height: 53, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 546, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 546, top: 0, height: 53 }}>
                    <Region layout={{ position: 'absolute', left: 3, width: 543, top: 3, height: 50 }}>
                        <Region
                            name="guide"
                            onPointerTap={onGuide}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 12, width: 50, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="guide_icon_color"
                                src={srcGuideIconColor ?? layoutImage('me_menu_me_guide.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText ?? t('widget.memenu.guide')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="guide_icon_grey"
                                src={srcGuideIconGrey ?? layoutImage('me_menu_me_guide.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="talents"
                            onPointerTap={onTalents}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 70, width: 50, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="talents_icon_color"
                                src={srcTalentsIconColor ?? layoutImage('me_menu_me_talents.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTalentsFieldText ?? t('widget.memenu.talents')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="talents_icon_grey"
                                src={srcTalentsIconGrey ?? layoutImage('me_menu_me_talents.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="minimail"
                            onPointerTap={onMinimail}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 128, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="minimail_icon_color"
                                src={srcMinimailIconColor ?? layoutImage('me_menu_me_mail.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionMinimailFieldText ?? t('widget.memenu.minimail')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="minimail_icon_grey"
                                src={srcMinimailIconGrey ?? layoutImage('me_menu_me_mail.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="profile"
                            onPointerTap={onProfile}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 196, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="profile_icon_color"
                                src={srcProfileIconColor ?? layoutImage('me_menu_me_profile.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionProfileFieldText ?? t('widget.memenu.profile')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="profile_icon_grey"
                                src={srcProfileIconGrey ?? layoutImage('me_menu_me_profile.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="rooms"
                            onPointerTap={onRooms}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 264, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="rooms_icon_color"
                                src={srcRoomsIconColor ?? layoutImage('me_menu_me_rooms.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRoomsFieldText ?? t('widget.memenu.myrooms')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="rooms_icon_grey"
                                src={srcRoomsIconGrey ?? layoutImage('me_menu_me_rooms.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="clothes"
                            onPointerTap={onClothes}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 332, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="clothes_icon_color"
                                src={srcClothesIconColor ?? layoutImage('me_menu_me_clothing.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionClothesFieldText ?? t('widget.memenu.editavatar')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="clothes_icon_grey"
                                src={srcClothesIconGrey ?? layoutImage('me_menu_me_clothing.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="forums"
                            onPointerTap={onForums}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 400, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="forums_icon_color"
                                src={srcForumsIconColor ?? layoutImage('me_menu_me_forums.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionForumsFieldText ?? t('widget.memenu.forums')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="forums_icon_grey"
                                src={srcForumsIconGrey ?? layoutImage('me_menu_me_forums.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="collectibles"
                            onPointerTap={onCollectibles}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 468, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="collectibles_icon_color"
                                src={srcCollectiblesIconColor ?? layoutImage('me_menu_me_cabinet.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 49, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCollectiblesFieldText ?? t('memenu.collectibles')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="collectibles_icon_grey"
                                src={srcCollectiblesIconGrey ?? layoutImage('me_menu_me_cabinet.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="spacer"
                            layout={{ position: 'absolute', left: 536, width: 7, top: 2, height: 30 }}
                        >
                            {spacer}
                        </Region>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
