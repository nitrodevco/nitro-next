/**
 * `main_layout/FooterPreset`, the footer of the wired setup dialog and of the ubuntu wired trading
 * windows (`AbstractUbuntuWiredUI.createFooterPreset`): a splitter over "ready" (`onSaveClicked`)
 * and "cancel" (`onCloseClicked`), the row indented by `sectionLeftRightMargin`, `sectionSpacing`
 * under the line - in the style of the enclosing `WiredStyleProvider`.
 *
 * Its setters: `splitterVisible` (`InnerBorderFramePreset` hides the splitter),
 * `saveButtonDisabled` (the setup dialog's `onEditStartUpdateCommonUI` for someone without write
 * permission, and the contracts likewise) and `saveButtonCaption` (the self donation tool's
 * "Donate").
 */
import { WiredButton } from './WiredButton';
import { WiredButtonRow } from './WiredButtonRow';
import { WiredSimpleList } from './WiredSimpleList';
import { WiredSplitter } from './WiredSplitter';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredFooterProps {
    onSave: () => void;
    onCancel: () => void;
    saveDisabled?: boolean;
    /** `saveButtonCaption`; `${wiredfurni.ready}` by default. */
    saveCaption?: string;
    splitterVisible?: boolean;
}

export const WiredFooter = ({ onSave, onCancel, saveDisabled = false, saveCaption = '${wiredfurni.ready}', splitterVisible = true }: WiredFooterProps) => {
    const style = useWiredStyle();

    return (
        <WiredSimpleList spacing={style.sectionSpacing}>
            {splitterVisible && <WiredSplitter />}
            <WiredSimpleList layout={{ paddingLeft: style.sectionLeftRightMargin, paddingRight: style.sectionLeftRightMargin }}>
                <WiredButtonRow>
                    <WiredButton
                        label={saveCaption}
                        onPress={onSave}
                        disabled={saveDisabled}
                    />
                    <WiredButton
                        label="${cancel}"
                        onPress={onCancel}
                    />
                </WiredButtonRow>
            </WiredSimpleList>
        </WiredSimpleList>
    );
};
