import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `page_4` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage4ItemProps {
    layout?: BoxLayout;
    onPage4?: () => void;
}

export const GamesMainLayoutPage4Item = ({ layout, onPage4 }: GamesMainLayoutPage4ItemProps) => {
    return (
        <Region
            name="page_4"
            onPointerTap={onPage4}
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
