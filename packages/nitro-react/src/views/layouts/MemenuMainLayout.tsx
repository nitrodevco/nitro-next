import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1103_memenu_main_xml` (layout "memenu_main", 245x249) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainLayoutProps {
    layout?: BoxLayout;
}

export const MemenuMainLayout = ({ layout }: MemenuMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 245, height: 249, ...layout }}>
            <Region
                name="buttons"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 245, top: 0, height: 249 }}
            >
                <Region
                    name="hc"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79 }}
                >
                    <ThemeImage
                        name="hc_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="hc_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 0, width: 94, top: 61, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.hc')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="rooms"
                    params={17}
                    layout={{ position: 'absolute', left: 83, width: 79, top: 83, height: 79 }}
                >
                    <ThemeImage
                        name="rooms_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="rooms_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.myrooms')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="clothes"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 79, top: 83, height: 79 }}
                >
                    <ThemeImage
                        name="clothes_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="clothes_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.myclothes')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="effects"
                    params={17}
                    layout={{ position: 'absolute', left: 166, width: 79, top: 83, height: 79 }}
                >
                    <ThemeImage
                        name="effects_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="effects_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.effects')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="dance"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 79, top: 165, height: 79 }}
                >
                    <ThemeImage
                        name="dance_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="dance_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.dance')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="wave"
                    params={17}
                    layout={{ position: 'absolute', left: 83, width: 79, top: 165, height: 79 }}
                >
                    <ThemeImage
                        name="wave_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="wave_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.wave')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="settings"
                    params={17}
                    layout={{ position: 'absolute', left: 166, width: 79, top: 165, height: 79 }}
                >
                    <ThemeImage
                        name="settings_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="settings_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.settings')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="credits"
                    params={17}
                    layout={{ position: 'absolute', left: 83, width: 79, top: 1, height: 79 }}
                >
                    <ThemeImage
                        name="credits_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="credits_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.credits')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="minimail"
                    params={17}
                    layout={{ position: 'absolute', left: 166, width: 79, top: 1, height: 79 }}
                >
                    <ThemeImage
                        name="minimail_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                    />
                    <Region
                        name="minimail_text"
                        params={786640}
                        layout={{ position: 'absolute', left: 4, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.minimail')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
