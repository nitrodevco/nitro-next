/**
 * The quest details window: AS3 `quest/QuestDetails` over `habbo-quest-engine-com/QuestDetails` (a
 * bare frame), holding one `QuestEntry` built as the list builds its (`QuestsList.createListEntry`,
 * `refreshEntryDetails`) at (8, 8), with the quest's hint (`hint_txt`, its height the text's + 5)
 * and, under it, one link (`setupLink`): the catalogue for a placing or pet quest type, else the
 * navigator when the campaign has a `.searchtag`, else the quest rooms for a seasonal quest with
 * `quest.room.ids`. The quest panel grows by the hint and the link, the entry with it, and the
 * window is the entry's height + 56 (`openDetails`). Activate sends `AcceptQuest` in a room and
 * `ActivateQuest` outside one (`onAcceptQuest`) and closes the window; Cancel sends `RejectQuest`.
 * The seasonal calendar's close and quest-room forward on accept, and the per-second wait-period
 * refresh (the packet carries no `waitPeriodSeconds`), are not ported.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';
import { useMemo, useState } from 'react';

import { acceptQuestFromDetails, closeQuestDetails, goToRoom, rejectQuest, searchNavigator } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { findTemplateChild, measureTemplateText, TemplateWindow, TemplateWindows, useTemplateFrame, useTemplateLibrary } from '#base/theme';
import { configReader } from '#base/utils';

import { campaignKey, EntryContext, QUEST_LIBRARY, questEntry, questKey } from './questEntries';

/** `QuestDetails._SafeStr_XM`: what the frame adds around the entry. */
const FRAME_EXTRA_HEIGHT = 56;
/** `SPACING` / `TEXT_HEIGHT_SPACING`. */
const SPACING = 5;
/** `_SafeStr_y1z`: where the entry goes in the frame. */
const ENTRY_POS = 8;
/** `_SafeStr_i1F`: the quest types whose link is the catalogue. */
const CATALOG_LINK_TYPES = [ 'PLACE_ITEM', 'PLACE_FLOOR', 'PLACE_WALLPAPER', 'PET_DRINK', 'PET_EAT' ];

/** The layout's frame. */
const WINDOW_WIDTH = 493;

/** `HabboWebTools.openWebPageAndMinimizeClient` for a hint's `<a href>`. */
const openWebPage = (url: string) => {
    if (url.length) window.open(url, '_blank', 'noopener');
};

type Link = 'catalog' | 'navigator' | 'room' | null;

/** `HabboQuestEngine.goToQuestRooms`: one of `quest.room.ids` at random. */
const randomQuestRoomId = (ids: string): number => {
    const list = ids.split(',');

    return Number(list[Math.max(0, Math.min(list.length - 1, Math.floor(Math.random() * list.length)))]);
};

export const QuestDetailsView = ({ quest }: { quest: IQuestMessageData }) => {
    const t = useTranslation();
    const config = useConfigData();
    const templates = useTemplateLibrary(QUEST_LIBRARY);
    const { send } = useWebSocketContext();
    const { showWindow } = useSystemActions();
    // `_window.center()` once, `close` tag -> `onDetailsWindowClose`.
    const frame = useTemplateFrame({ id: 'quest_details', centered: true, onClose: closeQuestDetails });

    // `openDetails` fills the entry once; the seasonal time left is not counted down here.
    const [ now ] = useState(() => Date.now());
    const { configString } = configReader(config);
    const hint = t(`${questKey(quest)}.hint`, `${questKey(quest)}.hint`);
    const isSeasonal = (configString('seasonalQuestCalendar.campaignPrefix') !== '') && (quest.campaignCode.indexOf(configString('seasonalQuestCalendar.campaignPrefix')) === 0);
    const questRoomIds = configString('quest.room.ids');
    // `hasCatalogLink` / `hasNavigatorLink` / `hasRoomLink`, in `setupLink`'s order.
    const link: Link = CATALOG_LINK_TYPES.includes(quest.type)
        ? 'catalog'
        : (t(`${campaignKey(quest)}.searchtag`, '') !== '')
                ? 'navigator'
                : (isSeasonal && (questRoomIds !== '')) ? 'room' : null;

    // `openDetails`: `hint_txt.height = textHeight + 5`, `link_region` 5 under it, and the quest panel grown by both.
    const questTemplate = templates?.[`${QUEST_LIBRARY}/Quest`];
    const hintElement = questTemplate && findTemplateChild(questTemplate.elements, 'hint_txt');
    const hintHeight = useMemo(() => {
        if (!hintElement) return 0;

        return (measureTemplateText(hintElement, hint, hintElement.width)?.textHeight ?? 0) + SPACING;
    }, [ hintElement, hint ]);
    const linkElement = questTemplate && findTemplateChild(questTemplate.elements, 'link_region');
    const linkExtra = link && linkElement ? SPACING + linkElement.height : 0;
    const questExtraHeight = hintHeight + linkExtra;

    if (!templates || !questTemplate || !hintElement) return null;

    const linkY = hintElement.y + hintHeight + SPACING;

    const onLink = () => {
        // `onLinkProc`: `openCatalog` (the quest's page, else the catalogue), `openNavigator` (the quest's `.searchtag`, else the campaign's), `goToQuestRooms` (one of `quest.room.ids` at random).
        if (link === 'catalog') showWindow('catalog', quest.catalogPageName ? { pageName: quest.catalogPageName } : undefined);
        else if (link === 'navigator') searchNavigator(send, t(`${questKey(quest)}.searchtag`, '') || t(`${campaignKey(quest)}.searchtag`, ''));
        else if (link === 'room') {
            const roomId = randomQuestRoomId(questRoomIds);

            if (roomId > 0) goToRoom(send, roomId);
        }
    };

    const context: EntryContext = {
        templates,
        config,
        t,
        now,
        onAccept: () => acceptQuestFromDetails(send, quest),
        onCancel: id => rejectQuest(send, id),
        questExtraHeight,
        questBindings: {
            hint_txt: { visible: true, htmlText: hint, onLink: openWebPage },
            link_region: { visible: !!link, onPointerTap: onLink },
            link_catalog: { visible: link === 'catalog' },
            link_navigator: { visible: link === 'navigator' },
            link_room: { visible: link === 'room' },
        },
        arrangeQuestExtra: (windows: TemplateWindows) => {
            windows.find('hint_txt')?.setHeight(hintHeight);
            windows.find('link_region')?.setY(linkY);
        },
    };

    return (
        <TemplateWindow
            id={`${QUEST_LIBRARY}/QuestDetails`}
            frame={frame}
            width={WINDOW_WIDTH}
            height={questTemplate.height + questExtraHeight + FRAME_EXTRA_HEIGHT}
            bindings={{
                '': { added: [ questEntry(quest, 0, context) ] },
            }}
            arrange={(windows) => {
                const entry = windows.find('entry_container');

                entry?.setX(ENTRY_POS);
                entry?.setY(ENTRY_POS);
            }}
        />
    );
};
