import { BoxLayout, Region } from '#base/theme';

import { ThreadListItemLayoutMainBox, ThreadListItemLayoutMainBoxProps } from './ThreadListItemLayoutMainBox';

/** Generated from `19_thread_list_item_xml` (layout "thread_list_item", 600x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ThreadListItemLayoutProps {
    layout?: BoxLayout;
    mainBox?: ThreadListItemLayoutMainBoxProps;
}

export const ThreadListItemLayout = ({ layout, mainBox }: ThreadListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 600, height: 40, ...layout }}>
            <ThreadListItemLayoutMainBox {...mainBox} />
        </Region>
    );
};
