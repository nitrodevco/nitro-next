import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `312_snowwar_lobby_player_xml` (layout "snowwar_lobby_player", 62x63) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerLayoutProps {
    layout?: BoxLayout;
    region?: SnowwarLobbyPlayerLayoutRegionProps;
}

export const SnowwarLobbyPlayerLayout = ({ layout, region }: SnowwarLobbyPlayerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 63, ...layout }}>
            <SnowwarLobbyPlayerLayoutRegion {...region} />
        </Region>
    );
};

/** Named region `region` of SnowwarLobbyPlayerLayout - configured through the parent's `region` prop. */
export interface SnowwarLobbyPlayerLayoutRegionProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    srcBgImage?: string;
    srcImage?: string;
}

export const SnowwarLobbyPlayerLayoutRegion = ({ layout, onRegion, srcBgImage, srcImage }: SnowwarLobbyPlayerLayoutRegionProps) => {
    return (
        <Region
            name="region"
            onPointerTap={onRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63, ...layout }}
        >
            <ThemeImage
                name="bg_image"
                src={srcBgImage ?? layoutImage('blue_square.png')}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63 }}
            />
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63 }}
            />
        </Region>
    );
};
