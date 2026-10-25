import { StringDataType } from '@nitrodevco/nitro-api';
import type { IHabboGroupEntryData } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { registerGuildSelectorWidget } from '#base/commands';
import { CATALOG_NO_GUILD_SELECTED, CatalogGuildSelector, CatalogPage, CatalogWidgetEventEnum, useCatalogGuildActions, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { ClientGates, useClientGate, useOwnUserId } from '#base/context/user';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Dropmenu, getOrBuildTexture, TemplateWindow, ThemeImage, toCssHexColor } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `§_-N1u§`: the layout each droplist item is built from. */
const GUILD_SELECTOR_ITEM_NAME = 'guild_selector_widget_item';

/** `createGuildColorsBitmap`'s size. */
const GUILD_COLORS_BMP_WIDTH = 21;
const GUILD_COLORS_BMP_HEIGHT = 14;

/** A group colour as the server sends it (`rrggbb`, `parseInt(color, 16)`), as a fill colour. */
const groupColor = (color: string) => toCssHexColor(parseInt(color, 16) || 0);

/**
 * `createGuildColorsBitmap`: 21x14 in black, the primary colour filling the left half and the
 * secondary the right, a 1px border round both. Kept in the asset manager per colour pair.
 */
const getGuildColorsTexture = (primary: string, secondary: string) => getOrBuildTexture(`guild_selector_colors:${primary}:${secondary}`, () => {
    const canvas = document.createElement('canvas');

    canvas.width = GUILD_COLORS_BMP_WIDTH;
    canvas.height = GUILD_COLORS_BMP_HEIGHT;

    const context = canvas.getContext('2d');

    if (!context) return undefined;

    const middle = Math.trunc(GUILD_COLORS_BMP_WIDTH / 2 + 1);

    context.fillStyle = '#000000';
    context.fillRect(0, 0, GUILD_COLORS_BMP_WIDTH, GUILD_COLORS_BMP_HEIGHT);
    context.fillStyle = groupColor(primary);
    context.fillRect(1, 1, middle - 1, GUILD_COLORS_BMP_HEIGHT - 2);
    context.fillStyle = groupColor(secondary);
    context.fillRect(middle, 1, GUILD_COLORS_BMP_WIDTH - 1 - middle, GUILD_COLORS_BMP_HEIGHT - 2);

    return canvas;
});

/** The colours bitmap, drawn into `guild_colors`. */
const GuildColors = ({ guild }: { guild: IHabboGroupEntryData }) => {
    const texture = getGuildColorsTexture(guild.primaryColor, guild.secondaryColor);

    return texture
        ? (
                <ThemeImage
                    texture={texture}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 0, width: GUILD_COLORS_BMP_WIDTH, top: 0, height: GUILD_COLORS_BMP_HEIGHT }}
                />
            )
        : null;
};

/** `createDropmenuItemWindow`: a `guild_selector_widget_item` with the group's name and colours. */
const GuildSelectorItem = ({ guild }: { guild: IHabboGroupEntryData }) => (
    <TemplateWindow
        id={catalogTemplateId(GUILD_SELECTOR_ITEM_NAME)}
        bindings={{
            guild_name: { caption: guild.groupName },
            guild_colors: { children: <GuildColors guild={guild} /> },
        }}
    />
);

interface GuildSelectorProps {
    page: CatalogPage;
    /** `GuildForumSelectorCatalogWidget`: only groups a forum can be bought for, and the warning when one has it. */
    forum: boolean;
}

/**
 * The group picker of the group furni and group forum pages - Flash's
 * `GuildSelectorCatalogWidget` (`guildSelectorWidget.xml`, attached to its container) and
 * `GuildForumSelectorCatalogWidget`, which extends it.
 *
 * Until the user's groups arrive neither part shows. Once the page is up the widget registers with
 * the catalogue's `GuildMembershipsController` (`CatalogGuildSlice`, which asks for the groups) and
 * says a purchase needs its extra parameter. The answer (`populateAndSelectFavorite`) shows the
 * `guild_selector` droplist, or - for a user in no group - the `members_only` panel, and turns the
 * purchase widget on or off with it; the droplist selects the favourite group (the last one
 * marked), or the first, or on a later answer the group picked before. Picking a group
 * (`selectGroup`) tells the page - `GUILD_SELECTED` for the grid's icons and the badge view, the
 * stuff data the preview and purchase use (`["0", id, badge, primary, secondary]`) and the group
 * id as the purchase's extra parameter. The controller then selects the page's first offer.
 *
 * The forum selector lists only groups the user owns or that already have a forum (all of them for
 * security level 4 and up), and says in the warning widget when the group has one
 * (`catalog.alert.group_has_forum`).
 *
 * `find_groups_button` calls the navigator's `performGuildBaseSearch`, which the new navigator -
 * the one this client has - leaves empty, so it does nothing here either. The droplist is style 3,
 * which has no skin row and draws as style 0.
 */
const GuildSelector = ({ page, forum }: GuildSelectorProps) => {
    const [ guilds, setGuilds ] = useState<IHabboGroupEntryData[]>([]);
    const [ hasGuilds, setHasGuilds ] = useState<boolean | undefined>(undefined);
    const [ selection, setSelection ] = useState(-1);
    // `§_-yo§`: the pick a later answer selects again.
    const lastSelection = useRef(-1);
    const store = useCatalogStoreApi();
    const { unregisterGuildSelectorWidget } = useCatalogGuildActions();
    const { send } = useWebSocketContext();
    const userId = useOwnUserId();
    const anyGroup = useClientGate(ClientGates.GuildAnyGroup);

    /** `filterGroupMemberships`: every group, or for a forum the ones one can be bought for. */
    const filterGroupMemberships = (all: IHabboGroupEntryData[]) => {
        if (!forum) return all;

        // `hasSecurity(4)`: staff may buy a forum for any of their groups.

        return all.filter(guild => (guild.hasForum || (guild.ownerId === userId) || anyGroup));
    };

    /** `selectGroup`: tell the page which group the purchase is for. */
    const selectGroup = (guild: IHabboGroupEntryData) => {
        const stuffData = new StringDataType();

        stuffData.setValue([ '0', guild.groupId.toString(), guild.badgeCode, guild.primaryColor, guild.secondaryColor ]);

        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.GUILD_SELECTED, guildId: guild.groupId, color1: guild.primaryColor, color2: guild.secondaryColor, badgeCode: guild.badgeCode });
        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA, stuffData });
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: guild.groupId.toString() });

        // Flash sends the caption `${catalog.alert.group_has_forum}`, which the warning text resolves when it is set.
        if (forum) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SHOW_WARNING_TEXT, text: guild.hasForum ? '${catalog.alert.group_has_forum}' : '' });
    };

    /** The droplist's `WE_SELECTED` (`dropMenuEventProc`): select the group, and remember the pick. */
    const select = (index: number, list: IHabboGroupEntryData[]) => {
        if ((index < 0) || (index >= list.length)) return;

        setSelection(index);
        selectGroup(list[index]);
        lastSelection.current = index;
    };

    const populateAndSelectFavorite = (all: IHabboGroupEntryData[]) => {
        const filtered = filterGroupMemberships(all);
        const has = (all.length > 0);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.TOGGLE, widgetId: 'purchaseWidget', enabled: has });

        setHasGuilds(has);
        setGuilds(filtered);
        setSelection(-1);

        let favourite = -1;

        filtered.forEach((guild, index) => {
            if (guild.favourite) favourite = index;
        });

        if (lastSelection.current === -1) select((favourite !== -1) ? favourite : 0, filtered);
        else select(lastSelection.current, filtered);
    };

    const latest = useRef({ populateAndSelectFavorite });

    useEffect(() => {
        latest.current = { populateAndSelectFavorite };
    });

    // The controller holds one object for the widget's life, which calls the latest render's code.
    const [ widget ] = useState<CatalogGuildSelector>(() => ({
        populateAndSelectFavorite: all => latest.current.populateAndSelectFavorite(all),
        selectFirstOffer: () => {
            if (page.offers.length) page.selectOffer(page.offers[0].offerId);
        },
    }));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        registerGuildSelectorWidget(send, store, widget);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.EXTRA_PARAM_REQUIRED_FOR_BUY });
    });

    // `dispose()`: the page hears that no group is picked, and the controller lets the widget go.
    useEffect(() => () => {
        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.GUILD_SELECTED, guildId: CATALOG_NO_GUILD_SELECTED, color1: '', color2: '', badgeCode: '' });
        unregisterGuildSelectorWidget(widget);
    }, [ page, widget ]);

    const selected = guilds[selection];

    useCatalogWidgetView({
        template: 'guildSelectorWidget',
        bindings: {
            // The droplist with the groups' item windows (`addMenuItem(createDropmenuItemWindow(...))`):
            // a binding's `options` are texts only, so the menu is injected over the droplist.
            guild_selector: {
                visible: hasGuilds === true,
                children: (
                    <Dropmenu
                        variant="0"
                        captionContent={selected && <GuildSelectorItem guild={selected} />}
                        options={guilds.map((guild, index) => ({
                            key: guild.groupId,
                            label: guild.groupName,
                            content: <GuildSelectorItem guild={guild} />,
                            selected: (index === selection),
                            onSelect: () => select(index, guilds),
                        }))}
                        itemHeight={22}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 170, height: 26 }}
                    />
                ),
            },
            members_only: { visible: hasGuilds === false },
        },
    });

    return null;
};

/** `guildSelectorWidget` - the group furni page's picker; see `GuildSelector`. */
export const CatalogGuildSelectorWidgetView = ({ page }: CatalogWidgetProps) => (
    <GuildSelector
        page={page}
        forum={false}
    />
);

/** `guildForumSelectorWidget` - the forum page's picker, `GuildForumSelectorCatalogWidget`; see `GuildSelector`. */
export const CatalogGuildForumSelectorWidgetView = ({ page }: CatalogWidgetProps) => (
    <GuildSelector
        page={page}
        forum
    />
);
