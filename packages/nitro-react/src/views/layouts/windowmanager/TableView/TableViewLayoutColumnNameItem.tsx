import { BoxLayout, Region } from '#base/theme';

/** Row template `column_name` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutColumnNameItemProps {
    captionColumnName?: string;
    layout?: BoxLayout;
}

export const TableViewLayoutColumnNameItem = ({ captionColumnName, layout }: TableViewLayoutColumnNameItemProps) => {
    return (
        <Region
            name="column_name"
            layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionColumnName ?? 'col1'}
        </Region>
    );
};
