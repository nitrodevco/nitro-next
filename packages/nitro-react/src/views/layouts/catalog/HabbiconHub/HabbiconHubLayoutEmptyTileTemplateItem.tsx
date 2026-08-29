import { Border, BoxLayout, Region } from '#base/theme';

/** Row template `empty_tile_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutEmptyTileTemplateItemProps {
    layout?: BoxLayout;
    onEmptyTileTemplate?: () => void;
    visibleTileBorder?: boolean;
}

export const HabbiconHubLayoutEmptyTileTemplateItem = ({ layout, onEmptyTileTemplate, visibleTileBorder }: HabbiconHubLayoutEmptyTileTemplateItemProps) => {
    return (
        <Region
            name="empty_tile_template"
            onPointerTap={onEmptyTileTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            {(visibleTileBorder ?? true) && (
                <Border
                    variant="2"
                    name="tile_border"
                    tintColor="#c8be8d"
                    blend={0.2}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
