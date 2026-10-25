/**
 * `uibuilder/presets/sections/applications/ApiKeySection` - one key of the variables web api
 * addon (`VariablesWebApiAddon`), titled `web_api.read.title` or `web_api.write.title`: a row of
 * three buttons - generate (regenerate once there is a key), clear, copy - above the key in a
 * read-only, word-wrapping 30px text area. Clear and copy are disabled while there is no key.
 *
 * Controlled: `value` is the key in the form and `onChange` receives every change the section
 * makes itself (clear) - Flash's `param6` listener, which the addon uses to disable its bulk
 * delete permission without a write key. A new key comes from the server (the addon's
 * `WiredWebApiKeyResultEvent`), so `onGenerate` only sends the request.
 *
 * Copy puts the key on the clipboard (Flash's `Clipboard.generalClipboard`, here the browser's)
 * and shows the `notification.wired.copied_api_key` bubble.
 */
import { useNotificationActions } from '#base/context/notifications';

import { WiredButton } from './WiredButton';
import { WiredButtonRow } from './WiredButtonRow';
import { WiredSection } from './WiredSection';
import { WiredSimpleList } from './WiredSimpleList';
import { WiredTextArea } from './WiredTextArea';

/** `TextAreaParam(30, -1, -1, -1, -1, "", null, null, false, true)`. */
const KEY_AREA_HEIGHT = 30;

export interface WiredApiKeySectionProps {
    /** `param4` - the write key's section (`true`) or the read key's. */
    write: boolean;
    value: string;
    onChange: (key: string) => void;
    /** `param5` - the generate / regenerate button. */
    onGenerate: () => void;
}

export const WiredApiKeySection = ({ write, value, onChange, onGenerate }: WiredApiKeySectionProps) => {
    const { addNotification } = useNotificationActions();
    const hasKey = (value.length > 0);

    const copyKey = () => {
        void navigator.clipboard?.writeText(value);

        addNotification('${notification.wired.copied_api_key}', 'wired');
    };

    return (
        <WiredSection title={write ? '${wiredfurni.params.web_api.write.title}' : '${wiredfurni.params.web_api.read.title}'}>
            <WiredSimpleList>
                <WiredButtonRow>
                    <WiredButton
                        label={hasKey ? '${wiredfurni.params.web_api.regenerate}' : '${wiredfurni.params.web_api.generate}'}
                        onPress={onGenerate}
                    />
                    <WiredButton
                        label="${wiredfurni.params.web_api.clear}"
                        onPress={() => onChange('')}
                        disabled={!hasKey}
                    />
                    <WiredButton
                        label="${wiredfurni.params.web_api.copy}"
                        onPress={copyKey}
                        disabled={!hasKey}
                    />
                </WiredButtonRow>
                <WiredTextArea
                    value={value}
                    onChange={onChange}
                    height={KEY_AREA_HEIGHT}
                    maxCharacters={-1}
                    editable={false}
                />
            </WiredSimpleList>
        </WiredSection>
    );
};
