import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1574_layout_monkey_xml` (layout "ctlg_monkey", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMonkey_1574LayoutProps {
    layout?: BoxLayout;
}

export const LayoutMonkey_1574Layout = ({ layout }: LayoutMonkey_1574LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_monkey"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_teaserimg_1_region"
                    params={2065}
                    layout={{ position: 'absolute', left: 10, width: 339, top: 20, height: 344 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={2064}
                        src="${image.library.url}catalogue/catalog_monkey_teaser.gif"
                        layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 344 }}
                    />
                </Region>
                <Region
                    name="ctlg_special_img_region"
                    params={1041}
                    layout={{ position: 'absolute', left: 10, width: 339, top: 375, height: 80 }}
                >
                    <ThemeImage
                        name="ctlg_special_img"
                        params={16}
                        src="${image.library.url}catalogue/catalog_monkey_store2_en.gif"
                        layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 80 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
