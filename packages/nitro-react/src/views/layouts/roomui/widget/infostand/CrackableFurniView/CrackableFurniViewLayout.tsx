import { ReactNode } from 'react';

import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

import { CrackableFurniViewLayoutInfostandElementList, CrackableFurniViewLayoutInfostandElementListProps } from './CrackableFurniViewLayoutInfostandElementList';
import { CrackableFurniViewLayoutMoveItem } from './CrackableFurniViewLayoutMoveItem';
import { CrackableFurniViewLayoutPickupItem } from './CrackableFurniViewLayoutPickupItem';
import { CrackableFurniViewLayoutRotateItem } from './CrackableFurniViewLayoutRotateItem';
import { CrackableFurniViewLayoutUseItem } from './CrackableFurniViewLayoutUseItem';

/** Generated from `980_crackable_furni_view_xml` (layout "crackable_furni_view", 429x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CrackableFurniViewLayoutProps {
    infostandElementList?: CrackableFurniViewLayoutInfostandElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const CrackableFurniViewLayout = ({ infostandElementList, itemsButtonList, layout, onClose }: CrackableFurniViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 306, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 306, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 271, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <CrackableFurniViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Region
                    name="button_list"
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <CrackableFurniViewLayoutMoveItem />
                            <CrackableFurniViewLayoutRotateItem />
                            <CrackableFurniViewLayoutPickupItem />
                            <CrackableFurniViewLayoutUseItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
