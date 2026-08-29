import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1211_setting_category_xml` (layout "setting_category", 120x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SettingCategoryLayoutProps {
    captionButtonLabel?: string;
    layout?: BoxLayout;
}

export const SettingCategoryLayout = ({ captionButtonLabel, layout }: SettingCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 120, height: 17, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="button_label"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionButtonLabel ?? 'Settings 1'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
