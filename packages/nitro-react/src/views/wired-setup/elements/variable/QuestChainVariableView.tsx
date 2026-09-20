/**
 * `variables/§_-m1q§.buildInputs` - the variable name and the quest chain name
 * (`TextInputParam("", 500)`).
 */
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { QUEST_CHAIN_NAME_MAX_CHARACTERS, QuestChainVariableForm, WiredElementView } from '#base/wired';

export const QuestChainVariableView: WiredElementView<QuestChainVariableForm> = ({ form, setForm }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredSection title="${wiredfurni.params.variables.quest_chain_name}">
            <WiredTextInput
                value={form.questChainName}
                onChange={questChainName => setForm({ questChainName })}
                maxCharacters={QUEST_CHAIN_NAME_MAX_CHARACTERS}
            />
        </WiredSection>
    </>
);
