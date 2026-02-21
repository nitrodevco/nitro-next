import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '../../../../utils';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureScoreLogic extends FurnitureLogic {
    private static UPDATE_INTERVAL: number = 50;
    private static MAX_UPDATE_TIME: number = 3000;

    private _score: number = 0;
    private _scoreIncreaser: number = 50;
    private _scoreTimer: number = 0;

    public override update(time: number): void {
        super.update(time);

        const currentScore = this.object.getState(0);

        if (currentScore !== this._score && time >= this._scoreTimer + this._scoreIncreaser) {
            const _local_3 = time - this._scoreTimer;
            let _local_4 = _local_3 / this._scoreIncreaser;
            let _local_5 = 1;

            if (this._score < currentScore) _local_5 = -1;

            if (_local_4 > _local_5 * (this._score - currentScore)) _local_4 = _local_5 * (this._score - currentScore);

            this.object.setState(currentScore + _local_5 * _local_4, 0);

            this._scoreTimer = time - (_local_3 - _local_4 * this._scoreIncreaser);
        }
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        if (message instanceof ObjectDataUpdateMessage) {
            this._score = message.state;

            const currentScore = this.object.getState(0);

            if (this._score !== currentScore) {
                let difference = this._score - currentScore;

                if (difference < 0) difference = -difference;

                if (difference * FurnitureScoreLogic.UPDATE_INTERVAL > FurnitureScoreLogic.MAX_UPDATE_TIME)
                    this._scoreIncreaser = FurnitureScoreLogic.MAX_UPDATE_TIME / difference;
                else this._scoreIncreaser = FurnitureScoreLogic.UPDATE_INTERVAL;

                this._scoreTimer = GetTickerTime();
            }
        }

        super.processUpdateMessage(message);
    }
}
