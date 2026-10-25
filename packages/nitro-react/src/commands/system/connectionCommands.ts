/**
 * `HabboCommunicationDemo.disconnected` and `DisconnectReasonEvent.resolveDisconnectedReasonLocalizationKey`:
 * show the hotel's localized logout alert over the existing scene.
 * This hosted client has no AIR account-login view: it uses the no-login-view alert branch.
 * The disconnected UI retains the gameplay tree, and stale dialogs are closed so that an
 * earlier confirmation cannot remain actionable after logout. Web logout redirects belong
 * to the hosting site and are not handled here.
 */
import { reportRendererError } from '#base/context/clienterrors';
import { systemStore } from '#base/context/system';
import type { GpuLoss } from '#base/theme';

/**
 * `DisconnectReasonEvent`'s constants, by value. The AS3 names are obfuscated; these are the
 * names Sulake's JS conversion keeps (`habbo-js/.../handshake/DisconnectReasonEvent.js`).
 */
const DISCONNECT_REASON_NAMES: Record<number, string> = {
    [-3]: 'DISCONNECTED',
    [-2]: 'MAINTENANCE_BREAK',
    [-1]: 'UNKNOWN_REASON',
    0: 'LOGOUT',
    1: 'JUST_BANNED',
    2: 'CONCURRENT_LOGIN',
    3: 'CONNECTION_LOST_TO_PEER',
    4: 'AVATAR_IDENTITY_CHANGE',
    5: 'REMOVE_FURNITURE_TOOL',
    10: 'STILL_BANNED',
    11: 'DUAL_LOGIN_BY_USERID',
    12: 'HOTEL_CLOSED',
    13: 'DUAL_LOGIN_BY_IP',
    16: 'PEER_CONNECTION_MISSING',
    17: 'NO_LOGIN_PERMISSION',
    18: 'DUPLICATE_CONNECTION',
    19: 'HOTEL_CLOSING',
    20: 'INCORRECT_PASSWORD',
    22: 'INVALID_LOGIN_TICKET',
    23: 'VERSION_CHECK_URL',
    24: 'VERSION_CHECK_PROPERTY',
    25: 'VERSION_CHECK_MACHINE_ID',
    26: 'NO_MESSENGER_SESSION',
    27: 'USER_NOT_FOUND',
    28: 'CRYPTO_NOT_INITIALIZED',
    29: 'DEV_CRYPTO_NOT_ALLOWED',
    100: 'DUPLICATE_UUID_DETECTED',
    101: 'OLD_SESSION_IN_PROXY',
    102: 'PUBLIC_KEY_NOT_NUMERIC',
    103: 'PUBLIC_KEY_TOO_SHORT',
    104: 'SOCKET_READ_GENERIC',
    105: 'SOCKET_READ_FIRST_BYTE',
    106: 'SOCKET_READ_LENGTH',
    107: 'SOCKET_READ_BODY',
    108: 'SOCKET_READ_POLICY',
    109: 'SOCKET_IO_EXCEPTION',
    110: 'SOCKET_WRONG_CRYPTO',
    111: 'PROXY_RUNTIME_EXCEPTION',
    112: 'IDLE_CONNECTION',
    113: 'PONG_TIMEOUT',
    114: 'IDLE_CONNECTION_NOT_AUTH',
    115: 'IDLE_CONNECTION_NO_USER_ID',
    116: 'WRITE_CLOSED_CHANNEL',
    117: 'SOCKET_WRITE_EXCEPTION_1',
    118: 'SOCKET_WRITE_EXCEPTION_2',
    119: 'SOCKET_WRITE_EXCEPTION_3',
    120: 'TOO_MANY_BYTES_PENDING_WRITE',
    121: 'IDLE_CONNECTION_POLICY_REQUEST',
    122: 'INCOMPATIBLE_CLIENT_VERSION',
    123: 'CREDENTIALS_REMOVED',
    124: 'INSUFFICIENT_SECURITY_LEVEL',
    125: 'TOO_MANY_UNDEFINED_CLIENT_MESSAGES',
    126: 'INVALID_PARAMETER_RANGE',
};

/** `IncomingMessages.onConnectionDisconnected`: a close no disconnect reason preceded is `disconnected(-3, "")`. */
export const DISCONNECT_REASON_SOCKET_CLOSED = -3;

/** `DisconnectReasonEvent.getReasonName`: the name of the constant the reason is, or `''` for none. */
export const getDisconnectReasonName = (reason: number): string => DISCONNECT_REASON_NAMES[reason] ?? '';

const disconnectTextKey = (reason: number): string => {
    switch (reason) {
        case -2: return 'disconnected.maintenance';
        case 0: return 'disconnected.logged_out';
        case 1: return 'disconnected.just_banned';
        case 10: return 'disconnected.still_banned';
        case 2:
        case 11:
        case 13:
        case 18: return 'disconnected.concurrent_login';
        case 12:
        case 19: return 'disconnected.hotel_closed';
        case 20: return 'disconnected.incorrect_password';
        case 112: return 'disconnected.idle';
        case 122: return 'disconnected.incompatible_client_version';
        default: return 'disconnected.generic';
    }
};

/**
 * `HabboCommunicationDemo.disconnected(reason, reasonName)`: a `reasonName` shorter than six
 * characters is replaced by the reason's localized text before it fills `%reasonName%`.
 */
export const showConnectionClosed = (reason: number, reasonName = '') => {
    const { dialogs, closeDialog, getLocalizationValue, showAlert } = systemStore.getState();

    for (const dialog of dialogs) closeDialog(dialog.id);

    const title = getLocalizationValue(disconnectTextKey(reason));
    const name = (reasonName.length < 6) ? title : reasonName;
    const message = getLocalizationValue('connection.login.logged_out', '', { reason: String(reason), reasonName: name });

    showAlert(title, message, { modal: true });
};

/** `HabboCommunicationDemo.handleErrorMessage`: the error codes it answers by closing the connection. */
export const isConnectionClosingServerError = (errorCode: number) => (errorCode >= 1001) && (errorCode <= 1019);

/**
 * `HabboCommunicationDemo.handleErrorMessage` (`ErrorReport`) for a code that leaves the connection
 * open: 4013 is `${connection.room.maintenance.title}` / `.desc`, any other code "Server error" /
 * "Sorry, received server error: %errorCode%" (`connection.server.error.title` / `.desc`). The
 * message id is read but never shown.
 */
export const showServerError = (errorCode: number) => {
    const { getLocalizationValue, showAlert } = systemStore.getState();

    if (errorCode === 4013) {
        showAlert(getLocalizationValue('connection.room.maintenance.title'), getLocalizationValue('connection.room.maintenance.desc'));

        return;
    }

    showAlert(getLocalizationValue('connection.server.error.title'), getLocalizationValue('connection.server.error.desc', '', { errorCode: String(errorCode) }));
};

/**
 * `HabboToolbar.reboot` (the purse's `logout_button`): `CoreComponentContext.reboot` stops the core
 * and the AIR client's `onCoreReboot` exits with code 1 for its launcher to start it again. The
 * hosted client starts again by loading its page again.
 */
export const rebootClient = () => window.location.reload();

/** When the client last started again for a lost GPU device (`sessionStorage`, this tab only). */
const GPU_LOSS_REBOOT_KEY = 'nitro.gpu_loss_reboot';

/** No second start within this long of the last: a device lost again at once would only loop. */
const GPU_LOSS_REBOOT_INTERVAL_MS = 60000;

/**
 * The renderer's GPU device or context was lost (`guardGpuLoss`): every render texture is gone - the
 * room, the avatars, the generated text - even once Pixi has a new one, and the client never draws
 * them again; the port's own case, Flash drew on the CPU. The client starts again as `rebootClient`
 * does, and the page's new renderer takes what the browser offers now (WebGPU, else WebGL). Once a
 * minute at most: a GPU lost again at once would only loop, so the client then stays as it is.
 */
export const rebootAfterGpuLoss = (loss: GpuLoss = {}) => {
    try {
        const last = Number(window.sessionStorage.getItem(GPU_LOSS_REBOOT_KEY) ?? 0);

        if ((Date.now() - last) < GPU_LOSS_REBOOT_INTERVAL_MS) {
            reportRendererError('GPU device or context lost again within a minute: the client stays as it is', false, loss);

            return;
        }

        window.sessionStorage.setItem(GPU_LOSS_REBOOT_KEY, String(Date.now()));
    } catch {
        // No session storage: start again without the guard.
    }

    // The report goes with the next session: this one ends now.
    reportRendererError('GPU device or context lost: the client started again', true, loss);
    rebootClient();
};
