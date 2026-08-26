import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `303_snowwar_exit_xml` (layout "snowwar_exit", 68x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarExitLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarExitLayout = ({ layout }: SnowwarExitLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 68, height: 50, ...layout }}>
            <Region
                name="exitButton"
                params={1}
                layout={{ position: 'absolute', left: 0, width: 68, top: 0, height: 50 }}
            >
                <ThemeImage
                    name="backgroundImage"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={layoutImage('ui_exit_down.png')}
                    layout={{ position: 'absolute', left: 0, width: 68, top: 0, height: 50 }}
                />
            </Region>
        </Region>
    );
};
