import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Template, TemplateItem } from '@nitrodevco/nitro-theme';
import { useState } from 'react';

import { closePurchaseDialog, giveGift } from '#base/commands';
import { CatalogPurchaseRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { ClientGates, useClientGate, useOwnUserFigure, useOwnUserGender, useUserStore } from '#base/context/user';
import { useFurnitureImageTexture } from '#base/hooks';
import { Box, LayoutImage, TemplateWindow, ThemeImage, useAvatarImageTexture, useTemplateLibrary } from '#base/theme';

import { CATALOG_LIBRARY, catalogTemplateId } from '../page/catalogTemplates';

/** `MAX_SUGGESTIONS`. */
const MAX_SUGGESTIONS = 10;

/** `isValentinesBox`: box type 8 has one ribbon of its own and no colours. */
const VALENTINES_BOX = 8;

/** The valentine box's ribbon index (`updatePreview`). */
const VALENTINES_RIBBON_INDEX = 10;

/** `getFurnitureImage(..., new Vector3d(180), 64, ...)`: the preview faces 180 degrees. */
const PREVIEW_DIRECTION = 4;

/** `updateUnknownSenderAvatarImage`: a moderator hiding their face shows the incognito head. */
const GIFT_INCOGNITO = LayoutImage('habbo-catalog-com/gift_incognito.png');

/** `getColor` (`COLOR_EVEN` / `COLOR_ODD`) and `highlightSuggestion`'s highlight. */
const COLOR_EVEN = 0xFFEEEEEE;
const COLOR_ODD = 0xFFFFFFFF;
const COLOR_HIGHLIGHT = 0xFFCCD1DA;

/** `suggestion_list_item_new`'s height. */
const SUGGESTION_ROW_HEIGHT = 20;

/** `suggestion_container`'s place in the window's content: in the body border, 10px down. */
const SUGGESTION_CONTAINER_X = 18;
const SUGGESTION_CONTAINER_Y = 10 + 39;
const SUGGESTION_CONTAINER_WIDTH = 264;

/** A bitmap's picture centred in it and cut to it (`setImage`). */
const CENTRED = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' } as const;

/** The box and ribbon indices after `updatePreview`'s wrap-around and its valentine rule. */
const normalizeSelection = (boxIndex: number, ribbonIndex: number, boxTypes: readonly number[], ribbonTypes: readonly number[]) => {
    let box = boxIndex;
    let ribbon = ribbonIndex;

    if (ribbon < 0) ribbon = ribbonTypes.length - 1;
    if (ribbon > (ribbonTypes.length - 1)) ribbon = 0;
    if (box < 0) box = boxTypes.length - 1;
    if (box > (boxTypes.length - 1)) box = 0;

    if (boxTypes[box] === VALENTINES_BOX) {
        ribbon = VALENTINES_RIBBON_INDEX;

        if (ribbon > (ribbonTypes.length - 1)) ribbon = 0;
    }

    return { box, ribbon };
};

/** Markup for `name_text` with the typed part in bold (`setTextFormat(bold, start, end)`); `undefined` when nothing is bold. */
const suggestionMarkup = (name: string, typed: string) => {
    if (!typed.length) return undefined;

    const start = name.toLowerCase().indexOf(typed.toLowerCase());

    if (start === -1) return undefined;

    const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const end = Math.min(start + typed.length, name.length);

    return `${escape(name.slice(0, start))}<b>${escape(name.slice(start, end))}</b>${escape(name.slice(end))}`;
};

/**
 * One row of `suggestion_list`: a `suggestion_list_item_new` clone (`updateSuggestions`), its colour
 * alternating by index (`getColor`) or the highlight (`highlightSuggestion`), `name_text` the name.
 * The pointer over it highlights it (`onSuggestionsMouseOver`), a press takes it (`onSuggestionsClick`).
 */
const suggestionItem = (from: Template, name: string, typed: string, index: number, highlighted: boolean, onHover: () => void, onSelect: () => void): TemplateItem => {
    const markup = suggestionMarkup(name, typed);

    return {
        key: name,
        from,
        bindings: {
            '': { color: highlighted ? COLOR_HIGHLIGHT : (((index % 2) === 0) ? COLOR_EVEN : COLOR_ODD), onPointerOver: onHover, onPointerTap: onSelect },
            // `IHTMLTextWindow.htmlText`: the matching part of the name in bold.
            name_text: (markup === undefined) ? { caption: name } : { htmlText: markup },
        },
    };
};

/**
 * One swatch of `color_grid`: a `gift_palette_item` clone per box furni (`initColorGrid`), `color`
 * tinted in the furni's first colour, `selection` shown only on the chosen furni
 * (`updateColorGrid`). A press picks it (`onColorItemClick`).
 */
const paletteItem = (from: Template, stuffType: number, colour: number, selected: boolean, onSelect: () => void): TemplateItem => ({
    key: String(stuffType),
    from,
    bindings: {
        '': { onPointerTap: onSelect },
        color: { color: colour & 0xFFFFFF },
        selection: { visible: selected },
    },
});

export interface CatalogGiftWrappingViewProps {
    purchase: CatalogPurchaseRequest;
}

/**
 * The gift window - `PurchaseConfirmationDialog.showGiftDialog` on `gift_wrapping`, which replaces
 * the confirmation once a gift purchase's button is pressed.
 *
 * The receiver's name starts as the dialog's user name (the caller's, or the present widget's
 * sender, `HabboCatalog.giftReceiver`) with the message field focused, or empty and focused.
 * Typing suggests up to ten friends whose names hold the text (`onNameInputChange`, the typed part
 * in bold), the message field hiding under two or more (`showMessageInput`); up and down move the
 * highlight (down on an empty field lists the first ten friends), enter takes it, tab goes to the
 * message. A press on the name field or a focused message field closes the list. Both fields show
 * their hint while empty (`updateNameHint` / `updateMessageHint`).
 *
 * The own head sits in `avatar_image` with "from <name>" in `message_from`; a moderator may hide it
 * (`show_face_checkbox`, selected at first), which puts the incognito head there and hides the line.
 * `gift_card` is `catalog.gift_wrapping_new.gift_card` from the image library when the hotel names one.
 *
 * The box picker walks the boxes (the configuration's, then the default box the dialog drew) and
 * the ribbons, the colour grid the box furni. The preview is the box furni facing 180 degrees with
 * `box * 1000 + ribbon` as its extra. The default box is free and has no colour or ribbon; the
 * valentine box (8) has its own ribbon and no colour, and boxes 3 to 6 no colour - the pickers they
 * do not have are half blended and disabled (`enableWindow`). As in Flash the ribbon index starts
 * at the first ribbon type's value and the ribbon title names the index, not the type.
 * `give_gift_button` sends the gift and locks until the receiver is not found or the purse is short.
 *
 * Flash matches a friend with `String.search`, which reads the typed text as a regular
 * expression; here it is plain text, so `.` or `(` in the field are themselves.
 *
 * Not from the template: the suggestions are a clone of `suggestion_container` added last to the
 * window, since the template draws its windows in layout order and Flash draws a window with
 * graphics of its own (`suggestion_container`) over the ones drawn into their parent.
 */
export const CatalogGiftWrappingView = ({ purchase }: CatalogGiftWrappingViewProps) => {
    const giftWrappingConfiguration = useCatalogStore(x => x.giftWrappingConfiguration);
    const defaultStuffType = useCatalogStore(x => x.giftDefaultStuffType);
    const giveGiftEnabled = useCatalogStore(x => x.giveGiftEnabled);
    const floorItems = useSystemStore(x => x.floorItems);
    const friends = useUserStore(x => x.friends);
    const userName = useUserStore(x => x.name);
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    // `PurchaseConfirmationDialog.isModerator`: `hasSecurity(5)`, the gift sent without the sender's face.
    const isModerator = useClientGate(ClientGates.GiftHideSender);
    const giftCard = useConfigValue<string>('catalog.gift_wrapping_new.gift_card') ?? '';
    const defaultBoxIndex = useConfigValue<number>('catalog.purchase.gift_wrapping.default_box_index') ?? 0;
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const stuffTypes = giftWrappingConfiguration?.stuffTypes ?? [];
    const ribbonTypes = giftWrappingConfiguration?.ribbonTypes ?? [];
    // `_boxTypes.concat(boxTypes)` with the drawn default box pushed at the end.
    const boxTypes = [ ...(giftWrappingConfiguration?.boxTypes ?? []), defaultStuffType ];

    const [ receiverName, setReceiverName ] = useState(purchase.receiverName ?? '');
    const [ typedName, setTypedName ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ focusedField, setFocusedField ] = useState<'name' | 'message' | undefined>(purchase.receiverName ? 'message' : 'name');
    const [ suggestions, setSuggestions ] = useState<string[]>([]);
    const [ suggestionsVisible, setSuggestionsVisible ] = useState(false);
    const [ highlightIndex, setHighlightIndex ] = useState(-1);
    const [ showFace, setShowFace ] = useState(true);
    const [ selectedStuffType, setSelectedStuffType ] = useState(stuffTypes[0] ?? 0);
    const [ selection, setSelection ] = useState(() => normalizeSelection(((defaultBoxIndex < 0) || (defaultBoxIndex > (boxTypes.length - 1))) ? 0 : defaultBoxIndex, ribbonTypes[0] ?? 0, boxTypes, ribbonTypes));
    // `header_button_close` and `cancel_link_region` both `onCancelGift`.
    const [ frame ] = useState(() => ({ id: 'catalog-gift-wrapping', centered: true, rememberPosition: false, onClose: () => closePurchaseDialog(store) }));

    const boxType = boxTypes[selection.box] ?? 0;
    const isDefaultBox = (boxType === defaultStuffType);
    const isValentines = (boxType === VALENTINES_BOX);
    const ribbonEnabled = !isDefaultBox && !isValentines;
    const colourEnabled = ribbonEnabled && !((boxType >= 3) && (boxType <= 6));
    const previewStuffType = isDefaultBox ? defaultStuffType : selectedStuffType;
    const previewExtra = isDefaultBox ? 0 : ((boxType * 1000) + (ribbonTypes[selection.ribbon] ?? 0));
    const previewFurni = floorItems[previewStuffType];
    const preview = useFurnitureImageTexture(previewFurni?.className, previewFurni?.colorIndex ?? 0, PREVIEW_DIRECTION, RoomGeometryScaleType.ZoomedIn, previewExtra);
    const faceShown = !isModerator || showFace;
    const head = useAvatarImageTexture(faceShown ? figure : undefined, gender, { headOnly: true, direction: 2 });
    const friendNames = Object.values(friends).map(friend => friend.name);

    /** `showSuggestions(false)`: the list goes and the message field comes back. */
    const hideSuggestions = () => setSuggestionsVisible(false);

    /** `updatePreview` after a box, ribbon or colour change: the list closes too. */
    const select = (box: number, ribbon: number) => {
        setSelection(normalizeSelection(box, ribbon, boxTypes, ribbonTypes));
        hideSuggestions();
    };

    /** `updateSuggestions`: an empty list hides; any other shows with its first row highlighted. */
    const showSuggestionList = (names: string[]) => {
        setSuggestions(names);
        setSuggestionsVisible(names.length > 0);
        setHighlightIndex(0);
    };

    /** `setReceiverName` (a suggestion taken): the name goes in, the message field gets the focus. */
    const takeSuggestion = (name: string) => {
        setReceiverName(name);
        setFocusedField('message');
        hideSuggestions();
    };

    const onNameChange = (value: string) => {
        setReceiverName(value);

        if (typedName === value) return;

        const search = value.toLowerCase();
        const matches: string[] = [];

        for (const name of friendNames) {
            if (name.toLowerCase().includes(search)) matches.push(name);
            if (matches.length >= MAX_SUGGESTIONS) break;
        }

        setTypedName(value);
        showSuggestionList(matches);
    };

    /** `highlightSuggestion`: wraps past either end of the list. */
    const highlight = (index: number) => {
        let next = index;

        if (next < 0) next = suggestions.length - 1;
        if (next >= suggestions.length) next = 0;

        setHighlightIndex(next);
    };

    /** `onNameInputKeyUp`. */
    const onNameKey = (key: string) => {
        switch (key) {
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                return;
            case 'ArrowDown':
                if (!receiverName.length && !suggestionsVisible && friendNames.length) {
                    showSuggestionList(friendNames.slice(0, MAX_SUGGESTIONS));

                    return;
                }

                highlight(highlightIndex + 1);
                return;
            case 'Enter':
                if (suggestionsVisible && suggestions[highlightIndex]) takeSuggestion(suggestions[highlightIndex]);
                return;
            case 'Tab':
                setFocusedField('message');
                return;
        }
    };

    /** `giveGift` then `enableGiftButton(false)`. */
    const onGiveGift = () => {
        if (!giveGiftEnabled) return;

        giveGift(send, store, {
            receiverName,
            message,
            boxStuffTypeId: isDefaultBox ? defaultStuffType : selectedStuffType,
            boxTypeId: isDefaultBox ? 0 : boxType,
            ribbonTypeId: isDefaultBox ? 0 : (ribbonTypes[selection.ribbon] ?? 0),
            showPurchaserName: faceShown,
        });
    };

    const onCancel = () => closePurchaseDialog(store);

    const boxTitle = t(isDefaultBox ? 'catalog.gift_wrapping_new.box.default' : `catalog.gift_wrapping_new.box.${boxType}`);
    const priceTitle = isDefaultBox ? t('catalog.gift_wrapping_new.freeprice') : t('catalog.gift_wrapping_new.price', '', { price: String(giftWrappingConfiguration?.price ?? 0) });
    const ribbonTitle = t(`catalog.gift_wrapping_new.ribbon.${selection.ribbon}`);
    // `enableWindow`: a picker the box does not have is half blended and disabled.
    const ribbonBlend = ribbonEnabled ? 1 : 0.5;
    const colourBlend = colourEnabled ? 1 : 0.5;

    const paletteTemplate = templates?.[catalogTemplateId('gift_palette_item')];
    const suggestionTemplate = templates?.[catalogTemplateId('suggestion_list_item_new')];

    if (!paletteTemplate || !suggestionTemplate) return null;

    // `initColorGrid`: a box furni the furni data does not know gets no swatch.
    const swatches = stuffTypes.flatMap((stuffType) => {
        const colour = floorItems[stuffType]?.colors[0];

        if (colour === undefined) return [];

        return [ paletteItem(paletteTemplate, stuffType, colour, stuffType === selectedStuffType, () => {
            if (!colourEnabled) return;

            setSelectedStuffType(stuffType);
            select(selection.box, selection.ribbon);
        }) ];
    });

    const suggestionHeight = suggestions.length * SUGGESTION_ROW_HEIGHT;

    return (
        <TemplateWindow
            id={catalogTemplateId('gift_wrapping')}
            frame={frame}
            bindings={{
                '': {
                    added: suggestionsVisible
                        ? [ {
                                key: 'suggestion_container',
                                from: 'suggestion_container',
                                bindings: {
                                    '': { visible: true },
                                    suggestion_list: { items: suggestions.map((name, index) => suggestionItem(suggestionTemplate, name, typedName, index, index === highlightIndex, () => setHighlightIndex(index), () => takeSuggestion(name))) },
                                },
                                arrange: ({ root, find }) => {
                                    const list = find('suggestion_list');

                                    root()?.setRectangle(SUGGESTION_CONTAINER_X, SUGGESTION_CONTAINER_Y, SUGGESTION_CONTAINER_WIDTH, suggestionHeight);
                                    list?.parent?.setRectangle(1, 0, SUGGESTION_CONTAINER_WIDTH - 1, suggestionHeight);
                                    list?.setRectangle(1, 0, SUGGESTION_CONTAINER_WIDTH - 2, suggestionHeight);
                                },
                            } ]
                        : [],
                },
                // `onNameInputMouseDown`: a press on the field closes the list.
                name_input: { caption: receiverName, onChange: onNameChange, onKeyDown: onNameKey, focused: focusedField === 'name', onFocus: () => setFocusedField('name'), onBlur: () => setFocusedField(field => ((field === 'name') ? undefined : field)), onPointerDown: hideSuggestions },
                name_input_hint: { visible: !receiverName.length, caption: '${catalog.gift_wrapping_new.name_hint}' },
                gift_card: { asset: giftCard.length ? `\${image.library.url}Giftcards/${giftCard}.png` : undefined },
                avatar_image: { children: faceShown
                    ? (head.texture && (
                            <pixiSprite
                                texture={head.texture}
                                width={head.width}
                                height={head.height}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        ))
                    : (
                            <ThemeImage
                                src={GIFT_INCOGNITO}
                                bitmap={{ stretchedX: false, stretchedY: false }}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        ) },
                // `showMessageInput`: two suggestions or more cover the message field.
                message_input: {
                    visible: !(suggestionsVisible && (suggestions.length >= 2)),
                    caption: message,
                    onChange: setMessage,
                    focused: focusedField === 'message',
                    onFocus: () => {
                        setFocusedField('message');
                        hideSuggestions();
                    },
                    onBlur: () => setFocusedField(field => ((field === 'message') ? undefined : field)),
                },
                message_input_hint: { visible: !message.length, caption: '${catalog.gift_wrapping_new.message_hint}' },
                message_from: { visible: faceShown, caption: t('catalog.gift_wrapping_new.message_from', userName, { name: userName }) },
                show_face_checkbox: { visible: isModerator, selected: showFace, onPointerTap: () => setShowFace(!showFace) },
                show_face_checkbox_title: { visible: isModerator },
                product_image: { children: preview.texture && (
                    <Box layout={CENTRED}>
                        <pixiSprite
                            texture={preview.texture}
                            width={preview.width}
                            height={preview.height}
                            layout={{}}
                        />
                    </Box>
                ) },
                pick_box_title: { caption: boxTitle },
                pick_box_price_title: { caption: priceTitle },
                small_coin: { visible: !isDefaultBox },
                box_prev: { onPointerTap: () => select(selection.box - 1, selection.ribbon) },
                box_next: { onPointerTap: () => select(selection.box + 1, selection.ribbon) },
                pick_ribbon_title: { caption: ribbonTitle, alpha: ribbonBlend },
                ribbon_prev: { alpha: ribbonBlend, disabled: !ribbonEnabled, onPointerTap: () => ribbonEnabled && select(selection.box, selection.ribbon - 1) },
                ribbon_next: { alpha: ribbonBlend, disabled: !ribbonEnabled, onPointerTap: () => ribbonEnabled && select(selection.box, selection.ribbon + 1) },
                box_color_title: { alpha: colourBlend },
                color_picker_container: { alpha: colourBlend, disabled: !colourEnabled },
                color_grid: { items: swatches },
                give_gift_button: { disabled: !giveGiftEnabled, onPointerTap: onGiveGift },
                cancel_link_region: { onPointerTap: onCancel },
            }}
        />
    );
};
