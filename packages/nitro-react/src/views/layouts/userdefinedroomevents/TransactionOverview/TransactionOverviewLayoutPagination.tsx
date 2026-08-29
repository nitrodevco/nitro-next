import { ReactNode, useState } from 'react';

import { BoxLayout, Region, TextInput } from '#base/theme';

import { TransactionOverviewLayoutFirstPageBtnItem } from './TransactionOverviewLayoutFirstPageBtnItem';
import { TransactionOverviewLayoutLastPageBtnItem } from './TransactionOverviewLayoutLastPageBtnItem';
import { TransactionOverviewLayoutNextPageBtnItem } from './TransactionOverviewLayoutNextPageBtnItem';
import { TransactionOverviewLayoutPrevPageBtnItem } from './TransactionOverviewLayoutPrevPageBtnItem';

/** Named region `pagination` of TransactionOverviewLayout - configured through the parent's `pagination` prop. */
export interface TransactionOverviewLayoutPaginationProps {
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsRight?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPagination = ({ captionPaginaTextEnd, captionPaginaTextStart, itemsFooterButtonsLeft, itemsFooterButtonsRight, layout }: TransactionOverviewLayoutPaginationProps) => {
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Region
            name="pagination"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 30, justifyContent: 'center', ...layout }}
        >
            <Region
                name="footer_buttons_left"
                layout={{ position: 'absolute', left: 17, width: 113, top: 0, height: 30, flexDirection: 'row', gap: 13 }}
            >
                {itemsFooterButtonsLeft ?? (
                    <>
                        <TransactionOverviewLayoutFirstPageBtnItem />
                        <TransactionOverviewLayoutPrevPageBtnItem />
                    </>
                )}
            </Region>
            <Region
                name="footer_buttons_right"
                layout={{ position: 'absolute', right: 17, width: 110, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
            >
                {itemsFooterButtonsRight ?? (
                    <>
                        <TransactionOverviewLayoutNextPageBtnItem />
                        <TransactionOverviewLayoutLastPageBtnItem />
                    </>
                )}
            </Region>
            <Region layout={{ position: 'absolute', width: 256, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="pagina_text_start"
                    layout={{ width: 205, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionPaginaTextStart ?? 'X transactions found. Showing page '}
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
                    {captionPaginaTextEnd ?? 'of Y'}
                </Region>
            </Region>
        </Region>
    );
};
