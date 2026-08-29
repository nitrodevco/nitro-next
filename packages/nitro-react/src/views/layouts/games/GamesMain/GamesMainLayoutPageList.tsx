import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { GamesMainLayoutPage0Item } from './GamesMainLayoutPage0Item';
import { GamesMainLayoutPage1Item } from './GamesMainLayoutPage1Item';
import { GamesMainLayoutPage2Item } from './GamesMainLayoutPage2Item';
import { GamesMainLayoutPage3Item } from './GamesMainLayoutPage3Item';
import { GamesMainLayoutPage4Item } from './GamesMainLayoutPage4Item';

/** Named region `page_list` of GamesMainLayout - configured through the parent's `pageList` prop. */
export interface GamesMainLayoutPageListProps {
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
}

export const GamesMainLayoutPageList = ({ itemsPageList, layout }: GamesMainLayoutPageListProps) => {
    return (
        <Region
            name="page_list"
            layout={{ position: 'absolute', width: 125, top: 239, height: 25, flexDirection: 'row', ...layout }}
        >
            {itemsPageList ?? (
                <>
                    <GamesMainLayoutPage0Item />
                    <GamesMainLayoutPage1Item />
                    <GamesMainLayoutPage2Item />
                    <GamesMainLayoutPage3Item />
                    <GamesMainLayoutPage4Item />
                </>
            )}
        </Region>
    );
};
