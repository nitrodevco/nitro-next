import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1568_bundlesInfoItem_xml` (layout "bundlesInfoItem", 182x142) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BundlesInfoItemLayoutProps {
    captionEqualsBundleText?: string;
    captionFooterText?: string;
    captionFreeText?: string;
    captionHeaderText?: string;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    srcBackgroundBitmap?: string;
    srcFormulaBitmap?: string;
}

export const BundlesInfoItemLayout = ({ captionEqualsBundleText, captionFooterText, captionFreeText, captionHeaderText, layout, onClickRegion, srcBackgroundBitmap, srcFormulaBitmap }: BundlesInfoItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 182, height: 142, ...layout }}>
            <Region
                name="info_container"
                layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 142 }}
            >
                <ThemeImage
                    name="background_bitmap"
                    params={16}
                    src={srcBackgroundBitmap ?? layoutImage('catalogue_clakboard.png')}
                    layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 142 }}
                />
                <Region
                    name="header_text"
                    layout={{ position: 'absolute', left: 4, width: 174, top: 11, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeaderText ?? t('catalog.bundlewidget.info.header')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="formula_bitmap"
                    params={16}
                    src={srcFormulaBitmap ?? '${image.library.catalogue.url}clakboard_formula.png'}
                    layout={{ position: 'absolute', left: 33, width: 115, top: 44, height: 41 }}
                />
                <Region
                    name="underline_container"
                    params={16}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 45, width: 88, top: 84, height: 1 }}
                />
                <Region
                    name="free_text"
                    params={16}
                    layout={{ position: 'absolute', left: 103, width: 166, top: 67, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFreeText ?? t('catalog.bundlewidget.info.for.free')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="equals_bundle_text"
                    params={16}
                    layout={{ position: 'absolute', left: 34, width: 116, top: 85, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEqualsBundleText ?? t('catalog.bundlewidget.info.equals.bundle')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="footer_text"
                    layout={{ position: 'absolute', left: 4, width: 174, top: 105, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionFooterText ?? t('catalog.bundlewidget.info.footer')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                    />
                </Region>
                <Region
                    name="click_region"
                    params={17}
                    onPointerTap={onClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 182, top: 1, height: 142 }}
                />
            </Region>
        </Region>
    );
};
