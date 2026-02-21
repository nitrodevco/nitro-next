import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { LegacyDataType } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureIceStormLogic extends FurnitureMultiStateLogic {
    private _nextState: number = 0;
    private _nextStateExtra: number = 0;
    private _nextStateTimestamp: number = 0;

    public override update(totalTimeRunning: number): void {
        if (this._nextStateTimestamp > 0 && totalTimeRunning >= this._nextStateTimestamp) {
            this._nextStateTimestamp = 0;

            const data = new LegacyDataType();

            data.setString(this._nextState.toString());

            super.processUpdateMessage(new ObjectDataUpdateMessage(this._nextState, data, this._nextStateExtra));
        }

        super.update(totalTimeRunning);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (message instanceof ObjectDataUpdateMessage) {
            const state = ~~(message.state / 1000);
            const time = ~~(message.state % 1000);

            if (!time) {
                this._nextStateTimestamp = 0;

                const data = new LegacyDataType();

                data.setString(state.toString());

                super.processUpdateMessage(new ObjectDataUpdateMessage(state, data, message.extra));
            } else {
                this._nextState = state;
                this._nextStateExtra = message.extra;
                this._nextStateTimestamp = this.time + time;
            }

            return;
        }

        super.processUpdateMessage(message);
    }
}
