import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1663_layout_monkey_xml` (layout "ctlg_monkey", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMonkey_1663LayoutProps {
    layout?: BoxLayout;
    onCtlgSpecialImgRegion?: () => void;
    onCtlgTeaserimg1Region?: () => void;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutMonkey_1663Layout = ({ layout, onCtlgSpecialImgRegion, onCtlgTeaserimg1Region, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutMonkey_1663LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_monkey"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_teaserimg_1_region"
                    onPointerTap={onCtlgTeaserimg1Region}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 339, top: 170, height: 184 }}
                />
                <Region
                    name="ctlg_special_img_region"
                    onPointerTap={onCtlgSpecialImgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 339, top: 365, height: 80 }}
                />
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/catalog_monkey_teaser.gif'}
                    layout={{ position: 'absolute', left: 0, width: 359, top: 170, height: 184 }}
                />
                <ThemeImage
                    name="ctlg_special_img"
                    src={srcCtlgSpecialImg ?? '${image.library.url}catalogue/catalog_monkey_store2_en.gif'}
                    layout={{ position: 'absolute', left: 0, width: 359, top: 365, height: 80 }}
                />
            </Region>
        </Region>
    );
};
