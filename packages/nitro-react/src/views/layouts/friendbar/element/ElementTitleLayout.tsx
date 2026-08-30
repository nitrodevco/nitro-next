import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `79_element_title_xml` (layout "element_title", 250x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementTitleLayoutProps {
    captionTitleTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const ElementTitleLayout = ({ captionTitleTxt, colorableTextColor, layout, srcBorderBar, srcHdrLine }: ElementTitleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 18, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <ThemeText
                    text={captionTitleTxt ?? t('landing.view.pageexpiry.title')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: colorableTextColor }}
                    name="title_txt"
                    layout={{ position: 'absolute', left: 18, width: 133, top: 4, height: 14 }}
                />
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 150, right: 0, top: 10, height: 4 }}
                />
            </Region>
        </Region>
    );
};
