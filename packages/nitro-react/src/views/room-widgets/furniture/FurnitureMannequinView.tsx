import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Button, ButtonThick, Frame, Icon, LayoutImage, Region, TextInput, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

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

/** `sharpness="80"` and `thickness="-15"`, which every text of the mannequin contents sets. */
const TEXT_FORMAT = { sharpness: 80, thickness: -15 };

/** `MannequinWidget.setOutfitNameState`: the field is 0x88AA88 while an unsaved name is typed, black once saved. */
const TYPING_NAME_COLOR = '#88aa88';
const SAVED_NAME_COLOR = '#000000';
/** ...and the hint it shows while empty is 0x777777. */
const NAME_HINT_COLOR = '#777777';

/**
 * A mannequin, on the `mannequin_widget` frame (388x220, margins 3, 36, 3, 3) that
 * `MannequinWidget` centres around whichever of the five 386x180 contents it asked for
 * (`mannequin_controller_main`, `_controller_save`, `mannequin_peer_main`, `_no_club`,
 * `_wrong_gender`): the outfit in the 83x130 `preview_image` on the left of all of them, the club
 * badge over its corner, and on the right either the dummy controls or the offer to put its
 * clothes on. Every text is Ubuntu 13 (12 on the club notice) at sharpness 80 / thickness -15,
 * cut at its box, and every button fits its caption within its `width_min` / `width_max`.
 *
 * `updatePreviewImage` copies the preview backdrop into the bitmap and the large avatar image
 * (default direction) centred over it, clipped by the bitmap rather than scaled. The name field
 * shows its hint as a placeholder in the hint's colour, where Flash wrote the hint into the field
 * in italics. The save screen's description names `${mannequin.widget.savetext` with a stray
 * space and no closing brace in the layout; the port asks for `mannequin.widget.savetext`.
 */
export const FurnitureMannequinView = ({
    name, figure, gender, clubLevel, screen, onScreenChange, onSaveName, onSaveOutfit, onWear, onClose,
}: FurnitureMannequinViewProps) => {
    const [ draft, setDraft ] = useState<string>(name);
    const [ lastName, setLastName ] = useState<string>(name);
    const { texture } = useAvatarImageTexture(figure, gender, { direction: 2 });
    const t = useTranslation();

    if (name !== lastName) {
        setLastName(name);
        setDraft(name);
    }

    const description = (key: string, top: number, width: number, height: number, fontSize?: number) => (
        <ThemeText
            text={t(key)}
            textStyle="u_regular"
            textOptions={{ ...(fontSize && { fontSize }), wordWrap: true, wordWrapWidth: width - 4 }}
            flashFormat={TEXT_FORMAT}
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 126, top, width, height }}
        />
    );

    const quotedName = `'${name}'`;

    return (
        <Frame
            variant="3"
            caption={t('mannequin.widget.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            layout={{ width: 388, height: 220 }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 386, height: 180 }}>
                <Region layout={{ position: 'absolute', left: 20, top: 10, width: 83, height: 130, overflow: 'hidden' }}>
                    <ThemeImage
                        src={LayoutImage('room-ui/mannequin_preview_bg.png')}
                        bitmap={{ stretchedX: false, stretchedY: false }}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 83, height: 130 }}
                    />
                    {texture && (
                        <ThemeImage
                            texture={texture}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 83, height: 130 }}
                        />
                    )}
                </Region>
                {(clubLevel > 0) && (
                    <Icon
                        variant={(clubLevel > 1) ? '14' : '13'}
                        layout={{ position: 'absolute', left: 80, top: 110, width: 43, height: 29 }}
                    />
                )}
                {(screen === 'main') && (
                    <>
                        <TextInput
                            value={draft}
                            onChange={setDraft}
                            onEnter={() => onSaveName(draft)}
                            onFocusChange={focused => !focused && (draft !== name) && onSaveName(draft)}
                            placeholder={t('mannequin.widget.set_name_hint')}
                            placeholderColor={NAME_HINT_COLOR}
                            maxLength={30}
                            textStyle="u_regular"
                            fontSize={13}
                            flashFormat={TEXT_FORMAT}
                            textColor={(draft !== name) ? TYPING_NAME_COLOR : SAVED_NAME_COLOR}
                            border="#000000"
                            flashPlacement
                            layout={{ position: 'absolute', left: 133, top: 25, width: 190, height: 21 }}
                        />
                        <ThemeImage
                            src={LayoutImage('shared/common_small_pen.png')}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 330, top: 27, width: 17, height: 18 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={() => {
                                onSaveName(draft);
                                onScreenChange('save');
                            }}
                            layout={{ position: 'absolute', left: 133, top: 58, height: 28, minWidth: 219 }}
                        >
                            {t('mannequin.widget.style')}
                        </ButtonThick>
                        <Button
                            variant="3"
                            onPointerTap={onWear}
                            layout={{ position: 'absolute', left: 133, top: 98, height: 28, minWidth: 219 }}
                        >
                            {t('mannequin.widget.wear')}
                        </Button>
                    </>
                )}
                {(screen === 'save') && (
                    <>
                        <ButtonThick
                            variant="3"
                            onPointerTap={onSaveOutfit}
                            layout={{ position: 'absolute', left: 227, top: 141, height: 28, minWidth: 130, maxWidth: 145 }}
                        >
                            {t('mannequin.widget.save')}
                        </ButtonThick>
                        {!!name.length && (
                            <ThemeText
                                text={quotedName}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 13 }}
                                flashFormat={TEXT_FORMAT}
                                clip
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 126, top: 30, width: 254, height: 33 }}
                            />
                        )}
                        {description('mannequin.widget.savetext', 60, 197, 61, 13)}
                        <Region
                            cursor="pointer"
                            onPointerTap={() => onScreenChange('main')}
                            layout={{ position: 'absolute', left: 15, top: 147, width: 151, height: 20 }}
                        >
                            <ThemeText
                                text={t('mannequin.widget.back')}
                                textStyle="u_regular"
                                textOptions={{ fontSize: 13 }}
                                flashFormat={{ ...TEXT_FORMAT, underline: true }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        </Region>
                    </>
                )}
                {(screen === 'peer') && (
                    <>
                        <ButtonThick
                            variant="3"
                            onPointerTap={onWear}
                            layout={{ position: 'absolute', left: 227, top: 141, height: 28, minWidth: 138, maxWidth: 145 }}
                        >
                            {t('mannequin.widget.wear')}
                        </ButtonThick>
                        {!!name.length && (
                            <ThemeText
                                text={quotedName}
                                textStyle="u_italic"
                                textOptions={{ fontSize: 13 }}
                                flashFormat={TEXT_FORMAT}
                                clip
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 126, top: 30, width: 244, height: 25 }}
                            />
                        )}
                        {description('mannequin.widget.weartext', 60, 242, 61, 13)}
                    </>
                )}
                {(screen === 'no-club') && (
                    <>
                        {/* Flash sent them to the club centre; here the offer simply stands down. */}
                        <ButtonThick
                            variant="3"
                            onPointerTap={onClose}
                            layout={{ position: 'absolute', left: 206, top: 141, height: 28, minWidth: 164 }}
                        >
                            {t('mannequin.widget.getclub')}
                        </ButtonThick>
                        {description('mannequin.widget.clubnotification', 52, 241, 61)}
                    </>
                )}
                {(screen === 'wrong-gender') && (
                    <>
                        <ButtonThick
                            variant="3"
                            onPointerTap={onClose}
                            layout={{ position: 'absolute', left: 289, top: 141, height: 28, minWidth: 75, maxWidth: 140 }}
                        >
                            {t('generic.ok')}
                        </ButtonThick>
                        {description('mannequin.widget.wronggender', 52, 245, 86, 13)}
                    </>
                )}
            </Region>
        </Frame>
    );
};
