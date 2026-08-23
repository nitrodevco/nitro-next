declare global {
    interface Window {
        NitroConfig: {
            'nitro.config.url': string;
        };
        NitroParsedConfig: Record<string, unknown>;
    }
}

export const GetConfigValue = <T>(key: string) => window.NitroParsedConfig[key] as T | undefined;
