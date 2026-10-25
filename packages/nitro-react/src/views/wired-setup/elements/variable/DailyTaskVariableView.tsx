/**
 * `variables/§_-34§.buildInputs` - the variable name and the daily task name
 * (`TextInputParam("", 100, "1234..")`).
 */
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { DAILY_TASK_NAME_MAX_CHARACTERS, DAILY_TASK_NAME_PLACEHOLDER, DailyTaskVariableForm, WiredElementView } from '#base/wired';

export const DailyTaskVariableView: WiredElementView<DailyTaskVariableForm> = ({ form, setForm }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredSection title="${wiredfurni.params.variables.daily_task_name}">
            <WiredTextInput
                value={form.taskName}
                onChange={taskName => setForm({ taskName })}
                maxCharacters={DAILY_TASK_NAME_MAX_CHARACTERS}
                placeholder={DAILY_TASK_NAME_PLACEHOLDER}
            />
        </WiredSection>
    </>
);
