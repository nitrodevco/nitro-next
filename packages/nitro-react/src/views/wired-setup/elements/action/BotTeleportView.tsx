/**
 * `actiontypes/§_-mo§.buildInputs` (BOT_TELEPORT) - the bot name field in the `bot.name` section.
 */
import { BotTeleportActionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredBotNameInput } from './shared/WiredBotNameInput';

export const BotTeleportView: WiredElementView<BotTeleportActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.bot.name}">
        <WiredBotNameInput
            value={form.botName}
            onChange={botName => setForm({ botName })}
        />
    </WiredSection>
);
