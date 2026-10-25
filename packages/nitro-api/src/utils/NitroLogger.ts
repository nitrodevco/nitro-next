export class NitroLogger {
    public static LOG_DEBUG: boolean = false;
    public static LOG_WARN: boolean = false;
    public static LOG_ERROR: boolean = false;
    public static LOG_EVENTS: boolean = false;
    public static LOG_PACKETS: boolean = false;

    /**
     * Told of every `error`, logged or not: the one place the renderer and the UI report what they
     * caught. Null unless a reporter listens (nitro-react's client errors reporter).
     */
    public static errorListener: ((messages: unknown[]) => void) | null = null;

    public static log(...messages: unknown[]): void {
        if (!this.LOG_DEBUG) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static warn(...messages: unknown[]): void {
        if (!this.LOG_WARN) return;

        console.warn(this.logPrefix(), ...messages);
    }

    public static error(...messages: unknown[]): void {
        this.errorListener?.(messages);

        if (!this.LOG_ERROR) return;

        console.error(this.logPrefix(), ...messages);
    }

    public static events(...messages: unknown[]): void {
        if (!this.LOG_EVENTS) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static packets(...messages: unknown[]): void {
        if (!this.LOG_PACKETS) return;

        console.log(this.logPrefix(), ...messages);
    }

    public static sendPacket(...messages: unknown[]): void {
        if (!this.LOG_PACKETS) return;

        console.log(this.logPrefix(), ...messages);
    }

    private static logPrefix(): string {
        return '[Nitro]';
    }
}
