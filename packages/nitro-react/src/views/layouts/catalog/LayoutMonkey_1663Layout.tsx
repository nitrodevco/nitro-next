import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1663_layout_monkey_xml` (layout "ctlg_monkey", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMonkey_1663LayoutProps {
    ctlgMonkey?: LayoutMonkey_1663LayoutCtlgMonkeyProps;
    layout?: BoxLayout;
}

export const LayoutMonkey_1663Layout = ({ ctlgMonkey, layout }: LayoutMonkey_1663LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMonkey_1663LayoutCtlgMonkey {...ctlgMonkey} />
        </Region>
    );
};

/** Named region `ctlg_teaserimg_1_region` of LayoutMonkey_1663Layout - configured through the parent's `ctlgTeaserimg1Region` prop. */
export interface LayoutMonkey_1663LayoutCtlgTeaserimg1RegionProps {
    layout?: BoxLayout;
    onCtlgTeaserimg1Region?: () => void;
}

export const LayoutMonkey_1663LayoutCtlgTeaserimg1Region = ({ layout, onCtlgTeaserimg1Region }: LayoutMonkey_1663LayoutCtlgTeaserimg1RegionProps) => {
    return (
        <Region
            name="ctlg_teaserimg_1_region"
            params={17}
            onPointerTap={onCtlgTeaserimg1Region}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 339, top: 170, height: 184, ...layout }}
        />
    );
};

/** Named region `ctlg_special_img_region` of LayoutMonkey_1663Layout - configured through the parent's `ctlgSpecialImgRegion` prop. */
export interface LayoutMonkey_1663LayoutCtlgSpecialImgRegionProps {
    layout?: BoxLayout;
    onCtlgSpecialImgRegion?: () => void;
}

export const LayoutMonkey_1663LayoutCtlgSpecialImgRegion = ({ layout, onCtlgSpecialImgRegion }: LayoutMonkey_1663LayoutCtlgSpecialImgRegionProps) => {
    return (
        <Region
            name="ctlg_special_img_region"
            params={17}
            onPointerTap={onCtlgSpecialImgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 339, top: 365, height: 80, ...layout }}
        />
    );
};

/** Named region `ctlg_monkey` of LayoutMonkey_1663Layout - configured through the parent's `ctlgMonkey` prop. */
export interface LayoutMonkey_1663LayoutCtlgMonkeyProps {
    ctlgSpecialImgRegion?: LayoutMonkey_1663LayoutCtlgSpecialImgRegionProps;
    ctlgTeaserimg1Region?: LayoutMonkey_1663LayoutCtlgTeaserimg1RegionProps;
    layout?: BoxLayout;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutMonkey_1663LayoutCtlgMonkey = ({ ctlgSpecialImgRegion, ctlgTeaserimg1Region, layout, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutMonkey_1663LayoutCtlgMonkeyProps) => {
    return (
        <Region
            name="ctlg_monkey"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LayoutMonkey_1663LayoutCtlgTeaserimg1Region {...ctlgTeaserimg1Region} />
            <LayoutMonkey_1663LayoutCtlgSpecialImgRegion {...ctlgSpecialImgRegion} />
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/catalog_monkey_teaser.gif'}
                layout={{ position: 'absolute', left: 0, width: 359, top: 170, height: 184 }}
            />
            <ThemeImage
                name="ctlg_special_img"
                params={16}
                src={srcCtlgSpecialImg ?? '${image.library.url}catalogue/catalog_monkey_store2_en.gif'}
                layout={{ position: 'absolute', left: 0, width: 359, top: 365, height: 80 }}
            />
        </Region>
    );
};
