import { SecurityLevelEnum, StringDataType } from '@nitrodevco/nitro-api';
import type { IHabboGroupEntryData } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { registerGuildSelectorWidget } from '#base/commands';
import { CATALOG_NO_GUILD_SELECTED, CatalogGuildSelector, CatalogPage, CatalogWidgetEventEnum, useCatalogGuildActions, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useOwnSecurityLevel, useOwnUserId } from '#base/context/user';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Button, Dropmenu, Region, ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** A group colour as the server sends it (`rrggbb`), as a fill colour. */
const groupColor = (color: string) => `#${color.padStart(6, '0')}`;

/**
 * One `guild_selector_widget_item` (133x22): the group's name in `guild_name`, and `guild_colors`
 * - `createGuildColorsBitmap`, 21x14 in black with the primary colour in the left half and the
 * secondary in the right, a 1px border round both.
 */
const GuildSelectorItem = ({ guild }: { guild: IHabboGroupEntryData }) => (
    <Region
        name="guild_item"
        layout={{ width: 133, height: 22, flexShrink: 0 }}
    >
        <ThemeText
            name="guild_name"
            text={guild.groupName}
            textStyle="u_regular"
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, top: 4 }}
        />
        <Region
            name="guild_colors"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 112, width: 21, top: 4, height: 14 }}
        >
            <Region
                backgroundColor={groupColor(guild.primaryColor)}
                layout={{ position: 'absolute', left: 1, width: 10, top: 1, height: 12 }}
            />
            <Region
                backgroundColor={groupColor(guild.secondaryColor)}
                layout={{ position: 'absolute', left: 11, width: 9, top: 1, height: 12 }}
            />
        </Region>
    </Region>
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
    const securityLevel = useOwnSecurityLevel();
    const t = useTranslation();

    /** `filterGroupMemberships`: every group, or for a forum the ones one can be bought for. */
    const filterGroupMemberships = (all: IHabboGroupEntryData[]) => {
        if (!forum) return all;

        // `hasSecurity(4)`: staff may buy a forum for any of their groups.
        const anyGroup = (securityLevel >= SecurityLevelEnum.Employee);

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

    return (
        <Region
            name="guildSelectorWidget"
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 85 }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 26 }}>
                <Dropmenu
                    variant="0"
                    visible={hasGuilds === true}
                    captionContent={selected && <GuildSelectorItem guild={selected} />}
                    options={guilds.map((guild, index) => ({
                        key: guild.groupId,
                        label: guild.groupName,
                        content: <GuildSelectorItem guild={guild} />,
                        selected: (index === selection),
                        onSelect: () => select(index, guilds),
                    }))}
                    itemHeight={22}
                    layout={{ width: 170, height: 26 }}
                />
            </Region>
            {(hasGuilds === false) && (
                <Border
                    variant="2"
                    name="members_only"
                    tintColor="#5ea1ab"
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 85, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={t('catalog.guild_selector.members_only')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 143 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 7, width: 147, top: 7, height: 46 }}
                    />
                    <Button
                        variant="3"
                        name="find_groups_button"
                        layout={{ position: 'absolute', left: -23, width: 210, top: 55, height: 25 }}
                    >
                        {t('catalog.guild_selector.find_groups')}
                    </Button>
                </Border>
            )}
        </Region>
    );
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
