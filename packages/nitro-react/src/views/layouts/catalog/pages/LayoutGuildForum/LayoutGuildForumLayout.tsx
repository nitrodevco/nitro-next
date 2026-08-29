import { BoxLayout, Region } from '#base/theme';

import { LayoutGuildForumLayoutCtlgDefault3x3, LayoutGuildForumLayoutCtlgDefault3x3Props } from './LayoutGuildForumLayoutCtlgDefault3x3';

/** Generated from `1724_layout_guild_forum_xml` (layout "layout_guild_forum", 360x662) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildForumLayoutProps {
    ctlgDefault3x3?: LayoutGuildForumLayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildForumLayout = ({ ctlgDefault3x3, layout }: LayoutGuildForumLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 662, ...layout }}>
            <LayoutGuildForumLayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};
