/**
 * `actiontypes/BotMove.buildInputs` - the bot name field in the `bot.name` section.
 */
import { BotMoveActionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredBotNameInput } from './shared/WiredBotNameInput';

export const BotMoveView: WiredElementView<BotMoveActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.bot.name}">
        <WiredBotNameInput
            value={form.botName}
            onChange={botName => setForm({ botName })}
        />
    </WiredSection>
);
