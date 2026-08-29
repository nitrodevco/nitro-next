import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PetMenuLayoutDismountItem } from './PetMenuLayoutDismountItem';
import { PetMenuLayoutMoreItem } from './PetMenuLayoutMoreItem';
import { PetMenuLayoutMountItem } from './PetMenuLayoutMountItem';
import { PetMenuLayoutPassHanditemItem } from './PetMenuLayoutPassHanditemItem';
import { PetMenuLayoutPickUpItem } from './PetMenuLayoutPickUpItem';
import { PetMenuLayoutRespectItem } from './PetMenuLayoutRespectItem';
import { PetMenuLayoutTreatItem } from './PetMenuLayoutTreatItem';
import { PetMenuLayoutWiredInspectItem } from './PetMenuLayoutWiredInspectItem';

/** Named region `buttons` of PetMenuLayout - configured through the parent's `buttons` prop. */
export interface PetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const PetMenuLayoutButtons = ({ itemsButtons, layout }: PetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 215, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <PetMenuLayoutMountItem />
                    <PetMenuLayoutDismountItem />
                    <PetMenuLayoutRespectItem />
                    <PetMenuLayoutTreatItem />
                    <PetMenuLayoutPassHanditemItem />
                    <PetMenuLayoutPickUpItem />
                    <PetMenuLayoutMoreItem />
                    <PetMenuLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};
