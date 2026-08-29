import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ErrorPopupLayoutCopyButtonItem } from './ErrorPopupLayoutCopyButtonItem';
import { ErrorPopupLayoutOkButtonItem } from './ErrorPopupLayoutOkButtonItem';

/** Row template `button_row` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutButtonRowItemProps {
    itemsButtonRow?: ReactNode;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutButtonRowItem = ({ itemsButtonRow, layout }: ErrorPopupLayoutButtonRowItemProps) => {
    return (
        <Region
            name="button_row"
            layout={{ width: 265, height: 30, flexShrink: 0, flexDirection: 'row', gap: 15, ...layout }}
        >
            {itemsButtonRow ?? (
                <>
                    <ErrorPopupLayoutOkButtonItem />
                    <ErrorPopupLayoutCopyButtonItem />
                </>
            )}
        </Region>
    );
};
