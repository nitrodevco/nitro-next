import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3118_Outfit_xml` (layout "thumbnail", 35x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OutfitLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcBitmap?: string;
    srcOutfitGradient?: string;
    visibleOutfitGradient?: boolean;
}

export const OutfitLayout = ({ layout, onButton, srcBitmap, srcOutfitGradient, visibleOutfitGradient }: OutfitLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 35, height: 60, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60 }}>
                <Button
                    variant="3"
                    name="button"
                    onPointerTap={onButton}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60, overflow: 'hidden' }}
                />
                {(visibleOutfitGradient ?? false) && (
                    <ThemeImage
                        name="outfit_gradient"
                        src={srcOutfitGradient ?? layoutImage('collectables_score_background_gradient.png')}
                        layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                    />
                )}
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60 }}
                />
            </Region>
        </Region>
    );
};
