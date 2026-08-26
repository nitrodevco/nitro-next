import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1663_layout_monkey_xml` (layout "ctlg_monkey", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMonkey_1663LayoutProps {
    layout?: BoxLayout;
}

export const LayoutMonkey_1663Layout = ({ layout }: LayoutMonkey_1663LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_monkey"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_teaserimg_1_region"
                    params={17}
                    layout={{ position: 'absolute', left: 10, width: 339, top: 170, height: 184 }}
                />
                <Region
                    name="ctlg_special_img_region"
                    params={17}
                    layout={{ position: 'absolute', left: 10, width: 339, top: 365, height: 80 }}
                />
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src="${image.library.url}catalogue/catalog_monkey_teaser.gif"
                    layout={{ position: 'absolute', left: 0, width: 359, top: 170, height: 184 }}
                />
                <ThemeImage
                    name="ctlg_special_img"
                    params={16}
                    src="${image.library.url}catalogue/catalog_monkey_store2_en.gif"
                    layout={{ position: 'absolute', left: 0, width: 359, top: 365, height: 80 }}
                />
            </Region>
        </Region>
    );
};
