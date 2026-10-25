/**
 * The `user_info` window's bindings (`UserInfoCtrl.refresh`), for `ModUserInfoView`'s frame and the issue
 * handler's embedded user info. Kept apart from the views so each view module exports only its component (Fast Refresh).
 */
import { IModeratorUserInfoData } from '@nitrodevco/nitro-packets';

import { openHousekeepingPage } from '#base/commands';
import { MOD_CHATLOG_USER, ModerationWindow } from '#base/context/moderation';

/** `UserInfoCtrl.formatTime`. */
const formatModerationTime = (seconds: number) => {
    if (seconds < 2 * 60) return `${seconds} secs ago`;
    if (seconds < 2 * 3600) return `${Math.round(seconds / 60)} mins ago`;
    if (seconds < 2 * 86400) return `${Math.round(seconds / 3600)} hours ago`;
    if (seconds < 2 * 31536000) return `${Math.round(seconds / 86400)} days ago`;

    return `${Math.round(seconds / 31536000)} years ago`;
};

/** `UserInfoCtrl.setTxt`: the value, or the fallback when it is empty. */
const txt = (value: string | undefined, fallback = '') => ({ caption: value ? value : fallback });

/**
 * `UserInfoCtrl.refresh`'s fields, and `setAlertTxt`'s counts with their "view" link only when there is one.
 * `prepare`'s housekeeping links: `habboinfotool_but` opens the user's info tool page, the caution, ban
 * and trading lock "view" links their moderator action log (`showModeratorLog`), and the identity bans'
 * one their identity (`showIdentityInformation`).
 */
export const userInfoBindings = (user: IModeratorUserInfoData | undefined): Record<string, object> => {
    if (!user) return { fields: { visible: false }, loading_txt: { visible: true } };

    const showModeratorLog = () => openHousekeepingPage('moderatoractionlog.url', user.userName);

    const bindings: Record<string, object> = {
        fields: { visible: true },
        loading_txt: { visible: false },
        name_txt: txt(user.userName),
        registered_txt: txt(formatModerationTime(user.registrationAgeInMinutes * 60)),
        cfh_count_txt: txt(String(user.cfhCount)),
        trading_lock_expiry_txt: txt(user.tradingExpiryDate, 'No active lock'),
        last_login_txt: txt(formatModerationTime(user.minutesSinceLastLogin * 60)),
        online_txt: txt(user.online ? 'Yes' : 'No'),
        last_purchase_txt: txt(user.lastPurchaseDate, 'No purchases'),
        email_address_txt: txt(user.primaryEmailAddress, 'No email found'),
        id_bans_txt: txt(String(user.identityRelatedBanCount)),
        view_id_bans_txt: { onPointerTap: () => openHousekeepingPage('identityinformationtool.url', String(user.identityId)) },
        habboinfotool_but: { onPointerTap: () => openHousekeepingPage('habboinfotool.url', user.userName) },
        user_class_txt: txt(user.userClassification, '-'),
        // Within 48 hours the time reddens with how recent it is.
        last_sanction_time_txt: { ...txt(user.lastSanctionTime), ...((user.sanctionAgeHours <= 48) ? { color: Math.floor((255 * (48 - user.sanctionAgeHours)) / 48) << 16 } : {}) },
    };

    const alertTxt = (name: string, value: number, onView?: () => void) => {
        bindings[name] = { caption: String(value) };
        bindings[`view_${name}`] = { visible: (value > 0), onPointerTap: onView };
    };

    alertTxt('abusive_cfh_count_txt', user.abusiveCfhCount);
    alertTxt('caution_count_txt', user.cautionCount, showModeratorLog);
    alertTxt('ban_count_txt', user.banCount, showModeratorLog);
    alertTxt('trading_lock_count_txt', user.tradingLockCount, showModeratorLog);

    return bindings;
};

/**
 * `UserInfoCtrl.prepare`'s buttons: the player's chatlog and room visits, and the send-message and mod
 * action windows (`onMessageButton` / `onModActionButton`), which get the call for help the user info
 * shows for (`_-C2S`: the issue handler's issue, or its evidence chatlog's) and send it with their actions.
 * Mod action is off for "No identity". Each opens beside `caller`, or under it with `below`.
 */
export const userInfoButtons = (user: IModeratorUserInfoData | undefined, showWindow: (window: ModerationWindow, caller?: string, below?: boolean) => void, caller: string, below: boolean, issueId?: number): Record<string, object> => ({
    chatlog_but: { onPointerTap: () => user && showWindow({ kind: 'chatlog', type: MOD_CHATLOG_USER, id: user.userId }, caller, below) },
    roomvisits_but: { onPointerTap: () => user && showWindow({ kind: 'roomVisits', userId: user.userId }, caller, below) },
    message_but: { onPointerTap: () => user && showWindow({ kind: 'sendMessage', userId: user.userId, userName: user.userName, issueId }, caller, below) },
    modaction_but: { disabled: user?.primaryEmailAddress === 'No identity', onPointerTap: () => user && (user.primaryEmailAddress !== 'No identity') && showWindow({ kind: 'modAction', userId: user.userId, userName: user.userName, issueId }, caller, below) },
});
