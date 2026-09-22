import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { closePurchaseDialog, giveGift } from '#base/commands';
import { CatalogPurchaseRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useInterpolate, useSystemStore, useTranslation } from '#base/context/system';
import { useOwnIsModerator, useOwnUserFigure, useOwnUserGender, useUserStore } from '#base/context/user';
import { Border, ButtonThick, CheckBox, ContainerButton, Frame, Icon, LayoutImage, Region, TextInput, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

import { useFurnitureImageTexture } from '../useFurnitureImageTexture';
import { CatalogGiftPaletteItemView } from './CatalogGiftPaletteItemView';
import { CatalogGiftSuggestionListItemView } from './CatalogGiftSuggestionListItemView';

/** `MAX_SUGGESTIONS`. */
const MAX_SUGGESTIONS = 10;

/** `isValentinesBox`: box type 8 has one ribbon of its own and no colours. */
const VALENTINES_BOX = 8;

/** The valentine box's ribbon index (`updatePreview`). */
const VALENTINES_RIBBON_INDEX = 10;

/** `getFurnitureImage(..., new Vector3d(180), 64, ...)`: the preview faces 180 degrees. */
const PREVIEW_DIRECTION = 4;

/** `updateUnknownSenderAvatarImage`: a moderator hiding their face shows the incognito head. */
const GIFT_INCOGNITO = LayoutImage('catalog/gift_incognito.png');

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

/** Markup for `name_text` with the typed part in bold (`setTextFormat(bold, start, end)`). */
const suggestionMarkup = (name: string, typed: string) => {
    const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (!typed.length) return escape(name);

    const start = name.toLowerCase().indexOf(typed.toLowerCase());

    if (start === -1) return escape(name);

    const end = Math.min(start + typed.length, name.length);

    return `${escape(name.slice(0, start))}<b>${escape(name.slice(start, end))}</b>${escape(name.slice(end))}`;
};

export interface CatalogGiftWrappingViewProps {
    purchase: CatalogPurchaseRequest;
}

/**
 * The gift window - `PurchaseConfirmationDialog.showGiftDialog` on `gift_wrapping.xml`, which
 * replaces the confirmation once a gift purchase's button is pressed.
 *
 * The receiver's name starts as the dialog's user name (the caller's, or the present widget's
 * sender, `HabboCatalog.giftReceiver`) with the message field focused, or empty and focused.
 * Typing suggests up to ten friends whose names hold the text (`onNameInputChange`: the typed part
 * in bold, rows alternating `COLOR_EVEN` / `COLOR_ODD`, the highlighted one `COLOR_HIGHLIGHT`), the
 * message field hiding under two or more; up and down move the highlight (down on an empty field
 * lists the first ten friends), enter takes it, tab goes to the message. A press on the name
 * field or a focused message field closes the list. Both fields show their hint while empty.
 *
 * The own head sits on the gift card with "from <name>" under the message; a moderator may hide
 * it (`show_face_checkbox`, selected at first), which puts the incognito head there and hides the
 * line. The card is `catalog.gift_wrapping_new.gift_card` from the image library when the hotel
 * names one.
 *
 * The box picker walks the boxes (the configuration's, then the default box the dialog drew) and
 * the ribbons, the colour grid the box furni (each swatch the furni's first colour). The preview
 * is the box furni facing 180 degrees with `box * 1000 + ribbon` as its extra. The default box is
 * free and has no colour or ribbon; the valentine box (8) has its own ribbon and no colour, and
 * boxes 3 to 6 no colour - the pickers they do not have are half blended and disabled
 * (`enableWindow`). As in Flash the ribbon index starts at the first ribbon type's value and the
 * ribbon title names the index, not the type. `give_gift_button` sends the gift and locks until
 * the receiver is not found or the purse is short.
 *
 * Flash matches a friend with `String.search`, which reads the typed text as a regular
 * expression; here it is plain text, so `.` or `(` in the field are themselves. The two hints are
 * drawn under their fields rather than over them, so a press on an empty field reaches it; the
 * fields fill nothing, so the pixels are the same.
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
    const isModerator = useOwnIsModerator();
    const giftCard = useConfigValue<string>('catalog.gift_wrapping_new.gift_card') ?? '';
    const defaultBoxIndex = useConfigValue<number>('catalog.purchase.gift_wrapping.default_box_index') ?? 0;
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();

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
    const onNameKey = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                return false;
            case 'ArrowDown':
                if (!receiverName.length && !suggestionsVisible && friendNames.length) {
                    showSuggestionList(friendNames.slice(0, MAX_SUGGESTIONS));

                    return false;
                }

                highlight(highlightIndex + 1);
                return false;
            case 'Enter':
                if (suggestionsVisible && suggestions[highlightIndex]) takeSuggestion(suggestions[highlightIndex]);
                return false;
            case 'Tab':
                setFocusedField('message');
                return true;
        }

        return false;
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

    return (
        <Frame
            id="catalog-gift-wrapping"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('catalog.gift_wrapping.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            onClose={onCancel}
            layout={{ position: 'absolute', width: 342, height: 482 }}
        >
            <Border
                variant="3"
                tintColor="#e9e9e9"
                layout={{ position: 'absolute', left: 0, width: 330, top: 10, height: 440 }}
            >
                <Border
                    variant="0"
                    name="name_border"
                    layout={{ position: 'absolute', left: 10, width: 284, top: 12, height: 27 }}
                >
                    {!receiverName.length && (
                        <ThemeText
                            name="name_input_hint"
                            text={t('catalog.gift_wrapping_new.name_hint')}
                            textStyle="u_italic"
                            textOptions={{ fill: '#777777', fontSize: 13 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 8, width: 266, top: 3, height: 21 }}
                        />
                    )}
                    <Region
                        onPointerDown={hideSuggestions}
                        layout={{ position: 'absolute', left: 8, width: 266, top: 3, height: 21 }}
                    >
                        <TextInput
                            value={receiverName}
                            onChange={onNameChange}
                            onKeyDown={onNameKey}
                            focused={focusedField === 'name'}
                            onFocusChange={focused => setFocusedField(focused ? 'name' : ((focusedField === 'name') ? undefined : focusedField))}
                            maxLength={32}
                            textStyle="u_italic"
                            fontSize={13}
                            flashPlacement
                            alwaysShowSelection
                            backgroundColor={null}
                            focusedBackgroundColor={null}
                            layout={{ position: 'absolute', left: 0, width: 266, top: 0, height: 21 }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="write_deco"
                    src={LayoutImage('shared/common_small_pen.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 301, width: 17, top: 15, height: 18 }}
                />
                <ThemeImage
                    name="gift_card"
                    src={giftCard.length ? interpolate(`\${image.library.url}Giftcards/${giftCard}.png`) : LayoutImage('shared/catalogue_giftcard_blank.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 10, width: 306, top: 56, height: 149 }}
                />
                <Region
                    name="avatar_image_container"
                    layout={{ position: 'absolute', left: 15, width: 60, top: 51, height: 149 }}
                >
                    {faceShown && head.texture && (
                        <pixiSprite
                            texture={head.texture}
                            width={head.width}
                            height={head.height}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    )}
                    {!faceShown && (
                        <ThemeImage
                            name="avatar_image"
                            src={GIFT_INCOGNITO}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    )}
                </Region>
                {!message.length && (
                    <ThemeText
                        name="message_input_hint"
                        text={t('catalog.gift_wrapping_new.message_hint')}
                        textStyle="u_italic"
                        textOptions={{ fill: '#777777', fontSize: 13 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100 }}
                    />
                )}
                {/* `showMessageInput`: two suggestions or more cover the message field. */}
                {!(suggestionsVisible && (suggestions.length >= 2)) && (
                    <TextInput
                        value={message}
                        onChange={setMessage}
                        focused={focusedField === 'message'}
                        onFocusChange={(focused) => {
                            setFocusedField(focused ? 'message' : ((focusedField === 'message') ? undefined : focusedField));

                            if (focused) hideSuggestions();
                        }}
                        maxLength={140}
                        multiline
                        textStyle="u_regular"
                        flashFormat={{ leading: 4 }}
                        flashPlacement
                        backgroundColor={null}
                        focusedBackgroundColor={null}
                        layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100 }}
                    />
                )}
                {faceShown && (
                    <ThemeText
                        name="message_from"
                        text={t('catalog.gift_wrapping_new.message_from', userName, { name: userName })}
                        textStyle="u_italic"
                        textOptions={{ align: 'right' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', right: 45, top: 169 }}
                    />
                )}
                {isModerator && (
                    <>
                        <CheckBox
                            variant="0"
                            name="show_face_checkbox"
                            selected={showFace}
                            onPointerTap={() => setShowFace(!showFace)}
                            layout={{ position: 'absolute', left: 46, width: 16, top: 220, height: 15 }}
                        />
                        <ThemeText
                            name="show_face_checkbox_title"
                            text={t('catalog.gift_wrapping.show_face.title')}
                            textStyle="u_regular"
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 66, width: 260, top: 218, height: 20 }}
                        />
                    </>
                )}
                <Region
                    name="box_picker_container"
                    layout={{ position: 'absolute', left: 10, width: 306, top: 253, height: 83 }}
                >
                    <Border
                        variant="0"
                        name="image_border"
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 82 }}
                    >
                        {/* `product_image`: `setImage` centres the preview in the 80x80 bitmap. */}
                        <Region
                            name="product_image"
                            layout={{ position: 'absolute', left: 1, width: 80, top: 1, height: 80, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {preview.texture && (
                                <pixiSprite
                                    texture={preview.texture}
                                    width={preview.width}
                                    height={preview.height}
                                    layout={{}}
                                />
                            )}
                        </Region>
                    </Border>
                    <ThemeText
                        name="pick_box_title"
                        text={boxTitle}
                        textStyle="u_bold"
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 154, width: 152, top: 5, height: 20 }}
                    />
                    <Region
                        name="price_box_container"
                        layout={{ position: 'absolute', left: 154, top: 20, height: 20, flexDirection: 'row' }}
                    >
                        <ThemeText
                            name="pick_box_price_title"
                            text={priceTitle}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ flexShrink: 0 }}
                        />
                        {!isDefaultBox && (
                            <ThemeImage
                                name="small_coin"
                                src={LayoutImage('catalog/common_small_coin.png')}
                                bitmap={{}}
                                layout={{ width: 16, height: 16, marginTop: 1, flexShrink: 0 }}
                            />
                        )}
                    </Region>
                    <ContainerButton
                        variant="0"
                        name="box_prev"
                        onPointerTap={() => select(selection.box - 1, selection.ribbon)}
                        layout={{ position: 'absolute', left: 92, width: 25, top: 9, height: 25 }}
                    >
                        <Icon
                            variant="2"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="box_next"
                        onPointerTap={() => select(selection.box + 1, selection.ribbon)}
                        layout={{ position: 'absolute', left: 121, width: 25, top: 9, height: 25 }}
                    >
                        <Icon
                            variant="3"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 8, width: 17, top: 8, height: 16 }}
                        />
                    </ContainerButton>
                    <Region
                        alpha={ribbonEnabled ? 1 : 0.5}
                        disabled={!ribbonEnabled}
                        layout={{ position: 'absolute', left: 0, width: 306, top: 0, height: 83 }}
                    >
                        <ThemeText
                            name="pick_ribbon_title"
                            text={ribbonTitle}
                            textStyle="u_bold"
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 154, width: 152, top: 50, height: 22 }}
                        />
                        <ContainerButton
                            variant="0"
                            name="ribbon_prev"
                            disabled={!ribbonEnabled}
                            onPointerTap={() => ribbonEnabled && select(selection.box, selection.ribbon - 1)}
                            layout={{ position: 'absolute', left: 92, width: 25, top: 47, height: 25 }}
                        >
                            <Icon
                                variant="2"
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="0"
                            name="ribbon_next"
                            disabled={!ribbonEnabled}
                            onPointerTap={() => ribbonEnabled && select(selection.box, selection.ribbon + 1)}
                            layout={{ position: 'absolute', left: 121, width: 25, top: 47, height: 25, overflow: 'hidden' }}
                        >
                            <Icon
                                variant="3"
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 9, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                    </Region>
                </Region>
                <ThemeText
                    name="box_color_title"
                    text={t('catalog.gift_wrapping.pick_color')}
                    textStyle="u_bold"
                    clip
                    verticalAlign="top"
                    alpha={colourEnabled ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 11, width: 306, top: 341, height: 22 }}
                />
                <Region
                    name="color_picker_container"
                    alpha={colourEnabled ? 1 : 0.5}
                    disabled={!colourEnabled}
                    layout={{ position: 'absolute', left: 20, width: 308, top: 360, height: 30 }}
                >
                    <Region
                        name="color_grid"
                        layout={{ position: 'absolute', left: 1, width: 306, top: 2, height: 26, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                    >
                        {stuffTypes.map((stuffType) => {
                            const colour = floorItems[stuffType]?.colors[0];

                            // `initColorGrid`: a box furni the furni data does not know gets no swatch.
                            if (colour === undefined) return null;

                            return (
                                <CatalogGiftPaletteItemView
                                    key={stuffType}
                                    colour={colour}
                                    selected={stuffType === selectedStuffType}
                                    onSelect={() => {
                                        if (!colourEnabled) return;

                                        setSelectedStuffType(stuffType);
                                        select(selection.box, selection.ribbon);
                                    }}
                                />
                            );
                        })}
                    </Region>
                </Region>
                <ButtonThick
                    variant="3"
                    name="give_gift_button"
                    disabled={!giveGiftEnabled}
                    onPointerTap={onGiveGift}
                    layout={{ position: 'absolute', left: 171, width: 150, top: 404, height: 25 }}
                >
                    {t('catalog.gift_wrapping.give_gift')}
                </ButtonThick>
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 9, width: 100, top: 407, height: 20 }}
                >
                    <ThemeText
                        name="cancel_link"
                        text={t('catalog.gift_wrapping.cancel')}
                        textStyle="u_regular"
                        flashFormat={{ underline: true }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 20 }}
                    />
                </Region>
                {suggestionsVisible && (
                    <Region
                        name="suggestion_container"
                        backgroundColor="#999999"
                        layout={{ position: 'absolute', left: 18, width: 264, top: 39, height: suggestions.length * 20 }}
                    >
                        <Region
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 1, width: 263, top: 0, height: suggestions.length * 20 }}
                        >
                            <Region
                                name="suggestion_list"
                                layout={{ position: 'absolute', left: 1, width: 262, top: 0, flexDirection: 'column' }}
                            >
                                {suggestions.map((name, index) => (
                                    <CatalogGiftSuggestionListItemView
                                        key={name}
                                        markup={suggestionMarkup(name, typedName)}
                                        index={index}
                                        highlighted={index === highlightIndex}
                                        onHover={() => setHighlightIndex(index)}
                                        onSelect={() => takeSuggestion(name)}
                                    />
                                ))}
                            </Region>
                        </Region>
                    </Region>
                )}
            </Border>
        </Frame>
    );
};
