import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2978_notification_treasurehunt_xml` (layout "notification_treasurehunt", 190x87) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationTreasurehuntLayoutProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const NotificationTreasurehuntLayout = ({ captionDescription, layout }: NotificationTreasurehuntLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 87, ...layout }}>
            <Border
                variant="2"
                tintColor="#664e16"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}
                >
                    <Border
                        variant="2"
                        tintColor="#382b0c"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <Region
                        backgroundColor="#382b0c"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 7, width: 115, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('treasure_hunt.title')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 58, width: 119, top: 29, height: 52, minHeight: 52, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('treasure_hunt.progress.desc')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 119 }}
                    />
                </Region>
                <ThemeImage
                    src={undefined}
                    layout={{ position: 'absolute', left: 7, width: 50, top: 30, height: 50 }}
                />
                <Region
                    name="treasure_hunt_image"
                    layout={{ position: 'absolute', left: 10, width: 39, top: 33, height: 39 }}
                >
                    <ThemeImage
                        src={layoutImage('mysterybox_key_base.png')}
                        tint="#f0b834"
                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                    />
                    <ThemeImage
                        src={layoutImage('mysterybox_key_overlay.png')}
                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
