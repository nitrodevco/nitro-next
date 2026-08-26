import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `79_element_title_xml` (layout "element_title", 250x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementTitleLayoutProps {
    layout?: BoxLayout;
}

export const ElementTitleLayout = ({ layout }: ElementTitleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 18, ...layout }}>
            <Region
                params={147600}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 18 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="title_txt"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 18, width: 133, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('landing.view.pageexpiry.title')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    params={144}
                    src={layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 150, width: 100, top: 10, height: 4 }}
                />
            </Region>
        </Region>
    );
};
