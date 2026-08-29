import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `page_0` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage0ItemProps {
    layout?: BoxLayout;
    onPage0?: () => void;
}

export const GamesMainLayoutPage0Item = ({ layout, onPage0 }: GamesMainLayoutPage0ItemProps) => {
    return (
        <Region
            name="page_0"
            onPointerTap={onPage0}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};
