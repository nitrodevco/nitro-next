import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { AvatarImage } from '#base/components';
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

/**
 * A mannequin, on the `mannequin_widget` frame (388x220) around whichever of the five 386x180
 * contents the widget asked for: the outfit on the left of all of them, and on the right either
 * the dummy controls or the offer to put its clothes on.
 */
export const FurnitureMannequinView = ({
    name, figure, gender, clubLevel, screen, onScreenChange, onSaveName, onSaveOutfit, onWear, onClose,
}: FurnitureMannequinViewProps) => {
    const [ draft, setDraft ] = useState<string>(name);
    const [ lastName, setLastName ] = useState<string>(name);
    const { texture, width, height } = useAvatarImageTexture(figure, gender, { direction: 4 });
    const t = useTranslation();

    if (name !== lastName) {
        setLastName(name);
        setDraft(name);
    }

    return (
        <Frame
            variant="3"
            id="furniture-mannequin"
            caption={t('mannequin.widget.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 90, y: 70 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 388, height: 220 }}
        >
            <Region layout={{ position: 'relative', width: 386, height: 180 }}>
                {/*
                  * `MannequinWidget.updatePreviewImage` fills this window with its own backdrop
                  * and then copies the avatar into the middle of it, clipped by the window
                  * rather than scaled - so a figure too tall for 83x130 loses a little from
                  * every side instead of being squashed or hanging out of the frame.
                  */}
                <Region layout={{ width: 83, height: 130, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <ThemeImage
                        src={LayoutImage('room-ui/mannequin_preview_bg.png')}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 83, height: 130 }}
                    />
                    <AvatarImage
                        figure={figure}
                        gender={gender}
                        direction={2}
                        layout={{ marginBottom: 20 }}
                    />
                </Region>
                {/* A club outfit wears its badge over the preview; a free one shows nothing. */}
                {(clubLevel > 0) && (
                    <Icon
                        variant={(clubLevel > 1) ? '14' : '13'}
                        layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
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
                            maxLength={30}
                            layout={{ position: 'absolute', left: 133, width: 190, top: 25, height: 21 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={() => {
                                onSaveName(draft);
                                onScreenChange('save');
                            }}
                            layout={{ position: 'absolute', left: 133, width: 219, top: 58, height: 28 }}
                        >
                            {t('mannequin.widget.style')}
                        </ButtonThick>
                        <Button
                            variant="3"
                            onPointerTap={onWear}
                            layout={{ position: 'absolute', left: 133, width: 219, top: 98, height: 28 }}
                        >
                            {t('mannequin.widget.wear')}
                        </Button>
                    </>
                )}
                {(screen === 'save') && (
                    <>
                        <ThemeText
                            text={name}
                            textStyle="u_bold"
                            layout={{ position: 'absolute', right: 6, width: 254, top: 30, height: 33 }}
                        />
                        <ThemeText
                            text={t('mannequin.widget.savetext')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 126, width: 197, top: 66, height: 61 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={onSaveOutfit}
                            layout={{ position: 'absolute', right: 6, width: 145, bottom: 11, height: 28 }}
                        >
                            {t('mannequin.widget.save')}
                        </ButtonThick>
                        <Region
                            cursor="pointer"
                            onPointerTap={() => onScreenChange('main')}
                            layout={{ position: 'absolute', left: 15, width: 151, top: 147, height: 20 }}
                        >
                            <ThemeText
                                text={t('mannequin.widget.back')}
                                textStyle="u_regular"
                                textOptions={{ fontSize: 13 }}
                                flashFormat={{ underline: true, thickness: -15, sharpness: 80 }}
                            />
                        </Region>
                    </>
                )}
                {(screen === 'peer') && (
                    <>
                        <ThemeText
                            text={name}
                            textStyle="u_italic"
                            layout={{ position: 'absolute', left: 126, width: 244, top: 30, height: 25 }}
                        />
                        <ThemeText
                            text={t('mannequin.widget.weartext')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 242, fontSize: 13 }}
                            flashFormat={{ thickness: -15, sharpness: 80 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 126, width: 242, top: 60, height: 61 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={onWear}
                            layout={{ position: 'absolute', left: 227, width: 145, bottom: 11, height: 28 }}
                        >
                            {t('mannequin.widget.wear')}
                        </ButtonThick>
                    </>
                )}
                {(screen === 'no-club') && (
                    <>
                        <ThemeText
                            text={t('mannequin.widget.clubnotification')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
                            flashFormat={{ thickness: -15, sharpness: 80 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 126, width: 241, top: 52, height: 61 }}
                        />
                        {/* Flash sent them to the club centre; here the offer simply stands down. */}
                        <ButtonThick
                            variant="3"
                            onPointerTap={onClose}
                            layout={{ position: 'absolute', right: 6, width: 174, bottom: 11, height: 28 }}
                        >
                            {t('mannequin.widget.getclub')}
                        </ButtonThick>
                    </>
                )}
                {(screen === 'wrong-gender') && (
                    <>
                        <ThemeText
                            text={t('mannequin.widget.wronggender')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 245, fontSize: 13 }}
                            flashFormat={{ thickness: -15, sharpness: 80 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 126, width: 245, top: 52, height: 86 }}
                        />
                        <ButtonThick
                            variant="3"
                            onPointerTap={onClose}
                            layout={{ position: 'absolute', left: 289, width: 75, bottom: 11, height: 28 }}
                        >
                            {t('generic.ok')}
                        </ButtonThick>
                    </>
                )}
            </Region>
        </Frame>
    );
};
