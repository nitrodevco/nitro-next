import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredLinkNetworks, WiredLinkNetworkType } from './WiredLinkNetwork';

export type WiredLinkOperationResultMessageType = {
    roomId: number;
    furniId: number;
    /** 0 configuration request, 1 save, 2 create, 3 rename, 4 delete, 5 connections (Flash `WiredLinkView.operationFailed`). */
    operation: number;
    /** 0 on success, else the tail of the text key `wiredlink.error.<resultCode>`. */
    resultCode: number;
    hasConfiguration: boolean;
    selectedNetworkId: string;
    receiveLocal: boolean;
    removedNetworkId: string;
    /** The networks the operation added or changed. */
    networks: WiredLinkNetworkType[];
};

/**
 * The answer to every WIRED Link request. Flash parser `wiredlink._-X29`; Flash's
 * `WiredLinkController.onResult` drops it unless it is for the Link its window was opened for.
 */
export class WiredLinkOperationResultMessage implements IIncomingPacket<WiredLinkOperationResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredLinkOperationResultMessageType {
        const roomId = wrapper.readInt();
        const furniId = wrapper.readInt();
        const operation = wrapper.readInt();
        const resultCode = wrapper.readInt();
        const hasConfiguration = wrapper.readBoolean();
        const selectedNetworkId = hasConfiguration ? wrapper.readString() : '0';
        const receiveLocal = hasConfiguration ? wrapper.readBoolean() : false;
        const removedNetworkId = wrapper.readString();
        const networks = parseWiredLinkNetworks(wrapper);

        return { roomId, furniId, operation, resultCode, hasConfiguration, selectedNetworkId, receiveLocal, removedNetworkId, networks };
    }
}
