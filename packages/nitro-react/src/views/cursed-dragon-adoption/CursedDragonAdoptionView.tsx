/**
 * The cursed dragon adoption - `catalog/cursed_dragon_adoption/CursedDragonAdoptionView` on
 * `cursed_dragon_adoption_xml` (build WIN63-202610151745), shown centred by
 * `cursed_dragon_adoption/open`:
 *
 * - the frame's help button hidden, its close button hiding the window (`onClose` -> `hide`, which
 *   also takes down an open confirmation);
 * - `updateClaimState`: both adopt buttons read "adopted" once the claim is taken, "adopt"
 *   otherwise, and are disabled (`WindowUtils.disableSection`) unless the claim is available and
 *   no confirmation is up; a claim that stops being available closes the confirmation;
 * - `confirmAdoption`: `blue_adopt` (choice 0) or `purple_adopt` (choice 1) asks
 *   `cursed_dragon_adoption.confirm.title` / `.confirm.desc` with the colour's name
 *   (`cursed_dragon_adoption.blue.name` / `.purple.name`), and OK claims it (`makeClaim`).
 *
 * `CursedDragonPreviewView` draws the two dragons (pet type 37, palettes 0 and 1) over a copy of
 * the scene in `dragon_live_preview`, and keeps the widget hidden until the hotel's pet data knows
 * both colours (`getPetColor(37, 0)` / `(37, 1)`); until this client draws that preview the widget
 * stays hidden, as Flash's does without the pet's data.
 */
import { useEffect, useRef, useState } from 'react';

import { claimCursedDragon } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { CURSED_DRAGON_CHOICE_BLUE, CURSED_DRAGON_CHOICE_PURPLE, CURSED_DRAGON_CLAIM_STATE_AVAILABLE, CURSED_DRAGON_CLAIM_STATE_CLAIMED, useCursedDragonAdoptionStore } from '#base/context/cursed-dragon-adoption';
import { useTranslation, useWindowActions } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

export interface CursedDragonAdoptionViewProps {
    onClose: () => void;
}

export const CursedDragonAdoptionView = ({ onClose }: CursedDragonAdoptionViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const claimState = useCursedDragonAdoptionStore(x => x.claimState);
    const { showConfirm, closeDialog } = useWindowActions();
    // The open confirmation's dialog id (Flash's confirm window), or -1.
    const [ confirmation, setConfirmation ] = useState(-1);
    // The same id for the callbacks and effects, which outlive the render that set it.
    const confirmationRef = useRef(-1);

    const canClaim = (claimState === CURSED_DRAGON_CLAIM_STATE_AVAILABLE);

    /** `closeConfirmation`: the dialog taken down without its callbacks. */
    const closeConfirmation = () => {
        if (confirmationRef.current === -1) return;

        closeDialog(confirmationRef.current);
        confirmationRef.current = -1;
        setConfirmation(-1);
    };

    // `updateClaimState`: a claim no longer available closes the confirmation.
    useEffect(() => {
        if (!canClaim) closeConfirmation();
    }, [ canClaim ]);

    // `hide` / `dispose`: the window going takes its confirmation with it.
    useEffect(() => () => {
        if (confirmationRef.current !== -1) closeDialog(confirmationRef.current);
    }, []);

    // `show`: `center()`ed when built, then `activate`d each time.
    const frame = useTemplateFrame({ id: 'cursed_dragon_adoption', centered: true, rememberPosition: false, onClose });

    const confirmAdoption = (choice: number) => {
        if (!canClaim || (confirmationRef.current !== -1)) return;

        const colour = t((choice === CURSED_DRAGON_CHOICE_BLUE) ? 'cursed_dragon_adoption.blue.name' : 'cursed_dragon_adoption.purple.name');
        const done = () => {
            confirmationRef.current = -1;
            setConfirmation(-1);
        };
        const id = showConfirm(
            t('cursed_dragon_adoption.confirm.title'),
            t('cursed_dragon_adoption.confirm.desc', '', { colour }),
            () => {
                done();
                claimCursedDragon(send, choice);
            },
            { onCancel: done, onClose: done },
        );

        confirmationRef.current = id;
        setConfirmation(id);
    };

    const caption = (claimState === CURSED_DRAGON_CLAIM_STATE_CLAIMED) ? '${cursed_dragon_adoption.adopted}' : '${cursed_dragon_adoption.adopt}';
    const disabled = !canClaim || (confirmation !== -1);

    return (
        <TemplateWindow
            id="habbo-catalog-com/cursed_dragon_adoption_xml"
            frame={frame}
            bindings={{
                header_button_help: { visible: false },
                dragon_live_preview: { visible: false },
                blue_adopt: { caption, disabled, onPointerTap: () => confirmAdoption(CURSED_DRAGON_CHOICE_BLUE) },
                purple_adopt: { caption, disabled, onPointerTap: () => confirmAdoption(CURSED_DRAGON_CHOICE_PURPLE) },
            }}
        />
    );
};
