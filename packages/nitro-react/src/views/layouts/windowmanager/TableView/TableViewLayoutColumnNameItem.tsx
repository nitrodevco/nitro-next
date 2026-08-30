import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `column_name` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutColumnNameItemProps {
    captionColumnName?: string;
    layout?: BoxLayout;
}

export const TableViewLayoutColumnNameItem = ({ captionColumnName, layout }: TableViewLayoutColumnNameItemProps) => {
    return (
        <ThemeText
            text={captionColumnName ?? 'col1'}
            name="column_name"
            layout={{ width: 100, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
