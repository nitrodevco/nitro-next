import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1220_me_menu_sound_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuSoundSettingsLayoutProps {
    layout?: BoxLayout;
    onBackBtn?: () => void;
}

export const MeMenuSoundSettingsLayout = ({ layout, onBackBtn }: MeMenuSoundSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 312, height: 170, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                params={1}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 312, top: 1, height: 170 }}
            >
                <Region
                    name="settings_title"
                    params={786640}
                    layout={{ position: 'absolute', left: 93, width: 126, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('widget.memenu.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={786640}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, width: 292, top: 24, height: 1 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 10, width: 292, top: 29, height: 108 }}
                >
                    <Border
                        variant="3"
                        name="volume_grey_area"
                        params={16}
                        tintColor="#666666"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="volume_text"
                    params={786640}
                    layout={{ position: 'absolute', left: 82, width: 148, top: 32, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('widget.memenu.settings.volume')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="ui_volume_container"
                    params={17}
                    layout={{ position: 'absolute', left: 14, width: 285, top: 48, height: 28 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.settings.volume.ui')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="volume_container"
                        params={16}
                        layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
                    >
                        <ThemeImage
                            name="slider_base"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_slider_base.png')}
                            layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                        />
                        <Region
                            name="slider_movement_area"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                        >
                            <Region
                                name="slider_button"
                                params={33073}
                                layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    name="slider_bitmap"
                                    params={272}
                                    src={layoutImage('toolbar_memenu_settings_slider_button.png')}
                                    layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="sounds_off"
                        params={17}
                        layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_off_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                    <Region
                        name="sounds_on"
                        params={17}
                        layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_on_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="furni_volume_container"
                    params={16}
                    layout={{ position: 'absolute', left: 14, width: 285, top: 76, height: 28 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.settings.volume.furni')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="volume_container"
                        params={16}
                        layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
                    >
                        <ThemeImage
                            name="slider_base"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_slider_base.png')}
                            layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                        />
                        <Region
                            name="slider_movement_area"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                        >
                            <Region
                                name="slider_button"
                                params={33073}
                                layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    name="slider_bitmap"
                                    params={272}
                                    src={layoutImage('toolbar_memenu_settings_slider_button.png')}
                                    layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="sounds_off"
                        params={17}
                        layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_off_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                    <Region
                        name="sounds_on"
                        params={17}
                        layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_on_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="trax_volume_container"
                    params={16}
                    layout={{ position: 'absolute', left: 14, width: 285, top: 104, height: 28 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.settings.volume.trax')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="volume_container"
                        params={16}
                        layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
                    >
                        <ThemeImage
                            name="slider_base"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_slider_base.png')}
                            layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                        />
                        <Region
                            name="slider_movement_area"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                        >
                            <Region
                                name="slider_button"
                                params={33073}
                                layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    name="slider_bitmap"
                                    params={272}
                                    src={layoutImage('toolbar_memenu_settings_slider_button.png')}
                                    layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="sounds_off"
                        params={17}
                        layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_off_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                    <Region
                        name="sounds_on"
                        params={17}
                        layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30 }}
                    >
                        <ThemeImage
                            name="sounds_on_icon"
                            params={16}
                            src={layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                        />
                    </Region>
                </Region>
                <Button
                    variant="3"
                    name="back_btn"
                    params={1180721}
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, top: 132, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
