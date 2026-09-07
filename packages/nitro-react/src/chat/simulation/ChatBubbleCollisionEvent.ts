import { ChatBubbleSimulationEntity } from './ChatBubbleSimulationEntity';

/** Two overlapping simulation entities, with the Flash `ChatBubbleCollisionEvent`'s helpers for which is where. Pooled by the stage - `set` re-points an instance at a new pair. */
export class ChatBubbleCollisionEvent {
    private _first!: ChatBubbleSimulationEntity;
    private _second!: ChatBubbleSimulationEntity;

    constructor(first: ChatBubbleSimulationEntity, second: ChatBubbleSimulationEntity) {
        this.set(first, second);
    }

    public set(first: ChatBubbleSimulationEntity, second: ChatBubbleSimulationEntity): this {
        this._first = first;
        this._second = second;

        return this;
    }

    public get first(): ChatBubbleSimulationEntity {
        return this._first;
    }

    public get second(): ChatBubbleSimulationEntity {
        return this._second;
    }

    public get top(): ChatBubbleSimulationEntity {
        return (this._first.y < this._second.y) ? this._first : this._second;
    }

    public get bottom(): ChatBubbleSimulationEntity {
        return (this._first.y >= this._second.y) ? this._first : this._second;
    }

    public get left(): ChatBubbleSimulationEntity {
        return (this._first.x < this._second.x) ? this._first : this._second;
    }

    public get right(): ChatBubbleSimulationEntity {
        return (this._first.x >= this._second.x) ? this._first : this._second;
    }

    /** Both bubbles sit on the same pixel row - the older one has to give way upward. */
    public get isSameRow(): boolean {
        return Math.trunc(this._first.y) === Math.trunc(this._second.y);
    }

    public get older(): ChatBubbleSimulationEntity {
        return (this._first.timestamp < this._second.timestamp) ? this._first : this._second;
    }
}
