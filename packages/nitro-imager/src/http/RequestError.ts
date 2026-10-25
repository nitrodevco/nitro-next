/** A request the imager cannot draw, answered with its `status` and the message as the reason. */
export class RequestError extends Error {
    public constructor(message: string, public readonly status: 400 | 404 = 400) {
        super(message);
    }
}
