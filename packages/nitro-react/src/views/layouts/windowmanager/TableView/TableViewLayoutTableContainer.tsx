import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { TableViewLayoutTableContents, TableViewLayoutTableContentsProps } from './TableViewLayoutTableContents';

/** Named region `table_container` of TableViewLayout - configured through the parent's `tableContainer` prop. */
export interface TableViewLayoutTableContainerProps {
    captionNothingToDisplayText?: string;
    layout?: BoxLayout;
    tableContents?: TableViewLayoutTableContentsProps;
}

export const TableViewLayoutTableContainer = ({ captionNothingToDisplayText, layout, tableContents }: TableViewLayoutTableContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="table_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="0"
                name="table_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TableViewLayoutTableContents {...tableContents} />
                <Region
                    name="empty_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 29, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNothingToDisplayText ?? t('wiredmenu.table.empty')}
                        textOptions={{ fill: '#333333' }}
                        name="nothing_to_display_text"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 107, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, minHeight: 17 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
