import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `3118_Outfit_xml` (layout "thumbnail", 35x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OutfitLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OutfitLayout = ({ layout, onButton }: OutfitLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 35, height: 60, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60 }}
            >
                <Button
                    variant="3"
                    name="button"
                    tags={[ 'BUTTON' ]}
                    params={1073872913}
                    onPointerTap={onButton}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 58 }}
                >
                    <ThemeImage
                        name="outfit_gradient"
                        params={133264}
                        src={layoutImage('collectables_score_background_gradient.png')}
                        layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 58 }}
                    />
                </Region>
                <ThemeImage
                    name="bitmap"
                    tags={[ 'BITMAP' ]}
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 60 }}
                />
            </Region>
        </Region>
    );
};
