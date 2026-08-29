import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2636_table_view_xml` (layout "wired_menu_table_view", 472x177) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TableViewLayoutProps {
    layout?: BoxLayout;
    tableContainer?: TableViewLayoutTableContainerProps;
}

export const TableViewLayout = ({ layout, tableContainer }: TableViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 472, height: 177, ...layout }}>
            <TableViewLayoutTableContainer {...tableContainer} />
        </Region>
    );
};

/** Row template `column_name` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutColumnNameItemProps {
    captionColumnName?: string;
    layout?: BoxLayout;
}

export const TableViewLayoutColumnNameItem = ({ captionColumnName, layout }: TableViewLayoutColumnNameItemProps) => {
    return (
        <Region
            name="column_name"
            params={16}
            layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionColumnName ?? 'col1'} />
        </Region>
    );
};

/** Row template `table_titlerow` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableTitlerowItemProps {
    itemsTableTitlerow?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableTitlerowItem = ({ itemsTableTitlerow, layout }: TableViewLayoutTableTitlerowItemProps) => {
    return (
        <Region
            name="table_titlerow"
            params={16}
            layout={{ width: 440, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row', ...layout }}
        >
            {itemsTableTitlerow ?? (
                <TableViewLayoutColumnNameItem />
            )}
        </Region>
    );
};

/** Row template `splitter` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutSplitterItemProps {
    layout?: BoxLayout;
}

export const TableViewLayoutSplitterItem = ({ layout }: TableViewLayoutSplitterItemProps) => {
    return (
        <Region
            name="splitter"
            params={16}
            backgroundColor="#000000"
            layout={{ width: 440, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `top_spacer` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTopSpacerItemProps {
    layout?: BoxLayout;
}

export const TableViewLayoutTopSpacerItem = ({ layout }: TableViewLayoutTopSpacerItemProps) => {
    return (
        <Region
            name="top_spacer"
            params={16}
            layout={{ width: 0, height: 0, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `link_container` of TableViewLayout - configured through the parent's `linkContainer` prop. */
export interface TableViewLayoutLinkContainerProps {
    captionElementLink?: string;
    layout?: BoxLayout;
    onLinkContainer?: () => void;
    visibleLinkContainer?: boolean;
}

export const TableViewLayoutLinkContainer = ({ captionElementLink, layout, onLinkContainer, visibleLinkContainer }: TableViewLayoutLinkContainerProps) => {
    return (
        <Region
            name="link_container"
            params={934129}
            visible={visibleLinkContainer ?? false}
            onPointerTap={onLinkContainer}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 1, height: 17, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="element_link"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionElementLink ?? ''}
                    textOptions={{ fill: '#0000ee' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `extra_button` of TableViewLayout - configured through the parent's `extraButton` prop. */
export interface TableViewLayoutExtraButtonProps {
    layout?: BoxLayout;
    onExtraButton?: () => void;
    srcExtraButtonBitmap?: string;
}

export const TableViewLayoutExtraButton = ({ layout, onExtraButton, srcExtraButtonBitmap }: TableViewLayoutExtraButtonProps) => {
    return (
        <Region
            name="extra_button"
            params={81}
            onPointerTap={onExtraButton}
            cursor="pointer"
            layout={{ position: 'absolute', right: 3, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                name="extra_button_bitmap"
                params={16}
                src={srcExtraButtonBitmap ?? layoutImage('icons_info_grey.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Row template `table_element` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableElementItemProps {
    captionElementText?: string;
    extraButton?: TableViewLayoutExtraButtonProps;
    layout?: BoxLayout;
    linkContainer?: TableViewLayoutLinkContainerProps;
    onTableElement?: () => void;
    visibleHighlightBorder?: boolean;
}

export const TableViewLayoutTableElementItem = ({ captionElementText, extraButton, layout, linkContainer, onTableElement, visibleHighlightBorder }: TableViewLayoutTableElementItemProps) => {
    const [ elementInputValue, setElementInputValue ] = useState('');

    return (
        <Region
            name="table_element"
            params={17}
            onPointerTap={onTableElement}
            cursor="pointer"
            layout={{ width: 101, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, justifyContent: 'center', ...layout }}
        >
            <Region
                visible={visibleHighlightBorder ?? false}
                layout={{ position: 'absolute', left: 2, right: 2, top: 1, height: 17, minHeight: 17 }}
            >
                <Border
                    variant="2"
                    name="highlight_border"
                    params={144}
                    tintColor="#4fbce3"
                    blend={0.4}
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Region
                name="element_text"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionElementText ?? 'elem1'} />
            </Region>
            <TextInput
                value={elementInputValue}
                onChange={setElementInputValue}
                layout={{ position: 'absolute', left: 5, right: 5, top: 1, height: 18, minHeight: 18 }}
            />
            <TableViewLayoutLinkContainer {...linkContainer} />
            <TableViewLayoutExtraButton {...extraButton} />
        </Region>
    );
};

/** Row template `table_row` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableRowItemProps {
    itemsTableRow?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableRowItem = ({ itemsTableRow, layout }: TableViewLayoutTableRowItemProps) => {
    return (
        <Region
            name="table_row"
            params={2065}
            backgroundColor="#eaeaea"
            layout={{ width: 440, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, flexDirection: 'row', ...layout }}
        >
            {itemsTableRow ?? (
                <TableViewLayoutTableElementItem />
            )}
        </Region>
    );
};

/** Row template `bottom_spacer` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutBottomSpacerItemProps {
    layout?: BoxLayout;
}

export const TableViewLayoutBottomSpacerItem = ({ layout }: TableViewLayoutBottomSpacerItemProps) => {
    return (
        <Region
            name="bottom_spacer"
            params={16}
            layout={{ width: 0, height: 0, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `table_items` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableItemsItemProps {
    itemsTableItems?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableItemsItem = ({ itemsTableItems, layout }: TableViewLayoutTableItemsItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 462, height: 143, flexShrink: 0, ...layout }}
        >
            <Region
                name="table_items"
                params={144}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsTableItems ?? (
                    <>
                        <TableViewLayoutTopSpacerItem />
                        <TableViewLayoutTableRowItem />
                        <TableViewLayoutBottomSpacerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `table_contents` of TableViewLayout - configured through the parent's `tableContents` prop. */
export interface TableViewLayoutTableContentsProps {
    itemsTableContents?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableContents = ({ itemsTableContents, layout }: TableViewLayoutTableContentsProps) => {
    return (
        <Region
            name="table_contents"
            params={2192}
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, flexDirection: 'column', ...layout }}
        >
            {itemsTableContents ?? (
                <>
                    <TableViewLayoutTableTitlerowItem />
                    <TableViewLayoutSplitterItem />
                    <TableViewLayoutTableItemsItem />
                </>
            )}
        </Region>
    );
};

/** Named region `empty_container` of TableViewLayout - configured through the parent's `emptyContainer` prop. */
export interface TableViewLayoutEmptyContainerProps {
    captionNothingToDisplayText?: string;
    layout?: BoxLayout;
}

export const TableViewLayoutEmptyContainer = ({ captionNothingToDisplayText, layout }: TableViewLayoutEmptyContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="empty_container"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 29, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="nothing_to_display_text"
                params={3280}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 107, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNothingToDisplayText ?? t('wiredmenu.table.empty')}
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `table_container` of TableViewLayout - configured through the parent's `tableContainer` prop. */
export interface TableViewLayoutTableContainerProps {
    emptyContainer?: TableViewLayoutEmptyContainerProps;
    layout?: BoxLayout;
    tableContents?: TableViewLayoutTableContentsProps;
}

export const TableViewLayoutTableContainer = ({ emptyContainer, layout, tableContents }: TableViewLayoutTableContainerProps) => {
    return (
        <Region
            name="table_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 472, top: 0, height: 177, ...layout }}
        >
            <Border
                variant="0"
                name="table_border"
                params={2192}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TableViewLayoutTableContents {...tableContents} />
                <TableViewLayoutEmptyContainer {...emptyContainer} />
            </Border>
        </Region>
    );
};
