/** Turbo's `client.modules` extension: the server names the client modules its plugins ship. */
export const TURBO_CLIENT_MODULES_CAPABILITY = 'client.modules';

/** Turbo's `client.messages` extension: the server names its plugins' messages, each with its header and schema. */
export const TURBO_CLIENT_MESSAGES_CAPABILITY = 'client.messages';
/** Turbo's `web.session` extension: a token for the plugins' web routes a client module calls (`api.http`). */
export const TURBO_WEB_SESSION_CAPABILITY = 'web.session';

/**
 * The origins or hosts a client module may come from besides the client's own. Never taken from
 * the page's query: a link that also names another `socket.url` would let that server run code here.
 */
export const CLIENT_MODULES_HOSTS_KEY = 'client.modules.hosts';

/**
 * The headers a client module's packets may use - a Turbo plugin's (`ExtensionPackets.IsPluginHeader`):
 * 20000 to 32767, without Turbo's own 30000 to 30099.
 */
export const isClientModuleHeader = (header: number) => Number.isInteger(header) && (header >= 20000) && (header <= 32767) && ((header < 30000) || (header > 30099));
