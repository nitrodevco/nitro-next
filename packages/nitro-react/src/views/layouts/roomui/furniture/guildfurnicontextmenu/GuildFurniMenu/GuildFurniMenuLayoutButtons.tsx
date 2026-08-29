import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { GuildFurniMenuLayoutHomeRoomItem } from './GuildFurniMenuLayoutHomeRoomItem';
import { GuildFurniMenuLayoutJoinItem } from './GuildFurniMenuLayoutJoinItem';
import { GuildFurniMenuLayoutOpenForumItem } from './GuildFurniMenuLayoutOpenForumItem';

/** Named region `buttons` of GuildFurniMenuLayout - configured through the parent's `buttons` prop. */
export interface GuildFurniMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const GuildFurniMenuLayoutButtons = ({ itemsButtons, layout }: GuildFurniMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 80, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <GuildFurniMenuLayoutJoinItem />
                    <GuildFurniMenuLayoutHomeRoomItem />
                    <GuildFurniMenuLayoutOpenForumItem />
                </>
            )}
        </Region>
    );
};
