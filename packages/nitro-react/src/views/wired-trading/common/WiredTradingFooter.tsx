/**
 * The footer of the ubuntu wired trading windows - `main_layout/FooterPreset` as
 * `AbstractUbuntuWiredUI.createFooterPreset` makes it: a splitter over "ready" (`onSaveClicked`)
 * and "cancel" (`onCloseClicked`), the row indented by `sectionLeftRightMargin`, `sectionSpacing`
 * under the line. The trading windows use its two setters the setup dialog does not:
 * `saveButtonCaption` (the self donation tool's "Donate") and `saveButtonDisabled` (contracts
 * without write permission).
 */
import { WiredButton } from '#base/views/wired-setup/kit/WiredButton';
import { WiredButtonRow } from '#base/views/wired-setup/kit/WiredButtonRow';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredSplitter } from '#base/views/wired-setup/kit/WiredSplitter';
import { useWiredStyle } from '#base/views/wired-setup/kit/WiredStyleContext';

export interface WiredTradingFooterProps {
    onSave: () => void;
    onCancel: () => void;
    saveDisabled?: boolean;
    /** `saveButtonCaption`; `${wiredfurni.ready}` by default. */
    saveCaption?: string;
    splitterVisible?: boolean;
}

export const WiredTradingFooter = ({ onSave, onCancel, saveDisabled = false, saveCaption = '${wiredfurni.ready}', splitterVisible = true }: WiredTradingFooterProps) => {
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
