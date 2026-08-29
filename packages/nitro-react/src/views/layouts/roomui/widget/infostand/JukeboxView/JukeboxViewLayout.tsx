import { ReactNode } from 'react';

import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

import { JukeboxViewLayoutInfostandElementList, JukeboxViewLayoutInfostandElementListProps } from './JukeboxViewLayoutInfostandElementList';
import { JukeboxViewLayoutMoveItem } from './JukeboxViewLayoutMoveItem';
import { JukeboxViewLayoutPickupItem } from './JukeboxViewLayoutPickupItem';
import { JukeboxViewLayoutRotateItem } from './JukeboxViewLayoutRotateItem';
import { JukeboxViewLayoutUseItem } from './JukeboxViewLayoutUseItem';

/** Generated from `891_jukebox_view_xml` (layout "furni_view", 429x345) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface JukeboxViewLayoutProps {
    infostandElementList?: JukeboxViewLayoutInfostandElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const JukeboxViewLayout = ({ infostandElementList, itemsButtonList, layout, onClose }: JukeboxViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 345, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 310, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <JukeboxViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Region
                    name="button_list"
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <JukeboxViewLayoutMoveItem />
                            <JukeboxViewLayoutRotateItem />
                            <JukeboxViewLayoutPickupItem />
                            <JukeboxViewLayoutUseItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
