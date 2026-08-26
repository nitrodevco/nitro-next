import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1066_rentable_bot_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentableBotViewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onIgnore?: () => void;
    onMove?: () => void;
    onPick?: () => void;
    onRotate?: () => void;
    onUnignore?: () => void;
    onWhisper?: () => void;
}

export const RentableBotViewLayout = ({ layout, onClose, onIgnore, onMove, onPick, onRotate, onUnignore, onWhisper }: RentableBotViewLayoutProps) => {
    const t = useTranslation();

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
                            name="description_container"
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
                                params={17}
                                layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('infostand_bot_info_bg.png')}
                                    layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 127 }}
                                />
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="avatar_image"
                                    params={3282}
                                    options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                                    layout={{ position: 'absolute', left: 16, width: 34, top: 21, height: 84 }}
                                />
                            </Region>
                            <WidgetSlot
                                widgetType="badge_image"
                                name="badge"
                                params={17}
                                options={{ 'badge_image:badge_id': 'BOT', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                layout={{ position: 'absolute', left: 116, width: 42, top: 21, height: 42 }}
                            />
                        </Region>
                        <Region
                            name="handitem_spacer"
                            params={16}
                            backgroundColor="#333333"
                            layout={{ width: 170, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="handitem_text"
                            params={16}
                            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.handitem')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                            />
                        </Region>
                        <Region
                            name="description_text"
                            params={16}
                            layout={{ width: 170, height: 31, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="owner_text"
                            params={16}
                            layout={{ width: 126, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.botowner')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region
                    name="button_list"
                    params={16}
                    layout={{ width: 1800, height: 25, flexShrink: 0 }}
                >
                    <Region
                        name="whisper"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="whisper"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onWhisper}
                            layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.whisper')}
                        </Button>
                    </Region>
                    <Region
                        name="ignore"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 110, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="ignore"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onIgnore}
                            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.ignore')}
                        </Button>
                    </Region>
                    <Region
                        name="unignore"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 220, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="unignore"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onUnignore}
                            layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.unignore')}
                        </Button>
                    </Region>
                    <Region
                        name="move"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 330, width: 132, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="move"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onMove}
                            layout={{ position: 'absolute', left: 0, width: 132, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.move')}
                        </Button>
                    </Region>
                    <Region
                        name="rotate"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 472, width: 139, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="rotate"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onRotate}
                            layout={{ position: 'absolute', left: 0, width: 139, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.rotate')}
                        </Button>
                    </Region>
                    <Region
                        name="pick"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 621, width: 137, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="pick"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onPick}
                            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.pickup')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
