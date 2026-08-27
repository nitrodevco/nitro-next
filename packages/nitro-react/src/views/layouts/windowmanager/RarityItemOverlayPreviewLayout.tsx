import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1873_rarity_item_overlay_preview_xml` (layout "rarity_item_overlay_preview", 36x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RarityItemOverlayPreviewLayoutProps {
    captionLevel?: string;
    layout?: BoxLayout;
    srcPlaque?: string;
}

export const RarityItemOverlayPreviewLayout = ({ captionLevel, layout, srcPlaque }: RarityItemOverlayPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 28, ...layout }}>
            <Region
                name="rarityItemWidget"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 28 }}
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
        </Region>
    );
};
