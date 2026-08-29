import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1238_me_menu_new_view_xml` (layout "me_menu_new_view", 546x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuNewViewLayoutProps {
    clothes?: MeMenuNewViewLayoutClothesProps;
    collectibles?: MeMenuNewViewLayoutCollectiblesProps;
    forums?: MeMenuNewViewLayoutForumsProps;
    guide?: MeMenuNewViewLayoutGuideProps;
    layout?: BoxLayout;
    minimail?: MeMenuNewViewLayoutMinimailProps;
    profile?: MeMenuNewViewLayoutProfileProps;
    rooms?: MeMenuNewViewLayoutRoomsProps;
    spacer?: MeMenuNewViewLayoutSpacerProps;
    talents?: MeMenuNewViewLayoutTalentsProps;
}

export const MeMenuNewViewLayout = ({ clothes, collectibles, forums, guide, layout, minimail, profile, rooms, spacer, talents }: MeMenuNewViewLayoutProps) => {
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
                        <MeMenuNewViewLayoutGuide {...guide} />
                        <MeMenuNewViewLayoutTalents {...talents} />
                        <MeMenuNewViewLayoutMinimail {...minimail} />
                        <MeMenuNewViewLayoutProfile {...profile} />
                        <MeMenuNewViewLayoutRooms {...rooms} />
                        <MeMenuNewViewLayoutClothes {...clothes} />
                        <MeMenuNewViewLayoutForums {...forums} />
                        <MeMenuNewViewLayoutCollectibles {...collectibles} />
                        <MeMenuNewViewLayoutSpacer {...spacer} />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `guide` of MeMenuNewViewLayout - configured through the parent's `guide` prop. */
export interface MeMenuNewViewLayoutGuideProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onGuide?: () => void;
    srcGuideIconColor?: string;
    srcGuideIconGrey?: string;
}

export const MeMenuNewViewLayoutGuide = ({ captionFieldText, layout, onGuide, srcGuideIconColor, srcGuideIconGrey }: MeMenuNewViewLayoutGuideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide"
            params={17}
            onPointerTap={onGuide}
            cursor="pointer"
            layout={{ position: 'absolute', left: 12, width: 50, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                params={16}
                src={srcGuideIconGrey ?? layoutImage('me_menu_me_guide.png')}
                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Named region `talents` of MeMenuNewViewLayout - configured through the parent's `talents` prop. */
export interface MeMenuNewViewLayoutTalentsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onTalents?: () => void;
    srcTalentsIconColor?: string;
    srcTalentsIconGrey?: string;
}

export const MeMenuNewViewLayoutTalents = ({ captionFieldText, layout, onTalents, srcTalentsIconColor, srcTalentsIconGrey }: MeMenuNewViewLayoutTalentsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="talents"
            params={17}
            onPointerTap={onTalents}
            cursor="pointer"
            layout={{ position: 'absolute', left: 70, width: 50, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.talents')}
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
    );
};

/** Named region `minimail` of MeMenuNewViewLayout - configured through the parent's `minimail` prop. */
export interface MeMenuNewViewLayoutMinimailProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onMinimail?: () => void;
    srcMinimailIconColor?: string;
    srcMinimailIconGrey?: string;
}

export const MeMenuNewViewLayoutMinimail = ({ captionFieldText, layout, onMinimail, srcMinimailIconColor, srcMinimailIconGrey }: MeMenuNewViewLayoutMinimailProps) => {
    const t = useTranslation();

    return (
        <Region
            name="minimail"
            params={17}
            onPointerTap={onMinimail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 128, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.minimail')}
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
    );
};

/** Named region `profile` of MeMenuNewViewLayout - configured through the parent's `profile` prop. */
export interface MeMenuNewViewLayoutProfileProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onProfile?: () => void;
    srcProfileIconColor?: string;
    srcProfileIconGrey?: string;
}

export const MeMenuNewViewLayoutProfile = ({ captionFieldText, layout, onProfile, srcProfileIconColor, srcProfileIconGrey }: MeMenuNewViewLayoutProfileProps) => {
    const t = useTranslation();

    return (
        <Region
            name="profile"
            params={17}
            onPointerTap={onProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 196, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.profile')}
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
    );
};

/** Named region `rooms` of MeMenuNewViewLayout - configured through the parent's `rooms` prop. */
export interface MeMenuNewViewLayoutRoomsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onRooms?: () => void;
    srcRoomsIconColor?: string;
    srcRoomsIconGrey?: string;
}

export const MeMenuNewViewLayoutRooms = ({ captionFieldText, layout, onRooms, srcRoomsIconColor, srcRoomsIconGrey }: MeMenuNewViewLayoutRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms"
            params={17}
            onPointerTap={onRooms}
            cursor="pointer"
            layout={{ position: 'absolute', left: 264, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.myrooms')}
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
    );
};

/** Named region `clothes` of MeMenuNewViewLayout - configured through the parent's `clothes` prop. */
export interface MeMenuNewViewLayoutClothesProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onClothes?: () => void;
    srcClothesIconColor?: string;
    srcClothesIconGrey?: string;
}

export const MeMenuNewViewLayoutClothes = ({ captionFieldText, layout, onClothes, srcClothesIconColor, srcClothesIconGrey }: MeMenuNewViewLayoutClothesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clothes"
            params={17}
            onPointerTap={onClothes}
            cursor="pointer"
            layout={{ position: 'absolute', left: 332, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.editavatar')}
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
    );
};

/** Named region `forums` of MeMenuNewViewLayout - configured through the parent's `forums` prop. */
export interface MeMenuNewViewLayoutForumsProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onForums?: () => void;
    srcForumsIconColor?: string;
    srcForumsIconGrey?: string;
}

export const MeMenuNewViewLayoutForums = ({ captionFieldText, layout, onForums, srcForumsIconColor, srcForumsIconGrey }: MeMenuNewViewLayoutForumsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="forums"
            params={17}
            onPointerTap={onForums}
            cursor="pointer"
            layout={{ position: 'absolute', left: 400, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('widget.memenu.forums')}
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
    );
};

/** Named region `collectibles` of MeMenuNewViewLayout - configured through the parent's `collectibles` prop. */
export interface MeMenuNewViewLayoutCollectiblesProps {
    captionFieldText?: string;
    layout?: BoxLayout;
    onCollectibles?: () => void;
    srcCollectiblesIconColor?: string;
    srcCollectiblesIconGrey?: string;
}

export const MeMenuNewViewLayoutCollectibles = ({ captionFieldText, layout, onCollectibles, srcCollectiblesIconColor, srcCollectiblesIconGrey }: MeMenuNewViewLayoutCollectiblesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="collectibles"
            params={17}
            onPointerTap={onCollectibles}
            cursor="pointer"
            layout={{ position: 'absolute', left: 468, width: 60, top: 2, height: 48, justifyContent: 'center', ...layout }}
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
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 49, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFieldText ?? t('memenu.collectibles')}
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
    );
};

/** Named region `spacer` of MeMenuNewViewLayout - configured through the parent's `spacer` prop. */
export interface MeMenuNewViewLayoutSpacerProps {
    layout?: BoxLayout;
}

export const MeMenuNewViewLayoutSpacer = ({ layout }: MeMenuNewViewLayoutSpacerProps) => {
    return (
        <Region
            name="spacer"
            params={16}
            layout={{ position: 'absolute', left: 536, width: 7, top: 2, height: 30, ...layout }}
        />
    );
};
