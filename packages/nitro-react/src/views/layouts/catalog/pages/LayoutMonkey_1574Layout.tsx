import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1574_layout_monkey_xml` (layout "ctlg_monkey", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMonkey_1574LayoutProps {
    ctlgMonkey?: LayoutMonkey_1574LayoutCtlgMonkeyProps;
    layout?: BoxLayout;
}

export const LayoutMonkey_1574Layout = ({ ctlgMonkey, layout }: LayoutMonkey_1574LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMonkey_1574LayoutCtlgMonkey {...ctlgMonkey} />
        </Region>
    );
};

/** Named region `ctlg_teaserimg_1_region` of LayoutMonkey_1574Layout - configured through the parent's `ctlgTeaserimg1Region` prop. */
export interface LayoutMonkey_1574LayoutCtlgTeaserimg1RegionProps {
    layout?: BoxLayout;
    onCtlgTeaserimg1Region?: () => void;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const LayoutMonkey_1574LayoutCtlgTeaserimg1Region = ({ layout, onCtlgTeaserimg1Region, srcCtlgTeaserimg1, tags }: LayoutMonkey_1574LayoutCtlgTeaserimg1RegionProps) => {
    return (
        <Region
            name="ctlg_teaserimg_1_region"
            tags={tags}
            onPointerTap={onCtlgTeaserimg1Region}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 339, top: 20, bottom: 96, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/catalog_monkey_teaser.gif'}
                layout={{ position: 'absolute', left: 0, width: 339, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `ctlg_special_img_region` of LayoutMonkey_1574Layout - configured through the parent's `ctlgSpecialImgRegion` prop. */
export interface LayoutMonkey_1574LayoutCtlgSpecialImgRegionProps {
    layout?: BoxLayout;
    onCtlgSpecialImgRegion?: () => void;
    srcCtlgSpecialImg?: string;
    tags?: string[];
}

export const LayoutMonkey_1574LayoutCtlgSpecialImgRegion = ({ layout, onCtlgSpecialImgRegion, srcCtlgSpecialImg, tags }: LayoutMonkey_1574LayoutCtlgSpecialImgRegionProps) => {
    return (
        <Region
            name="ctlg_special_img_region"
            tags={tags}
            onPointerTap={onCtlgSpecialImgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 339, bottom: 5, height: 80, ...layout }}
        >
            <ThemeImage
                name="ctlg_special_img"
                src={srcCtlgSpecialImg ?? '${image.library.url}catalogue/catalog_monkey_store2_en.gif'}
                layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 80 }}
            />
        </Region>
    );
};

/** Named region `ctlg_monkey` of LayoutMonkey_1574Layout - configured through the parent's `ctlgMonkey` prop. */
export interface LayoutMonkey_1574LayoutCtlgMonkeyProps {
    ctlgSpecialImgRegion?: LayoutMonkey_1574LayoutCtlgSpecialImgRegionProps;
    ctlgTeaserimg1Region?: LayoutMonkey_1574LayoutCtlgTeaserimg1RegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const LayoutMonkey_1574LayoutCtlgMonkey = ({ ctlgSpecialImgRegion, ctlgTeaserimg1Region, layout, tags }: LayoutMonkey_1574LayoutCtlgMonkeyProps) => {
    return (
        <Region
            name="ctlg_monkey"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutMonkey_1574LayoutCtlgTeaserimg1Region {...ctlgTeaserimg1Region} />
            <LayoutMonkey_1574LayoutCtlgSpecialImgRegion {...ctlgSpecialImgRegion} />
        </Region>
    );
};
