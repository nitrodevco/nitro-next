import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, LayoutImage, TemplateBindings, TemplateWindow, ThemeImage, useAvatarImageTexture, useTemplateFrame, useTemplateLibrary } from '#base/theme';

/**
 * Which face of the dialog is showing. Flash cycled one window through the same five, and only
 * the save screen and the way back from it are reached by clicking - the rest is decided on open.
 */
export type MannequinScreen = 'main' | 'save' | 'peer' | 'no-club' | 'wrong-gender';

export interface FurnitureMannequinViewProps {
    name: string;
    /** Already resolved for the screen: the dummy wearing the outfit, or you wearing it. */
    figure: string;
    gender: AvatarGenderType;
    /** What the outfit costs, which is what puts the club badge over the preview. */
    clubLevel: number;
    screen: MannequinScreen;
    onScreenChange: (screen: MannequinScreen) => void;
    onSaveName: (name: string) => void;
    onSaveOutfit: () => void;
    onWear: () => void;
    onClose: () => void;
}

const LIBRARY = 'habbo-room-ui-com';

/** `MannequinWidget.createWindow`: each content's layout. */
const CONTENT_TEMPLATES: Record<MannequinScreen, string> = {
    main: `${LIBRARY}/mannequin_controller_main_xml`,
    save: `${LIBRARY}/mannequin_controller_save_xml`,
    peer: `${LIBRARY}/mannequin_peer_main_xml`,
    'no-club': `${LIBRARY}/mannequin_no_club_xml`,
    'wrong-gender': `${LIBRARY}/mannequin_wrong_gender_xml`,
};

/** `NAME_STATE_HINT` / `_WRITING` / `_SAVED`. */
type NameState = 'hint' | 'writing' | 'saved';

/** `setOutfitNameState`: the field's colour in each state. */
const NAME_COLORS: Record<NameState, number> = { hint: 0x777777, writing: 0x88aa88, saved: 0x000000 };

/** `updateClubLevelView`: `ICON_STYLE_CLUB` / `ICON_STYLE_VIP`. */
const CLUB_ICON_STYLE = '13';
const VIP_ICON_STYLE = '14';

/**
 * A mannequin - `MannequinWidget`, which builds `mannequin_widget_frame_xml`, centres it, and
 * replaces the frame's content with one of five layouts (`setWindowContent` / `createWindow`):
 * `mannequin_controller_main_xml` (the dummy's controls, for whoever may decorate the room),
 * `_controller_save_xml`, `mannequin_peer_main_xml` (the offer to wear the outfit), `_no_club_xml`
 * and `_wrong_gender_xml`. Each draws the outfit in `preview_image` and the club level it costs on
 * `club_icon` (style 13, 14 for VIP, hidden for none - `updateClubLevelView`).
 *
 * `updatePreviewImage` copies `mannequin_preview_bg_png` into the bitmap and the large avatar image
 * (default direction) centred over it, clipped by the bitmap rather than scaled; the main screen's
 * `write_deco` gets `small_pen` (`updateDecorations`).
 *
 * `outfit_name_set` follows `setOutfitNameState`: the hint `mannequin.widget.set_name_hint` in grey
 * italics until a name is saved, cleared by a click on it; green while typed; black once saved.
 * Enter saves the name (`saveOutfitName`), and so does `configure_button` before it opens the save
 * screen; as before the port also saves a changed name when the field loses the focus.
 * `outfit_name_show` quotes the saved name. `save_button` stores what you wear, `back_region`
 * returns to the controls, `wear_button` checks club then gender (in the widget), and `ok_button`
 * and the header close close. `get_club_button` only closes: Flash opens the club centre
 * (`catalog.openClubCenter`). The save screen's description names `${mannequin.widget.savetext `
 * with a stray space and no closing brace in the layout; the port asks for
 * `mannequin.widget.savetext`.
 */
export const FurnitureMannequinView = ({
    name, figure, gender, clubLevel, screen, onScreenChange, onSaveName, onSaveOutfit, onWear, onClose,
}: FurnitureMannequinViewProps) => {
    const t = useTranslation();
    const templates = useTemplateLibrary(LIBRARY);
    const { texture } = useAvatarImageTexture(figure, gender, { direction: 2 });
    const frame = useTemplateFrame({ id: 'mannequin', centered: true, rememberPosition: false, onClose });
    const [ draft, setDraft ] = useState<string>(name);
    const [ nameState, setNameState ] = useState<NameState>(name.length ? 'saved' : 'hint');
    const [ lastName, setLastName ] = useState<string>(name);

    if (name !== lastName) {
        setLastName(name);
        setDraft(name);
        setNameState(name.length ? 'saved' : 'hint');
    }

    const content = templates?.[CONTENT_TEMPLATES[screen]];

    /** `saveOutfitName`: what the field holds is the name, and it shows as saved. */
    const saveName = () => {
        onSaveName(draft);
        setNameState('saved');
    };

    const preview = (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            <ThemeImage
                src={LayoutImage(`${LIBRARY}/mannequin_preview_bg.png`)}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
            {texture && (
                <ThemeImage
                    texture={texture}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                />
            )}
        </Box>
    );

    const quotedName = name.length ? `'${name}'` : undefined;

    const bindings: TemplateBindings = {
        preview_image: { children: preview },
        club_icon: { visible: clubLevel > 0, style: (clubLevel > 1) ? VIP_ICON_STYLE : CLUB_ICON_STYLE },
    };

    switch (screen) {
        case 'main':
            Object.assign(bindings, {
                outfit_name_set: {
                    caption: (nameState === 'hint') ? t('mannequin.widget.set_name_hint') : draft,
                    color: NAME_COLORS[nameState],
                    italic: nameState === 'hint',
                    // `onMouseClick`'s `outfit_name_set`: the hint is cleared, a saved name is edited.
                    onPointerTap: () => {
                        if (nameState === 'hint') setDraft('');
                        if (nameState !== 'writing') setNameState('writing');
                    },
                    onChange: (text: string) => {
                        setDraft(text);
                        setNameState('writing');
                    },
                    onEnter: saveName,
                    onBlur: () => {
                        if ((nameState === 'writing') && (draft !== name)) saveName();
                    },
                },
                write_deco: { asset: LayoutImage(`${LIBRARY}/small_pen.png`) },
                configure_button: {
                    onPointerTap: () => {
                        saveName();
                        onScreenChange('save');
                    },
                },
                wear_button: { onPointerTap: onWear },
            } satisfies TemplateBindings);
            break;
        case 'save':
            Object.assign(bindings, {
                save_button: { onPointerTap: onSaveOutfit },
                outfit_name_show: { caption: quotedName },
                description: { caption: '${mannequin.widget.savetext}' },
                back_region: { onPointerTap: () => onScreenChange('main') },
            } satisfies TemplateBindings);
            break;
        case 'peer':
            Object.assign(bindings, {
                wear_button: { onPointerTap: onWear },
                outfit_name_show: { caption: quotedName },
            } satisfies TemplateBindings);
            break;
        case 'no-club':
            Object.assign(bindings, { get_club_button: { onPointerTap: onClose } } satisfies TemplateBindings);
            break;
        case 'wrong-gender':
            Object.assign(bindings, { ok_button: { onPointerTap: onClose } } satisfies TemplateBindings);
            break;
    }

    if (!content) return null;

    return (
        <TemplateWindow
            id={`${LIBRARY}/mannequin_widget_frame_xml`}
            frame={frame}
            bindings={{ '': { added: [ { key: screen, from: content, bindings } ] } }}
        />
    );
};
