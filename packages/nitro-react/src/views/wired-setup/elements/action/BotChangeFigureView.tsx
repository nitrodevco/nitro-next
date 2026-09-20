/**
 * `actiontypes/BotChangeFigure.buildInputs` - the bot name in the `bot.name` section, then the
 * `capture.figure` section: the figure's avatar image, centred, over the "capture" button, which
 * takes the editing user's own figure (`captureFigure`: `sessionDataManager.figure`).
 */
import { useOwnUserFigure } from '#base/context/user';
import { BotChangeFigureActionForm, WiredElementView } from '#base/wired';

import { WiredAlignCenter } from '../../kit/WiredAlignCenter';
import { WiredAvatarImage } from '../../kit/WiredAvatarImage';
import { WiredButton } from '../../kit/WiredButton';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredBotNameInput } from './shared/WiredBotNameInput';

export const BotChangeFigureView: WiredElementView<BotChangeFigureActionForm> = ({ form, setForm }) => {
    const ownFigure = useOwnUserFigure();

    return (
        <>
            <WiredSection title="${wiredfurni.params.bot.name}">
                <WiredBotNameInput
                    value={form.botName}
                    onChange={botName => setForm({ botName })}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.capture.figure}">
                <WiredSimpleList>
                    <WiredAlignCenter>
                        <WiredAvatarImage figure={form.figure} />
                    </WiredAlignCenter>
                    <WiredButton
                        label="${wiredfurni.params.capture.figure}"
                        onPress={() => setForm({ figure: ownFigure })}
                    />
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
