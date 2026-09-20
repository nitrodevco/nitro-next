/**
 * The dialog's footer - `main_layout/FooterPreset`: a splitter over the "ready" and "cancel"
 * buttons, the row indented by `sectionLeftRightMargin` and `sectionSpacing` under the line.
 * "Ready" is disabled for someone without write permission
 * (`onEditStartUpdateCommonUI`: `saveButtonDisabled = !wiredMenu.hasWritePermission`).
 *
 * `InnerBorderFramePreset` hides the splitter (`splitterVisible = false`).
 */
import { WiredStyle } from '#base/wired';

import { WiredButton } from './kit/WiredButton';
import { WiredButtonRow } from './kit/WiredButtonRow';
import { WiredSimpleList } from './kit/WiredSimpleList';
import { WiredSplitter } from './kit/WiredSplitter';

export interface WiredSetupFooterProps {
    style: WiredStyle;
    saveDisabled: boolean;
    splitterVisible: boolean;
    onSave: () => void;
    onCancel: () => void;
}

export const WiredSetupFooter = ({ style, saveDisabled, splitterVisible, onSave, onCancel }: WiredSetupFooterProps) => (
    <WiredSimpleList spacing={style.sectionSpacing}>
        {splitterVisible && <WiredSplitter />}
        <WiredSimpleList layout={{ paddingLeft: style.sectionLeftRightMargin, paddingRight: style.sectionLeftRightMargin }}>
            <WiredButtonRow>
                <WiredButton
                    label="${wiredfurni.ready}"
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
