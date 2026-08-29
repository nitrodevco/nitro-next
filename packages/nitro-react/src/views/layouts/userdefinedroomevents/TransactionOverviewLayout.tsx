import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1134_transaction_overview_xml` (layout "transaction_overview", 880x391) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionOverviewLayoutProps {
    footer?: TransactionOverviewLayoutFooterProps;
    header?: TransactionOverviewLayoutHeaderProps;
    layout?: BoxLayout;
    middle?: TransactionOverviewLayoutMiddleProps;
    onClose?: () => void;
}

export const TransactionOverviewLayout = ({ footer, header, layout, middle, onClose }: TransactionOverviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.logs.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 880, height: 391, ...layout }}
        >
            <TransactionOverviewLayoutHeader {...header} />
            <TransactionOverviewLayoutMiddle {...middle} />
            <TransactionOverviewLayoutFooter {...footer} />
        </Frame>
    );
};

/** Row template `list_type_key` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutListTypeKeyItemProps {
    captionListTypeKey?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutListTypeKeyItem = ({ captionListTypeKey, layout }: TransactionOverviewLayoutListTypeKeyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list_type_key"
            layout={{ width: 57, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionListTypeKey ?? t('wiredchests.logs.list_type')} />
        </Region>
    );
};

/** Row template `list_type_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutListTypeValueItemProps {
    captionListTypeValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutListTypeValueItem = ({ captionListTypeValue, layout }: TransactionOverviewLayoutListTypeValueItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list_type_value"
            layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionListTypeValue ?? t('wiredchests.logs.type.0')} />
        </Region>
    );
};

/** Row template `pair` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutPairItemProps {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPairItem = ({ itemsPair, layout }: TransactionOverviewLayoutPairItemProps) => {
    return (
        <Region
            name="pair"
            layout={{ width: 94, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <TransactionOverviewLayoutListTypeKeyItem />
                    <TransactionOverviewLayoutListTypeValueItem />
                </>
            )}
        </Region>
    );
};

/** Row template `id_key` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutIdKeyItemProps {
    captionIdKey?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutIdKeyItem = ({ captionIdKey, layout }: TransactionOverviewLayoutIdKeyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="id_key"
            layout={{ width: 53, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionIdKey ?? t('wiredchests.logs.chest_id')} />
        </Region>
    );
};

/** Row template `id_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutIdValueItemProps {
    captionIdValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutIdValueItem = ({ captionIdValue, layout }: TransactionOverviewLayoutIdValueItemProps) => {
    return (
        <Region
            name="id_value"
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionIdValue ?? '12345'} />
        </Region>
    );
};

/** Row template `pair` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutPairItem2Props {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPairItem2 = ({ itemsPair, layout }: TransactionOverviewLayoutPairItem2Props) => {
    return (
        <Region
            name="pair"
            layout={{ width: 93, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <TransactionOverviewLayoutIdKeyItem />
                    <TransactionOverviewLayoutIdValueItem />
                </>
            )}
        </Region>
    );
};

/** Named region `key_value_pairs` of TransactionOverviewLayout - configured through the parent's `keyValuePairs` prop. */
export interface TransactionOverviewLayoutKeyValuePairsProps {
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutKeyValuePairs = ({ itemsKeyValuePairs, layout }: TransactionOverviewLayoutKeyValuePairsProps) => {
    return (
        <Region
            name="key_value_pairs"
            layout={{ position: 'absolute', left: 15, width: 400, top: 13, height: 42, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsKeyValuePairs ?? (
                <>
                    <TransactionOverviewLayoutPairItem />
                    <TransactionOverviewLayoutPairItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `header` of TransactionOverviewLayout - configured through the parent's `header` prop. */
export interface TransactionOverviewLayoutHeaderProps {
    captionWarningText?: string;
    keyValuePairs?: TransactionOverviewLayoutKeyValuePairsProps;
    layout?: BoxLayout;
    onRefreshBtn?: () => void;
    visibleSearchingIcon?: boolean;
}

export const TransactionOverviewLayoutHeader = ({ captionWarningText, keyValuePairs, layout, onRefreshBtn, visibleSearchingIcon }: TransactionOverviewLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 62, ...layout }}
        >
            <Region
                name="warning_text"
                visible={false}
                layout={{ position: 'absolute', left: 10, right: 9, top: 10, bottom: -6, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionWarningText ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 861 }}
                />
            </Region>
            <TransactionOverviewLayoutKeyValuePairs {...keyValuePairs} />
            <Button
                variant="3"
                name="refresh_btn"
                onPointerTap={onRefreshBtn}
                layout={{ position: 'absolute', right: 17, width: 62, top: 13, height: 30 }}
            >
                {t('wiredchests.logs.refresh')}
            </Button>
            <Region
                visible={visibleSearchingIcon ?? false}
                layout={{ position: 'absolute', left: 777, width: 15, top: 20, height: 15 }}
            >
                <Icon
                    variant="23"
                    name="searching_icon"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `table_view` of TransactionOverviewLayout - configured through the parent's `tableView` prop. */
export interface TransactionOverviewLayoutTableViewProps {
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutTableView = ({ layout }: TransactionOverviewLayoutTableViewProps) => {
    return (
        <Region
            name="table_view"
            layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `middle` of TransactionOverviewLayout - configured through the parent's `middle` prop. */
export interface TransactionOverviewLayoutMiddleProps {
    layout?: BoxLayout;
    tableView?: TransactionOverviewLayoutTableViewProps;
}

export const TransactionOverviewLayoutMiddle = ({ layout, tableView }: TransactionOverviewLayoutMiddleProps) => {
    return (
        <Region
            name="middle"
            layout={{ position: 'absolute', left: 1, right: 1, top: 62, bottom: 95, ...layout }}
        >
            <TransactionOverviewLayoutTableView {...tableView} />
        </Region>
    );
};

/** Row template `first_page_btn` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutFirstPageBtnItemProps {
    layout?: BoxLayout;
    onFirstPageBtn?: () => void;
}

export const TransactionOverviewLayoutFirstPageBtnItem = ({ layout, onFirstPageBtn }: TransactionOverviewLayoutFirstPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="first_page_btn"
            onPointerTap={onFirstPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `prev_page_btn` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutPrevPageBtnItemProps {
    layout?: BoxLayout;
    onPrevPageBtn?: () => void;
}

export const TransactionOverviewLayoutPrevPageBtnItem = ({ layout, onPrevPageBtn }: TransactionOverviewLayoutPrevPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="prev_page_btn"
            onPointerTap={onPrevPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 22, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Named region `footer_buttons_left` of TransactionOverviewLayout - configured through the parent's `footerButtonsLeft` prop. */
export interface TransactionOverviewLayoutFooterButtonsLeftProps {
    itemsFooterButtonsLeft?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutFooterButtonsLeft = ({ itemsFooterButtonsLeft, layout }: TransactionOverviewLayoutFooterButtonsLeftProps) => {
    return (
        <Region
            name="footer_buttons_left"
            layout={{ position: 'absolute', left: 17, width: 113, top: 0, height: 30, flexDirection: 'row', gap: 13, ...layout }}
        >
            {itemsFooterButtonsLeft ?? (
                <>
                    <TransactionOverviewLayoutFirstPageBtnItem />
                    <TransactionOverviewLayoutPrevPageBtnItem />
                </>
            )}
        </Region>
    );
};

/** Row template `next_page_btn` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutNextPageBtnItemProps {
    layout?: BoxLayout;
    onNextPageBtn?: () => void;
}

export const TransactionOverviewLayoutNextPageBtnItem = ({ layout, onNextPageBtn }: TransactionOverviewLayoutNextPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="next_page_btn"
            onPointerTap={onNextPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 23, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `last_page_btn` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutLastPageBtnItemProps {
    layout?: BoxLayout;
    onLastPageBtn?: () => void;
}

export const TransactionOverviewLayoutLastPageBtnItem = ({ layout, onLastPageBtn }: TransactionOverviewLayoutLastPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="last_page_btn"
            onPointerTap={onLastPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Named region `footer_buttons_right` of TransactionOverviewLayout - configured through the parent's `footerButtonsRight` prop. */
export interface TransactionOverviewLayoutFooterButtonsRightProps {
    itemsFooterButtonsRight?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutFooterButtonsRight = ({ itemsFooterButtonsRight, layout }: TransactionOverviewLayoutFooterButtonsRightProps) => {
    return (
        <Region
            name="footer_buttons_right"
            layout={{ position: 'absolute', right: 17, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsFooterButtonsRight ?? (
                <>
                    <TransactionOverviewLayoutNextPageBtnItem />
                    <TransactionOverviewLayoutLastPageBtnItem />
                </>
            )}
        </Region>
    );
};

/** Named region `pagination` of TransactionOverviewLayout - configured through the parent's `pagination` prop. */
export interface TransactionOverviewLayoutPaginationProps {
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    footerButtonsLeft?: TransactionOverviewLayoutFooterButtonsLeftProps;
    footerButtonsRight?: TransactionOverviewLayoutFooterButtonsRightProps;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPagination = ({ captionPaginaTextEnd, captionPaginaTextStart, footerButtonsLeft, footerButtonsRight, layout }: TransactionOverviewLayoutPaginationProps) => {
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Region
            name="pagination"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 30, justifyContent: 'center', ...layout }}
        >
            <TransactionOverviewLayoutFooterButtonsLeft {...footerButtonsLeft} />
            <TransactionOverviewLayoutFooterButtonsRight {...footerButtonsRight} />
            <Region layout={{ position: 'absolute', width: 256, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="pagina_text_start"
                    layout={{ width: 205, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPaginaTextStart ?? 'X transactions found. Showing page '} />
                </Region>
                <TextInput
                    value={paginaNumberInputValue}
                    onChange={setPaginaNumberInputValue}
                    layout={{ width: 21, height: 17, flexShrink: 0 }}
                />
                <Region
                    name="pagina_text_end"
                    layout={{ width: 26, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPaginaTextEnd ?? 'of Y'} />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `footer` of TransactionOverviewLayout - configured through the parent's `footer` prop. */
export interface TransactionOverviewLayoutFooterProps {
    layout?: BoxLayout;
    pagination?: TransactionOverviewLayoutPaginationProps;
}

export const TransactionOverviewLayoutFooter = ({ layout, pagination }: TransactionOverviewLayoutFooterProps) => {
    return (
        <Region
            name="footer"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 35, height: 60, ...layout }}
        >
            <TransactionOverviewLayoutPagination {...pagination} />
        </Region>
    );
};
