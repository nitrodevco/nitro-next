import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `995_user_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserViewLayoutProps {
    layout?: BoxLayout;
    onBobbaRandomusername?: () => void;
    onClose?: () => void;
    onHeartRandomusername?: () => void;
    onSmileRandomusername?: () => void;
}

export const UserViewLayout = ({ layout, onBobbaRandomusername, onClose, onHeartRandomusername, onSmileRandomusername }: UserViewLayoutProps) => {
    const t = useTranslation();
    const [ mottoTextValue, setMottoTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="1"
                    name="info_border"
                    params={17}
                    layout={{ width: 190, height: 357, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        params={17}
                        src={undefined}
                        layout={{ position: 'absolute', left: 8, width: 16, top: 11, height: 15 }}
                    />
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        params={17}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <ThemeImage
                        name="sticker_croco"
                        src={layoutImage('sticker_croco.png')}
                        layout={{ position: 'absolute', left: 2, width: 92, top: 64, height: 63 }}
                    />
                    <Region
                        name="infostand_element_list"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 277, flexDirection: 'column', gap: 3 }}
                    >
                        <Region
                            name="profile_link"
                            tooltip={t('infostand.profile.link.tooltip')}
                            params={17}
                            layout={{ width: 135, height: 12, flexShrink: 0 }}
                        >
                            <Region
                                name="name_text"
                                params={146}
                                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                backgroundColor="#3d3d3d"
                            />
                        </Region>
                        <Region
                            name="images_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="image_and_badges_container"
                            params={16}
                            backgroundColor="#6d6d6d"
                            layout={{ width: 193, height: 132, flexShrink: 0 }}
                        >
                            <Border
                                variant="0"
                                name="grey_bg"
                                params={16}
                                tintColor="#666666"
                                layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130 }}
                            />
                            <Region
                                name="avatar_image_profile_link"
                                tooltip={t('infostand.profile.link.tooltip')}
                                params={17}
                                layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127 }}
                            >
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="avatar_image"
                                    params={3282}
                                    visible={false}
                                    options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                                    layout={{ position: 'absolute', left: 16, width: 34, top: 21, height: 84 }}
                                />
                            </Region>
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_0"
                                params={1}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 88, width: 42, top: 1, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_group"
                                params={17}
                                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 131, width: 42, top: 1, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_1"
                                params={1}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 88, width: 42, top: 44, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_2"
                                params={1}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 131, width: 42, top: 44, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_3"
                                params={1}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 88, width: 42, top: 87, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_4"
                                params={1}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 131, width: 42, top: 87, height: 42 }}
                            />
                        </Region>
                        <Region
                            name="motto_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Border
                            variant="0"
                            name="motto_container"
                            params={17}
                            tintColor="#666666"
                            layout={{ width: 170, height: 57, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="changemotto.image"
                                params={3088}
                                src={layoutImage('common_small_pen.png')}
                                layout={{ position: 'absolute', left: 3, width: 17, top: 19, height: 18 }}
                            />
                            <TextInput
                                value={mottoTextValue}
                                onChange={setMottoTextValue}
                                maxLength={38}
                                textColor="#ffffff"
                                layout={{ position: 'absolute', left: 20, width: 140, top: 2, height: 53 }}
                            />
                        </Border>
                        <Region
                            name="badges_rank_spacer"
                            params={16}
                            visible={false}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="badges_rank_region"
                            params={17}
                            visible={false}
                            layout={{ width: 170, height: 15, flexShrink: 0 }}
                        >
                            <Region
                                name="badges_rank_text"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('infostand.text.badges_rank')}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="score_spacer"
                            params={16}
                            visible={false}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="score_text"
                            params={16}
                            visible={false}
                            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.achievement_score')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                        <Region
                            name="score_value"
                            params={16}
                            visible={false}
                            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="handitem_spacer"
                            params={16}
                            visible={false}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="handitem_txt"
                            params={16}
                            visible={false}
                            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.handitem')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                        <Region
                            name="generic_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="relationship_status_container"
                            params={16}
                            layout={{ width: 170, height: 55, flexShrink: 0, flexDirection: 'column', gap: 3 }}
                        >
                            <Region
                                name="relationship_heart"
                                params={16}
                                visible={false}
                                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('relationship_status_heart.png')}
                                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                                />
                                <Region
                                    name="heart_randomusername"
                                    params={1}
                                    layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    onPointerTap={onHeartRandomusername}
                                    cursor="pointer"
                                >
                                    <ThemeText
                                        text="user PH"
                                        textStyle="text-style-bold"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <Region
                                    name="heart_others"
                                    params={16}
                                    layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.relstatus.heart.others')}
                                        textStyle="text-style-regular"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="relationship_smile"
                                params={16}
                                visible={false}
                                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('relationship_status_smile.png')}
                                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                                />
                                <Region
                                    name="smile_randomusername"
                                    params={1}
                                    layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    onPointerTap={onSmileRandomusername}
                                    cursor="pointer"
                                >
                                    <ThemeText
                                        text="user PH"
                                        textStyle="text-style-bold"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <Region
                                    name="smile_others"
                                    params={16}
                                    layout={{ width: 166, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.relstatus.smile.others')}
                                        textStyle="text-style-regular"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="relationship_bobba"
                                params={16}
                                visible={false}
                                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('relationship_status_bobba.png')}
                                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                                />
                                <Region
                                    name="bobba_randomusername"
                                    params={1}
                                    layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    onPointerTap={onBobbaRandomusername}
                                    cursor="pointer"
                                >
                                    <ThemeText
                                        text="user PH"
                                        textStyle="text-style-bold"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <Region
                                    name="bobba_others"
                                    params={16}
                                    layout={{ width: 172, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.relstatus.bobba.others')}
                                        textStyle="text-style-regular"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
