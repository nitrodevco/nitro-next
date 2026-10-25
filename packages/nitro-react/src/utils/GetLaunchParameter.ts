/**
 * The Flash client's launch parameters (`forward.type`, `forward.id`, `friend.id`...) were
 * flashvars on the embed; here they come from the page's query string, with the loaded
 * config as a fallback so a deployment can pin one. Returns undefined when neither has it.
 */
export const GetLaunchParameter = (key: string): string | undefined => {
    const fromUrl = new URLSearchParams(window.location.search).get(key);

    if (fromUrl !== null) return fromUrl;

    const fromConfig = window.NitroParsedConfig?.[key];

    if (typeof fromConfig === 'string') return fromConfig;
    if (typeof fromConfig === 'number') return fromConfig.toString();

    return undefined;
};
