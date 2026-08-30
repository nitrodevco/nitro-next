import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `info_container` of BundlesInfoItemLayout - configured through the parent's `infoContainer` prop. */
export interface BundlesInfoItemLayoutInfoContainerProps {
    captionEqualsBundleText?: string;
    captionFooterText?: string;
    captionFreeText?: string;
    captionHeaderText?: string;
    clickRegion?: ReactNode;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    srcBackgroundBitmap?: string;
    srcFormulaBitmap?: string;
    underlineContainer?: ReactNode;
}

export const BundlesInfoItemLayoutInfoContainer = ({ captionEqualsBundleText, captionFooterText, captionFreeText, captionHeaderText, clickRegion, layout, onClickRegion, srcBackgroundBitmap, srcFormulaBitmap, underlineContainer }: BundlesInfoItemLayoutInfoContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="background_bitmap"
                src={srcBackgroundBitmap ?? layoutImage('catalogue_clakboard.png')}
                layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 142 }}
            />
            <ThemeText
                text={captionHeaderText ?? t('catalog.bundlewidget.info.header')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                name="header_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 4, right: 4, top: 11, height: 15 }}
            />
            <ThemeImage
                name="formula_bitmap"
                src={srcFormulaBitmap ?? '${image.library.catalogue.url}clakboard_formula.png'}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 115, top: 44, height: 41 }}
            />
            <Region
                name="underline_container"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 88, top: 84, height: 1 }}
            >
                {underlineContainer}
            </Region>
            <ThemeText
                text={captionFreeText ?? t('catalog.bundlewidget.info.for.free')}
                textOptions={{ fill: '#ffffff' }}
                name="free_text"
                layout={{ position: 'absolute', left: 103, width: 166, alignSelf: 'center', marginTop: 3.5, marginBottom: -3.5, height: 15 }}
            />
            <ThemeText
                text={captionEqualsBundleText ?? t('catalog.bundlewidget.info.equals.bundle')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', align: 'center' }}
                name="equals_bundle_text"
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 116, top: 85, height: 18 }}
            />
            <ThemeText
                text={captionFooterText ?? t('catalog.bundlewidget.info.footer')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                name="footer_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 4, right: 4, top: 105, height: 15 }}
            />
            <Region
                name="click_region"
                onPointerTap={onClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, bottom: -1 }}
            >
                {clickRegion}
            </Region>
        </Region>
    );
};
