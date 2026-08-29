import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `page_2` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage2ItemProps {
    layout?: BoxLayout;
    onPage2?: () => void;
}

export const GamesMainLayoutPage2Item = ({ layout, onPage2 }: GamesMainLayoutPage2ItemProps) => {
    return (
        <Region
            name="page_2"
            onPointerTap={onPage2}
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
