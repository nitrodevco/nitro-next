import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1873_rarity_item_overlay_preview_xml` (layout "rarity_item_overlay_preview", 36x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RarityItemOverlayPreviewLayoutProps {
    layout?: BoxLayout;
    rarityItemWidget?: RarityItemOverlayPreviewLayoutRarityItemWidgetProps;
}

export const RarityItemOverlayPreviewLayout = ({ layout, rarityItemWidget }: RarityItemOverlayPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 28, ...layout }}>
            <RarityItemOverlayPreviewLayoutRarityItemWidget {...rarityItemWidget} />
        </Region>
    );
};

/** Named region `rarityItemWidget` of RarityItemOverlayPreviewLayout - configured through the parent's `rarityItemWidget` prop. */
export interface RarityItemOverlayPreviewLayoutRarityItemWidgetProps {
    captionLevel?: string;
    layout?: BoxLayout;
    srcPlaque?: string;
}

export const RarityItemOverlayPreviewLayoutRarityItemWidget = ({ captionLevel, layout, srcPlaque }: RarityItemOverlayPreviewLayoutRarityItemWidgetProps) => {
    return (
        <Region
            name="rarityItemWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 28, ...layout }}
        >
            <ThemeImage
                name="plaque"
                params={16}
                src={srcPlaque ?? layoutImage('rarity_item_rarity_preview_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 28 }}
            />
            <Region
                name="level"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 36, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionLevel ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#333300', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
