import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum, VoteDataType } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '../../../../utils';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureVoteCounterLogic extends FurnitureMultiStateLogic {
    private static UPDATE_INTERVAL: number = 33;
    private static MAX_UPDATE_TIME: number = 1000;

    private _total: number = 0;
    private _lastUpdate: number = 0;
    private _interval: number = 33;

    public override update(time: number): void {
        super.update(time);

        if (this.currentTotal !== this._total && time >= this._lastUpdate + this._interval) {
            const diff = time - this._lastUpdate;
            let _local_3 = diff / this._interval;
            let _local_4 = 1;

            if (this._total < this.currentTotal) _local_4 = -1;

            if (_local_3 > _local_4 * (this._total - this.currentTotal))
                _local_3 = _local_4 * (this._total - this.currentTotal);

            this.object.model.setValue(
                RoomObjectVariableEnum.FurnitureVoteCounterCount,
                this.currentTotal + _local_4 * _local_3,
            );

            this._lastUpdate = time - (diff - _local_3 * this._interval);
        }
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            const stuffData = message.data;

            if (stuffData instanceof VoteDataType) this.updateTotal(stuffData.result);
        }
    }

    private updateTotal(total: number): void {
        this._total = total;

        if (!this._lastUpdate) {
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureVoteCounterCount, total);

            this._lastUpdate = GetTickerTime();

            return;
        }

        if (this._total !== this.currentTotal) {
            const difference = Math.abs(this._total - this.currentTotal);

            if (difference * FurnitureVoteCounterLogic.UPDATE_INTERVAL > FurnitureVoteCounterLogic.MAX_UPDATE_TIME) {
                this._interval = FurnitureVoteCounterLogic.MAX_UPDATE_TIME / difference;
            } else {
                this._interval = FurnitureVoteCounterLogic.UPDATE_INTERVAL;
            }

            this._lastUpdate = GetTickerTime();
        }
    }

    private get currentTotal(): number {
        return this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureVoteCounterCount);
    }
}
