import type { IMessageDataWrapper } from '#api/communication';

import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';
import { HighScoreData } from './HighScoreData';

export class HighScoreDataType extends ObjectDataBase implements IObjectData {
    private _state: string = '';
    private _scoreType: number = -1;
    private _clearType: number = -1;
    private _entries: HighScoreData[] = [];

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        if (!wrapper) return;

        this._state = wrapper.readString();
        this._scoreType = wrapper.readInt();
        this._clearType = wrapper.readInt();

        let totalScores = wrapper.readInt();

        while (totalScores > 0) {
            const data = new HighScoreData();

            data.score = wrapper.readInt();

            let totalUsers = wrapper.readInt();

            while (totalUsers > 0) {
                data.addUsername(wrapper.readString());

                totalUsers--;
            }

            this._entries.push(data);

            totalScores--;
        }

        super.parseWrapper(wrapper);
    }

    public override initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        this._scoreType = model.getValue<number>(RoomObjectVariableEnum.FurnitureHighscoreScoreType);
        this._clearType = model.getValue<number>(RoomObjectVariableEnum.FurnitureHighscoreClearType);
        this._entries = [];

        const totalEntries = model.getValue<number>(RoomObjectVariableEnum.FurnitureHighscoreDataEntryCount);

        let i = 0;

        while (i < totalEntries) {
            const data = new HighScoreData();

            data.score = model.getValue<number>(
                (RoomObjectVariableEnum.FurnitureHighscoreDataEntryBaseScore + i) as RoomObjectVariableEnum,
            );
            data.users = model.getValue<string[]>(
                (RoomObjectVariableEnum.FurnitureHighscoreDataEntryBaseUsers + i) as RoomObjectVariableEnum,
            );

            this._entries.push(data);

            i++;
        }

        super.initializeFromRoomObjectModel(model);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Highscore);
        model.setValue(RoomObjectVariableEnum.FurnitureHighscoreScoreType, this._scoreType);
        model.setValue(RoomObjectVariableEnum.FurnitureHighscoreClearType, this._clearType);

        if (this._entries) {
            model.setValue(RoomObjectVariableEnum.FurnitureHighscoreDataEntryCount, this._entries.length);

            let i = 0;

            while (i < this._entries.length) {
                const entry = this._entries[i];

                model.setValue(
                    (RoomObjectVariableEnum.FurnitureHighscoreDataEntryBaseScore + i) as RoomObjectVariableEnum,
                    entry.score,
                );
                model.setValue(
                    (RoomObjectVariableEnum.FurnitureHighscoreDataEntryBaseUsers + i) as RoomObjectVariableEnum,
                    entry.users,
                );

                i++;
            }
        }
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public get entries(): HighScoreData[] {
        return this._entries;
    }

    public get clearType(): number {
        return this._clearType;
    }

    public get scoreType(): number {
        return this._scoreType;
    }
}
