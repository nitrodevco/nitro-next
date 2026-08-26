import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1211_setting_category_xml` (layout "setting_category", 120x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SettingCategoryLayoutProps {
    layout?: BoxLayout;
}

export const SettingCategoryLayout = ({ layout }: SettingCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 120, height: 17, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 17 }}
            >
                <Region
                    name="button_label"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Settings 1"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
