import { IAssetData, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Flash `FurnitureNftCreditLogic`: a credit furni whose worth is not in its asset data but in its
 * class name - `nft_credit_500` is worth 500 - with the two emerald furni priced by name. It opens
 * the same redeem widget as `FurnitureCreditLogic`, and marks itself with `FurnitureNftCredit` so
 * the widget can word the prompt for an NFT and honour `nft.credit.converting.enabled`.
 */
export class FurnitureNftCreditLogic extends FurnitureLogic {
    private static EMERALD_HAND_TYPE: string = 'nft_emerald_emerhand';
    private static EMERALD_EGG_TYPE: string = 'nft_emerald_eggmerald';

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.CREDITFURNI ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (!asset || !this.object) return;

        const type = this.object.type;
        const trailingDigits = type.match(/\d+$/);

        // Flash stores the parsed number in an `int`, so its `isNaN` test for "no trailing number"
        // can never be true and the emerald furni show 0. The two prices are plainly meant to
        // apply, so they do here; the server decides what a redeem actually pays either way.
        let creditValue = trailingDigits ? parseInt(trailingDigits[0]) : 0;

        if (!trailingDigits) {
            if (type === FurnitureNftCreditLogic.EMERALD_HAND_TYPE) creditValue = 15000;
            else if (type === FurnitureNftCreditLogic.EMERALD_EGG_TYPE) creditValue = 2000;
        }

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCreditValue, creditValue);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureNftCredit, 'true');
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object),
        );

        super.useObject();
    }
}
