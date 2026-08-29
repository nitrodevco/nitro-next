import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { OwnPetMenuLayoutBreedItem } from './OwnPetMenuLayoutBreedItem';
import { OwnPetMenuLayoutBuySaddleItem } from './OwnPetMenuLayoutBuySaddleItem';
import { OwnPetMenuLayoutCompostItem } from './OwnPetMenuLayoutCompostItem';
import { OwnPetMenuLayoutDismountItem } from './OwnPetMenuLayoutDismountItem';
import { OwnPetMenuLayoutGiveLightItem } from './OwnPetMenuLayoutGiveLightItem';
import { OwnPetMenuLayoutGiveWaterItem } from './OwnPetMenuLayoutGiveWaterItem';
import { OwnPetMenuLayoutHarvestItem } from './OwnPetMenuLayoutHarvestItem';
import { OwnPetMenuLayoutMoreItem } from './OwnPetMenuLayoutMoreItem';
import { OwnPetMenuLayoutMountItem } from './OwnPetMenuLayoutMountItem';
import { OwnPetMenuLayoutPassHanditemItem } from './OwnPetMenuLayoutPassHanditemItem';
import { OwnPetMenuLayoutPickUpItem } from './OwnPetMenuLayoutPickUpItem';
import { OwnPetMenuLayoutRespectItem } from './OwnPetMenuLayoutRespectItem';
import { OwnPetMenuLayoutReviveItem } from './OwnPetMenuLayoutReviveItem';
import { OwnPetMenuLayoutSaddleOffItem } from './OwnPetMenuLayoutSaddleOffItem';
import { OwnPetMenuLayoutToggleBreedingPermissionItem } from './OwnPetMenuLayoutToggleBreedingPermissionItem';
import { OwnPetMenuLayoutToggleRidingPermissionItem } from './OwnPetMenuLayoutToggleRidingPermissionItem';
import { OwnPetMenuLayoutTrainItem } from './OwnPetMenuLayoutTrainItem';
import { OwnPetMenuLayoutTreatItem } from './OwnPetMenuLayoutTreatItem';
import { OwnPetMenuLayoutWiredInspectItem } from './OwnPetMenuLayoutWiredInspectItem';

/** Named region `buttons` of OwnPetMenuLayout - configured through the parent's `buttons` prop. */
export interface OwnPetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnPetMenuLayoutButtons = ({ itemsButtons, layout }: OwnPetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 540, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <OwnPetMenuLayoutBuySaddleItem />
                    <OwnPetMenuLayoutMountItem />
                    <OwnPetMenuLayoutToggleRidingPermissionItem />
                    <OwnPetMenuLayoutDismountItem />
                    <OwnPetMenuLayoutRespectItem />
                    <OwnPetMenuLayoutTreatItem />
                    <OwnPetMenuLayoutPassHanditemItem />
                    <OwnPetMenuLayoutTrainItem />
                    <OwnPetMenuLayoutPickUpItem />
                    <OwnPetMenuLayoutSaddleOffItem />
                    <OwnPetMenuLayoutGiveWaterItem />
                    <OwnPetMenuLayoutGiveLightItem />
                    <OwnPetMenuLayoutBreedItem />
                    <OwnPetMenuLayoutHarvestItem />
                    <OwnPetMenuLayoutReviveItem />
                    <OwnPetMenuLayoutCompostItem />
                    <OwnPetMenuLayoutMoreItem />
                    <OwnPetMenuLayoutToggleBreedingPermissionItem />
                    <OwnPetMenuLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};
