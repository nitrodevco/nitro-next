/**
 * `actiontypes/BotFollowAvatar.buildInputs` - the bot name over the start / stop following radio,
 * in one `bot.name` section.
 */
import { BotFollowAvatarActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredBotNameInput } from './shared/WiredBotNameInput';

const FOLLOW_OPTIONS = [ { id: 1, label: '${wiredfurni.params.start.following}' }, { id: 0, label: '${wiredfurni.params.stop.following}' } ];

export const BotFollowAvatarView: WiredElementView<BotFollowAvatarActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.bot.name}">
        <WiredSimpleList>
            <WiredBotNameInput
                value={form.botName}
                onChange={botName => setForm({ botName })}
            />
            <WiredRadioGroup
                options={FOLLOW_OPTIONS}
                selected={form.follow}
                onSelect={follow => setForm({ follow })}
            />
        </WiredSimpleList>
    </WiredSection>
);
