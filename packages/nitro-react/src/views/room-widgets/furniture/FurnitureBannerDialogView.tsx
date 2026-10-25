import { TemplateBindings, TemplateWindow, ThemeText } from '#base/theme';

/**
 * The teal-bannered dialogs and what builds each: `effectbox_xml` (`EffectBoxOpenDialogView`),
 * `mysterytrophy_xml` (`MysteryTrophyOpenDialogView`) and `petpackage_new` (`PetPackageFurniWidget`).
 * Each names its confirm button: `ok`, or the pet package's `pick_name`.
 */
const BANNER_DIALOGS = {
    effectbox: { template: 'habbo-room-ui-com/effectbox_xml', confirm: 'ok' },
    mysterytrophy: { template: 'habbo-room-ui-com/mysterytrophy_xml', confirm: 'ok' },
    petpackage: { template: 'habbo-room-ui-com/petpackage_new', confirm: 'pick_name' },
} as const;

export type FurnitureBannerDialogLayout = keyof typeof BANNER_DIALOGS;

export interface FurnitureBannerDialogViewProps {
    layout: FurnitureBannerDialogLayout;
    /** The layout's `input` (the inscription, the pet's name): its text as typed. */
    input?: { value: string; onChange: (value: string) => void };
    /** Why the server refused the input, written under its field. */
    error?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * One of the teal-bannered furni dialogs, built from its layout and centred (`center()`): the banner
 * with the layout's picture, title and description, then the furni's question - the `input` field, for
 * the mystery trophy and the pet package - then the button row. `cancel` and the header's close
 * cancel, the confirm button confirms (`onMouseClick`, `onWindowEvent`).
 *
 * The pet package says why a name was refused in an alert (`windowManager.alert`); here the reason is
 * written under the field instead, at (7, 35) in `input_border` - the one line of this dialog the
 * layout does not place.
 */
export const FurnitureBannerDialogView = ({ layout, input, error, onConfirm, onCancel }: FurnitureBannerDialogViewProps) => {
    const { template, confirm } = BANNER_DIALOGS[layout];

    const bindings: TemplateBindings = {
        cancel: { onPointerTap: onCancel },
        [confirm]: { onPointerTap: onConfirm },
    };

    if (input) bindings.input = { caption: input.value, onChange: input.onChange };

    if (error) {
        bindings.input_border = {
            children: (
                <ThemeText
                    text={error}
                    textOptions={{ fill: '#aa0000' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 7, top: 35 }}
                />
            ),
        };
    }

    return (
        <TemplateWindow
            id={template}
            frame={{ id: `furniture-${layout}`, centered: true, rememberPosition: false, onClose: onCancel }}
            bindings={bindings}
        />
    );
};
