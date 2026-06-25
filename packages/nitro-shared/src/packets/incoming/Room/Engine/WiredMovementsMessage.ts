import { IIncomingPacket, IMessageDataWrapper, WiredMovementType } from '@nitrodevco/nitro-api';
import { IWiredUserMove } from './Data/IWiredUserMove';
import { IWiredFloorMove } from './Data/IWiredFloorMove';
import { IWiredWallMove } from './Data/IWiredWallMove';
import { IWiredUserDirection } from './Data/IWiredUserDirection';

export type WiredMovementsMessageType = {
    userMoves: IWiredUserMove[];
    floorMoves: IWiredFloorMove[];
    wallMoves: IWiredWallMove[];
    userDirections: IWiredUserDirection[];
};

export class WiredMovementsMessage implements IIncomingPacket<WiredMovementsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredMovementsMessageType {
        const parseUserMove = (wrapper: IMessageDataWrapper) => {
            return {
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                sourceZ: parseFloat(wrapper.readString()),
                targetZ: parseFloat(wrapper.readString()),
                objectId: wrapper.readInt(),
                moveType: wrapper.readInt(),
                animationTime: wrapper.readInt(),
                bodyRotation: wrapper.readInt(),
                headRotation: wrapper.readInt()
            } as IWiredUserMove;
        }

        const parseFloorMove = (wrapper: IMessageDataWrapper) => {
            return {
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                sourceZ: parseFloat(wrapper.readString()),
                targetZ: parseFloat(wrapper.readString()),
                objectId: wrapper.readInt(),
                animationTime: wrapper.readInt(),
                rotation: wrapper.readInt()
            } as IWiredFloorMove;
        }

        const parseWallMove = (wrapper: IMessageDataWrapper) => {
            return {
                objectId: wrapper.readInt(),
                isDirectionRight: wrapper.readBoolean(),
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                sourceOffsetX: wrapper.readInt(),
                sourceOffsetY: parseFloat(wrapper.readString()),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                targetOffsetX: wrapper.readInt(),
                targetOffsetY: wrapper.readInt(),
                animationTime: wrapper.readInt()
            } as IWiredWallMove;
        }

        const parseUserDirection = (wrapper: IMessageDataWrapper) => {
            return {
                objectId: wrapper.readInt(),
                bodyRotation: wrapper.readInt(),
                headRotation: wrapper.readInt(),
            } as IWiredUserDirection;
        }

        const packet: WiredMovementsMessageType = {
            userMoves: [],
            floorMoves: [],
            wallMoves: [],
            userDirections: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const type = wrapper.readInt() as WiredMovementType;

            switch (type) {
                case WiredMovementType.User: {
                    packet.userMoves.push(parseUserMove(wrapper));
                    break;
                }
                case WiredMovementType.FloorItem: {
                    packet.floorMoves.push(parseFloorMove(wrapper));
                    break;
                }
                case WiredMovementType.WallItem: {
                    packet.wallMoves.push(parseWallMove(wrapper));
                    break;
                }
                case WiredMovementType.UserDirection: {
                    packet.userDirections.push(parseUserDirection(wrapper));
                    break;
                }
            }

            count--;
        }

        return packet;
    }
}
