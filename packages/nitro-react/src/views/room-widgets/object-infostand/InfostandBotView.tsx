import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { FloatingPopup, getGlobalRect, TemplateBindings, TemplateWindow, TemplateWindows, useAvatarImageTexture } from '#base/theme';
import { isHandItem } from '#base/utils';

import { arrangeInfostandButtons } from './infostandButtons';

export interface InfostandBotViewProps {
    objectData: ISimpleRoomObjectData;
    /** A rentable bot gets `rentable_bot_view`, any other bot `bot_view`. */
    rentable: boolean;
    name: string;
    /** A rentable bot's blurb; an ordinary bot has none. */
    motto: string;
    figure: string;
    gender: AvatarGenderType;
    /** Who put it here - only a rentable bot names an owner. */
    ownerName: string;
    /** What it is holding, if anything. */
    carryItem: number;
    /** `InfoStandRentableBotView.update`: move and rotate for anyone with rights, pick up for its owner. */
    canMove?: boolean;
    canPickUp?: boolean;
    onMove?: () => void;
    onRotate?: () => void;
    onPickUp?: () => void;
    onClose: () => void;
}

/** `InfoStandWidgetHandler.handleGetBotInfoMessage` / `handleGetRentableBotInfoMessage`: every bot's one badge. */
const BOT_BADGE = 'BOT';

/** `InfoStandBotView.setMotto`: the field `textHeight + 5` high within these, its container 3 taller. */
const MIN_MOTTO_HEIGHT = 23;
const MAX_MOTTO_HEIGHT = 50;
const MOTTO_TEXT_OFFSET = 3;

/** `setCarryItem`: the hand item text `textHeight + 5` high. */
const TEXT_PADDING = 5;

/** `updateWindow`: the border is the element list's height plus 20. */
const BORDER_PADDING = 20;

/** `button_list`'s `CMD_BUTTON_REGION`s in the layout's order, each holding its `CMD_BUTTON` of the same name. */
const BUTTON_REGIONS = [ 'whisper', 'ignore', 'unignore', 'move', 'rotate', 'pick' ] as const;

/** `badge_details`' window: where `showBadgeInfo` puts it, left of the badge and centred on it. */
const BADGE_DETAILS_WIDTH = 263;
const BADGE_DETAILS_HEIGHT = 25;

/**
 * The bot panel. An ordinary bot is `InfoStandBotView` on `habbo-room-ui-com/bot_view` - its name,
 * its look with the bot badge, its motto and what it is holding. A rentable bot is
 * `InfoStandRentableBotView` on `habbo-room-ui-com/rentable_bot_view` - the look on the bot info
 * backdrop, what it holds, its description and owner, and the move / rotate / pick up buttons under
 * the panel. Both are drawn from their templates; the code's sizing is the `arrange`.
 *
 * `avatar_image` is an `AvatarImageWidget` the templates do not draw: the cropped figure facing
 * southwest is put in it, and `refresh` sizes the widget to the bitmap - its `hCenter | vCenter`
 * params then centre it in `grey_bg` (or the backdrop region), as the layout's 34 x 84 rect is.
 *
 * `bot_view`'s `badge_0` is the bot badge (`update` -> `updateBadges([ "BOT" ])`); hovering it is
 * `showBadgeInfo`, which builds `badge_details` and places it left of the badge. The code looks its
 * `name` and `description` up with `getChildByName`, which finds only direct children - and both are
 * inside `details_list` - so neither is filled and the window stays its layout's empty 25 high
 * border, as it is drawn here. `rentable_bot_view`'s `badge` has no hover. `motto_text` is an `input`
 * the code never reads; it is drawn read-only. `home_icon` is a bitmap nothing fills.
 */
export const InfostandBotView = ({ rentable, name, motto, figure, gender, ownerName, carryItem, canMove = false, canPickUp = false, onMove, onRotate, onPickUp, onClose }: InfostandBotViewProps) => {
    const t = useTranslation();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const avatar = useAvatarImageTexture(figure, gender, { cropped: true, direction: 4 });
    const [ badgeDetails, setBadgeDetails ] = useState<{ x: number; y: number } | null>(null);

    // `setCarryItem`: the text and its spacer shown only for a real hand item.
    const carriesItem = isHandItem(carryItem);
    const handItemText = carriesItem ? t('infostand.text.handitem', '', { item: t(`handitem${carryItem}`, `handitem${carryItem}`) }) : '';
    const botBadge = badgeUrl.replace('%badgename%', BOT_BADGE);

    const avatarImage = avatar.texture && (
        <pixiSprite
            texture={avatar.texture}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: avatar.width, height: avatar.height }}
        />
    );

    /** `AvatarImageWidget.refresh`: the widget as big as its bitmap, which re-centres it. */
    const fitAvatar = ({ find }: TemplateWindows) => {
        const widget = find('avatar_image');

        if (!widget || !avatar.texture) return;

        widget.setWidth(avatar.width);
        widget.setHeight(avatar.height);
    };

    /** `updateWindow`'s common part: the list as tall as its items, the border 20 taller. */
    const fitBorder = ({ find }: TemplateWindows) => {
        const border = find('info_border');
        const list = find('info_border/infostand_element_list');

        if (!border || !list) return undefined;

        list.setHeight(list.scrollableRegion.height);
        border.setHeight(list.height + BORDER_PADDING);

        return border;
    };

    /** `setCarryItem`: the hand item text as tall as its text. */
    const fitHandItem = ({ find }: TemplateWindows, key: string) => {
        const text = find(key);

        if (text) text.setHeight(text.textHeight + TEXT_PADDING);
    };

    if (!rentable) {
        const bindings: TemplateBindings = {
            '#close': { onPointerTap: onClose },
            name_text: { caption: name, visible: true },
            avatar_image: { children: avatarImage },
            badge_0: {
                asset: botBadge,
                onPointerOver: (event: FederatedPointerEvent) => {
                    const rect = getGlobalRect(event.currentTarget);

                    setBadgeDetails({ x: rect.x - BADGE_DETAILS_WIDTH, y: Math.trunc(rect.y + ((rect.height - BADGE_DETAILS_HEIGHT) / 2)) });
                },
                onPointerOut: () => setBadgeDetails(null),
            },
            motto_text: { caption: motto, disabled: true },
            handitem_spacer: { visible: carriesItem },
            handitem_txt: { visible: carriesItem, caption: handItemText },
        };

        const arrange = (windows: TemplateWindows) => {
            const { find, root } = windows;

            fitAvatar(windows);

            // `setMotto`.
            const mottoText = find('motto_container/motto_text');

            if (mottoText) {
                mottoText.setHeight(Math.max(Math.min(mottoText.textHeight + TEXT_PADDING, MAX_MOTTO_HEIGHT), MIN_MOTTO_HEIGHT));
                find('motto_container')?.setHeight(mottoText.height + MOTTO_TEXT_OFFSET);
            }

            fitHandItem(windows, 'handitem_txt');

            // `updateWindow`: the window as wide as the border, as tall as its items.
            const border = fitBorder(windows);
            const window = root();

            if (!border || !window) return;

            window.setWidth(border.width);
            window.setHeight(window.scrollableRegion.height);
        };

        return (
            <>
                <TemplateWindow
                    id="habbo-room-ui-com/bot_view"
                    bindings={bindings}
                    arrange={arrange}
                />
                {badgeDetails && (
                    <FloatingPopup
                        x={badgeDetails.x}
                        y={badgeDetails.y}
                        onOutsideClick={() => setBadgeDetails(null)}
                    >
                        <TemplateWindow id="habbo-room-ui-com/badge_details" />
                    </FloatingPopup>
                )}
            </>
        );
    }

    // `update`: whisper and ignore never show for a bot; move and rotate by rights, pick up by ownership.
    const shown: Record<typeof BUTTON_REGIONS[number], boolean> = { whisper: false, ignore: false, unignore: false, move: canMove, rotate: canMove, pick: canPickUp };
    const presses: Partial<Record<typeof BUTTON_REGIONS[number], (() => void) | undefined>> = { move: onMove, rotate: onRotate, pick: onPickUp };

    const bindings: TemplateBindings = {
        '#close': { onPointerTap: onClose },
        name_text: { caption: name, visible: true },
        description_text: { caption: motto, visible: true },
        owner_text: ownerName.length ? { caption: t('infostand.text.botowner', '', { name: ownerName }), visible: true } : { caption: '', visible: false },
        handitem_spacer: { visible: carriesItem },
        handitem_text: { visible: carriesItem, caption: handItemText },
        avatar_image: { children: avatarImage },
        badge: { asset: botBadge },
    };

    for (const key of BUTTON_REGIONS) {
        bindings[`button_list/${key}`] = { visible: shown[key] };

        // `onButtonClicked`, by the clicked button's name.
        const press = presses[key];

        if (press) bindings[`button_list/${key}/${key}`] = { onPointerTap: () => press() };
    }

    const arrange = (windows: TemplateWindows) => {
        const { find, root } = windows;

        fitAvatar(windows);
        fitHandItem(windows, 'handitem_text');

        const buttons = find('button_list');

        if (buttons) {
            // `createWindow` and `arrangeButtons`: the shown regions, last first.
            arrangeInfostandButtons(buttons, find, [ ...BUTTON_REGIONS ].reverse(), key => `button_list/${key}/${key}`);
        }

        // `updateWindow`: the window as wide as the wider of the border and the buttons, the narrower
        // one pushed to its right edge. `arrangeButtons` keeps the list `BUTTONS_MAX_WIDTH` wide, so
        // its `visible = width > 0` always holds.
        const border = fitBorder(windows);
        const window = root();

        if (!border || !window || !buttons) return;

        window.setWidth(Math.max(border.width, buttons.width));
        window.setHeight(window.scrollableRegion.height);

        if (border.width < buttons.width) {
            border.setX(window.width - border.width);
            buttons.setX(0);
        } else {
            buttons.setX(window.width - buttons.width);
            border.setX(0);
        }
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/rentable_bot_view"
            bindings={bindings}
            arrange={arrange}
        />
    );
};
