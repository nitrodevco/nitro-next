/**
 * `variables/§_-Q22§.buildInputs` - the variable name and the quest name (`TextInputParam("", 500)`).
 */
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { QUEST_NAME_MAX_CHARACTERS, QuestVariableForm, WiredElementView } from '#base/wired';

export const QuestVariableView: WiredElementView<QuestVariableForm> = ({ form, setForm }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredSection title="${wiredfurni.params.variables.quest_name}">
            <WiredTextInput
                value={form.questName}
                onChange={questName => setForm({ questName })}
                maxCharacters={QUEST_NAME_MAX_CHARACTERS}
            />
        </WiredSection>
    </>
);
