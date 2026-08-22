import { FurniturePickupMode, IFurniData } from "@nitrodevco/nitro-api";

import { FurnitureImage } from "#base/components";
import { useTranslation } from "#base/context";
import { Border, Button, CloseButton } from "#base/theme";

type InfostandFurniViewProps = {
    furniData: IFurniData;
    canMove: boolean;
    canRotate: boolean;
    canUse: boolean;
    pickupMode: FurniturePickupMode;
    hasButtons: boolean;
    canSeeFurniId: boolean;
    godMode: boolean;
    processAction: (action: string) => void;
    onClose: () => void;
}

export const InfostandFurniView = (props: InfostandFurniViewProps) => {
    const { furniData, canMove, canRotate, canUse, pickupMode, hasButtons, canSeeFurniId, godMode, processAction, onClose } = props;
    const t = useTranslation();

    if (!furniData?.furnitureData) return null;

    return (
        <div className="flex flex-col items-end gap-2">
            <Border variant="1" className="infostand-container">
                <div className="infostand-header">
                    <div className="flex grow gap-1.25 items-center">
                        {furniData.name}
                    </div>
                    <CloseButton variant="1" className="infostand-close shrink-0" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full overflow-hidden items-center justify-center py-1.25">
                    <FurnitureImage type={furniData.furnitureData.className} colorIndex={furniData.furnitureData.colorIndex} direction={2} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1">
                    <p className="text-[9px] font-goldfish-bold">{t('furni.owner', '', { 'name': furniData.ownerName })}</p>
                    {canSeeFurniId && <p className="text-[9px] font-goldfish-bold">ID: {furniData.id}</p>}
                </div>
                <div className="flex w-full gap-1">
                    <Button onClick={() => processAction('buy')}>{t('infostand.button.buy')}</Button>
                </div>
            </Border>
            {hasButtons && <div className="flex justify-end gap-2">
                {canMove && <Button variant="1" onClick={() => processAction('move')}>{t('infostand.button.move')}</Button>}
                {canRotate && <Button variant="1" onClick={() => processAction('rotate')}>{t('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button variant="1" onClick={() => processAction('eject')}>{t(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button onClick={() => processAction('pickup')}>{t(`infostand.button.pickup`)}</Button>}
                {canUse && <Button variant="1" onClick={() => processAction('use')}>{t('infostand.button.use')}</Button>}
            </div>}
        </div>
    );
}