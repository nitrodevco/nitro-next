export interface IHistoricConsoleMessage {
    readonly senderId: number;
    readonly senderName: string;
    readonly senderFigure: string;
    readonly message: string;
    readonly secondsSinceSent: number;
    readonly messageId: string;
}