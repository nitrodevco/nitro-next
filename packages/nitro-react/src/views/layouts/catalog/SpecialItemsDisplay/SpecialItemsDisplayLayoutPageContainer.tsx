import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SpecialItemsDisplayLayoutPageTemplateItem } from './SpecialItemsDisplayLayoutPageTemplateItem';
import { SpecialItemsDisplayLayoutPageTemplateItem2 } from './SpecialItemsDisplayLayoutPageTemplateItem2';
import { SpecialItemsDisplayLayoutPageTemplateItem3 } from './SpecialItemsDisplayLayoutPageTemplateItem3';

/** Named region `page_container` of SpecialItemsDisplayLayout - configured through the parent's `pageContainer` prop. */
export interface SpecialItemsDisplayLayoutPageContainerProps {
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutPageContainer = ({ itemsPageList, layout }: SpecialItemsDisplayLayoutPageContainerProps) => {
    return (
        <Region
            name="page_container"
            layout={{ position: 'absolute', left: 39, width: 342, top: 207, height: 11, justifyContent: 'center', ...layout }}
        >
            <Region
                name="page_list"
                layout={{ position: 'absolute', top: 0, bottom: 0, flexDirection: 'row', gap: 7 }}
            >
                {itemsPageList ?? (
                    <>
                        <SpecialItemsDisplayLayoutPageTemplateItem />
                        <SpecialItemsDisplayLayoutPageTemplateItem2 />
                        <SpecialItemsDisplayLayoutPageTemplateItem3 />
                    </>
                )}
            </Region>
        </Region>
    );
};
