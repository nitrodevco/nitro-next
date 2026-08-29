import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `page_1` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage1ItemProps {
    layout?: BoxLayout;
    onPage1?: () => void;
}

export const GamesMainLayoutPage1Item = ({ layout, onPage1 }: GamesMainLayoutPage1ItemProps) => {
    return (
        <Region
            name="page_1"
            onPointerTap={onPage1}
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
