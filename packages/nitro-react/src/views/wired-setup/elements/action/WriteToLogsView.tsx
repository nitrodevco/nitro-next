/**
 * `actiontypes/WriteToLogs.buildInputs` - the log level dropdown (`log_level.0` to `.3`) in the
 * `write_to_logs.log_level.title` section and the message (`TextInputParam("", 400)`) in the
 * `write_to_logs.log_message.title` section.
 */
import { WiredElementView, WRITE_TO_LOGS_LEVELS, WRITE_TO_LOGS_MESSAGE_MAX_LENGTH, WriteToLogsActionForm } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

const LEVEL_OPTIONS = WRITE_TO_LOGS_LEVELS.map(id => ({ id, label: `\${wiredfurni.params.write_to_logs.log_level.${id}}` }));

export const WriteToLogsView: WiredElementView<WriteToLogsActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.write_to_logs.log_level.title}">
            <WiredDropdown
                options={LEVEL_OPTIONS}
                selected={form.logLevel}
                onSelect={logLevel => setForm({ logLevel })}
                caption="${wiredfurni.params.write_to_logs.log_level.title}"
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.write_to_logs.log_message.title}">
            <WiredTextInput
                value={form.message}
                onChange={message => setForm({ message })}
                maxCharacters={WRITE_TO_LOGS_MESSAGE_MAX_LENGTH}
            />
        </WiredSection>
    </>
);
