import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `furni_container` of RoomCompetitionLayout - pass real rows through its `items…` slot. */
export interface RoomCompetitionLayoutFurniContainerItemProps {
    layout?: BoxLayout;
    srcFurniIcon?: string;
    srcTickIcon?: string;
    tintFurniIcon?: string;
    visibleFurniIcon?: boolean;
    visibleTickIcon?: boolean;
}

export const RoomCompetitionLayoutFurniContainerItem = ({ layout, srcFurniIcon, srcTickIcon, tintFurniIcon, visibleFurniIcon, visibleTickIcon }: RoomCompetitionLayoutFurniContainerItemProps) => {
    return (
        <Region
            name="furni_container"
            layout={{ width: 32, height: 35, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_chisel.png')}
                layout={{ position: 'absolute', left: 0, width: 32, top: 4, height: 31 }}
            />
            {(visibleFurniIcon ?? true) && (
                <ThemeImage
                    name="furni_icon"
                    src={srcFurniIcon}
                    tint={tintFurniIcon}
                    layout={{ position: 'absolute', left: 0, width: 32, top: 4, height: 31 }}
                />
            )}
            {(visibleTickIcon ?? true) && (
                <ThemeImage
                    name="tick_icon"
                    src={srcTickIcon ?? layoutImage('icons_tickmark.png')}
                    layout={{ position: 'absolute', left: 21, width: 11, top: 0, height: 10 }}
                />
            )}
        </Region>
    );
};
