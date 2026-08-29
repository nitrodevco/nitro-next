import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ErrorPopupLayoutButtonRowItem } from './ErrorPopupLayoutButtonRowItem';
import { ErrorPopupLayoutDoNotShowContainerItem } from './ErrorPopupLayoutDoNotShowContainerItem';
import { ErrorPopupLayoutErrorInfoBorderItem } from './ErrorPopupLayoutErrorInfoBorderItem';
import { ErrorPopupLayoutErrorMsgTextItem } from './ErrorPopupLayoutErrorMsgTextItem';
import { ErrorPopupLayoutInfoTextItem } from './ErrorPopupLayoutInfoTextItem';

/** Named region `content_list` of ErrorPopupLayout - configured through the parent's `contentList` prop. */
export interface ErrorPopupLayoutContentListProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutContentList = ({ itemsContentList, layout }: ErrorPopupLayoutContentListProps) => {
    return (
        <Region
            name="content_list"
            layout={{ position: 'absolute', left: 17, right: 6, top: 10, height: 271, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContentList ?? (
                <>
                    <ErrorPopupLayoutErrorMsgTextItem />
                    <ErrorPopupLayoutInfoTextItem />
                    <ErrorPopupLayoutErrorInfoBorderItem />
                    <ErrorPopupLayoutDoNotShowContainerItem />
                    <ErrorPopupLayoutButtonRowItem />
                </>
            )}
        </Region>
    );
};
