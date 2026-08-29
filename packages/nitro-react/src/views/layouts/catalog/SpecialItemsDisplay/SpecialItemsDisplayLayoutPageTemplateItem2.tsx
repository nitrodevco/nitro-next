import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `page_template` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutPageTemplateItem2Props {
    layout?: BoxLayout;
    onPageTemplate?: () => void;
    srcPageImage?: string;
    visiblePageImage?: boolean;
}

export const SpecialItemsDisplayLayoutPageTemplateItem2 = ({ layout, onPageTemplate, srcPageImage, visiblePageImage }: SpecialItemsDisplayLayoutPageTemplateItem2Props) => {
    return (
        <Region
            name="page_template"
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            {(visiblePageImage ?? true) && (
                <ThemeImage
                    name="page_image"
                    src={srcPageImage ?? layoutImage('progress_disk_etched_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 11 }}
                />
            )}
        </Region>
    );
};
