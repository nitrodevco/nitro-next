/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** The websocket the build connects to, overriding `socket.url` in `nitro-config.json`. */
    readonly VITE_SOCKET_URL?: string;
}

declare module '*.css' {
    const content: string;
    export default content;
}