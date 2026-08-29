import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { GroupRoomInfoLayoutContentCont, GroupRoomInfoLayoutContentContProps } from './GroupRoomInfoLayoutContentCont';

/** Generated from `1184_group_room_info_xml` (layout "Group room info", 195x119) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupRoomInfoLayoutProps {
    contentCont?: GroupRoomInfoLayoutContentContProps;
    infoRegion?: ReactNode;
    layout?: BoxLayout;
    onInfoRegion?: () => void;
    onTitleRegion?: () => void;
    srcBgContracted?: string;
    srcBgExpanded?: string;
    titleRegion?: ReactNode;
}

export const GroupRoomInfoLayout = ({ contentCont, infoRegion, layout, onInfoRegion, onTitleRegion, srcBgContracted, srcBgExpanded, titleRegion }: GroupRoomInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 119, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 195, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bg_expanded"
                    src={srcBgExpanded ?? '${image.library.url}guilds/group_bg.png'}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119 }}
                />
                <ThemeImage
                    name="bg_contracted"
                    src={srcBgContracted ?? '${image.library.url}Events/event_bg_contracted.png'}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
                />
                <Region
                    name="title_region"
                    onPointerTap={onTitleRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 25 }}
                >
                    {titleRegion}
                </Region>
                <Region
                    name="info_region"
                    onPointerTap={onInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 28, height: 47 }}
                >
                    {infoRegion}
                </Region>
                <GroupRoomInfoLayoutContentCont {...contentCont} />
            </Region>
        </Region>
    );
};
