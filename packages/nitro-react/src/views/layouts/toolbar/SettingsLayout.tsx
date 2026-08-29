import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1232_settings_xml` (layout "settings", 192x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SettingsLayoutProps {
    layout?: BoxLayout;
}

export const SettingsLayout = ({ layout }: SettingsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 36, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 36 }}>
                <Border
                    variant="6"
                    tintColor="#55534e"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, bottom: 0 }}
                />
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, bottom: 4 }}
                />
            </Region>
        </Region>
    );
};
