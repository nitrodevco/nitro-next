/**
 * `triggerconfs/§_-Er§.buildInputs` and `BotAvatarReached.buildInputs` (identical) - the bot's
 * name, a 32 character field in the `bot.name` section.
 */
import { TRIGGER_BOT_NAME_MAX_CHARACTERS, TriggerBotNameForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const TriggerBotNameView: WiredElementView<TriggerBotNameForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.bot.name}">
        <WiredTextInput
            value={form.botName}
            onChange={botName => setForm({ botName })}
            maxCharacters={TRIGGER_BOT_NAME_MAX_CHARACTERS}
            tooltip="${wiredfurni.tooltip.botname}"
        />
    </WiredSection>
);
