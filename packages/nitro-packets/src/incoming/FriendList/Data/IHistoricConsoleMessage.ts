// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
export interface IHistoricConsoleMessage {
    readonly senderId: number;
    readonly senderName: string;
    readonly senderFigure: string;
    /** The text; empty when the message is a habbicon. */
    readonly message: string;
    /** Above zero when the message is a habbicon rather than text. */
    readonly habbiconId: number;
    readonly secondsSinceSent: number;
    readonly messageId: string;
}
