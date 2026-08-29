import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { OwnAvatarMenuLayout_67Item } from './OwnAvatarMenuLayout_67Item';
import { OwnAvatarMenuLayoutBackItem } from './OwnAvatarMenuLayoutBackItem';
import { OwnAvatarMenuLayoutBlowItem } from './OwnAvatarMenuLayoutBlowItem';
import { OwnAvatarMenuLayoutChangeLooksItem } from './OwnAvatarMenuLayoutChangeLooksItem';
import { OwnAvatarMenuLayoutChangeNameItem } from './OwnAvatarMenuLayoutChangeNameItem';
import { OwnAvatarMenuLayoutDance1Item } from './OwnAvatarMenuLayoutDance1Item';
import { OwnAvatarMenuLayoutDance2Item } from './OwnAvatarMenuLayoutDance2Item';
import { OwnAvatarMenuLayoutDance3Item } from './OwnAvatarMenuLayoutDance3Item';
import { OwnAvatarMenuLayoutDance4Item } from './OwnAvatarMenuLayoutDance4Item';
import { OwnAvatarMenuLayoutDanceItem } from './OwnAvatarMenuLayoutDanceItem';
import { OwnAvatarMenuLayoutDanceMenuItem } from './OwnAvatarMenuLayoutDanceMenuItem';
import { OwnAvatarMenuLayoutDanceStopItem } from './OwnAvatarMenuLayoutDanceStopItem';
import { OwnAvatarMenuLayoutDecorateItem } from './OwnAvatarMenuLayoutDecorateItem';
import { OwnAvatarMenuLayoutEffectsItem } from './OwnAvatarMenuLayoutEffectsItem';
import { OwnAvatarMenuLayoutExpressionsItem } from './OwnAvatarMenuLayoutExpressionsItem';
import { OwnAvatarMenuLayoutHanditemItem } from './OwnAvatarMenuLayoutHanditemItem';
import { OwnAvatarMenuLayoutIdleItem } from './OwnAvatarMenuLayoutIdleItem';
import { OwnAvatarMenuLayoutJumpItem } from './OwnAvatarMenuLayoutJumpItem';
import { OwnAvatarMenuLayoutLaughItem } from './OwnAvatarMenuLayoutLaughItem';
import { OwnAvatarMenuLayoutMoreItem } from './OwnAvatarMenuLayoutMoreItem';
import { OwnAvatarMenuLayoutSignsGridItem } from './OwnAvatarMenuLayoutSignsGridItem';
import { OwnAvatarMenuLayoutSignsItem } from './OwnAvatarMenuLayoutSignsItem';
import { OwnAvatarMenuLayoutSitItem } from './OwnAvatarMenuLayoutSitItem';
import { OwnAvatarMenuLayoutStandItem } from './OwnAvatarMenuLayoutStandItem';
import { OwnAvatarMenuLayoutWaveItem } from './OwnAvatarMenuLayoutWaveItem';
import { OwnAvatarMenuLayoutWiredInspectItem } from './OwnAvatarMenuLayoutWiredInspectItem';

/** Named region `buttons` of OwnAvatarMenuLayout - configured through the parent's `buttons` prop. */
export interface OwnAvatarMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayoutButtons = ({ itemsButtons, layout }: OwnAvatarMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 105, top: 28, minHeight: 827, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <OwnAvatarMenuLayoutChangeNameItem />
                    <OwnAvatarMenuLayoutDecorateItem />
                    <OwnAvatarMenuLayoutChangeLooksItem />
                    <OwnAvatarMenuLayoutSitItem />
                    <OwnAvatarMenuLayoutStandItem />
                    <OwnAvatarMenuLayoutWaveItem />
                    <OwnAvatarMenuLayoutBlowItem />
                    <OwnAvatarMenuLayout_67Item />
                    <OwnAvatarMenuLayoutJumpItem />
                    <OwnAvatarMenuLayoutLaughItem />
                    <OwnAvatarMenuLayoutIdleItem />
                    <OwnAvatarMenuLayoutExpressionsItem />
                    <OwnAvatarMenuLayoutDanceMenuItem />
                    <OwnAvatarMenuLayoutDanceItem />
                    <OwnAvatarMenuLayoutDanceStopItem />
                    <OwnAvatarMenuLayoutDance1Item />
                    <OwnAvatarMenuLayoutDance2Item />
                    <OwnAvatarMenuLayoutDance3Item />
                    <OwnAvatarMenuLayoutDance4Item />
                    <OwnAvatarMenuLayoutSignsGridItem />
                    <OwnAvatarMenuLayoutSignsItem />
                    <OwnAvatarMenuLayoutBackItem />
                    <OwnAvatarMenuLayoutHanditemItem />
                    <OwnAvatarMenuLayoutEffectsItem />
                    <OwnAvatarMenuLayoutMoreItem />
                    <OwnAvatarMenuLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};
