import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `page_3` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage3ItemProps {
    layout?: BoxLayout;
    onPage3?: () => void;
}

export const GamesMainLayoutPage3Item = ({ layout, onPage3 }: GamesMainLayoutPage3ItemProps) => {
    return (
        <Region
            name="page_3"
            onPointerTap={onPage3}
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
