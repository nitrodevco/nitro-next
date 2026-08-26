import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `896_bot_view_xml` (layout "bot_view", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BotViewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BotViewLayout = ({ layout, onClose }: BotViewLayoutProps) => {
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
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        params={17}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <Region
                        name="infostand_element_list"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3 }}
                    >
                        <Region
                            name="name_text"
                            params={146}
                            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            backgroundColor="#3d3d3d"
                        />
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
                            >
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="avatar_image"
                                    params={3282}
                                    options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                                    layout={{ position: 'absolute', left: 16, width: 34, top: 23, height: 84 }}
                                />
                            </Border>
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_0"
                                params={17}
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
                                params={17}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 88, width: 42, top: 44, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_2"
                                params={17}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 131, width: 42, top: 44, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_3"
                                params={17}
                                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 88, width: 42, top: 87, height: 42 }}
                            />
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge_4"
                                params={17}
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
                            <TextInput
                                value={mottoTextValue}
                                onChange={setMottoTextValue}
                                maxLength={38}
                                textColor="#ffffff"
                                layout={{ position: 'absolute', left: 5, width: 160, top: 2, height: 53 }}
                            />
                        </Border>
                        <Region
                            name="handitem_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="handitem_txt"
                            params={16}
                            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.handitem')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
