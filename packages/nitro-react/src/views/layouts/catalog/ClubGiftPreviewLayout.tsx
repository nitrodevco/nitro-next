import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1681_club_gift_preview_xml` (layout "club_gift_preview", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftPreviewLayoutProps {
    layout?: BoxLayout;
    srcImage?: string;
}

export const ClubGiftPreviewLayout = ({ layout, srcImage }: ClubGiftPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 21, width: 200, top: 12, height: 200 }}
            >
                <ThemeImage
                    name="image"
                    params={12582928}
                    src={srcImage}
                    layout={{ position: 'absolute', left: 20, top: 20 }}
                />
            </Border>
        </Region>
    );
};
