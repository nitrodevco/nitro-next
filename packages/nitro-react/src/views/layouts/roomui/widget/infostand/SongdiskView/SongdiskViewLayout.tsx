import { ReactNode } from 'react';

import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

import { SongdiskViewLayoutInfostandElementList, SongdiskViewLayoutInfostandElementListProps } from './SongdiskViewLayoutInfostandElementList';
import { SongdiskViewLayoutMoveItem } from './SongdiskViewLayoutMoveItem';
import { SongdiskViewLayoutPickupItem } from './SongdiskViewLayoutPickupItem';
import { SongdiskViewLayoutRotateItem } from './SongdiskViewLayoutRotateItem';

/** Generated from `1053_songdisk_view_xml` (layout "furni_view", 429x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SongdiskViewLayoutProps {
    infostandElementList?: SongdiskViewLayoutInfostandElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const SongdiskViewLayout = ({ infostandElementList, itemsButtonList, layout, onClose }: SongdiskViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 25, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 290, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <SongdiskViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Region
                    name="button_list"
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <SongdiskViewLayoutMoveItem />
                            <SongdiskViewLayoutRotateItem />
                            <SongdiskViewLayoutPickupItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
