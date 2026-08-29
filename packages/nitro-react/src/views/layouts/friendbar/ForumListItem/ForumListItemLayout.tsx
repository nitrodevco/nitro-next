import { BoxLayout, Region } from '#base/theme';

import { ForumListItemLayoutMainBox, ForumListItemLayoutMainBoxProps } from './ForumListItemLayoutMainBox';

/** Generated from `83_forum_list_item_xml` (layout "forum_list_item", 500x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ForumListItemLayoutProps {
    layout?: BoxLayout;
    mainBox?: ForumListItemLayoutMainBoxProps;
}

export const ForumListItemLayout = ({ layout, mainBox }: ForumListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 41, ...layout }}>
            <ForumListItemLayoutMainBox {...mainBox} />
        </Region>
    );
};
