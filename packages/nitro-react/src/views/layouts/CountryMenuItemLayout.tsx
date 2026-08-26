import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1263_country_menu_item_xml` (layout "country_menu_item", 204x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CountryMenuItemLayoutProps {
    layout?: BoxLayout;
}

export const CountryMenuItemLayout = ({ layout }: CountryMenuItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 204, height: 30, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 204, top: 0, height: 30 }}
            >
                <Region
                    name="country_code"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 24, top: 6, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="CC"
                        textStyle="text-style-u-headline-small"
                    />
                </Region>
            </Region>
        </Region>
    );
};
