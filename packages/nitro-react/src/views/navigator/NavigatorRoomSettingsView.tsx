import { ClubLevelEnum } from '@nitrodevco/nitro-api';
import type { IRoomSettingsData } from '@nitrodevco/nitro-packets';
import { AssignRightsComposer, DeleteRoomComposer, GetBannedUsersFromRoomComposer, GetExtendedProfileComposer, getFlatCategoryVisibleName, GetFlatControllersComposer, RemoveAllRightsComposer, RemoveRightsComposer, SaveRoomSettingsComposer, UnbanUserFromRoomComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useInterpolate, useNavigatorActions, useNavigatorSelectors, useOwnClubLevel, useTranslation, useUserContext, useWebSocketContext } from '#base/context';
import { createLinkEvent } from '#base/hooks';
import { Button, ButtonThick, CheckBox, DropmenuSelect, FieldErrorPopup, Frame, NitroIcon, RadioButton, ScrollArea, TabButton, TabContext } from '#base/theme';

/*
 * RoomSettingsCtrl — ros_room_settings (341x477, frame style 3, 5 tabs). There is
 * no save button: every input blur and every checkbox/dropdown/radio change runs
 * save(), which assembles the full SaveRoomSettingsMessageComposer. Opened from the
 * navigator for a room the user is not inside, tabs 2/3 and the delete link vanish.
 */

type FormState = {
    name: string;
    description: string;
    doorMode: number;
    password: string;
    passwordConfirm: string;
    categoryIndex: number;
    maxVisitorsIndex: number;
    tradeMode: number;
    tag1: string;
    tag2: string;
    allowPets: boolean;
    allowFoodConsume: boolean;
    muteAllPets: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThicknessIndex: number;
    floorThicknessIndex: number;
    floodIndex: number;
    muteIndex: number;
    kickIndex: number;
    banIndex: number;
    doNotLeaveOnDoorTile: boolean;
    idleSleep: boolean;
    idleSleepTimeout: string;
    idleAutokick: boolean;
    idleAutokickTimeout: string;
};

/* getThicknessSelectionIndex — dropdown order thinnest/thin/normal/thick, value = index - 2 */
const thicknessIndex = (value: number) => {
    switch (value) {
        case -2: return 0;
        case -1: return 1;
        case 1: return 3;
        default: return 2;
    }
};

const MODERATION_LABEL_KEYS: Record<number, string> = {
    0: 'navigator.roomsettings.moderation.none',
    1: 'navigator.roomsettings.moderation.rights',
    2: 'navigator.roomsettings.moderation.all',
    4: 'navigator.roomsettings.moderation.group_admins',
    5: 'navigator.roomsettings.moderation.group_admins_and_rights'
};

/*
 * onRoomSettingsSaveError — errorCode/info to the field that shows the nav_error_popup;
 * the tab switch happens in the store action. Tag errors point at whichever tag input
 * holds the offending word (setTagError compares lowercased text).
 */
const deriveSaveError = (error: { errorCode: number; info: string } | undefined, tag1: string): { field: string; messageKey: string } | null => {
    if (!error) return null;

    const tagField = tag1.toLowerCase() === error.info ? 'tag1' : 'tag2';

    switch (error.errorCode) {
        case 7: return { field: 'name', messageKey: 'navigator.roomsettings.roomnameismandatory' };
        case 8: return { field: 'name', messageKey: 'navigator.roomsettings.unacceptablewords' };
        case 10: return { field: 'description', messageKey: 'navigator.roomsettings.unacceptablewords' };
        case 11: return { field: tagField, messageKey: 'navigator.roomsettings.unacceptablewords' };
        case 12: return { field: tagField, messageKey: 'navigator.roomsettings.nonuserchoosabletag' };
        case 13: return { field: tagField, messageKey: 'navigator.roomsettings.toomanycharacters' };
        case 5: return { field: 'password', messageKey: 'navigator.roomsettings.passwordismandatory' };
        case 16:
            if (error.info === 'idleSleepTimeoutSeconds') return { field: 'idleSleepTimeout', messageKey: 'navigator.roomsettings.idle_sleep_timeout.invalid' };
            if (error.info === 'idleAutokickTimeoutSeconds') return { field: 'idleAutokickTimeout', messageKey: 'navigator.roomsettings.idle_autokick_timeout.invalid' };
            return { field: 'name', messageKey: 'navigator.roomsettings.unacceptablewords' };
        default: return { field: 'name', messageKey: '' };
    }
};

export const NavigatorRoomSettingsView = () => {
    const { roomSettings } = useNavigatorSelectors();

    if (!roomSettings) return null;

    /* the key remounts the form for each fresh settings snapshot (populateForm) */
    return <RoomSettingsDialog key={roomSettings.data.roomId} />;
};

const RoomSettingsDialog = () => {
    const { roomSettings, roomSettingsSaveError, flatCategories, homeRoomId } = useNavigatorSelectors();
    const { closeRoomSettings, setRoomSettingsTab, setFlatControllers, setBannedUsers, clearRoomSettingsSaveError, showAlert } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const clubLevel = useOwnClubLevel();
    const friends = useUserContext(x => x.friends);
    const interpolate = useInterpolate();
    const t = useTranslation();

    const initialData = roomSettings?.data;
    const [form, setForm] = useState<FormState | null>(() => (initialData ? {
        name: initialData.name,
        description: initialData.description,
        doorMode: initialData.doorMode,
        password: '',
        passwordConfirm: '',
        categoryIndex: -1,
        maxVisitorsIndex: -1,
        tradeMode: initialData.tradeMode,
        tag1: initialData.tags[0] ?? '',
        tag2: initialData.tags[1] ?? '',
        allowPets: initialData.allowPets,
        allowFoodConsume: initialData.allowFoodConsume,
        muteAllPets: initialData.muteAllPets,
        allowWalkThrough: initialData.allowWalkThrough,
        hideWalls: initialData.hideWalls,
        wallThicknessIndex: thicknessIndex(initialData.wallThickness),
        floorThicknessIndex: thicknessIndex(initialData.floorThickness),
        floodIndex: initialData.chatFloodSensitivity,
        muteIndex: -1,
        kickIndex: -1,
        banIndex: -1,
        doNotLeaveOnDoorTile: !initialData.leaveOnDoorTileEnabled,
        idleSleep: initialData.idleSleepEnabled,
        idleSleepTimeout: initialData.idleSleepTimeoutSeconds > 0 ? `${initialData.idleSleepTimeoutSeconds}` : '',
        idleAutokick: initialData.idleAutokickEnabled,
        idleAutokickTimeout: initialData.idleAutokickTimeoutSeconds > 0 ? `${initialData.idleAutokickTimeoutSeconds}` : ''
    } : null));
    const [fieldError, setFieldError] = useState<{ field: string; message: string } | null>(null);
    const [rightsFilter, setRightsFilter] = useState('');
    const [selectedBanUserId, setSelectedBanUserId] = useState(-1);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const data = roomSettings?.data;
    const groupId = roomSettings?.groupId ?? 0;
    const vip = clubLevel >= ClubLevelEnum.Vip;

    if (!roomSettings || !data || !form) return null;

    /* the server error wins over a stale client-side one */
    const serverError = deriveSaveError(roomSettingsSaveError, form.tag1);
    const activeError = serverError
        ? { field: serverError.field, message: serverError.messageKey !== '' ? t(serverError.messageKey) : `Update failed: error ${roomSettingsSaveError?.errorCode}` }
        : fieldError;

    const fromNavigator = roomSettings.fromNavigator;
    const currentTab = roomSettings.currentTab;

    /* setCategorySelection — visible && !automatic, plus the room's own category */
    const categories = flatCategories.filter(x => (x.visible || x.nodeId === data.categoryId) && !x.automatic);
    const categoryIndex = form.categoryIndex !== -1 ? form.categoryIndex : Math.max(0, categories.findIndex(x => x.nodeId === data.categoryId));

    /* refreshMaxVisitors — 10..(vip ? 75 : 50) step 5, the cap appended when exceeded */
    const maxVisitorCap = vip ? 75 : 50;
    const maxVisitorOptions: number[] = [];
    for (let i = 10; i <= maxVisitorCap; i += 5) maxVisitorOptions.push(i);
    if (data.maximumVisitors > maxVisitorCap) maxVisitorOptions.push(maxVisitorCap);
    const maxVisitorsIndex = form.maxVisitorsIndex !== -1
        ? form.maxVisitorsIndex
        : Math.max(0, maxVisitorOptions.findIndex(x => x === data.maximumVisitors));

    /* populateRoomModerationSettings — group rooms add the group-admin options */
    const hasGroup = groupId > 0;
    const muteOptions = hasGroup ? [0, 1, 4, 5] : [0, 1];
    const kickOptions = hasGroup ? [0, 1, 2, 4, 5] : [0, 1, 2];
    const banOptions = hasGroup ? [0, 1, 4, 5] : [0, 1];
    const muteIndex = form.muteIndex !== -1 ? form.muteIndex : Math.max(0, muteOptions.indexOf(data.moderation.whoCanMute));
    const kickIndex = form.kickIndex !== -1 ? form.kickIndex : Math.max(0, kickOptions.indexOf(data.moderation.whoCanKick));
    const banIndex = form.banIndex !== -1 ? form.banIndex : Math.max(0, banOptions.indexOf(data.moderation.whoCanBan));

    /*
     * save() — assembles the complete composer from the current form; client-side
     * validation mirrors the AS3 (password confirm, idle timeout ranges/offset)
     */
    const save = (overrides: Partial<FormState> = {}) => {
        const state = { ...form, ...overrides };

        /* clearErrors() — every save starts clean */
        setFieldError(null);
        clearRoomSettingsSaveError();

        if (state.doorMode === 2 && state.password !== state.passwordConfirm) {
            setRoomSettingsTab(2);
            setFieldError({ field: 'passwordConfirm', message: t('navigator.roomsettings.invalidconfirm') });

            return;
        }

        let idleSleepTimeout = 0;
        let idleAutokickTimeout = 0;

        if (vip) {
            if (state.idleSleep) {
                idleSleepTimeout = /^\d+$/.test(state.idleSleepTimeout.trim()) ? parseInt(state.idleSleepTimeout.trim()) : -1;

                if (idleSleepTimeout < 30 || idleSleepTimeout > 3600) {
                    setRoomSettingsTab(4);
                    setFieldError({ field: 'idleSleepTimeout', message: t('navigator.roomsettings.idle_sleep_timeout.invalid') });

                    return;
                }
            }

            if (state.idleAutokick) {
                idleAutokickTimeout = /^\d+$/.test(state.idleAutokickTimeout.trim()) ? parseInt(state.idleAutokickTimeout.trim()) : -1;

                if (idleAutokickTimeout < 60 || idleAutokickTimeout > 36000) {
                    setRoomSettingsTab(4);
                    setFieldError({ field: 'idleAutokickTimeout', message: t('navigator.roomsettings.idle_autokick_timeout.invalid') });

                    return;
                }
            }

            /* autokick must trigger at least 30s after sleep */
            if (state.idleSleep && state.idleAutokick && idleAutokickTimeout < idleSleepTimeout + 30) {
                setRoomSettingsTab(4);
                setFieldError({ field: 'idleAutokickTimeout', message: t('navigator.roomsettings.idle_autokick_timeout.offset.invalid') });

                return;
            }
        }

        const stateCategoryIndex = state.categoryIndex !== -1 ? state.categoryIndex : categoryIndex;
        const stateMaxVisitorsIndex = state.maxVisitorsIndex !== -1 ? state.maxVisitorsIndex : maxVisitorsIndex;
        const stateMuteIndex = state.muteIndex !== -1 ? state.muteIndex : muteIndex;
        const stateKickIndex = state.kickIndex !== -1 ? state.kickIndex : kickIndex;
        const stateBanIndex = state.banIndex !== -1 ? state.banIndex : banIndex;

        const vipFields: Pick<IRoomSettingsData, 'leaveOnDoorTileEnabled' | 'idleSleepEnabled' | 'idleSleepTimeoutSeconds' | 'idleAutokickEnabled' | 'idleAutokickTimeoutSeconds'> = vip
            ? {
                leaveOnDoorTileEnabled: !state.doNotLeaveOnDoorTile,
                idleSleepEnabled: state.idleSleep,
                idleSleepTimeoutSeconds: state.idleSleep ? idleSleepTimeout : 0,
                idleAutokickEnabled: state.idleAutokick,
                idleAutokickTimeoutSeconds: state.idleAutokick ? idleAutokickTimeout : 0
            }
            : {
                leaveOnDoorTileEnabled: data.leaveOnDoorTileEnabled,
                idleSleepEnabled: data.idleSleepEnabled,
                idleSleepTimeoutSeconds: data.idleSleepTimeoutSeconds,
                idleAutokickEnabled: data.idleAutokickEnabled,
                idleAutokickTimeoutSeconds: data.idleAutokickTimeoutSeconds
            };

        send(new SaveRoomSettingsComposer({
            roomId: data.roomId,
            name: state.name,
            description: state.description,
            doorMode: state.doorMode,
            password: state.doorMode === 2 && state.password !== '' ? state.password : '',
            maximumVisitors: maxVisitorOptions[stateMaxVisitorsIndex] ?? maxVisitorOptions[0],
            categoryId: categories[stateCategoryIndex]?.nodeId ?? data.categoryId,
            tags: [state.tag1, state.tag2].filter(x => x !== ''),
            tradeMode: state.tradeMode,
            allowPets: state.allowPets,
            allowFoodConsume: state.allowFoodConsume,
            allowWalkThrough: state.allowWalkThrough,
            hideWalls: state.hideWalls,
            wallThickness: state.wallThicknessIndex - 2,
            floorThickness: state.floorThicknessIndex - 2,
            whoCanMute: muteOptions[stateMuteIndex] ?? 0,
            whoCanKick: kickOptions[stateKickIndex] ?? 0,
            whoCanBan: banOptions[stateBanIndex] ?? 0,
            chatFloodSensitivity: state.floodIndex,
            muteAllPets: state.muteAllPets,
            ...vipFields
        }));
    };

    const update = (changes: Partial<FormState>, saveNow: boolean = false) => {
        setForm(x => (x ? { ...x, ...changes } : x));

        if (saveNow) save(changes);
    };

    const selectTab = (tab: number) => {
        setRoomSettingsTab(tab);

        /* refreshFlatControllers / refreshBannedUsers — lazily fetched per tab */
        if (tab === 3 && roomSettings.controllers === null) {
            setFlatControllers(data.roomId, []);
            send(new GetFlatControllersComposer({ roomId: data.roomId }));
        }

        if (tab === 5 && roomSettings.bannedUsers === null) {
            setBannedUsers(data.roomId, []);
            send(new GetBannedUsersFromRoomComposer({ roomId: data.roomId }));
        }
    };

    /* onDeleteButtonClick — home room and group rooms alert instead of confirming */
    const deleteRoom = () => {
        if (data.roomId === homeRoomId) {
            showAlert(t('navigator.delete.homeroom.title'), t('navigator.delete.homeroom.body'));

            return;
        }

        if (groupId > 0) {
            showAlert(t('group.deletebase.title'), t('group.deletebase.body'));

            return;
        }

        setDeleteConfirmOpen(true);
    };

    const visibleTabs = fromNavigator ? [1, 4, 5] : [1, 2, 3, 4, 5];
    const controllers = roomSettings.controllers ?? [];
    const filteredControllers = controllers.filter(x => x.userName.toLowerCase().includes(rightsFilter.toLowerCase()));
    const filteredFriends = Object.values(friends)
        .filter(x => !controllers.some(y => y.userId === x.playerId))
        .filter(x => x.name.toLowerCase().includes(rightsFilter.toLowerCase()));

    const errorFor = (field: string) => (activeError?.field === field ? <FieldErrorPopup className="absolute -top-6 left-0 z-10" text={activeError.message} /> : null);

    return (
        <Frame
            caption={t('navigator.roomsettings')}
            className="inset-0 m-auto w-85.25 h-119.25"
            contentClassName="relative flex flex-col"
            id="navigator-room-settings"
            resizeDirection="none"
            variant="3"
            onClose={closeRoomSettings}>
            {/* tab_context (-6,3) 354x32 — width split across the visible tabs */}
            <TabContext className="flex shrink-0 -mx-0.75 px-0.75">
                {visibleTabs.map(tab => (
                    <TabButton
                        key={tab}
                        aria-selected={currentTab === tab}
                        className="flex-1 h-8"
                        onClick={() => selectTab(tab)}>
                        {t(`navigator.roomsettings.tab.${tab}`)}
                    </TabButton>
                ))}
            </TabContext>
            {/* content_container (10,42) 327x369 */}
            <div className="relative flex-1 mt-1.5 mx-1.75">
                {currentTab === 1 && (
                    <div className="relative size-full">
                        <span className="absolute left-0 top-0 text-style-regular">{t('navigator.roomname')}</span>
                        <div className="absolute left-0 top-3.5 w-75">
                            {errorFor('name')}
                            <input
                                className="w-full h-5 px-1 bg-white border border-black text-style-regular"
                                maxLength={60}
                                type="text"
                                value={form.name}
                                onBlur={() => save()}
                                onChange={event => update({ name: event.target.value })} />
                        </div>
                        <span className="absolute left-0 top-9.5 text-style-regular">{t('navigator.roomsettings.desc')}</span>
                        <div className="absolute left-0 top-12.75 w-75">
                            {errorFor('description')}
                            <textarea
                                className="w-full h-9.75 px-1 bg-white border border-black text-style-regular resize-none"
                                maxLength={255}
                                value={form.description}
                                onBlur={() => save()}
                                onChange={event => update({ description: event.target.value })} />
                        </div>
                        {/* tag_category_container (0,100) */}
                        <span className="absolute left-0 top-25 text-style-regular">{t('navigator.category')}</span>
                        <DropmenuSelect
                            className="absolute left-0 top-29 w-75 h-6"
                            options={categories.map(x => interpolate(getFlatCategoryVisibleName(x)))}
                            selectedIndex={categoryIndex}
                            variant="2"
                            onSelect={index => update({ categoryIndex: index }, true)} />
                        <span className="absolute left-0 top-36.25 text-style-regular">{t('navigator.maxvisitors')}</span>
                        <DropmenuSelect
                            className="absolute left-0 top-40.25 w-75 h-6"
                            options={maxVisitorOptions.map(x => `${x}`)}
                            selectedIndex={maxVisitorsIndex}
                            variant="2"
                            onSelect={index => update({ maxVisitorsIndex: index }, true)} />
                        <span className="absolute left-0 top-47.5 text-style-regular">{t('navigator.tradesettings')}</span>
                        <DropmenuSelect
                            className="absolute left-0 top-51.5 w-75 h-6"
                            options={[t('navigator.roomsettings.trade_not_allowed'), t('navigator.roomsettings.trade_not_with_Controller'), t('navigator.roomsettings.trade_allowed')]}
                            selectedIndex={form.tradeMode}
                            variant="2"
                            onSelect={index => update({ tradeMode: index }, true)} />
                        <span className="absolute left-0 top-59.5 text-style-regular">{t('navigator.tags')}</span>
                        <div className="absolute left-0 top-63.5 w-36.25">
                            {errorFor('tag1')}
                            <input
                                className="w-full h-3.75 px-1 bg-white border border-black text-style-regular"
                                maxLength={30}
                                type="text"
                                value={form.tag1}
                                onBlur={() => save()}
                                onChange={event => update({ tag1: event.target.value })} />
                        </div>
                        <div className="absolute left-37.25 top-63.5 w-36.25">
                            {errorFor('tag2')}
                            <input
                                className="w-full h-3.75 px-1 bg-white border border-black text-style-regular"
                                maxLength={30}
                                type="text"
                                value={form.tag2}
                                onBlur={() => save()}
                                onChange={event => update({ tag2: event.target.value })} />
                        </div>
                        {/* advanced_container (0,253): walk-through at y 312 */}
                        <div className="absolute left-0.5 top-78 flex items-center gap-1 cursor-pointer" onClick={() => update({ allowWalkThrough: !form.allowWalkThrough }, true)}>
                            <CheckBox aria-selected={form.allowWalkThrough || undefined} variant="0" />
                            <span className="text-style-regular">{t('navigator.roomsettings.allow_walk_through')}</span>
                        </div>
                        {/* remove_link_region (60,339) — only while inside the room */}
                        {!fromNavigator && (
                            <div className="absolute left-15 top-84.75 flex items-center gap-1 cursor-pointer" onClick={deleteRoom}>
                                <NitroIcon icon="icon-decline-x" />
                                <span className="text-style-regular underline">{t('navigator.roomsettings.delete')}</span>
                            </div>
                        )}
                    </div>
                )}
                {currentTab === 2 && (
                    <div className="relative size-full">
                        <span className="absolute left-0 top-0.75 text-style-u-bold">{t('navigator.roomsettings.roomaccess.caption')}</span>
                        <span className="absolute left-0 top-4.75 w-77.5 text-style-regular break-words">{t('navigator.roomsettings.roomaccess.info')}</span>
                        {/* doormode_container (0,87) */}
                        <span className="absolute left-0 top-21.75 text-style-regular">{t('navigator.roomsettings.doormode')}</span>
                        {[
                            { mode: 0, key: 'open', top: 26 },
                            { mode: 1, key: 'doorbell', top: 30.75 },
                            { mode: 3, key: 'invisible', top: 35.75 },
                            { mode: 2, key: 'password', top: 40.75 }
                        ].map(({ mode, key, top }) => (
                            <div
                                key={key}
                                className="absolute left-1.25 flex items-center gap-1 cursor-pointer"
                                style={{ top: top * 4 }}
                                onClick={() => update({ doorMode: mode }, true)}>
                                <RadioButton aria-selected={form.doorMode === mode || undefined} variant="0" />
                                <span className="text-style-regular">{t(`navigator.roomsettings.doormode.${key}`)}</span>
                            </div>
                        ))}
                        {/* password_container (41,188) — visible only in password mode */}
                        {form.doorMode === 2 && (
                            <div className="absolute left-10.25 top-47 w-48.75">
                                <span className="block text-style-regular">{t('navigator.roomsettings.password')}</span>
                                <div className="relative">
                                    {errorFor('password')}
                                    <input
                                        className="w-full h-3.75 px-1 bg-white border border-black text-style-regular"
                                        maxLength={30}
                                        type="password"
                                        value={form.password}
                                        onBlur={() => save()}
                                        onChange={event => update({ password: event.target.value })} />
                                </div>
                                <span className="block mt-0.5 text-style-regular">{t('navigator.roomsettings.passwordconfirm')}</span>
                                <div className="relative">
                                    {errorFor('passwordConfirm')}
                                    <input
                                        className="w-full h-3.75 px-1 bg-white border border-black text-style-regular"
                                        maxLength={30}
                                        type="password"
                                        value={form.passwordConfirm}
                                        onBlur={() => save()}
                                        onChange={event => update({ passwordConfirm: event.target.value })} />
                                </div>
                            </div>
                        )}
                        {/* doormode_override_info — Builders Club locked rooms */}
                        {data.hiddenByBc && (
                            <div className="absolute left-0 top-22 w-77 h-41.5 p-2 bg-[#EAECE8] border border-black">
                                <span className="block text-style-regular break-words">{t('notification.builders_club.room_locked.message')}</span>
                                <Button className="absolute left-2.75 bottom-2 h-7.5" variant="3" onClick={() => createLinkEvent('habbopages/builders-club/faq')}>
                                    {t('notification.builders_club.room_locked.linkTitle')}
                                </Button>
                            </div>
                        )}
                        {/* flexible_content (0,260) */}
                        {groupId > 0 && (
                            <span className="absolute left-0 top-65 w-69.25 text-style-regular break-words">{t('navigator.roomsettings.roomaccess.guild.disclaimer')}</span>
                        )}
                        <span className="absolute left-0 top-72.5 text-style-regular">{t('navigator.roomsettings.pets')}</span>
                        {[
                            { key: 'allowPets', label: 'navigator.roomsettings.allowpets', top: 77.25, value: form.allowPets },
                            { key: 'allowFoodConsume', label: 'navigator.roomsettings.allowfoodconsume', top: 82.25, value: form.allowFoodConsume },
                            { key: 'muteAllPets', label: 'navigator.roomsettings.mute_all_pets', top: 87.25, value: form.muteAllPets }
                        ].map(({ key, label, top, value }) => (
                            <div
                                key={key}
                                className="absolute left-0.75 flex items-center gap-1 cursor-pointer"
                                style={{ top: top * 4 }}
                                onClick={() => update({ [key]: !value }, true)}>
                                <CheckBox aria-selected={value || undefined} variant="0" />
                                <span className="text-style-regular">{t(label)}</span>
                            </div>
                        ))}
                    </div>
                )}
                {currentTab === 3 && (
                    <div className="relative size-full">
                        {/* search_border (0,1) 322x42 */}
                        <div className="absolute left-0 top-0.25 w-80.5 h-10.5 flex items-center gap-2 px-1.5 border border-black bg-[#EAECE8]">
                            <span className="shrink-0 text-style-regular">{t('navigator.flatctrls.filter')}</span>
                            <input
                                className="flex-1 min-w-0 h-5.75 px-1 bg-white border border-black text-style-regular"
                                type="text"
                                value={rightsFilter}
                                onChange={event => setRightsFilter(event.target.value)} />
                        </div>
                        <span className="absolute left-0 top-11 w-37.5 text-style-regular break-words">{t('navigator.flatctrls.userswithrights')}</span>
                        <span className="absolute left-43.75 top-11 w-37.5 text-style-regular break-words">{t('navigator.flatctrls.friends')}</span>
                        {/* users_with_rights_cont (0,74) 150x289 */}
                        <div className="absolute left-0 top-18.5 w-37.5 h-72.25 border border-black bg-white">
                            <ScrollArea className="w-full h-62.5 p-1" variant="100">
                                {filteredControllers.map(controller => (
                                    <div key={controller.userId} className="flex items-center gap-1 h-4.5">
                                        <NitroIcon
                                            className="shrink-0 cursor-pointer"
                                            icon="icon-nav-friendlist-eye"
                                            onClick={() => send(new GetExtendedProfileComposer({ userId: controller.userId }))} />
                                        <span
                                            className="truncate text-style-regular cursor-pointer"
                                            onClick={() => send(new RemoveRightsComposer({ userIds: [controller.userId] }))}>
                                            {controller.userName}
                                        </span>
                                    </div>
                                ))}
                            </ScrollArea>
                            <ButtonThick
                                className="absolute left-1 bottom-1 w-35.5 h-7.25 flex items-center justify-center"
                                variant="3"
                                onClick={() => send(new RemoveAllRightsComposer({ roomId: data.roomId }))}>
                                {t('navigator.flatctrls.clear')}
                            </ButtonThick>
                        </div>
                        {/* friends_cont (173,74) 150x289 */}
                        <div className="absolute left-43.25 top-18.5 w-37.5 h-72.25 border border-black bg-white">
                            <ScrollArea className="w-full h-full p-1" variant="100">
                                {filteredFriends.map(friend => (
                                    <div key={friend.playerId} className="flex items-center gap-1 h-4.5">
                                        <NitroIcon
                                            className="shrink-0 cursor-pointer"
                                            icon="icon-nav-friendlist-eye"
                                            onClick={() => send(new GetExtendedProfileComposer({ userId: friend.playerId }))} />
                                        <span
                                            className="truncate text-style-regular cursor-pointer"
                                            onClick={() => send(new AssignRightsComposer({ userId: friend.playerId }))}>
                                            {friend.name}
                                        </span>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                )}
                {currentTab === 4 && (
                    <div className="relative size-full">
                        <span className="absolute left-0 top-0.75 text-style-u-bold">{t('navigator.roomsettings.vip.caption')}</span>
                        <span className="absolute left-0 top-4.75 w-77.5 text-style-regular break-words">{t('navigator.roomsettings.vip.info')}</span>
                        <span className="absolute left-0 top-21 text-style-u-bold">{t('navigator.roomsettings.vip_settings')}</span>
                        <div className="absolute left-0 top-26 flex items-center gap-1 cursor-pointer" onClick={() => update({ hideWalls: !form.hideWalls }, true)}>
                            <CheckBox aria-selected={form.hideWalls || undefined} variant="0" />
                            <span className="text-style-regular">{t('navigator.roomsettings.hide_walls')}</span>
                        </div>
                        <DropmenuSelect
                            className="absolute left-0 top-31.25 w-69 h-6"
                            options={['thinnest', 'thin', 'normal', 'thick'].map(x => t(`navigator.roomsettings.wall_thickness.${x}`))}
                            selectedIndex={form.wallThicknessIndex}
                            variant="2"
                            onSelect={index => update({ wallThicknessIndex: index }, true)} />
                        <DropmenuSelect
                            className="absolute left-0 top-39 w-69 h-6"
                            options={['thinnest', 'thin', 'normal', 'thick'].map(x => t(`navigator.roomsettings.floor_thickness.${x}`))}
                            selectedIndex={form.floorThicknessIndex}
                            variant="2"
                            onSelect={index => update({ floorThicknessIndex: index }, true)} />
                        <span className="absolute left-0 top-47.75 text-style-u-bold">{t('navigator.roomsettings.room_behavior')}</span>
                        {/* room-behavior block disabled (blend 0.5) without VIP */}
                        <div className={vip ? undefined : 'opacity-50 pointer-events-none'}>
                            <div className="absolute left-0 top-53 flex items-center gap-1 cursor-pointer" onClick={() => update({ doNotLeaveOnDoorTile: !form.doNotLeaveOnDoorTile }, true)}>
                                <CheckBox aria-selected={form.doNotLeaveOnDoorTile || undefined} variant="0" />
                                <span className="text-style-regular">{t('navigator.roomsettings.do_not_leave_on_door_tile')}</span>
                            </div>
                            <div className="absolute left-0 top-58.5 flex items-center gap-1 cursor-pointer" onClick={() => update({ idleSleep: !form.idleSleep }, true)}>
                                <CheckBox aria-selected={form.idleSleep || undefined} variant="0" />
                                <span className="text-style-regular">{t('navigator.roomsettings.idle_sleep')}</span>
                            </div>
                            <div className="absolute left-6 top-63.75 w-12.5">
                                {errorFor('idleSleepTimeout')}
                                <input
                                    className="w-full h-5 px-1 bg-white border border-black text-style-regular"
                                    maxLength={5}
                                    type="text"
                                    value={form.idleSleepTimeout}
                                    onBlur={() => { if (vip && form.idleSleep) save(); }}
                                    onChange={event => update({ idleSleepTimeout: event.target.value.replace(/\D/g, '') })} />
                            </div>
                            <span className="absolute left-19.25 top-64.25 text-style-regular">{t('navigator.roomsettings.timeout.seconds')}</span>
                            <div className="absolute left-0 top-70 flex items-center gap-1 cursor-pointer" onClick={() => update({ idleAutokick: !form.idleAutokick }, true)}>
                                <CheckBox aria-selected={form.idleAutokick || undefined} variant="0" />
                                <span className="text-style-regular">{t('navigator.roomsettings.idle_autokick')}</span>
                            </div>
                            <div className="absolute left-6 top-75.25 w-12.5">
                                {errorFor('idleAutokickTimeout')}
                                <input
                                    className="w-full h-5 px-1 bg-white border border-black text-style-regular"
                                    maxLength={5}
                                    type="text"
                                    value={form.idleAutokickTimeout}
                                    onBlur={() => { if (vip && form.idleAutokick) save(); }}
                                    onChange={event => update({ idleAutokickTimeout: event.target.value.replace(/\D/g, '') })} />
                            </div>
                            <span className="absolute left-19.25 top-75.75 text-style-regular">{t('navigator.roomsettings.timeout.seconds')}</span>
                        </div>
                        <span className="absolute left-0 top-83.75 text-style-u-bold">{t('navigator.roomsettings.chat.flood_sensitivity')}</span>
                        <DropmenuSelect
                            className="absolute left-0 top-89.5 w-69 h-6"
                            options={['strict', 'normal', 'loose'].map(x => t(`navigator.roomsettings.chat.flood.${x}`))}
                            selectedIndex={form.floodIndex}
                            variant="2"
                            onSelect={index => update({ floodIndex: index }, true)} />
                    </div>
                )}
                {currentTab === 5 && (
                    <div className="relative size-full">
                        <span className="absolute left-1.5 top-1.25 w-79.25 text-style-u-bold break-words">{t('navigator.roomsettings.moderation.header')}</span>
                        <span className="absolute left-1.75 top-10.5 text-style-regular">{t('navigator.roomsettings.moderation.mute.header')}</span>
                        <DropmenuSelect
                            className="absolute left-2.5 top-15.25 w-69 h-6"
                            options={muteOptions.map(x => t(MODERATION_LABEL_KEYS[x]))}
                            selectedIndex={muteIndex}
                            variant="2"
                            onSelect={index => update({ muteIndex: index }, true)} />
                        <span className="absolute left-1.75 top-23 text-style-regular">{t('navigator.roomsettings.moderation.kick.header')}</span>
                        <DropmenuSelect
                            className="absolute left-2.5 top-28 w-69 h-6"
                            options={kickOptions.map(x => t(MODERATION_LABEL_KEYS[x]))}
                            selectedIndex={kickIndex}
                            variant="2"
                            onSelect={index => update({ kickIndex: index }, true)} />
                        <span className="absolute left-1.75 top-35.5 text-style-regular">{t('navigator.roomsettings.moderation.ban.header')}</span>
                        <DropmenuSelect
                            className="absolute left-2.5 top-40.25 w-69 h-6"
                            options={banOptions.map(x => t(MODERATION_LABEL_KEYS[x]))}
                            selectedIndex={banIndex}
                            variant="2"
                            onSelect={index => update({ banIndex: index }, true)} />
                        {/* moderation_banned_users_cont (8,200) 172x156 */}
                        <div className="absolute left-2 top-50 w-43 h-39 border border-black bg-white">
                            <ScrollArea className="w-full h-full p-1" variant="100">
                                {(roomSettings.bannedUsers ?? []).map(banned => (
                                    <div
                                        key={banned.userId}
                                        className={`flex items-center h-4.5 px-0.5 cursor-pointer ${selectedBanUserId === banned.userId ? 'bg-[#C5EDFF]' : ''}`}
                                        onClick={() => setSelectedBanUserId(banned.userId)}>
                                        <span className="truncate text-style-regular">{banned.userName}</span>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                        <span className="absolute left-47.5 top-59 w-31.25 text-style-regular break-words">{t('navigator.roomsettings.moderation.banned.users')}</span>
                        <Button
                            className="absolute left-47.5 top-65.25 h-8"
                            disabled={selectedBanUserId === -1}
                            variant="3"
                            onClick={() => {
                                send(new UnbanUserFromRoomComposer({ userId: selectedBanUserId, roomId: data.roomId }));
                                setSelectedBanUserId(-1);
                            }}>
                            {t('navigator.roomsettings.moderation.unban')}
                        </Button>
                    </div>
                )}
            </div>
            {/* ros_room_delete_confirm — caption ${navigator.roomsettings}, message with room_name */}
            {deleteConfirmOpen && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
                    <div className="w-53.75 bg-[#EAECE8] border border-black p-3">
                        <span className="block text-style-regular break-words">
                            {t('navigator.roomsettings.deleteroom.confirm.message', undefined, { room_name: data.name })}
                        </span>
                        <div className="flex justify-between mt-3">
                            <Button className="h-6" variant="3" onClick={() => setDeleteConfirmOpen(false)}>{t('generic.cancel')}</Button>
                            <Button
                                className="h-6"
                                variant="3"
                                onClick={() => {
                                    send(new DeleteRoomComposer({ roomId: data.roomId }));
                                    closeRoomSettings();
                                }}>
                                {t('generic.ok')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Frame>
    );
}
